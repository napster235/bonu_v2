import React, { FC } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';

import { useStyles__Form } from './index';

type SelectOptionsType = {
  value: string,
  name: string,
}

interface FormControlType {
  label?: string,
  id?: string,
  name: string,
}


interface SelectType extends FormControlType {
  options: SelectOptionsType[],
}

export const Select:FC<SelectType> = ({
  label, options, name, id, ...props
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles__Form();
  const hasError = meta.touched && meta.error;

  return (
    <div className={classes.fieldWrapper}>

      <label
        className={classes.label}
        htmlFor={id || name}
      >
        {label}
      </label>

      <select
        className={classnames(classes.formControl, { [`${classes.formControlError}`]: hasError })}
        {...field}
        {...props}
      >
        { options.map(({ value, name: optionName }) => <option value={value} key={value}>{optionName}</option>) }
      </select>

      {hasError ? ( // error handle is not present in design mockups
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
