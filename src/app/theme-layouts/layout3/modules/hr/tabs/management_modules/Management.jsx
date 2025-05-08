import React, { useState } from "react";
import { Tabs } from "antd";

import CompanyStructure from "./company_structure/company_structure";
import JobDetailsSetup from "./job_details/JobDetails";
import QualificationSetup from "./Qualifications_Setup/QualificationSetup";
import AuditLog from "./audit_log/AuditLog";

export default function ManagementContainer() {
  const [activeTab, setActiveTab] = useState("1");

  const items = [
    {
      key: "1",
      label: "Company Structure",
      children: <CompanyStructure />,
    },
    {
      key: "2",
      label: "Job Details Setup",
      children: <JobDetailsSetup />,
    },
    {
      key: "3",
      label: "Qualification Setup",
      children: <QualificationSetup />,
    },
    {
      key: "4",
      label: "Audit Log",
      children: <AuditLog />,
    },
  ];

  return (
    <div className="p-10 bg-white">
      {/* <h1 className="text-2xl font-bold mb-6">Payroll Management System</h1> */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        size="large"
        items={items}
        className="payroll-tabs"
      />
    </div>
  );
}
