import React, { useState } from "react";
import {
  Card,
  Button,
  Table,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Tag,
  Tooltip,
  message,
  Row,
  Col,
  Statistic,
  Select,
  Divider,
  Alert,
  Badge,
  Avatar,
  DatePicker,
  Radio,
  Progress,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  CalendarOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  SyncOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useFormState } from "react-dom";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Enhanced dummy data for subscription plans
const initialPlans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 5,
    yearlyPrice: 50,
    features: [
      "Basic Alumni Directory Access",
      "View Alumni Profiles",
      "Join Alumni Groups",
      "Receive Newsletter",
      "Access to Basic Events",
    ],
    status: "active",
    subscribers: 145,
    revenue: 725,
    growth: 12.5,
    retention: 92,
    trialDays: 14,
    description:
      "Perfect for alumni who want to stay connected with basic networking features.",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "gold",
    name: "Gold",
    monthlyPrice: 15,
    yearlyPrice: 150,
    features: [
      "All Basic Features",
      "Priority Event Registration",
      "Access to Job Board",
      "Mentorship Program Access",
      "Exclusive Networking Events",
      "Professional Development Resources",
    ],
    status: "active",
    subscribers: 89,
    revenue: 1335,
    growth: 18.7,
    retention: 95,
    trialDays: 7,
    description:
      "Enhanced access to career development and networking opportunities.",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "platinum",
    name: "Platinum",
    monthlyPrice: 30,
    yearlyPrice: 300,
    features: [
      "All Gold Features",
      "VIP Event Access",
      "One-on-One Career Coaching",
      "Featured Profile Placement",
      "Access to Executive Network",
      "Unlimited Job Postings",
      "Custom Alumni Badge",
      "Priority Support",
    ],
    status: "active",
    subscribers: 34,
    revenue: 1020,
    growth: 25.3,
    retention: 98,
    trialDays: 7,
    description:
      "Premium experience with exclusive benefits and personalized support.",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-15",
  },
];

// Enhanced dummy data for subscribers
const subscribersList = [
  {
    id: "1",
    name: "John Okello",
    email: "john.okello@example.com",
    plan: "Gold",
    startDate: "2024-01-15",
    nextBillingDate: "2024-04-15",
    billingCycle: "monthly",
    status: "active",
    paymentMethod: "Credit Card",
    lastPayment: "2024-03-15",
    totalPaid: 45,
    loginCount: 23,
    lastLogin: "2024-03-18",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    notes: "Regular participant in networking events",
  },
  {
    id: "2",
    name: "Jane Nansubuga",
    email: "jane.nansubuga@example.com",
    plan: "Platinum",
    startDate: "2024-02-01",
    nextBillingDate: "2025-02-01",
    billingCycle: "yearly",
    status: "active",
    paymentMethod: "PayPal",
    lastPayment: "2024-02-01",
    totalPaid: 300,
    loginCount: 45,
    lastLogin: "2024-03-19",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    notes: "VIP member, frequent event organizer",
  },
];

const Subscriptions = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubscriberModalVisible, setIsSubscriberModalVisible] =
    useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("plans");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Calculate summary statistics
  const totalSubscribers = plans.reduce(
    (sum, plan) => sum + plan.subscribers,
    0
  );
  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const averageRetention =
    plans.reduce((sum, plan) => sum + plan.retention, 0) / plans.length;

  // Plan management functions
  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    form.setFieldsValue({
      ...plan,
      features: plan.features.join("\n"),
    });
    setIsModalVisible(true);
  };

  const handleDeletePlan = (planId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this plan?",
      content:
        "This action cannot be undone. Current subscribers will not be affected.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setPlans(plans.filter((plan) => plan.id !== planId));
        message.success("Plan deleted successfully");
      },
    });
  };

  const handleSavePlan = async (values) => {
    const features = values.features.split("\n").filter((f) => f.trim());
    const newPlan = {
      ...values,
      features,
      id: editingPlan ? editingPlan.id : Date.now().toString(),
      status: "active",
      subscribers: editingPlan ? editingPlan.subscribers : 0,
      revenue: editingPlan ? editingPlan.revenue : 0,
      growth: editingPlan ? editingPlan.growth : 0,
      retention: editingPlan ? editingPlan.retention : 100,
      createdAt: editingPlan
        ? editingPlan.createdAt
        : new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? newPlan : p)));
      message.success("Plan updated successfully");
    } else {
      setPlans([...plans, newPlan]);
      message.success("New plan created successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
    setEditingPlan(null);
  };

  const handleViewSubscriber = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsSubscriberModalVisible(true);
  };

  // Enhanced table columns for plans
  const planColumns = [
    {
      title: "Plan Details",
      key: "planDetails",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Text strong>{record.name}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.description}
          </Text>
          <Space size={4} style={{ marginTop: "4px" }}>
            <Tag color={record.status === "active" ? "green" : "red"}>
              {record.status.toUpperCase()}
            </Tag>
            <Tag color="blue">{record.trialDays} Days Trial</Tag>
          </Space>
        </Space>
      ),
    },
    {
      title: "Pricing",
      key: "pricing",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Text strong>${record.monthlyPrice}/month</Text>
          <Text type="secondary">${record.yearlyPrice}/year</Text>
          <Tag color="gold" style={{ marginTop: "4px" }}>
            Save ${(record.monthlyPrice * 12 - record.yearlyPrice).toFixed(2)}
            /year
          </Tag>
        </Space>
      ),
    },
    {
      title: "Features",
      key: "features",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Tooltip title={record.features.join("\n")}>
            <Text strong>{record.features.length} Features</Text>
          </Tooltip>
          <Progress
            percent={Math.round((record.features.length / 8) * 100)}
            size="small"
            showInfo={false}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Performance",
      key: "performance",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Space>
            <Statistic
              title="Subscribers"
              value={record.subscribers}
              valueStyle={{ fontSize: "14px" }}
            />
            <Statistic
              title="Revenue"
              value={record.revenue}
              prefix="$"
              valueStyle={{ fontSize: "14px" }}
            />
          </Space>
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">
              Growth: <Tag color="green">+{record.growth}%</Tag>
            </Text>
            <Text type="secondary">
              Retention: <Tag color="blue">{record.retention}%</Tag>
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Text>{record.updatedAt}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Created: {record.createdAt}
          </Text>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Tooltip title="Edit Plan">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditPlan(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Plan">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeletePlan(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Enhanced table columns for subscribers
  const subscriberColumns = [
    {
      title: "Subscriber",
      key: "subscriber",
      render: (record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.email}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Subscription",
      key: "subscription",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Tag color="blue">{record.plan}</Tag>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Started: {record.startDate}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Next billing: {record.nextBillingDate}
          </Text>
        </Space>
      ),
    },
    {
      title: "Billing",
      key: "billing",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Text>
            {record.billingCycle.charAt(0).toUpperCase() +
              record.billingCycle.slice(1)}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Via {record.paymentMethod}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Total paid: ${record.totalPaid}
          </Text>
        </Space>
      ),
    },
    {
      title: "Activity",
      key: "activity",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Text>{record.loginCount} logins</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Last active: {record.lastLogin}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Space direction="vertical" size={1}>
          <Tag color={record.status === "active" ? "green" : "red"}>
            {record.status === "active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )}{" "}
            {record.status.toUpperCase()}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => handleViewSubscriber(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Subscription">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Summary Statistics */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <TeamOutlined />
                  <Text strong>Total Subscribers</Text>
                </Space>
              }
              value={totalSubscribers}
              prefix={<Badge status="processing" />}
              valueStyle={{ color: "#1890ff" }}
            />
            <Text type="secondary">Across all plans</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <DollarOutlined />
                  <Text strong>Monthly Revenue</Text>
                </Space>
              }
              value={totalRevenue}
              prefix="$"
              valueStyle={{ color: "#52c41a" }}
            />
            <Text type="secondary">Current billing cycle</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <RiseOutlined />
                  <Text strong>Retention Rate</Text>
                </Space>
              }
              value={averageRetention}
              suffix="%"
              precision={1}
              valueStyle={{ color: "#722ed1" }}
            />
            <Text type="secondary">Average across plans</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        {/* Header Controls */}
        <div style={{ marginBottom: "24px" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Subscription Management
              </Title>
            </Col>
            <Col>
              <Space size="middle">
                <Button
                  type={activeTab === "plans" ? "primary" : "default"}
                  icon={<SettingOutlined />}
                  onClick={() => setActiveTab("plans")}
                >
                  Manage Plans
                </Button>
                <Button
                  type={activeTab === "subscribers" ? "primary" : "default"}
                  icon={<TeamOutlined />}
                  onClick={() => setActiveTab("subscribers")}
                >
                  View Subscribers
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Plans Management */}
        {activeTab === "plans" && (
          <>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingPlan(null);
                    form.resetFields();
                    setIsModalVisible(true);
                  }}
                >
                  Add New Plan
                </Button>
              </Col>
              <Col>
                <Space>
                  <Button icon={<DownloadOutlined />}>Export Plans</Button>
                  <Button icon={<SyncOutlined />}>Sync</Button>
                </Space>
              </Col>
            </Row>

            <Table
              columns={planColumns}
              dataSource={plans}
              rowKey="id"
              pagination={false}
              style={{ marginTop: "16px" }}
            />
          </>
        )}

        {/* Subscribers Management */}
        {activeTab === "subscribers" && (
          <>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col span={8}>
                <Input
                  placeholder="Search subscribers..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Col>
              <Col>
                <Space>
                  <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={(value) => setFilterStatus(value)}
                  >
                    <Select.Option value="all">All Status</Select.Option>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="inactive">Inactive</Select.Option>
                  </Select>
                  <RangePicker />
                  <Button icon={<DownloadOutlined />}>Export</Button>
                </Space>
              </Col>
            </Row>

            <Table
              columns={subscriberColumns}
              dataSource={subscribersList}
              rowKey="id"
              pagination={{
                total: subscribersList.length,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} subscribers`,
              }}
            />
          </>
        )}

        {/* Plan Edit/Create Modal */}
        <Modal
          title={
            <Space>
              <SettingOutlined />
              {editingPlan ? "Edit Subscription Plan" : "Create New Plan"}
            </Space>
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingPlan(null);
          }}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSavePlan}
            initialValues={{
              status: "active",
              trialDays: 14,
            }}
          >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="Plan Name"
                  rules={[
                    { required: true, message: "Please enter plan name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="status" label="Status">
                  <Select>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="inactive">Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter plan description" },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="monthlyPrice"
                  label="Monthly Price ($)"
                  rules={[
                    { required: true, message: "Please enter monthly price" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="yearlyPrice"
                  label="Yearly Price ($)"
                  rules={[
                    { required: true, message: "Please enter yearly price" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="trialDays"
                  label="Trial Period (Days)"
                  rules={[
                    { required: true, message: "Please enter trial period" },
                  ]}
                >
                  <InputNumber min={0} max={30} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="features"
              label="Features (one per line)"
              rules={[
                {
                  required: true,
                  message: "Please enter at least one feature",
                },
              ]}
              help="Enter each feature on a new line. These will be displayed as bullet points."
            >
              <Input.TextArea rows={6} />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingPlan(null);
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Subscriber Details Modal */}
        <Modal
          title={null}
          open={isSubscriberModalVisible}
          onCancel={() => setIsSubscriberModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedSubscriber && (
            <div
              style={{
                background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "32px",
                  background:
                    "linear-gradient(180deg, #f0f2f5 0%, #f8f9fa 100%)",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Row gutter={24} align="middle">
                  <Col>
                    <Avatar
                      size={80}
                      src={selectedSubscriber.avatar}
                      icon={<UserOutlined />}
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                  </Col>
                  <Col flex="1">
                    <Space direction="vertical" size={4}>
                      <Title level={3} style={{ margin: 0 }}>
                        {selectedSubscriber.name}
                      </Title>
                      <Space split={<Divider type="vertical" />}>
                        <Text type="secondary">{selectedSubscriber.email}</Text>
                        <Text type="secondary">
                          Member since {selectedSubscriber.startDate}
                        </Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col>
                    <Tag
                      color={
                        selectedSubscriber.status === "active" ? "green" : "red"
                      }
                      style={{
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {selectedSubscriber.status.toUpperCase()}
                    </Tag>
                  </Col>
                </Row>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <Row gutter={[24, 24]}>
                  {/* Subscription Details */}
                  <Col span={24}>
                    <Card title="Subscription Details" bordered={false}>
                      <Row gutter={[48, 24]}>
                        <Col span={12}>
                          <Space direction="vertical" size={16}>
                            <div>
                              <Text type="secondary">Current Plan</Text>
                              <div style={{ marginTop: 8 }}>
                                <Tag
                                  color="blue"
                                  style={{ padding: "4px 12px" }}
                                >
                                  {selectedSubscriber.plan}
                                </Tag>
                              </div>
                            </div>
                            <div>
                              <Text type="secondary">Billing Cycle</Text>
                              <div style={{ marginTop: 8 }}>
                                <Text strong>
                                  {selectedSubscriber.billingCycle
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedSubscriber.billingCycle.slice(1)}
                                </Text>
                              </div>
                            </div>
                          </Space>
                        </Col>
                        <Col span={12}>
                          <Space direction="vertical" size={16}>
                            <div>
                              <Text type="secondary">Next Billing Date</Text>
                              <div style={{ marginTop: 8 }}>
                                <Text strong>
                                  {selectedSubscriber.nextBillingDate}
                                </Text>
                              </div>
                            </div>
                            <div>
                              <Text type="secondary">Payment Method</Text>
                              <div style={{ marginTop: 8 }}>
                                <Text strong>
                                  {selectedSubscriber.paymentMethod}
                                </Text>
                              </div>
                            </div>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Usage Statistics */}
                  <Col span={24}>
                    <Card title="Usage Statistics" bordered={false}>
                      <Row gutter={24}>
                        <Col span={8}>
                          <Statistic
                            title="Total Logins"
                            value={selectedSubscriber.loginCount}
                            prefix={<TeamOutlined />}
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Total Paid"
                            value={selectedSubscriber.totalPaid}
                            prefix="$"
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Last Active"
                            value={selectedSubscriber.lastLogin}
                            prefix={<CalendarOutlined />}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Notes */}
                  {selectedSubscriber.notes && (
                    <Col span={24}>
                      <Card title="Notes" bordered={false}>
                        <Text>{selectedSubscriber.notes}</Text>
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Footer Actions */}
              <div
                style={{
                  padding: "24px 32px",
                  background: "#ffffff",
                  borderTop: "1px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <Button onClick={() => setIsSubscriberModalVisible(false)}>
                  Close
                </Button>
                <Button type="primary" icon={<EditOutlined />}>
                  Edit Subscription
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default Subscriptions;
