import { useMemo } from 'react';
import { CRS, LatLng } from 'leaflet';
import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';

import {
  useAppSelector,
  type GW2ApiPoi,
  type GW2ApiSector,
} from '@repo/app-redux';

import { IngameTiles } from './MapCont/IngameTiles';
import { GW2Sectors } from './MapCont/Sectors';
import { GuideMarker, PoiMarker } from './MapCont/Marker';
import { ClickedCoords, MapCenter, MarkerBounds } from './MapCont/Utility';
import { styled } from '@mui/material';

const StyledMapContainer = styled(MapContainer)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: theme.spacing(0.5, 0, 0, 0.5),
  // padding: theme.spacing(0, 0),
}));

export default function MapCont() {
  // Grab redux state info
  const { bounds, activeMaps } = useAppSelector((state) => state.map);
  const { lang } = useAppSelector((state) => state.app);
  const { active, groups } = useAppSelector((state) => state.marker);
  const { maps: apiData } = useAppSelector((state) => state.api.response);

  // Collect conditional data
  const marker =
    groups && active && groups[active] ? groups[active] : undefined;

  const mapData = useMemo(() => {
    const stack = {
      poi: {} as Record<number, GW2ApiPoi>,
      sectors: {} as Record<number, GW2ApiSector>,
    };
    activeMaps.forEach((id) => {
      const mapKey = `${id}_${lang}`;
      const idData = apiData ? apiData[mapKey] : undefined;
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
  }, [activeMaps, apiData, lang]);

  return (
    <StyledMapContainer
      crs={CRS.Simple}
      scrollWheelZoom={true}
      zoom={2}
      center={new LatLng(0, 0)}
      minZoom={1}
      maxZoom={8}
      doubleClickZoom={false}
    >
      <IngameTiles /* hooks={hooks} */ bounds={bounds} />
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
      <ClickedCoords />
      {marker && <MarkerBounds marker={marker.points} />}
      {<MapCenter />}
    </StyledMapContainer>
  );
}

export type MapContComp = typeof MapCont;
