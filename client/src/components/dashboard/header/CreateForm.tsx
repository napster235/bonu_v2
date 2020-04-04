import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// MUI Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Input, Textarea, DatePicker } from 'lib/components/form';


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
    purchaseDate: new Date(),
  },
  onSubmit,
}) => {
  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={Yup.object({
        amount: Yup.string()
          .required('Required'),
        purchaseDate: Yup.string()
          .required('Required'),
        notes: Yup.string(),

      })}
      onSubmit={onSubmit}
    >
      {({
        isSubmitting, isValid, setFieldValue, values, ...rest
      }) => {
        console.log(rest);
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Input
                  label="Suma:"
                  name="amount"
                  type="number"
                />
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  label="Data:"
                  name="purchaseDate"
                  type="text"
                  value={values.purchaseDate || initialValues.purchaseDate}
                  setFieldValue={setFieldValue}
                />
              </Grid>
            </Grid>

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