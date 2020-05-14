import { makeStyles } from '@material-ui/core/styles';

export const useStyles__Pagination = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(5),
    },
  },
}));
