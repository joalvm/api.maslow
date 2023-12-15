import Grid from '@mui/material/Grid';

import ProfileAcountAvatar from './profile-acount-avatar.component';
import ProfileAccountBasicInfo from './profile-acount-basic-info.component';
import ProfileAccountUser from './profile-acount-user.component';

export default function ProfileTabPanelAcount() {
    return (
        <Grid container spacing={2} padding={{ md: 4 }}>
            <Grid item lg={2} md={3} sm={12} xs={12}>
                {/* Manejo del avatar del usuario */}
                <ProfileAcountAvatar />
            </Grid>
            <Grid item lg={10} md={9} sm={12} xs={12}>
                <ProfileAccountBasicInfo />
                <ProfileAccountUser />
            </Grid>
        </Grid>
    );
}
