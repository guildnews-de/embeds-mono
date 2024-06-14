import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight /* , Menu */ } from '@mui/icons-material';
import {
  // AppBar,
  // type AppBarProps as MuiAppBarProps,
  Box,
  CssBaseline,
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
  useTheme,
} from '@mui/material';

const drawerWidth = 480;

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  display: 'flex',
  flexDirection: 'column-reverse',
  overflowX: 'hidden',
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: 'flex',
  flexDirection: 'column-reverse',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(4)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 0),
  // minHeight: theme.spacing(4),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const StyledAppBar = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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

export default function AppDrawer({ children }: { children?: ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className="Box">
      <CssBaseline />
      <StyledDrawer
        className="Drawer"
        anchor="right"
        variant="permanent"
        open={open}
      >
        <Divider className="Divider" />
        {children}
        <StyledDiv className="styledDiv">
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
        </StyledDiv>
      </StyledDrawer>
    </Box>
  );
}
