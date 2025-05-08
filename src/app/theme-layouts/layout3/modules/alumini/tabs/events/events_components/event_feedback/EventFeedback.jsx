import React from "react";
import { useState } from "react";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  Table,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  Switch,
  List,
  Popconfirm,
  notification,
  Upload,
  Rate,
  Progress,
} from "antd";
import {
  FormOutlined,
  SendOutlined,
  BarChartOutlined,
  MessageOutlined,
  CameraOutlined,
  TrophyOutlined,
  CommentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;

// Sample data for demonstration
const surveys = [
  {
    id: 1,
    name: "Post-Event Survey: Alumni Homecoming 2024",
    responses: 150,
    status: "Active",
  },
  {
    id: 2,
    name: "Feedback: Career Fair 2024",
    responses: 75,
    status: "Closed",
  },
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    content: "The alumni event was fantastic! Great networking opportunity.",
    approved: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    content:
      "I learned so much from the workshops. Can't wait for the next event!",
    approved: false,
  },
];

const satisfactionData = [
  { aspect: "Organization", rating: 4.5 },
  { aspect: "Speakers", rating: 4.8 },
  { aspect: "Venue", rating: 4.2 },
  { aspect: "Networking Opportunities", rating: 4.6 },
];

const EventFeedbackSurveys = () => {
  const [isCreateSurveyModalVisible, setIsCreateSurveyModalVisible] =
    useState(false);
  const [isSendSurveyModalVisible, setIsSendSurveyModalVisible] =
    useState(false);
  const [isViewResponsesModalVisible, setIsViewResponsesModalVisible] =
    useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [surveyForm] = Form.useForm();
  const [sendSurveyForm] = Form.useForm();

  const handleCreateSurvey = (values) => {
    console.log("Create survey:", values);
    notification.success({
      message: "Survey Created",
      description: "The survey has been created successfully.",
    });
    setIsCreateSurveyModalVisible(false);
    surveyForm.resetFields();
  };

  const handleSendSurvey = (values) => {
    console.log("Send survey:", values);
    notification.success({
      message: "Survey Sent",
      description: "The survey has been sent to the selected recipients.",
    });
    setIsSendSurveyModalVisible(false);
    sendSurveyForm.resetFields();
  };

  const handleFileUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    setFileList(fileList);

    if (info.file.status === "done") {
      notification.success({
        message: "File Uploaded",
        description: `${info.file.name} file uploaded successfully.`,
      });
    } else if (info.file.status === "error") {
      notification.error({
        message: "Upload Failed",
        description: `${info.file.name} file upload failed.`,
      });
    }
  };

  const surveyColumns = [
    { title: "Survey Name", dataIndex: "name", key: "name" },
    { title: "Responses", dataIndex: "responses", key: "responses" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<SendOutlined />}
            onClick={() => {
              setSelectedSurvey(record);
              setIsSendSurveyModalVisible(true);
            }}
          >
            Send
          </Button>
          <Button
            icon={<BarChartOutlined />}
            onClick={() => {
              setSelectedSurvey(record);
              setIsViewResponsesModalVisible(true);
            }}
          >
            View Responses
          </Button>
        </Space>
      ),
    },
  ];

  const testimonialColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Status",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <Tag color={approved ? "green" : "orange"}>
          {approved ? "Approved" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this testimonial?"
            onConfirm={() => handleDeleteTestimonial(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteTestimonial = (id) => {
    console.log("Delete testimonial:", id);
    notification.success({
      message: "Testimonial Deleted",
      description: "The testimonial has been deleted successfully.",
    });
  };

  return (
    <div style={{ padding: "5px" }}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <FormOutlined />
                &nbsp;Surveys
              </span>
            }
            key="1"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={4}>Manage Surveys</Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateSurveyModalVisible(true)}
                  >
                    Create Survey
                  </Button>
                </Col>
              </Row>
              <Table
                size="small"
                columns={surveyColumns}
                dataSource={surveys}
                rowKey="id"
              />
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <MessageOutlined />
                &nbsp;Testimonials
              </span>
            }
            key="2"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Title level={4}>Manage Testimonials</Title>
              <Table
                size="small"
                columns={testimonialColumns}
                dataSource={testimonials}
                rowKey="id"
              />
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                &nbsp;Satisfaction Report
              </span>
            }
            key="3"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Title level={4}>Event Satisfaction Report</Title>
              <Row gutter={16}>
                {satisfactionData.map((item) => (
                  <Col span={6} key={item.aspect}>
                    <Card>
                      <Statistic
                        title={item.aspect}
                        value={item.rating}
                        precision={1}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="/ 5"
                      />
                      <Rate
                        disabled
                        defaultValue={item.rating}
                        style={{ marginTop: 8 }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <CameraOutlined />
                &nbsp;Media Submissions
              </span>
            }
            key="4"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Title level={4}>Event Photos & Videos</Title>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={handleFileUpload}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <TrophyOutlined />
                &nbsp;Certificates
              </span>
            }
            key="5"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Title level={4}>Participation Certificates</Title>
              <Button type="primary" icon={<SendOutlined />}>
                Generate and Send Certificates
              </Button>
            </Space>
          </TabPane>
          <TabPane
            tab={
              <span>
                <CommentOutlined />
                &nbsp;Public Reviews
              </span>
            }
            key="6"
          >
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Title level={4}>Manage Public Reviews</Title>
              <Switch defaultChecked />
              <Text>Allow public reviews and ratings on the alumni portal</Text>
            </Space>
          </TabPane>
        </Tabs>
      </Card>

      {/* Create Survey Modal */}
      <Modal
        title="Create Survey"
        visible={isCreateSurveyModalVisible}
        onCancel={() => setIsCreateSurveyModalVisible(false)}
        footer={null}
      >
        <Form form={surveyForm} layout="vertical" onFinish={handleCreateSurvey}>
          <Form.Item
            name="surveyName"
            label="Survey Name"
            rules={[{ required: true, message: "Please enter a survey name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="questions"
            label="Questions"
            rules={[
              { required: true, message: "Please add at least one question" },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Add questions"
            >
              <Select.Option value="How would you rate the overall event?">
                How would you rate the overall event?
              </Select.Option>
              <Select.Option value="What was your favorite part of the event?">
                What was your favorite part of the event?
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="allowAnonymous" valuePropName="checked">
            <Switch />
            <span style={{ marginLeft: 8 }}>Allow Anonymous Responses</span>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Survey
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Send Survey Modal */}
      <Modal
        title={`Send Survey: ${selectedSurvey?.name}`}
        visible={isSendSurveyModalVisible}
        onCancel={() => setIsSendSurveyModalVisible(false)}
        footer={null}
      >
        <Form
          form={sendSurveyForm}
          layout="vertical"
          onFinish={handleSendSurvey}
        >
          <Form.Item
            name="recipients"
            label="Recipients"
            rules={[{ required: true, message: "Please select recipients" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select recipients"
            >
              <Select.Option value="all">All Attendees</Select.Option>
              <Select.Option value="speakers">Speakers</Select.Option>
              <Select.Option value="volunteers">Volunteers</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Survey
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Responses Modal */}
      <Modal
        title={`Survey Responses: ${selectedSurvey?.name}`}
        visible={isViewResponsesModalVisible}
        onCancel={() => setIsViewResponsesModalVisible(false)}
        footer={null}
        width={800}
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            { question: "How would you rate the overall event?", average: 4.5 },
            {
              question: "What was your favorite part of the event?",
              responses: ["Networking", "Workshops", "Keynote Speech"],
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.question}
                description={
                  item.average ? (
                    <Space>
                      <Rate disabled defaultValue={item.average} />
                      <Text>{item.average.toFixed(1)} / 5</Text>
                    </Space>
                  ) : (
                    <ul>
                      {item.responses.map((response, index) => (
                        <li key={index}>{response}</li>
                      ))}
                    </ul>
                  )
                }
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: 16 }}>
          <Title level={5}>Response Rate</Title>
          <Progress
            percent={75}
            format={(percent) =>
              `${percent}% (${selectedSurvey?.responses} responses)`
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default EventFeedbackSurveys;
