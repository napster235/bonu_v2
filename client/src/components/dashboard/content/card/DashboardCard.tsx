/* eslint-disable no-console */
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import { withSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Tag, Calendar, Info, Edit, Trash,
} from 'react-feather';
import { DELETE_BON, UPDATE_BON } from 'components/dashboard/queries.tsx';
import CreateForm from 'components/dashboard/CreateForm.tsx';
import Modal from 'lib/components/Modal.tsx';
import { useMutation } from '@apollo/react-hooks';
import ActionButton from './ActionButton.tsx';

const defaultTextColor =  '#f9fafc';
const gridContainerPadding = 200;

const useStyles =  makeStyles((theme: Theme) =>   createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textColor: {
    color: defaultTextColor,
  },
  text: {
    color: defaultTextColor,
    fontSize: '1rem',
  },
  root: {
    minWidth: 275,
    margin: '0 4rem',
  },
  title: {
    fontSize: 14,
  },
  fieldValue: {
    fontWeight: 'bold',
    color: defaultTextColor,
    fontSize: '1rem',
    marginLeft: '0.5rem',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  grid: {
    maxHeight: `calc(100% - ${gridContainerPadding}px)`,
    height: `calc(100% - ${gridContainerPadding}px)`,
    overflowY: 'auto',
  },
  cardControllers: {
    width: '10% !important',
    display: 'flex',
    flexDirection: 'column',
  },
}));


const DashboardCardContentItem = ({
  classes, label, value, icon,
}) => {
  return (
    <div className="d-flex align-items-center">
      { icon() }
      <div className={classes.text}>
        {`${label}: `}
      </div>
      <Tooltip title={`${label}: ${value}`} placement="left-start">
        <div className={classes.fieldValue}>
          {value}
        </div>
      </Tooltip>
    </div>
  );
};


interface DashboardCardProps {
  data: {
    purchaseDate?: string,
    notes?: string,
    amount?: number,
    id: number,
  },
  refetch: any | undefined
  enqueueSnackbar: (any) => void,
}

const DashboardCard:React.FC<DashboardCardProps> = ({ data, refetch, enqueueSnackbar }) => {
  const {
    purchaseDate = '', notes = '', amount = 0, id,
  } = data;
  const classes = useStyles();
  const [updateBon] = useMutation(UPDATE_BON);


  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);


  const onSubmit = async (values, {
    setSubmitting, setStatus, setErrors, resetForm,
  }) => {
    console.log(updateBon);

    try {
      await updateBon({
        variables: {
          userId: 1,
          purchaseDate: values.purchaseDate,
          notes: values.notes,
          amount: values.amount,
          id,
        },
      });
      resetForm({});
      setStatus({ success: true });
      setShouldRefetch(true);
      enqueueSnackbar('Bonul s-a salvat cu succes.', { variant: 'success' });
    } catch (formError) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: formError.message });
      enqueueSnackbar(`${formError.message}`, { variant: 'error' });

      setShouldRefetch(false);
    }
    setOpenModal(false);
  };


  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
    setOpenModal(false);
  };

  return (
    <Grid item xs={6} key={`${id}`}>
      <Card className={classes.root}>
        <div className="d-flex w-100">
          <div className="w-90">
            <CardContent>
              <DashboardCardContentItem
                classes={classes}
                label="Sumă"
                value={`${amount} RON`}
                icon={() => <Tag size={16} color={defaultTextColor} className="mr-2" />}
              />
              <DashboardCardContentItem
                classes={classes}
                label="Dată"
                value={purchaseDate}
                icon={() => <Calendar size={16} color={defaultTextColor} className="mr-2" />}
              />

              {notes
                ? (
                  <DashboardCardContentItem
                    classes={classes}
                    label="Descriere"
                    value={notes}
                    icon={() => <Info size={16} color={defaultTextColor} className="mr-2" />}
                  />
                ) : null}
            </CardContent>
          </div>
          <div className={classes.cardControllers}>
            <ActionButton
              tooltipText="Editare"
              icon={() => <Edit size={16} color={defaultTextColor}  />}
              handleClick={handleOpenModal}
            />
            <ActionButton
              tooltipText="Ștergere"
              icon={() => <Trash size={16} color={defaultTextColor}  />}
              variables={{ id }}
              actionQuery={DELETE_BON}
              refetch={refetch}
              warning
            />
          </div>
        </div>

      </Card>
      <Modal
        open={openModal}
        title="Editeaza acest bon"
        closeButton
        onClose={handleCloseModal}
      >
        <CreateForm
          onSubmit={onSubmit}
          initialValues={{
            purchaseDate,
            notes,
            amount,
          }}
        />
      </Modal>
    </Grid>
  );
};

export default withSnackbar(DashboardCard);