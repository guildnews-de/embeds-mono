import { IconButton, styled, Tooltip, type TooltipProps } from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
  Language,
  ErrorOutline,
} from '@mui/icons-material';

const muiIcons = {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
  Language,
  ErrorOutline,
};

type MuiIconKey = keyof typeof muiIcons;

function isMuiIconKey(key: string): key is MuiIconKey {
  return Object.keys(muiIcons).includes(key);
}

interface MenuItemProps {
  tooltip: string;
  icon: MuiIconKey;
  aria?: string;
  placement?: TooltipProps['placement'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MenuItem(props: MenuItemProps) {
  const { tooltip, icon, aria, placement = 'left', onClick } = props;

  const MuiIcon = ({ name }: { name: string }) => {
    const Icon = isMuiIconKey(name) ? muiIcons[name] : muiIcons.ErrorOutline;
    return <Icon />;
  };

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.25),
    margin: theme.spacing(0.25),
    color: theme.palette.grey[800],
  }));

  return (
    <Tooltip title={tooltip} placement={placement}>
      <StyledIconButton
        color="inherit"
        aria-label={aria ?? tooltip}
        onClick={onClick}
      >
        <MuiIcon name={icon} />
      </StyledIconButton>
    </Tooltip>
  );
}
