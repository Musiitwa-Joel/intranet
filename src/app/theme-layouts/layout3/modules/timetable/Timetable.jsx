import React, { useMemo } from "react";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Box from "@mui/material/Box";
import { selectActiveTab, setActiveTab } from "./store/timetableSlice";
import AppNav2 from "../../components/AppNav2";
import { ConfigProvider, theme } from "antd";
import ViewTimetable from "./tabs/ViewTimetable";
import TTSettings from "./tabs/settings/Settings";

function Timetable() {
  const dispatch = useDispatch();
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const activeTab = useSelector(selectActiveTab);
  //   const permissions = useSelector(selectUserPermissions);

  const tabs = [
    {
      label: "Timetable",
      value: "timetable_view",
      //   visible: can_view_results ? true : false,
    },
    {
      label: "Settings",
      value: "settings",
      //   visible: can_view_results ? true : false,
    },
  ];

  const firstVisibleTab = tabs.find((tab) => tab.visible !== false)?.value;

  useEffect(() => {
    if (firstVisibleTab) {
      dispatch(setActiveTab(firstVisibleTab));
    }
  }, [firstVisibleTab]);

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
          <ConfigProvider
            theme={{
              algorithm: theme.compactAlgorithm,
            }}
          >
            {activeTab === "timetable_view" && <ViewTimetable />}
            {activeTab === "settings" && <TTSettings />}
          </ConfigProvider>
        </Box>
      </Suspense>
    </>
  );
}

export default Timetable;
