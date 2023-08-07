import { forwardRef, PropsWithChildren, useId } from 'react';

interface TabPanelProps extends PropsWithChildren {
    index: number;
    value: number;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(({ index, value, children, ...other }, ref) => {
    const id = useId();

    return (
        <div role='tabpanel' hidden={value !== index} id={`${id}-tabpanel-${index}`} ref={ref} {...other}>
            {value === index && children}
        </div>
    );
});

export default TabPanel;
