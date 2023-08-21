import { useLayoutContext } from '@contexts/layout.context';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const Transition = (props: SlideProps) => {
    const { isMobile } = useLayoutContext();
    return <Slide {...props} direction={isMobile ? 'up' : 'left'} />;
};

const Counter = styled('div')(({ theme }) => ({
    color: 'rgba(0, 0, 0, 0.54)',
    position: 'absolute',
    right: theme.spacing(4.25),
    top: theme.spacing(2.3),
    fontSize: '0.7rem',
    textAlign: 'right',
    width: '100%',
    fontWeight: 500,
}));

const Progress = styled(LinearProgress)(() => ({
    color: 'inherit',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 2,
    [`&.${linearProgressClasses.bar}`]: {
        backgroundColor: 'red',
    },
}));

const Alert = styled(MuiAlert)(() => ({
    position: 'relative',
    '& .MuiAlert-message': {
        fontSize: '0.80rem',
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        height: '100%',
        maxHeight: 92,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: 0,
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.25)',
            outline: '1px solid rgba(0,0,0,.3)',
        },
    },
}));

function anchorOrigin(isMobile: boolean) {
    return {
        vertical: isMobile ? 'bottom' : 'top',
        horizontal: isMobile ? 'center' : 'right',
    } as SnackbarProps['anchorOrigin'];
}

interface ToastProps {
    message: string;
    severity: MuiAlertProps['severity'];
    counter: number;
    onClose: () => void;
}

export default function Toast({ message, severity, onClose, counter }: ToastProps) {
    const duration = 6000;
    const { isMobile } = useLayoutContext();
    const [progressValue, setProgressValue] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (!open) {
            return;
        }

        const intervalId = setInterval(() => {
            setProgressValue((currentProgress) => {
                const increment = (1000 / duration) * 100;
                const newProgress = Math.round(currentProgress + increment);

                if (newProgress >= 100) {
                    setOpen(false);
                    setTimeout(() => {
                        onClose();
                    }, 500);
                    clearInterval(intervalId);
                    return 100;
                }

                return newProgress;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Snackbar
            open={open}
            anchorOrigin={anchorOrigin(isMobile)}
            autoFocus={true}
            autoHideDuration={null}
            TransitionComponent={Transition}
            onClose={onClose}
            ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
            sx={(theme) => ({ top: { md: theme.spacing(10) }, zIndex: theme.zIndex.drawer - 1 })}
        >
            <Alert severity={severity} onClose={onClose} variant='filled'>
                {message}
                {counter > 1 && <Counter>{`${counter > 9 ? '9' : counter - 1}+`}</Counter>}
                <Progress variant='determinate' color='inherit' value={progressValue} />
            </Alert>
        </Snackbar>
    );
}
