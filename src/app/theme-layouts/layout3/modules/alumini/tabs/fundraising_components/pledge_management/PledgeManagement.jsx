import React, { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Table,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Typography,
  Avatar,
  Tooltip,
  Badge,
  Divider,
  Alert,
  Progress,
  message,
  Empty,
} from "antd";
import {
  DollarSign,
  Calendar,
  Bell,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Gift,
  CreditCard,
  Briefcase,
  Award,
  Heart,
  Plus,
  Send,
  Save,
} from "lucide-react";
import dayjs from "dayjs";

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Sample pledge data
const initialPledges = [
  {
    id: "1",
    donor: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      type: "Alumni",
      class: "2015",
    },
    amount: 5000,
    paidAmount: 2000,
    remainingAmount: 3000,
    startDate: "2024-01-15",
    dueDate: "2024-06-15",
    frequency: "Monthly",
    status: "In Progress",
    category: "Scholarship Fund",
    paymentMethod: "Credit Card",
    lastPayment: "2024-02-15",
    nextPayment: "2024-03-15",
    notes: "Dedicated to supporting STEM scholarships",
    reminders: [
      { date: "2024-02-01", type: "Email", status: "Sent" },
      { date: "2024-02-15", type: "Phone", status: "Completed" },
    ],
  },
  {
    id: "2",
    donor: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      type: "Corporate",
      company: "Tech Solutions Inc.",
    },
    amount: 25000,
    paidAmount: 25000,
    remainingAmount: 0,
    startDate: "2024-01-01",
    dueDate: "2024-12-31",
    frequency: "One-time",
    status: "Completed",
    category: "Building Fund",
    paymentMethod: "Bank Transfer",
    lastPayment: "2024-01-15",
    nextPayment: null,
    notes: "Corporate matching gift program",
    reminders: [{ date: "2024-01-05", type: "Email", status: "Sent" }],
  },
  {
    id: "3",
    donor: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      type: "Alumni",
      class: "1990",
    },
    amount: 10000,
    paidAmount: 0,
    remainingAmount: 10000,
    startDate: "2024-03-01",
    dueDate: "2024-07-01",
    frequency: "Quarterly",
    status: "Pending",
    category: "Athletics Program",
    paymentMethod: "Direct Debit",
    lastPayment: null,
    nextPayment: "2024-03-01",
    notes: "Former varsity athlete, interested in sports development",
    reminders: [],
  },
];

function App() {
  const [pledges, setPledges] = useState(initialPledges);
  const [selectedPledge, setSelectedPledge] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewPledgeModalVisible, setIsNewPledgeModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [reminderForm] = Form.useForm();
  const [newPledgeForm] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  // Calculate summary statistics
  const totalPledged = pledges.reduce((sum, pledge) => sum + pledge.amount, 0);
  const totalCollected = pledges.reduce(
    (sum, pledge) => sum + pledge.paidAmount,
    0
  );
  const totalPending = pledges.reduce(
    (sum, pledge) => sum + pledge.remainingAmount,
    0
  );
  const completionRate = (totalCollected / totalPledged) * 100;

  const handleViewPledge = (pledge) => {
    setSelectedPledge(pledge);
    setIsModalVisible(true);
  };

  const handleNewPledge = () => {
    setIsNewPledgeModalVisible(true);
    newPledgeForm.resetFields();
  };

  const handleCreatePledge = (values) => {
    const newPledge = {
      id: (pledges.length + 1).toString(),
      donor: {
        name: values.donorName,
        email: values.email,
        phone: values.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.donorName}`,
        type: values.donorType,
        class: values.graduationYear,
      },
      amount: values.amount,
      paidAmount: 0,
      remainingAmount: values.amount,
      startDate: values.startDate.format("YYYY-MM-DD"),
      dueDate: values.dueDate.format("YYYY-MM-DD"),
      frequency: values.frequency,
      status: "Pending",
      category: values.category,
      paymentMethod: values.paymentMethod,
      lastPayment: null,
      nextPayment: values.startDate.format("YYYY-MM-DD"),
      notes: values.notes,
      reminders: [],
    };

    setPledges([...pledges, newPledge]);
    setIsNewPledgeModalVisible(false);
    message.success("New pledge created successfully");
  };

  const handleRecordPayment = (pledge) => {
    setSelectedPledge(pledge);
    setIsPaymentModalVisible(true);
    paymentForm.resetFields();
  };

  const handlePaymentSubmit = (values) => {
    const updatedPledges = pledges.map((pledge) => {
      if (pledge.id === selectedPledge.id) {
        const newPaidAmount = pledge.paidAmount + values.amount;
        const newRemainingAmount = pledge.amount - newPaidAmount;
        const newStatus =
          newPaidAmount >= pledge.amount ? "Completed" : "In Progress";

        return {
          ...pledge,
          paidAmount: newPaidAmount,
          remainingAmount: newRemainingAmount,
          status: newStatus,
          lastPayment: values.paymentDate.format("YYYY-MM-DD"),
          nextPayment:
            newStatus === "Completed"
              ? null
              : dayjs(values.paymentDate).add(1, "month").format("YYYY-MM-DD"),
        };
      }
      return pledge;
    });

    setPledges(updatedPledges);
    setIsPaymentModalVisible(false);
    message.success("Payment recorded successfully");
  };

  const handleSendReminder = (pledge) => {
    setSelectedPledge(pledge);
    setIsReminderModalVisible(true);
    reminderForm.resetFields();
  };

  const handleReminderSubmit = (values) => {
    const newReminder = {
      date: values.reminderDate.format("YYYY-MM-DD"),
      type: values.reminderType,
      status: "Sent",
    };

    const updatedPledges = pledges.map((pledge) => {
      if (pledge.id === selectedPledge.id) {
        return {
          ...pledge,
          reminders: [...pledge.reminders, newReminder],
        };
      }
      return pledge;
    });

    setPledges(updatedPledges);
    setIsReminderModalVisible(false);
    message.success("Reminder sent successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "blue";
      case "Pending":
        return "gold";
      case "Overdue":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} />;
      case "In Progress":
        return <Clock size={16} />;
      case "Pending":
        return <AlertCircle size={16} />;
      case "Overdue":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const columns = [
    {
      title: "Donor",
      key: "donor",
      render: (record) => (
        <Space>
          <Avatar src={record.donor.avatar} size={40} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.donor.name}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.donor.type}{" "}
              {record.donor.class && `(Class of ${record.donor.class})`}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Pledge Details",
      key: "pledgeDetails",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text strong>UGX{record.amount.toLocaleString()}</Text>
          <Text type="secondary">{record.category}</Text>
          <Tag color="blue">{record.frequency}</Tag>
        </Space>
      ),
    },
    {
      title: "Progress",
      key: "progress",
      render: (record) => (
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <Progress
            percent={Math.round((record.paidAmount / record.amount) * 100)}
            size="small"
            status={record.status === "Completed" ? "success" : "active"}
          />
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">
              Paid: UGX{record.paidAmount.toLocaleString()}
            </Text>
            <Text type="secondary">
              Remaining: UGX{record.remainingAmount.toLocaleString()}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Dates",
      key: "dates",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text>Due: {record.dueDate}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Started: {record.startDate}
          </Text>
          {record.nextPayment && (
            <Tag color="gold">Next Payment: {record.nextPayment}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag
          color={getStatusColor(record.status)}
          //   icon={getStatusIcon(record.status)}
        >
          {record.status.toUpperCase()}
        </Tag>
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
              icon={<FileText size={16} />}
              onClick={() => handleViewPledge(record)}
            />
          </Tooltip>
          <Tooltip title="Send Reminder">
            <Button
              type="text"
              icon={<Bell size={16} />}
              onClick={() => handleSendReminder(record)}
              disabled={record.status === "Completed"}
            />
          </Tooltip>
          <Tooltip title="Record Payment">
            <Button
              type="text"
              icon={<DollarSign size={16} />}
              onClick={() => handleRecordPayment(record)}
              disabled={record.status === "Completed"}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Layout style={{ padding: "24px" }}>
          <Content>
            <Row gutter={[16, 24]}>
              {/* Summary Statistics */}
              <Col span={6}>
                <Card className="stats-card">
                  <Statistic
                    title={
                      <Space>
                        <Gift size={16} />
                        Total Pledged
                      </Space>
                    }
                    value={totalPledged}
                    prefix="UGX"
                    valueStyle={{ color: "#2563eb" }}
                  />
                  <Text type="secondary">Across all commitments</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stats-card">
                  <Statistic
                    title={
                      <Space>
                        <DollarSign size={16} />
                        Total Collected
                      </Space>
                    }
                    value={totalCollected}
                    prefix="UGX"
                    valueStyle={{ color: "#059669" }}
                  />
                  <Text type="secondary">Successfully received</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stats-card">
                  <Statistic
                    title={
                      <Space>
                        <Clock size={16} />
                        Pending Amount
                      </Space>
                    }
                    value={totalPending}
                    prefix="UGX"
                    valueStyle={{ color: "#d97706" }}
                  />
                  <Text type="secondary">Yet to be collected</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stats-card">
                  <Statistic
                    title={
                      <Space>
                        <TrendingUp size={16} />
                        Completion Rate
                      </Space>
                    }
                    value={completionRate}
                    suffix="%"
                    precision={1}
                    valueStyle={{ color: "#7c3aed" }}
                  />
                  <Progress
                    percent={completionRate}
                    showInfo={false}
                    size="small"
                  />
                </Card>
              </Col>

              {/* Main Content */}
              <Col span={24}>
                <Card
                  title={
                    <Space size="middle">
                      <Title level={4} style={{ margin: 0 }}>
                        Pledge Commitments
                      </Title>
                      <Tag color="blue">{pledges.length} Active Pledges</Tag>
                    </Space>
                  }
                  extra={
                    <Space>
                      <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={(value) => setFilterStatus(value)}
                      >
                        <Select.Option value="all">All Status</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="in-progress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                      <Button
                        type="primary"
                        icon={<Plus size={16} />}
                        onClick={handleNewPledge}
                      >
                        New Pledge
                      </Button>
                    </Space>
                  }
                >
                  <Table
                    columns={columns}
                    dataSource={pledges}
                    rowKey="id"
                    pagination={{
                      total: pledges.length,
                      pageSize: 10,
                      showTotal: (total) => `Total ${total} pledges`,
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* New Pledge Modal */}
            <Modal
              title={
                <Space>
                  <Plus size={16} />
                  Create New Pledge
                </Space>
              }
              open={isNewPledgeModalVisible}
              onCancel={() => setIsNewPledgeModalVisible(false)}
              footer={null}
              width={800}
            >
              <Form
                form={newPledgeForm}
                layout="vertical"
                onFinish={handleCreatePledge}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="donorName"
                      label="Donor Name"
                      rules={[
                        { required: true, message: "Please enter donor name" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="donorType"
                      label="Donor Type"
                      rules={[
                        { required: true, message: "Please select donor type" },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Alumni">Alumni</Select.Option>
                        <Select.Option value="Corporate">
                          Corporate
                        </Select.Option>
                        <Select.Option value="Individual">
                          Individual
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="amount"
                      label="Pledge Amount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter pledge amount",
                        },
                      ]}
                    >
                      <InputNumber
                        prefix="UGX"
                        style={{ width: "100%" }}
                        min={1}
                        step={100}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="frequency"
                      label="Payment Frequency"
                      rules={[
                        { required: true, message: "Please select frequency" },
                      ]}
                    >
                      <Select>
                        <Select.Option value="One-time">One-time</Select.Option>
                        <Select.Option value="Monthly">Monthly</Select.Option>
                        <Select.Option value="Quarterly">
                          Quarterly
                        </Select.Option>
                        <Select.Option value="Annually">Annually</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="startDate"
                      label="Start Date"
                      rules={[
                        { required: true, message: "Please select start date" },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="dueDate"
                      label="Due Date"
                      rules={[
                        { required: true, message: "Please select due date" },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        { required: true, message: "Please select category" },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Scholarship Fund">
                          Scholarship Fund
                        </Select.Option>
                        <Select.Option value="Building Fund">
                          Building Fund
                        </Select.Option>
                        <Select.Option value="Athletics Program">
                          Athletics Program
                        </Select.Option>
                        <Select.Option value="Research Grant">
                          Research Grant
                        </Select.Option>
                        <Select.Option value="General Fund">
                          General Fund
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="paymentMethod"
                      label="Payment Method"
                      rules={[
                        {
                          required: true,
                          message: "Please select payment method",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Credit Card">
                          Credit Card
                        </Select.Option>
                        <Select.Option value="Bank Transfer">
                          Bank Transfer
                        </Select.Option>
                        <Select.Option value="Direct Debit">
                          Direct Debit
                        </Select.Option>
                        <Select.Option value="Check">Check</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="notes" label="Notes">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<Save size={16} />}
                    >
                      Create Pledge
                    </Button>
                    <Button onClick={() => setIsNewPledgeModalVisible(false)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            {/* Payment Modal */}
            <Modal
              title={
                <Space>
                  <DollarSign size={16} />
                  Record Payment
                </Space>
              }
              open={isPaymentModalVisible}
              onCancel={() => setIsPaymentModalVisible(false)}
              footer={null}
            >
              <Form
                form={paymentForm}
                layout="vertical"
                onFinish={handlePaymentSubmit}
              >
                <Form.Item
                  name="amount"
                  label="Payment Amount"
                  rules={[
                    { required: true, message: "Please enter payment amount" },
                  ]}
                >
                  <InputNumber
                    prefix="UGX"
                    style={{ width: "100%" }}
                    min={1}
                    max={selectedPledge?.remainingAmount}
                  />
                </Form.Item>

                <Form.Item
                  name="paymentDate"
                  label="Payment Date"
                  rules={[
                    { required: true, message: "Please select payment date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="notes" label="Payment Notes">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<Save size={16} />}
                    >
                      Record Payment
                    </Button>
                    <Button onClick={() => setIsPaymentModalVisible(false)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            {/* Reminder Modal */}
            <Modal
              title={
                <Space>
                  <Bell size={16} />
                  Send Reminder
                </Space>
              }
              open={isReminderModalVisible}
              onCancel={() => setIsReminderModalVisible(false)}
              footer={null}
            >
              <Form
                form={reminderForm}
                layout="vertical"
                onFinish={handleReminderSubmit}
              >
                <Form.Item
                  name="reminderType"
                  label="Reminder Type"
                  rules={[
                    { required: true, message: "Please select reminder type" },
                  ]}
                >
                  <Select>
                    <Select.Option value="Email">Email</Select.Option>
                    <Select.Option value="Phone">Phone Call</Select.Option>
                    <Select.Option value="SMS">SMS</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="reminderDate"
                  label="Reminder Date"
                  rules={[
                    { required: true, message: "Please select reminder date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Reminder Message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter reminder message",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<Send size={16} />}
                    >
                      Send Reminder
                    </Button>
                    <Button onClick={() => setIsReminderModalVisible(false)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            {/* Pledge Details Modal */}
            <Modal
              title={null}
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
              width={800}
            >
              {selectedPledge && (
                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "32px",
                      background: "#f0f2f5",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <Row gutter={24} align="middle">
                      <Col>
                        <Avatar size={80} src={selectedPledge.donor.avatar} />
                      </Col>
                      <Col flex="1">
                        <Space direction="vertical" size={4}>
                          <Title level={3} style={{ margin: 0 }}>
                            {selectedPledge.donor.name}
                          </Title>
                          <Space split={<Divider type="vertical" />}>
                            <Text>{selectedPledge.donor.email}</Text>
                            <Text>{selectedPledge.donor.phone}</Text>
                          </Space>
                        </Space>
                      </Col>
                      <Col>
                        <Tag
                          color={getStatusColor(selectedPledge.status)}
                          style={{ padding: "8px 16px" }}
                        >
                          {selectedPledge.status.toUpperCase()}
                        </Tag>
                      </Col>
                    </Row>
                  </div>

                  <div style={{ padding: "32px" }}>
                    <Row gutter={[24, 24]}>
                      <Col span={24}>
                        <Card title="Pledge Details" bordered={false}>
                          <Row gutter={48}>
                            <Col span={12}>
                              <Space direction="vertical" size={16}>
                                <Statistic
                                  title="Total Amount Pledged"
                                  value={selectedPledge.amount}
                                  prefix="UGX"
                                />
                                <Statistic
                                  title="Amount Paid"
                                  value={selectedPledge.paidAmount}
                                  prefix="UGX"
                                  valueStyle={{ color: "#059669" }}
                                />
                              </Space>
                            </Col>
                            <Col span={12}>
                              <Space direction="vertical" size={16}>
                                <Statistic
                                  title="Remaining Amount"
                                  value={selectedPledge.remainingAmount}
                                  prefix="UGX"
                                  valueStyle={{ color: "#d97706" }}
                                />
                                <Progress
                                  percent={Math.round(
                                    (selectedPledge.paidAmount /
                                      selectedPledge.amount) *
                                      100
                                  )}
                                  status={
                                    selectedPledge.status === "Completed"
                                      ? "success"
                                      : "active"
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
                        </Card>
                      </Col>

                      <Col span={12}>
                        <Card title="Payment Information" bordered={false}>
                          <Space direction="vertical" size={16}>
                            <div>
                              <Text type="secondary">Payment Method</Text>
                              <div>
                                <Text strong>
                                  {selectedPledge.paymentMethod}
                                </Text>
                              </div>
                            </div>
                            <div>
                              <Text type="secondary">Payment Frequency</Text>
                              <div>
                                <Text strong>{selectedPledge.frequency}</Text>{" "}
                              </div>
                            </div>
                            {selectedPledge.nextPayment && (
                              <div>
                                <Text type="secondary">Next Payment Due</Text>
                                <div>
                                  <Text strong>
                                    {selectedPledge.nextPayment}
                                  </Text>
                                </div>
                              </div>
                            )}
                          </Space>
                        </Card>
                      </Col>

                      <Col span={12}>
                        <Card title="Reminder History" bordered={false}>
                          {selectedPledge.reminders.length > 0 ? (
                            <Space
                              direction="vertical"
                              style={{ width: "100%" }}
                            >
                              {selectedPledge.reminders.map(
                                (reminder, index) => (
                                  <div key={index}>
                                    <Space>
                                      <Tag color="blue">{reminder.type}</Tag>
                                      <Text>{reminder.date}</Text>
                                      <Tag color="green">{reminder.status}</Tag>
                                    </Space>
                                  </div>
                                )
                              )}
                            </Space>
                          ) : (
                            <Empty description="No reminders sent" />
                          )}
                        </Card>
                      </Col>

                      {selectedPledge.notes && (
                        <Col span={24}>
                          <Card title="Notes" bordered={false}>
                            <Text>{selectedPledge.notes}</Text>
                          </Card>
                        </Col>
                      )}
                    </Row>
                  </div>

                  <div
                    style={{
                      padding: "24px 32px",
                      background: "#ffffff",
                      borderTop: "1px solid #e5e7eb",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <Button onClick={() => setIsModalVisible(false)}>
                      Close
                    </Button>
                    <Button
                      icon={<Bell size={16} />}
                      onClick={() => {
                        setIsModalVisible(false);
                        handleSendReminder(selectedPledge);
                      }}
                      disabled={selectedPledge.status === "Completed"}
                    >
                      Send Reminder
                    </Button>
                    <Button
                      type="primary"
                      icon={<DollarSign size={16} />}
                      onClick={() => {
                        setIsModalVisible(false);
                        handleRecordPayment(selectedPledge);
                      }}
                      disabled={selectedPledge.status === "Completed"}
                    >
                      Record Payment
                    </Button>
                  </div>
                </div>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
