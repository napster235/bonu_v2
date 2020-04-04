import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface FormControlType {
  label?: string,
  id?: string,
  name: string,
}

interface DatePickerProps extends FormControlType {
  type: 'text' | 'password' | 'url' | 'number',
  setFieldValue: (a: string, b:Date) => void,
  value: Date,
  format?: string,
}

export const DatePicker: FC<DatePickerProps> = ({
  setFieldValue,
  value = new Date(),
  name,
  id,
  label,
  format = 'yyyy/MM/dd',
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format={format}
        margin="normal"
        name={name}
        id={id}
        label={label}
        onChange={(newValue:Date) => {
          setFieldValue(name, newValue);
        }}
        value={value}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
