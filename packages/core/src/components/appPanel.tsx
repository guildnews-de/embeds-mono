import { type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
  Language as LangIcon,
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
  Tooltip,
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
const teamMods = document.getElementById('wpadminbar') !== null;

const drawerBaseCss = (): CSSObject => ({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  alignItems: 'center',
  // backgroundColor: theme.palette.grey[500],
  backgroundColor: 'transparent',
  border: 'none',
  // borderRadius: theme.spacing(1, 0, 0, 1),
});

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
  ...drawerBaseCss(),
});

const openedMixinWide = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: '100vw',
  ...drawerBaseCss(),
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
  ...drawerBaseCss(),
});

const MenuDiv = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 0),
}));

const MenuGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: teamMods ? theme.spacing(4.5) : theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[500],
  borderRadius: theme.spacing(1, 0, 0, 1),
}));

const ContentDiv = styled(Box)(({ theme }) => ({
  height: '100%',
  flexGrow: 1,
  overflow: 'hidden',
  // marginLeft: theme.spacing(0.5),
  paddingTop: teamMods ? theme.spacing(4) + ' !important' : undefined,
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
  const { groupNames } = useAppSelector((state) => state.marker);

  const wideClickAction = toggleWide();
  const WideIndicator = wide ? ZoomInMap : ZoomOutMap;

  const openClickAction = open ? closeCanvas() : openCanvas();
  const OpenIndicator = open ? ChevronRight : ChevronLeft;
  const newLang = lang === 'en' ? 'de' : 'en';
  const newLangText = lang === 'en' ? 'Sprache wechseln' : 'Switch language';

  return (
    <Box className="Box">
      <StyledDrawer
        className="Drawer"
        anchor="right"
        variant="permanent"
        open={open}
        wide={wide}
      >
        <MenuDiv height={'100%'}>
          {groupNames && groupNames.length > 0 && (
            <MenuGroup>
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
            </MenuGroup>
          )}
          <Box flexGrow={10} />
          <MenuGroup>
            <Tooltip title={newLangText} placement="left">
              <StyledIconButton
                color="inherit"
                aria-label="toggle lang"
                // sx={{alignSelf}}
                onClick={() => {
                  dispatch(setLang(newLang));
                }}
              >
                <LangIcon />
              </StyledIconButton>
            </Tooltip>
          </MenuGroup>
        </MenuDiv>
        {<ContentDiv>{children}</ContentDiv>}
      </StyledDrawer>
    </Box>
  );
}
