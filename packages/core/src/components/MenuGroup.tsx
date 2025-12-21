import { Box, BoxProps, styled } from '@mui/material';

interface MenuGroupProps extends BoxProps {
  teamMods?: boolean;
}

interface StyledMenuGroupProps {
  teamMods?: boolean;
}

const StyledMenuGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'teamMods',
})<StyledMenuGroupProps>(({ theme, teamMods }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: teamMods ? theme.spacing(4.5) : theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[500],
  borderRadius: theme.spacing(0.5, 0, 0, 0.5),
}));

export default function MenuGroup({ children, teamMods }: MenuGroupProps) {
  return <StyledMenuGroup teamMods={teamMods}>{children}</StyledMenuGroup>;
}
