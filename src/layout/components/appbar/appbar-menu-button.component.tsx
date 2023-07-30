import { useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Button from '@mui/material/Button';

export default function AppBarMenuButton() {
    const { sidebarOpened, setSidebarOpened } = useAdminLayoutContext();

    return (
        <Button
            type='button'
            color='inherit'
            aria-label='menu'
            variant='outlined'
            disableElevation
            disableRipple
            focusRipple
            onClick={() => setSidebarOpened(!sidebarOpened)}
            sx={{ px: 1, minWidth: 32 }}
        >
            {sidebarOpened ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
        </Button>
    );
}
