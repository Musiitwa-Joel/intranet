import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  Upload,
  Switch,
  Tag,
  Tooltip,
  message,
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Popconfirm,
  Statistic,
  Radio,
  Input as AntInput,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = AntInput;

const initialEvents = [
  {
    id: "1",
    name: "Annual Alumni Gala",
    date: ["2024-06-15 18:00:00", "2024-06-15 22:00:00"],
    venue: "Grand Ballroom, Alumni Center",
    description: "Join us for an evening of celebration and networking.",
    capacity: 200,
    waitlistCapacity: 20,
    registrationOpen: true,
    status: "Upcoming",
    coordinators: ["John Doe", "Jane Smith"],
    documents: [],
    agenda: [
      {
        id: "1",
        title: "Welcome Reception",
        speaker: "Dr. Emily Johnson",
        startTime: "18:00",
        endTime: "18:30",
        description: "Opening remarks and welcome drinks",
      },
      {
        id: "2",
        title: "Keynote Speech",
        speaker: "Prof. Michael Chang",
        startTime: "18:30",
        endTime: "19:15",
        description: "Insights on the future of education",
      },
    ],
    registrationCloseDate: "2024-06-10 23:59:59",
    isVirtual: false,
    approvedBy: "Admin User",
    approvalDate: "2024-01-15 10:30:00",
  },
  {
    id: "2",
    name: "Virtual Career Fair",
    date: ["2024-07-10 09:00:00", "2024-07-10 17:00:00"],
    venue: "Online",
    description: "Connect with top employers from the comfort of your home.",
    capacity: 500,
    waitlistCapacity: 50,
    registrationOpen: true,
    status: "Upcoming",
    virtualLink: "https://zoom.us/j/123456789",
    coordinators: ["Alice Johnson"],
    documents: [],
    agenda: [
      {
        id: "1",
        title: "Opening Ceremony",
        speaker: "Career Services Director",
        startTime: "09:00",
        endTime: "09:30",
        description: "Introduction to the virtual career fair",
      },
      {
        id: "2",
        title: "Company Presentations",
        speaker: "Various",
        startTime: "09:30",
        endTime: "12:00",
        description: "Short presentations from participating companies",
      },
    ],
    registrationCloseDate: "2024-07-08 23:59:59",
    isVirtual: true,
    approvedBy: "Admin User",
    approvalDate: "2024-02-01 14:45:00",
  },
];

const EventManagementDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null > null);
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();
  const [selectedEventId, setSelectedEventId] = useState(null > null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const showModal = (event) => {
    setEditingEvent(event || null);
    if (event) {
      form.setFieldsValue({
        ...event,
        date: [moment(event.date[0]), moment(event.date[1])],
        registrationCloseDate: event.registrationCloseDate
          ? moment(event.registrationCloseDate)
          : undefined,
        agenda: event.agenda.map((session) => ({
          ...session,
          startTime: moment(session.startTime, "HH:mm"),
          endTime: moment(session.endTime, "HH:mm"),
        })),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      ...values,
      date: values.date.map((d) => d.format("YYYY-MM-DD HH:mm:ss")),
      documents: values.documents ? values.documents.fileList : [],
      agenda: values.agenda
        ? values.agenda.map((session) => ({
            ...session,
            startTime: session.startTime.format("HH:mm"),
            endTime: session.endTime.format("HH:mm"),
          }))
        : [],
      registrationCloseDate: values.registrationCloseDate
        ? values.registrationCloseDate.format("YYYY-MM-DD HH:mm:ss")
        : undefined,
    };

    if (editingEvent) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? newEvent : e)));
      message.success("Event updated successfully");
    } else {
      setEvents([...events, newEvent]);
      message.success("Event created successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setSelectedEventId(null);
    message.success("Event deleted successfully");
  };

  const handleDuplicate = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      name: `Copy of ${event.name}`,
    };
    setEvents([...events, newEvent]);
    message.success("Event duplicated successfully");
  };

  const handleStatusChange = (id, status) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status } : e)));
    message.success(`Event status updated to ${status}`);
  };

  const handleApprove = (id) => {
    setEvents(
      events.map((e) =>
        e.id === id
          ? {
              ...e,
              status: "Approved",
              approvedBy: "Current Admin",
              approvalDate: new Date().toISOString(),
            }
          : e
      )
    );
    message.success("Event approved successfully");
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "All" || event.status === statusFilter)
  );

  const columns = [
    {
      title: "Select",
      dataIndex: "id",
      key: "select",
      width: 80,
      render: (id) => (
        <Radio
          checked={id === selectedEventId}
          onChange={() => setSelectedEventId(id)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Text strong>{text}</Text>
          {record.isVirtual && (
            <Tag icon={<VideoCameraOutlined />} color="blue">
              Virtual
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <>
          <div>{moment(date[0]).format("MMM D, YYYY")}</div>
          <div>{`${moment(date[0]).format("h:mm A")} - ${moment(date[1]).format(
            "h:mm A"
          )}`}</div>
        </>
      ),
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (capacity, record) => (
        <Tooltip title={`Waitlist: ${record.waitlistCapacity}`}>
          <span>{capacity}</span>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Upcoming"
              ? "blue"
              : status === "Completed"
                ? "gray"
                : status === "Pending"
                  ? "orange"
                  : status === "Approved"
                    ? "cyan"
                    : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Registration",
      dataIndex: "registrationOpen",
      key: "registrationOpen",
      render: (open, record) => (
        <Tooltip
          title={
            record.registrationCloseDate
              ? `Closes on ${moment(record.registrationCloseDate).format(
                  "MMM D, YYYY"
                )}`
              : ""
          }
        >
          <Tag color={open ? "green" : "red"}>{open ? "Open" : "Closed"}</Tag>
        </Tooltip>
      ),
    },
  ];

  const items = [
    {
      key: "dashboard",
      icon: React.createElement(DashboardOutlined),
      label: "Dashboard",
    },
    {
      key: "events",
      icon: React.createElement(CalendarOutlined),
      label: "Events",
    },
    {
      key: "users",
      icon: React.createElement(UserOutlined),
      label: "Users",
    },
    {
      key: "settings",
      icon: React.createElement(SettingOutlined),
      label: "Settings",
    },
  ];

  const handleExportCSV = () => {
    const csvContent = [
      ["Name", "Date", "Venue", "Capacity", "Status", "Registration"],
      ...events.map((event) => [
        event.name,
        `${moment(event.date[0]).format("MMM D, YYYY h:mm A")} - ${moment(
          event.date[1]
        ).format("h:mm A")}`,
        event.venue,
        event.capacity,
        event.status,
        event.registrationOpen ? "Open" : "Closed",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "events.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Layout>
        <Content style={{ margin: "5px 5px 0", overflow: "initial" }}>
          <div style={{ padding: 4, background: "#fff", borderRadius: 8 }}>
            <Row gutter={[4, 4]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Card style={{ borderColor: "blue" }}>
                  <Statistic
                    title="Total Events"
                    value={events.length}
                    prefix={<CalendarOutlined style={{ color: "#1890ff" }} />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "green" }}>
                  <Statistic
                    title="Upcoming Events"
                    value={events.filter((e) => e.status === "Upcoming").length}
                    prefix={
                      <ClockCircleOutlined style={{ color: "#52c41a" }} />
                    }
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "orange" }}>
                  <Statistic
                    title="Active Events"
                    value={events.filter((e) => e.status === "Active").length}
                    prefix={
                      <CheckCircleOutlined style={{ color: "#faad14" }} />
                    }
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderColor: "red" }}>
                  <Statistic
                    title="Pending Approval"
                    value={events.filter((e) => e.status === "Pending").length}
                    prefix={
                      <ClockCircleOutlined style={{ color: "#ff4d4f" }} />
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 16 }}
            >
              <Col>
                <Title level={4}>Event List</Title>
              </Col>
              <Col>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal()}
                  >
                    Create New Event
                  </Button>
                  <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
                    Export to CSV
                  </Button>

                  <Tooltip title="Edit Event">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        const event = events.find(
                          (e) => e.id === selectedEventId
                        );
                        if (event) {
                          showModal(event);
                        } else {
                          message.warning("Please select an event to edit");
                        }
                      }}
                      disabled={!selectedEventId}
                    ></Button>
                  </Tooltip>

                  <Popconfirm
                    title="Are you sure you want to delete this event?"
                    onConfirm={() =>
                      selectedEventId && handleDelete(selectedEventId)
                    }
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title="Delete Event">
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        disabled={!selectedEventId}
                      ></Button>
                    </Tooltip>
                  </Popconfirm>

                  <Tooltip title="Duplicate Event">
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => {
                        const event = events.find(
                          (e) => e.id === selectedEventId
                        );
                        if (event) {
                          handleDuplicate(event);
                        } else {
                          message.warning(
                            "Please select an event to duplicate"
                          );
                        }
                      }}
                      disabled={!selectedEventId}
                    ></Button>
                  </Tooltip>
                </Space>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={8}>
                <Search
                  placeholder="Search events"
                  onSearch={(value) => setSearchText(value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={8}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Filter by status"
                  onChange={(value) => setStatusFilter(value)}
                  defaultValue="All"
                >
                  <Select.Option value="All">All Statuses</Select.Option>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Approved">Approved</Select.Option>
                  <Select.Option value="Upcoming">Upcoming</Select.Option>
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Completed">Completed</Select.Option>
                  <Select.Option value="Cancelled">Cancelled</Select.Option>
                  <Select.Option value="Postponed">Postponed</Select.Option>
                </Select>
              </Col>
            </Row>
            <Table
              size="small"
              columns={columns}
              dataSource={filteredEvents}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
            />
          </div>
        </Content>
      </Layout>

      <Modal
        title={editingEvent ? "Edit Event" : "Create New Event"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Basic Info" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Event Name"
                    rules={[
                      { required: true, message: "Please enter event name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    label="Event Date and Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select event date and time",
                      },
                    ]}
                  >
                    <RangePicker showTime style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="venue"
                    label="Venue"
                    rules={[{ required: true, message: "Please enter venue" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="isVirtual"
                    label="Virtual Event"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="virtualLink"
                label="Virtual Link (if applicable)"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="capacity"
                    label="Capacity"
                    rules={[
                      { required: true, message: "Please enter capacity" },
                    ]}
                  >
                    <InputNumber min={1} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="waitlistCapacity" label="Waitlist Capacity">
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="registrationCloseDate"
                    label="Registration Close Date"
                  >
                    <DatePicker showTime style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Agenda" key="2">
              <Form.List name="agenda">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          rules={[{ required: true, message: "Missing title" }]}
                        >
                          <Input placeholder="Session Title" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "speaker"]}
                          rules={[
                            { required: true, message: "Missing speaker" },
                          ]}
                        >
                          <Input placeholder="Speaker" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "startTime"]}
                          rules={[
                            { required: true, message: "Missing start time" },
                          ]}
                        >
                          <TimePicker format="HH:mm" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "endTime"]}
                          rules={[
                            { required: true, message: "Missing end time" },
                          ]}
                        >
                          <TimePicker format="HH:mm" />
                        </Form.Item>
                        <Button
                          onClick={() => remove(name)}
                          icon={<DeleteOutlined />}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Session
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </TabPane>
            <TabPane tab="Coordinators" key="3">
              <Form.Item
                name="coordinators"
                label="Event Coordinators"
                rules={[
                  {
                    required: true,
                    message: "Please add at least one coordinator",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Add coordinators"
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="Documents" key="4">
              <Form.Item name="documents" label="Supporting Documents">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
              </Form.Item>
            </TabPane>
          </Tabs>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="registrationOpen"
                label="Registration Open"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Event Status"
                rules={[
                  { required: true, message: "Please select event status" },
                ]}
              >
                <Select>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Approved">Approved</Select.Option>
                  <Select.Option value="Upcoming">Upcoming</Select.Option>
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Completed">Completed</Select.Option>
                  <Select.Option value="Cancelled">Cancelled</Select.Option>
                  <Select.Option value="Postponed">Postponed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingEvent ? "Update Event" : "Create Event"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventManagementDashboard;
