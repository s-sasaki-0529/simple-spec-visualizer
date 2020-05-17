import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default (props) => {
  const [value, setValue] = useState("");
  const submit = () => {
    props.onSubmit(value);
  };

  return (
    <TextField
      className={useStyles().root}
      onChange={(event) => setValue(event.target.value)}
      onKeyPress={(event) => (event.key === "Enter" ? submit() : null)}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
