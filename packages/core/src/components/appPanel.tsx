import { ReactNode, useState } from 'react';
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
  borderRadius: theme.spacing(0),
  padding: theme.spacing(0, 0),
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
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

export default function AppDrawer({
  children,
  ...props
}: {
  children?: ReactNode;
}) {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
        <MenuDiv className="styledDiv" style={{ backgroundColor: '#c3c3c3' }}>
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
        <ContentDiv style={{ backgroundColor: '#h5h5h5' }}>
          {children}
        </ContentDiv>
      </StyledDrawer>
    </Box>
  );
}
