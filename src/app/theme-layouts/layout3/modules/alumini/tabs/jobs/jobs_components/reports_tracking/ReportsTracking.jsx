import React from "react";
import { useState } from "react";
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Select,
  Table,
  Button,
  Statistic,
  DatePicker,
  Space,
  Tabs,
  Avatar,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DownloadOutlined,
  CalendarOutlined,
  UserOutlined,
  MessageOutlined,
  BankOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// Mock data
const jobPostingsData = [
  { month: "Jan", jobs: 120 },
  { month: "Feb", jobs: 150 },
  { month: "Mar", jobs: 180 },
  { month: "Apr", jobs: 200 },
  { month: "May", jobs: 220 },
  { month: "Jun", jobs: 190 },
];

const jobCategoriesData = [
  { name: "Technology", value: 35 },
  { name: "Finance", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "Healthcare", value: 15 },
  { name: "Education", value: 5 },
];

const topEmployersData = [
  {
    name: "Tech Corp",
    jobs: 15,
    hires: 8,
    logo: "https://example.com/techcorp.png",
  },
  {
    name: "Finance Inc",
    jobs: 12,
    hires: 6,
    logo: "https://example.com/financeinc.png",
  },
  {
    name: "Marketing Co",
    jobs: 10,
    hires: 5,
    logo: "https://example.com/marketingco.png",
  },
  {
    name: "Health Systems",
    jobs: 8,
    hires: 4,
    logo: "https://example.com/healthsystems.png",
  },
  {
    name: "Edu Group",
    jobs: 6,
    hires: 3,
    logo: "https://example.com/edugroup.png",
  },
];

const alumniEngagementData = [
  { month: "Jan", applications: 150, hires: 15, messages: 300 },
  { month: "Feb", applications: 180, hires: 18, messages: 350 },
  { month: "Mar", applications: 200, hires: 22, messages: 400 },
  { month: "Apr", applications: 220, hires: 25, messages: 450 },
  { month: "May", applications: 250, hires: 28, messages: 500 },
  { month: "Jun", applications: 280, hires: 32, messages: 550 },
];

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"];

const ReportsTracking = () => {
  const [timeRange, setTimeRange] = useState(["", ""]);

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting reports...");
  };

  const columns = [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.logo} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Jobs Posted",
      dataIndex: "jobs",
      key: "jobs",
      sorter: (a, b) => a.jobs - b.jobs,
    },
    {
      title: "Alumni Hired",
      dataIndex: "hires",
      key: "hires",
      sorter: (a, b) => a.hires - b.hires,
    },
  ];

  return (
    <Layout className="site-layout-background" style={{ padding: "4px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Reports & Tracking</Title>
          </Col>
          <Col>
            <Space>
              <RangePicker
                onChange={(dates, dateStrings) => setTimeRange(dateStrings)}
              />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleExport}
              >
                Export Reports
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={[4, 4]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              //   bordered={false}
              className="dashboard-card"
              style={{ borderColor: "#1890ff" }}
            >
              <Statistic
                title="Job Postings"
                value={1280}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
              <Text type="secondary">
                <ArrowUpOutlined /> 15% vs last month
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              //   bordered={false}
              className="dashboard-card"
              style={{ borderColor: "#52c41a" }}
            >
              <Statistic
                title="Active Alumni"
                value={5250}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
              <Text type="secondary">
                <ArrowUpOutlined /> 8% vs last month
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              //   bordered={false}
              className="dashboard-card"
              style={{ borderColor: "#faad14" }}
            >
              <Statistic
                title="Messages Sent"
                value={15750}
                prefix={<MessageOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
              <Text type="secondary">
                <ArrowUpOutlined /> 12% vs last month
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              //   bordered={false}
              className="dashboard-card"
              style={{ borderColor: "#722ed1" }}
            >
              <Statistic
                title="Employers"
                value={320}
                prefix={<BankOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
              <Text type="secondary">
                <ArrowUpOutlined /> 5% vs last month
              </Text>
            </Card>
          </Col>
        </Row>

        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Job Postings Trend" key="1">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={jobPostingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="jobs" fill="#1890ff" name="Job Postings" />
                </BarChart>
              </ResponsiveContainer>
            </TabPane>
            <TabPane tab="Alumni Engagement" key="2">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={alumniEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="applications"
                    stroke="#1890ff"
                    activeDot={{ r: 8 }}
                    name="Applications"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="hires"
                    stroke="#52c41a"
                    name="Hires"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="messages"
                    stroke="#faad14"
                    name="Messages"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabPane>
          </Tabs>
        </Card>

        <Row gutter={[4, 4]}>
          <Col xs={24} lg={12}>
            <Card title="Job Categories Distribution" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {jobCategoriesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Top Employers" bordered={false}>
              <Table
                dataSource={topEmployersData}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </Space>

      <style>{`
        .site-layout-background {
          background: #f0f2f5;
        }
        .dashboard-card {
          border-radius: 8px;
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
            0 3px 6px 0 rgba(0, 0, 0, 0.12),
            0 5px 12px 4px rgba(0, 0, 0, 0.09);
        }
        .ant-card {
          border-radius: 8px;
        }
        .ant-tabs-nav {
          margin-bottom: 16px;
        }
      `}</style>
    </Layout>
  );
};

export default ReportsTracking;
