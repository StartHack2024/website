import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 2003,
    label: '2003',
  },
  {
    value: 2010,
    label: '2010',
  },
  {
    value: 2022,
    label: '2022',
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={2003}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={2003}
        max={2022}
      />
    </Box>
  );
}