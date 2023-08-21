import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export default function Copyright(props: PropsWithChildren<unknown>) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' to='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
