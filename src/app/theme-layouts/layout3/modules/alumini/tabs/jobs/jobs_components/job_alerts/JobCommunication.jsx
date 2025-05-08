import React from "react";
import { useState } from "react";
import {
  Layout,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Select,
  Typography,
  Tabs,
  Statistic,
  Row,
  Col,
  Modal,
  Form,
  Divider,
  Switch,
  TimePicker,
  message,
  Alert,
  Tooltip,
  Avatar,
} from "antd";
import {
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  CalendarOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  GlobalOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

// Add this mock data after the imports and before the JobAlerts component
const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    description: "We are looking for a Senior Software Engineer...",
    salaryRange: {
      min: 100000,
      max: 150000,
      currency: "UGX",
    },
    location: {
      type: "hybrid",
      address: "123 Tech Street",
      country: "US",
      city: "San Francisco",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: [
        "Bachelor's degree in Computer Science",
        "5+ years experience",
      ],
      experience: "5+ years",
      skills: ["React", "Node.js", "TypeScript"],
    },
    benefits: ["Health Insurance", "401k", "Remote Work"],
    applicationDeadline: "2024-03-31",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job1",
    },
    status: "published",
    priority: "featured",
    company: {
      id: "c1",
      name: "Tech Corp",
      industry: "Technology",
      logo: "data:image/png;base64,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",
      website: "https://techcorp.com",
      linkedIn: "https://linkedin.com/company/techcorp",
      email: "careers@techcorp.com",
      contact: {
        name: "Jane Smith",
        position: "HR Manager",
        email: "jane.smith@techcorp.com",
        phone: "+1234567890",
      },
    },
    tags: ["react", "nodejs", "typescript"],
    createdAt: "2024-02-01",
    updatedAt: "2024-02-20",
    views: 1500,
    applications: 45,
    isAlumniOwned: true,
  },
];

// Update the JobAlerts component to use the mock data
const JobAlerts = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertForm] = Form.useForm();

  // Mock data for analytics
  const mockAnalytics = [
    { date: "2024-01", sent: 150, opened: 120, clicked: 80, applied: 30 },
    { date: "2024-02", sent: 180, opened: 150, clicked: 100, applied: 45 },
    // Add more data points
  ];

  const handleCreateAlert = (values) => {
    if (!selectedJob) {
      message.error("Please select a job first");
      return;
    }

    // Handle alert creation
    message.success("Alert created successfully");
    setIsAlertModalVisible(false);
    alertForm.resetFields();
  };

  return (
    <div className="job-alerts-container">
      <Card className="job-selection-card">
        <Space
          direction="vertical"
          style={{ width: "100%", gap: 2 }}
          size="large"
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4}>Job Alerts & Communication</Title>
            </Col>
            <Col>
              <Space>
                <Text type="secondary">
                  <InfoCircleOutlined /> Select a job to manage alerts and
                  communications
                </Text>
              </Space>
            </Col>
          </Row>

          <Select
            style={{ width: "100%" }}
            placeholder="Select a job to manage alerts..."
            value={selectedJob?.id}
            onChange={(value) =>
              setSelectedJob(mockJobs.find((job) => job.id === value) || null)
            }
            allowClear
            showSearch
            optionFilterProp="children"
            size="large"
            optionLabelProp="label"
          >
            {mockJobs.length > 0 ? (
              mockJobs.map((job) => (
                <Option key={job.id} value={job.id} label={job.title}>
                  <Space align="start" style={{ width: "100%" }}>
                    <Avatar
                      src={job.company.logo}
                      icon={!job.company.logo && <UserOutlined />}
                    />
                    <Space direction="vertical" size={0}>
                      <Text strong>{job.title}</Text>
                      <Text type="secondary">{job.company.name}</Text>
                      <Space size={4}>
                        <Tag
                          color={
                            job.status === "published" ? "success" : "default"
                          }
                        >
                          {job.status}
                        </Tag>
                        <Tag icon={<TeamOutlined />}>
                          {job.applications} applied
                        </Tag>
                      </Space>
                    </Space>
                  </Space>
                </Option>
              ))
            ) : (
              <Text type="secondary">No jobs available</Text>
            )}
          </Select>
        </Space>
      </Card>

      {!selectedJob ? (
        <Card>
          <Alert
            message="No Job Selected"
            description="Please select a job from above to manage alerts and communications."
            type="info"
            showIcon
          />
        </Card>
      ) : (
        <div className="selected-job-content">
          {/* Job Overview Card */}
          <Card className="job-overview-card">
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Space direction="vertical" size={4}>
                  <Space size={16}>
                    <Avatar
                      size={64}
                      src={selectedJob.company.logo}
                      icon={!selectedJob.company.logo && <UserOutlined />}
                    />
                    <Space direction="vertical" size={0}>
                      <Title level={4} style={{ marginBottom: 8 }}>
                        {selectedJob.title}
                      </Title>
                      <Space size={16}>
                        <Text type="secondary">{selectedJob.company.name}</Text>
                        <Divider type="vertical" />
                        <Text>
                          <ClockCircleOutlined /> Deadline:{" "}
                          {new Date(
                            selectedJob.applicationDeadline
                          ).toLocaleDateString()}
                        </Text>
                        <Divider type="vertical" />
                        <Tag icon={<GlobalOutlined />}>
                          {selectedJob.location.type}
                        </Tag>
                      </Space>
                    </Space>
                  </Space>
                </Space>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Space>
                    <Tooltip title="Create new alert for this job">
                      <Button
                        type="primary"
                        icon={<BellOutlined />}
                        onClick={() => setIsAlertModalVisible(true)}
                      >
                        Create Alert
                      </Button>
                    </Tooltip>
                  </Space>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Main Content Tabs */}
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane
                tab={
                  <Tooltip title="View and manage active alerts">
                    <span>
                      <BellOutlined /> Active Alerts
                    </span>
                  </Tooltip>
                }
                key="1"
              >
                <AlertsOverview job={selectedJob} />
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="View alert performance metrics">
                    <span>
                      <LineChartOutlined /> Analytics
                    </span>
                  </Tooltip>
                }
                key="2"
              >
                <AlertsAnalytics data={mockAnalytics} />
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="Configure alert settings">
                    <span>
                      <SettingOutlined /> Settings
                    </span>
                  </Tooltip>
                }
                key="3"
              >
                <AlertSettings job={selectedJob} />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      )}

      {/* Create Alert Modal */}
      <Modal
        title={
          <Space>
            <BellOutlined />
            Create Alert for "{selectedJob?.title}"
          </Space>
        }
        open={isAlertModalVisible}
        onCancel={() => setIsAlertModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={alertForm} layout="vertical" onFinish={handleCreateAlert}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Channels & Schedule" key="1">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="channels"
                    label="Communication Channels"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one channel",
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="Select channels">
                      <Option value="email">Email</Option>
                      <Option value="sms">SMS</Option>
                      <Option value="push">Push Notification</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="schedule"
                    label="Alert Schedule"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select frequency">
                      <Option value="immediate">Send Immediately</Option>
                      <Option value="daily">Daily</Option>
                      <Option value="weekly">Weekly</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.schedule !== currentValues.schedule
                }
              >
                {({ getFieldValue }) => {
                  const schedule = getFieldValue("schedule");
                  return schedule && schedule !== "immediate" ? (
                    <Form.Item name="time" label="Send Time">
                      <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
            </TabPane>

            <TabPane tab="Audience" key="2">
              <Form.Item name="audienceType" label="Target Audience">
                <Select defaultValue="all">
                  <Option value="all">All Alumni</Option>
                  <Option value="targeted">Targeted Alumni</Option>
                </Select>
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.audienceType !== currentValues.audienceType
                }
              >
                {({ getFieldValue }) => {
                  const audienceType = getFieldValue("audienceType");
                  return audienceType === "targeted" ? (
                    <>
                      <Form.Item name="departments" label="Departments">
                        <Select
                          mode="multiple"
                          placeholder="Select departments"
                        >
                          <Option value="it">IT</Option>
                          <Option value="finance">Finance</Option>
                          <Option value="marketing">Marketing</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="graduationYears"
                        label="Graduation Years"
                      >
                        <Select mode="multiple" placeholder="Select years">
                          {Array.from(
                            { length: 5 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <Option key={year} value={year}>
                              {year}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="skills" label="Required Skills">
                        <Select mode="tags" placeholder="Enter skills">
                          {(selectedJob?.requirements?.skills || []).map(
                            (skill) => (
                              <Option key={skill} value={skill}>
                                {skill}
                              </Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    </>
                  ) : null;
                }}
              </Form.Item>
            </TabPane>

            <TabPane tab="Message" key="3">
              <Form.Item name="template" label="Message Template">
                <Select placeholder="Select template">
                  <Option value="standard">Standard Job Alert</Option>
                  <Option value="urgent">Urgent Opening</Option>
                  <Option value="reminder">
                    Application Deadline Reminder
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="customMessage" label="Custom Message">
                <ReactQuill theme="snow" style={{ height: 200 }} />
              </Form.Item>
            </TabPane>
          </Tabs>

          <Divider />

          <Form.Item>
            <Space>
              <Button onClick={() => setIsAlertModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Alert
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <style>{`
        .job-alerts-container {
          padding: 2px;
          background: #f0f2f5;
          min-height: 100vh;
        }

        .job-selection-card {
          margin-bottom: 24px;
        }

        .job-overview-card {
          margin-bottom: 4px;
        }

        .selected-job-content {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ant-select-item-option-content {
          white-space: normal;
        }

        .ant-select-item {
          padding: 8px 12px;
        }

        .ant-card {
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
            0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        .ant-tabs-nav {
          margin-bottom: 4px;
        }

        .ant-select-selection-item {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
// Subcomponents
const AlertsOverview = ({ job }) => {
  const mockAlerts = [
    {
      id: "1",
      jobId: job.id,
      channels: ["email", "push"],
      schedule: { frequency: "immediate" },
      audience: { type: "all" },
      content: { template: "standard" },
      status: "active",
    },
    // Add more mock alerts
  ];

  const columns = [
    {
      title: "Channels",
      key: "channels",
      render: (_, record) => (
        <Space>
          {record.channels.map((channel) => {
            const icons = {
              email: <MailOutlined />,
              sms: <MessageOutlined />,
              push: <BellOutlined />,
            };
            return (
              <Tag key={channel} icon={icons[channel]}>
                {channel.toUpperCase()}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (_, record) => (
        <Space>
          <CalendarOutlined />
          <span>{record.schedule.frequency}</span>
          {record.schedule.time && <span>at {record.schedule.time}</span>}
        </Space>
      ),
    },
    {
      title: "Audience",
      key: "audience",
      render: (_, record) => (
        <Tag icon={<TeamOutlined />}>
          {record.audience.type === "all" ? "All Alumni" : "Targeted"}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === "active"}
          checkedChildren="Active"
          unCheckedChildren="Paused"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table size="small" columns={columns} dataSource={mockAlerts} rowKey="id" />
  );
};

const AlertsAnalytics = ({ data }) => {
  return (
    <div className="analytics-container">
      <Row gutter={[4, 4]}>
        <Col span={6}>
          <Card style={{ borderColor: "blue" }}>
            <Statistic
              title="Total Alerts Sent"
              value={data.reduce((sum, item) => sum + item.sent, 0)}
              prefix={<BellOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "green" }}>
            <Statistic
              title="Open Rate"
              value={Math.round(
                (data.reduce((sum, item) => sum + item.opened, 0) /
                  data.reduce((sum, item) => sum + item.sent, 0)) *
                  100
              )}
              suffix="%"
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "orange" }}>
            <Statistic
              title="Click Rate"
              value={Math.round(
                (data.reduce((sum, item) => sum + item.clicked, 0) /
                  data.reduce((sum, item) => sum + item.sent, 0)) *
                  100
              )}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "red" }}>
            <Statistic
              title="Application Rate"
              value={Math.round(
                (data.reduce((sum, item) => sum + item.applied, 0) /
                  data.reduce((sum, item) => sum + item.sent, 0)) *
                  100
              )}
              suffix="%"
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={5}>Performance Trends</Title>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <RechartsTooltip />
            <Area
              type="monotone"
              dataKey="sent"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Sent"
            />
            <Area
              type="monotone"
              dataKey="opened"
              stackId="2"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Opened"
            />
            <Area
              type="monotone"
              dataKey="clicked"
              stackId="3"
              stroke="#ffc658"
              fill="#ffc658"
              name="Clicked"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

const AlertSettings = ({ job }) => {
  return (
    <div className="settings-container">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Default Alert Settings">
            <Form layout="vertical">
              <Form.Item label="Default Communication Channels">
                <Select
                  mode="multiple"
                  defaultValue={["email"]}
                  style={{ width: "100%" }}
                >
                  <Option value="email">Email</Option>
                  <Option value="sms">SMS</Option>
                  <Option value="push">Push Notification</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Reminder Schedule">
                <Select defaultValue="3days">
                  <Option value="1day">1 day before deadline</Option>
                  <Option value="3days">3 days before deadline</Option>
                  <Option value="1week">1 week before deadline</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Auto-pause alerts when">
                <Select mode="multiple" defaultValue={["filled", "expired"]}>
                  <Option value="filled">Position is filled</Option>
                  <Option value="expired">Job post expires</Option>
                  <Option value="applications">
                    Application limit reached
                  </Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Notification Templates">
            <Form layout="vertical">
              <Form.Item label="Standard Job Alert Template">
                <ReactQuill theme="snow" style={{ height: 120 }} />
              </Form.Item>

              <Form.Item label="Urgent Opening Template">
                <ReactQuill theme="snow" style={{ height: 120 }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobAlerts;
