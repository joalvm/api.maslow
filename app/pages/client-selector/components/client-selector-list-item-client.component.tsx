import { ClientBasic } from '@api/resources/clients/client.interface';
import storage from '@api/utils/storage.util';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

interface ListItemClientProps {
    client: ClientBasic;
    selectedValue: string;
    autoFocus?: boolean;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ListItemClient({ client, selectedValue, handleRadioChange, autoFocus }: ListItemClientProps) {
    return (
        <ListItem
            key={client.id}
            alignItems='flex-start'
            secondaryAction={
                <Radio
                    autoFocus={autoFocus}
                    value={client.id.toString()}
                    checked={selectedValue === client.id.toString()}
                    onChange={handleRadioChange}
                    name='rb-selected-client'
                    edge='end'
                />
            }>
            <ListItemAvatar>
                <Avatar alt={`Logo ${client.name}`} src={storage(client?.logo_url)} />
            </ListItemAvatar>
            <ListItemText
                primary={client.name}
                // wrap
                sx={{
                    maxWidth: '500px',
                }}
                secondary={
                    <Typography sx={{ display: 'block' }} variant='body2' color='text.primary' noWrap={true}>
                        {client.business_name}
                        {` - ${client.address}`}
                    </Typography>
                }
            />
        </ListItem>
    );
}
