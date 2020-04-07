import React, { FC } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import { useStyles__Form } from './index';

interface FormControlType {
  label?: string,
  id?: string,
  name: string,
}

interface InputType extends FormControlType {
  type: 'text' | 'password' | 'url' | 'number'
}

export const Input:FC<InputType> = ({
  name, id, label, ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(name);
  const classes = useStyles__Form();
  const hasError = meta.touched && meta.error;

  return (
    <div className={classes.fieldWrapper}>
      {label && (
        <label
          className={classes.label}
          htmlFor={id || name}
        >
            {label}
        </label>
      )}

      <input
        className={classnames(classes.formControl, { [`${classes.formControlError}`]: hasError })}
        {...field}
        {...props}
      />

      {hasError ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
