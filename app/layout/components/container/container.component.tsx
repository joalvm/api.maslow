import MuiContainer, { ContainerProps as MuiContainerProps } from '@mui/material/Container';

type ContainerProps = MuiContainerProps;

export default function Container({ children, ...other }: ContainerProps) {
    return (
        <>
            <MuiContainer {...other} disableGutters>
                {children}
            </MuiContainer>
        </>
    );
}
