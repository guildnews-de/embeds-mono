import { useMemo } from 'react';
import { CRS, LatLng } from 'leaflet';
import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';

import type {
  UseAppSelectorHook,
  UseAppDispatchFunc,
  MarkerActionsType,
  MapActionsType,
  GW2ApiPoi,
  GW2ApiSector,
  ApiActionsType,
  AppActionsType,
  // ApiActionsType,
} from '@repo/app-redux';

import { IngameTiles } from './MapCont/IngameTiles';
import { GW2Sectors } from './MapCont/Sectors';
import { GuideMarker, PoiMarker } from './MapCont/Marker';
import { ClickedCoords, MapCenter, MarkerBounds } from './MapCont/Utility';
import { IngameMapData, IngameMapProps } from '../shared/interfaces';

export interface MapContHooks {
  useAppSelector: UseAppSelectorHook;
  useAppDispatch: UseAppDispatchFunc;
}

export interface MapContActions {
  setDragged: MapActionsType['setDragged'];
  setDragView: MapActionsType['setDragView'];
  setRecenter: MapActionsType['setRecenter'];
  setMarkView: MapActionsType['setMarkView'];
  setClicked: MarkerActionsType['setClicked'];
  addActiveMap: MapActionsType['addActiveMap'];
  fetchMap: ApiActionsType['fetchMap'];
  setMapsLoaded: AppActionsType['setMapsLoaded'];
  activateLL: AppActionsType['activateLL'];
}

export type MapContProps = {
  hooks: MapContHooks;
  actions: MapContActions;
} & IngameMapData;

export default function MapCont(props: IngameMapProps) {
  const { hooks, actions } = props;
  const { useAppSelector } = hooks;
  // Grab redux state info
  const { bounds, activeMaps } = useAppSelector((state) => state.map);
  const { active, groups } = useAppSelector((state) => state.marker);
  const apiData = useAppSelector((state) => state.api.response);

  // Collect conditional data
  const marker =
    groups && active && groups[active] ? groups[active] : undefined;

  const mapData = useMemo(() => {
    const stack = {
      poi: {} as Record<number, GW2ApiPoi>,
      sectors: {} as Record<number, GW2ApiSector>,
    };
    activeMaps.forEach((id) => {
      const idData = apiData[id];
      if (idData) {
        const { poi, sectors } = idData;
        stack.poi = {
          ...stack.poi,
          ...poi,
        };
        stack.sectors = {
          ...stack.sectors,
          ...sectors,
        };
      }
    });
    return stack;
  }, [activeMaps, apiData]);

  return (
    <MapContainer
      crs={CRS.Simple}
      scrollWheelZoom={true}
      zoom={2}
      center={new LatLng(0, 0)}
      minZoom={1}
      maxZoom={8}
      doubleClickZoom={false}
    >
      <IngameTiles hooks={hooks} bounds={bounds} />
      <LayersControl>
        <Pane
          name="guide-marker"
          style={{ zIndex: '700' }}
          className="leaflet-marker-pane"
        >
          {marker && (
            <LayersControl.Overlay name="Guide Marker" checked>
              <LayerGroup>
                <GuideMarker markers={marker} perm={true} />
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </Pane>
        {mapData.sectors && <GW2Sectors sectors={mapData.sectors} />}
        {Object.keys(mapData.poi).length > 0 && (
          <LayersControl.Overlay name="Land Marker" checked>
            <LayerGroup>
              <PoiMarker markers={mapData.poi} />
            </LayerGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>
      <ClickedCoords
        hooks={hooks}
        actions={{ setClicked: actions.setClicked }}
      />
      {marker && (
        <MarkerBounds
          hooks={hooks}
          actions={{ setMarkView: actions.setMarkView }}
          marker={marker.points}
        />
      )}
      {
        <MapCenter
          hooks={hooks}
          actions={{
            setDragged: actions.setDragged,
            setDragView: actions.setDragView,
            setRecenter: actions.setRecenter,
          }}
        />
      }
    </MapContainer>
  );
}

export type MapContComp = typeof MapCont;
