import { type ReactNode } from 'react';
import { ChevronLeft, ChevronRight /* , Menu */ } from '@mui/icons-material';
import {
  // AppBar,
  // type AppBarProps as MuiAppBarProps,
  Box,
  // CssBaseline,
  CSSObject,
  Divider,
  Drawer,
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

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
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
}

interface AppDrawerHooks {
  useAppSelector: UseAppSelectorHook;
  useAppDispatch: UseAppDispatchFunc;
}

interface AppDrawerProps {
  children: ReactNode;
  actions: AppDrawerActions;
  hooks: AppDrawerHooks;
}

export default function AppDrawer({
  children,
  actions,
  hooks,
}: AppDrawerProps) {
  // const theme = useTheme();
  const { useAppSelector, useAppDispatch } = hooks;
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.app.canvas);
  const { openCanvas, closeCanvas } = actions;
  // const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    // setOpen(true);
    dispatch(openCanvas());
  };

  const handleDrawerClose = () => {
    // setOpen(false);
    dispatch(closeCanvas());
  };

  return (
    <Box className="Box">
      {/* <CssBaseline /> */}
      <StyledDrawer
        className="Drawer"
        anchor="right"
        variant="permanent"
        open={open}
      >
        <MenuDiv>
          {open ? (
            <StyledIconButton
              className="toggle"
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerClose}
            >
              <ChevronRight />
            </StyledIconButton>
          ) : (
            <StyledIconButton
              className="toggle"
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerOpen}
            >
              <ChevronLeft />
            </StyledIconButton>
          )}
          <Divider className="Divider" />
        </MenuDiv>
        {open && <ContentDiv>{children}</ContentDiv>}
      </StyledDrawer>
    </Box>
  );
}
