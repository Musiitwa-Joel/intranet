import { useState } from "react";
import { Tabs } from "antd";
import JobsManagement from "./jobs_components/job_creation_management/index";
import JobCommunication from "./jobs_components/job_alerts/JobCommunication";
import ReportsTracking from "./jobs_components/reports_tracking/ReportsTracking";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("1");

  const items = [
    {
      key: "1",
      label: "Jobs Management",
      children: <JobsManagement />,
    },
    {
      key: "2",
      label: "Job Communication",
      children: <JobCommunication />,
    },
    {
      key: "3",
      label: "Reports Tracking",
      children: <ReportsTracking />,
    },
  ];

  return (
    <div className="p-10 bg-white">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        size="large"
        items={items}
        // className="payroll-tabs"
      />
    </div>
  );
}
