"use client";

import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import ClickableCardComponent from "./CardComponent";
import Box from "@mui/material/Box";
import StudentBooth from "./StudentBooth/StudentBooth";
import StaffBooth from "./StaffBooth/StaffBooth";
import StudentIDs from "./StudentBooth/StudentIDs"; // Import Student IDs component
import StaffIDs from "./StaffBooth/StaffIDs"; // Import Staff IDs component
import {
  selectActiveBooth,
  setActiveBooth,
  selectActiveTab,
  setActiveTab,
} from "./store/photosSlice";
import AppNav from "../../components/AppNav";

function PhotosManager() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar);
  const activeBooth = useSelector(selectActiveBooth);
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  const activeApp = useSelector((state) => state.apps.activeApp);

  // Define tabs as simple strings, not objects
  const tabs =
    activeBooth === "student"
      ? ["Student Booth", "Student IDs"]
      : activeBooth === "staff"
        ? ["Staff Booth", "Staff IDs"]
        : ["Main Menu"];

  const handleStudentCardClick = () => {
    dispatch(setActiveBooth("student"));
  };

  const handleStaffCardClick = () => {
    dispatch(setActiveBooth("staff"));
  };

  // Handle tab change - convert tab index to string value
  function handleTabChange(event, newTabIndex) {
    console.log("Tab change requested to index:", newTabIndex);

    // Convert tab index to string value
    let tabValue;
    if (newTabIndex === 0) {
      tabValue = "booth";
    } else if (newTabIndex === 1) {
      tabValue = "ids";
    } else {
      tabValue = "main";
    }

    console.log("Setting tab value to:", tabValue);
    dispatch(setActiveTab(tabValue));
  }

  // Update loading state when app is added to taskbar
  useEffect(() => {
    if (!appExistsInTaskBar) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [appExistsInTaskBar]);

  // Log state changes for debugging
  useEffect(() => {
    console.log("Active booth:", activeBooth, "Active tab:", activeTab);
  }, [activeBooth, activeTab]);

  // Convert string tab value to numeric index for AppNav
  const getTabIndex = () => {
    if (activeTab === "booth") return 0;
    if (activeTab === "ids") return 1;
    return 0;
  };

  return (
    <>
      {loading ? (
        <FuseLoading logo={activeApp?.logo} />
      ) : (
        <Suspense fallback={<FuseLoading logo={activeApp?.logo} />}>
          <Box sx={{ flexGrow: 1 }}>
            {/* Pass tabs as strings and convert activeTab to index */}
            <AppNav
              tabs={tabs}
              activeApp={activeApp}
              activeTab={getTabIndex()}
              handleTabChange={handleTabChange}
            />

            {/* Main Menu Cards */}
            {!activeBooth && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100vh - 106px)",
                }}
              >
                <div>
                  <ClickableCardComponent
                    title="Student Booth"
                    content="Add student photos."
                    onClick={handleStudentCardClick}
                  />
                </div>
                <div style={{ marginLeft: 10 }}>
                  <ClickableCardComponent
                    title="Staff Booth"
                    content="Add staff photos."
                    onClick={handleStaffCardClick}
                  />
                </div>
              </div>
            )}

            {/* Conditional Rendering Based on Active Tab - using string values */}
            {activeBooth === "student" && activeTab === "booth" && (
              <StudentBooth />
            )}
            {activeBooth === "student" && activeTab === "ids" && <StudentIDs />}
            {activeBooth === "staff" && activeTab === "booth" && <StaffBooth />}
            {activeBooth === "staff" && activeTab === "ids" && <StaffIDs />}
          </Box>
        </Suspense>
      )}
    </>
  );
}

export default PhotosManager;
