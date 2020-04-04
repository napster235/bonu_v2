/* eslint-disable no-console */
import React, { useState } from 'react';
import { pathOr, mergeDeepRight } from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { GET_PAGINATED_BONS, CREATE_BON } from './queries.tsx';
import BonsHeader from './header/DashboardHeader.tsx';
import BonsBody from './content/DashboardContent.tsx';
import CreateForm from './header/CreateForm.tsx';
import Modal from '../../lib/components/Modal';

const defaultTextColor =  '#3d4977';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
});

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
      <div className="w-100 d-flex flex-column">
        <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
          Listă bonuri
        </Box>
      </div>
      <BonsHeader
        handleClick={handleOpenModal}
        handleSortBy={handleSortBy}
        orderBy={sortBy}
      />
      <BonsBody
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