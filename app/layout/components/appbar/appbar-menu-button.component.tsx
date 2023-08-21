import { useLayoutContext } from '@contexts/layout.context';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from '@mui/material/IconButton';

export default function AppBarMenuButton() {
    const { sidebarOpened, toggleSidebarOpened } = useLayoutContext();

    return (
        <IconButton
            type='button'
            color='inherit'
            aria-label={sidebarOpened ? 'Cerrar menú' : 'Abrir menú'}
            disableFocusRipple
            disableTouchRipple
            onClick={() => toggleSidebarOpened()}
            sx={{ px: 1 }}
        >
            {sidebarOpened ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
        </IconButton>
    );
}
