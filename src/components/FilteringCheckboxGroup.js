import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red, yellow, green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ColorCheckBox = (props) => {
  const useStyles = makeStyles({
    root: (props) => ({
      color: props.color[400],
    }),
  });
  return (
    <Checkbox
      className={useStyles(props).root}
      color="default"
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

const ColorCheckBoxWithLabel = (props) => {
  const useStyles = makeStyles({
    root: {
      userSelect: "none",
    },
  });
  return (
    <FormControlLabel
      control={
        <ColorCheckBox
          checked={props.checked}
          onChange={props.onChange}
          color={props.color}
        />
      }
      label={props.label}
      className={useStyles().root}
    />
  );
};

export default (props) => {
  const [checkedState, setChackedState] = useState({
    passed: true,
    failed: true,
    pending: true,
  });

  const handleChange = (key) => {
    const newCheckedState = {
      ...checkedState,
      [key]: !checkedState[key],
    };
    setChackedState(newCheckedState);
    props.onChange(newCheckedState);
  };

  return (
    <div>
      <ColorCheckBoxWithLabel
        checked={checkedState.passed}
        onChange={() => handleChange("passed")}
        color={green}
        label="passed"
      />
      <ColorCheckBoxWithLabel
        checked={checkedState.failed}
        onChange={() => handleChange("failed")}
        color={red}
        label="failed"
      />
      <ColorCheckBoxWithLabel
        checked={checkedState.pending}
        onChange={() => handleChange("pending")}
        color={yellow}
        label="pending"
      />
    </div>
  );
};
