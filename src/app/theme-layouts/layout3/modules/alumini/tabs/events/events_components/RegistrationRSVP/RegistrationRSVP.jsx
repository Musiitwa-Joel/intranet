import React from "react";
import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip,
  message,
  Tabs,
  Timeline,
  Avatar,
  Divider,
  QRCode,
  List,
  Empty,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  MailOutlined,
  QrcodeOutlined,
  CalendarOutlined,
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Area, Column, Pie } from "@ant-design/plots";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Sample events data
const events = [
  {
    id: "EVT001",
    name: "Alumni Homecoming 2024",
    date: "2024-05-15",
    location: "Main Campus",
    capacity: 500,
    registeredCount: 268,
    status: "upcoming",
  },
  {
    id: "EVT002",
    name: "Career Fair 2024",
    date: "2024-04-01",
    location: "Conference Center",
    capacity: 300,
    registeredCount: 145,
    status: "upcoming",
  },
];

// Sample data for registrations
const initialRegistrations = [
  {
    id: "REG001",
    eventId: "EVT001",
    eventName: "Alumni Homecoming 2024",
    attendee: {
      id: "ALM001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 234-567-8900",
      graduationYear: "2015",
      verified: true,
    },
    registrationDate: "2024-03-15",
    status: "confirmed", // confirmed, pending, waitlisted, cancelled, checked-in
    guests: 2,
    qrCode: "REG001-QR",
    specialRequests: {
      dietary: "Vegetarian",
      accessibility: "Wheelchair Access",
      accommodation: "None",
    },
    checkInTime: null,
    notes: "VIP Alumni",
    groupMembers: [
      {
        name: "Sarah Smith",
        email: "sarah.smith@example.com",
        relationship: "Spouse",
      },
      {
        name: "Tommy Smith",
        email: "tommy.smith@example.com",
        relationship: "Child",
      },
    ],
    communications: [
      {
        type: "confirmation",
        date: "2024-03-15",
        status: "sent",
      },
      {
        type: "reminder",
        date: "2024-03-20",
        status: "scheduled",
      },
    ],
  },
  {
    id: "REG002",
    eventId: "EVT001",
    eventName: "Alumni Homecoming 2024",
    attendee: {
      id: "ALM002",
      name: "Jane Wilson",
      email: "jane.wilson@example.com",
      phone: "+1 234-567-8901",
      graduationYear: "2018",
      verified: true,
    },
    registrationDate: "2024-03-16",
    status: "waitlisted",
    guests: 1,
    qrCode: "REG002-QR",
    specialRequests: {
      dietary: "Gluten-Free",
      accessibility: "None",
      accommodation: "Hotel Booking Required",
    },
    checkInTime: null,
    notes: "",
    groupMembers: [
      {
        name: "Mike Wilson",
        email: "mike.wilson@example.com",
        relationship: "Spouse",
      },
    ],
    communications: [
      {
        type: "waitlist",
        date: "2024-03-16",
        status: "sent",
      },
    ],
  },
];

const EventRegistrationManagement = () => {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [isSendEmailModalVisible, setIsSendEmailModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const confirmedRegistrations = registrations.filter(
    (r) => r.status === "confirmed"
  ).length;
  const waitlistedRegistrations = registrations.filter(
    (r) => r.status === "waitlisted"
  ).length;
  const checkedInRegistrations = registrations.filter(
    (r) => r.status === "checked-in"
  ).length;

  // Analytics data
  const registrationTrends = [
    { date: "2024-01", registrations: 45 },
    { date: "2024-02", registrations: 78 },
    { date: "2024-03", registrations: 123 },
    { date: "2024-04", registrations: 168 },
    { date: "2024-05", registrations: 245 },
  ];

  const statusDistribution = [
    { status: "Confirmed", value: confirmedRegistrations },
    { status: "Waitlisted", value: waitlistedRegistrations },
    { status: "Checked In", value: checkedInRegistrations },
  ];

  const dailyRegistrations = [
    { date: "2024-03-10", count: 12 },
    { date: "2024-03-11", count: 15 },
    { date: "2024-03-12", count: 18 },
    { date: "2024-03-13", count: 22 },
    { date: "2024-03-14", count: 25 },
    { date: "2024-03-15", count: 30 },
  ];

  // Chart configurations
  const areaConfig = {
    data: registrationTrends,
    xField: "date",
    yField: "registrations",
    smooth: true,
    areaStyle: {
      fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
    },
  };

  const pieConfig = {
    data: statusDistribution,
    angleField: "value",
    colorField: "status",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [{ type: "element-active" }],
  };

  const columnConfig = {
    data: dailyRegistrations,
    xField: "date",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  const handleStatusChange = (registration, newStatus) => {
    const updatedRegistrations = registrations.map((r) => {
      if (r.id === registration.id) {
        return {
          ...r,
          status: newStatus,
          ...(newStatus === "checked-in"
            ? { checkInTime: new Date().toISOString() }
            : {}),
        };
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    message.success(`Registration status updated to ${newStatus}`);
  };

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
    setIsDetailsModalVisible(true);
  };

  const handleAddRegistration = (values) => {
    const newRegistration = {
      id: `REG${String(registrations.length + 1).padStart(3, "0")}`,
      eventId: "EVT001",
      eventName: "Alumni Homecoming 2024",
      attendee: {
        id: values.alumniId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        graduationYear: values.graduationYear,
        verified: true,
      },
      registrationDate: new Date().toISOString().split("T")[0],
      status: "confirmed",
      guests: values.guests || 0,
      qrCode: `REG${String(registrations.length + 1).padStart(3, "0")}-QR`,
      specialRequests: {
        dietary: values.dietary || "None",
        accessibility: values.accessibility || "None",
        accommodation: values.accommodation || "None",
      },
      checkInTime: null,
      notes: values.notes || "",
      groupMembers: [],
      communications: [
        {
          type: "confirmation",
          date: new Date().toISOString().split("T")[0],
          status: "sent",
        },
      ],
    };

    setRegistrations([...registrations, newRegistration]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success("Registration added successfully");
  };

  const handleEditRegistration = (values) => {
    const updatedRegistrations = registrations.map((r) => {
      if (r.id === selectedRegistration.id) {
        return {
          ...r,
          attendee: {
            ...r.attendee,
            name: values.name,
            email: values.email,
            phone: values.phone,
            graduationYear: values.graduationYear,
          },
          guests: values.guests,
          specialRequests: {
            dietary: values.dietary,
            accessibility: values.accessibility,
            accommodation: values.accommodation,
          },
          notes: values.notes,
        };
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    setIsEditModalVisible(false);
    message.success("Registration updated successfully");
  };

  const handleSendEmail = (values) => {
    if (!selectedRegistration) return;

    const updatedRegistrations = registrations.map((r) => {
      if (r.id === selectedRegistration.id) {
        return {
          ...r,
          communications: [
            ...r.communications,
            {
              type: values.type,
              date: new Date().toISOString().split("T")[0],
              status: "sent",
            },
          ],
        };
      }
      return r;
    });

    setRegistrations(updatedRegistrations);
    setIsSendEmailModalVisible(false);
    emailForm.resetFields();
    message.success("Email sent successfully");
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "success",
      pending: "warning",
      waitlisted: "orange",
      cancelled: "error",
      "checked-in": "blue",
    };
    return colors[status] || "default";
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: <CheckCircleOutlined />,
      pending: <ClockCircleOutlined />,
      waitlisted: <ExclamationCircleOutlined />,
      cancelled: <CloseCircleOutlined />,
      "checked-in": <CheckCircleOutlined />,
    };
    return icons[status] || <InfoCircleOutlined />;
  };

  const columns = [
    {
      title: "Attendee",
      key: "attendee",
      render: (record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.attendee.name}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.attendee.email}
            </Text>
            <Tag style={{ marginTop: 4 }}>
              Class of {record.attendee.graduationYear}
            </Tag>
          </Space>
        </Space>
      ),
    },
    {
      title: "Registration Details",
      key: "details",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.eventName}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Registered: {record.registrationDate}
          </Text>
          <Space style={{ marginTop: 4 }}>
            <Tag icon={<TeamOutlined />}>{record.guests} Guests</Tag>
            {record.specialRequests.dietary !== "None" && (
              <Tag color="purple">{record.specialRequests.dietary}</Tag>
            )}
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Tag
            color={getStatusColor(record.status)}
            icon={getStatusIcon(record.status)}
          >
            {record.status.toUpperCase()}
          </Tag>
          {record.checkInTime && (
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Checked in: {record.checkInTime}
            </Text>
          )}
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
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Show QR Code">
            <Button
              type="text"
              icon={<QrcodeOutlined />}
              onClick={() => {
                setSelectedRegistration(record);
                setIsQRModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Send Email">
            <Button
              type="text"
              icon={<MailOutlined />}
              onClick={() => {
                setSelectedRegistration(record);
                setIsSendEmailModalVisible(true);
              }}
            />
          </Tooltip>
          {record.status !== "checked-in" && (
            <Tooltip title="Check In">
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => handleStatusChange(record, "checked-in")}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Event Selection */}
      <Card>
        <Row gutter={24} align="middle">
          <Col span={8}>
            <Form.Item label="Select Event" style={{ marginBottom: 0 }}>
              <Select
                placeholder="Choose an event"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setSelectedEvent(events.find((e) => e.id === value))
                }
                value={selectedEvent?.id}
              >
                {events.map((event) => (
                  <Select.Option key={event.id} value={event.id}>
                    {event.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            {selectedEvent && (
              <Space split={<Divider type="vertical" />}>
                <Text>
                  <CalendarOutlined /> {selectedEvent.date}
                </Text>
                <Text>
                  <EnvironmentOutlined /> {selectedEvent.location}
                </Text>
                <Text>
                  <TeamOutlined /> {selectedEvent.registeredCount}/
                  {selectedEvent.capacity} Registered
                </Text>
                <Tag color="blue">{selectedEvent.status.toUpperCase()}</Tag>
              </Space>
            )}
          </Col>
        </Row>
      </Card>

      {selectedEvent ? (
        <>
          {/* Quick Stats */}
          <Row gutter={[4, 4]}>
            <Col span={6}>
              <Card style={{ borderColor: "#1890ff" }}>
                <Statistic
                  title={
                    <Space>
                      <TeamOutlined />
                      <Text strong>Registration Rate</Text>
                    </Space>
                  }
                  value={Math.round(
                    (selectedEvent.registeredCount / selectedEvent.capacity) *
                      100
                  )}
                  suffix="%"
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderColor: "#52c41a" }}>
                <Statistic
                  title={
                    <Space>
                      <CheckCircleOutlined />
                      <Text strong>Spots Available</Text>
                    </Space>
                  }
                  value={selectedEvent.capacity - selectedEvent.registeredCount}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderColor: "#722ed1" }}>
                <Statistic
                  title={
                    <Space>
                      <UserOutlined />
                      <Text strong>Average Group Size</Text>
                    </Space>
                  }
                  value={2.3}
                  precision={1}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderColor: "#fa8c16" }}>
                <Statistic
                  title={
                    <Space>
                      <ClockCircleOutlined />
                      <Text strong>Days Until Event</Text>
                    </Space>
                  }
                  value={15}
                  valueStyle={{ color: "#fa8c16" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Analytics Charts */}
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Registration Trends">
                <Area {...areaConfig} height={300} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Registration Status">
                <Pie {...pieConfig} height={300} />
              </Card>
            </Col>
          </Row>

          <Card title="Daily Registration Activity">
            <Column {...columnConfig} height={300} />
          </Card>
        </>
      ) : (
        <Empty
          description="Please select an event to view dashboard"
          style={{ padding: "48px 0" }}
        />
      )}
    </div>
  );

  const handleBulkAction = (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select registrations to perform bulk action");
      return;
    }

    let updatedRegistrations = [...registrations];
    switch (action) {
      case "confirm":
        updatedRegistrations = updatedRegistrations.map((r) =>
          selectedRowKeys.includes(r.id) ? { ...r, status: "confirmed" } : r
        );
        break;
      case "cancel":
        updatedRegistrations = updatedRegistrations.map((r) =>
          selectedRowKeys.includes(r.id) ? { ...r, status: "cancelled" } : r
        );
        break;
      case "delete":
        updatedRegistrations = updatedRegistrations.filter(
          (r) => !selectedRowKeys.includes(r.id)
        );
        break;
      default:
        return;
    }
    setRegistrations(updatedRegistrations);
    setSelectedRowKeys([]);
    message.success(`Bulk action "${action}" performed successfully`);
  };

  return (
    <div style={{ padding: "5px" }}>
      <Card>
        <Tabs
          activeKey={activeView}
          onChange={(key) => setActiveView(key)}
          tabBarExtraContent={
            <Space>
              <Button icon={<DownloadOutlined />}>Export Report</Button>
              {activeView === "registrations" && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddModalVisible(true)}
                >
                  Add Registration
                </Button>
              )}
            </Space>
          }
        >
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
                &nbsp;Dashboard
              </span>
            }
            key="dashboard"
          >
            {renderDashboard()}
          </TabPane>
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                &nbsp;Registrations
              </span>
            }
            key="registrations"
          >
            {/* Summary Statistics */}
            <Row gutter={[4, 4]} style={{ marginBottom: "24px" }}>
              <Col span={6}>
                <Card style={{ borderColor: "#1890ff" }}>
                  <Statistic
                    title={
                      <Space>
                        <TeamOutlined />
                        <Text strong>Total Registrations</Text>
                      </Space>
                    }
                    value={totalRegistrations}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "#52c41a" }}>
                  <Statistic
                    title={
                      <Space>
                        <CheckCircleOutlined />
                        <Text strong>Confirmed</Text>
                      </Space>
                    }
                    value={confirmedRegistrations}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "#faad14" }}>
                  <Statistic
                    title={
                      <Space>
                        <ClockCircleOutlined />
                        <Text strong>Waitlisted</Text>
                      </Space>
                    }
                    value={waitlistedRegistrations}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "#722ed1" }}>
                  <Statistic
                    title={
                      <Space>
                        <CheckCircleOutlined />
                        <Text strong>Checked In</Text>
                      </Space>
                    }
                    value={checkedInRegistrations}
                    valueStyle={{ color: "#722ed1" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Filters */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col>
                <Space>
                  <Text>Bulk Actions:</Text>
                  <Select
                    style={{ width: 120 }}
                    onChange={handleBulkAction}
                    value="Select Action"
                  >
                    <Select.Option value="confirm">Confirm</Select.Option>
                    <Select.Option value="cancel">Cancel</Select.Option>
                    <Select.Option value="delete">Delete</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Search registrations..."
                  prefix={<SearchOutlined />}
                />
              </Col>
              <Col>
                <Space>
                  <Select defaultValue="all" style={{ width: 120 }}>
                    <Select.Option value="all">All Status</Select.Option>
                    <Select.Option value="confirmed">Confirmed</Select.Option>
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="waitlisted">Waitlisted</Select.Option>
                    <Select.Option value="checked-in">Checked In</Select.Option>
                  </Select>
                  <DatePicker.RangePicker />
                </Space>
              </Col>
            </Row>

            {/* Registrations Table */}
            <Table
              size="small"
              columns={columns}
              dataSource={registrations}
              rowKey="id"
              pagination={{
                total: registrations.length,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} registrations`,
              }}
              rowSelection={{
                selectedRowKeys,
                onChange: (newSelectedRowKeys) =>
                  setSelectedRowKeys(newSelectedRowKeys),
              }}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                &nbsp;Analytics
              </span>
            }
            key="analytics"
          >
            {/* Detailed Analytics View */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="Registration Timeline">
                  <Area {...areaConfig} height={400} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Registration Status Distribution">
                  <Pie {...pieConfig} height={300} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Daily Registration Volume">
                  <Column {...columnConfig} height={300} />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        {/* Registration Details Modal */}
        <Modal
          title={null}
          open={isDetailsModalVisible}
          onCancel={() => setIsDetailsModalVisible(false)}
          footer={null}
          width={800}
          style={{ top: 20 }}
        >
          {selectedRegistration && (
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
                      size={64}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#1890ff" }}
                    />
                  </Col>
                  <Col flex="1">
                    <Space direction="vertical" size={4}>
                      <Title level={4} style={{ margin: 0 }}>
                        {selectedRegistration.attendee.name}
                      </Title>
                      <Space split={<Divider type="vertical" />}>
                        <Text type="secondary">
                          ID: {selectedRegistration.id}
                        </Text>
                        <Text type="secondary">
                          Class of{" "}
                          {selectedRegistration.attendee.graduationYear}
                        </Text>
                      </Space>
                      <Tag
                        color={getStatusColor(selectedRegistration.status)}
                        icon={getStatusIcon(selectedRegistration.status)}
                      >
                        {selectedRegistration.status.toUpperCase()}
                      </Tag>
                    </Space>
                  </Col>
                </Row>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <Tabs defaultActiveKey="details">
                  <TabPane
                    tab={
                      <span>
                        <InfoCircleOutlined />
                        Details
                      </span>
                    }
                    key="details"
                  >
                    <Row gutter={[24, 24]}>
                      <Col span={12}>
                        <Card title="Contact Information" bordered={false}>
                          <Space direction="vertical" size={16}>
                            <Space>
                              <MailOutlined />
                              <Text>{selectedRegistration.attendee.email}</Text>
                            </Space>
                            <Space>
                              <PhoneOutlined />
                              <Text>{selectedRegistration.attendee.phone}</Text>
                            </Space>
                          </Space>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card title="Registration Details" bordered={false}>
                          <Space direction="vertical" size={16}>
                            <Space>
                              <CalendarOutlined />
                              <Text>
                                Registered:{" "}
                                {selectedRegistration.registrationDate}
                              </Text>
                            </Space>
                            <Space>
                              <TeamOutlined />
                              <Text>{selectedRegistration.guests} Guests</Text>
                            </Space>
                          </Space>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card title="Special Requests" bordered={false}>
                          <List
                            size="small"
                            dataSource={[
                              {
                                label: "Dietary",
                                value:
                                  selectedRegistration.specialRequests.dietary,
                              },
                              {
                                label: "Accessibility",
                                value:
                                  selectedRegistration.specialRequests
                                    .accessibility,
                              },
                              {
                                label: "Accommodation",
                                value:
                                  selectedRegistration.specialRequests
                                    .accommodation,
                              },
                            ]}
                            renderItem={(item) => (
                              <List.Item>
                                <Text type="secondary">{item.label}:</Text>
                                <Text strong>{item.value}</Text>
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <TeamOutlined />
                        Group Members
                      </span>
                    }
                    key="group"
                  >
                    <List
                      dataSource={selectedRegistration.groupMembers}
                      renderItem={(member) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={member.name}
                            description={
                              <Space direction="vertical" size={0}>
                                <Text type="secondary">{member.email}</Text>
                                <Tag style={{ marginTop: 4 }}>
                                  {member.relationship}
                                </Tag>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <MailOutlined />
                        Communications
                      </span>
                    }
                    key="communications"
                  >
                    <Timeline>
                      {selectedRegistration.communications.map(
                        (comm, index) => (
                          <Timeline.Item
                            key={index}
                            color={comm.status === "sent" ? "green" : "blue"}
                          >
                            <Text strong>
                              {comm.type.charAt(0).toUpperCase() +
                                comm.type.slice(1)}{" "}
                              Email
                            </Text>
                            <br />
                            <Text type="secondary">{comm.date}</Text>
                            <Tag
                              color={
                                comm.status === "sent"
                                  ? "success"
                                  : "processing"
                              }
                              style={{ marginLeft: 8 }}
                            >
                              {comm.status.toUpperCase()}
                            </Tag>
                          </Timeline.Item>
                        )
                      )}
                    </Timeline>
                  </TabPane>
                </Tabs>
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
                <Button onClick={() => setIsDetailsModalVisible(false)}>
                  Close
                </Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsEditModalVisible(true);
                    setIsDetailsModalVisible(false);
                  }}
                >
                  Edit Registration
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Add Registration Modal */}
        <Modal
          title="Add New Registration"
          open={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={null}
          width={700}
        >
          <Form form={form} layout="vertical" onFinish={handleAddRegistration}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter full name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="graduationYear"
                  label="Graduation Year"
                  rules={[
                    { required: true, message: "Please enter graduation year" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="guests"
              label="Number of Guests"
              rules={[
                { required: true, message: "Please enter number of guests" },
              ]}
            >
              <InputNumber min={0} max={10} />
            </Form.Item>

            <Form.Item name="dietary" label="Dietary Requirements">
              <Input />
            </Form.Item>

            <Form.Item name="accessibility" label="Accessibility Requirements">
              <Input />
            </Form.Item>

            <Form.Item name="accommodation" label="Accommodation Requirements">
              <Input />
            </Form.Item>

            <Form.Item name="notes" label="Additional Notes">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Registration
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Registration Modal */}
        <Modal
          title="Edit Registration"
          open={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
          width={700}
        >
          {selectedRegistration && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleEditRegistration}
              initialValues={{
                name: selectedRegistration.attendee.name,
                email: selectedRegistration.attendee.email,
                phone: selectedRegistration.attendee.phone,
                graduationYear: selectedRegistration.attendee.graduationYear,
                guests: selectedRegistration.guests,
                dietary: selectedRegistration.specialRequests.dietary,
                accessibility:
                  selectedRegistration.specialRequests.accessibility,
                accommodation:
                  selectedRegistration.specialRequests.accommodation,
                notes: selectedRegistration.notes,
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Please enter full name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="graduationYear"
                    label="Graduation Year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter graduation year",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="guests"
                label="Number of Guests"
                rules={[
                  { required: true, message: "Please enter number of guests" },
                ]}
              >
                <InputNumber min={0} max={10} />
              </Form.Item>

              <Form.Item name="dietary" label="Dietary Requirements">
                <Input />
              </Form.Item>

              <Form.Item
                name="accessibility"
                label="Accessibility Requirements"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="accommodation"
                label="Accommodation Requirements"
              >
                <Input />
              </Form.Item>

              <Form.Item name="notes" label="Additional Notes">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Registration
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>

        {/* QR Code Modal */}
        <Modal
          title="Registration QR Code"
          open={isQRModalVisible}
          onCancel={() => setIsQRModalVisible(false)}
          footer={null}
        >
          {selectedRegistration && (
            <div style={{ textAlign: "center" }}>
              <QRCode value={selectedRegistration.qrCode} />
              <p style={{ marginTop: "16px" }}>
                Scan this QR code for quick check-in
              </p>
            </div>
          )}
        </Modal>

        {/* Send Email Modal */}
        <Modal
          title="Send Email"
          open={isSendEmailModalVisible}
          onCancel={() => setIsSendEmailModalVisible(false)}
          footer={null}
        >
          <Form form={emailForm} layout="vertical" onFinish={handleSendEmail}>
            <Form.Item
              name="type"
              label="Email Type"
              rules={[{ required: true, message: "Please select email type" }]}
            >
              <Select>
                <Select.Option value="reminder">Reminder</Select.Option>
                <Select.Option value="update">Event Update</Select.Option>
                <Select.Option value="confirmation">Confirmation</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Email
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default EventRegistrationManagement;
