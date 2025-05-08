import { useState } from "react";
import { Tabs } from "antd";
import EventsManagement from "../../tabs/events/events_components/event_management/EventsManagement";
import RegistrationRSVP from "../../tabs/events/events_components/RegistrationRSVP/RegistrationRSVP";
import EventTicketing from "../../tabs/events/events_components/event_ticketing/EventTicketing";
import EventCommunications from "../../tabs/events/events_components/event_communications/EventCommunications";
import EventFeedback from "../../tabs/events/events_components/event_feedback/EventFeedback";
import EventAnalytics from "../../tabs/events/events_components/reporting_analtics/Reporting_analytics";

export default function AlumniEvents() {
  const [activeTab, setActiveTab] = useState("1");

  const items = [
    {
      key: "1",
      label: "Events Management",
      children: <EventsManagement />,
    },
    {
      key: "2",
      label: "Registration & RSVP",
      children: <RegistrationRSVP />,
    },
    {
      key: "3",
      label: "Event Ticketing",
      children: <EventTicketing />,
    },
    {
      key: "4",
      label: "Event Communications",
      children: <EventCommunications />,
    },
    {
      key: "5",
      label: "Event Feedback",
      children: <EventFeedback />,
    },
    {
      key: "6",
      label: "Event Analytics",
      children: <EventAnalytics />,
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
