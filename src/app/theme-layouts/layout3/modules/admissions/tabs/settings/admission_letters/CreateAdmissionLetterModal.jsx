import {
  Form,
  Modal,
  Button,
  Upload,
  Input,
  Select,
  Row,
  Col,
  Steps,
  theme,
  Divider,
  DatePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { darken, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdmissionLetterModalVisible,
  setAdmissionLetterModalVisible,
} from "../../../admissionsSlice";
import Card from "@mui/material/Card";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Add, Close } from "@mui/icons-material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { SAVE_ADMISSION_LETTER } from "../../../graphql/mutations";

const { Dragger } = Upload;

const LOAD_REQS = gql`
  query loadReqs {
    schemes {
      id
      scheme_title
    }
    intakes {
      id
      intake_title
    }
    study_times {
      id
      study_time_title
    }
  }
`;

function CreateAdmissionLetterModal() {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState(null);
  const admissionLetterModalVisible = useSelector(
    selectAdmissionLetterModalVisible
  );
  const { loading: loadingRequirements, error, data } = useQuery(LOAD_REQS);
  const [saveAdmissionLetter, { error: saveErr, loading }] = useMutation(
    SAVE_ADMISSION_LETTER,
    {
      refetchQueries: "loadAdmissionLetters",
    }
  );

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (saveErr) {
      dispatch(
        showMessage({
          message: saveErr.message,
          variant: "error",
        })
      );
    }
  }, [error, saveErr]);

  const onFinish = async (_values) => {
    // console.log("file", fileList);
    // console.log("values", values);

    const payload = {
      payload: {
        id: null,
        intake_id: values.intake_id,
        scheme_id: values.scheme_id,
        template_id: null,
        description: values.description,
        file_name: fileList[0].name,
        file: fileList[0].originFileObj,
      },
    };

    // console.log("payload", payload);
    const res = await saveAdmissionLetter({
      variables: payload,
    });

    // console.log("response", res.data);
    dispatch(
      showMessage({
        message: res.data.saveAdmissionLetter.message,
        variant: "success",
      })
    );
  };

  const props = {
    name: "file",
    multiple: false, // Restrict to one file
    accept: ".docx", // Accept only docx files
    beforeUpload: (file) => {
      console.log(file);
      if (file.name.toLowerCase().endsWith(".docx")) {
        message.error("You can only upload Docx files!");
        return Upload.LIST_IGNORE; // Prevent the file from being added to the fileList
      }
      setFileList([file]); // Replace the fileList with the new file
      return false; // Prevent automatic upload
    },
    onChange(info) {
      let newFileList = [...info.fileList]; // Copy the fileList

      // Filter successfully uploaded files
      newFileList = newFileList.filter((file) => file.status !== "error");

      // Update the fileList state
      setFileList(newFileList);

      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    fileList, // Control the fileList to only allow one file
  };

  const steps = [
    {
      title: "Document Information",
      content: (
        <div
          style={{
            position: "relative",
            // backgroundColor: "red",
            // width: 900,
            // height: "calc(100vh - 430px)",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: 0,
          }}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Only DOCX files/Word Docs are allowed
            </p>
          </Dragger>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Intake"
                  name="intake_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select intake!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Intake"
                    loading={loadingRequirements}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={
                      data?.intakes
                        ? data?.intakes.map((intake) => ({
                            value: intake.id,
                            label: intake.intake_title,
                          }))
                        : []
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please Input the description!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Describe the template"
                    rows={2}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Scheme"
                  name="scheme_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select the scheme!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Scheme"
                    loading={loadingRequirements}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={
                      data?.schemes
                        ? data?.schemes.map((scheme) => ({
                            value: scheme.id,
                            label: scheme.scheme_title,
                          }))
                        : []
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Dates",
      content: (
        <div
          style={{
            position: "relative",
            // backgroundColor: "red",
            // width: 900,
            height: "calc(100vh - 430px)",
            overflowY: "scroll",
            overflowX: "hidden",
            // padding: 10,
          }}
        >
          <Divider orientation="left" orientationMargin="0">
            Reporting Dates
          </Divider>
          <div>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="Study Time" name="study_time">
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    loading={loadingRequirements}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={
                      data?.study_times
                        ? data?.study_times.map((st) => ({
                            value: st.id,
                            label: st.study_time_title,
                          }))
                        : []
                    }
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item label="Date" name="date">
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Study Time"
                  name="study_time"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please Select intake!",
                  //     },
                  //   ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    // loading={loadingRequirements}

                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please select the scheme!",
                  //     },
                  //   ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button color="primary" variant="text" icon={<Add />}>
                Add
              </Button>
            </div>
          </div>

          <Divider orientation="left" orientationMargin="0">
            Registration Dates
          </Divider>
          <div>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Study Time"
                  name="study_time"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please Select intake!",
                  //     },
                  //   ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    // loading={loadingRequirements}

                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please select the scheme!",
                  //     },
                  //   ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Study Time"
                  name="study_time"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please Select intake!",
                  //     },
                  //   ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    // loading={loadingRequirements}

                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please select the scheme!",
                  //     },
                  //   ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button color="primary" variant="text" icon={<Add />}>
                Add
              </Button>
            </div>
          </div>

          <Divider orientation="left" orientationMargin="0">
            Lectures Start And End Dates
          </Divider>
          <div>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Study Time"
                  name="study_time"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please Select intake!",
                  //     },
                  //   ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    // loading={loadingRequirements}

                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please select the scheme!",
                  //     },
                  //   ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Study Time"
                  name="study_time"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please Select intake!",
                  //     },
                  //   ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Study Time"
                    // loading={loadingRequirements}

                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Please select the scheme!",
                  //     },
                  //   ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button color="primary" variant="text" icon={<Add />}>
                Add
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    // lineHeight: "260px",
    // textAlign: "center",
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 10,
    paddingTop: 10,
  };

  return (
    <div>
      <Modal
        open={admissionLetterModalVisible}
        closable={false}
        styles={{
          body: {
            padding: 0,
            //   backgroundColor: "red",
          },
          content: {
            padding: 0,
            borderRadius: 20,
          },
        }}
        width={700}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
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
                //   opacity: 0.7,
                color: "white",
              }}
            >
              {"Admission Letter Setup"}
            </Typography>

            <Close
              style={{
                color: "white",
                fontSize: 25,
                cursor: "pointer",
                //  marginRight: 10,
              }}
              onClick={() => {
                dispatch(setAdmissionLetterModalVisible(false));
                //   handleClose();
              }}
            />
          </Box>
          <div
            className="max-w-full relative"
            style={{
              width: 900,
              padding: 10,
            }}
          >
            <Steps size="small" current={current} items={items} />
            <Form
              name="admissionLetterForm"
              form={form}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              //  onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div style={contentStyle}>{steps[current].content}</div>

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* {current === 2 && (
                               <Button
                                 type="primary"
                                 style={{
                                   alignSelf: "flex-start",
                                 }}
                                 // onClick={addQualification}
                                 icon={<Add />}
                               >
                                 Add Academic Information
                               </Button>
                             )} */}
                </div>

                <div>
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                      }}
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={async () => {
                        // first validate before going next
                        const form1Valid = await form.validateFields();
                        if (form1Valid) {
                          // console.log("values so far", form1.getFieldsValue());
                          next();
                          setValues({ ...values, ...form.getFieldsValue() });
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </Card>
      </Modal>
    </div>
  );
}

export default CreateAdmissionLetterModal;
