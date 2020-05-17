import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import FilteringCheckBoxGroup from "./components/FilteringCheckboxGroup";

export default () => {
  // TODO: 子コンポーネントと二重管理では？
  const [checkedState, setCheckedState] = useState({
    passed: true,
    failed: true,
    pending: true,
  });

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <FilteringCheckBoxGroup
            onChange={(newState) => setCheckedState({ ...newState })}
          />
        </Grid>
        <Grid item xs={6}>
          {JSON.stringify(checkedState)}
        </Grid>
      </Grid>
    </div>
  );
};
