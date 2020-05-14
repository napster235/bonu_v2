import React, { FC } from 'react';

// MUI Components
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

interface SortByProps {
  sortBy?: String,
  handleSortBy: (props: any) => void,
}


const OPTIONS = [
  {
    id: 'createdAt_DESC',
    name: 'Descrescător după data creării',
  },
  {
    id: 'createdAt_ASC',
    name: 'Crescător după data creării',
  },
  {
    id: 'purchase_dates_ASC',
    name: 'Crescător după data achizitionarii',
  },
  {
    id: 'purchase_dates_DESC',
    name: 'Descrescător după data achizitionarii',
  },
  {
    id: 'amount_ASC',
    name: 'Crescător după sumă',
  },
  {
    id: 'amount_DESC',
    name: 'Descrescător după sumă',
  },
];

const SortBy: FC<SortByProps> = ({
  handleSortBy,
  sortBy,
}) => {
  const [selection, setSelection] = React.useState([sortBy] as any);

  const handleChange = (event: React.ChangeEvent<
    {
      name?: string | undefined;
      value: Array<string> | string[]
    }
  >) => {
    const { value }  = event.target;
    setSelection(value);
    handleSortBy(value);
  };

  return (
    <div>
      <Typography id="range-slider" gutterBottom>
        Ordonează după:
      </Typography>
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
          {OPTIONS.map(d => {
            return (
              <MenuItem disableGutters className="multi-select-menu-item" key={d.id} value={d.id}>
                <div className="w-80 ml-3">
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
