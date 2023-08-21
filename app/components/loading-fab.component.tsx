import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Fab from '@mui/material/Fab';
import { styled, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

interface LoadingFabProps extends Omit<LoadingButtonProps, 'variant'> {
    label?: string;
    icon: 'add' | 'edit' | 'save' | 'create';
}

const MyFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: 16,
    right: 16,
    borderRadius: '25%',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
}));

function Icon({ type }: { type: LoadingFabProps['icon'] }) {
    switch (type) {
        case 'add':
            return <AddOutlinedIcon />;
        case 'edit':
            return <EditOutlinedIcon />;
        case 'save':
        case 'create':
            return <SaveOutlinedIcon />;
        default:
            return null;
    }
}

function LoadingFab({ label, sx, icon, ...others }: LoadingFabProps) {
    const theme = useTheme();

    const FabElement = (
        <MyFab
            {...{ component: LoadingButton }}
            variant='circular'
            aria-label={label}
            sx={{
                ...sx,
                position: 'fixed',
                bottom: { xs: 16, sm: 32 },
                right: { xs: 16, sm: 32 },
                borderRadius: '25%',
            }}
            {...others}
        >
            {!others.loading && <Icon type={icon} />}
        </MyFab>
    );

    return (
        <Zoom
            in
            unmountOnExit
            timeout={{
                enter: theme.transitions.duration.enteringScreen,
                exit: theme.transitions.duration.leavingScreen,
            }}
            style={{
                transitionDelay: `${theme.transitions.duration.leavingScreen}ms`,
            }}
        >
            {label ? (
                <Tooltip title={label} arrow enterDelay={1000} placement='left-start'>
                    {FabElement}
                </Tooltip>
            ) : (
                FabElement
            )}
        </Zoom>
    );
}

LoadingFab.defaultProps = {
    label: '',
};

export default LoadingFab;
