import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value: number) {
  return `${value} RON`;
}

interface RangeSliderProps {
  from: number,
  to: number,
  handleChange: (any) => void,
}

const RangeSlider:FC<RangeSliderProps> = ({ handleChange, from, to }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([from, to]);

  const onSlide = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    handleChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Interval de sumă:
      </Typography>
      <Slider
        value={value}
        onChange={onSlide}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};
export default RangeSlider;
