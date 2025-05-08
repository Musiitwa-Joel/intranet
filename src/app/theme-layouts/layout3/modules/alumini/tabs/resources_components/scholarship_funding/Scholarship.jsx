import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  Tabs,
  Button,
  Space,
  Table,
  Tag,
  Input,
  Form,
  Select,
  Modal,
  DatePicker,
  InputNumber,
  Switch,
  message,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  Badge,
  Avatar,
  Popconfirm,
  Dropdown,
  Timeline,
  Descriptions,
} from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  SafetyOutlined,
  FileTextOutlined,
  BellOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock Data
const mockApplications = [
  {
    id: "APP001",
    applicantName: "John Doe",
    program: "Merit Scholarship 2024",
    amount: 5000,
    status: "pending",
    submittedDate: "2024-02-20",
    score: 85,
    eligibilityMet: true,
    documents: ["transcript.pdf", "recommendation.pdf"],
    academicRecord: {
      gpa: 3.8,
      major: "Computer Science",
      year: 2,
    },
    financialInfo: {
      income: 35000,
      dependents: 2,
      needIndex: 75,
    },
  },
  {
    id: "APP002",
    applicantName: "Jane Smith",
    program: "Need-Based Grant 2024",
    amount: 7500,
    status: "approved",
    submittedDate: "2024-02-18",
    score: 92,
    eligibilityMet: true,
    documents: ["transcript.pdf", "financial_docs.pdf"],
    academicRecord: {
      gpa: 3.9,
      major: "Engineering",
      year: 3,
    },
    financialInfo: {
      income: 28000,
      dependents: 3,
      needIndex: 85,
    },
  },
];

const mockApplicationTimeline = [
  {
    date: "2024-02-20",
    type: "submission",
    description: "Application submitted",
    status: "success",
  },
  {
    date: "2024-02-21",
    type: "review",
    description: "Initial review completed",
    status: "success",
  },
  {
    date: "2024-02-22",
    type: "update",
    description: "Additional documents requested",
    status: "warning",
  },
  {
    date: "2024-02-23",
    type: "update",
    description: "Documents received",
    status: "success",
  },
  {
    date: "2024-02-24",
    type: "review",
    description: "Final review in progress",
    status: "processing",
  },
];

const mockPrograms = [
  {
    id: "SCH001",
    name: "Merit Scholarship 2024",
    totalFund: 100000,
    allocatedFund: 45000,
    remainingFund: 55000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    eligibilityCriteria: {
      minGPA: 3.5,
      maxIncome: 50000,
      requiredDocuments: [
        "Transcript",
        "Recommendation Letter",
        "Income Statement",
      ],
    },
    currency: "USD",
    renewalRequired: true,
    description: "Merit-based scholarship for outstanding academic achievement",
    applicationDeadline: "2024-03-31",
  },
  {
    id: "SCH002",
    name: "Need-Based Grant 2024",
    totalFund: 150000,
    allocatedFund: 75000,
    remainingFund: 75000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    eligibilityCriteria: {
      minGPA: 2.5,
      maxIncome: 35000,
      requiredDocuments: ["Financial Documents", "Income Statement"],
    },
    currency: "USD",
    renewalRequired: false,
    description: "Financial aid for students demonstrating significant need",
    applicationDeadline: "2024-04-15",
  },
];

const mockMetrics = {
  funds: {
    totalFunds: 500000,
    allocatedFunds: 250000,
    remainingFunds: 250000,
    disbursedAmount: 200000,
    pendingDisbursement: 50000,
    averageAward: 10000,
  },
  applications: {
    total: 50,
    pending: 20,
    approved: 15,
    rejected: 5,
    underReview: 10,
    fraudDetected: 2,
    appealsPending: 3,
  },
};

const ApplicationDetailsModal = ({ application, visible, onClose }) => {
  if (!application) return null;

  const getStatusColor = (status) => {
    const colors = {
      pending: "#1890ff",
      approved: "#52c41a",
      rejected: "#ff4d4f",
      under_review: "#faad14",
    };
    return colors[status];
  };

  return (
    <Modal
      title={
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>Application Details</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "0 16px" }}>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card title="Basic Information" className="details-card">
              <Descriptions column={2}>
                <Descriptions.Item label="Applicant Name">
                  {application.applicantName}
                </Descriptions.Item>
                <Descriptions.Item label="Application ID">
                  {application.id}
                </Descriptions.Item>
                <Descriptions.Item label="Program">
                  {application.program}
                </Descriptions.Item>
                <Descriptions.Item label="Submitted Date">
                  {application.submittedDate}
                </Descriptions.Item>
                <Descriptions.Item label="Amount Requested">
                  ${application.amount.toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge
                    status={
                      application.status === "approved"
                        ? "success"
                        : application.status === "rejected"
                          ? "error"
                          : application.status === "under_review"
                            ? "warning"
                            : "processing"
                    }
                    text={application.status.replace("_", " ").toUpperCase()}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Academic Information" className="details-card">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="GPA"
                    value={application.academicRecord.gpa}
                    precision={2}
                    valueStyle={{
                      color:
                        application.academicRecord.gpa >= 3.5
                          ? "#52c41a"
                          : "#faad14",
                    }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Year"
                    value={application.academicRecord.year}
                    suffix="of study"
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Major"
                    value={application.academicRecord.major}
                  />
                </Col>
              </Row>
            </Card>

            <Card title="Financial Information" className="details-card">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Annual Income"
                    value={application.financialInfo.income}
                    prefix="$"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Dependents"
                    value={application.financialInfo.dependents}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Need Index"
                    value={application.financialInfo.needIndex}
                    suffix="%"
                    valueStyle={{
                      color:
                        application.financialInfo.needIndex > 70
                          ? "#ff4d4f"
                          : "#52c41a",
                    }}
                  />
                </Col>
              </Row>
              <Progress
                percent={application.financialInfo.needIndex}
                status={
                  application.financialInfo.needIndex > 70
                    ? "exception"
                    : "active"
                }
                style={{ marginTop: 16 }}
              />
            </Card>

            <Card title="Submitted Documents" className="details-card">
              <Space direction="vertical" style={{ width: "100%" }}>
                {application.documents.map((doc, index) => (
                  <Button
                    key={index}
                    icon={<FileTextOutlined />}
                    block
                    style={{ textAlign: "left" }}
                  >
                    {doc}
                  </Button>
                ))}
              </Space>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Application Timeline" className="details-card">
              <Timeline
                items={mockApplicationTimeline.map((event) => ({
                  color:
                    event.status === "success"
                      ? "green"
                      : event.status === "error"
                        ? "red"
                        : "blue",
                  children: (
                    <>
                      <Text strong>{event.description}</Text>
                      <br />
                      <Text type="secondary">{event.date}</Text>
                    </>
                  ),
                }))}
              />
            </Card>

            <Card title="Application Score" className="details-card">
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                align="center"
              >
                <Progress
                  type="circle"
                  percent={application.score}
                  status={
                    application.score >= 80
                      ? "success"
                      : application.score >= 60
                        ? "normal"
                        : "exception"
                  }
                />
                <Text type="secondary">
                  {application.score >= 80
                    ? "Excellent candidate"
                    : application.score >= 60
                      ? "Good candidate"
                      : "Needs review"}
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

const CreateProgramModal = ({ visible, onClose, onCreateProgram }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newProgram = {
        id: `SCH${Math.floor(Math.random() * 1000)}`,
        name: values.name,
        totalFund: values.totalFund,
        allocatedFund: 0,
        remainingFund: values.totalFund,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
        status: "upcoming",
        eligibilityCriteria: {
          minGPA: values.minGPA,
          maxIncome: values.maxIncome,
          requiredDocuments: values.requiredDocuments,
        },
        currency: "USD",
        renewalRequired: values.renewalRequired,
        description: values.description,
        applicationDeadline: values.applicationDeadline.format("YYYY-MM-DD"),
      };
      onCreateProgram(newProgram);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Create New Program"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Program Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateRange"
              label="Program Duration"
              rules={[{ required: true }]}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="totalFund"
              label="Total Fund"
              rules={[{ required: true }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => (value || "").replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="minGPA"
              label="Minimum GPA"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} max={4} step={0.1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="maxIncome"
              label="Maximum Income"
              rules={[{ required: true }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => (value || "").replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="requiredDocuments" label="Required Documents">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add required documents"
          >
            <Option value="transcript">Transcript</Option>
            <Option value="recommendation">Recommendation Letter</Option>
            <Option value="financialDocs">Financial Documents</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="applicationDeadline"
          label="Application Deadline"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="renewalRequired"
          label="Renewal Required"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ExportModal = ({ visible, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState("csv");

  const handleExport = () => {
    onExport(exportFormat);
    onClose();
  };

  return (
    <Modal
      title="Export Data"
      open={visible}
      onCancel={onClose}
      onOk={handleExport}
    >
      <Form layout="vertical">
        <Form.Item label="Export Format">
          <Select value={exportFormat} onChange={setExportFormat}>
            <Option value="csv">CSV</Option>
            <Option value="excel">Excel</Option>
            <Option value="pdf">PDF</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ScholarshipManagement = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState(mockApplications);
  const [programs, setPrograms] = useState(mockPrograms);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [filters, setFilters] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createProgramModalVisible, setCreateProgramModalVisible] =
    useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form] = Form.useForm();
  const [viewApplication, setViewApplication] = useState(null);

  // Simulated API calls
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter applications based on search criteria
      let filteredApplications = [...mockApplications];
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredApplications = filteredApplications.filter(
          (app) =>
            app.applicantName.toLowerCase().includes(search) ||
            app.program.toLowerCase().includes(search)
        );
      }
      if (filters.status) {
        filteredApplications = filteredApplications.filter(
          (app) => app.status === filters.status
        );
      }
      if (filters.program) {
        filteredApplications = filteredApplications.filter(
          (app) => app.program === filters.program
        );
      }

      setApplications(filteredApplications);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      message.success(`Application ${status} successfully`);
    } catch (error) {
      message.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleProgramEdit = async (values) => {
    if (!selectedProgram) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const [startDate, endDate] = values.dateRange.map((date) =>
        date.format("YYYY-MM-DD")
      );
      const updatedProgram = {
        ...selectedProgram,
        ...values,
        startDate,
        endDate,
      };

      setPrograms((prev) =>
        prev.map((prog) =>
          prog.id === selectedProgram.id ? updatedProgram : prog
        )
      );

      message.success("Program updated successfully");
      setEditModalVisible(false);
    } catch (error) {
      message.error("Failed to update program");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProgram = (newProgram) => {
    setPrograms((prev) => [...prev, newProgram]);
    message.success("New program created successfully");
  };

  const handleExport = async (format) => {
    try {
      message.loading("Preparing export...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success(
        `Export completed successfully in ${format.toUpperCase()} format`
      );
    } catch (error) {
      message.error("Failed to export data");
    }
  };

  // Render Functions
  const renderMetrics = () => (
    <>
      <Row gutter={[4, 4]} className="mb-6">
        <Col span={6}>
          <Card style={{ height: "100px" }}>
            <Statistic
              title="Total Funds"
              value={metrics.funds.totalFunds}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#1890ff" }}
            />
            <Progress
              percent={Math.round(
                (metrics.funds.allocatedFunds / metrics.funds.totalFunds) * 100
              )}
              size="small"
              status="active"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: "100px" }}>
            <Statistic
              title="Applications"
              value={metrics.applications.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <Space size="small">
              <Badge
                status="processing"
                text={`${metrics.applications.pending} Pending`}
              />
              <Badge
                status="success"
                text={`${metrics.applications.approved} Approved`}
              />
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: "100px" }}>
            <Statistic
              title="Success Rate"
              value={Math.round(
                (metrics.applications.approved / metrics.applications.total) *
                  100
              )}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: "100px" }}>
            <Statistic
              title="Fraud Alerts"
              value={metrics.applications.fraudDetected}
              prefix={<SafetyOutlined />}
              valueStyle={{
                color:
                  metrics.applications.fraudDetected > 0
                    ? "#ff4d4f"
                    : "#52c41a",
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Fund Allocation Trends">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { month: "Jan", allocated: 40000, disbursed: 35000 },
                  { month: "Feb", allocated: 45000, disbursed: 42000 },
                  { month: "Mar", allocated: 55000, disbursed: 48000 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="allocated"
                  stroke="#1890ff"
                  fill="#1890ff"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="disbursed"
                  stroke="#52c41a"
                  fill="#52c41a"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Application Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Pending", value: metrics.applications.pending },
                    { name: "Approved", value: metrics.applications.approved },
                    { name: "Rejected", value: metrics.applications.rejected },
                    {
                      name: "Under Review",
                      value: metrics.applications.underReview,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#1890ff" />
                  <Cell fill="#52c41a" />
                  <Cell fill="#ff4d4f" />
                  <Cell fill="#faad14" />
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Recent Applications">
            <Table
              dataSource={mockApplications}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: "Applicant",
                  dataIndex: "applicantName",
                  key: "applicantName",
                  render: (text) => (
                    <Space>
                      <Avatar icon={<UserOutlined />} />
                      <Text>{text}</Text>
                    </Space>
                  ),
                },
                {
                  title: "Program",
                  dataIndex: "program",
                  key: "program",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                  key: "amount",
                  render: (amount) => `$${amount.toLocaleString()}`,
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => {
                    const colors = {
                      pending: "processing",
                      approved: "success",
                      rejected: "error",
                      under_review: "warning",
                    };
                    return (
                      <Badge
                        status={colors[status]}
                        text={status.replace("_", " ").toUpperCase()}
                      />
                    );
                  },
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (_, record) => (
                    <Space>
                      <Button icon={<EyeOutlined />} size="small" />
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        type="primary"
                      />
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Alerts & Notifications">
            <Timeline
              items={[
                {
                  color: "red",
                  dot: <WarningOutlined />,
                  children: "Fraud alert detected in application APP023",
                },
                {
                  color: "blue",
                  dot: <BellOutlined />,
                  children: "5 applications pending review for over 48 hours",
                },
                {
                  color: "green",
                  dot: <CheckCircleOutlined />,
                  children: "Fund disbursement completed for February cycle",
                },
                {
                  color: "orange",
                  dot: <ClockCircleOutlined />,
                  children: "Merit Scholarship 2024 deadline approaching",
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderApplicationsTable = () => (
    <Table
      dataSource={applications}
      rowKey="id"
      columns={[
        {
          title: "Applicant",
          key: "applicant",
          render: (record) => (
            <Space>
              <Avatar icon={<UserOutlined />} />
              <Space direction="vertical" size={0}>
                <Text strong>{record.applicantName}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Applied: {record.submittedDate}
                </Text>
              </Space>
            </Space>
          ),
        },
        {
          title: "Academic Info",
          key: "academic",
          render: (record) => (
            <Space direction="vertical" size={0}>
              <Text>GPA: {record.academicRecord.gpa}</Text>
              <Text type="secondary">{record.academicRecord.major}</Text>
            </Space>
          ),
        },
        {
          title: "Financial Need",
          key: "financial",
          render: (record) => (
            <Space direction="vertical" size={0}>
              <Progress
                percent={record.financialInfo.needIndex}
                size="small"
                status={
                  record.financialInfo.needIndex > 70 ? "exception" : "active"
                }
              />
              <Text type="secondary">
                Income: ${record.financialInfo.income.toLocaleString()}
              </Text>
            </Space>
          ),
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          render: (amount) => <Text strong>${amount.toLocaleString()}</Text>,
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status) => {
            const colors = {
              pending: "processing",
              approved: "success",
              rejected: "error",
              under_review: "warning",
            };
            return (
              <Badge
                status={colors[status]}
                text={status.replace("_", " ").toUpperCase()}
              />
            );
          },
        },
        {
          title: "Score",
          dataIndex: "score",
          key: "score",
          render: (score) => (
            <Progress
              percent={score}
              size="small"
              steps={5}
              strokeColor={
                score >= 80 ? "#52c41a" : score >= 60 ? "#faad14" : "#ff4d4f"
              }
            />
          ),
        },
        {
          title: "Actions",
          key: "actions",
          render: (record) => (
            <Space>
              <Button
                icon={<EyeOutlined />}
                onClick={() => setViewApplication(record)}
                title="View Details"
              />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "approve",
                      label: (
                        <Popconfirm
                          title="Approve this application?"
                          onConfirm={() =>
                            handleStatusChange(record.id, "approved")
                          }
                        >
                          <Space>
                            <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            Approve
                          </Space>
                        </Popconfirm>
                      ),
                    },
                    {
                      key: "reject",
                      label: (
                        <Popconfirm
                          title="Reject this application?"
                          onConfirm={() =>
                            handleStatusChange(record.id, "rejected")
                          }
                        >
                          <Space>
                            <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                            Reject
                          </Space>
                        </Popconfirm>
                      ),
                    },
                    {
                      key: "review",
                      label: (
                        <Space>
                          <InfoCircleOutlined />
                          Request More Info
                        </Space>
                      ),
                    },
                  ],
                }}
              >
                <Button>Actions</Button>
              </Dropdown>
            </Space>
          ),
        },
      ]}
    />
  );

  const renderProgramsTable = () => (
    <Table
      dataSource={programs}
      rowKey="id"
      columns={[
        {
          title: "Program",
          key: "program",
          render: (record) => (
            <Space direction="vertical" size={0}>
              <Text strong>{record.name}</Text>
              <Text type="secondary">{record.description}</Text>
            </Space>
          ),
        },
        {
          title: "Fund Allocation",
          key: "funds",
          render: (record) => (
            <Space direction="vertical" size={0}>
              <Progress
                percent={Math.round(
                  (record.allocatedFund / record.totalFund) * 100
                )}
                size="small"
              />
              <Text type="secondary">
                ${record.allocatedFund.toLocaleString()} of $
                {record.totalFund.toLocaleString()}
              </Text>
            </Space>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status) => {
            const colors = {
              active: "success",
              closed: "default",
              upcoming: "processing",
            };
            return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
          },
        },
        {
          title: "Duration",
          key: "duration",
          render: (record) => (
            <Space direction="vertical" size={0}>
              <Text>{record.startDate}</Text>
              <Text type="secondary">to {record.endDate}</Text>
            </Space>
          ),
        },
        {
          title: "Actions",
          key: "actions",
          render: (record) => (
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedProgram(record);
                  form.setFieldsValue({
                    ...record,
                    dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
                  });
                  setEditModalVisible(true);
                }}
              />
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  Modal.info({
                    title: "Program Details",
                    content: (
                      <Descriptions column={1}>
                        <Descriptions.Item label="Name">
                          {record.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                          {record.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Fund">
                          ${record.totalFund.toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Allocated Fund">
                          ${record.allocatedFund.toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Remaining Fund">
                          ${record.remainingFund.toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Date">
                          {record.startDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="End Date">
                          {record.endDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          {record.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Min GPA">
                          {record.eligibilityCriteria.minGPA}
                        </Descriptions.Item>
                        <Descriptions.Item label="Max Income">
                          $
                          {record.eligibilityCriteria.maxIncome.toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Required Documents">
                          {record.eligibilityCriteria.requiredDocuments.join(
                            ", "
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Renewal Required">
                          {record.renewalRequired ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Application Deadline">
                          {record.applicationDeadline}
                        </Descriptions.Item>
                      </Descriptions>
                    ),
                    width: 600,
                  });
                }}
              />
            </Space>
          ),
        },
      ]}
    />
  );

  return (
    <div style={{ padding: 0, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Dashboard" key="1">
            {renderMetrics()}
          </TabPane>
          <TabPane tab="Applications" key="2">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Space>
                  <Input.Search
                    placeholder="Search applications"
                    style={{ width: 300 }}
                    onSearch={(value) =>
                      setFilters((prev) => ({ ...prev, search: value }))
                    }
                    enterButton
                  />
                  <Select
                    placeholder="Filter by Program"
                    style={{ width: 200 }}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, program: value }))
                    }
                    allowClear
                  >
                    {programs.map((program) => (
                      <Option key={program.id} value={program.name}>
                        {program.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Filter by Status"
                    style={{ width: 150 }}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, status: value }))
                    }
                    allowClear
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="approved">Approved</Option>
                    <Option value="rejected">Rejected</Option>
                    <Option value="under_review">Under Review</Option>
                  </Select>
                </Space>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => setExportModalVisible(true)}
                >
                  Export
                </Button>
              </Space>
              {renderApplicationsTable()}
            </Space>
          </TabPane>
          <TabPane tab="Programs" key="3">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateProgramModalVisible(true)}
              >
                Create Program
              </Button>
              {renderProgramsTable()}
            </Space>
          </TabPane>
        </Tabs>
      </Card>

      {/* Program Edit Modal */}
      <Modal
        title="Edit Program"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleProgramEdit}>
          <Form.Item
            name="name"
            label="Program Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateRange"
                label="Program Duration"
                rules={[{ required: true }]}
              >
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalFund"
                label="Total Fund"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => (value || "").replace(/\$\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="renewalRequired"
            label="Renewal Required"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        application={viewApplication}
        visible={!!viewApplication}
        onClose={() => setViewApplication(null)}
      />

      {/* Create Program Modal */}
      <CreateProgramModal
        visible={createProgramModalVisible}
        onClose={() => setCreateProgramModalVisible(false)}
        onCreateProgram={handleCreateProgram}
      />

      {/* Export Modal */}
      <ExportModal
        visible={exportModalVisible}
        onClose={() => setExportModalVisible(false)}
        onExport={handleExport}
      />

      <style>{`
        .mb-6 {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default ScholarshipManagement;
