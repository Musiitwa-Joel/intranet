import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TTStudyTimeForm from "./TTStudyTimeForm";
import TTStudyTimesTable from "./TTStudyTimesTable";

function TTStudyTimes() {
  return (
    <div
      style={{
        flex: 1,
        height: "calc(100vh - 100px)",
      }}
    >
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={30}
          minSize={25}
          style={{
            backgroundColor: "#fff",
          }}
        >
          <TTStudyTimeForm />
        </Panel>
        <PanelResizeHandle
          style={{
            width: 1,
            backgroundColor: "lightgray",
            opacity: 0.6,
          }}
        />
        <Panel minSize={65}>
          <TTStudyTimesTable />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default TTStudyTimes;
