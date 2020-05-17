import React from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    alignItems: "baseLine",
  },
  button: {
    width: "100%",
  },
});

export default (props) => {
  const toggelButtonStyle = useStyles().button;
  const createToggleButton = (name, className) => {
    return (
      <ToggleButton className={className} value={name}>
        {name}
      </ToggleButton>
    );
  };

  return (
    <ToggleButtonGroup
      value={props.value}
      size="small"
      exclusive
      onChange={(_, value) => props.onSubmit(value)}
      aria-label="text alignment"
      className={useStyles().root}
    >
      {createToggleButton("Name", toggelButtonStyle)}
      {createToggleButton("Tests", toggelButtonStyle)}
      {createToggleButton("Faileds", toggelButtonStyle)}
      {createToggleButton("Time", toggelButtonStyle)}
    </ToggleButtonGroup>
  );
};
