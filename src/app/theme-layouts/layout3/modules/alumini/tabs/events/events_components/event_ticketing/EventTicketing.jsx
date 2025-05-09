import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Table,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  DatePicker,
  Tooltip,
  message,
  Divider,
  Empty,
} from "antd";
import {
  DollarOutlined,
  TagOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  QrcodeOutlined,
  RollbackOutlined,
  MailOutlined,
  GiftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Line, Pie } from "@ant-design/plots";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Sample data for demonstration
const events = [
  {
    id: "EVT001",
    name: "Alumni Homecoming 2024",
    date: "2024-05-15",
    location: "Main Campus",
  },
  {
    id: "EVT002",
    name: "Career Fair 2024",
    date: "2024-04-01",
    location: "Conference Center",
  },
];

const ticketTypes = {
  EVT001: [
    { id: 1, name: "Standard", price: 50 },
    { id: 2, name: "VIP", price: 100 },
    { id: 3, name: "Early Bird", price: 40 },
  ],
  EVT002: [
    { id: 1, name: "Student", price: 20 },
    { id: 2, name: "Professional", price: 75 },
  ],
};

const discountCodes = {
  EVT001: [
    { id: 1, code: "ALUMNI10", discount: 10, type: "percentage" },
    { id: 2, code: "SUMMER2024", discount: 15, type: "fixed" },
  ],
  EVT002: [{ id: 1, code: "EARLYBIRD", discount: 20, type: "percentage" }],
};

const paymentTransactions = {
  EVT001: [
    {
      id: 1,
      date: "2024-03-15",
      amount: 50,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-03-16",
      amount: 100,
      method: "Mobile Money",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-03-17",
      amount: 40,
      method: "Bank Transfer",
      status: "Pending",
    },
  ],
  EVT002: [
    {
      id: 1,
      date: "2024-03-18",
      amount: 75,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-03-19",
      amount: 20,
      method: "Mobile Money",
      status: "Completed",
    },
  ],
};

const sponsorships = {
  EVT001: [
    { id: 1, sponsor: "TechCorp", amount: 5000, status: "Confirmed" },
    { id: 2, sponsor: "Local Bank", amount: 3000, status: "Pending" },
  ],
  EVT002: [
    { id: 1, sponsor: "Global Industries", amount: 7500, status: "Confirmed" },
  ],
};

const TicketingPaymentHandling = () => {
  const [selectedEvent, setSelectedEvent] = useState(null > null);
  const [isAddTicketModalVisible, setIsAddTicketModalVisible] = useState(false);
  const [isAddDiscountModalVisible, setIsAddDiscountModalVisible] =
    useState(false);
  const [isRefundModalVisible, setIsRefundModalVisible] = useState(false);
  const [isSponsorshipModalVisible, setIsSponsorshipModalVisible] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [ticketForm] = Form.useForm();
  const [discountForm] = Form.useForm();
  const [refundForm] = Form.useForm();
  const [sponsorshipForm] = Form.useForm();

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0].id);
    }
  }, []);

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
  };

  // Ticket Management
  const ticketColumns = [
    { title: "Ticket Type", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `UGX ${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditTicket(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteTicket(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAddTicket = (values) => {
    console.log("Add ticket:", values);
    message.success("Ticket added successfully");
    setIsAddTicketModalVisible(false);
    ticketForm.resetFields();
  };

  const handleEditTicket = (ticket) => {
    console.log("Edit ticket:", ticket);
    // Implement edit logic
  };

  const handleDeleteTicket = (id) => {
    console.log("Delete ticket:", id);
    // Implement delete logic
  };

  // Discount Management
  const discountColumns = [
    { title: "Code", dataIndex: "code", key: "code" },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount, record) =>
        `${discount}${record.type === "percentage" ? "%" : "UGX"}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "percentage" ? "blue" : "green"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditDiscount(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteDiscount(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleAddDiscount = (values) => {
    console.log("Add discount:", values);
    message.success("Discount code added successfully");
    setIsAddDiscountModalVisible(false);
    discountForm.resetFields();
  };

  const handleEditDiscount = (discount) => {
    console.log("Edit discount:", discount);
    // Implement edit logic
  };

  const handleDeleteDiscount = (id) => {
    console.log("Delete discount:", id);
    // Implement delete logic
  };

  // Payment Processing
  const paymentColumns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `UGX ${amount}`,
    },
    { title: "Method", dataIndex: "method", key: "method" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Issue Refund">
            <Button
              icon={<RollbackOutlined />}
              onClick={() => handleRefund(record)}
            />
          </Tooltip>
          <Tooltip title="Send Receipt">
            <Button
              icon={<MailOutlined />}
              onClick={() => handleSendReceipt(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleRefund = (transaction) => {
    setSelectedTransaction(transaction);
    setIsRefundModalVisible(true);
  };

  const handleSendReceipt = (transaction) => {
    console.log("Send receipt for:", transaction);
    message.success("Receipt sent successfully");
  };

  const processRefund = (values) => {
    console.log("Process refund:", {
      ...values,
      transaction: selectedTransaction,
    });
    message.success("Refund processed successfully");
    setIsRefundModalVisible(false);
    refundForm.resetFields();
  };

  // Sponsorship Management
  const sponsorshipColumns = [
    { title: "Sponsor", dataIndex: "sponsor", key: "sponsor" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `UGX ${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Confirmed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditSponsorship(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSponsorship(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleAddSponsorship = (values) => {
    console.log("Add sponsorship:", values);
    message.success("Sponsorship added successfully");
    setIsSponsorshipModalVisible(false);
    sponsorshipForm.resetFields();
  };

  const handleEditSponsorship = (sponsorship) => {
    console.log("Edit sponsorship:", sponsorship);
    // Implement edit logic
  };

  const handleDeleteSponsorship = (id) => {
    console.log("Delete sponsorship:", id);
    // Implement delete logic
  };

  // Charts data
  const salesData = [
    { date: "2024-03-01", sales: 1000 },
    { date: "2024-03-02", sales: 1500 },
    { date: "2024-03-03", sales: 2000 },
    { date: "2024-03-04", sales: 1800 },
    { date: "2024-03-05", sales: 2200 },
  ];

  const revenueByTicketType = [
    { type: "Standard", value: 5000 },
    { type: "VIP", value: 8000 },
    { type: "Early Bird", value: 3000 },
  ];

  const salesConfig = {
    data: salesData,
    xField: "date",
    yField: "sales",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const revenueConfig = {
    data: revenueByTicketType,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;
    const event = events.find((e) => e.id === selectedEvent);
    if (!event) return null;

    return (
      <Space split={<Divider type="vertical" />}>
        <Text>
          <CalendarOutlined /> {event.date}
        </Text>
        <Text>
          <EnvironmentOutlined /> {event.location}
        </Text>
      </Space>
    );
  };

  return (
    <div style={{ padding: "5px" }}>
      <Card>
        <Row gutter={16} align="middle" style={{ marginBottom: "24px" }}>
          <Col span={12}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select an event"
              onChange={handleEventChange}
              value={selectedEvent}
            >
              {events.map((event) => (
                <Select.Option key={event.id} value={event.id}>
                  {event.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>{renderEventDetails()}</Col>
        </Row>

        {selectedEvent ? (
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <TagOutlined />
                  &nbsp;Ticket Management
                </span>
              }
              key="1"
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddTicketModalVisible(true)}
                >
                  Add Ticket Type
                </Button>
                <Table
                  size="small"
                  columns={ticketColumns}
                  dataSource={selectedEvent ? ticketTypes[selectedEvent] : []}
                  rowKey="id"
                />
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <GiftOutlined />
                  &nbsp;Discounts & Promotions
                </span>
              }
              key="2"
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddDiscountModalVisible(true)}
                >
                  Add Discount Code
                </Button>
                <Table
                  size="small"
                  columns={discountColumns}
                  dataSource={discountCodes[selectedEvent]}
                  rowKey="id"
                />
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CreditCardOutlined />
                  &nbsp;Payment Processing
                </span>
              }
              key="3"
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Row gutter={[4, 4]}>
                  <Col span={8}>
                    <Card style={{ borderColor: "#3f8600" }}>
                      <Statistic
                        title="Total Revenue"
                        value={15000}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<DollarOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderColor: "#1890ff" }}>
                      <Statistic
                        title="Tickets Sold"
                        value={250}
                        valueStyle={{ color: "#1890ff" }}
                        prefix={<QrcodeOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderColor: "#cf1322" }}>
                      <Statistic
                        title="Refunds Issued"
                        value={5}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<RollbackOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>
                <Table
                  size="small"
                  columns={paymentColumns}
                  dataSource={paymentTransactions[selectedEvent]}
                  rowKey="id"
                />
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BarChartOutlined />
                  &nbsp;Financial Overview
                </span>
              }
              key="4"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Daily Sales">
                    <Line {...salesConfig} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Revenue by Ticket Type">
                    <Pie {...revenueConfig} />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <GiftOutlined />
                  &nbsp;Sponsorships
                </span>
              }
              key="5"
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsSponsorshipModalVisible(true)}
                >
                  Add Sponsorship
                </Button>
                <Table
                  size="small"
                  columns={sponsorshipColumns}
                  dataSource={sponsorships[selectedEvent]}
                  rowKey="id"
                />
              </Space>
            </TabPane>
          </Tabs>
        ) : (
          <Empty description="Please select an event to manage ticketing and payments" />
        )}
      </Card>

      {/* Add Ticket Modal */}
      <Modal
        title="Add Ticket Type"
        visible={isAddTicketModalVisible}
        onCancel={() => setIsAddTicketModalVisible(false)}
        footer={null}
      >
        <Form form={ticketForm} layout="vertical" onFinish={handleAddTicket}>
          <Form.Item
            name="name"
            label="Ticket Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber prefix="UGX" min={0} step={0.01} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Ticket
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Discount Modal */}
      <Modal
        title="Add Discount Code"
        visible={isAddDiscountModalVisible}
        onCancel={() => setIsAddDiscountModalVisible(false)}
        footer={null}
      >
        <Form
          form={discountForm}
          layout="vertical"
          onFinish={handleAddDiscount}
        >
          <Form.Item
            name="code"
            label="Discount Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount Amount"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Discount Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="percentage">Percentage</Select.Option>
              <Select.Option value="fixed">Fixed Amount</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Discount
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Refund Modal */}
      <Modal
        title="Process Refund"
        visible={isRefundModalVisible}
        onCancel={() => setIsRefundModalVisible(false)}
        footer={null}
      >
        <Form form={refundForm} layout="vertical" onFinish={processRefund}>
          <Form.Item
            name="amount"
            label="Refund Amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              prefix="UGX"
              min={0}
              max={selectedTransaction?.amount}
              step={0.01}
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Refund Reason"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Process Refund
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Sponsorship Modal */}
      <Modal
        title="Add Sponsorship"
        visible={isSponsorshipModalVisible}
        onCancel={() => setIsSponsorshipModalVisible(false)}
        footer={null}
      >
        <Form
          form={sponsorshipForm}
          layout="vertical"
          onFinish={handleAddSponsorship}
        >
          <Form.Item
            name="sponsor"
            label="Sponsor Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Sponsorship Amount"
            rules={[{ required: true }]}
          >
            <InputNumber prefix="UGX" min={0} step={0.01} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Confirmed">Confirmed</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Sponsorship
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TicketingPaymentHandling;
