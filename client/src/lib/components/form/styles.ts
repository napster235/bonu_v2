
// MUI Components
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles__Form = makeStyles((theme: Theme) => createStyles({
  fieldWrapper: {
    position: 'relative',
    marginBottom: '2rem',
  },
  label: {
    // fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    color: '#f9fafc',
  },
  formControl: {
    width: '100%',
    height: '2.5rem',
    padding: theme.spacing(0.5, 1),
    fontSize: '1rem',
    color: '#f9fafc',
    backgroundColor: '#424242',
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
