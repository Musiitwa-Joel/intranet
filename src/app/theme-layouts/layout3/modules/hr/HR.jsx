import React, { useMemo } from "react";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Box from "@mui/material/Box";
import { selectActiveTab, setActiveTab } from "./store/hrSlice";
import Employees from "./tabs/Employees";
import Designations from "./tabs/designations/Designations";
import Appraisals from "./tabs/appraisals/Appraisals";
import { selectUserPermissions } from "app/store/userSlice";
import hasPermission from "src/utils/hasPermission";
import AppNav2 from "../../components/AppNav2";

function HR() {
  const dispatch = useDispatch();
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const activeTab = useSelector(selectActiveTab);
  const userPermissions = useSelector(selectUserPermissions);

  const can_view_employees = hasPermission(
    userPermissions,
    "can_view_employees"
  );

  const tabs = [
    {
      label: "Employees",
      value: "employees",
      visible: can_view_employees ? true : false,
    },
    { label: "Appraisals", value: "appraisals" },
    { label: "Travel", value: "travel" },
    { label: "Loans", value: "loans" },
    { label: "Leave", value: "leave" },
    { label: "Advances", value: "advances" },
    { label: "Designations", value: "designations" },
  ];

  useEffect(() => {
    if (!can_view_employees && activeTab === "employees") {
      dispatch(setActiveTab("appraisals"));
    }
  }, [can_view_employees, activeTab]);

  useEffect(() => {
    if (!appExistsInTaskBar) {
      setLoading(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function handleTabChange(event, value) {
    // setSelectedTab(value);
    // console.log("value", value);
    dispatch(setActiveTab(value));
  }

  return loading ? (
    <FuseLoading logo={activeApp?.logo} />
  ) : (
    <>
      <Suspense fallback={<FuseLoading logo={activeApp?.logo} />}>
        <Box sx={{ flexGrow: 1 }}>
          <AppNav2
            tabs={tabs}
            activeApp={activeApp}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />

          {can_view_employees && activeTab === "employees" && <Employees />}
          {activeTab === "appraisals" && <Appraisals />}
          {activeTab === "designations" && <Designations />}
        </Box>
      </Suspense>
    </>
  );
}

export default HR;
