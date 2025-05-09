import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Space,
  Progress,
  Typography,
  Button,
  Dropdown,
  DatePicker,
} from "antd";
import {
  BarChartOutlined,
  RiseOutlined,
  TeamOutlined,
  SolutionOutlined,
  DollarOutlined,
  GlobalOutlined,
  DownloadOutlined,
  PieChartOutlined, // Added import
} from "@ant-design/icons";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const JobDashboard = ({
  metrics,
  industryMetrics,
  locationMetrics,
  trends,
}) => {
  const COLORS = [
    "#1890ff",
    "#13c2c2",
    "#52c41a",
    "#faad14",
    "#f5222d",
    "#722ed1",
  ];

  return (
    <div className="job-dashboard">
      <Card className="dashboard-header">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Job Management Dashboard
            </Title>
          </Col>
          <Col>
            <Space>
              <RangePicker />
              <Dropdown
                menu={{
                  items: [
                    { key: "excel", label: "Export to Excel" },
                    { key: "pdf", label: "Export to PDF" },
                    { key: "csv", label: "Export to CSV" },
                  ],
                }}
              >
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Dropdown>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[4, 4]} className="dashboard-metrics">
        <Col span={4}>
          <Card style={{ borderColor: "#1890ff" }}>
            <Statistic
              title="Total Jobs"
              value={metrics.totalJobs}
              prefix={<SolutionOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ borderColor: "#52c41a" }}>
            <Statistic
              title="Active Jobs"
              value={metrics.activeJobs}
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ borderColor: "#722ed1" }}>
            <Statistic
              title="Total Applications"
              value={metrics.totalApplications}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ borderColor: "#faad14" }}>
            <Statistic
              title="Featured Jobs"
              value={metrics.featuredJobs}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ borderColor: "#13c2c2" }}>
            <Statistic
              title="Average Salary Range"
              value={`${
                metrics.averageSalaryRange.currency
              } ${metrics.averageSalaryRange.min.toLocaleString()} - ${metrics.averageSalaryRange.max.toLocaleString()}`}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#13c2c2" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[4, 4]} className="dashboard-charts">
        <Col span={16}>
          <Card
            title={
              <Space>
                <BarChartOutlined />
                <span>Job Trends</span>
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="newJobs"
                  stackId="1"
                  stroke="#1890ff"
                  fill="#1890ff"
                  fillOpacity={0.3}
                  name="New Jobs"
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stackId="2"
                  stroke="#52c41a"
                  fill="#52c41a"
                  fillOpacity={0.3}
                  name="Applications"
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stackId="3"
                  stroke="#722ed1"
                  fill="#722ed1"
                  fillOpacity={0.3}
                  name="Views"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Space>
                <PieChartOutlined />
                <span>Job Distribution</span>
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={locationMetrics}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ type, percentage }) => `${type} (${percentage}%)`}
                >
                  {locationMetrics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Industry Analysis */}
      <Card title="Industry Analysis" className="dashboard-table">
        <Table
          size="small"
          dataSource={industryMetrics}
          columns={[
            {
              title: "Industry",
              dataIndex: "industry",
              key: "industry",
              render: (text) => <Text strong>{text}</Text>,
            },
            {
              title: "Job Count",
              dataIndex: "jobCount",
              key: "jobCount",
              sorter: (a, b) => a.jobCount - b.jobCount,
            },
            {
              title: "Applications",
              dataIndex: "applicationCount",
              key: "applicationCount",
              sorter: (a, b) => a.applicationCount - b.applicationCount,
            },
            {
              title: "Average Salary",
              dataIndex: "averageSalary",
              key: "averageSalary",
              render: (value) => `UGX ${value.toLocaleString()}`,
              sorter: (a, b) => a.averageSalary - b.averageSalary,
            },
            {
              title: "Performance",
              key: "performance",
              render: (_, record) => (
                <Progress
                  percent={Math.round(
                    (record.applicationCount / record.jobCount) * 100
                  )}
                  size="small"
                  status={
                    record.applicationCount / record.jobCount > 0.7
                      ? "success"
                      : record.applicationCount / record.jobCount > 0.3
                        ? "normal"
                        : "exception"
                  }
                />
              ),
            },
          ]}
          pagination={false}
        />
      </Card>

      <style>{`
        .job-dashboard {
          padding: 4px;
          background: #f0f2f5;
          min-height: 100vh;
        }

        .dashboard-header,
        .dashboard-metrics,
        .dashboard-charts,
        .dashboard-table {
          margin-bottom: 4px;
        }

        .ant-card {
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
            0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        .ant-statistic-title {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
        }

        .ant-statistic-content {
          font-size: 24px;
          font-weight: 600;
        }

        .ant-progress-bg {
          transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
        }
      `}</style>
    </div>
  );
};

export default JobDashboard;
