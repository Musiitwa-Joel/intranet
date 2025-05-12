import React, { useMemo } from "react";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Box from "@mui/material/Box";
import { selectActiveTab, setActiveTab } from "./store/VotingSlice";
import VoterDashboard from "./tabs/dashboard/dashboard";
import Elections from "./tabs/elections/ElectionManagement";
import Voters from "./tabs/voters/Voters";
import Results from "./tabs/results/Results";
// import Candidates from "./tabs/candidates/Candidates";
// import Users from "./tabs/users/Users";
import AppNav from "../../components/AppNav";

const tabs = ["Dashboard", "Elections", "Voters", "Results", "Settings"];

function Voting() {
  const dispatch = useDispatch();
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const activeTab = useSelector(selectActiveTab);

  useEffect(() => {
    if (!appExistsInTaskBar) {
      setLoading(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function handleTabChange(event, value) {
    dispatch(setActiveTab(value));
  }

  return loading ? (
    <FuseLoading logo={activeApp?.logo} />
  ) : (
    <>
      <Suspense fallback={<FuseLoading logo={activeApp?.logo} />}>
        <Box sx={{ flexGrow: 1 }}>
          <AppNav
            tabs={tabs}
            activeApp={activeApp}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />

          {activeTab === 0 && <VoterDashboard />}
          {activeTab === 1 && <Elections />}
          {activeTab === 2 && <Voters />}
          {activeTab === 3 && <Results />}
          {/* {activeTab === 4 && <Users />} */}
        </Box>
      </Suspense>
    </>
  );
}

export default Voting;
