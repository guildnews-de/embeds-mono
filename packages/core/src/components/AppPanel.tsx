import { PropsWithChildren } from 'react';
import {
  Box,
  CSSObject,
  Divider,
  Drawer,
  DrawerProps,
  styled,
  Theme,
  SxProps,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  toggleWide,
  closeCanvas,
  openCanvas,
  setLang,
} from '../slice/appSlice';

import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';

const drawerWidth = 480;
const teamMods = document.getElementById('wpadminbar') !== null;

const drawerBaseCss = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
});

const openedMixin = (theme: Theme, wide: boolean): CSSObject => ({
  maxWidth: '100vw',
  width: wide ? '100vw' : drawerWidth,
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
  },
  ...drawerBaseCss(theme),
});

const closedMixin = (theme: Theme): CSSObject => ({
  // width: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(4),
  },
  ...drawerBaseCss(theme),
});

const MenuDiv = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 0),
}));

const ContentDiv = styled(Box)(({ theme }) => ({
  height: '100%',
  flexGrow: 1,
  overflow: 'hidden',
  borderRadius: theme.spacing(0.5, 0, 0, 0.5),
  backgroundColor: theme.palette.grey[500],
  paddingLeft: theme.spacing(0.5),
}));

interface WideDrawerProps extends DrawerProps {
  wide: boolean;
}

const WideDrawer = (props: WideDrawerProps) => {
  return <Drawer {...props} />;
};

const StyledDrawer = styled(WideDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'wide',
})(({ theme, open, wide }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflow: 'hidden',
  ...(open && {
    ...openedMixin(theme, wide),
    '& .MuiDrawer-paper': openedMixin(theme, wide),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerPaperSx: SxProps = {
  marginTop: teamMods ? '32px !important' : undefined,
  height: teamMods ? 'calc(100% - 32px)' : '100%',
  maxWidth: '100vw',
};

export default function AppPanel({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  const { open, wide } = useAppSelector((state) => state.app.canvas);
  const { lang } = useAppSelector((state) => state.app);
  const { groupNames } = useAppSelector((state) => state.marker);

  const wideClickAction = toggleWide();
  const WideIcon = wide ? 'ZoomInMap' : 'ZoomOutMap';

  const openClickAction = open ? closeCanvas() : openCanvas();
  const OpenIcon = open ? 'ChevronRight' : 'ChevronLeft';
  const newLang = lang === 'en' ? 'de' : 'en';
  const newLangText = lang === 'en' ? 'Sprache wechseln' : 'Switch language';

  return (
    <StyledDrawer
      id="rememberme"
      className="Drawer"
      anchor="right"
      variant="permanent"
      open={open}
      wide={wide}
      PaperProps={{ sx: DrawerPaperSx }}
    >
      <MenuDiv height={'100%'}>
        {groupNames && groupNames.length > 0 && (
          <MenuGroup>
            <MenuItem
              tooltip="Toggle wide map"
              aria="toggle wide"
              icon={WideIcon}
              onClick={() => {
                dispatch(wideClickAction);
              }}
            />
            <Divider />
            <MenuItem
              tooltip="Toggle drawer"
              aria="toggle drawer"
              icon={OpenIcon}
              onClick={() => {
                dispatch(openClickAction);
              }}
            />
          </MenuGroup>
        )}
        <Box flexGrow={10} />
        <MenuGroup>
          <MenuItem
            tooltip={newLangText}
            aria="toggle language"
            icon={'Language'}
            onClick={() => {
              dispatch(setLang(newLang));
            }}
          />
        </MenuGroup>
      </MenuDiv>
      {<ContentDiv>{children}</ContentDiv>}
    </StyledDrawer>
  );
}
