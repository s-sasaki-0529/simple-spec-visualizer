import React from "react";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GeneralPage from "./Generate";
import DetailPage from "./Detail";
import { grey } from "@material-ui/core/colors";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabValue: 1 };
  }

  setTabValue(tabValue) {
    this.setState({ tabValue });
  }

  tabContent() {
    if (this.state.tabValue === 0) {
      return <GeneralPage />;
    } else {
      return <DetailPage />;
    }
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => this.setTabValue(newValue)}
          centered
          style={{
            borderBottom: "1px solid",
            borderColor: grey[400],
          }}
        >
          <Tab label="General" />
          <Tab label="Details" />
        </Tabs>

        <Container maxWidth={false} style={{ minWidth: 1280, margin: 15 }}>
          {this.tabContent()}
        </Container>
      </div>
    );
  }
}
