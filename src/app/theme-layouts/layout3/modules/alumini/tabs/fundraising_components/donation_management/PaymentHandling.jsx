import React from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Modal,
  Row,
  Col,
  Statistic,
  Alert,
  Form,
  Input,
  Select,
  DatePicker,
  Divider,
  Image,
} from "antd";
import {
  CheckCircleIcon,
  XCircleIcon,
  RefreshCwIcon,
  BanknoteIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  ReceiptIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const PaymentHandling = () => {
  const [transactions, setTransactions] = React.useState([
    {
      id: "1",
      amount: 500000,
      method: "Mobile Money",
      status: "completed",
      date: "2024-03-15",
      reference: "TRX123456",
      donor: "John Okello",
      campaign: "Scholarship Fund",
      processingFee: 2500,
      notes: "Regular donation",
      receiptUrl: "#",
    },
    {
      id: "2",
      amount: 1000000,
      method: "Credit Card",
      status: "pending",
      date: "2024-03-15",
      reference: "TRX123457",
      donor: "Sarah Nansubuga",
      campaign: "Building Fund",
      processingFee: 5000,
      notes: "Monthly pledge payment",
      receiptUrl: "#",
    },
    {
      id: "3",
      amount: 750000,
      method: "Bank Transfer",
      status: "failed",
      date: "2024-03-14",
      reference: "TRX123458",
      donor: "Michael Kato",
      campaign: "General Fund",
      processingFee: 3750,
      notes: "Payment failed - insufficient funds",
      receiptUrl: "#",
    },
  ]);

  const [isVerifyModalVisible, setIsVerifyModalVisible] = React.useState(false);
  const [isReceiptModalVisible, setIsReceiptModalVisible] =
    React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [form] = Form.useForm();

  const totalAmount = transactions.reduce(
    (sum, t) => sum + (t.status === "completed" ? t.amount : 0),
    0
  );
  const totalFees = transactions.reduce(
    (sum, t) => sum + (t.status === "completed" ? t.processingFee : 0),
    0
  );
  const successRate =
    (transactions.filter((t) => t.status === "completed").length /
      transactions.length) *
    100;

  const handleVerify = (transaction) => {
    setSelectedTransaction(transaction);
    setIsVerifyModalVisible(true);
  };

  const handleViewReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setIsReceiptModalVisible(true);
  };

  const handleVerifySubmit = (values) => {
    if (!selectedTransaction) return;

    const updatedTransactions = transactions.map((t) => {
      if (t.id === selectedTransaction.id) {
        return {
          ...t,
          status: "completed",
          notes: values.verificationNotes,
        };
      }
      return t;
    });

    setTransactions(updatedTransactions);
    setIsVerifyModalVisible(false);
    Modal.success({
      title: "Transaction Verified",
      content: `Transaction ${selectedTransaction.reference} has been verified successfully.`,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "success",
      pending: "warning",
      failed: "error",
    };
    return colors[status];
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircleIcon size={12} />,
      pending: <RefreshCwIcon size={12} />,
      failed: <XCircleIcon size={12} />,
    };
    return icons[status];
  };

  const columns = [
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.date}
          </Text>
        </Space>
      ),
    },
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.campaign}
          </Text>
        </Space>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (record) => (
        <Space direction="vertical" size={0}>
          <Text strong>UGX {record.amount.toLocaleString()}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Fee: UGX {record.processingFee.toLocaleString()}
          </Text>
        </Space>
      ),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (text) => <Tag style={{ borderRadius: 3 }}>{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} style={{ borderRadius: 3 }}>
          {getStatusIcon(status)} {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          {record.status === "pending" && (
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleIcon size={12} />}
              onClick={() => handleVerify(record)}
            >
              Verify
            </Button>
          )}
          <Button
            type="default"
            size="small"
            icon={<ReceiptIcon style={{ width: 16, height: 16 }} />}
            onClick={() => handleViewReceipt(record)}
          >
            Receipt
          </Button>
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
                  <Text strong>Total Processed</Text>
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
          <Card style={{ borderColor: "#fa8c16" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Processing Fees</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#fa8c16" }}
                  />
                </Space>
              }
              value={totalFees}
              formatter={(value) => `UGX ${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "#52c41a" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Success Rate</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#52c41a" }}
                  />
                </Space>
              }
              value={successRate}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderColor: "#faad14" }}>
            <Statistic
              title={
                <Space>
                  <Text strong>Pending Verification</Text>
                  <ArrowRightIcon
                    style={{ width: 16, height: 16, color: "#faad14" }}
                  />
                </Space>
              }
              value={transactions.filter((t) => t.status === "pending").length}
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
            Payment Transactions
          </Title>
          <Space>
            <RangePicker
              placeholder={["Start Date", "End Date"]}
              style={{ borderRadius: 8 }}
            />
            <Select
              placeholder="Filter by Status"
              style={{ width: 150, borderRadius: 8 }}
              suffixIcon={<FilterIcon style={{ width: 16, height: 16 }} />}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
            </Select>
            <Button
              type="default"
              icon={<DownloadIcon style={{ width: 16, height: 16 }} />}
            >
              Export
            </Button>
          </Space>
        </div>

        <Table columns={columns} dataSource={transactions} rowKey="id" />
      </Card>

      {/* Verification Modal */}
      <Modal
        title="Verify Transaction"
        open={isVerifyModalVisible}
        onCancel={() => setIsVerifyModalVisible(false)}
        footer={null}
      >
        {selectedTransaction && (
          <Form form={form} layout="vertical" onFinish={handleVerifySubmit}>
            <Alert
              message="Transaction Details"
              description={
                <div style={{ marginTop: 16 }}>
                  <p>Reference: {selectedTransaction.reference}</p>
                  <p>
                    Amount: UGX {selectedTransaction.amount.toLocaleString()}
                  </p>
                  <p>Method: {selectedTransaction.method}</p>
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form.Item
              name="verificationNotes"
              label="Verification Notes"
              rules={[
                { required: true, message: "Please add verification notes" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
              >
                <Button onClick={() => setIsVerifyModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Confirm Verification
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal
        title={null}
        open={isReceiptModalVisible}
        onCancel={() => setIsReceiptModalVisible(false)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadIcon style={{ width: 16, height: 16 }} />}
          >
            Download Receipt
          </Button>,
        ]}
        width={600}
      >
        {selectedTransaction && (
          <div style={{ padding: "24px 0" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Image
                width={"30%"}
                src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg"
                alt="Organization Logo"
                preview={false}
                style={{ marginBottom: 16 }}
              />
              <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                Payment Receipt
              </Title>
              <Text type="secondary">
                Reference: {selectedTransaction.reference}
              </Text>
            </div>

            <Card style={{ marginBottom: 24 }}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Alert
                    message={
                      <Text strong style={{ fontSize: 16 }}>
                        UGX {selectedTransaction.amount.toLocaleString()}
                      </Text>
                    }
                    type="success"
                    showIcon
                    style={{ textAlign: "center" }}
                  />
                </Col>
                <Col span={12}>
                  <Text type="secondary">Transaction Date</Text>
                  <br />
                  <Text strong>{selectedTransaction.date}</Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Text type="secondary">Payment Status</Text>
                  <br />
                  <Tag
                    color={getStatusColor(selectedTransaction.status)}
                    style={{ marginTop: 4 }}
                  >
                    {selectedTransaction.status.toUpperCase()}
                  </Tag>
                </Col>
              </Row>
            </Card>

            <Card title="Payment Details" style={{ marginBottom: 24 }}>
              <Row gutter={[0, 16]}>
                <Col span={12}>
                  <Text type="secondary">Donor Name</Text>
                  <br />
                  <Text strong>{selectedTransaction.donor}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Payment Method</Text>
                  <br />
                  <Text strong>{selectedTransaction.method}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Campaign</Text>
                  <br />
                  <Text strong>{selectedTransaction.campaign}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Processing Fee</Text>
                  <br />
                  <Text strong>
                    UGX {selectedTransaction.processingFee.toLocaleString()}
                  </Text>
                </Col>
              </Row>
            </Card>

            <div style={{ textAlign: "center" }}>
              <Title level={5} style={{ color: "#1890ff", marginBottom: 8 }}>
                Thank You for Your Donation!
              </Title>
              <Text type="secondary">
                Your contribution makes a difference. This receipt was
                automatically generated for your records.
              </Text>
              <Divider style={{ margin: "16px 0" }} />
              <Space direction="vertical" size={4}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Organization Name
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  123 Main Street, City, Country
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Email: support@organization.com
                </Text>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentHandling;
