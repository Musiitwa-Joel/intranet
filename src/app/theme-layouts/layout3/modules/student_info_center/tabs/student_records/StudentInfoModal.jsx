import React, { useState } from "react";
import { Button, Modal, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  selectActiveMenuItem,
  selectSelectedStudent,
  selectShowInfoModal,
  setActiveMenuItem,
  setShowInfoModal,
} from "../../store/infoCenterSlice";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import {
  CardTravel,
  Close,
  Dvr,
  Edit,
  FormatListBulleted,
} from "@mui/icons-material";
import { useSelect } from "@mui/base";
import BioData from "./student_details/BioData";
import Enrollment from "./student_details/Enrollment";
import Registration from "./student_details/Registration";
import Finance from "./student_details/Finance";
import StudentLogs from "./student_details/StudentLogs";
const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: "1",
    icon: (
      <UserOutlined
        style={{
          fontSize: 18,
        }}
      />
    ),
    label: "BIO DATA",
  },
  {
    key: "2",
    icon: (
      <Dvr
        style={{
          fontSize: 18,
        }}
      />
    ),
    label: "ENROLLMENT",
  },
  {
    key: "3",
    icon: (
      <Edit
        style={{
          fontSize: 18,
        }}
      />
    ),
    label: "REGISTRATION",
  },
  {
    key: "4",
    icon: (
      <CardTravel
        style={{
          fontSize: 18,
        }}
      />
    ),
    label: "FINANCE",
  },
  {
    key: "5",
    icon: (
      <FormatListBulleted
        style={{
          fontSize: 18,
        }}
      />
    ),
    label: "STUDENT LOGS",
  },
];
const StudentInfoModal = () => {
  const showInfoModal = useSelector(selectShowInfoModal);
  const activeMenuItem = useSelector(selectActiveMenuItem);
  const dispatch = useDispatch();
  const selectedStudent = useSelector(selectSelectedStudent);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // console.log("selected Student", selectedStudent);
  if (!selectedStudent) return;

  // console.log("info modal", setShowInfoModal);
  return (
    <>
      <Modal
        // title="Vertically centered modal dialog"
        width={1150}
        // height={100}
        open={showInfoModal}
        footer={false}
        styles={{
          body: {
            padding: 0,
            backgroundColor: "red",
          },
          content: {
            padding: 0,
          },
        }}
        onCancel={() => dispatch(setShowInfoModal(false))}
        cancelButtonProps={{
          style: {
            backgroundColor: "red",
          },
        }}
        closeIcon={
          <Close
            style={{
              marginTop: -10,
              fontSize: 25,
            }}
          />
        }
        // closable={false}
        style={{
          //   backgroundColor: "red",
          padding: 0,
          height: 300,
        }}
      >
        <Layout
          style={{
            // backgroundColor: "red",
            height: 500,
            overflow: "hidden",
          }}
        >
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              <div>
                <img
                  src={`http://localhost:2222/api/student_image/${selectedStudent.student_no}`}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 65,
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 5,
                }}
              >
                <Typography
                  style={{
                    color: "white",
                    fontSize: "1.8rem",
                  }}
                >
                  {selectedStudent.student_no}
                </Typography>
              </div>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              activeKey="4"
              selectedKeys={[activeMenuItem]}
              onClick={(data) => dispatch(setActiveMenuItem(data.key))}
              items={items}
            />
          </Sider>
          <Layout>
            <div
              style={{
                height: 40,
                // backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              REG NO:{" "}
              <span
                style={{
                  fontWeight: "500",
                  marginLeft: 5,
                }}
              >
                {" "}
                {selectedStudent.registration_no}
              </span>
            </div>
            <Content
              style={{
                // margin: "24px 16px 0",
                marginTop: 0,
              }}
            >
              <div
                style={{
                  padding: 10,
                  minHeight: 400,
                  height: 450,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  // overflow: "scroll",
                }}
              >
                {activeMenuItem == "1" && <BioData />}
                {activeMenuItem == "2" && <Enrollment />}
                {activeMenuItem == "3" && <Registration />}
                {activeMenuItem == "4" && <Finance />}
                {activeMenuItem == "5" && <StudentLogs />}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                padding: 10,
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Space>
                <Button type="primary" danger>
                  Reset Student Portal Password
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "dodgerblue",
                  }}
                >
                  Save Changes
                </Button>
              </Space>
            </Footer>
          </Layout>
        </Layout>
      </Modal>
    </>
  );
};
export default StudentInfoModal;
