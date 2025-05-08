import React, { useMemo } from "react";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Box from "@mui/material/Box";
import { selectActiveTab, setActiveTab } from "./store/resultsSlice";
import AppNav2 from "../../components/AppNav2";
import ResultsView from "./tabs/ResultsView";
import Testimonials from "./tabs/testimonials/Testimonials";
import Migration from "./tabs/migration/Migration";
import ResultsSubmission from "./tabs/results_submission/ResultsSubmission";
import { ConfigProvider, theme } from "antd";
import { selectUserPermissions } from "app/store/userSlice";

function ResultsMgt() {
  const dispatch = useDispatch();
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const activeTab = useSelector(selectActiveTab);
  const permissions = useSelector(selectUserPermissions);

  const { can_view_results, can_upload_results, can_upload_migrated_results } =
    permissions;

  const tabs = [
    {
      label: "Results Display",
      value: "results_view",
      visible: can_view_results ? true : false,
    },
    { label: "Testmonials", value: "testimonials" },
    {
      label: "Results Submission",
      value: "results_submission",
      visible: can_upload_results ? true : false,
    },
    {
      label: "Migration",
      value: "migration",
      visible: can_upload_migrated_results ? true : false,
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

          {activeTab === "testimonials" && <Testimonials />}
          <ConfigProvider
            theme={{
              algorithm: theme.compactAlgorithm,
            }}
          >
            {activeTab === "results_view" && <ResultsView />}
            {activeTab === "migration" && <Migration />}
            {activeTab === "results_submission" && <ResultsSubmission />}
          </ConfigProvider>
        </Box>
      </Suspense>
    </>
  );
}

export default ResultsMgt;
