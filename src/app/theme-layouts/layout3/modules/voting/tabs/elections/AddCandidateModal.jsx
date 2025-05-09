import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { darken } from "@mui/material/styles";
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
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { selectUser } from "app/store/userSlice";
import {
  selectAddCandidateModalVisible,
  setAddCandidateModalVisible,
  addCandidate,
  selectSelectedStdInfoItem,
  selectSelectedStudent,
} from "../../store/VotingSlice";
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

// Dummy data for political parties
const politicalParties = [
  { id: "1", name: "Independent" },
  { id: "2", name: "Student Democratic Party" },
  { id: "3", name: "Progressive Student Alliance" },
  { id: "4", name: "Campus Reform Movement" },
  { id: "5", name: "Student Unity Coalition" },
];

// Dummy data for student years
const studentYears = [
  { id: "1", name: "Year 1" },
  { id: "2", name: "Year 2" },
  { id: "3", name: "Year 3" },
  { id: "4", name: "Year 4" },
  { id: "5", name: "Year 5" },
];

// Dummy data for schools
const schools = [
  { id: "1", name: "School of Law" },
  { id: "2", name: "School of Business" },
  { id: "3", name: "School of Computing & Engineering" },
  { id: "4", name: "School of Education" },
  { id: "5", name: "School of Medicine" },
];

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function AddCandidateModal() {
  const modalVisible = useSelector(selectAddCandidateModalVisible);
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const userObj = useSelector(selectUser);
  const selectedElection = useSelector(selectSelectedStdInfoItem);
  const selectedStudent = useSelector(selectSelectedStudent);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle closing the modal
  const handleClose = () => {
    dispatch(setAddCandidateModalVisible(false));
    form.resetFields();
    setFileList([]);
    setLoading(false); // Reset loading state when closing
    setIsEditMode(false); // Reset edit mode
  };

  // Initialize form with selected student data if in edit mode
  useEffect(() => {
    if (modalVisible) {
      if (selectedStudent) {
        setIsEditMode(true);
        form.setFieldsValue({
          student_no: selectedStudent.student_no,
          surname: selectedStudent.biodata?.surname || "",
          other_names: selectedStudent.biodata?.other_names || "",
          school: selectedStudent.course?.course_code || "",
          year: selectedStudent.year || "",
          party: selectedStudent.party || "",
          manifesto: selectedStudent.manifesto || "",
          email: selectedStudent.biodata?.email || "",
          phone: selectedStudent.biodata?.phone || "",
        });

        // If there's a photo URL, create a file list
        if (selectedStudent.photo_url) {
          setFileList([
            {
              uid: "-1",
              name: "current-photo.jpg",
              status: "done",
              url: selectedStudent.photo_url,
            },
          ]);
        } else {
          setFileList([]);
        }
      } else {
        // Reset form when adding a new candidate
        setIsEditMode(false);
        form.resetFields();
        setFileList([]);
      }
    }
  }, [modalVisible, selectedStudent, form]);

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
  }, [modalVisible]);

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

    try {
      // Create a new candidate object with the EXACT structure expected by StudentList
      const newCandidate = {
        id: isEditMode ? selectedStudent.id : Date.now().toString(),
        student_no: values.student_no,
        biodata: {
          surname: values.surname,
          other_names: values.other_names,
          email: values.email,
          phone: values.phone,
        },
        course: {
          course_code: values.school,
          course_title: values.school, // Adding this as StudentList might expect it
        },
        // Additional fields that match what StudentList expects
        party: values.party,
        year: values.year,
        manifesto: values.manifesto,
        election_id: selectedElection?.id || "",
        election_name: selectedElection?.label || "",
        photo_url:
          fileList.length > 0
            ? fileList[0].originFileObj
              ? URL.createObjectURL(fileList[0].originFileObj)
              : fileList[0].url
            : null,
      };

      console.log(
        `${isEditMode ? "Updating" : "Adding"} candidate:`,
        newCandidate
      );

      // Dispatch the action to add/update the candidate
      dispatch(addCandidate(newCandidate));

      // Show success message
      dispatch(
        showMessage({
          message: `Candidate ${isEditMode ? "updated" : "added"} successfully!`,
          variant: "success",
        })
      );

      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      dispatch(setAddCandidateModalVisible(false));
      setIsEditMode(false);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} candidate:`,
        error
      );

      // Show error message
      dispatch(
        showMessage({
          message: `Failed to ${isEditMode ? "update" : "add"} candidate. Please try again.`,
          variant: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // Check file type
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return Upload.LIST_IGNORE;
      }

      // Check file size
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }

      setFileList([file]);
      return false;
    },
    fileList,
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
          zIndex: 1300,
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
              {isEditMode
                ? `Edit Candidate: ${selectedStudent?.biodata?.surname || ""} ${selectedStudent?.biodata?.other_names || ""}`
                : `Add New Candidate for ${selectedElection?.label || "Election"}`}
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
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    zIndexPopup: 1500,
                  },
                },
              }}
            >
              <Form
                form={form}
                name="candidateForm"
                initialValues={{
                  remember: true,
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
                    overflow: "auto",
                  }}
                >
                  <Col className="gutter-row" span={12}>
                    <div>
                      <Form.Item
                        name="student_no"
                        label="Student Number"
                        rules={[
                          {
                            required: true,
                            message: "Please input the student number",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., 2023/BIT/001" />
                      </Form.Item>

                      <Form.Item
                        name="surname"
                        label="Surname"
                        rules={[
                          {
                            required: true,
                            message: "Please input the surname",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., Smith" />
                      </Form.Item>

                      <Form.Item
                        name="other_names"
                        label="Other Names"
                        rules={[
                          {
                            required: true,
                            message: "Please input other names",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., John David" />
                      </Form.Item>

                      <Form.Item
                        name="school"
                        label="School"
                        rules={[
                          {
                            required: true,
                            message: "Please select a school",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select school"
                          dropdownStyle={{ zIndex: 1600 }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={schools.map((school) => ({
                            value: school.name,
                            label: school.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        name="year"
                        label="Year of Study"
                        rules={[
                          {
                            required: true,
                            message: "Please select year of study",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select year"
                          dropdownStyle={{ zIndex: 1600 }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                          options={studentYears.map((year) => ({
                            value: year.name,
                            label: year.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        name="photo"
                        label="Candidate Photo"
                        rules={[
                          {
                            required: !isEditMode,
                            message: "Please upload a candidate photo",
                          },
                        ]}
                      >
                        <Upload
                          listType="picture"
                          maxCount={1}
                          {...uploadProps}
                        >
                          <Button icon={<UploadOutlined />}>
                            Upload Photo
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <div>
                      <Form.Item
                        name="party"
                        label="Political Party"
                        rules={[
                          {
                            required: true,
                            message: "Please select a political party",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select party"
                          dropdownStyle={{ zIndex: 1600 }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={politicalParties.map((party) => ({
                            value: party.name,
                            label: party.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        name="manifesto"
                        label="Manifesto"
                        rules={[
                          {
                            required: true,
                            message: "Please input the candidate's manifesto",
                          },
                        ]}
                      >
                        <TextArea
                          rows={10}
                          placeholder="Enter the candidate's manifesto and campaign promises"
                        />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          {
                            type: "email",
                            message: "Please enter a valid email address",
                          },
                          {
                            required: true,
                            message: "Please input the candidate's email",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., john.smith@example.com" />
                      </Form.Item>

                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input the candidate's phone number",
                          },
                        ]}
                      >
                        <Input placeholder="e.g., +256 700 123456" />
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
                        {isEditMode ? "Update" : "Save"}
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

export default AddCandidateModal;
