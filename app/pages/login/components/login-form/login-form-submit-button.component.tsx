import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormContext } from 'react-hook-form';
export default function LoginFormSubmitButton() {
    const { formState } = useFormContext();

    return (
        <LoadingButton
            type='submit'
            fullWidth
            variant='outlined'
            loading={formState.isSubmitting}
            loadingPosition='start'
            startIcon={<LoginOutlinedIcon />}
        >
            Iniciar Sesión
        </LoadingButton>
    );
}
