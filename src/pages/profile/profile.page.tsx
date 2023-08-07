import TabPanel from '@components/tab-panel.component';
import Container from '@layout/components/container/container.component';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

import ProfileTabPanelBasicInfo from './components/profile-tab-panel-basic-info.component';
import ProfileTabPanelChangePassword from './components/profile-tab-panel-change-password.component';

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default function ProfilePage() {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth='md' component={Card} {...{ variant: 'outlined' }} sx={{ mt: { md: 2 } }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label='Información Personal' {...a11yProps(0)} />
                        <Tab label='Cambiar contraseña' {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ProfileTabPanelBasicInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProfileTabPanelChangePassword />
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}
