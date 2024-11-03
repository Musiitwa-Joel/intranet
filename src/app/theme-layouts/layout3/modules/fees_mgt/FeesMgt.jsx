import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import FuseLoading from "@fuse/core/FuseLoading";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import fees_module from "../../assets/fees_module.png";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// import StudentRecords from "./tabs/student_records/StudentRecords";
import {
  selectActiveTab,
  selectCopyFeesStructureModal,
  setActiveTab,
  setCopyFeesStructureModal,
} from "./store/feesMgtSlice";
import FeesCategories from "./tabs/fees_categories/FeesCategories";
import FeesItems from "./tabs/fees_items/FeesItems";

import Tuition from "./tabs/tuition/Tuition";
import FunctionalFees from "./tabs/functional_fees/FunctionalFees";
import OtherFees from "./tabs/other_fees/OtherFees";
import {
  Modal,
  Badge,
  Card,
  Space,
  Form,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Radio,
} from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { COPY_FEES_STRUCTURE } from "./gql/mutations";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { selectUser } from "app/store/userSlice";
import FeesStructure from "./tabs/fees_structure/FeesStructure";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LOAD_REQS = gql`
  query Query {
    campuses {
      id
      campus_title
    }
    intakes {
      id
      intake_title
    }
    acc_yrs {
      id
      acc_yr_title
    }
  }
`;

const FeesMgt = React.memo(function Admissions() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const user = useSelector(selectUser);
  // const { activeTab } = useSelector((state) => state.admissions.module_state);
  const activeTab = useSelector(selectActiveTab);
  // const [selectedTab, setSelectedTab] = useState(0);
  const apps = useSelector((state) => state.apps.apps);
  const activeApp = apps.find((app) => app.route === "fees_management");
  // const { selectedTab } = activeApp.data[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const copyFeesStructureModalVisible = useSelector(
    selectCopyFeesStructureModal
  );

  const [copyFeesStructure, { error, loading: copyingFeesStructure, data }] =
    useMutation(COPY_FEES_STRUCTURE);

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }
  }, [error]);

  const [form] = Form.useForm();

  const {
    error: reqsErr,
    loading: loadingReqs2,
    data: reqsRes,
  } = useQuery(LOAD_REQS);

  useEffect(() => {
    if (reqsErr) {
      // alert("error getting forms!");
      dispatch(
        showMessage({
          message: reqsErr.message,
          variant: "error",
        })
      );
    }
  }, [reqsErr]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);

  function handleTabChange(event, value) {
    // setSelectedTab(value);
    // dispatch(admissionsTabChanged(value));
    // dispatch(updateActiveTab(value));
    dispatch(setActiveTab(value));
  }

  // console.log("selected tab", selectedTab);

  // console.log("apps in taskbar", taskBarApps);
  useEffect(() => {
    // const exists = checkAppExistence(taskBarApps, "route", "admissions");

    if (!appExistsInTaskBar) {
      // if (!applicantReqsLoaded && !error) {

      // }
      setLoading(true);
    } else {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleOk = () => {
    form.validateFields();
    form.submit();
  };

  const handleCancel = () => {
    dispatch(setCopyFeesStructureModal(false));
  };

  const onFinish = async (values) => {
    console.log("values from form", values);

    const payload = {
      fromAccYrId: values.from_acc_yr,
      fromCampusId: values.from_campus,
      fromIntakeId: values.from_intake,
      toAccYrId: values.to_acc_yr,
      toCampusId: values.to_campus,
      toIntakeId: values.to_intake,
      scope: values.scope,
      overwrite: values.overwrite,
      addedBy: user.user.id,
    };
    // console.log("payload", payload);

    const res = await copyFeesStructure({
      variables: payload,
    });

    // console.log("the response", res.data);
    form.resetFields();
    dispatch(setCopyFeesStructureModal(false));

    Modal.success({
      title: "Success",
      content: res.data.copyFeesStructure.message,
      centered: true,
      okButtonProps: {
        style: {
          backgroundColor: "dodgerblue",
        },
      },
    });
  };

  return (
    <>
      {loading ? (
        <FuseLoading logo={fees_module} />
      ) : (
        <Suspense fallback={<FuseLoading logo={fees_module} />}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
              <Toolbar
                variant="dense"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <img
                      src={activeApp.logo}
                      alt="logo"
                      width={30}
                      height={30}
                    />
                  </div>
                  {/* <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  // sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton> */}
                  <Typography variant="h6" color="inherit" component="div">
                    Fees Management
                  </Typography>

                  <div className="hidden lg:flex h-32 mx-20" />

                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons={false}
                    className="-mx-4 min-h-40"
                    classes={{
                      indicator:
                        "flex justify-center bg-transparent w-full h-full",
                    }}
                    TabIndicatorProps={{
                      children: (
                        <Box
                          sx={{ bgcolor: "text.disabled" }}
                          className="w-full h-full rounded-full opacity-20"
                        />
                      ),
                    }}
                  >
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Fees Structure"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Tuition"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Functional Fees"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Fees Items"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Other Fees"
                    />

                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Fees Categories"
                    />

                    {/* <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Configure Levels"
                    /> */}
                  </Tabs>
                </div>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/material-ui-static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>
            {activeTab === 0 && <FeesStructure />}
            {activeTab === 1 && <Tuition />}
            {activeTab === 2 && <FunctionalFees />}
            {activeTab === 3 && <FeesItems />}
            {activeTab === 4 && <OtherFees />}
            {activeTab === 5 && <FeesCategories />}
            {/* {activeTab === 4 && <ConfigureLevels />}
            {activeTab === 3 && <FeesCategories />}
            {activeTab === 2 && <FeesItems />}
            {activeTab === 1 && <FeesVersions />}
            {activeTab === 0 && <FeesStructure />} */}
            <Modal
              title="Copy Fees Structure"
              open={copyFeesStructureModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              style={{
                top: 15,
              }}
              okText="Copy"
              okButtonProps={{
                disabled: copyingFeesStructure,
                loading: copyingFeesStructure,
                style: {
                  backgroundColor: !copyingFeesStructure ? "dodgerblue" : "",
                },
              }}
              maskClosable={false}
            >
              <Form
                // initialValues={_applicantFillForm}
                form={form}
                name="copy_fees_structure_form"
                // style={formStyle}
                onFinish={onFinish}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    width: "100%",
                  }}
                >
                  <Badge.Ribbon text="From">
                    <Card
                      title="From which Acc yr, Campus and Intake"
                      size="small"
                    >
                      <Row
                        gutter={16}
                        style={
                          {
                            // marginBottom: 10,
                          }
                        }
                      >
                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`from_acc_yr`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Acc Yr">
                              {reqsRes?.acc_yrs.map((acc_yr) => (
                                <Option value={acc_yr.id}>
                                  {acc_yr.acc_yr_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`from_campus`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Campus">
                              {reqsRes?.campuses.map((campus) => (
                                <Option value={campus.id}>
                                  {campus.campus_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`from_intake`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Intake">
                              {reqsRes?.intakes.map((intake) => (
                                <Option value={intake.id}>
                                  {intake.intake_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Badge.Ribbon>
                  <Badge.Ribbon text="To">
                    <Card
                      title="To which Acc yr, Campus and Intake"
                      size="small"
                    >
                      <Row
                        gutter={16}
                        style={
                          {
                            // marginBottom: 10,
                          }
                        }
                      >
                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`to_acc_yr`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Acc Yr">
                              {reqsRes?.acc_yrs.map((acc_yr) => (
                                <Option value={acc_yr.id}>
                                  {acc_yr.acc_yr_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`to_campus`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Campus">
                              {reqsRes?.campuses.map((campus) => (
                                <Option value={campus.id}>
                                  {campus.campus_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={8}>
                          <Form.Item
                            name={`to_intake`}
                            // label={`Academic Year`}
                            rules={[
                              {
                                required: true,
                                message: "Field is Required",
                              },
                            ]}
                            style={{
                              paddingBottom: 0,
                              marginBottom: 0,
                            }}
                          >
                            <Select loading={loadingReqs2} placeholder="Intake">
                              {reqsRes?.intakes.map((intake) => (
                                <Option value={intake.id}>
                                  {intake.intake_title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Badge.Ribbon>
                  <Badge.Ribbon text="Copy scope" color="red">
                    <Card
                      title="Specify exactly what you want to copy"
                      size="small"
                    >
                      <Form.Item
                        name="scope"
                        // label="Select Scope"
                        rules={[
                          {
                            required: true,
                            message: "Required to select atleast One",
                          },
                        ]}
                      >
                        <Checkbox.Group>
                          <Row>
                            <Col span={9}>
                              <Checkbox
                                value="tuition"
                                style={{
                                  lineHeight: "32px",
                                }}
                              >
                                Tuition Fees
                              </Checkbox>
                            </Col>
                            <Col span={12}>
                              <Checkbox
                                value="functional"
                                style={{
                                  lineHeight: "32px",
                                }}
                                // disabled
                              >
                                Functional Fees
                              </Checkbox>
                            </Col>
                            <Col span={9}>
                              <Checkbox
                                value="other"
                                style={{
                                  lineHeight: "32px",
                                }}
                              >
                                Other Fees
                              </Checkbox>
                            </Col>
                            <Col span={12}>
                              <Checkbox
                                value="D"
                                style={{
                                  lineHeight: "32px",
                                }}
                                disabled
                              >
                                Discounts
                              </Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                      </Form.Item>
                    </Card>
                  </Badge.Ribbon>
                  <Badge.Ribbon text="Overwrite?" color="purple">
                    <Card
                      title="Do you want to overwrite existing data?"
                      size="small"
                    >
                      <Form.Item
                        name="overwrite"
                        rules={[
                          {
                            required: true,
                            message: "Required to select atleast One",
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio value={1}>Yes</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Card>
                  </Badge.Ribbon>
                </Space>
              </Form>
            </Modal>
          </Box>
        </Suspense>
      )}
    </>
  );
});

export default FeesMgt;
