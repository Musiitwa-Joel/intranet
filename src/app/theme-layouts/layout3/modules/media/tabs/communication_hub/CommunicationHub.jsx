import { useState } from "react";
import { Tabs, Typography } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  MessageOutlined,
  GiftOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import UniversityAnnouncements from "./tabs/UniversityAnnouncements";
// import NewsEvents from "./news-events";
// import Messaging from "./messaging";
// import BirthdayWishes from "./birthday-wishes";
// import MotivationalQuotes from "./motivational-quotes";

const { Title } = Typography;
const { TabPane } = Tabs;

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div style={{ margin: "0 auto", padding: "0px" }}>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="card"
        size="large"
        tabBarStyle={{
          marginBottom: 0,
          borderBottom: "2px solid #4B0082",
        }}
      >
        <TabPane
          tab={
            <span>
              <BellOutlined /> Announcements
            </span>
          }
          key="1"
        >
          <UniversityAnnouncements />
        </TabPane>

        {/* <TabPane
          tab={
            <span>
              <CalendarOutlined /> News & Events
            </span>
          }
          key="2"
        >
          <NewsEvents />
        </TabPane> */}

        {/* <TabPane
          tab={
            <span>
              <MessageOutlined /> Messaging
            </span>
          }
          key="3"
        >
          <Messaging />
        </TabPane> */}

        {/* <TabPane
          tab={
            <span>
              <GiftOutlined /> Birthday Wishes
            </span>
          }
          key="4"
        >
          <BirthdayWishes />
        </TabPane> */}
        {/* 
        <TabPane
          tab={
            <span>
              <BulbOutlined /> Motivational Quotes
            </span>
          }
          key="5"
        >
          <MotivationalQuotes />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
