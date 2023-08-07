import MuiContainer, { ContainerProps as MuiContainerProps } from '@mui/material/Container';

type ContainerProps = MuiContainerProps;

export default function Container(props: ContainerProps) {
    return <MuiContainer {...props} disableGutters />;
}
