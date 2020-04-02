import React, { FC } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';

// MUI Components
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles__Form = makeStyles((theme: Theme) => createStyles({
  fieldWrapper: {
    position: 'relative',
    marginBottom: '2rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
  },
  formControl: {
    width: '100%',
    height: '2.5rem',
    padding: theme.spacing(0.5, 1),
    fontSize: '1rem',
    color: '#222843',
    backgroundColor: '#F8FBFC',
    border: '1px solid rgba(92, 136, 154, 0.2)',
    boxShadow: 'inset 0px 1px 4px rgba(39, 49, 51, 0.08)',
  },
  formControlError: {
    borderColor: 'red',
  },
  select: {
    margin: 0,
    webkitAppearance: 'none',
    boxSizing: 'border-box',
  },

  error: { // error handle is not present in design mockups
    position: 'absolute',
    bottom: '-1.5rem',
    color: 'red',
    fontSize: '0.75rem',
  },
}));

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

      {hasError ? ( // error handle is not present in design mockups
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

interface TextareaType extends FormControlType {
  type: 'text' | 'password' | 'url' | 'number'
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

      {hasError ? ( // error handle is not present in design mockups
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};


type SelectOptionsType = {
  value: string,
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
