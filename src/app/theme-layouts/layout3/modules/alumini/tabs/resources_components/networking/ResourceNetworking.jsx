import React, { useState } from "react";
import {
  Layout,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Table,
  Avatar,
  List,
  Tooltip,
  message,
  Popconfirm,
  Switch,
  Row,
  Col,
  Tabs,
  DatePicker,
  Tag,
  Typography,
  theme,
  Breadcrumb,
  Statistic,
  Progress,
  Badge,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  BellOutlined,
  TeamOutlined,
  ShopOutlined,
  LikeOutlined,
  NotificationOutlined,
  GlobalOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  FileProtectOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Content } = Layout;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

const NetworkingCommunityAdmin = () => {
  const { token } = useToken();
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Mock data
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Class of 2020",
      members: 150,
      type: "Graduation Year",
      description: "Alumni from the graduating class of 2020",
      activity: 85,
      lastActive: "2024-03-21",
    },
    {
      id: 2,
      name: "Tech Innovators",
      members: 75,
      type: "Industry",
      description: "Group for tech industry professionals",
      activity: 92,
      lastActive: "2024-03-22",
    },
    {
      id: 3,
      name: "European Alumni",
      members: 200,
      type: "Region",
      description: "Alumni network across Europe",
      activity: 78,
      lastActive: "2024-03-20",
    },
  ]);

  const [showcases, setShowcases] = useState([
    {
      id: 1,
      name: "EcoTech Solutions",
      owner: "Jane Doe",
      industry: "Green Technology",
      status: "Active",
      engagement: 89,
      founded: "2023",
      employees: 15,
    },
    {
      id: 2,
      name: "HealthAI",
      owner: "John Smith",
      industry: "Healthcare",
      status: "Pending",
      engagement: 75,
      founded: "2024",
      employees: 8,
    },
  ]);

  const [endorsements, setEndorsements] = useState([
    {
      id: 1,
      from: "Alice Johnson",
      to: "Bob Williams",
      skill: "Project Management",
      date: "2024-03-20",
      verified: true,
    },
    {
      id: 2,
      from: "Charlie Brown",
      to: "Diana Evans",
      skill: "Data Analysis",
      date: "2024-03-21",
      verified: false,
    },
  ]);

  const [bulletins, setBulletins] = useState([
    {
      id: 1,
      title: "New Job Openings",
      category: "Career",
      date: "2024-03-25",
      priority: "High",
      views: 245,
      engagement: 89,
    },
    {
      id: 2,
      title: "Alumni Fund Donation Drive",
      category: "Fundraising",
      date: "2024-04-01",
      priority: "Medium",
      views: 189,
      engagement: 72,
    },
  ]);

  const showModal = (type, record) => {
    setModalType(type);
    setEditingRecord(record);
    if (record) {
      // Convert the founded year string to a dayjs object for the DatePicker
      const formData = { ...record };
      if (formData.founded) {
        formData.founded = dayjs(formData.founded);
      }
      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleDelete = (type, id) => {
    const updateFunctions = {
      Group: () => setGroups(groups.filter((item) => item.id !== id)),
      Showcase: () => setShowcases(showcases.filter((item) => item.id !== id)),
      Endorsement: () =>
        setEndorsements(endorsements.filter((item) => item.id !== id)),
      Bulletin: () => setBulletins(bulletins.filter((item) => item.id !== id)),
    };

    if (updateFunctions[type]) {
      updateFunctions[type]();
      message.success({
        content: `${type} deleted successfully`,
        icon: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
      });
    }
  };

  const generateReport = () => {
    const report = {
      totalShowcases: showcases.length,
      activeBusinesses: showcases.filter((s) => s.status === "Active").length,
      averageEngagement: Math.round(
        showcases.reduce((acc, curr) => acc + curr.engagement, 0) /
          showcases.length
      ),
      totalEmployees: showcases.reduce((acc, curr) => acc + curr.employees, 0),
      industries: showcases.reduce((acc, curr) => {
        acc[curr.industry] = (acc[curr.industry] || 0) + 1;
        return acc;
      }, {}),
      businesses: showcases.map((s) => ({
        name: s.name,
        owner: s.owner,
        industry: s.industry,
        status: s.status,
        engagement: s.engagement,
        founded: s.founded,
        employees: s.employees,
      })),
    };

    // Create a Blob with the report data
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `business-showcase-report-${dayjs().format(
      "YYYY-MM-DD"
    )}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    message.success({
      content: "Report generated successfully!",
      icon: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
    });
  };

  const handleSubmit = (values) => {
    const newId = Math.max(...groups.map((g) => g.id)) + 1;

    if (editingRecord) {
      switch (modalType) {
        case "Group":
          setGroups(
            groups.map((g) =>
              g.id === editingRecord.id ? { ...g, ...values } : g
            )
          );
          break;
        case "Showcase":
          setShowcases(
            showcases.map((s) =>
              s.id === editingRecord.id
                ? {
                    ...s,
                    ...values,
                    founded: values.founded
                      ? values.founded.format("YYYY")
                      : s.founded,
                  }
                : s
            )
          );
          break;
        case "Bulletin":
          setBulletins(
            bulletins.map((b) =>
              b.id === editingRecord.id ? { ...b, ...values } : b
            )
          );
          break;
      }
      message.success({
        content: `${modalType} updated successfully!`,
        icon: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
      });
    } else {
      switch (modalType) {
        case "Group":
          setGroups([
            ...groups,
            {
              ...values,
              id: newId,
              members: 0,
              activity: 0,
              lastActive: dayjs().format("YYYY-MM-DD"),
            },
          ]);
          break;
        case "Showcase":
          setShowcases([
            ...showcases,
            {
              ...values,
              id: newId,
              status: "Pending",
              engagement: 0,
              founded: values.founded
                ? values.founded.format("YYYY")
                : dayjs().format("YYYY"),
              employees: values.employees || 1,
            },
          ]);
          break;
        case "Bulletin":
          setBulletins([
            ...bulletins,
            {
              ...values,
              id: newId,
              views: 0,
              engagement: 0,
              date: dayjs(values.date).format("YYYY-MM-DD"),
            },
          ]);
          break;
      }
      message.success({
        content: `${modalType} created successfully!`,
        icon: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
      });
    }

    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "Group":
        return (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Group Name"
              rules={[{ required: true, message: "Please enter group name" }]}
            >
              <Input prefix={<TeamOutlined />} placeholder="Enter group name" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Group Type"
              rules={[{ required: true, message: "Please select group type" }]}
            >
              <Select>
                <Option value="Graduation Year">Graduation Year</Option>
                <Option value="Industry">Industry</Option>
                <Option value="Region">Region</Option>
                <Option value="Interest">Interest</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Provide a detailed description of the group"
                showCount
                maxLength={500}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={editingRecord ? <EditOutlined /> : <PlusOutlined />}
                >
                  {editingRecord ? "Update Group" : "Create Group"}
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        );

      case "Showcase":
        return (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Business Name"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<ShopOutlined />}
                placeholder="Enter business name"
              />
            </Form.Item>
            <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter owner's name"
              />
            </Form.Item>
            <Form.Item
              name="industry"
              label="Industry"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select industry">
                <Option value="Technology">Technology</Option>
                <Option value="Healthcare">Healthcare</Option>
                <Option value="Green Technology">Green Technology</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Education">Education</Option>
                <Option value="Retail">Retail</Option>
              </Select>
            </Form.Item>
            <Form.Item name="founded" label="Founded Year">
              <DatePicker picker="year" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="employees" label="Number of Employees">
              <Input type="number" prefix={<TeamOutlined />} min={1} />
            </Form.Item>
            {editingRecord && (
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="Active">Active</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            )}
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={editingRecord ? <EditOutlined /> : <PlusOutlined />}
                >
                  {editingRecord ? "Update Showcase" : "Create Showcase"}
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        );

      case "Bulletin":
        return (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input
                prefix={<NotificationOutlined />}
                placeholder="Enter bulletin title"
              />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select category">
                <Option value="Career">Career</Option>
                <Option value="Fundraising">Fundraising</Option>
                <Option value="Event">Event</Option>
                <Option value="News">News</Option>
                <Option value="Announcement">Announcement</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              label="Publication Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select priority">
                <Option value="High">
                  <Badge status="error" text="High Priority" />
                </Option>
                <Option value="Medium">
                  <Badge status="warning" text="Medium Priority" />
                </Option>
                <Option value="Low">
                  <Badge status="default" text="Low Priority" />
                </Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={editingRecord ? <EditOutlined /> : <PlusOutlined />}
                >
                  {editingRecord ? "Update Bulletin" : "Create Bulletin"}
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        );

      default:
        return null;
    }
  };

  const groupColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Space>
          <TeamOutlined style={{ color: token.colorPrimary }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members) => (
        <Tag color="blue" icon={<TeamOutlined />}>
          {members} Members
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="cyan">{type}</Tag>,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (activity) => (
        <Tooltip title={`${activity}% Active`}>
          <Progress
            percent={activity}
            size="small"
            status={
              activity >= 80
                ? "success"
                : activity >= 60
                  ? "normal"
                  : "exception"
            }
          />
        </Tooltip>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (date) => (
        <Text type="secondary">
          <CalendarOutlined /> {dayjs(date).format("MMM D, YYYY")}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Group">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => showModal("Group", record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Group"
            description="Are you sure you want to delete this group? This action cannot be undone."
            onConfirm={() => handleDelete("Group", record.id)}
            okText="Yes, Delete"
            cancelText="No, Keep It"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} type="text" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          &nbsp;
          <TeamOutlined />
          Alumni Groups
        </span>
      ),
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row gutter={[4, 4]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Groups"
                  value={groups.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: token.colorPrimary }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Members"
                  value={groups.reduce((acc, curr) => acc + curr.members, 0)}
                  prefix={<UsergroupAddOutlined />}
                  valueStyle={{ color: token.colorSuccess }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Active Groups"
                  value={groups.filter((g) => g.activity >= 60).length}
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: token.colorInfo }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Average Activity"
                  value={Math.round(
                    groups.reduce((acc, curr) => acc + curr.activity, 0) /
                      groups.length
                  )}
                  suffix="%"
                  prefix={<FileProtectOutlined />}
                  valueStyle={{ color: token.colorWarning }}
                />
              </Card>
            </Col>
          </Row>

          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => showModal("Group")}
                >
                  Create New Group
                </Button>
                <Button icon={<FileProtectOutlined />}>Export Data</Button>
              </Space>

              <Table
                columns={groupColumns}
                dataSource={groups}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} groups`,
                }}
              />
            </Space>
          </Card>
        </Space>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <ShopOutlined />
          &nbsp;Business Showcases
        </span>
      ),
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row gutter={[4, 4]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Showcases"
                  value={showcases.length}
                  prefix={<ShopOutlined />}
                  valueStyle={{ color: token.colorPrimary }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Active Businesses"
                  value={showcases.filter((s) => s.status === "Active").length}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: token.colorSuccess }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Average Engagement"
                  value={Math.round(
                    showcases.reduce((acc, curr) => acc + curr.engagement, 0) /
                      showcases.length
                  )}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: token.colorInfo }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Employees"
                  value={showcases.reduce(
                    (acc, curr) => acc + curr.employees,
                    0
                  )}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: token.colorWarning }}
                />
              </Card>
            </Col>
          </Row>

          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => showModal("Showcase")}
                >
                  Add Business Showcase
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={generateReport}
                  type="primary"
                  ghost
                >
                  Generate Report
                </Button>
              </Space>

              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={showcases}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <Card
                      title={
                        <Space>
                          <ShopOutlined style={{ color: token.colorPrimary }} />
                          {item.name}
                        </Space>
                      }
                      extra={
                        <Tag
                          color={
                            item.status === "Active" ? "success" : "warning"
                          }
                        >
                          {item.status}
                        </Tag>
                      }
                      actions={[
                        <Tooltip title="Edit" key="edit">
                          <Button
                            icon={<EditOutlined />}
                            type="text"
                            onClick={() => showModal("Showcase", item)}
                          />
                        </Tooltip>,
                        <Popconfirm
                          key="delete"
                          title="Delete Showcase"
                          description="Are you sure you want to delete this showcase? This action cannot be undone."
                          onConfirm={() => handleDelete("Showcase", item.id)}
                          okText="Yes, Delete"
                          cancelText="No, Keep It"
                          okButtonProps={{ danger: true }}
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            type="text"
                            danger
                          />
                        </Popconfirm>,
                      ]}
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Text type="secondary">
                          <UserOutlined /> Owner: {item.owner}
                        </Text>
                        <Text type="secondary">
                          <GlobalOutlined /> Industry: {item.industry}
                        </Text>
                        <Text type="secondary">
                          <CalendarOutlined /> Founded: {item.founded}
                        </Text>
                        <Text type="secondary">
                          <TeamOutlined /> Employees: {item.employees}
                        </Text>
                        <Divider style={{ margin: "8px 0" }} />
                        <Tooltip title="Engagement Score">
                          <Progress
                            percent={item.engagement}
                            size="small"
                            status={
                              item.engagement >= 80
                                ? "success"
                                : item.engagement >= 60
                                  ? "normal"
                                  : "exception"
                            }
                          />
                        </Tooltip>
                      </Space>
                    </Card>
                  </List.Item>
                )}
              />
            </Space>
          </Card>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgContainer }}>
      <Content style={{ padding: "24px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Space direction="vertical" size="small">
              <Breadcrumb
                items={[
                  { title: "Dashboard" },
                  { title: "Alumni Network" },
                  { title: "Administration" },
                ]}
              />
              <Title level={2} style={{ margin: "16px 0" }}>
                Alumni Network Administration
              </Title>
              <Paragraph type="secondary">
                Manage alumni groups, business showcases, and network activities
              </Paragraph>
            </Space>
          </Card>

          <Card>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              type="card"
              size="large"
            />
          </Card>
        </Space>
      </Content>

      <Modal
        title={
          <Space>
            {modalType === "Group" && <TeamOutlined />}
            {modalType === "Showcase" && <ShopOutlined />}
            {modalType === "Bulletin" && <NotificationOutlined />}
            {`${editingRecord ? "Edit" : "Create New"} ${modalType}`}
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={600}
      >
        {renderModalContent()}
      </Modal>
    </Layout>
  );
};

export default NetworkingCommunityAdmin;
