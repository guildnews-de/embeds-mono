import {
  IconButton,
  styled,
  Tooltip,
  type TooltipProps,
  type SvgIcon,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
  Language,
  ErrorOutline,
} from '@mui/icons-material';

type MuiSvgIcon = typeof SvgIcon;

const muiIcons: Record<string, MuiSvgIcon> = {
  ChevronLeft,
  ChevronRight,
  ZoomOutMap,
  ZoomInMap,
  Language,
  ErrorOutline,
} as const;

type MuiIconKey = keyof typeof muiIcons;

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
    const Icon = muiIcons[name] ?? ErrorOutline;
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
