import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FloatButton, Modal, Switch } from "antd";
import { Settings } from "@mui/icons-material";
import SessionForm from "./SessionForm";
import SessionTable from "./SessionTable";

function Sessions() {
  return (
    <div
      style={{
        flex: 1,
        // backgroundColor: "red",
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
          <SessionForm />
        </Panel>
        <PanelResizeHandle
          style={{
            width: 1,
            backgroundColor: "lightgray",
            opacity: 0.6,
          }}
        />
        <Panel minSize={65}>
          <SessionTable />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Sessions;
