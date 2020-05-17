import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GeneralPage from "./Generate";
import DetailPage from "./Detail";

function App() {
  const [tabValue, setTabValue] = React.useState(1);

  return (
    <div>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, newValue) => setTabValue(newValue)}
        centered
      >
        <Tab label="General" />
        <Tab label="Details" />
      </Tabs>

      {tabValue === 0 ? GeneralPage() : DetailPage()}
    </div>
  );
}

export default App;
