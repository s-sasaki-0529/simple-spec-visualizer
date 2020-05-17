import React from "react";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GeneralPage from "./Generate";
import DetailPage from "./Detail";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  tabs: {
    borderBottom: "1px solid",
    borderColor: grey[400],
  },
  container: {
    margin: 15,
  },
});

export default () => {
  const [tabValue, setTabValue] = React.useState(1);

  return (
    <div>
      <Tabs
        className={useStyles().tabs}
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, newValue) => setTabValue(newValue)}
        centered
      >
        <Tab label="General" />
        <Tab label="Details" />
      </Tabs>

      <Container className={useStyles().container}>
        {tabValue === 0 ? GeneralPage() : DetailPage()}
      </Container>
    </div>
  );
};
