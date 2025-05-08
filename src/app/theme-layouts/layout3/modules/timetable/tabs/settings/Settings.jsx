import React, { useState } from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  RequestPage,
  Reviews,
  Settings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  UserCircle,
  BarChart3,
  LogOut,
  LayoutTemplate,
} from "lucide-react";
import {
  selectActiveTtSettingsTab,
  setActiveTtSettingsTab,
} from "../../store/timetableSlice";
import Sessions from "./sessions/Sessions";
import TTStudyTimes from "./studytimes/TTStudyTimes";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  {
    key: "sessions",
    icon: <LayoutDashboard size={20} />,
    label: "Sessions",
  },
  {
    key: "tt_study_times",
    icon: <ClipboardList size={20} />,
    label: "Study Times",
  },
  {
    key: "rooms",
    icon: <ClipboardList size={20} />,
    label: "Rooms",
  },
];
const TTSettings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const activeTab = useSelector(selectActiveTtSettingsTab);

  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout
      style={{
        height: "calc(100vh - 99.2px)",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          position: "absolute",
          bottom: 10,
          //   left: 55,
          left: collapsed ? 58 : 180, // Adjust position based on collapsed state
          transition: "left 0.2s", // Smooth transition
          width: 40, // Equal width and height for a perfect circle
          height: 40,
          borderRadius: 20,
          zIndex: 999,
        }}
      >
        {collapsed ? (
          <ChevronRight
            style={{
              fontSize: 25,
            }}
          />
        ) : (
          <ChevronLeft
            style={{
              fontSize: 25,
            }}
          />
        )}
      </Button>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // className="bg-white"
      >
        {/* <Menu
          // theme="dark"
          selectedKeys={[activeTab]}
          onSelect={({ key }) => dispatch(setActiveAppraisalTab(key))}
          mode="inline"
          items={items}
        /> */}
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={`${activeTab}`}
          items={items}
          onClick={({ key }) => dispatch(setActiveTtSettingsTab(key))}
        />
      </Sider>
      <Layout>
        {activeTab == "sessions" && <Sessions />}
        {activeTab == "tt_study_times" && <TTStudyTimes />}
      </Layout>
    </Layout>
  );
};
export default TTSettings;
