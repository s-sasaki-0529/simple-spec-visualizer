import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function App() {
  const [tabValue, setTabValue] = React.useState(0);

  const GeneralPage = () => <div>General</div>;

  const DetailPage = () => <div>Details</div>;

  return (
    <div>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, newValue) => setTabValue(newValue)}
      >
        <Tab label="General" />
        <Tab label="Details" />
      </Tabs>

      {tabValue === 0 ? GeneralPage() : DetailPage()}
    </div>
  );
}

export default App;
