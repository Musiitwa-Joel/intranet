import React from "react";
import {
  Card,
  Table,
  Progress,
  Space,
  Typography,
  Button,
  Tag,
  Modal,
  Form,
  InputNumber,
  Select,
  Row,
  Col,
  Statistic,
  Alert,
  Divider,
} from "antd";
import {
  PieChart,
  BarChart3Icon,
  TrendingUpIcon,
  BanknoteIcon,
  ArrowRightIcon,
  PiggyBankIcon,
  PercentIcon,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;

const CampaignFundAllocation = () => {
  const [campaigns, setCampaigns] = React.useState([
    {
      id: "1",
      name: "Scholarship Fund",
      goal: 1000000,
      raised: 750000,
      allocation: "Restricted",
      status: "active",
      allocatedAmount: 500000,
      remainingAmount: 250000,
      utilizationRate: 66.7,
      lastAllocation: "2024-03-01",
    },
    {
      id: "2",
      name: "Building Fund",
      goal: 2000000,
      raised: 1500000,
      allocation: "Unrestricted",
      status: "active",
      allocatedAmount: 1000000,
      remainingAmount: 500000,
      utilizationRate: 75,
      lastAllocation: "2024-03-10",
    },
  ]);

  const [allocationHistory] = React.useState([
    {
      id: "1",
      campaignId: "1",
      amount: 200000,
      date: "2024-03-01",
      purpose: "Student Scholarships Q1",
      status: "completed",
    },
    {
      id: "2",
      campaignId: "1",
      amount: 300000,
      date: "2024-02-15",
      purpose: "Emergency Student Aid",
      status: "completed",
    },
  ]);

  const [isAllocationModalVisible, setIsAllocationModalVisible] =
    React.useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const [selectedCampaign, setSelectedCampaign] = React.useState(null);
  const [form] = Form.useForm();

  const handleAllocateFunds = (campaign) => {
    setSelectedCampaign(campaign);
    setIsAllocationModalVisible(true);
    form.resetFields();
  };

  const handleViewReport = (campaign) => {
    setSelectedCampaign(campaign);
    setIsReportModalVisible(true);
  };

  const handleAllocationSubmit = (values) => {
    if (!selectedCampaign) return;

    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === selectedCampaign.id) {
        return {
          ...campaign,
          allocatedAmount: campaign.allocatedAmount + values.amount,
          remainingAmount: campaign.remainingAmount - values.amount,
          lastAllocation: new Date().toISOString().split("T")[0],
          utilizationRate:
            ((campaign.allocatedAmount + values.amount) / campaign.raised) *
            100,
        };
      }
      return campaign;
    });

    setCampaigns(updatedCampaigns);
    setIsAllocationModalVisible(false);
    Modal.success({
      title: "Funds Allocated Successfully",
      content: `UGX ${values.amount.toLocaleString()} has been allocated to ${
        selectedCampaign.name
      }`,
    });
  };

  const columns = [
    {
      title: "Campaign",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space direction="vertical" size={1}>
          <Text strong>{text}</Text>
          <Tag
            color={record.allocation === "Restricted" ? "blue" : "green"}
            className="rounded-full"
          >
            {record.allocation}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Progress",
      key: "progress",
      render: (record) => (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Progress
            percent={Math.round((record.raised / record.goal) * 100)}
            status="active"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary" className="text-xs">
              Raised: UGX {record.raised.toLocaleString()}
            </Text>
            <Text type="secondary" className="text-xs">
              Goal: UGX {record.goal.toLocaleString()}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Fund Utilization",
      key: "utilization",
      render: (record) => (
        <Space direction="vertical" size={1} className="w-full">
          <Progress
            percent={record.utilizationRate}
            size="small"
            status={record.utilizationRate > 80 ? "exception" : "active"}
          />
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary" className="text-xs">
              Allocated: UGX {record.allocatedAmount.toLocaleString()}
            </Text>
            <Text type="secondary" className="text-xs">
              Available: UGX {record.remainingAmount.toLocaleString()}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            icon={<PieChart className="w-4 h-4" />}
            onClick={() => handleAllocateFunds(record)}
            disabled={record.remainingAmount <= 0}
          >
            Allocate Funds
          </Button>
          <Button
            type="default"
            icon={<BarChart3Icon className="w-4 h-4" />}
            onClick={() => handleViewReport(record)}
          >
            View Report
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <Row gutter={[4, 4]}>
        <Col span={8}>
          <Card
            style={{ transition: "box-shadow 0.3s", borderColor: "#3b82f6" }}
          >
            <Statistic
              title={
                <Space>
                  <Text strong>Total Funds</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#3b82f6" }}
                  />
                </Space>
              }
              value={campaigns.reduce(
                (sum, campaign) => sum + campaign.raised,
                0
              )}
              prefix={<BanknoteIcon style={{ width: 16, height: 16 }} />}
              formatter={(value) => `UGX ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ transition: "box-shadow 0.3s", borderColor: "#10b981" }}
          >
            <Statistic
              title={
                <Space>
                  <Text strong>Available for Allocation</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#10b981" }}
                  />
                </Space>
              }
              value={campaigns.reduce(
                (sum, campaign) => sum + campaign.remainingAmount,
                0
              )}
              prefix={<PiggyBankIcon style={{ width: 16, height: 16 }} />}
              formatter={(value) => `UGX ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ transition: "box-shadow 0.3s", borderColor: "#8b5cf6" }}
          >
            <Statistic
              title={
                <Space>
                  <Text strong>Average Utilization</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#8b5cf6" }}
                  />
                </Space>
              }
              value={
                campaigns.reduce(
                  (sum, campaign) => sum + campaign.utilizationRate,
                  0
                ) / campaigns.length
              }
              prefix={<PercentIcon style={{ width: 16, height: 16 }} />}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <Card>
        <Title level={4}>Campaign & Fund Allocation</Title>
        <Table columns={columns} dataSource={campaigns} rowKey="id" />
      </Card>

      {/* Fund Allocation Modal */}
      <Modal
        title={`Allocate Funds - ${selectedCampaign?.name}`}
        open={isAllocationModalVisible}
        onCancel={() => setIsAllocationModalVisible(false)}
        footer={null}
      >
        {selectedCampaign && (
          <Form form={form} layout="vertical" onFinish={handleAllocationSubmit}>
            <Alert
              message="Available Funds"
              description={`UGX ${selectedCampaign.remainingAmount.toLocaleString()} available for allocation`}
              type="info"
              showIcon
              className="mb-4"
            />

            <Form.Item
              name="amount"
              label="Allocation Amount"
              rules={[
                { required: true, message: "Please enter allocation amount" },
                {
                  type: "number",
                  max: selectedCampaign.remainingAmount,
                  message: "Amount cannot exceed available funds",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `UGX ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => (value || "").replace(/UGX\s?|(,*)/g, "")}
                min={1}
                max={selectedCampaign.remainingAmount}
              />
            </Form.Item>

            <Form.Item
              name="purpose"
              label="Purpose"
              rules={[
                { required: true, message: "Please specify the purpose" },
              ]}
            >
              <Select>
                <Select.Option value="scholarships">
                  Student Scholarships
                </Select.Option>
                <Select.Option value="infrastructure">
                  Infrastructure Development
                </Select.Option>
                <Select.Option value="research">Research Grants</Select.Option>
                <Select.Option value="emergency">Emergency Aid</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space className="w-full justify-end">
                <Button onClick={() => setIsAllocationModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Allocate Funds
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Report Modal */}
      <Modal
        title={`Fund Allocation Report - ${selectedCampaign?.name}`}
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<BarChart3Icon className="w-4 h-4" />}
          >
            Download Report
          </Button>,
        ]}
        width={800}
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Total Raised"
                  value={selectedCampaign.raised}
                  formatter={(value) => `UGX ${value.toLocaleString()}`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Allocated"
                  value={selectedCampaign.allocatedAmount}
                  formatter={(value) => `UGX ${value.toLocaleString()}`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Utilization Rate"
                  value={selectedCampaign.utilizationRate}
                  suffix="%"
                  precision={1}
                />
              </Col>
            </Row>

            <div>
              <Title level={5}>Recent Allocations</Title>
              <Table
                dataSource={allocationHistory.filter(
                  (h) => h.campaignId === selectedCampaign.id
                )}
                columns={[
                  {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    render: (amount) => `UGX ${amount.toLocaleString()}`,
                  },
                  {
                    title: "Purpose",
                    dataIndex: "purpose",
                    key: "purpose",
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => (
                      <Tag
                        color={
                          status === "completed" ? "success" : "processing"
                        }
                      >
                        {status.toUpperCase()}
                      </Tag>
                    ),
                  },
                ]}
                pagination={false}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CampaignFundAllocation;
