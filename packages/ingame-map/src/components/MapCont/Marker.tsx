import { Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import { icon, type LatLngExpression, type PathOptions } from 'leaflet';

import { mapIcons, GW2Point, GW2PointGroup } from '@internal/core';
import type { GW2ApiPoi } from '@internal/core';

import defaultIcon from 'leaflet/dist/images/marker-icon.png';
import { styled } from '@mui/material';

const {
  heart,
  heropoint,
  landmark,
  vista,
  waypoint,
  star_blue,
  star_red,
  star_rose,
  star_green,
  star_yellow,
} = mapIcons;

export function GuideMarker(props: { markers: GW2PointGroup; perm?: boolean }) {
  const map = useMap();
  const { markers, perm } = props;
  const { points, mode } = markers;
  const LatLngPoints: LatLngExpression[] = [];

  if (points) {
    points.forEach((gw2Point) => {
      LatLngPoints.push(
        map.unproject([gw2Point.x, gw2Point.y], map.getMaxZoom() - 1),
      );
    });
  }

  const pathPropsMod = (key = '') => {
    const pathProps: PathOptions = {
      color: 'DodgerBlue',
      weight: 8,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
    };
    switch (key) {
      case 'red':
        pathProps.color = 'Crimson';
        break;
      case 'rose':
        pathProps.color = 'MediumVioletRed';
        break;
      case 'green':
        pathProps.color = 'LimeGreen';
        break;
      case 'yellow':
        pathProps.color = 'Yellow';
        break;
      default:
        pathProps.color = 'DodgerBlue';
        break;
    }
    return pathProps;
  };

  return (
    <>
      {mode === 'line' && (
        <Polyline
          pathOptions={pathPropsMod(points[0]?.type)}
          positions={LatLngPoints}
          className="gw2Path"
        />
      )}
      {points.map((el, i) => (
        <DefaultMark gw2poi={el} perm={perm} key={i} />
      ))}
    </>
  );
}

export function PoiMarker(props: {
  markers: Record<number, GW2ApiPoi>;
  perm?: boolean;
}) {
  const { markers, perm } = props;
  const points: GW2Point[] = [];

  if (markers) {
    Object.entries(markers).forEach((entry) => {
      const poi = entry[1];
      const { coord, name, type, icon } = poi;
      const point = new GW2Point({
        tupel: coord,
        name: name,
        type: type,
        icon: icon,
      });
      points.push(point);
    });
  }

  return (
    <>
      {points.map((el, i) => {
        return <DefaultMark gw2poi={el} perm={perm} key={i} />;
      })}
    </>
  );
}

interface DefaultMarkProps {
  gw2poi: GW2Point;
  perm: boolean | undefined;
}

function DefaultMark(props: DefaultMarkProps) {
  const map = useMap();
  const { gw2poi } = props;

  return (
    <Marker
      icon={LeafletIcon(gw2poi)}
      position={map.unproject([gw2poi.x, gw2poi.y], map.getMaxZoom() - 1)}
    >
      {gw2poi.name && (
        <StyledTooltip
          direction="right"
          offset={[-8, 0]}
          permanent={props.perm ? true : false}
        >
          {gw2poi.name}
        </StyledTooltip>
      )}
    </Marker>
  );
}

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  fontFamily: 'Menomonia',
  fontWeight: 'bold',
  fontSize: '1rem',
  lineHeight: 1.4,
  borderRadius: '0 50vh 50vh 0 !important',
  paddingLeft: `${theme.spacing(3)} !important`,
  paddingRight: `${theme.spacing(1.5)} !important`,
  border: 'none !important',
  background:
    'linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(255, 255, 255, 1) 50%) !important',
  textShadow: multiShadow('#fff9', 2),
  ':before': {
    opacity: 0,
  },
}));

const multiShadow = (color: string, size: number) => {
  const abs = Math.abs(size);
  const half = abs / 2.0;

  const shadows = [
    [abs, 0],
    [-abs, 0],
    [0, abs],
    [0, -abs],
    [half, half],
    [-half, -half],
    [half, -half],
    [-half, half],
  ];

  const result = shadows.map(([x, y]) => {
    return `${color} ${x}px ${y}px ${abs}px`;
  });

  return result.join(', ');
};

function LeafletIcon(point: GW2Point) {
  const { type, icon: iconURL } = point;
  let link: string;

  if (iconURL) {
    link = iconURL;
  } else {
    switch (type) {
      case 'red':
        link = star_red;
        break;
      case 'rose':
        link = star_rose;
        break;
      case 'green':
        link = star_green;
        break;
      case 'yellow':
        link = star_yellow;
        break;
      case 'default': // Fallback for old name scheme
      case 'blue':
        link = star_blue;
        break;
      case 'heart':
        link = heart;
        break;
      case 'heropoint':
        link = heropoint;
        break;
      case 'landmark':
        link = landmark;
        break;
      case 'vista':
        link = vista;
        break;
      case 'waypoint':
        link = waypoint;
        break;
      default:
        link = defaultIcon;
        break;
    }
  }

  return icon({
    iconUrl: link,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}
