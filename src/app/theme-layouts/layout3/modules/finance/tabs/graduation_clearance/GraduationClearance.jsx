import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import DemoSidebar from "./shared-components/DemoSidebar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import GraduationFillForm from "./GraduationClearanceFillForm";
import DataTable from "./shared-components/DataTable";

const GraduationClearance = React.memo(function Admitted() {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);
  return (
    <>
      <div>
        <GraduationFillForm />
      </div>
      <div
        style={{
          height: "calc(100vh - 145px)",
        }}
      >
        <PanelGroup direction="horizontal">
          <Panel
            defaultSize={20}
            minSize={15}
            style={{
              backgroundColor: "#fff",
              marginLeft: 0,
              // borderColor: "lightgray",
              // borderWidth: 1,
              borderTop: "1px solid lightgray",
              borderLeft: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
            }}
          >
            <DemoSidebar />
          </Panel>
          <PanelResizeHandle
            style={{
              // width: 1,
              backgroundColor: "transparent",
              // opacity: 0.6,
            }}
          />
          <Panel minSize={65}>
            <DataTable />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
});

export default GraduationClearance;
