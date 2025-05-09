import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Upload,
  Space,
  Button,
  Divider,
  Row,
  Col,
  Typography,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ApplicationFormBuilder from "./ApplicationFormBuilder"

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const JobForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit({
      id: initialValues?.id || Date.now().toString(),
      ...values,
      createdAt: initialValues?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: initialValues?.views || 0,
      applications: initialValues?.applications || 0,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || { status: "draft", priority: "normal" }}
      onFinish={handleSubmit}
      className="job-form"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Information" key="1">
          <Row gutter={24}>
            <Col span={16}>
              <Title level={5}>Job Details</Title>
              <Form.Item
                name="title"
                label="Job Title"
                rules={[{ required: true }]}
              >
                <Input placeholder="e.g. Senior Software Engineer" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Job Description"
                rules={[{ required: true }]}
              >
                <ReactQuill theme="snow" style={{ height: 200 }} />
              </Form.Item>

              <Form.List name={["requirements", "qualifications"]}>
                {(fields, { add, remove }) => (
                  <div style={{ marginBottom: 24 }}>
                    <Space align="baseline" style={{ marginBottom: 8 }}>
                      <Title level={5}>Qualifications</Title>
                      <Button
                        type="link"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Qualification
                      </Button>
                    </Space>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            placeholder="e.g. Bachelor's degree in Computer Science"
                            style={{ width: "90%" }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ marginLeft: 8 }}
                        />
                      </Form.Item>
                    ))}
                  </div>
                )}
              </Form.List>

              <Form.List name={["requirements", "skills"]}>
                {(fields, { add, remove }) => (
                  <div style={{ marginBottom: 24 }}>
                    <Space align="baseline" style={{ marginBottom: 8 }}>
                      <Title level={5}>Required Skills</Title>
                      <Button
                        type="link"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Skill
                      </Button>
                    </Space>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            placeholder="e.g. React.js"
                            style={{ width: "90%" }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ marginLeft: 8 }}
                        />
                      </Form.Item>
                    ))}
                  </div>
                )}
              </Form.List>

              <Form.List name="benefits">
                {(fields, { add, remove }) => (
                  <div style={{ marginBottom: 24 }}>
                    <Space align="baseline" style={{ marginBottom: 8 }}>
                      <Title level={5}>Benefits</Title>
                      <Button
                        type="link"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Benefit
                      </Button>
                    </Space>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            placeholder="e.g. Health Insurance"
                            style={{ width: "90%" }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ marginLeft: 8 }}
                        />
                      </Form.Item>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>

            <Col span={8}>
              <Title level={5}>Job Settings</Title>
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                  <Option value="archived">Archived</Option>
                </Select>
              </Form.Item>

              <Form.Item name="priority" label="Priority">
                <Select>
                  <Option value="normal">Normal</Option>
                  <Option value="featured">Featured</Option>
                  <Option value="urgent">Urgent</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="employmentType"
                label="Employment Type"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="full-time">Full Time</Option>
                  <Option value="part-time">Part Time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="freelance">Freelance</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Salary Range" required>
                <Input.Group compact>
                  <Form.Item
                    name={["salaryRange", "currency"]}
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <Select style={{ width: "30%" }}>
                      <Option value="USD">UGX</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="GBP">GBP</Option>
                      <Option value="GBP">USD</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["salaryRange", "min"]}
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      style={{ width: "35%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        (value || "").replace(/\$\s?|(,*)/g, "")
                      }
                      placeholder="Min"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["salaryRange", "max"]}
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      style={{ width: "35%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        (value || "").replace(/\$\s?|(,*)/g, "")
                      }
                      placeholder="Max"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                name="applicationDeadline"
                label="Application Deadline"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Divider />

              <Title level={5}>Location Details</Title>
              <Form.Item
                name={["location", "type"]}
                label="Location Type"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="onsite">On-site</Option>
                  <Option value="remote">Remote</Option>
                  <Option value="hybrid">Hybrid</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={["location", "country"]}
                label="Country"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  <Option value="US">United States</Option>
                  <Option value="UK">United Kingdom</Option>
                  <Option value="CA">Canada</Option>
                  {/* Add more countries */}
                </Select>
              </Form.Item>

              <Form.Item name={["location", "city"]} label="City">
                <Input placeholder="e.g. New York" />
              </Form.Item>

              <Form.Item name={["location", "address"]} label="Address">
                <TextArea rows={2} placeholder="Full address (optional)" />
              </Form.Item>

              <Divider />

              <Title level={5}>Company Information</Title>
              <Form.Item
                name={["company", "name"]}
                label="Company Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["company", "industry"]}
                label="Industry"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  <Option value="technology">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                  <Option value="education">Education</Option>
                  {/* Add more industries */}
                </Select>
              </Form.Item>

              <Form.Item name={["company", "logo"]} label="Company Logo">
                <Upload maxCount={1} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="isAlumniOwned" valuePropName="checked">
                <Switch
                  checkedChildren="Alumni Owned"
                  unCheckedChildren="Not Alumni Owned"
                />
              </Form.Item>
            </Col>
          </Row>
        </TabPane>

        {/* <TabPane tab="Application Form" key="2">
          <ApplicationFormBuilder
            initialForm={initialValues?.applicationForm}
            jobId={initialValues?.id || "new"}
            onSave={(applicationForm) => {
              form.setFieldsValue({ applicationForm })
            }}
          />
        </TabPane> */}
      </Tabs>

      <Divider />

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Job" : "Create Job"}
          </Button>
          <Button>Save as Draft</Button>
        </Space>
      </Form.Item>

      <style>{`
        .job-form {
          padding: 24px;
        }

        .job-form .ant-form-item {
          margin-bottom: 24px;
        }

        .job-form .ant-divider {
          margin: 24px 0;
        }

        .dynamic-delete-button {
          color: #ff4d4f;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dynamic-delete-button:hover {
          color: #ff7875;
        }

        .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </Form>
  );
};

export default JobForm;
