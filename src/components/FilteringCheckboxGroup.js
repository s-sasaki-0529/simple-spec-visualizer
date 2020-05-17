import React from "react";
import { red, yellow, green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ColorCheckBox = (props) => {
  return (
    <Checkbox
      color="default"
      checked={props.checked}
      onChange={props.onChange}
      style={{
        color: props.color[700],
      }}
    />
  );
};

const ColorCheckBoxWithLabel = (props) => {
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
      style={{
        userSelect: "none",
      }}
    />
  );
};

export default class FilteringCheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedState: {
        passed: true,
        failed: true,
        pending: true,
      },
    };
  }

  handleChange(key) {
    const newCheckedState = {
      ...this.state.checkedState,
      [key]: !this.state.checkedState[key],
    };
    this.setState({ checkedState: newCheckedState });
    this.props.onChange(newCheckedState);
  }

  render() {
    return (
      <div>
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.passed}
          onChange={() => this.handleChange("passed")}
          color={green}
          label="passed"
        />
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.failed}
          onChange={() => this.handleChange("failed")}
          color={red}
          label="failed"
        />
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.pending}
          onChange={() => this.handleChange("pending")}
          color={yellow}
          label="pending"
        />
      </div>
    );
  }
}
