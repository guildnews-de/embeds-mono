import { type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
} from '@mui/icons-material';
import {
  // AppBar,
  // type AppBarProps as MuiAppBarProps,
  Box,
  // CssBaseline,
  CSSObject,
  Divider,
  Drawer,
  DrawerProps,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  IconButton,
  styled,
  Theme,
  // Toolbar,
  // Typography,
  // useTheme,
} from '@mui/material';

import type {
  // MarkerActionsType,
  // MapActionsType,
  AppActionsType,
  // GW2ApiPoi,
  // GW2ApiSector,
} from '@repo/app-redux';
import type { UseAppSelectorHook, UseAppDispatchFunc } from '@repo/app-redux';

const drawerWidth = 480;

const drawerBaseCss: CSSObject = {
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  alignItems: 'center',
};

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
  ...drawerBaseCss,
});

const openedMixinWide = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: '100vw',
  ...drawerBaseCss,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(4)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
  ...drawerBaseCss,
});

const MenuDiv = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 0),
}));

const ContentDiv = styled(Box)(({ theme }) => ({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'flex-start',
  height: '96%',
  flexGrow: 1,
  overflow: 'hidden',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(0, 0),
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
  borderRadius: theme.spacing(1),
  ...(open &&
    !wide && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
  ...(open &&
    wide && {
      ...openedMixinWide(theme),
      '& .MuiDrawer-paper': openedMixinWide(theme),
    }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  margin: theme.spacing(0.25),
}));

interface AppDrawerActions {
  openCanvas: AppActionsType['openCanvas'];
  closeCanvas: AppActionsType['closeCanvas'];
  toggleWide: AppActionsType['toggleWide'];
}

interface AppDrawerHooks {
  useAppSelector: UseAppSelectorHook;
  useAppDispatch: UseAppDispatchFunc;
}

interface AppDrawerProps {
  actions: AppDrawerActions;
  hooks: AppDrawerHooks;
}

interface AppDrawerPropsWithChildren extends AppDrawerProps {
  children: ReactNode;
}

export default function AppDrawer({
  children,
  actions,
  hooks,
}: AppDrawerPropsWithChildren) {
  const { useAppSelector, useAppDispatch } = hooks;
  const dispatch = useAppDispatch();

  const { open, wide } = useAppSelector((state) => state.app.canvas);
  const { openCanvas, closeCanvas, toggleWide } = actions;

  const wideClickAction = toggleWide();
  const WideIndicator = wide ? ZoomInMap : ZoomOutMap;

  const openClickAction = open ? closeCanvas() : openCanvas();
  const OpenIndicator = open ? ChevronRight : ChevronLeft;

  return (
    <Box className="Box">
      {/* <CssBaseline /> */}
      <StyledDrawer
        className="Drawer"
        anchor="right"
        variant="permanent"
        open={open}
        wide={wide}
      >
        <MenuDiv>
          <StyledIconButton
            color="inherit"
            aria-label="toggle wide"
            onClick={() => {
              dispatch(wideClickAction);
            }}
          >
            <WideIndicator />
          </StyledIconButton>
          <Divider />
          <StyledIconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={() => {
              dispatch(openClickAction);
            }}
          >
            <OpenIndicator />
          </StyledIconButton>
        </MenuDiv>
        {open && <ContentDiv>{children}</ContentDiv>}
      </StyledDrawer>
    </Box>
  );
}
