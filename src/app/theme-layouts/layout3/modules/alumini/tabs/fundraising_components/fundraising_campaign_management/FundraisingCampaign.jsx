import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Tag,
  Tooltip,
  message,
  Row,
  Col,
  Statistic,
  Select,
  Divider,
  Avatar,
  DatePicker,
  Progress,
  Image,
  Tabs,
  Timeline,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  CalendarOutlined,
  BellOutlined,
  SearchOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  GiftOutlined,
  BarChartOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { stringify } from "csv-stringify/browser/esm/sync";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// Sample campaign data
const initialCampaigns = [
  {
    id: "1",
    name: "School Building Fund",
    description:
      "Raising funds for a new academic building with modern facilities",
    goal: 500000,
    raised: 325000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    category: "infrastructure",
    donors: 145,
    averageDonation: 2241.38,
    recentDonations: [
      { id: "d1", donor: "John Smith", amount: 5000, date: "2024-03-19" },
      { id: "d2", donor: "Sarah Johnson", amount: 2500, date: "2024-03-18" },
    ],
    updates: [
      {
        id: "u1",
        date: "2024-03-15",
        title: "Construction Planning Phase Complete",
        content: "Architectural plans finalized and approved by the board.",
      },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    progress: 65,
    trending: true,
    featured: true,
    urgency: "medium",
    tags: ["infrastructure", "expansion", "education"],
    team: [
      { id: "t1", name: "Michael Brown", role: "Campaign Manager" },
      { id: "t2", name: "Lisa Chen", role: "Fundraising Coordinator" },
    ],
    milestones: [
      { target: 100000, achieved: true, date: "2024-02-01" },
      { target: 250000, achieved: true, date: "2024-03-01" },
      { target: 400000, achieved: false },
    ],
    engagement: {
      shares: 234,
      likes: 567,
      comments: 89,
    },
  },
  {
    id: "2",
    name: "Scholarship Fund 2024",
    description: "Supporting bright students with financial needs",
    goal: 200000,
    raised: 175000,
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    status: "active",
    category: "education",
    donors: 89,
    averageDonation: 1966.29,
    recentDonations: [
      { id: "d3", donor: "David Wilson", amount: 3000, date: "2024-03-19" },
    ],
    updates: [
      {
        id: "u2",
        date: "2024-03-10",
        title: "First Round of Scholarships Awarded",
        content: "15 students received scholarships for the upcoming semester.",
      },
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    progress: 87.5,
    trending: true,
    featured: false,
    urgency: "high",
    tags: ["education", "scholarships", "students"],
    team: [{ id: "t3", name: "James Wilson", role: "Scholarship Coordinator" }],
    milestones: [
      { target: 50000, achieved: true, date: "2024-02-15" },
      { target: 100000, achieved: true, date: "2024-03-01" },
      { target: 150000, achieved: true, date: "2024-03-15" },
    ],
    engagement: {
      shares: 189,
      likes: 432,
      comments: 67,
    },
  },
];

const FundraisingCampaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Calculate summary statistics
  const totalRaised = filteredCampaigns.reduce(
    (sum, campaign) => sum + campaign.raised,
    0
  );
  const totalDonors = filteredCampaigns.reduce(
    (sum, campaign) => sum + campaign.donors,
    0
  );
  const activeCampaigns = filteredCampaigns.filter(
    (c) => c.status === "active"
  ).length;

  useEffect(() => {
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (filterStatus === "all" || campaign.status === filterStatus)
    );
    setFilteredCampaigns(filtered);
  }, [campaigns, searchText, filterStatus]);

  const handleCreateCampaign = () => {
    setSelectedCampaign(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    form.setFieldsValue({
      ...campaign,
      date: [moment(campaign.startDate), moment(campaign.endDate)],
      tags: campaign.tags,
    });
    setIsModalVisible(true);
  };

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailsModalVisible(true);
  };

  const handleSaveCampaign = (values) => {
    const [startDate, endDate] = values.date || [
      moment(),
      moment().add(1, "month"),
    ];
    const newCampaign = {
      ...values,
      id: selectedCampaign ? selectedCampaign.id : Date.now().toString(),
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      status: "active",
      raised: selectedCampaign ? selectedCampaign.raised : 0,
      donors: selectedCampaign ? selectedCampaign.donors : 0,
      progress: selectedCampaign ? selectedCampaign.progress : 0,
      recentDonations: selectedCampaign ? selectedCampaign.recentDonations : [],
      updates: selectedCampaign ? selectedCampaign.updates : [],
      engagement: selectedCampaign
        ? selectedCampaign.engagement
        : {
            shares: 0,
            likes: 0,
            comments: 0,
          },
      averageDonation: selectedCampaign ? selectedCampaign.averageDonation : 0,
      trending: selectedCampaign ? selectedCampaign.trending : false,
      featured: selectedCampaign ? selectedCampaign.featured : false,
      team: selectedCampaign ? selectedCampaign.team : [],
      milestones: selectedCampaign ? selectedCampaign.milestones : [],
    };

    setCampaigns((prevCampaigns) => {
      if (selectedCampaign) {
        return prevCampaigns.map((c) =>
          c.id === selectedCampaign.id ? newCampaign : c
        );
      } else {
        return [...prevCampaigns, newCampaign];
      }
    });

    message.success(
      selectedCampaign
        ? "Campaign updated successfully"
        : "Campaign created successfully"
    );
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteCampaign = (campaignId) => {
    Modal.confirm({
      title: "Delete Campaign",
      content:
        "Are you sure you want to delete this campaign? This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setCampaigns(campaigns.filter((c) => c.id !== campaignId));
        message.success("Campaign deleted successfully");
      },
    });
  };

  const columns = [
    {
      title: "Campaign",
      key: "campaign",
      render: (record) => (
        <Space>
          <Image
            src={record.image || "/placeholder.svg"}
            alt={record.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              objectFit: "cover",
            }}
            preview={false}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description.length > 60
                ? `${record.description.substring(0, 60)}...`
                : record.description}
            </Text>
            <Space size={4} style={{ marginTop: 4 }}>
              {record.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          </Space>
        </Space>
      ),
    },
    {
      title: "Progress",
      key: "progress",
      render: (record) => (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space split={<Divider type="vertical" />}>
            <Text strong>${record.raised.toLocaleString()}</Text>
            <Text type="secondary">of ${record.goal.toLocaleString()}</Text>
          </Space>
          <Progress
            percent={Math.round((record.raised / record.goal) * 100)}
            status="active"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">{record.donors} donors</Text>
            <Text type="secondary">
              Avg. ${record.averageDonation.toLocaleString()}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Timeline",
      key: "timeline",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <CalendarOutlined />
            <Text>{record.startDate}</Text>
          </Space>
          <Space>
            <ClockCircleOutlined />
            <Text>{record.endDate}</Text>
          </Space>
          <Tag
            color={
              record.urgency === "high"
                ? "red"
                : record.urgency === "medium"
                  ? "orange"
                  : "green"
            }
            style={{ marginTop: 4 }}
          >
            {record.urgency.toUpperCase()} PRIORITY
          </Tag>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Tag color={record.status === "active" ? "green" : "red"}>
            {record.status === "active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )}{" "}
            {record.status.toUpperCase()}
          </Tag>
          {record.trending && (
            <Tag color="volcano" style={{ marginTop: 4 }}>
              <RiseOutlined /> TRENDING
            </Tag>
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
          <Tooltip title="Edit Campaign">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditCampaign(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Campaign">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteCampaign(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const exportData = filteredCampaigns.map((campaign) => ({
    Name: campaign.name,
    Description: campaign.description,
    Goal: campaign.goal,
    Raised: campaign.raised,
    StartDate: campaign.startDate,
    EndDate: campaign.endDate,
    Status: campaign.status,
    Category: campaign.category,
    Donors: campaign.donors,
    AverageDonation: campaign.averageDonation,
    Progress: campaign.progress,
    Urgency: campaign.urgency,
    Tags: campaign.tags.join(", "),
  }));

  const handleExportCSV = () => {
    const csvData = stringify(exportData, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "fundraising-campaigns.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Summary Statistics */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <DollarOutlined />
                  <Text strong>Total Raised</Text>
                </Space>
              }
              value={totalRaised}
              prefix="$"
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
            <Text type="secondary">Across all campaigns</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <TeamOutlined />
                  <Text strong>Total Donors</Text>
                </Space>
              }
              value={totalDonors}
              valueStyle={{ color: "#1890ff" }}
            />
            <Text type="secondary">Supporting our cause</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={
                <Space>
                  <RiseOutlined />
                  <Text strong>Active Campaigns</Text>
                </Space>
              }
              value={activeCampaigns}
              valueStyle={{ color: "#722ed1" }}
            />
            <Text type="secondary">Currently running</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <div style={{ marginBottom: "24px" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Fundraising Campaigns
              </Title>
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreateCampaign}
                >
                  Create Campaign
                </Button>
                <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
                  Export Report
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "16px" }}
        >
          <Col span={8}>
            <Input
              placeholder="Search campaigns..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col>
            <Space>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={(value) => setFilterStatus(value)}
              >
                <Select.Option value="all">All Status</Select.Option>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">All Categories</Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="infrastructure">
                  Infrastructure
                </Select.Option>
              </Select>
              <RangePicker />
            </Space>
          </Col>
        </Row>

        {/* Campaigns Table */}
        <Table
          size="small"
          columns={columns}
          dataSource={filteredCampaigns}
          rowKey="id"
          pagination={{
            total: filteredCampaigns.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} campaigns`,
          }}
        />

        {/* Create/Edit Campaign Modal */}
        <Modal
          title={
            <Space>
              <GiftOutlined />
              {selectedCampaign ? "Edit Campaign" : "Create New Campaign"}
            </Space>
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveCampaign}>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="Campaign Name"
                  rules={[
                    { required: true, message: "Please enter campaign name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select category" },
                  ]}
                >
                  <Select>
                    <Select.Option value="education">Education</Select.Option>
                    <Select.Option value="infrastructure">
                      Infrastructure
                    </Select.Option>
                    <Select.Option value="technology">Technology</Select.Option>
                    <Select.Option value="community">Community</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="goal"
                  label="Fundraising Goal ($)"
                  rules={[
                    { required: true, message: "Please enter goal amount" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => (value || "").replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Campaign Duration"
                  rules={[
                    {
                      required: true,
                      message: "Please select campaign duration",
                    },
                  ]}
                >
                  <RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="image"
              label="Campaign Image"
              rules={[{ required: true, message: "Please enter image URL" }]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>

            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                { required: true, message: "Please add at least one tag" },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Add tags"
              >
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="infrastructure">
                  Infrastructure
                </Select.Option>
                <Select.Option value="technology">Technology</Select.Option>
                <Select.Option value="community">Community</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="urgency"
              label="Priority Level"
              rules={[
                { required: true, message: "Please select priority level" },
              ]}
            >
              <Select>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
              </Select>
            </Form.Item>

            <Divider />

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedCampaign ? "Update Campaign" : "Create Campaign"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Campaign Details Modal */}
        <Modal
          title={null}
          open={isDetailsModalVisible}
          onCancel={() => setIsDetailsModalVisible(false)}
          footer={null}
          width={1000}
          style={{ top: 20 }}
        >
          {selectedCampaign && (
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
                  <Col span={6}>
                    <Image
                      src={selectedCampaign.image || "/placeholder.svg"}
                      alt={selectedCampaign.name}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  </Col>
                  <Col span={18}>
                    <Space direction="vertical" size={8}>
                      <Space size={8}>
                        {selectedCampaign.tags.map((tag) => (
                          <Tag key={tag} color="blue">
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                      <Title level={3} style={{ margin: 0 }}>
                        {selectedCampaign.name}
                      </Title>
                      <Paragraph>{selectedCampaign.description}</Paragraph>
                      <Space split={<Divider type="vertical" />}>
                        <Text type="secondary">
                          <CalendarOutlined /> Started{" "}
                          {selectedCampaign.startDate}
                        </Text>
                        <Text type="secondary">
                          <TeamOutlined /> {selectedCampaign.donors} Donors
                        </Text>
                        <Tag
                          color={
                            selectedCampaign.status === "active"
                              ? "green"
                              : "red"
                          }
                        >
                          {selectedCampaign.status.toUpperCase()}
                        </Tag>
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                  <TabPane
                    tab={
                      <span>
                        <BarChartOutlined />
                        Overview
                      </span>
                    }
                    key="overview"
                  >
                    <Row gutter={[24, 24]}>
                      <Col span={16}>
                        <Card title="Fundraising Progress" bordered={false}>
                          <Row gutter={24}>
                            <Col span={12}>
                              <Statistic
                                title="Amount Raised"
                                value={selectedCampaign.raised}
                                prefix="$"
                                precision={2}
                              />
                              <Progress
                                percent={selectedCampaign.progress}
                                status="active"
                                strokeColor={{
                                  "0%": "#108ee9",
                                  "100%": "#87d068",
                                }}
                              />
                            </Col>
                            <Col span={12}>
                              <Statistic
                                title="Campaign Goal"
                                value={selectedCampaign.goal}
                                prefix="$"
                                precision={2}
                              />
                              <Text type="secondary">
                                $
                                {(
                                  selectedCampaign.goal -
                                  selectedCampaign.raised
                                ).toLocaleString()}{" "}
                                remaining
                              </Text>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card title="Engagement" bordered={false}>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            <Statistic
                              title="Social Shares"
                              value={selectedCampaign.engagement.shares}
                              prefix={<GlobalOutlined />}
                            />
                            <Statistic
                              title="Likes"
                              value={selectedCampaign.engagement.likes}
                              prefix={<HeartOutlined />}
                            />
                          </Space>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card title="Recent Donations" bordered={false}>
                          <Timeline>
                            {selectedCampaign.recentDonations.map(
                              (donation) => (
                                <Timeline.Item key={donation.id}>
                                  <Text strong>{donation.donor}</Text> donated{" "}
                                  <Text strong>
                                    ${donation.amount.toLocaleString()}
                                  </Text>
                                  <br />
                                  <Text type="secondary">{donation.date}</Text>
                                </Timeline.Item>
                              )
                            )}
                          </Timeline>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <TeamOutlined />
                        Team
                      </span>
                    }
                    key="team"
                  >
                    <Row gutter={[16, 16]}>
                      {selectedCampaign.team.map((member) => (
                        <Col span={8} key={member.id}>
                          <Card bordered={false}>
                            <Space>
                              <Avatar size={64} icon={<UserOutlined />} />
                              <Space direction="vertical" size={0}>
                                <Text strong>{member.name}</Text>
                                <Text type="secondary">{member.role}</Text>
                              </Space>
                            </Space>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <BellOutlined />
                        Updates
                      </span>
                    }
                    key="updates"
                  >
                    <Timeline>
                      {selectedCampaign.updates.map((update) => (
                        <Timeline.Item key={update.id}>
                          <Text strong>{update.title}</Text>
                          <br />
                          <Text>{update.content}</Text>
                          <br />
                          <Text type="secondary">{update.date}</Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <PieChartOutlined />
                        Milestones
                      </span>
                    }
                    key="milestones"
                  >
                    <Timeline>
                      {selectedCampaign.milestones.map((milestone, index) => (
                        <Timeline.Item
                          key={index}
                          color={milestone.achieved ? "green" : "blue"}
                          dot={
                            milestone.achieved ? (
                              <CheckCircleOutlined />
                            ) : (
                              <ClockCircleOutlined />
                            )
                          }
                        >
                          <Text strong>
                            ${milestone.target.toLocaleString()} Goal
                          </Text>
                          <br />
                          {milestone.achieved ? (
                            <Tag color="success">
                              Achieved on {milestone.date}
                            </Tag>
                          ) : (
                            <Tag color="processing">In Progress</Tag>
                          )}
                        </Timeline.Item>
                      ))}
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
                    setIsDetailsModalVisible(false);
                    handleEditCampaign(selectedCampaign);
                  }}
                >
                  Edit Campaign
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default FundraisingCampaigns;
