import React, { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Avatar,
  Tabs,
  Statistic,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tooltip,
  Descriptions,
  List,
  Divider,
} from "antd";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  TrophyIcon,
  EyeIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  CalendarIcon,
  DollarSignIcon,
  ActivityIcon,
} from "lucide-react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfileModal = ({
  isVisible,
  onClose,
  donor,
  onSendMessage,
  onAddPledge,
}) => {
  if (!donor) return null;

  function getTierColor(tier) {
    const colors = {
      Bronze: "brown",
      Silver: "gray",
      Gold: "gold",
      Platinum: "geekblue",
    };
    return colors[tier] || "default";
  }
  return (
    <Modal
      title={
        <Space>
          <UserIcon size={24} />
          <Title level={4} style={{ margin: 0 }}>
            Donor Profile
          </Title>
        </Space>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Name" span={2}>
            {donor.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space>
                <MailIcon size={16} />
                Email
              </Space>
            }
          >
            {donor.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space>
                <PhoneIcon size={16} />
                Phone
              </Space>
            }
          >
            {donor.phone}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space>
                <TrophyIcon size={16} />
                Tier
              </Space>
            }
          >
            <Tag color={getTierColor(donor.tier)}>{donor.tier}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space>
                <ActivityIcon size={16} />
                Status
              </Space>
            }
          >
            <Tag color={donor.status === "active" ? "green" : "red"}>
              {donor.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Title level={5}>Donation Summary</Title>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item
              label={
                <Space>
                  <DollarSignIcon size={16} />
                  Total Donated
                </Space>
              }
            >
              UGX {donor.totalDonated.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <CalendarIcon size={16} />
                  Last Donation
                </Space>
              }
            >
              {donor.lastDonation}
            </Descriptions.Item>
            <Descriptions.Item label="Active Pledges">
              {donor.pledges}
            </Descriptions.Item>
            <Descriptions.Item label="Communications">
              {donor.communications}
            </Descriptions.Item>
          </Descriptions>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Title level={5}>Recent Donation History</Title>
          <List
            size="small"
            bordered
            dataSource={donor.donationHistory.slice(0, 5)}
            renderItem={(item) => (
              <List.Item>
                <Space>
                  <CalendarIcon size={16} />
                  <Text>{item.date}</Text>
                </Space>
                <Space>
                  <DollarSignIcon size={16} />
                  <Text>UGX {item.amount.toLocaleString()}</Text>
                </Space>
                <Text type="secondary">{item.campaign}</Text>
              </List.Item>
            )}
          />
        </Space>

        <Divider />

        <Space>
          <Button
            type="primary"
            icon={<MailIcon size={16} />}
            onClick={() => onSendMessage(donor)}
          >
            Send Message
          </Button>
          <Button
            icon={<TrophyIcon size={16} />}
            onClick={() => onAddPledge(donor)}
          >
            Add Pledge
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

const DonorManagement = () => {
  const [donors, setDonors] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+256 701 234567",
      totalDonated: 5000000,
      tier: "Gold",
      lastDonation: "2024-03-01",
      status: "active",
      pledges: 2,
      communications: 5,
      joinDate: "2022-01-15",
      lastActivity: "2024-03-05",
      donationHistory: [
        { date: "2024-03-01", amount: 1000000, campaign: "Annual Fundraiser" },
        { date: "2023-12-15", amount: 500000, campaign: "Christmas Appeal" },
        {
          date: "2023-09-30",
          amount: 750000,
          campaign: "Back to School Drive",
        },
      ],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+256 702 345678",
      totalDonated: 2500000,
      tier: "Silver",
      lastDonation: "2024-02-15",
      status: "active",
      pledges: 1,
      communications: 3,
      joinDate: "2023-03-20",
      lastActivity: "2024-02-20",
      donationHistory: [
        {
          date: "2024-02-15",
          amount: 500000,
          campaign: "Winter Charity Drive",
        },
        {
          date: "2023-11-01",
          amount: 750000,
          campaign: "Thanksgiving Fundraiser",
        },
        {
          date: "2023-07-04",
          amount: 250000,
          campaign: "Independence Day Appeal",
        },
      ],
    },
  ]);

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isPledgeModalVisible, setIsPledgeModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const getTierColor = (tier) => {
    const colors = {
      Bronze: "brown",
      Silver: "gray",
      Gold: "gold",
      Platinum: "geekblue",
    };
    return colors[tier];
  };

  const handleViewProfile = (donor) => {
    setSelectedDonor(donor);
    setIsProfileModalVisible(true);
  };

  const handleSendMessage = (donor) => {
    setSelectedDonor(donor);
    setIsMessageModalVisible(true);
  };

  const handleAddPledge = (donor) => {
    setSelectedDonor(donor);
    setIsPledgeModalVisible(true);
  };

  const handleMessageSubmit = (values) => {
    if (selectedDonor) {
      message.success(`Message sent to ${selectedDonor.name}`);
      setIsMessageModalVisible(false);

      const updatedDonors = donors.map((donor) =>
        donor.id === selectedDonor.id
          ? { ...donor, communications: donor.communications + 1 }
          : donor
      );
      setDonors(updatedDonors);
    }
  };

  const handlePledgeSubmit = (values) => {
    if (selectedDonor) {
      message.success(
        `Pledge of UGX ${values.amount.toLocaleString()} added for ${
          selectedDonor.name
        }`
      );
      setIsPledgeModalVisible(false);

      const updatedDonors = donors.map((donor) =>
        donor.id === selectedDonor.id
          ? { ...donor, pledges: donor.pledges + 1 }
          : donor
      );
      setDonors(updatedDonors);
    }
  };

  const columns = [
    {
      title: "Donor",
      key: "donor",
      render: (record) => (
        <Space>
          <Avatar icon={<UserIcon size={15} />} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.email}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Space>
            <MailIcon size={15} />
            <Text>{record.email}</Text>
          </Space>
          <Space>
            <PhoneIcon size={15} />
            <Text>{record.phone}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Tier",
      key: "tier",
      render: (record) => (
        <Tag
          color={getTierColor(record.tier)}
          icon={<TrophyIcon size={15} style={{ marginTop: 5 }} />}
        >
          {record.tier}
        </Tag>
      ),
    },
    {
      title: "Total Donated",
      dataIndex: "totalDonated",
      key: "totalDonated",
      render: (amount) => `UGX ${amount.toLocaleString()}`,
    },
    {
      title: "Last Donation",
      dataIndex: "lastDonation",
      key: "lastDonation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Tooltip title="View Profile">
            <Button
              type="text"
              icon={<EyeIcon size={15} />}
              onClick={() => handleViewProfile(record)}
            />
          </Tooltip>
          <Tooltip title="Send Message">
            <Button
              type="text"
              icon={<MessageSquareIcon size={15} />}
              onClick={() => handleSendMessage(record)}
            />
          </Tooltip>
          <Tooltip title="Add Pledge">
            <Button
              type="text"
              icon={<PlusCircleIcon size={15} />}
              onClick={() => handleAddPledge(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Donors"
              value={donors.length}
              prefix={<UserIcon size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Pledges"
              value={donors.reduce((sum, donor) => sum + donor.pledges, 0)}
              prefix={<TrophyIcon size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Communications Sent"
              value={donors.reduce(
                (sum, donor) => sum + donor.communications,
                0
              )}
              prefix={<MailIcon size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Donations"
              value={donors.reduce((sum, donor) => sum + donor.totalDonated, 0)}
              prefix="UGX"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="all">
          <TabPane tab="All Donors" key="all">
            <Table columns={columns} dataSource={donors} rowKey="id" />
          </TabPane>
          <TabPane tab="Active Pledges" key="pledges">
            <Table
              columns={columns}
              dataSource={donors.filter((d) => d.pledges > 0)}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Top Donors" key="top">
            <Table
              columns={columns}
              dataSource={donors.filter(
                (d) => d.tier === "Gold" || d.tier === "Platinum"
              )}
              rowKey="id"
            />
          </TabPane>
        </Tabs>
      </Card>

      <ProfileModal
        isVisible={isProfileModalVisible}
        onClose={() => setIsProfileModalVisible(false)}
        donor={selectedDonor}
        onSendMessage={handleSendMessage}
        onAddPledge={handleAddPledge}
      />

      <Modal
        title="Send Message"
        visible={isMessageModalVisible}
        onCancel={() => setIsMessageModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleMessageSubmit}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your message here" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Pledge"
        visible={isPledgeModalVisible}
        onCancel={() => setIsPledgeModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handlePledgeSubmit}>
          <Form.Item
            name="amount"
            rules={[
              { required: true, message: "Please input the pledge amount!" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `UGX ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => (value || "").replace(/UGX\s?|(,*)/g, "")}
              placeholder="Enter pledge amount"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Pledge
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DonorManagement;
