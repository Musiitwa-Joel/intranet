import React, { useState, useEffect } from "react";
import {
  Layout,
  Tabs,
  Card,
  Button,
  Table,
  Tag,
  Space,
  Input,
  Select,
  Badge,
  Statistic,
  Row,
  Col,
  Popconfirm,
  Modal,
  Form,
  message,
  Avatar,
  List,
  Tooltip,
  Progress,
  Timeline,
  Drawer,
  InputNumber,
  Radio,
  Divider,
} from "antd";
import {
  PlusOutlined,
  PushpinOutlined,
  UserOutlined,
  MessageOutlined,
  TagOutlined,
  BellOutlined,
  BarChartOutlined,
  FlagOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  LineChartOutlined,
  RiseOutlined,
  TeamOutlined,
  AlertOutlined,
  LikeOutlined,
  DislikeOutlined,
  WarningOutlined,
  StopOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { TextArea } = Input;

function App() {
  const [activeTab, setActiveTab] = useState("1");
  const [isThreadModalVisible, setIsThreadModalVisible] = useState(false);
  const [isActivityDrawerVisible, setIsActivityDrawerVisible] = useState(false);
  const [isModerateUserModalVisible, setIsModerateUserModalVisible] =
    useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [threadForm] = Form.useForm();
  const [moderationForm] = Form.useForm();

  const [categories] = useState([
    {
      id: "1",
      name: "Announcements",
      description: "Official announcements and updates",
      threadsCount: 15,
      status: "active",
    },
    {
      id: "2",
      name: "Career",
      description: "Career opportunities and discussions",
      threadsCount: 45,
      status: "active",
    },
    {
      id: "3",
      name: "Events",
      description: "Upcoming and past events",
      threadsCount: 30,
      status: "active",
    },
  ]);

  const [threads, setThreads] = useState([
    {
      id: "1",
      title: "Welcome to the Alumni Network",
      category: "Announcements",
      author: "Admin",
      content: "Welcome to our new alumni network platform!",
      replies: 15,
      views: 234,
      likes: 45,
      isPinned: true,
      status: "active",
      lastActivity: "2024-02-20T10:30:00",
      tags: ["welcome", "important"],
    },
    {
      id: "2",
      title: "Career Opportunities Discussion",
      category: "Career",
      author: "CareerGuide",
      content: "Let's discuss upcoming career opportunities.",
      replies: 45,
      views: 567,
      likes: 89,
      isPinned: false,
      status: "active",
      lastActivity: "2024-02-19T15:20:00",
      tags: ["careers", "jobs"],
    },
  ]);

  const [threadActivities] = useState([
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&id=1",
      content:
        "This is really helpful information! Looking forward to more updates.",
      timestamp: "2024-02-20T11:30:00",
      likes: 5,
      replies: 2,
      type: "comment",
      status: "pending",
      reports: 0,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Jane Smith",
      userAvatar: "https://xsgames.co/randomusers/avatar.php?g=female&id=2",
      content:
        "I disagree with this approach. We should consider alternative solutions.",
      timestamp: "2024-02-20T12:15:00",
      likes: 3,
      replies: 1,
      type: "reply",
      status: "approved",
      reports: 2,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike Johnson",
      userAvatar: "https://xsgames.co/randomusers/avatar.php?g=male&id=3",
      content: "Great initiative! This will help us stay connected.",
      timestamp: "2024-02-20T13:45:00",
      likes: 8,
      replies: 4,
      type: "comment",
      status: "approved",
      reports: 0,
    },
  ]);

  // Calculate real statistics
  const statistics = {
    totalThreads: threads.length,
    activeUsers: threadActivities.length,
    totalCategories: new Set(threads.map((t) => t.category)).size,
    pendingReports: threadActivities.filter((a) => a.reports && a.reports > 0)
      .length,
  };

  const handleCreateThread = (values) => {
    const newThread = {
      id: (threads.length + 1).toString(),
      title: values.title,
      category: values.category,
      author: "Current User",
      content: values.content,
      replies: 0,
      views: 0,
      likes: 0,
      isPinned: false,
      status: "active",
      lastActivity: new Date().toISOString(),
      tags: values.tags || [],
    };

    setThreads([...threads, newThread]);
    message.success("Thread created successfully");
    setIsThreadModalVisible(false);
    threadForm.resetFields();
  };

  const handleTogglePin = (thread) => {
    const updatedThreads = threads.map((t) =>
      t.id === thread.id ? { ...t, isPinned: !t.isPinned } : t
    );
    setThreads(updatedThreads);
    message.success(
      `Thread ${thread.isPinned ? "unpinned" : "pinned"} successfully`
    );
  };

  const handleDeleteThread = (threadId) => {
    setThreads(threads.filter((t) => t.id !== threadId));
    message.success("Thread deleted successfully");
  };

  const handleModerateUser = (values) => {
    const action = values.action;
    const duration = values.duration;

    let successMessage = "";
    switch (action) {
      case "warn":
        successMessage = `Warning sent to ${selectedUser?.userName}`;
        break;
      case "restrict":
        successMessage = `${selectedUser?.userName} restricted for ${duration} hours`;
        break;
      case "ban":
        successMessage = `${selectedUser?.userName} has been banned`;
        break;
    }

    message.success(successMessage);
    setIsModerateUserModalVisible(false);
    moderationForm.resetFields();
  };

  const handleApproveContent = (activityId) => {
    message.success("Content approved successfully");
  };

  const handleRejectContent = (activityId) => {
    message.success("Content rejected successfully");
  };

  const threadColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space>
          {record.isPinned && (
            <Tooltip title="Pinned Thread">
              <PushpinOutlined style={{ color: "#1890ff" }} />
            </Tooltip>
          )}
          <a
            href="#"
            onClick={() => {
              setSelectedThread(record);
              setIsActivityDrawerVisible(true);
            }}
            style={{ fontWeight: 500 }}
          >
            {text}
          </a>
          <Space size={4}>
            {record.tags.map((tag) => (
              <Tag key={tag} color="blue" style={{ fontSize: "12px" }}>
                {tag}
              </Tag>
            ))}
          </Space>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <Tag color="cyan" style={{ fontWeight: 500 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: "Activity",
      key: "activity",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <MessageOutlined /> {record.replies} replies
          </Space>
          <Space>
            <EyeOutlined /> {record.views} views
          </Space>
          <Space>
            <LikeOutlined /> {record.likes} likes
          </Space>
        </Space>
      ),
    },
    {
      title: "Last Activity",
      dataIndex: "lastActivity",
      key: "lastActivity",
      render: (date) =>
        formatDistanceToNow(new Date(date), { addSuffix: true }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Badge
          status={text === "active" ? "success" : "default"}
          text={text.charAt(0).toUpperCase() + text.slice(1)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="small">
          <Tooltip title="Edit Thread">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedThread(record);
                threadForm.setFieldsValue(record);
                setIsThreadModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title={record.isPinned ? "Unpin Thread" : "Pin Thread"}>
            <Button
              type="text"
              icon={record.isPinned ? <UnlockOutlined /> : <PushpinOutlined />}
              onClick={() => handleTogglePin(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Thread"
            description="Are you sure you want to delete this thread?"
            onConfirm={() => handleDeleteThread(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <span style={{ fontWeight: 500 }}>{text}</span>
          <Badge
            status={record.status === "active" ? "success" : "default"}
            text={
              record.status.charAt(0).toUpperCase() + record.status.slice(1)
            }
          />
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Threads",
      dataIndex: "threadsCount",
      key: "threadsCount",
      render: (count) => <Tag color="blue">{count} threads</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: "0px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Row gutter={[4, 4]}>
            <Col span={6}>
              <Card hoverable>
                <Statistic
                  title={
                    <span style={{ fontSize: "16px" }}>Total Threads</span>
                  }
                  value={statistics.totalThreads}
                  prefix={<MessageOutlined style={{ color: "#1890ff" }} />}
                  valueStyle={{ color: "#1890ff" }}
                />
                <Progress percent={70} showInfo={false} strokeColor="#1890ff" />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable>
                <Statistic
                  title={<span style={{ fontSize: "16px" }}>Active Users</span>}
                  value={statistics.activeUsers}
                  prefix={<TeamOutlined style={{ color: "#52c41a" }} />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Progress percent={85} showInfo={false} strokeColor="#52c41a" />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable>
                <Statistic
                  title={<span style={{ fontSize: "16px" }}>Categories</span>}
                  value={statistics.totalCategories}
                  prefix={<TagOutlined style={{ color: "#722ed1" }} />}
                  valueStyle={{ color: "#722ed1" }}
                />
                <Progress percent={50} showInfo={false} strokeColor="#722ed1" />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable>
                <Statistic
                  title={
                    <span style={{ fontSize: "16px" }}>Pending Reports</span>
                  }
                  value={statistics.pendingReports}
                  prefix={<AlertOutlined style={{ color: "#f5222d" }} />}
                  valueStyle={{ color: "#f5222d" }}
                />
                <Progress percent={20} showInfo={false} strokeColor="#f5222d" />
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 4 }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              tabBarExtraContent={
                <Space>
                  <Search
                    placeholder="Search..."
                    style={{ width: 250 }}
                    allowClear
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setSelectedThread(null);
                      threadForm.resetFields();
                      setIsThreadModalVisible(true);
                    }}
                  >
                    New Thread
                  </Button>
                </Space>
              }
            >
              <TabPane
                tab={
                  <span>
                    <MessageOutlined />
                    Threads
                  </span>
                }
                key="1"
              >
                <div style={{ marginBottom: 16 }}>
                  <Space>
                    <Select
                      defaultValue="all"
                      style={{ width: 120 }}
                      options={[
                        { value: "all", label: "All Categories" },
                        { value: "announcements", label: "Announcements" },
                        { value: "general", label: "General" },
                        { value: "career", label: "Career" },
                        { value: "events", label: "Events" },
                      ]}
                    />
                    <Select
                      defaultValue="all"
                      style={{ width: 120 }}
                      options={[
                        { value: "all", label: "All Status" },
                        { value: "active", label: "Active" },
                        { value: "archived", label: "Archived" },
                        { value: "locked", label: "Locked" },
                      ]}
                    />
                    <Select
                      defaultValue="newest"
                      style={{ width: 120 }}
                      options={[
                        { value: "newest", label: "Newest First" },
                        { value: "oldest", label: "Oldest First" },
                        { value: "most_active", label: "Most Active" },
                      ]}
                    />
                  </Space>
                </div>
                <Table
                  size="small"
                  columns={threadColumns}
                  dataSource={threads}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                  }}
                />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <TagOutlined />
                    Categories
                  </span>
                }
                key="2"
              >
                <div style={{ marginBottom: 16 }}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    New Category
                  </Button>
                </div>
                <Table
                  size="small"
                  columns={categoryColumns}
                  dataSource={categories}
                  rowKey="id"
                />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <AlertOutlined />
                    Moderation
                  </span>
                }
                key="3"
              >
                <Card>
                  <List
                    itemLayout="vertical"
                    dataSource={threadActivities}
                    renderItem={(activity) => (
                      <List.Item
                        key={activity.id}
                        actions={[
                          <Space key="actions">
                            <Button
                              type="text"
                              icon={
                                <CheckCircleOutlined
                                  style={{ color: "#52c41a" }}
                                />
                              }
                              onClick={() => handleApproveContent(activity.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              type="text"
                              danger
                              icon={<CloseCircleOutlined />}
                              onClick={() => handleRejectContent(activity.id)}
                            >
                              Reject
                            </Button>
                            <Button
                              type="text"
                              onClick={() => {
                                setSelectedUser({
                                  userId: activity.userId,
                                  userName: activity.userName,
                                });
                                setIsModerateUserModalVisible(true);
                              }}
                            >
                              Moderate User
                            </Button>
                          </Space>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={activity.userAvatar} />}
                          title={
                            <Space>
                              <span>{activity.userName}</span>
                              <Tag
                                color={
                                  activity.status === "pending"
                                    ? "warning"
                                    : "success"
                                }
                              >
                                {activity.status}
                              </Tag>
                              {(activity.reports ?? 0) > 0 && (
                                <Tag color="error">
                                  {activity.reports} reports
                                </Tag>
                              )}
                            </Space>
                          }
                          description={formatDistanceToNow(
                            new Date(activity.timestamp),
                            { addSuffix: true }
                          )}
                        />
                        <div style={{ marginLeft: 48 }}>
                          <p>{activity.content}</p>
                          <Space style={{ marginTop: 8 }}>
                            <span>
                              <LikeOutlined /> {activity.likes} likes
                            </span>
                            <span>
                              <MessageOutlined /> {activity.replies} replies
                            </span>
                          </Space>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </Content>

      {/* Thread Activity Drawer */}
      <Drawer
        title={`Thread Activity: ${selectedThread?.title}`}
        placement="right"
        width={600}
        onClose={() => setIsActivityDrawerVisible(false)}
        open={isActivityDrawerVisible}
      >
        <Timeline
          items={threadActivities.map((activity) => ({
            color: activity.type === "comment" ? "blue" : "green",
            children: (
              <Card size="small" style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  <Space>
                    <Avatar src={activity.userAvatar} />
                    <span style={{ fontWeight: 500 }}>{activity.userName}</span>
                    <span style={{ color: "#666" }}>
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </Space>
                </div>
                <p style={{ margin: "8px 0" }}>{activity.content}</p>
                <Space split={<Divider type="vertical" />}>
                  <Space>
                    <LikeOutlined /> {activity.likes}
                  </Space>
                  <Space>
                    <MessageOutlined /> {activity.replies}
                  </Space>
                  <Button
                    type="text"
                    danger
                    onClick={() => {
                      setSelectedUser({
                        userId: activity.userId,
                        userName: activity.userName,
                      });
                      setIsModerateUserModalVisible(true);
                    }}
                  >
                    Moderate
                  </Button>
                </Space>
              </Card>
            ),
          }))}
        />
      </Drawer>

      {/* Thread Modal */}
      <Modal
        title={selectedThread ? "Edit Thread" : "Create New Thread"}
        open={isThreadModalVisible}
        onCancel={() => setIsThreadModalVisible(false)}
        footer={null}
      >
        <Form form={threadForm} layout="vertical" onFinish={handleCreateThread}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter thread title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              options={[
                { value: "announcements", label: "Announcements" },
                { value: "general", label: "General" },
                { value: "career", label: "Career" },
                { value: "events", label: "Events" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter thread content" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Add tags"
              options={[
                { value: "important", label: "Important" },
                { value: "announcement", label: "Announcement" },
                { value: "discussion", label: "Discussion" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {selectedThread ? "Update Thread" : "Create Thread"}
              </Button>
              <Button onClick={() => setIsThreadModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Moderate User Modal */}
      <Modal
        title={`Moderate User: ${selectedUser?.userName}`}
        open={isModerateUserModalVisible}
        onCancel={() => setIsModerateUserModalVisible(false)}
        footer={null}
      >
        <Form
          form={moderationForm}
          layout="vertical"
          onFinish={handleModerateUser}
        >
          <Form.Item
            name="action"
            label="Action"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="warn">
                  <Space>
                    <WarningOutlined style={{ color: "#faad14" }} />
                    Warn User
                  </Space>
                </Radio>
                <Radio value="restrict">
                  <Space>
                    <LockOutlined style={{ color: "#ff4d4f" }} />
                    Restrict Temporarily
                  </Space>
                </Radio>
                <Radio value="ban">
                  <Space>
                    <StopOutlined style={{ color: "#ff4d4f" }} />
                    Ban Permanently
                  </Space>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.action !== currentValues.action
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("action") === "restrict" && (
                <Form.Item
                  name="duration"
                  label="Restriction Duration (hours)"
                  rules={[{ required: true, message: "Please enter duration" }]}
                >
                  <InputNumber min={1} max={72} />
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" danger htmlType="submit">
                Apply Moderation
              </Button>
              <Button onClick={() => setIsModerateUserModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
