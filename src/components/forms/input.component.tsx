import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useId } from 'react';
import { Control, Controller, FieldValues, Path, useController } from 'react-hook-form';

type InputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>;
    label: string;
    control?: Control<TFieldValues>;
} & Omit<React.ComponentProps<typeof OutlinedInput>, 'name'>;

const Input = <TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    control,
    ...others
}: InputProps<TFieldValues>) => {
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
                <FormControl fullWidth variant='outlined' disabled={formState.isSubmitting}>
                    <InputLabel id={`${id}-label`} htmlFor={`${id}-input`}>
                        {label}
                    </InputLabel>
                    <OutlinedInput
                        id={`${id}-input`}
                        aria-describedby={`${id}-description`}
                        label={label}
                        disabled={formState.isSubmitting}
                        {...others}
                        {...field}
                    />
                    {fieldState.error && (
                        <FormHelperText error={!!fieldState.error} id={`${id}-description`}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default Input;
