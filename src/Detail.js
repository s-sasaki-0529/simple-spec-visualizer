import React from "react";
import Grid from "@material-ui/core/Grid";
import FilteringCheckBoxGroup from "./components/FilteringCheckboxGroup";
import SearchInput from "./components/SearchInput";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      checkedState: {
        passed: true,
        failed: true,
        pending: true,
      },
    };
  }

  setSearchKeyword(searchKeyword) {
    this.setState({ searchKeyword });
  }

  setCheckedState(checkedState) {
    this.setState({ checkedState });
  }

  render() {
    return (
      <div>
        <Grid container spacing={5}>
          <Grid container item xs={6}>
            <Grid item xs={6}>
              <FilteringCheckBoxGroup
                onChange={(newState) => this.setCheckedState({ ...newState })}
              />
            </Grid>
            <Grid item xs={6}>
              <SearchInput onSubmit={(value) => this.setSearchKeyword(value)} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <p>keyword: {this.state.searchKeyword}</p>
            <p>checkbox: {JSON.stringify(this.state.checkedState)}</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}
