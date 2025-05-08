import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  message,
  Card,
  Statistic,
  Progress,
  Tabs,
  Badge,
  Tooltip,
  Upload,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  FileTextOutlined,
  PrinterOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

export default function PaymentTracking() {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for payments
  const mockData = [
    {
      key: "1",
      candidate: "Namugwanya Sarah",
      studentId: "2000100121",
      position: "Guild President",
      election: "Guild Presidential Election 2023/2024",
      amount: 50000,
      status: "Paid",
      paymentDate: "2023-04-20",
      paymentMethod: "Mobile Money",
      receiptNumber: "MM-2023-001",
      verifiedBy: "Admin User",
    },
    {
      key: "2",
      candidate: "Mukasa David",
      studentId: "2000100125",
      position: "Guild President",
      election: "Guild Presidential Election 2023/2024",
      amount: 50000,
      status: "Paid",
      paymentDate: "2023-04-22",
      paymentMethod: "Bank Transfer",
      receiptNumber: "BT-2023-002",
      verifiedBy: "Admin User",
    },
    {
      key: "3",
      candidate: "Okello James",
      studentId: "2000100539",
      position: "Guild President",
      election: "Guild Presidential Election 2023/2024",
      amount: 50000,
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
      receiptNumber: null,
      verifiedBy: null,
    },
    {
      key: "4",
      candidate: "Nantongo Mary",
      studentId: "2000100142",
      position: "Faculty Rep",
      election: "Student Council Representatives",
      amount: 30000,
      status: "Paid",
      paymentDate: "2023-04-18",
      paymentMethod: "Cash",
      receiptNumber: "CS-2023-001",
      verifiedBy: "Admin User",
    },
    {
      key: "5",
      candidate: "Wasswa Brian",
      studentId: "2000100156",
      position: "Faculty Rep",
      election: "Student Council Representatives",
      amount: 30000,
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
      receiptNumber: null,
      verifiedBy: null,
    },
    {
      key: "6",
      candidate: "Nabukenya Joyce",
      studentId: "2000100178",
      position: "Faculty Rep",
      election: "Student Council Representatives",
      amount: 30000,
      status: "Rejected",
      paymentDate: "2023-04-19",
      paymentMethod: "Mobile Money",
      receiptNumber: null,
      verifiedBy: "Admin User",
      rejectionReason: "Invalid transaction reference",
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      candidate: record.candidate,
      position: record.position,
      election: record.election,
      amount: record.amount,
      status: record.status,
      paymentMethod: record.paymentMethod || undefined,
      paymentDate: record.paymentDate
        ? new Date(record.paymentDate)
        : undefined,
      receiptNumber: record.receiptNumber || undefined,
      rejectionReason: record.rejectionReason || undefined,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // In a real app, you would call an API to update the payment
        const newData = [...data];
        const index = newData.findIndex(
          (item) => item.key === selectedRecord.key
        );
        newData[index] = { ...newData[index], ...values };
        setData(newData);
        setIsModalVisible(false);
        message.success("Payment record updated successfully");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.candidate.toLowerCase().includes(searchText.toLowerCase()) ||
      item.position.toLowerCase().includes(searchText.toLowerCase()) ||
      item.election.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.receiptNumber &&
        item.receiptNumber.toLowerCase().includes(searchText.toLowerCase()));

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "paid" && item.status === "Paid") ||
      (activeTab === "pending" && item.status === "Pending") ||
      (activeTab === "rejected" && item.status === "Rejected");

    return matchesSearch && matchesTab;
  });

  // Calculate statistics
  const totalPayments = data.length;
  const paidPayments = data.filter((item) => item.status === "Paid").length;
  const pendingPayments = data.filter(
    (item) => item.status === "Pending"
  ).length;
  const rejectedPayments = data.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const collectedAmount = data
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const paymentPercentage =
    totalPayments > 0 ? Math.round((paidPayments / totalPayments) * 100) : 0;

  const columns = [
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>
            ID: {record.studentId}
          </div>
        </div>
      ),
    },
    {
      title: "Position & Election",
      dataIndex: "position",
      key: "position",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>
            {record.election}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `UGX ${amount.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let icon = null;

        if (status === "Paid") {
          color = "success";
          icon = <CheckCircleOutlined />;
        } else if (status === "Pending") {
          color = "warning";
          icon = <ExclamationCircleOutlined />;
        } else if (status === "Rejected") {
          color = "error";
          icon = <CloseCircleOutlined />;
        }

        return (
          <Tag icon={icon} color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Payment Details",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method, record) => (
        <div>
          {method ? (
            <>
              <div>{method}</div>
              <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>
                {record.paymentDate}{" "}
                {record.receiptNumber ? `• ${record.receiptNumber}` : ""}
              </div>
            </>
          ) : (
            <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>Not available</span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => showModal(record)}>
            {record.status === "Pending" ? "Record Payment" : "Update"}
          </Button>
          {record.status === "Paid" && (
            <Tooltip title="Print Receipt">
              <Button type="text" size="small" icon={<PrinterOutlined />} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Payment Tracking</h1>

      <div style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Payments"
                value={totalPayments}
                suffix={
                  <Tooltip title="Total number of payment records">
                    <ExclamationCircleOutlined
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Collected Amount"
                value={collectedAmount}
                prefix="UGX "
                valueStyle={{ color: "#3f8600" }}
              />
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "8px",
                }}
              >
                Out of UGX {totalAmount.toLocaleString()}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Payment Completion"
                value={paymentPercentage}
                suffix="%"
                valueStyle={{
                  color: paymentPercentage >= 70 ? "#3f8600" : "#cf1322",
                }}
              />
              <Progress
                percent={paymentPercentage}
                showInfo={false}
                status={paymentPercentage >= 70 ? "success" : "exception"}
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Statistic
                  title="Pending Payments"
                  value={pendingPayments}
                  valueStyle={{ color: "#faad14" }}
                />
                <Statistic
                  title="Rejected"
                  value={rejectedPayments}
                  valueStyle={{ color: "#cf1322" }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Input
            placeholder="Search by candidate, position, or receipt"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button icon={<FilterOutlined />}>Filter</Button>
        </Space>
        <Space>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Import</Button>
          </Upload>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button icon={<FileTextOutlined />}>Generate Report</Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              All Payments{" "}
              <Badge count={totalPayments} style={{ marginLeft: 8 }} />
            </span>
          }
          key="all"
        />
        <TabPane
          tab={
            <span>
              Paid{" "}
              <Badge
                count={paidPayments}
                style={{ backgroundColor: "#52c41a", marginLeft: 8 }}
              />
            </span>
          }
          key="paid"
        />
        <TabPane
          tab={
            <span>
              Pending{" "}
              <Badge
                count={pendingPayments}
                style={{ backgroundColor: "#faad14", marginLeft: 8 }}
              />
            </span>
          }
          key="pending"
        />
        <TabPane
          tab={
            <span>
              Rejected{" "}
              <Badge
                count={rejectedPayments}
                style={{ backgroundColor: "#f5222d", marginLeft: 8 }}
              />
            </span>
          }
          key="rejected"
        />
      </Tabs>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="key"
      />

      <Modal
        title={
          selectedRecord?.status === "Pending"
            ? "Record Payment"
            : "Update Payment Details"
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="candidate" label="Candidate">
            <Input disabled />
          </Form.Item>

          <Form.Item name="position" label="Position">
            <Input disabled />
          </Form.Item>

          <Form.Item name="election" label="Election">
            <Input disabled />
          </Form.Item>

          <Form.Item name="amount" label="Amount (UGX)">
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Payment Status"
            rules={[
              { required: true, message: "Please select payment status" },
            ]}
          >
            <Select>
              <Select.Option value="Paid">Paid</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[
              {
                required: form.getFieldValue("status") === "Paid",
                message: "Please select payment method",
              },
            ]}
          >
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Mobile Money">Mobile Money</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentDate"
            label="Payment Date"
            rules={[
              {
                required: form.getFieldValue("status") === "Paid",
                message: "Please select payment date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="receiptNumber" label="Receipt Number">
            <Input placeholder="e.g. MM-2023-001" />
          </Form.Item>

          <Form.Item
            name="rejectionReason"
            label="Rejection Reason"
            rules={[
              {
                required: form.getFieldValue("status") === "Rejected",
                message: "Please provide rejection reason",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Explain why the payment was rejected"
            />
          </Form.Item>

          <Form.Item
            name="receiptFile"
            label="Upload Receipt"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
