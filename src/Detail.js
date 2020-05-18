import React from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { grey } from "@material-ui/core/colors";
import FilteringCheckBoxGroup from "./components/FilteringCheckboxGroup";
import SortingButtonGroup from "./components/SortingButtonGroup";
import SearchInput from "./components/SearchInput";
import SpecDetail from "./components/SpecDetail";
import ResultTree from "./components/ResultTree";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExample: null,
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
      isShowDialog: false,
    };
  }

  setSelectedExample(selectedExample) {
    this.setState({ selectedExample });
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

  showDialog() {
    this.setState({ isShowDialog: true });
  }

  hideDialog() {
    this.setState({ isShowDialog: false });
  }

  render() {
    return (
      <div>
        <Grid container spacing={5}>
          <Grid container item xs={6} alignContent="flex-start">
            <FilteringCheckBoxGroup
              onChange={(newState) => this.setCheckedState({ ...newState })}
            />
            <SearchInput onSubmit={(value) => this.setSearchKeyword(value)} />
            <SortingButtonGroup
              value={this.state.sortSetting}
              onSubmit={(key, order) => this.setSortSetting(key, order)}
            />
            <ResultTree
              onSelect={(example) => this.setSelectedExample(example)}
            />
          </Grid>
          <Grid item xs={6}>
            <SpecDetail
              example={this.state.selectedExample}
              onClickImage={() => this.showDialog()}
            />
          </Grid>
        </Grid>

        <Dialog
          open={this.state.isShowDialog}
          keepMounted
          onClose={() => this.hideDialog()}
          onClick={() => this.hideDialog()}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle
            style={{ textAlign: "center", backgroundColor: grey[100] }}
          >
            ヘルプメッセージが表示されている
          </DialogTitle>
          <DialogContent style={{ textAlign: "center" }}>
            <img
              width="100%"
              src="https://d3utmhtlcphhyc.cloudfront.net/files/topics/24949_ext_25_0.jpg"
              alt="ヘルプメッセージが表示されている"
            ></img>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
