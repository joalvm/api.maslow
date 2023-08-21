import Gender from '@api/resources/persons/domain/gender.enum';
import { FieldValues } from 'react-hook-form';

import Select, { SelectProps } from './select.component';

type SelectGenderProps<TFieldValues extends FieldValues = FieldValues> = Omit<SelectProps<TFieldValues>, 'options'>;

export default function SelectGender<TFieldValues extends FieldValues = FieldValues>(
    props: SelectGenderProps<TFieldValues>,
) {
    return (
        <Select
            {...props}
            options={[
                { value: '', label: 'Seleccione un género', disabled: true },
                { value: Gender.MALE, label: 'Masculino' },
                { value: Gender.FEMALE, label: 'Femenino' },
            ]}
        />
    );
}
