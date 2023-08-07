import Logo from '@assets/images/logos/logo.png';
import Copyright from '@components/copyright.component';
import { useAuthProviderContext } from '@contexts/auth-provider.context';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import ListItemClient from './components/client-selector-list-item-client.component';

const Container = styled(MuiContainer)({
    minHeight: 500,
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
});

const Main = styled(Box)({
    width: '300px',
    mt: '-10%',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'inherit',
    alignItems: 'center',
});

export default function ClientSelectorPage() {
    const { logout } = useAuthProviderContext();
    const { clients, currentClient, selectCurrentClient } = useAuthProviderContext();
    const [selectedValue, setSelectedValue] = useState<string>(currentClient?.id.toString() || '');

    const handleRadioChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }, []);

    const handleCancel = useCallback(() => {
        setSelectedValue('');
        logout();
    }, []);

    const handleSelectClient = useCallback(() => {
        selectCurrentClient(Number(selectedValue));
    }, [selectedValue]);

    return (
        <Container maxWidth='sm'>
            <Main>
                <Box sx={{ mb: 6 }}>
                    <img src={Logo} alt='Logo Maslow Perú' />
                </Box>
                <Box sx={{ maxWidth: '100%', maxHeight: 400, overflow: 'auto' }}>
                    <List
                        sx={{
                            maxWidth: '100%',
                            bgcolor: 'background.paper',
                            mb: 4,
                        }}
                        subheader={<ListSubheader>Seleccione un cliente</ListSubheader>}
                    >
                        {clients.map((client, index) => (
                            <ListItemClient
                                key={client.id}
                                client={client}
                                autoFocus={index === 0 && !currentClient}
                                selectedValue={selectedValue}
                                handleRadioChange={handleRadioChange}
                            />
                        ))}
                    </List>
                </Box>
                <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    spacing={2}
                    width='100%'
                    alignItems='stretch'
                    justifyContent='center'
                >
                    <Button fullWidth variant='text' color='inherit' onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button fullWidth variant='outlined' color='primary' onClick={handleSelectClient}>
                        Seleccionar
                    </Button>
                </Stack>
                <Box sx={{ position: 'absolute', bottom: 10 }}>
                    <Copyright />
                </Box>
            </Main>
        </Container>
    );
}
