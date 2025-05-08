import { useState } from "react";
import { Tabs } from "antd";
import ResourcesManagement from "./resources_management/ResourcesManagement";
import DocumentLibrary from "./document_library/DocumentLibrary";
import CareerResources from "./success_stories/SuccessStories";
import Scholarships from "./scholarship_funding/Scholarship";
import LearningDevelopmemt from "./learning_development/LearningDevelopment";
import NetWorkingResource from "./networking/ResourceNetworking";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("1");

  const items = [
    {
      key: "1",
      label: "Resources Management",
      children: <ResourcesManagement />,
    },
    {
      key: "2",
      label: "Document Library",
      children: <DocumentLibrary />,
    },

    {
      key: "3",
      label: "Career Resources",
      children: <CareerResources />,
    },
    {
      key: "4",
      label: "Scholarships & Funding",
      children: <Scholarships />,
    },
    {
      key: "5",
      label: "Learning & Development",
      children: <LearningDevelopmemt />,
    },
    {
      key: "6",
      label: "Networking Resources",
      children: <NetWorkingResource />,
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
