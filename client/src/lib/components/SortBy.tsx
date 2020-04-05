import React from 'react';

// MUI Components
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(() =>   createStyles({
  text: {
  },

}));

interface SortByProps {
  handleSelect: (any) => void,
  options: Array<{ id: 1, name: 'all'}>,
  defaultValue: string,
}


const SortBy: React.FC<SortByProps> = ({ options, handleSelect, defaultValue }) => {
  const [selection, setSelection] = React.useState([defaultValue] as any);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: Array<string> | string[] }>) => {
    const { value }  = event.target;
    setSelection(value);
    handleSelect(value);
  };


  return (
    <div className="d-flex align-items-center">
      <div className={`${classes.text} mr-2`}>
        Sortează după
      </div>
      <FormControl style={{ minWidth: 420 }}>
        <Select
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          value={selection}
          onChange={handleChange}
          displayEmpty
        >
          {options.map(d => {
            return (
              <MenuItem disableGutters className="multi-select-menu-item" key={d.id} value={d.id}>
                <div className={`${classes.text} w-80 ml-3`}>
                  {d.name}
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>

  );
};

export default SortBy;
