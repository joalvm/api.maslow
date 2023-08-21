import Box, { BoxProps } from '@mui/material/Box';
import { FieldValues, FormProvider, FormProviderProps } from 'react-hook-form';

export type FormProps<TFieldValues extends FieldValues = FieldValues> = FormProviderProps<
    TFieldValues,
    unknown,
    TFieldValues | undefined
> &
    Omit<BoxProps, 'onSubmit'> & { onSubmit: (values: TFieldValues) => void };

const Form = <TFieldValues extends FieldValues = FieldValues>({
    children,
    onSubmit,
    ...props
}: FormProps<TFieldValues>) => {
    const { handleSubmit } = props;
    return (
        <FormProvider {...props}>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
                {children}
            </Box>
        </FormProvider>
    );
};

Form.displayName = 'Form';

export default Form;
