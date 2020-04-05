/* eslint-disable no-console */
import React, { useState } from 'react';
import { pathOr, mergeDeepRight } from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import { PlusCircle } from 'react-feather';
import { GET_PAGINATED_BONS, CREATE_BON } from './queries.tsx';
import DashboardHeader from './header/DashboardHeader.tsx';
import DashboardContent from './content/DashboardContent.tsx';
import CreateForm from './header/CreateForm.tsx';
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

  const {
    loading, data, error, refetch, networkStatus, variables,
  } = useQuery(GET_PAGINATED_BONS, {
    variables: { first, skip, orderBy: sortBy },
    notifyOnNetworkStatusChange: true,
  });

  const classes = useStyles();


  const [openModal, setOpenModal] = useState<boolean>(false);
  const [saveBon] = useMutation(CREATE_BON);


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
    refetch(mergeDeepRight(variables, { orderBy: value }));
  };


  return (
    <div className="container mt-5">
      <div className="w-100 d-flex">
        <h3 className="w-50 m-0 p-0">
          Listă bonuri
        </h3>
        <div className="w-50 text-right">
          <Button
            onClick={handleOpenModal}
            variant="text"
            color="secondary"
            className={`h-100 content-center ${classes.button}`}
            startIcon={<PlusCircle className="p-0 m-0" color="#3a6fcf" />}
            size="large"
          >
            <div className="p-2 font-weight-bold">
              Adaugă bon
            </div>
          </Button>
        </div>

      </div>
      <DashboardHeader
        handleClick={handleOpenModal}
        handleSortBy={handleSortBy}
        orderBy={sortBy}
      />
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