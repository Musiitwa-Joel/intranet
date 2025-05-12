import React from "react";
import "./programs.css";
import StudentRecords from "./VoterRecords";
import { ConfigProvider, theme } from "antd";

function Voters() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <StudentRecords />
    </ConfigProvider>
  );
}

export default Voters;
