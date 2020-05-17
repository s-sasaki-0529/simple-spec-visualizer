import React from "react";
import Grid from "@material-ui/core/Grid";
import FilteringCheckBoxGroup from "./components/FilteringCheckboxGroup";
import SortingButtonGroup from "./components/SortingButtonGroup";
import SearchInput from "./components/SearchInput";
import SpecDetail from "./components/SpecDetail";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      sortSetting: {
        key: "Name",
        order: "desc",
      },
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

  setSortSetting(key, order) {
    this.setState({
      sortSetting: { key, order },
    });
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid container item xs={6}>
            <FilteringCheckBoxGroup
              onChange={(newState) => this.setCheckedState({ ...newState })}
            />
            <SearchInput onSubmit={(value) => this.setSearchKeyword(value)} />
            <SortingButtonGroup
              value={this.state.sortSetting}
              onSubmit={(key, order) => this.setSortSetting(key, order)}
            />
          </Grid>
          <Grid item xs={6}>
            <SpecDetail />
          </Grid>
        </Grid>
      </div>
    );
  }
}
