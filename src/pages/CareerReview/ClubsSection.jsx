import React, { useState } from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import Clubs from "./Clubs";
import ClubEvents from "./ClubEvents";

export default function ClubsSection() {
  const [currentTab, setCurrentTab] = useState("Clubs Registered");
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const TABS = [
    { value: "Clubs Registered", component: <Clubs Registered /> },
    { value: "Club Events", component: <ClubEvents /> },
  ];
  return (
    <Box>
      <Tabs 
        value={currentTab} 
        onChange={handleChange} 
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            color: isLight ? theme.palette.text.secondary : theme.palette.text.primary,
            '&.Mui-selected': {
              color: isLight ? theme.palette.primary.main : theme.palette.info.main
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: isLight ? theme.palette.primary.main : theme.palette.info.main
          }
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.value} value={tab.value} />
        ))}
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
      </Box>
    </Box>
  );
}
