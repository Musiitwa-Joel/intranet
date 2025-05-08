import React from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  Modal,
  Alert,
  DatePicker,
  Divider,
  Avatar,
} from "antd";
import {
  HeartIcon,
  CalendarIcon,
  UserIcon,
  EyeOffIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  EditIcon,
  TrashIcon,
  AlertCircleIcon,
  MailIcon,
  PhoneIcon,
  BanknoteIcon,
  ChevronRightIcon,
  GiftIcon,
  CalendarDaysIcon,
  BuildingIcon,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const DonationProcessing = () => {
  const [donations, setDonations] = React.useState([
    {
      id: "DON001",
      amount: 500000,
      type: "one-time",
      status: "pending",
      donor: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+256 701 234567",
      },
      campaign: "Scholarship Fund",
      createdAt: "2024-03-15",
      anonymous: false,
    },
    {
      id: "DON002",
      amount: 1000000,
      type: "recurring",
      status: "approved",
      donor: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+256 702 345678",
      },
      campaign: "Building Fund",
      frequency: "monthly",
      nextPayment: "2024-04-15",
      createdAt: "2024-03-15",
      anonymous: false,
    },
    {
      id: "DON003",
      amount: 2500000,
      type: "pledge",
      status: "processing",
      donor: {
        name: "Anonymous Donor",
        email: "anonymous@example.com",
        phone: "+256 703 456789",
      },
      campaign: "General Fund",
      createdAt: "2024-03-14",
      anonymous: true,
    },
  ]);

  const [selectedDonation, setSelectedDonation] = React.useState(null > null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] =
    React.useState(false);
  const [isProcessModalVisible, setIsProcessModalVisible] =
    React.useState(false);
  const [form] = Form.useForm();

  const totalPending = donations.filter((d) => d.status === "pending").length;
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const recurringDonations = donations.filter(
    (d) => d.type === "recurring"
  ).length;
  const pledges = donations.filter((d) => d.type === "pledge").length;

  const getStatusColor = (status) => {
    const colors = {
      pending: "warning",
      approved: "success",
      rejected: "error",
      processing: "processing",
    };
    return colors[status];
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <ClockIcon style={{ width: 16, height: 16 }} />,
      approved: <CheckCircleIcon style={{ width: 16, height: 16 }} />,
      rejected: <XCircleIcon style={{ width: 16, height: 16 }} />,
      processing: <AlertCircleIcon style={{ width: 16, height: 16 }} />,
    };
    return icons[status];
  };

  const getDonationTypeIcon = (type) => {
    const icons = {
      "one-time": <GiftIcon style={{ width: 16, height: 16 }} />,
      recurring: <CalendarDaysIcon style={{ width: 16, height: 16 }} />,
      pledge: <BuildingIcon style={{ width: 16, height: 16 }} />,
    };
    return icons[type];
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setIsDetailsModalVisible(true);
  };

  const handleProcessDonation = (donation) => {
    setSelectedDonation(donation);
    setIsProcessModalVisible(true);
  };

  const handleProcessSubmit = (values) => {
    if (!selectedDonation) return;

    const updatedDonations = donations.map((d) => {
      if (d.id === selectedDonation.id) {
        return {
          ...d,
          status: values.action,
          notes: values.notes,
        };
      }
      return d;
    });

    setDonations(updatedDonations);
    setIsProcessModalVisible(false);
    Modal.success({
      title: "Donation Processed",
      content: `Donation ${selectedDonation.id} has been ${values.action}.`,
    });
  };

  const columns = [
    {
      title: "Donation ID",
      key: "id",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.id}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.createdAt}
          </Text>
        </Space>
      ),
    },
    {
      title: "Donor",
      key: "donor",
      render: (record) => (
        <Space>
          <Avatar
            icon={<UserIcon style={{ width: 16, height: 16 }} />}
            style={{
              backgroundColor: record.anonymous ? "#f0f0f0" : "#1890ff",
            }}
          />
          <Space direction="vertical" size={0}>
            <Text strong>
              {record.anonymous ? "Anonymous Donor" : record.donor.name}
              {record.anonymous && (
                <EyeOffIcon style={{ width: 14, height: 14, marginLeft: 4 }} />
              )}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.campaign}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text strong>UGX {record.amount.toLocaleString()}</Text>
          <Tag style={{ marginTop: 4, borderRadius: 4 }}>
            {record.type.toUpperCase()}
            {record.frequency && ` - ${record.frequency}`}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag color={getStatusColor(record.status)} style={{ borderRadius: 4 }}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button
            type="default"
            size="small"
            icon={<EditIcon style={{ width: 16, height: 16 }} />}
            onClick={() => handleViewDetails(record)}
          >
            Details
          </Button>
          {record.status === "pending" && (
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleIcon style={{ width: 16, height: 16 }} />}
              onClick={() => handleProcessDonation(record)}
            >
              Process
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Summary Statistics */}
      <Row gutter={[4, 4]}>
        <Col span={6}>
          <Card style={{ borderColor: "#1890ff" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Total Donations</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#1890ff" }}
                  />
                </Space>
              }
              value={totalAmount}
              prefix={<BanknoteIcon style={{ width: 16, height: 16 }} />}
              formatter={(value) => `UGX ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "#faad14" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Pending Review</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#faad14" }}
                  />
                </Space>
              }
              value={totalPending}
              prefix={<ClockIcon style={{ width: 16, height: 16 }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "#52c41a" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Recurring Donations</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#52c41a" }}
                  />
                </Space>
              }
              value={recurringDonations}
              prefix={<CalendarIcon style={{ width: 16, height: 16 }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "#722ed1" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Active Pledges</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#722ed1" }}
                  />
                </Space>
              }
              value={pledges}
              prefix={<HeartIcon style={{ width: 16, height: 16 }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Donation Management
          </Title>
          <Space>
            <RangePicker
              placeholder={["Start Date", "End Date"]}
              style={{ borderRadius: 8 }}
            />
            <Select
              placeholder="Filter by Type"
              style={{ width: 150, borderRadius: 8 }}
            >
              <Select.Option value="all">All Types</Select.Option>
              <Select.Option value="one-time">One-Time</Select.Option>
              <Select.Option value="recurring">Recurring</Select.Option>
              <Select.Option value="pledge">Pledge</Select.Option>
            </Select>
            <Select
              placeholder="Filter by Status"
              style={{ width: 150, borderRadius: 8 }}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="processing">Processing</Select.Option>
            </Select>
          </Space>
        </div>

        <Table
          size="small"
          columns={columns}
          dataSource={donations}
          rowKey="id"
        />
      </Card>

      {/* Details Modal */}
      <Modal
        title={null}
        open={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
        className="details-modal"
      >
        {selectedDonation && (
          <div
            style={{
              background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Header Section */}
            <div
              style={{
                padding: "32px",
                background: "linear-gradient(180deg, #f0f2f5 0%, #f8f9fa 100%)",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Row gutter={24} align="middle">
                <Col>
                  <Avatar
                    size={80}
                    icon={<UserIcon style={{ width: 40, height: 40 }} />}
                    style={{
                      backgroundColor: selectedDonation.anonymous
                        ? "#f0f0f0"
                        : "#1890ff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </Col>
                <Col flex="1">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <Title level={3} style={{ margin: 0 }}>
                      {selectedDonation.anonymous
                        ? "Anonymous Donor"
                        : selectedDonation.donor.name}
                    </Title>
                    <Tag
                      color={getStatusColor(selectedDonation.status)}
                      style={{
                        margin: 0,
                        padding: "4px 12px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        border: "none",
                      }}
                    >
                      {getStatusIcon(selectedDonation.status)}{" "}
                      {selectedDonation.status.toUpperCase()}
                    </Tag>
                  </div>
                  <Space split={<Divider type="vertical" />}>
                    <Text type="secondary">ID: {selectedDonation.id}</Text>
                    <Text type="secondary">{selectedDonation.createdAt}</Text>
                  </Space>
                </Col>
                <Col>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    UGX {selectedDonation.amount.toLocaleString()}
                  </Title>
                </Col>
              </Row>
            </div>

            {/* Content Section */}
            <div style={{ padding: "32px" }}>
              <Row gutter={[24, 24]}>
                {/* Quick Info Cards */}
                <Col span={8}>
                  <Card
                    style={{
                      borderRadius: "16px",
                      background: "#f8f9fa",
                      border: "none",
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">Type</Text>
                      <Space>
                        {getDonationTypeIcon(selectedDonation.type)}
                        <Text strong style={{ fontSize: "16px" }}>
                          {selectedDonation.type.toUpperCase()}
                          {selectedDonation.frequency &&
                            ` - ${selectedDonation.frequency}`}
                        </Text>
                      </Space>
                    </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{
                      borderRadius: "16px",
                      background: "#f8f9fa",
                      border: "none",
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">Campaign</Text>
                      <Space>
                        <HeartIcon style={{ width: 16, height: 16 }} />
                        <Text strong style={{ fontSize: "16px" }}>
                          {selectedDonation.campaign}
                        </Text>
                      </Space>
                    </Space>
                  </Card>
                </Col>
                {selectedDonation.nextPayment && (
                  <Col span={8}>
                    <Card
                      style={{
                        borderRadius: "16px",
                        background: "#f8f9fa",
                        border: "none",
                      }}
                    >
                      <Space direction="vertical" size={4}>
                        <Text type="secondary">Next Payment</Text>
                        <Space>
                          <CalendarIcon style={{ width: 16, height: 16 }} />
                          <Text strong style={{ fontSize: "16px" }}>
                            {selectedDonation.nextPayment}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                )}

                {/* Contact Information */}
                <Col span={24}>
                  <Card
                    title="Contact Information"
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Row gutter={[48, 16]}>
                      <Col span={12}>
                        <Space direction="vertical" size={16}>
                          <div>
                            <Text type="secondary">Email</Text>
                            <div
                              style={{
                                marginTop: 4,
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                              }}
                            >
                              <Space>
                                <MailIcon
                                  style={{
                                    width: 16,
                                    height: 16,
                                    color: "#1890ff",
                                  }}
                                />
                                <Text strong>
                                  {selectedDonation.donor.email}
                                </Text>
                              </Space>
                            </div>
                          </div>
                          <div>
                            <Text type="secondary">Phone</Text>
                            <div
                              style={{
                                marginTop: 4,
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                              }}
                            >
                              <Space>
                                <PhoneIcon
                                  style={{
                                    width: 16,
                                    height: 16,
                                    color: "#1890ff",
                                  }}
                                />
                                <Text strong>
                                  {selectedDonation.donor.phone}
                                </Text>
                              </Space>
                            </div>
                          </div>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{
                            height: "100%",
                            background: "#f8f9fa",
                            borderRadius: "8px",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <Text type="secondary">Quick Actions</Text>
                          <Button
                            type="text"
                            icon={
                              <MailIcon style={{ width: 16, height: 16 }} />
                            }
                            style={{
                              justifyContent: "space-between",
                              height: "auto",
                              padding: "8px",
                            }}
                          >
                            Send Email
                            <ChevronRightIcon
                              style={{ width: 16, height: 16 }}
                            />
                          </Button>
                          <Button
                            type="text"
                            icon={
                              <PhoneIcon style={{ width: 16, height: 16 }} />
                            }
                            style={{
                              justifyContent: "space-between",
                              height: "auto",
                              padding: "8px",
                            }}
                          >
                            Call Donor
                            <ChevronRightIcon
                              style={{ width: 16, height: 16 }}
                            />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                {/* Notes Section */}
                {selectedDonation.notes && (
                  <Col span={24}>
                    <Card
                      title="Notes"
                      style={{
                        borderRadius: "16px",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      <Paragraph style={{ margin: 0 }}>
                        {selectedDonation.notes}
                      </Paragraph>
                    </Card>
                  </Col>
                )}
              </Row>
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
              {selectedDonation.status === "pending" && (
                <Button
                  type="primary"
                  icon={<CheckCircleIcon style={{ width: 16, height: 16 }} />}
                  onClick={() => {
                    setIsDetailsModalVisible(false);
                    handleProcessDonation(selectedDonation);
                  }}
                >
                  Process Donation
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Process Modal */}
      <Modal
        title="Process Donation"
        open={isProcessModalVisible}
        onCancel={() => setIsProcessModalVisible(false)}
        footer={null}
      >
        {selectedDonation && (
          <Form form={form} layout="vertical" onFinish={handleProcessSubmit}>
            <Alert
              message={`Processing Donation ${selectedDonation.id}`}
              description={
                <div style={{ marginTop: 16 }}>
                  <p>Amount: UGX {selectedDonation.amount.toLocaleString()}</p>
                  <p>Type: {selectedDonation.type.toUpperCase()}</p>
                  <p>Campaign: {selectedDonation.campaign}</p>
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form.Item
              name="action"
              label="Action"
              rules={[{ required: true, message: "Please select an action" }]}
            >
              <Select>
                <Select.Option value="approved">Approve Donation</Select.Option>
                <Select.Option value="rejected">Reject Donation</Select.Option>
                <Select.Option value="processing">
                  Mark as Processing
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="notes"
              label="Processing Notes"
              rules={[
                { required: true, message: "Please add processing notes" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
              >
                <Button onClick={() => setIsProcessModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Confirm Action
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default DonationProcessing;
