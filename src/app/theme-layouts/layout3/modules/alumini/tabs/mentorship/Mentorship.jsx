import React, { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tabs,
  Badge,
  Space,
  Tag,
  Progress,
  List,
  Avatar,
  message,
  Timeline,
  theme,
  Divider,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  MessageOutlined,
  ScheduleOutlined,
  StarOutlined,
  FileTextOutlined,
  GlobalOutlined,
  BookOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Header, Content } = Layout;
const { useToken } = theme;

function App() {
  const { token } = useToken();
  const [activeTab, setActiveTab] = useState("1");
  const [programModal, setProgramModal] = useState(false);
  const [matchModal, setMatchModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [form] = Form.useForm();

  // Mock data with more realistic content
  const [programs, setPrograms] = useState([
    {
      id: "1",
      name: "Tech Leadership 2024",
      description:
        "Comprehensive mentorship program focused on developing technical leadership skills, including system design, team management, and strategic planning.",
      goals: ["Develop leadership skills", "Network building", "Career growth"],
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      participants: 24,
      progress: 75,
    },
    {
      id: "2",
      name: "Women in Tech",
      description:
        "Empowering women in technology through structured mentorship, focusing on career advancement and technical skill development.",
      goals: ["Career advancement", "Skill development", "Networking"],
      startDate: "2024-02-01",
      endDate: "2024-08-31",
      status: "active",
      participants: 32,
      progress: 45,
    },
  ]);

  const [participants, setParticipants] = useState([
    {
      id: "1",
      name: "John Doe",
      role: "mentor",
      industry: "Software Development",
      skills: ["Leadership", "React", "System Design"],
      email: "john@example.com",
      matchStatus: "matched",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "mentee",
      industry: "Data Science",
      skills: ["Python", "Machine Learning", "Statistics"],
      email: "sarah@example.com",
      matchStatus: "pending",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ]);

  // Program Management
  const handleDeleteProgram = (programId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this program?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setPrograms(programs.filter((program) => program.id !== programId));
        message.success("Program deleted successfully");
      },
    });
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    form.setFieldsValue({
      name: program.name,
      description: program.description,
      goals: program.goals,
      duration: [dayjs(program.startDate), dayjs(program.endDate)],
    });
    setProgramModal(true);
  };

  const programColumns = [
    {
      title: "Program Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "active" ? "green" : status === "draft" ? "gold" : "blue"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (participants) => (
        <Space>
          <TeamOutlined style={{ color: token.colorPrimary }} />
          {participants}
        </Space>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => (
        <Progress
          percent={progress}
          size="small"
          status="active"
          strokeColor={token.colorPrimary}
        />
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Start: {record.startDate}
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            End: {record.endDate}
          </Text>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditProgram(record)}
          >
            Edit
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProgram(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Participant Management
  const handleDeleteParticipant = (participantId) => {
    Modal.confirm({
      title: "Are you sure you want to remove this participant?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setParticipants(participants.filter((p) => p.id !== participantId));
        message.success("Participant removed successfully");
      },
    });
  };

  const participantColumns = [
    {
      title: "Participant",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <Text strong>{text}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.email}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={role === "mentor" ? "blue" : "green"}
          icon={role === "mentor" ? <StarOutlined /> : <UserOutlined />}
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      render: (industry) => (
        <Tag color="purple" icon={<ApartmentOutlined />}>
          {industry}
        </Tag>
      ),
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <Space wrap>
          {skills.map((skill) => (
            <Tag
              key={skill}
              color="processing"
              style={{ borderRadius: "12px" }}
            >
              {skill}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Match Status",
      dataIndex: "matchStatus",
      key: "matchStatus",
      render: (status) => (
        <Badge
          status={
            status === "matched"
              ? "success"
              : status === "pending"
                ? "processing"
                : "default"
          }
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={() => message.info("Messaging feature coming soon!")}
          >
            Message
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteParticipant(record.id)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const handleCreateProgram = (values) => {
    const newProgram = {
      id: String(programs.length + 1),
      name: values.name,
      description: values.description,
      goals: values.goals,
      startDate: values.duration[0].format("YYYY-MM-DD"),
      endDate: values.duration[1].format("YYYY-MM-DD"),
      status: "active",
      participants: 0,
      progress: 0,
    };

    if (editingProgram) {
      setPrograms(
        programs.map((p) =>
          p.id === editingProgram.id ? { ...p, ...newProgram } : p
        )
      );
      message.success("Program updated successfully");
    } else {
      setPrograms([...programs, newProgram]);
      message.success("Program created successfully");
    }

    setProgramModal(false);
    setEditingProgram(null);
    form.resetFields();
  };

  const handleCreateMatch = (values) => {
    const mentor = participants.find((p) => p.id === values.mentor);
    const mentee = participants.find((p) => p.id === values.mentee);

    if (mentor && mentee) {
      setParticipants(
        participants.map((p) => {
          if (p.id === mentor.id || p.id === mentee.id) {
            return { ...p, matchStatus: "matched" };
          }
          return p;
        })
      );

      message.success("Match created successfully");
      setMatchModal(false);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Space>
          <BarChartOutlined />
          Dashboard
        </Space>
      ),
      children: (
        <div style={{ padding: "0px 0" }}>
          <Row gutter={[4, 4]}>
            <Col span={6}>
              <Card hoverable className="dashboard-card">
                <Statistic
                  title={<Text strong>Active Programs</Text>}
                  value={programs.length}
                  prefix={
                    <BookOutlined style={{ color: token.colorPrimary }} />
                  }
                  valueStyle={{ color: token.colorPrimary }}
                />
                <Text type="secondary">Currently running</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable className="dashboard-card">
                <Statistic
                  title={<Text strong>Total Participants</Text>}
                  value={participants.length}
                  prefix={
                    <TeamOutlined style={{ color: token.colorSuccess }} />
                  }
                  valueStyle={{ color: token.colorSuccess }}
                />
                <Text type="secondary">Across all programs</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable className="dashboard-card">
                <Statistic
                  title={<Text strong>Successful Matches</Text>}
                  value={
                    participants.filter((p) => p.matchStatus === "matched")
                      .length
                  }
                  prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Text type="secondary">Active partnerships</Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable className="dashboard-card">
                <Statistic
                  title={<Text strong>Average Progress</Text>}
                  value={Math.round(
                    programs.reduce((acc, curr) => acc + curr.progress, 0) /
                      programs.length
                  )}
                  suffix="%"
                  prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
                  valueStyle={{ color: "#faad14" }}
                />
                <Text type="secondary">Program success</Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[4, 4]} style={{ marginTop: "4px" }}>
            <Col span={16}>
              <Card
                title={
                  <Space>
                    <BookOutlined style={{ color: token.colorPrimary }} />
                    <Text strong>Active Programs</Text>
                  </Space>
                }
                extra={
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setProgramModal(true)}
                  >
                    New Program
                  </Button>
                }
                className="program-card"
              >
                <Table
                  size="small"
                  dataSource={programs}
                  columns={programColumns}
                  pagination={{ pageSize: 5 }}
                  style={{ marginTop: "12px" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <Space>
                    <RiseOutlined style={{ color: token.colorPrimary }} />
                    <Text strong>Recent Activities</Text>
                  </Space>
                }
                className="activity-card"
              >
                <Timeline
                  items={[
                    {
                      color: "green",
                      children: (
                        <Space direction="vertical" size={0}>
                          <Text strong>New program launched</Text>
                          <Text type="secondary">
                            Tech Leadership 2024 started successfully
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            2 hours ago
                          </Text>
                        </Space>
                      ),
                    },
                    {
                      color: "blue",
                      children: (
                        <Space direction="vertical" size={0}>
                          <Text strong>New match created</Text>
                          <Text type="secondary">
                            John Doe matched with Sarah Chen
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            5 hours ago
                          </Text>
                        </Space>
                      ),
                    },
                    {
                      color: "gold",
                      children: (
                        <Space direction="vertical" size={0}>
                          <Text strong>Program milestone reached</Text>
                          <Text type="secondary">
                            Women in Tech program reached 45% completion
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            1 day ago
                          </Text>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <BookOutlined />
          Programs
        </Space>
      ),
      children: (
        <Card
          title={
            <Space>
              <BookOutlined style={{ color: token.colorPrimary }} />
              <Text strong>Program Management</Text>
            </Space>
          }
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setProgramModal(true)}
            >
              Create Program
            </Button>
          }
          className="program-management-card"
        >
          <Table
            size="small"
            dataSource={programs}
            columns={programColumns}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      ),
    },
    {
      key: "3",
      label: (
        <Space>
          <UsergroupAddOutlined />
          Participants
        </Space>
      ),
      children: (
        <Card
          title={
            <Space>
              <UsergroupAddOutlined style={{ color: token.colorPrimary }} />
              <Text strong>Participant Management</Text>
            </Space>
          }
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() =>
                message.info("Participant registration form coming soon!")
              }
            >
              Add Participant
            </Button>
          }
          className="participant-card"
        >
          <Table
            size="small"
            dataSource={participants}
            columns={participantColumns}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      ),
    },
    {
      key: "4",
      label: (
        <Space>
          <TeamOutlined />
          Matching
        </Space>
      ),
      children: (
        <Card
          title={
            <Space>
              <TeamOutlined style={{ color: token.colorPrimary }} />
              <Text strong>Mentor-Mentee Matching</Text>
            </Space>
          }
          className="matching-card"
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setMatchModal(true)}
              >
                Create New Match
              </Button>
            </Col>
            <Col span={24}>
              <Table
                size="small"
                dataSource={participants.filter(
                  (p) => p.matchStatus !== "matched"
                )}
                columns={participantColumns}
                pagination={{ pageSize: 10 }}
              />
            </Col>
          </Row>
        </Card>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0px" }}>
        <Card style={{ marginBottom: "4px" }}>
          <Row gutter={[16, 16]} align="middle">
            <Col flex="auto">
              <Title level={4} style={{ margin: 0 }}>
                Welcome to the Mentorship Platform
              </Title>
              <Paragraph type="secondary" style={{ margin: "8px 0 0 0" }}>
                Manage and track mentorship programs, participants, and progress
                all in one place.
              </Paragraph>
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setProgramModal(true)}
                >
                  New Program
                </Button>
                <Button
                  icon={<TeamOutlined />}
                  onClick={() => setMatchModal(true)}
                >
                  Create Match
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Tabs
            activeKey={activeTab}
            items={items}
            onChange={setActiveTab}
            type="card"
            size="large"
            style={{ marginBottom: "24px" }}
          />
        </Card>

        {/* Create/Edit Program Modal */}
        <Modal
          title={
            <Space>
              <BookOutlined style={{ color: token.colorPrimary }} />
              <Text strong>
                {editingProgram ? "Edit Program" : "Create New Program"}
              </Text>
            </Space>
          }
          open={programModal}
          onCancel={() => {
            setProgramModal(false);
            setEditingProgram(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProgram}
            style={{ marginTop: "24px" }}
          >
            <Form.Item
              name="name"
              label="Program Name"
              rules={[{ required: true, message: "Please enter program name" }]}
            >
              <Input placeholder="Enter program name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter program description" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter program description" />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Program Duration"
              rules={[
                { required: true, message: "Please select program duration" },
              ]}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="goals"
              label="Program Goals"
              rules={[
                { required: true, message: "Please add at least one goal" },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Add program goals"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<CheckCircleOutlined />}
                >
                  {editingProgram ? "Update Program" : "Create Program"}
                </Button>
                <Button
                  onClick={() => {
                    setProgramModal(false);
                    setEditingProgram(null);
                    form.resetFields();
                  }}
                  icon={<CloseOutlined />}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Matching Modal */}
        <Modal
          title={
            <Space>
              <TeamOutlined style={{ color: token.colorPrimary }} />
              <Text strong>Create New Match</Text>
            </Space>
          }
          open={matchModal}
          onCancel={() => setMatchModal(false)}
          footer={null}
          width={600}
        >
          <Form
            layout="vertical"
            onFinish={handleCreateMatch}
            style={{ marginTop: "24px" }}
          >
            <Form.Item
              name="program"
              label="Select Program"
              rules={[{ required: true, message: "Please select a program" }]}
            >
              <Select placeholder="Choose a program">
                {programs.map((program) => (
                  <Select.Option key={program.id} value={program.id}>
                    {program.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="mentor"
              label="Select Mentor"
              rules={[{ required: true, message: "Please select a mentor" }]}
            >
              <Select placeholder="Choose a mentor">
                {participants
                  .filter(
                    (p) => p.role === "mentor" && p.matchStatus !== "matched"
                  )
                  .map((mentor) => (
                    <Select.Option key={mentor.id} value={mentor.id}>
                      {mentor.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="mentee"
              label="Select Mentee"
              rules={[{ required: true, message: "Please select a mentee" }]}
            >
              <Select placeholder="Choose a mentee">
                {participants
                  .filter(
                    (p) => p.role === "mentee" && p.matchStatus !== "matched"
                  )
                  .map((mentee) => (
                    <Select.Option key={mentee.id} value={mentee.id}>
                      {mentee.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<CheckCircleOutlined />}
                >
                  Create Match
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => setMatchModal(false)}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}

export default App;
