import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 2003,
    label: "2003",
  },
  {
    value: 2022,
    label: "2022",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

interface Props {
  className?: string;
  onChange: (year: number) => void;
}

export default function DiscreteSliderMarks(props: Props) {
  return (
    <Box sx={{ width: "50vw" }} className={props.className}>
      <Slider
        aria-label="Custom marks"
        defaultValue={2022}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={2003}
        max={2022}
        onChange={(e) => props.onChange(parseInt((e.target as any).value))}
      />
    </Box>
  );
}
