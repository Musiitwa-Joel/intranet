import React, { useState, useRef, useEffect } from "react";
import {
  Layout,
  Input,
  Button,
  List,
  Avatar,
  Typography,
  Space,
  Dropdown,
  Menu,
  Badge,
  Tag,
  Modal,
  Form,
  Select,
  Tooltip,
  Divider,
  message,
  Popconfirm,
  Upload,
  Switch,
  Card,
  Empty,
} from "antd";
import {
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
  SearchOutlined,
  EllipsisOutlined,
  PushpinOutlined,
  StarOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  AudioOutlined,
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  LockOutlined,
  RobotOutlined,
  FlagOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Search } = Input;

// Sample data for conversations
const initialConversations = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    lastMessage: "When is the next alumni meetup?",
    time: "10:30 AM",
    unread: 2,
    status: "online",
    isTyping: false,
    isPinned: true,
    isStarred: true,
    type: "individual",
    role: "alumni",
    graduationYear: "2020",
  },
  {
    id: "2",
    name: "Alumni Network Group",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group",
    lastMessage: "New job opportunities posted!",
    time: "9:45 AM",
    unread: 5,
    type: "group",
    members: 156,
    isTyping: true,
  },
];

// Sample messages for a conversation
const initialMessages = [
  {
    id: "1",
    senderId: "1",
    text: "When is the next alumni meetup?",
    time: "10:30 AM",
    status: "read",
    type: "text",
  },
  {
    id: "2",
    senderId: "admin",
    text: "The next alumni meetup is scheduled for June 15th at 6 PM.",
    time: "10:32 AM",
    status: "read",
    type: "text",
  },
  {
    id: "3",
    senderId: "1",
    text: "Great! Will there be any networking sessions?",
    time: "10:33 AM",
    status: "read",
    type: "text",
  },
];

// Quick response templates
const quickResponses = [
  {
    id: "1",
    text: "Thank you for your message. I'll get back to you shortly.",
  },
  { id: "2", text: "Could you please provide more details?" },
  { id: "3", text: "Let me check and get back to you." },
];

const MessagingInterface = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isQuickResponseVisible, setIsQuickResponseVisible] = useState(false);
  const [isBroadcastModalVisible, setIsBroadcastModalVisible] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);

  const messagesEndRef = useRef(null);
  const [form] = Form.useForm();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: "admin",
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "text",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleBroadcastSubmit = (values) => {
    message.success("Broadcast message sent successfully");
    setIsBroadcastModalVisible(false);
    form.resetFields();
  };

  const handleCreateGroup = (values) => {
    message.success("Group created successfully");
    setIsGroupModalVisible(false);
    form.resetFields();
  };

  const messageActions = (msg) => (
    <Menu>
      <Menu.Item key="reply" icon={<EditOutlined />}>
        Reply
      </Menu.Item>
      <Menu.Item key="forward" icon={<SendOutlined />}>
        Forward
      </Menu.Item>
      <Menu.Item key="star" icon={<StarOutlined />}>
        Star Message
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  const conversationActions = (
    <Menu>
      <Menu.Item key="pin" icon={<PushpinOutlined />}>
        Pin Conversation
      </Menu.Item>
      <Menu.Item key="mute" icon={<BellOutlined />}>
        Mute Notifications
      </Menu.Item>
      <Menu.Item key="archive" icon={<FlagOutlined />}>
        Archive
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      {/* Left Panel - Conversations List */}
      <Layout.Sider
        width={300}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          overflow: "auto",
        }}
      >
        <div style={{ padding: "16px" }}>
          <Space direction="vertical" style={{ width: "100%" }} size={16}>
            <Search
              placeholder="Search conversations..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: "100%" }}
            />

            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => setIsBroadcastModalVisible(true)}
              >
                Broadcast
              </Button>
              <Button
                icon={<TeamOutlined />}
                onClick={() => setIsGroupModalVisible(true)}
              >
                New Group
              </Button>
            </Space>
          </Space>
        </div>

        <List
          dataSource={conversations}
          renderItem={(conversation) => (
            <List.Item
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background:
                  selectedConversation?.id === conversation.id
                    ? "#f5f5f5"
                    : "transparent",
              }}
              onClick={() => setSelectedConversation(conversation)}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    dot={conversation.status === "online"}
                    offset={[-2, 32]}
                    color="green"
                  >
                    <Avatar src={conversation.avatar} size={40} />
                  </Badge>
                }
                title={
                  <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Space>
                      <Text strong>{conversation.name}</Text>
                      {conversation.isPinned && (
                        <PushpinOutlined style={{ color: "#1890ff" }} />
                      )}
                    </Space>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {conversation.time}
                    </Text>
                  </Space>
                }
                description={
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {conversation.isTyping ? (
                        <Text type="secondary" italic>
                          typing...
                        </Text>
                      ) : (
                        conversation.lastMessage
                      )}
                    </Text>
                    <Space>
                      {conversation.type === "group" && (
                        <Tag color="blue">{conversation.members} members</Tag>
                      )}
                      {conversation.unread > 0 && (
                        <Badge
                          count={conversation.unread}
                          style={{ backgroundColor: "#1890ff" }}
                        />
                      )}
                    </Space>
                  </Space>
                }
              />
              <Dropdown overlay={conversationActions} trigger={["click"]}>
                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </List.Item>
          )}
        />
      </Layout.Sider>

      {/* Right Panel - Messages */}
      <Layout.Content style={{ display: "flex", flexDirection: "column" }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid #f0f0f0",
                background: "#fff",
              }}
            >
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Space>
                  <Avatar src={selectedConversation.avatar} size={40} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{selectedConversation.name}</Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {selectedConversation.status === "online" ? (
                        <Badge status="success" text="Online" />
                      ) : (
                        "Last seen recently"
                      )}
                    </Text>
                  </Space>
                </Space>
                <Space>
                  <Tooltip title="Voice Call">
                    <Button icon={<PhoneOutlined />} />
                  </Tooltip>
                  <Tooltip title="Video Call">
                    <Button icon={<VideoCameraOutlined />} />
                  </Tooltip>
                  <Tooltip title="Search in Conversation">
                    <Button icon={<SearchOutlined />} />
                  </Tooltip>
                  <Dropdown overlay={conversationActions}>
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </Space>
              </Space>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                padding: "16px",
                background: "#f5f5f5",
              }}
            >
              <List
                dataSource={messages}
                renderItem={(msg) => (
                  <List.Item
                    style={{
                      justifyContent:
                        msg.senderId === "admin" ? "flex-end" : "flex-start",
                      padding: "4px 0",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        background:
                          msg.senderId === "admin" ? "#1890ff" : "#fff",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        position: "relative",
                      }}
                    >
                      <Text
                        style={{
                          color: msg.senderId === "admin" ? "#fff" : "inherit",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.text}
                      </Text>
                      <div
                        style={{
                          fontSize: "12px",
                          marginTop: "4px",
                          color: msg.senderId === "admin" ? "#fff" : "#999",
                          opacity: 0.7,
                        }}
                      >
                        {msg.time}
                        {msg.senderId === "admin" && (
                          <CheckCircleOutlined style={{ marginLeft: "4px" }} />
                        )}
                      </div>
                    </div>
                    <Dropdown overlay={messageActions(msg)} trigger={["click"]}>
                      <Button
                        type="text"
                        icon={<EllipsisOutlined />}
                        style={{ opacity: 0.5 }}
                      />
                    </Dropdown>
                  </List.Item>
                )}
              />
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div
              style={{
                padding: "16px",
                background: "#fff",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Dropdown
                  overlay={
                    <Menu>
                      {quickResponses.map((response) => (
                        <Menu.Item
                          key={response.id}
                          onClick={() => setMessageInput(response.text)}
                        >
                          {response.text}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <Button icon={<RobotOutlined />} />
                </Dropdown>
                <Upload>
                  <Button icon={<PaperClipOutlined />} />
                </Upload>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onPressEnter={handleSendMessage}
                  suffix={
                    <Space>
                      <SmileOutlined style={{ cursor: "pointer" }} />
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                      />
                    </Space>
                  }
                />
              </Space.Compact>
            </div>
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Select a conversation to start messaging"
            style={{ margin: "auto" }}
          />
        )}
      </Layout.Content>

      {/* Broadcast Modal */}
      <Modal
        title="Send Broadcast Message"
        open={isBroadcastModalVisible}
        onCancel={() => setIsBroadcastModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleBroadcastSubmit}>
          <Form.Item
            name="recipients"
            label="Select Recipients"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" placeholder="Select recipient groups">
              <Select.Option value="all">All Alumni</Select.Option>
              <Select.Option value="2020">Class of 2020</Select.Option>
              <Select.Option value="2021">Class of 2021</Select.Option>
              <Select.Option value="donors">Donors</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item name="schedule">
            <Switch checkedChildren="Schedule" unCheckedChildren="Send Now" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsBroadcastModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Send Broadcast
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Group Modal */}
      <Modal
        title="Create New Group"
        open={isGroupModalVisible}
        onCancel={() => setIsGroupModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateGroup}>
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="members"
            label="Add Members"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" placeholder="Select members">
              <Select.Option value="1">John Smith</Select.Option>
              <Select.Option value="2">Sarah Johnson</Select.Option>
              <Select.Option value="3">Michael Brown</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Group Description">
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsGroupModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Group
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MessagingInterface;
