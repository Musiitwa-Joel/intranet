import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDispatch, useSelector } from "react-redux";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import Applicants from "./tabs/applicants/Applicants";
import Reports from "./tabs/reports/Reports";
import Settings from "./tabs/settings/Settings";
import { updateActiveTab } from "app/store/admissionsSlice";
import Admitted from "./tabs/admitted/Admitted";
import AppNav from "../../components/AppNav";

const tabs = [
  "Applicants",
  "Admissible PhD Students",
  "Admitted",
  "Change of program",
  "Report",
  "Settings",
  "Uneb Results",
];

const Admissions = React.memo(function Admissions() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeTab = useSelector(
    (state) => state.admissions.module_state.activeTab
  );
  const activeApp = useSelector((state) => state.apps.activeApp);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);

  function handleTabChange(event, value) {
    dispatch(updateActiveTab(value));
  }

  useEffect(() => {
    if (!appExistsInTaskBar) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading logo={activeApp?.logo} />
      ) : (
        <Suspense fallback={<FuseLoading logo={activeApp?.logo} />}>
          <Box sx={{ flexGrow: 1 }}>
            <AppNav
              tabs={tabs}
              activeApp={activeApp}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />

            {activeTab === 0 && <Applicants />}
            {activeTab === 2 && <Admitted />}
            {activeTab === 4 && <Reports />}
            {activeTab === 5 && <Settings />}
          </Box>
        </Suspense>
      )}
    </>
  );
});

export default Admissions;
