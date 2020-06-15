/* eslint-disable no-console */
import React, { useState } from 'react';
import { pathOr, mergeDeepRight, omit } from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import SortBy from 'lib/components/SortBy';
// import RangeSlider from 'lib/components/form/RangeSlider.tsx';
// import RangePicker from 'lib/components/form/RangePicker.tsx';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { GET_PAGINATED_BONS, CREATE_BON } from './queries.tsx';
import DashboardContent from './content/DashboardContent.tsx';
import CreateForm from './CreateForm.tsx';
import Modal from '../../lib/components/Modal';

const useStyles = makeStyles(() => createStyles({
  button: {
    fontSize: '0.87rem',
  },
}));

interface DashboardProps {
  first?: number,
  skip?: number,
  orderBy?: String,
  enqueueSnackbar?: (text:String, { variant: string }) => void
}

const Dashboard:React.FC<DashboardProps> = ({
  first, skip, orderBy = 'createdAt_DESC', enqueueSnackbar,
}) => {
  const [sortBy, setSortBy] = useState<String>(orderBy);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const {
    loading, data, error, refetch, networkStatus, variables,
  } = useQuery(GET_PAGINATED_BONS, {
    variables: {
      first, skip, orderBy: sortBy, filter: undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  const classes = useStyles();


  const [openModal, setOpenModal] = useState<boolean>(false);
  const [saveBon] = useMutation(CREATE_BON);

  const handleDateChange = (date: Date | null) => {
    refetch({ filter: { purchaseDate: date } });
    setSelectedDate(date);
  };

  const onSubmit = async (values, {
    setSubmitting, setStatus, setErrors, resetForm,
  }) => {
    try {
      await saveBon({
        variables: {
          userId: 1,
          purchaseDate: values.purchaseDate,
          notes: values.notes,
          amount: values.amount,
        },
      });
      resetForm({});
      setStatus({ success: true });
      enqueueSnackbar('Bonul s-a salvat cu succes.', { variant: 'success' });
      setShouldRefetch(true);
    } catch (formError) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: formError.message });
      enqueueSnackbar(`${formError.message}`, { variant: 'error' });

      setShouldRefetch(false);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
    setOpenModal(false);
  };


  const handleSortBy = value => {
    setSortBy(value);
    setSelectedDate(null);
    refetch(mergeDeepRight(variables, { orderBy: value, filter: undefined }));
  };

  return (
    <div className="container w-100 mt-5">
      <div className="w-100 my-5 content-center justify-content-between">
        <div className="w-60 d-flex align-items-center justify-content-between">
          <SortBy
            handleSortBy={handleSortBy}
            sortBy={sortBy}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Alege o dată:"
              format="dd/MM/yyyy"
              value={selectedDate}
              onAccept={handleDateChange}
              onClose={() => {}}
              onChange={() => {}}
              allowKeyboardControl={false}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="secondary"
          size="small"
          className={`h-100 content-center ${classes.button}`}
        >
          Adaugă bon
        </Button>


      </div>
      <DashboardContent
        data={pathOr([], ['bons'], data)}
        loading={loading || networkStatus === 4}
        error={error}
        refetch={refetch}
      />
      <Modal
        open={openModal}
        title="Adauga un nou bon"
        closeButton
        onClose={handleCloseModal}
      >
        <CreateForm onSubmit={onSubmit} />
      </Modal>
    </div>

  );
};

export default withSnackbar(Dashboard);