import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// MUI Components
import Button from '@material-ui/core/Button';
import { Input, Textarea } from './formControls';

// App Components

type CreateFormType = {
  initialValues: {
    amount: string,
    notes: string,
    purchaseDate: string,
  };
  onSubmit: (any) => void,
};


const CreateForm:FC<CreateFormType> = ({
  initialValues = {
    amount: '',
    notes: '',
    purchaseDate: '',
  },
  onSubmit,
}) => {
  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={Yup.object({
        amount: Yup.string()
          .required('Required')
          .max(15, 'Must be 15 characters or less'), // Avem limita de char ?
        purchaseDate: Yup.string()
          .required('Required')
          .max(15, 'Must be 15 characters or less'), // Avem limita de char ?
        notes: Yup.string(),

      })}
      onSubmit={onSubmit}
    >
      {({
        errors, isSubmitting, isValid, status, handleSubmit,
      }) => {
        return (
          <Form
            success={!!status && !!status.success}
            error={!!errors.submit}
            onSubmit={handleSubmit}
          >

            <Input
              label="Suma:"
              name="amount"
              type="number"
            />

            <Input
              label="Data:"
              name="purchaseDate"
              type="text"
            />

            <Textarea
              label="Descriere:"
              name="notes"
              type="text"
            />

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              variant="contained"
              color="primary"
              fullWidth
            >
              Confirm
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateForm;