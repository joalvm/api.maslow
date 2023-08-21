import Input from '@components/forms/input.component';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export default function InputPassword<TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    control,
}: {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <Input
            name={name}
            control={control}
            label={label}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <IconButton type='button' size='small' onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
            }
        />
    );
}
