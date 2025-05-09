import React from "react";
import { useState } from "react";
import {
  Card,
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Progress,
  Space,
  Tag,
  Typography,
  Statistic,
  Row,
  Col,
  Select,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import CampaignFundAllocation from "./CampaignFundAllocation";
import DonorManagement from "./DonorManagement";
import Reporting from "./Reporting";
import PaymentHandling from "./PaymentHandling";
import DonationProcessing from "./DonationProcessing";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Dummy data for campaigns
const initialCampaigns = [
  {
    id: "1",
    name: "New Science Building Fund",
    description:
      "Fundraising for the construction of a state-of-the-art science facility",
    goal: 1000000,
    raised: 750000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    category: "Infrastructure",
    donors: 324,
    featured: true,
  },
  {
    id: "2",
    name: "Student Scholarship Fund 2024",
    description: "Supporting deserving students with financial assistance",
    goal: 500000,
    raised: 350000,
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    status: "active",
    category: "Scholarships",
    donors: 156,
    featured: true,
  },
  {
    id: "3",
    name: "Alumni Sports Complex",
    description:
      "Upgrading athletic facilities for current and future students",
    goal: 750000,
    raised: 200000,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    status: "active",
    category: "Athletics",
    donors: 89,
    featured: false,
  },
];

// Dummy data for donations
const initialDonations = [
  {
    id: "1",
    campaignId: "1",
    donorName: "John Smith",
    amount: 5000,
    date: "2024-02-15",
    paymentMethod: "Credit Card",
    status: "completed",
    anonymous: false,
  },
  {
    id: "2",
    campaignId: "2",
    donorName: "Anonymous",
    amount: 10000,
    date: "2024-02-16",
    paymentMethod: "Bank Transfer",
    status: "completed",
    anonymous: true,
  },
];

const Fundraising = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [donations, setDonations] = useState(initialDonations);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form] = Form.useForm();

  // Calculate total statistics
  const totalRaised = campaigns.reduce(
    (sum, campaign) => sum + campaign.raised,
    0
  );
  const totalDonors = campaigns.reduce(
    (sum, campaign) => sum + campaign.donors,
    0
  );
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    form.setFieldsValue({
      ...campaign,
      dateRange: [dayjs(campaign.startDate), dayjs(campaign.endDate)],
    });
    setIsModalVisible(true);
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

  const handleSaveCampaign = (values) => {
    try {
      const [startDate, endDate] = values.dateRange || [];
      if (!startDate || !endDate) {
        message.error("Please select valid dates");
        return;
      }

      const newCampaign = {
        ...values,
        id: editingCampaign?.id || Date.now().toString(),
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        raised: editingCampaign?.raised || 0,
        donors: editingCampaign?.donors || 0,
        status: "active",
      };

      if (editingCampaign) {
        setCampaigns(
          campaigns.map((c) => (c.id === editingCampaign.id ? newCampaign : c))
        );
        message.success("Campaign updated successfully");
      } else {
        setCampaigns([...campaigns, newCampaign]);
        message.success("Campaign created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingCampaign(null);
    } catch (error) {
      console.error("Error saving campaign:", error);
      message.error("An error occurred while saving the campaign");
    }
  };

  const campaignColumns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" className="text-sm">
            {record.category}
          </Text>
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
          />
          <Space>
            <Text type="secondary">
              UGX {record.raised.toLocaleString()} of UGX
              {record.goal.toLocaleString()}
            </Text>
            <Text type="secondary">({record.donors} donors)</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.startDate}</Text>
          <Text type="secondary">to</Text>
          <Text>{record.endDate}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status === "active" ? (
            <CheckCircleOutlined />
          ) : (
            <ClockCircleOutlined />
          )}{" "}
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditCampaign(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCampaign(record.id)}
          />
        </Space>
      ),
    },
  ];

  const donationColumns = [
    {
      title: "Donor",
      dataIndex: "donorName",
      key: "donorName",
    },
    {
      title: "Campaign",
      key: "campaign",
      render: (record) => {
        const campaign = campaigns.find((c) => c.id === record.campaignId);
        return campaign?.name || "Unknown Campaign";
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `UGX ${amount.toLocaleString()}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "green" : "gold"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        {/* <Title level={3}>Fundraising Dashboard</Title> */}

        {/* Statistics Cards */}
        <Row gutter={[4, 4]} className="mb-6">
          <Col span={8}>
            <Card style={{ borderColor: "ActiveBorder" }}>
              <Statistic
                title="Total Raised"
                value={totalRaised}
                prefix={<DollarOutlined />}
                precision={2}
                formatter={(value) => `UGX ${value?.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ borderColor: "ActiveBorder" }}>
              <Statistic
                title="Total Donors"
                value={totalDonors}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ borderColor: "ActiveBorder" }}>
              <Statistic
                title="Active Campaigns"
                value={activeCampaigns}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="campaigns">
          <TabPane tab="Donation Processing" key="donations_processing">
            {/* <div className="mb-4">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingCampaign(null);
                  form.resetFields();
                  setIsModalVisible(true);
                }}
              >
                Create Campaign
              </Button>
            </div>
            <Table
              columns={campaignColumns}
              dataSource={campaigns}
              rowKey="id"
            /> */}
            <DonationProcessing />
          </TabPane>

          <TabPane tab="Payment Handling" key="payment_handling">
            <PaymentHandling />
          </TabPane>
          <TabPane
            tab="Campaign & Fund Allocation"
            key="campaign_fund_allocation"
          >
            <CampaignFundAllocation />
          </TabPane>
          <TabPane tab="Donor Management" key="donor_management">
            <DonorManagement />
          </TabPane>
          <TabPane tab="Reporting & Analytics" key="reporting_analytics">
            <Reporting />
          </TabPane>
        </Tabs>

        <Modal
          title={editingCampaign ? "Edit Campaign" : "Create Campaign"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingCampaign(null);
          }}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveCampaign}>
            <Form.Item
              name="name"
              label="Campaign Name"
              rules={[
                { required: true, message: "Please enter campaign name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter campaign description",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select>
                <Select.Option value="Infrastructure">
                  Infrastructure
                </Select.Option>
                <Select.Option value="Scholarships">Scholarships</Select.Option>
                <Select.Option value="Research">Research</Select.Option>
                <Select.Option value="Athletics">Athletics</Select.Option>
                <Select.Option value="Technology">Technology</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="goal"
                  label="Fundraising Goal (UGX)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter fundraising goal",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `UGX ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      (value || "").replace(/\UGX\s?|(,*)/g, "")
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateRange"
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

            <Form.Item name="featured" valuePropName="checked">
              <Select placeholder="Featured Status" defaultValue={false}>
                <Select.Option value={true}>Featured Campaign</Select.Option>
                <Select.Option value={false}>Regular Campaign</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingCampaign ? "Update Campaign" : "Create Campaign"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingCampaign(null);
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Fundraising;
