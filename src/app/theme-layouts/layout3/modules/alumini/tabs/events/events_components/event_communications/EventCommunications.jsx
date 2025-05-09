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
  DatePicker,
  Tooltip,
  message,
  Switch,
  List,
  Avatar,
  Popconfirm,
  notification,
  Empty,
} from "antd";
import {
  MailOutlined,
  ShareAltOutlined,
  SoundOutlined,
  ClockCircleOutlined,
  EditOutlined,
  UserAddOutlined,
  WechatOutlined,
  BarChartOutlined,
  MobileOutlined,
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Sample data for demonstration
const events = [
  { id: "EVT001", name: "Alumni Homecoming 2024", date: "2024-05-15" },
  { id: "EVT002", name: "Career Fair 2024", date: "2024-04-01" },
];

const initialInvitations = [
  {
    id: 1,
    event: "Alumni Homecoming 2024",
    type: "Email",
    status: "Sent",
    sentDate: "2024-03-01",
    openRate: "68%",
  },
  {
    id: 2,
    event: "Career Fair 2024",
    type: "SMS",
    status: "Scheduled",
    sentDate: "2024-03-15",
    openRate: "N/A",
  },
];

const initialAnnouncements = [
  {
    id: 1,
    event: "Alumni Homecoming 2024",
    title: "Venue Change",
    date: "2024-03-10",
    status: "Published",
  },
  {
    id: 2,
    event: "Career Fair 2024",
    title: "New Sponsor Announcement",
    date: "2024-03-12",
    status: "Draft",
  },
];

const initialReminders = [
  {
    id: 1,
    event: "Alumni Homecoming 2024",
    message: "1 week to go!",
    scheduledDate: "2024-05-08",
    status: "Scheduled",
  },
  {
    id: 2,
    event: "Career Fair 2024",
    message: "1 day to go!",
    scheduledDate: "2024-03-31",
    status: "Sent",
  },
];

const engagementData = [
  { date: "2024-03-01", emailOpens: 150, pageViews: 300, registrations: 50 },
  { date: "2024-03-02", emailOpens: 180, pageViews: 350, registrations: 65 },
  { date: "2024-03-03", emailOpens: 210, pageViews: 400, registrations: 80 },
  { date: "2024-03-04", emailOpens: 240, pageViews: 450, registrations: 95 },
  { date: "2024-03-05", emailOpens: 270, pageViews: 500, registrations: 110 },
];

const EventCommunicationManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [isInvitationModalVisible, setIsInvitationModalVisible] =
    useState(false);
  const [isAnnouncementModalVisible, setIsAnnouncementModalVisible] =
    useState(false);
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [invitations, setInvitations] = useState(initialInvitations);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [reminders, setReminders] = useState(initialReminders);

  const [invitationForm] = Form.useForm();
  const [announcementForm] = Form.useForm();
  const [reminderForm] = Form.useForm();
  const [templateForm] = Form.useForm();

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    setIsEventSelected(true);
  };

  // Invitation Management
  const invitationColumns = [
    { title: "Event", dataIndex: "event", key: "event" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Sent" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    { title: "Sent Date", dataIndex: "sentDate", key: "sentDate" },
    { title: "Open Rate", dataIndex: "openRate", key: "openRate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewInvitationDetails(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this invitation?"
            onConfirm={() => handleDeleteInvitation(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSendInvitation = async (values) => {
    setIsSubmitting(true);
    try {
      const newInvitation = {
        id: invitations.length + 1,
        event: events.find((e) => e.id === selectedEvent)?.name || "",
        type: values.invitationType,
        status: "Sent",
        sentDate: new Date().toISOString().split("T")[0],
        openRate: "N/A",
      };
      setInvitations([...invitations, newInvitation]);
      notification.success({
        message: "Invitations Sent",
        description: "The invitations have been sent successfully.",
      });
      setIsInvitationModalVisible(false);
      invitationForm.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while sending invitations. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewInvitationDetails = (invitation) => {
    console.log("View invitation details:", invitation);
    // Implement view details logic
  };

  const handleDeleteInvitation = (id) => {
    const updatedInvitations = invitations.filter((inv) => inv.id !== id);
    setInvitations(updatedInvitations);
    notification.success({
      message: "Invitation Deleted",
      description: "The invitation has been successfully deleted.",
    });
  };

  // Announcement Management
  const announcementColumns = [
    { title: "Event", dataIndex: "event", key: "event" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Published" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditAnnouncement(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this announcement?"
            onConfirm={() => handleDeleteAnnouncement(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handlePublishAnnouncement = async (values) => {
    setIsSubmitting(true);
    try {
      const newAnnouncement = {
        id: announcements.length + 1,
        event: events.find((e) => e.id === selectedEvent)?.name || "",
        title: values.title,
        date: values.publishDate.format("YYYY-MM-DD"),
        status: "Published",
      };
      setAnnouncements([...announcements, newAnnouncement]);
      notification.success({
        message: "Announcement Published",
        description: "The announcement has been published successfully.",
      });
      setIsAnnouncementModalVisible(false);
      announcementForm.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while publishing the announcement. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    console.log("Edit announcement:", announcement);
    // Implement edit logic
  };

  const handleDeleteAnnouncement = (id) => {
    const updatedAnnouncements = announcements.filter((ann) => ann.id !== id);
    setAnnouncements(updatedAnnouncements);
    notification.success({
      message: "Announcement Deleted",
      description: "The announcement has been successfully deleted.",
    });
  };

  // Reminder Management
  const reminderColumns = [
    { title: "Event", dataIndex: "event", key: "event" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Scheduled Date",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Sent" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditReminder(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this reminder?"
            onConfirm={() => handleDeleteReminder(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleScheduleReminder = async (values) => {
    setIsSubmitting(true);
    try {
      const newReminder = {
        id: reminders.length + 1,
        event: events.find((e) => e.id === selectedEvent)?.name || "",
        message: values.message,
        scheduledDate: values.scheduledDate.format("YYYY-MM-DD"),
        status: "Scheduled",
      };
      setReminders([...reminders, newReminder]);
      notification.success({
        message: "Reminder Scheduled",
        description: "The reminder has been scheduled successfully.",
      });
      setIsReminderModalVisible(false);
      reminderForm.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while scheduling the reminder. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReminder = (reminder) => {
    console.log("Edit reminder:", reminder);
    // Implement edit logic
  };

  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((rem) => rem.id !== id);
    setReminders(updatedReminders);
    notification.success({
      message: "Reminder Deleted",
      description: "The reminder has been successfully deleted.",
    });
  };

  // Template Management
  const handleSaveTemplate = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Save template:", values);
      notification.success({
        message: "Template Saved",
        description: "The email template has been saved successfully.",
      });
      setIsTemplateModalVisible(false);
      templateForm.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          "An error occurred while saving the template. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Engagement Metrics
  const engagementConfig = {
    data: engagementData,
    xField: "date",
    yField: ["emailOpens", "pageViews", "registrations"],
    seriesField: "type",
    legend: { position: "top" },
    smooth: true,
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
          <Col span={12}>
            {selectedEvent && (
              <Text>
                <CalendarOutlined /> Event Date:{" "}
                {events.find((e) => e.id === selectedEvent)?.date}
              </Text>
            )}
          </Col>
        </Row>

        <Tabs defaultActiveKey="1" disabled={!isEventSelected}>
          <TabPane
            tab={
              <span>
                <MailOutlined />
                &nbsp;Invitations
              </span>
            }
            key="1"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>Manage Invitations</Title>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsInvitationModalVisible(true)}
                      disabled={!isEventSelected}
                    >
                      Send Bulk Invitations
                    </Button>
                  </Col>
                </Row>
                <Table
                  size="small"
                  columns={invitationColumns}
                  dataSource={invitations}
                  rowKey="id"
                />
              </Space>
            ) : (
              <Empty description="Please select an event to manage invitations" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <SoundOutlined />
                &nbsp;Announcements
              </span>
            }
            key="2"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>Manage Announcements</Title>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsAnnouncementModalVisible(true)}
                      disabled={!isEventSelected}
                    >
                      Publish Announcement
                    </Button>
                  </Col>
                </Row>
                <Table
                  size="small"
                  columns={announcementColumns}
                  dataSource={announcements}
                  rowKey="id"
                />
              </Space>
            ) : (
              <Empty description="Please select an event to manage announcements" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <ClockCircleOutlined />
                &nbsp;Reminders
              </span>
            }
            key="3"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>Manage Reminders</Title>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsReminderModalVisible(true)}
                      disabled={!isEventSelected}
                    >
                      Schedule Reminder
                    </Button>
                  </Col>
                </Row>
                <Table
                  size="small"
                  columns={reminderColumns}
                  dataSource={reminders}
                  rowKey="id"
                />
              </Space>
            ) : (
              <Empty description="Please select an event to manage reminders" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <EditOutlined />
                &nbsp;Templates
              </span>
            }
            key="4"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>Manage Email Templates</Title>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsTemplateModalVisible(true)}
                      disabled={!isEventSelected}
                    >
                      Create New Template
                    </Button>
                  </Col>
                </Row>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "Event Invitation",
                    "Reminder Email",
                    "Thank You Message",
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button key="edit" icon={<EditOutlined />}>
                          Edit
                        </Button>,
                        <Popconfirm
                          key="delete"
                          title="Are you sure you want to delete this template?"
                          onConfirm={() => message.success("Template deleted")}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button key="delete" icon={<DeleteOutlined />}>
                            Delete
                          </Button>
                        </Popconfirm>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<MailOutlined />} />}
                        title={item}
                        description="Last edited: 2024-03-01"
                      />
                    </List.Item>
                  )}
                />
              </Space>
            ) : (
              <Empty description="Please select an event to manage email templates" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <ShareAltOutlined />
                &nbsp;Social Sharing
              </span>
            }
            key="5"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Title level={4}>Enable Social Media Sharing</Title>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card>
                      <Space>
                        <Switch defaultChecked />
                        <Text>LinkedIn</Text>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Space>
                        <Switch defaultChecked />
                        <Text>Facebook</Text>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Space>
                        <Switch defaultChecked />
                        <Text>X (Twitter)</Text>
                      </Space>
                    </Card>
                  </Col>
                </Row>
                <Button type="primary" icon={<ShareAltOutlined />}>
                  Configure Sharing Options
                </Button>
              </Space>
            ) : (
              <Empty description="Please select an event to manage social sharing" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <UserAddOutlined />
                &nbsp;Alumni-to-Alumni Invites
              </span>
            }
            key="6"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Switch defaultChecked />
                <Text>Allow alumni to invite their peers</Text>
                <Card title="Invitation Link">
                  <Input.Group compact>
                    <Input
                      style={{ width: "calc(100% - 200px)" }}
                      defaultValue="https://alumni.example.com/invite/EVT001"
                    />
                    <Button type="primary">Copy Link</Button>
                  </Input.Group>
                </Card>
                <Button type="primary" icon={<MailOutlined />}>
                  Send Invitation Reminders to Alumni
                </Button>
              </Space>
            ) : (
              <Empty description="Please select an event to manage alumni-to-alumni invites" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <WechatOutlined />
                &nbsp;Chat & Q&A
              </span>
            }
            key="7"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Switch defaultChecked />
                <Text>Enable pre-event discussions and Q&A forums</Text>
                <Card title="Active Discussions">
                  <List
                    itemLayout="horizontal"
                    dataSource={[
                      "General Discussion",
                      "Speaker Q&A",
                      "Networking Opportunities",
                    ]}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button key="view">View</Button>,
                          <Button key="moderate">Moderate</Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<WechatOutlined />} />}
                          title={item}
                          description="Last activity: 2 hours ago"
                        />
                      </List.Item>
                    )}
                  />
                </Card>
                <Button type="primary" icon={<PlusOutlined />}>
                  Create New Discussion Thread
                </Button>
              </Space>
            ) : (
              <Empty description="Please select an event to manage chat & Q&A" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                &nbsp;Engagement Metrics
              </span>
            }
            key="8"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Card style={{ borderColor: "#3f8600" }}>
                      <Statistic
                        title="Email Open Rate"
                        value={68.5}
                        precision={1}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderColor: "#1890ff" }}>
                      <Statistic
                        title="Event Page Views"
                        value={1254}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderColor: "#cf1322" }}>
                      <Statistic
                        title="Registration Rate"
                        value={42.3}
                        precision={1}
                        valueStyle={{ color: "#cf1322" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                </Row>
                <Card title="Engagement Trends">
                  <Line {...engagementConfig} />
                </Card>
              </Space>
            ) : (
              <Empty description="Please select an event to view engagement metrics" />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <MobileOutlined />
                &nbsp;Push Notifications
              </span>
            }
            key="9"
          >
            {isEventSelected ? (
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex", width: "100%" }}
              >
                <Switch defaultChecked />
                <Text>Enable push notifications for mobile app users</Text>
                <Form layout="vertical">
                  <Form.Item
                    label="Notification Title"
                    name="notificationTitle"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a notification title",
                      },
                    ]}
                  >
                    <Input placeholder="Enter notification title" />
                  </Form.Item>
                  <Form.Item
                    label="Notification Message"
                    name="notificationMessage"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a notification message",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Enter notification message"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Target Audience"
                    name="targetAudience"
                    rules={[
                      {
                        required: true,
                        message: "Please select a target audience",
                      },
                    ]}
                  >
                    <Select defaultValue="all">
                      <Select.Option value="all">
                        All Registered Attendees
                      </Select.Option>
                      <Select.Option value="notRegistered">
                        Not Yet Registered
                      </Select.Option>
                      <Select.Option value="speakers">Speakers</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<SendOutlined />}>
                      Send Push Notification
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            ) : (
              <Empty description="Please select an event to manage push notifications" />
            )}
          </TabPane>
        </Tabs>
      </Card>

      {/* Invitation Modal */}
      <Modal
        title="Send Bulk Invitations"
        visible={isInvitationModalVisible}
        onCancel={() => setIsInvitationModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={invitationForm}
          layout="vertical"
          onFinish={handleSendInvitation}
        >
          <Form.Item
            name="invitationType"
            label="Invitation Type"
            rules={[
              { required: true, message: "Please select an invitation type" },
            ]}
          >
            <Select>
              <Select.Option value="email">Email</Select.Option>
              <Select.Option value="sms">SMS</Select.Option>
              <Select.Option value="app">App Notification</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="recipients"
            label="Recipients"
            rules={[{ required: true, message: "Please select recipients" }]}
          >
            <Select mode="multiple" placeholder="Select recipients">
              <Select.Option value="all">All Alumni</Select.Option>
              <Select.Option value="class2020">Class of 2020</Select.Option>
              <Select.Option value="class2021">Class of 2021</Select.Option>
              <Select.Option value="class2022">Class of 2022</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Invitation Message"
            rules={[
              { required: true, message: "Please enter an invitation message" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Send Invitations
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Announcement Modal */}
      <Modal
        title="Publish Announcement"
        visible={isAnnouncementModalVisible}
        onCancel={() => setIsAnnouncementModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={announcementForm}
          layout="vertical"
          onFinish={handlePublishAnnouncement}
        >
          <Form.Item
            name="title"
            label="Announcement Title"
            rules={[
              { required: true, message: "Please enter an announcement title" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Announcement Content"
            rules={[
              { required: true, message: "Please enter announcement content" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="publishDate"
            label="Publish Date"
            rules={[
              { required: true, message: "Please select a publish date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Publish Announcement
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Reminder Modal */}
      <Modal
        title="Schedule Reminder"
        visible={isReminderModalVisible}
        onCancel={() => setIsReminderModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={reminderForm}
          layout="vertical"
          onFinish={handleScheduleReminder}
        >
          <Form.Item
            name="reminderType"
            label="Reminder Type"
            rules={[
              { required: true, message: "Please select a reminder type" },
            ]}
          >
            <Select>
              <Select.Option value="email">Email</Select.Option>
              <Select.Option value="sms">SMS</Select.Option>
              <Select.Option value="app">App Notification</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Reminder Message"
            rules={[
              { required: true, message: "Please enter a reminder message" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="scheduledDate"
            label="Scheduled Date"
            rules={[
              { required: true, message: "Please select a scheduled date" },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Schedule Reminder
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Template Modal */}
      <Modal
        title="Create Email Template"
        visible={isTemplateModalVisible}
        onCancel={() => setIsTemplateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={templateForm}
          layout="vertical"
          onFinish={handleSaveTemplate}
        >
          <Form.Item
            name="templateName"
            label="Template Name"
            rules={[
              { required: true, message: "Please enter a template name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Email Subject"
            rules={[
              { required: true, message: "Please enter an email subject" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Email Content"
            rules={[{ required: true, message: "Please enter email content" }]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Save Template
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCommunicationManagement;
