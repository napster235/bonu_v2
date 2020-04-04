import React, { FC } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import { useStyles__Form } from './index';

interface FormControlType {
  label?: string,
  id?: string,
  name: string,
}


interface TextareaType extends FormControlType {
  type: 'text',
  rows?: number,
  cols?: number
}

export const Textarea:FC<TextareaType> = ({
  name, id, label, rows = 3, cols = 2, ...props
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

      <textarea
        rows={rows}
        cols={cols}
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
