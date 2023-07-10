import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { useId } from 'react';
import { Control, Controller, FieldValues, Path, useController } from 'react-hook-form';

export interface SwitchProps<TFieldValues extends FieldValues = FieldValues> extends Omit<MuiSwitchProps, 'name'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
}

const Switch = <TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    control,
    required,
    disabled,
    ...props
}: SwitchProps<TFieldValues>) => {
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
                <FormControlLabel
                    id={`${id}-label`}
                    disabled={disabled || formState.isSubmitting}
                    required={required}
                    checked={field.value}
                    color={fieldState.error ? 'error' : 'primary'}
                    control={<MuiSwitch {...props} {...field} />}
                    label={label}
                />
            )}
        />
    );
};

Switch.displayName = 'Switch';

export default Switch;
