import React, { useState } from "react";
import { Card } from "antd";
import SummaryDashboard from "./components/SummaryDashboard";

const tabListNoTitle = [
  {
    key: "summary_dashboard",
    label: "Summary Dashboard",
  },
  {
    key: "clearance_status",
    label: "Clearance Status",
  },
  {
    key: "document_verification",
    label: "Document Verification",
  },
  {
    key: "photo_status",
    label: "Photo Collection",
  },
  {
    key: "gown_management",
    label: "Gown Management",
  },
  {
    key: "staff_performance",
    label: "Staff Performance",
  },
  {
    key: "demographic_analysis",
    label: "Demographics",
  }
];

const contentListNoTitle = {
  summary_dashboard: <SummaryDashboard />,
  clearance_status: <></>,
  document_verification: <></>,
  photo_status: <></>,
  gown_management: <></>,
  staff_performance: <></>,
  demographic_analysis: <></>,
};
const Reports = () => {
  const [activeTabKey2, setActiveTabKey2] = useState("summary_dashboard");

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <div
        style={{
          padding: 5,
        }}
      >
        <Card
          style={{
            width: "100%",
            borderColor: "lightgray",
          }}
          size="small"
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          bordered
          onTabChange={onTab2Change}
          tabProps={{
            size: "small",
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
    </>
  );
};
export default Reports;
