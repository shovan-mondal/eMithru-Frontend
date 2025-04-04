import { capitalCase } from "change-case";

import { useState } from "react";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// routes

// hooks
import useTabs from "../../hooks/useTabs";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections

import AddIat from "./AddIat";
import AddAttendance from "./AddAttendance";
import AddStudents from "./AddStudents";
import React from "react";

// ----------------------------------------------------------------------

export default function Data() {
  const [editingUser, setEditingUser] = useState(null);
  const { currentTab, onChangeTab } = useTabs("Add Users");

  const ACCOUNT_TABS = [
    {
      value: "Add Users",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AddStudents editingUser={editingUser} />,
    },
    {
      value: "Add Attendance",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AddAttendance editingUser={editingUser} />,
    },
    {
      value: "Add IAT Marks",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: (
        <AddIat
          onEdit={(user) => {
            setEditingUser(user);
            onChangeTab(null, "Add IAT Marks");
          }}
        />
      ),
    },
    {
      value: "Add External Marks",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: (
        <marks
          onEdit={(user) => {
            setEditingUser(user);
            onChangeTab(null, "Add External Marks");
          }}
        />
      ),
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
