import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { useId } from 'react';
import { Control, Controller, FieldValues, Path, useController } from 'react-hook-form';

export type SelectOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
};

export type SelectProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>;
    label: string;
    options: SelectOption[];
    control?: Control<TFieldValues>;
} & Omit<React.ComponentProps<typeof MuiSelect>, 'name'>;

export default function Select<TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    control,
    options,
    ...others
}: SelectProps<TFieldValues>) {
    const id = useId();
    const { fieldState, formState } = useController({
        name,
        control,
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                /* Convertir el filled a outlined */
                <FormControl fullWidth variant='outlined' disabled={formState.isSubmitting}>
                    <InputLabel id={`${id}-label`} htmlFor={`${id}-input`}>
                        {label}
                    </InputLabel>
                    <MuiSelect id={`${id}-select`} labelId={`${id}-label`} label={label} {...others} {...field}>
                        {options.map((option, index) => (
                            <MenuItem
                                key={`${index}-${id}-item`}
                                dense
                                value={option.value}
                                disabled={option?.disabled ?? false}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </MuiSelect>
                    {fieldState.error && (
                        <FormHelperText error={!!fieldState.error} id={`${id}-description`}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}
