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

import {
  useAppSelector,
  useAppDispatch,
  toggleWide,
  closeCanvas,
  openCanvas,
  setLang,
} from '@repo/app-redux';

const drawerWidth = 480;

const drawerBaseCss = (theme: Theme): CSSObject => ({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[500],
  borderRadius: theme.spacing(1, 0, 0, 1),
});

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
  ...drawerBaseCss(theme),
});

const openedMixinWide = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: '100vw',
  ...drawerBaseCss(theme),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(2)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(4)} + 1px)`,
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
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'flex-start',
  height: '97%',
  flexGrow: 1,
  overflow: 'hidden',
  borderRadius: theme.spacing(0.5, 0, 0, 0.5),
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
  padding: theme.spacing(0.25),
  margin: theme.spacing(0.25),
  color: theme.palette.grey[800],
}));

interface AppDrawerPropsWithChildren {
  children: ReactNode;
}

export default function AppDrawer({ children }: AppDrawerPropsWithChildren) {
  const dispatch = useAppDispatch();

  const { open, wide } = useAppSelector((state) => state.app.canvas);
  const { lang } = useAppSelector((state) => state.app);

  const wideClickAction = toggleWide();
  const WideIndicator = wide ? ZoomInMap : ZoomOutMap;

  const openClickAction = open ? closeCanvas() : openCanvas();
  const OpenIndicator = open ? ChevronRight : ChevronLeft;
  const newLang = lang === 'en' ? 'de' : 'en';

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
          <Divider />
          <StyledIconButton
            color="inherit"
            aria-label="toggle lang"
            onClick={() => {
              dispatch(setLang(newLang));
            }}
          >
            {lang}
          </StyledIconButton>
        </MenuDiv>
        {open && <ContentDiv>{children}</ContentDiv>}
      </StyledDrawer>
    </Box>
  );
}
