import { useState } from "react";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// components
import Page from "../../components/Page";
import StudentDetailsForm from "./StudentDetailsForm";

// ----------------------------------------------------------------------

export default function StudentProfileOnly() {
  // Manage tabs state using useState (if useTabs is unavailable or not implemented correctly)
  const [currentTab, setCurrentTab] = useState("Student Details");

  // Update the selected tab when clicked
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Define the tabs
  const ACCOUNT_TABS = [
    {
      value: "Student Details",
      component: <StudentDetailsForm />,
    },
  ];

  return (
    <Page title="Student Profile">
      <Container maxWidth="lg">
        {/* Tabs Navigation */}
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={handleChangeTab} // Change tab state here
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value} // Only display the label
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {/* Render the selected tab's content */}
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
