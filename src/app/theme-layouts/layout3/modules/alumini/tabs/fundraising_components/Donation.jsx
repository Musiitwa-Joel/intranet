import { useState } from "react";
import { Tabs } from "antd";
import DonationManagement from "./donation_management/DonationManagement";
import FundraisingCampaigns from "./fundraising_campaign_management/FundraisingCampaign";
import PledgeCommitment from "./pledge_management/PledgeManagement";
import Subscriptions from "./subscriptions_management/Subscription";
import ReportsAnalytics from "./donation_management/Reporting";

export default function Donations() {
  const [activeTab, setActiveTab] = useState("1");

  const items = [
    {
      key: "1",
      label: "Jobs Management",
      children: <DonationManagement />,
    },
    {
      key: "2",
      label: "Job Communication",
      children: <FundraisingCampaigns />,
    },
    {
      key: "3",
      label: "Reports Tracking",
      children: <PledgeCommitment />,
    },
    {
      key: "4",
      label: "Job Communication",
      children: <Subscriptions />,
    },
    {
      key: "5",
      label: "Reports Tracking",
      children: <ReportsAnalytics />,
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
      />
    </div>
  );
}
