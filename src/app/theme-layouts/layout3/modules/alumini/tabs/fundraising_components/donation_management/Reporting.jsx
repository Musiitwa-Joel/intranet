import React, { useState, useEffect } from "react";
import {
  Card,
  DatePicker,
  Select,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Typography,
  Button,
  message,
  Statistic,
  Progress,
  theme,
} from "antd";
import {
  BarChartOutlined,
  PieChartOutlined,
  HeartOutlined,
  DownloadOutlined,
  FilterOutlined,
  SyncOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Reporting = () => {
  const { token } = theme.useToken();
  const [trends, setTrends] = useState([
    {
      period: "2024 Q1",
      amount: 15000000,
      donors: 150,
      campaigns: 3,
      growth: 12.5,
      successRate: 95.8,
      averageDonation: 100000,
    },
    {
      period: "2023 Q4",
      amount: 12500000,
      donors: 125,
      campaigns: 2,
      growth: 8.3,
      successRate: 93.5,
      averageDonation: 95000,
    },
    {
      period: "2023 Q3",
      amount: 11000000,
      donors: 110,
      campaigns: 2,
      growth: 5.2,
      successRate: 91.2,
      averageDonation: 92000,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [dateRange, setDateRange] = useState(null > null);

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
    refreshData(dateStrings, selectedCampaign);
  };

  const handleCampaignChange = (value) => {
    setSelectedCampaign(value);
    refreshData(dateRange, value);
  };

  const refreshData = async (dates, campaign) => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const filteredTrends = [...trends].map((trend) => ({
        ...trend,
        amount: trend.amount * (campaign === "all" ? 1 : 0.7),
        donors: trend.donors * (campaign === "all" ? 1 : 0.6),
      }));
      setTrends(filteredTrends);
    } catch (error) {
      message.error("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Report exported successfully");
      const csvContent = trends
        .map((trend) => Object.values(trend).join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "donation_report.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Failed to export report");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    message.info(`Generating ${action}...`);
    // Implement the actual functionality for each quick action here
  };

  const columns = [
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Total Donations",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: 16 }}>
            UGX {amount.toLocaleString()}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {amount > trends[1].amount ? (
              <Tag color="success" style={{ borderRadius: 3 }}>
                <RiseOutlined /> +
                {(
                  ((amount - trends[1].amount) / trends[1].amount) *
                  100
                ).toFixed(1)}
                %
              </Tag>
            ) : (
              <Tag color="error" style={{ borderRadius: 3 }}>
                <FallOutlined />{" "}
                {(
                  ((amount - trends[1].amount) / trends[1].amount) *
                  100
                ).toFixed(1)}
                %
              </Tag>
            )}
          </Text>
        </Space>
      ),
    },
    {
      title: "Donors",
      dataIndex: "donors",
      key: "donors",
      render: (donors, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: 16 }}>
            {donors}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Avg. UGX {record.averageDonation.toLocaleString()}
          </Text>
        </Space>
      ),
    },
    {
      title: "Success Rate",
      dataIndex: "successRate",
      key: "successRate",
      render: (rate) => (
        <Space direction="vertical" size={4} align="start">
          <Progress
            percent={rate}
            size="small"
            showInfo={false}
            strokeColor={token.colorSuccess}
          />
          <Text>{rate}%</Text>
        </Space>
      ),
    },
    {
      title: "Growth",
      key: "growth",
      render: (record) => (
        <Tag
          color={record.growth > 0 ? "success" : "error"}
          style={{ borderRadius: 3, padding: "0px 12px" }}
        >
          {record.growth > 0 ? <RiseOutlined /> : <FallOutlined />}{" "}
          {record.growth}%
        </Tag>
      ),
    },
  ];

  const totalRaised = trends.reduce((sum, trend) => sum + trend.amount, 0);
  const totalDonors = trends.reduce((sum, trend) => sum + trend.donors, 0);
  const activeCampaigns = trends.reduce(
    (sum, trend) => sum + trend.campaigns,
    0
  );

  useEffect(() => {
    // Initial data load
    refreshData(null, "all");
  }, []);

  return (
    <div
      style={{
        padding: 5,
        background: token.colorBgLayout,
        minHeight: "100vh",
      }}
    >
      <Space
        direction="vertical"
        size={24}
        style={{ width: "100%", gap: "6px" }}
      >
        {/* Header */}
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Space size="large">
                <Title level={4} style={{ margin: 0 }}>
                  Analytics Dashboard
                </Title>
                <Tag
                  icon={<SyncOutlined spin />}
                  color="processing"
                  style={{ borderRadius: 3, marginLeft: 8 }}
                >
                  Live Data
                </Tag>
              </Space>
            </Col>
            <Col>
              <Space size={16} wrap>
                <RangePicker
                  size="small"
                  onChange={handleDateRangeChange}
                  disabled={loading}
                  style={{ borderRadius: 3 }}
                />
                <Select
                  size="small"
                  value={selectedCampaign}
                  style={{ width: 160, borderRadius: 8 }}
                  onChange={handleCampaignChange}
                  disabled={loading}
                  suffixIcon={<FilterOutlined />}
                >
                  <Select.Option value="all">All Campaigns</Select.Option>
                  <Select.Option value="scholarship">
                    Scholarship Fund
                  </Select.Option>
                  <Select.Option value="building">Building Fund</Select.Option>
                </Select>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  loading={loading}
                  style={{ borderRadius: 3 }}
                  size="small"
                >
                  Export Report
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Key Metrics */}
        <Row gutter={4} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Donations"
                value={totalRaised}
                prefix={<DollarOutlined />}
                precision={2}
                formatter={(value) => `UGX ${value?.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Donors"
                value={totalDonors}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Success Rate"
                value={trends[0].successRate}
                precision={1}
                suffix="%"
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Campaigns"
                value={activeCampaigns}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Detailed Analysis */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <Space>
                  <BarChartOutlined style={{ color: token.colorPrimary }} />
                  <Text strong>Donation Trends</Text>
                </Space>
              }
              bordered={false}
              style={{ borderRadius: 12 }}
            >
              <Table
                size="small"
                columns={columns}
                dataSource={trends}
                rowKey="period"
                pagination={false}
                loading={loading}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8} style={{ paddingLeft: "0.1" }}>
            <Card
              title={
                <Space>
                  <PieChartOutlined
                    style={{ color: token.colorPrimary, fontSize: 22 }}
                  />
                  <Text strong style={{ fontSize: 16 }}>
                    Quick Actions
                  </Text>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={12}>
                {[
                  {
                    icon: (
                      <BarChartOutlined
                        style={{ fontSize: 20, color: token.colorPrimary }}
                      />
                    ),
                    title: "Generate Monthly Report",
                  },
                  {
                    icon: (
                      <PieChartOutlined
                        style={{ fontSize: 20, color: token.colorSuccess }}
                      />
                    ),
                    title: "Campaign Analysis",
                  },
                  {
                    icon: (
                      <HeartOutlined
                        style={{ fontSize: 20, color: token.colorWarning }}
                      />
                    ),
                    title: "Impact Summary",
                  },
                ].map((action) => (
                  <Button
                    key={action.title}
                    block
                    icon={action.icon}
                    onClick={() => handleQuickAction(action.title)}
                    loading={loading}
                    style={{
                      height: "auto",
                      padding: "14px 16px",
                      textAlign: "left",
                      borderRadius: 8,
                      background: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 12,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Text strong style={{ fontSize: 14 }}>
                      {action.title}
                    </Text>
                  </Button>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Reporting;
