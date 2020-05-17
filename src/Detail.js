import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import FilteringCheckBoxGroup from "./components/FilteringCheckboxGroup";
import SearchInput from "./components/SearchInput";

export default () => {
  // TODO: 子コンポーネントと二重管理では？
  const [searchKeyword, setSearchKeyword] = useState("");
  const [checkedState, setCheckedState] = useState({
    passed: true,
    failed: true,
    pending: true,
  });

  return (
    <div>
      <Grid container spacing={5}>
        <Grid container item xs={6}>
          <Grid item xs={6}>
            <FilteringCheckBoxGroup
              onChange={(newState) => setCheckedState({ ...newState })}
            />
          </Grid>
          <Grid item xs={6}>
            <SearchInput onSubmit={setSearchKeyword} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <p>keyword: {searchKeyword}</p>
          <p>checkbox: {JSON.stringify(checkedState)}</p>
        </Grid>
      </Grid>
    </div>
  );
};
