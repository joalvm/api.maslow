import { useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from '@mui/material/IconButton';

export default function AppBarMenuButton() {
    const { sidebarOpened, setSidebarOpened } = useAdminLayoutContext();

    return (
        <IconButton
            type='button'
            color='inherit'
            aria-label={sidebarOpened ? 'Cerrar menú' : 'Abrir menú'}
            disableFocusRipple
            disableTouchRipple
            onClick={() => setSidebarOpened(!sidebarOpened)}
            sx={{ px: 1 }}
        >
            {sidebarOpened ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
        </IconButton>
    );
}
