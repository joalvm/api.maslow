import { useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from '@mui/material/IconButton';

export default function AppBarMenuButton() {
    const { sidebarOpened, setSidebarOpened } = useAdminLayoutContext();

    return (
        <IconButton
            type='button'
            edge='start'
            color='inherit'
            aria-label='menu'
            focusRipple
            onClick={() => setSidebarOpened(!sidebarOpened)}
        >
            {sidebarOpened ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
        </IconButton>
    );
}
