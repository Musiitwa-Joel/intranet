import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { lighten, darken, alpha } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Close from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Card from "@mui/material/Card";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Space,
  Tooltip,
  ConfigProvider,
  Spin,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
  TimePicker,
} from "antd";

import { Select } from "antd";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { selectUser } from "app/store/userSlice";
import {
  selectAddStudentModalVisible,
  setAddStudentModalVisible,
} from "../../../store/VotingSlice";
import PerfectScrollbar from "perfect-scrollbar";
import TextArea from "antd/es/input/TextArea";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

// Dummy data for election categories
const electionCategories = [
  { id: "guild-elections", title: "Guild Elections" },
  { id: "faculty-elections", title: "Faculty Elections" },
  { id: "class-rep-elections", title: "Class Representative Elections" },
];

// Dummy data for schools
const schools = [
  { id: "1", title: "School of Law" },
  { id: "2", title: "School of Business" },
  { id: "3", title: "School of Computing & Engineering" },
  { id: "4", title: "School of Education" },
  { id: "5", title: "School of Medicine" },
];

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function AddNewElectionModal({ visible, onClose }) {
  // Use both Redux and props for maximum compatibility
  const modalVisible = useSelector(selectAddStudentModalVisible) || visible;
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [eligibilityType, setEligibilityType] = useState("all");
  const userObj = useSelector(selectUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Handle closing the modal
  const handleClose = () => {
    // Try both methods to ensure it works
    if (dispatch) {
      try {
        dispatch(setAddStudentModalVisible(false));
      } catch (error) {
        console.log("Redux dispatch error:", error);
      }
    }

    // Also call the prop callback if provided
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      psRef.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 2,
        wheelPropagation: false,
        minScrollbarLength: 20,
      });

      const updateScrollableHeight = () => {
        if (scrollContainerRef.current) {
          const containerHeight = scrollContainerRef.current.clientHeight;
          const contentHeight = scrollContainerRef.current.scrollHeight;
          setScrollableHeight(contentHeight - containerHeight);
        }
      };

      updateScrollableHeight();
      window.addEventListener("resize", updateScrollableHeight);

      return () => {
        if (psRef.current) {
          psRef.current.destroy();
          psRef.current = null;
        }
        window.removeEventListener("resize", updateScrollableHeight);
      };
    }
  }, [scrollContainerRef.current]);

  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (container) {
      const { deltaY } = e;
      const { scrollTop } = container;

      if (
        (deltaY > 0 && scrollTop >= scrollableHeight) ||
        (deltaY < 0 && scrollTop <= 0)
      ) {
        e.preventDefault();
      }
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      form.resetFields();

      if (dispatch) {
        try {
          dispatch(
            showMessage({
              message: "Election created successfully!",
              variant: "success",
            })
          );
        } catch (error) {
          console.log("Redux message dispatch error:", error);
          alert("Election created successfully!");
        }
      } else {
        alert("Election created successfully!");
      }

      handleClose();
    }, 1000);
  };

  const handleEligibilityTypeChange = (e) => {
    setEligibilityType(e.target.value);
  };

  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={modalVisible}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{
          top: -70,
          zIndex: 1300, // Ensure the modal has a high z-index
        }}
      >
        <Card
          className={clsx("", "shadow")}
          sx={{
            backgroundColor: (theme) =>
              darken(
                theme.palette.background.paper,
                theme.palette.mode === "light" ? 0.01 : 0.1
              ),
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1e293b",
            }}
            className="p-10"
            id="draggable-dialog-title"
            style={{
              paddingLeft: 15,
              display: "flex",
              justifyContent: "space-between",
              cursor: "move",
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              style={{
                color: "white",
              }}
            >
              {"Add New Election"}
            </Typography>

            <Tooltip title="Close">
              <Close
                style={{
                  color: "white",
                  fontSize: 25,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </Tooltip>
          </Box>
          <div
            style={{
              padding: 15,
            }}
          >
            {/* Configure Ant Design to ensure dropdowns appear above the modal */}
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    zIndexPopup: 1500, // Higher than the modal's z-index
                  },
                  DatePicker: {
                    zIndexPopup: 1500, // Higher than the modal's z-index
                  },
                  TimePicker: {
                    zIndexPopup: 1500, // Higher than the modal's z-index
                  },
                },
              }}
            >
              <Form
                form={form}
                name="electionForm"
                initialValues={{
                  remember: true,
                  eligibility_type: "all",
                  tuition_percentage: 70,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                {...formItemLayout}
              >
                <Row
                  gutter={16}
                  ref={scrollContainerRef}
                  onWheel={handleWheel}
                  style={{
                    position: "relative",
                    width: 900,
                    height: "calc(100vh - 250px)",
                    overflow: "auto", // Changed from "scroll" to "auto"
                  }}
                >
                  <Col className="gutter-row" span={12}>
                    <div>
                      <Form.Item
                        name="election_category"
                        label="Election Category"
                        rules={[
                          {
                            required: true,
                            message: "Please select an election category",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select election category"
                          dropdownStyle={{ zIndex: 1600 }} // Explicit z-index for dropdown
                          getPopupContainer={(trigger) => trigger.parentNode} // Render in parent for better positioning
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={electionCategories.map((category) => ({
                            value: category.id,
                            label: category.title,
                          }))}
                          onSelect={(value) => {
                            const selected = electionCategories.find(
                              (category) => value === category.id
                            );
                            setSelectedCategory(selected);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        name="election_code"
                        label="Election Code"
                        rules={[
                          {
                            required: true,
                            message: "Please input the election code",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., GE001" />
                      </Form.Item>

                      <Form.Item
                        name="election_name"
                        label="Election Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input the election name",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., Presidential" />
                      </Form.Item>

                      <Form.Item
                        name="election_date"
                        label="Election Date"
                        rules={[
                          {
                            required: true,
                            message: "Please select the election date",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          popupStyle={{ zIndex: 1600 }} // Explicit z-index for popup
                          getPopupContainer={(trigger) => trigger.parentNode} // Render in parent for better positioning
                        />
                      </Form.Item>

                      <Form.Item
                        name="election_start_time"
                        label="Election Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Please select the election start time",
                          },
                        ]}
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          style={{ width: "100%" }}
                          popupStyle={{ zIndex: 1600 }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        />
                      </Form.Item>

                      <Form.Item
                        name="election_end_time"
                        label="Election End Time"
                        rules={[
                          {
                            required: true,
                            message: "Please select the election end time",
                          },
                        ]}
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          style={{ width: "100%" }}
                          popupStyle={{ zIndex: 1600 }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        />
                      </Form.Item>

                      <Form.Item
                        name="registration_start_date"
                        label="Registration Start Date"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please select the registration start date",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          popupStyle={{ zIndex: 1600 }} // Explicit z-index for popup
                          getPopupContainer={(trigger) => trigger.parentNode} // Render in parent for better positioning
                        />
                      </Form.Item>

                      <Form.Item
                        name="registration_end_date"
                        label="Registration End Date"
                        rules={[
                          {
                            required: true,
                            message: "Please select the registration end date",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          popupStyle={{ zIndex: 1600 }} // Explicit z-index for popup
                          getPopupContainer={(trigger) => trigger.parentNode} // Render in parent for better positioning
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <div>
                      <Form.Item
                        name="nomination_fee"
                        label="Nomination Fee (UGX)"
                        rules={[
                          {
                            required: true,
                            message: "Please input the nomination fee",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          placeholder="e.g., 500,000"
                        />
                      </Form.Item>

                      <Form.Item
                        name="eligibility_type"
                        label="Eligibility"
                        rules={[
                          {
                            required: true,
                            message: "Please select eligibility type",
                          },
                        ]}
                      >
                        <Radio.Group onChange={handleEligibilityTypeChange}>
                          <Radio value="all">All Schools</Radio>
                          <Radio value="specific">Specific Schools</Radio>
                        </Radio.Group>
                      </Form.Item>

                      {eligibilityType === "specific" && (
                        <Form.Item
                          name="eligible_schools"
                          label="Eligible Schools"
                          rules={[
                            {
                              required: eligibilityType === "specific",
                              message: "Please select at least one school",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select schools"
                            style={{ width: "100%" }}
                            dropdownStyle={{ zIndex: 1600 }} // Explicit z-index for dropdown
                            getPopupContainer={(trigger) => trigger.parentNode} // Render in parent for better positioning
                            options={schools.map((school) => ({
                              value: school.id,
                              label: school.title,
                            }))}
                          />
                        </Form.Item>
                      )}

                      <Form.Item
                        name="tuition_percentage"
                        label="Required Tuition %"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input the required tuition percentage",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace("%", "")}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item
                        name="election_rules"
                        label="Election Rules"
                        rules={[
                          {
                            required: true,
                            message: "Please input the election rules",
                          },
                        ]}
                      >
                        <TextArea
                          rows={6}
                          placeholder="Enter the rules and regulations for this election"
                        />
                      </Form.Item>

                      <Form.Item
                        name="is_active"
                        label="Active Status"
                        valuePropName="checked"
                        initialValue={true}
                      >
                        <Checkbox>
                          Make this election active immediately
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Space>
                      <Button onClick={handleClose}>Cancel</Button>

                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          backgroundColor: "dodgerblue",
                        }}
                        loading={loading}
                        disabled={loading}
                      >
                        Save
                      </Button>
                    </Space>
                  </div>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </Card>
      </Dialog>
    </div>
  );
}

export default AddNewElectionModal;
