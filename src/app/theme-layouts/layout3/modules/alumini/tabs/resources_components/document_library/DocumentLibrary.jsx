import React from "react";
import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Tabs,
  Tag,
  Badge,
  Tooltip,
  Row,
  Col,
  Statistic,
  Drawer,
  Timeline,
  Descriptions,
  Divider,
  Menu,
  Dropdown,
  Avatar,
  List,
  DatePicker,
  notification,
} from "antd";
import {
  UploadOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  DollarCircleOutlined,
  UserOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  MoreOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined,
  QrcodeOutlined,
  HistoryOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import SignatureCanvas from "react-signature-canvas";
import { QRCodeSVG } from "qrcode.react";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Sample data for document requests
const initialRequests = [
  {
    id: "1",
    documentType: "Transcript",
    requestedBy: "Musiitwa Joel",
    requestDate: "2024-03-18",
    status: "Pending Payment",
    urgency: "High",
    notes: "Required for job application",
    paymentAmount: 25,
    version: "1",
  },
  {
    id: "2",
    documentType: "Transcript",
    requestedBy: "Jane Smith",
    requestDate: "2024-03-17",
    status: "Paid",
    urgency: "Medium",
    notes: "For graduate school application",
    paymentAmount: 25,
  },
  {
    id: "3",
    documentType: "Transcript",
    requestedBy: "Alice Johnson",
    requestDate: "2024-03-16",
    status: "Paid",
    urgency: "Low",
    notes: "Personal records",
    paymentAmount: 25,
  },
  {
    id: "4",
    documentType: "Transcript",
    requestedBy: "Bob Williams",
    requestDate: "2024-03-15",
    status: "Completed",
    urgency: "High",
    notes: "Urgent - for visa application",
    paymentAmount: 25,
  },
];

const DocumentLibraryAdmin = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDateRange, setFilterDateRange] = useState(null > null);
  const [signatureRef, setSignatureRef] = useState(null);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isVersionHistoryVisible, setIsVersionHistoryVisible] = useState(false);
  const [selectedDocumentVersions, setSelectedDocumentVersions] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch requests
    // In a real application, you would fetch requests from your backend here
    setRequests(initialRequests);
  }, []);

  const filteredRequests = requests.filter(
    (request) =>
      (request.requestedBy.toLowerCase().includes(searchText.toLowerCase()) ||
        request.documentType
          .toLowerCase()
          .includes(searchText.toLowerCase())) &&
      (filterStatus === "All" || request.status === filterStatus) &&
      (!filterDateRange ||
        (new Date(request.requestDate) >= new Date(filterDateRange[0]) &&
          new Date(request.requestDate) <= new Date(filterDateRange[1])))
  );

  const requestColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Document Type",
      dataIndex: "documentType",
      key: "documentType",
      render: (type) => (
        <Tag color="blue" icon={<FileTextOutlined />}>
          {type}
        </Tag>
      ),
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      key: "requestedBy",
      render: (name) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (urgency) => (
        <Tag
          color={
            urgency === "High"
              ? "red"
              : urgency === "Medium"
                ? "orange"
                : "green"
          }
        >
          {urgency}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let icon = null;
        switch (status) {
          case "Pending Payment":
            color = "warning";
            icon = <DollarCircleOutlined />;
            break;
          case "Paid":
            color = "processing";
            icon = <CheckCircleOutlined />;
            break;
          case "Processing":
            color = "processing";
            icon = <ClockCircleOutlined />;
            break;
          case "Completed":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
        }
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewRequest(record)}
            />
          </Tooltip>
          <Tooltip title="Upload Document">
            <Button
              icon={<UploadOutlined />}
              onClick={() => handleUploadDocument(record)}
              disabled={
                record.status !== "Paid" && record.status !== "Processing"
              }
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleMarkAsCompleted(record.id)}
                >
                  Mark as Completed
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<EditOutlined />}
                  onClick={() => handleEditRequest(record)}
                >
                  Edit Request
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDeleteRequest(record.id)}
                >
                  Delete Request
                </Menu.Item>
                <Menu.Item
                  key="4"
                  icon={<HistoryOutlined />}
                  onClick={() => handleViewVersionHistory(record)}
                >
                  View Version History
                </Menu.Item>
                <Menu.Item
                  key="5"
                  icon={<QrcodeOutlined />}
                  onClick={() => handleGenerateQRCode(record)}
                >
                  Generate QR Code
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsDrawerVisible(true);
  };

  const handleUploadDocument = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleMarkAsCompleted = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Completed" } : req
      )
    );
    message.success("Request marked as completed");
    // Send notification to alumni
    notification.success({
      message: "Document Ready",
      description: `The requested document for ${
        requests.find((req) => req.id === id)?.requestedBy
      } is now ready.`,
    });
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    form.setFieldsValue(request);
    setIsModalVisible(true);
  };

  const handleDeleteRequest = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this request?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        setRequests(requests.filter((req) => req.id !== id));
        message.success("Request deleted successfully");
      },
    });
  };

  const handleUploadSubmit = (values) => {
    // Here you would typically handle the file upload to your server
    console.log("Uploading document:", values);
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id
        ? {
            ...req,
            status: "Processing",
            documentUrl: values.file[0].response.url, // Assuming the server returns the URL
            version: (Number.parseInt(req.version || "0") + 1).toString(),
          }
        : req
    );
    setRequests(updatedRequests);
    setIsModalVisible(false);
    message.success("Document uploaded successfully");
    form.resetFields();
  };

  const handleGenerateTemplate = (values) => {
    // Here you would generate a document based on the template and pre-filled data
    console.log("Generating template with values:", values);
    message.success("Template generated successfully");
    setIsTemplateModalVisible(false);
  };

  const handleViewVersionHistory = (document) => {
    // In a real application, you would fetch the version history from your backend
    const mockVersionHistory = [
      { version: "1.0", uploadDate: "2024-03-15", uploadedBy: "Admin User" },
      { version: "1.1", uploadDate: "2024-03-18", uploadedBy: "Admin User" },
      { version: "1.2", uploadDate: "2024-03-20", uploadedBy: "Admin User" },
    ];
    setSelectedDocumentVersions(mockVersionHistory);
    setIsVersionHistoryVisible(true);
  };

  const handleGenerateQRCode = (document) => {
    Modal.info({
      title: "Document QR Code",
      content: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <QRCodeSVG value={`https://yourdomain.com/verify/${document.id}`} />
        </div>
      ),
      onOk() {},
    });
  };

  const renderRequestTimeline = (request) => (
    <Timeline>
      <Timeline.Item color="blue">
        Request Received - {request.requestDate}
      </Timeline.Item>
      {request.status !== "Pending Payment" && (
        <Timeline.Item color="green">
          Payment Received - UGX {request.paymentAmount}
        </Timeline.Item>
      )}
      {(request.status === "Processing" || request.status === "Completed") && (
        <Timeline.Item color="blue">Document Processing</Timeline.Item>
      )}
      {request.status === "Completed" && (
        <Timeline.Item color="green">Request Completed</Timeline.Item>
      )}
    </Timeline>
  );

  const renderStatistics = () => {
    const totalRequests = requests.length;
    const pendingPayment = requests.filter(
      (req) => req.status === "Pending Payment"
    ).length;
    const processing = requests.filter(
      (req) => req.status === "Processing"
    ).length;
    const completed = requests.filter(
      (req) => req.status === "Completed"
    ).length;

    const chartData = [
      { name: "Pending Payment", value: pendingPayment },
      {
        name: "Paid",
        value: requests.filter((req) => req.status === "Paid").length,
      },
      { name: "Processing", value: processing },
      { name: "Completed", value: completed },
    ];

    const COLORS = ["#FFBB28", "#00C49F", "#0088FE", "#FF8042"];

    const downloadData = [
      { name: "Transcript", downloads: 45 },
      { name: "Degree Certificate", downloads: 30 },
      { name: "Enrollment Verification", downloads: 25 },
    ];

    return (
      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="Total Requests"
              value={totalRequests}
              prefix={<FileSearchOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Pending Payment"
              value={pendingPayment}
              prefix={<DollarCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Processing"
              value={processing}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Completed"
              value={completed}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Request Status Distribution</Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
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
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col span={12}>
            <Title level={4}>Most Downloaded Documents</Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={downloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="downloads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "1px" }}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <BarChartOutlined />
                  &nbsp;Dashboard
                </span>
              }
              key="1"
            >
              {renderStatistics()}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FileSearchOutlined />
                  &nbsp;Document Requests
                  <Badge
                    count={
                      requests.filter((req) => req.status === "Paid").length
                    }
                    style={{ marginLeft: 8 }}
                  />
                </span>
              }
              key="2"
            >
              <Space style={{ marginBottom: 16 }}>
                <Input
                  placeholder="Search requests"
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                  defaultValue="All"
                  style={{ width: 120 }}
                  onChange={(value) => setFilterStatus(value)}
                >
                  <Select.Option value="All">All Status</Select.Option>
                  <Select.Option value="Pending Payment">
                    Pending Payment
                  </Select.Option>
                  <Select.Option value="Paid">Paid</Select.Option>
                  <Select.Option value="Processing">Processing</Select.Option>
                  <Select.Option value="Completed">Completed</Select.Option>
                </Select>
                <RangePicker
                  onChange={(dates, dateStrings) =>
                    setFilterDateRange(dateStrings)
                  }
                />
                <Button
                  icon={<CloudUploadOutlined />}
                  onClick={() => setIsTemplateModalVisible(true)}
                >
                  Generate Template
                </Button>
              </Space>
              <Table
                size="small"
                columns={requestColumns}
                dataSource={filteredRequests}
              />
            </TabPane>
          </Tabs>
        </Card>

        <Modal
          title="Upload Document"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleUploadSubmit}>
            <Form.Item
              name="file"
              label="Upload Document"
              rules={[
                { required: true, message: "Please upload the document" },
              ]}
            >
              <Upload.Dragger name="file" multiple={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other sensitive files.
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item name="notes" label="Additional Notes">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="accessLevel" label="Access Level">
              <Select>
                <Select.Option value="public">Public</Select.Option>
                <Select.Option value="restricted">Restricted</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Upload and Process
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Generate Document Template"
          open={isTemplateModalVisible}
          onCancel={() => setIsTemplateModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleGenerateTemplate} layout="vertical">
            <Form.Item
              name="templateType"
              label="Template Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="transcript">Transcript</Select.Option>
                <Select.Option value="degreeCertificate">
                  Degree Certificate
                </Select.Option>
                <Select.Option value="enrollmentVerification">
                  Enrollment Verification
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="studentName"
              label="Student Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="studentId"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="graduationDate" label="Graduation Date">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Generate Template
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title="Request Details"
          placement="right"
          closable={true}
          onClose={() => setIsDrawerVisible(false)}
          open={isDrawerVisible}
          width={600}
        >
          {selectedRequest && (
            <>
              <Descriptions title="Request Information" bordered>
                <Descriptions.Item label="ID" span={3}>
                  {selectedRequest.id}
                </Descriptions.Item>
                <Descriptions.Item label="Document Type" span={3}>
                  {selectedRequest.documentType}
                </Descriptions.Item>
                <Descriptions.Item label="Requested By" span={3}>
                  {selectedRequest.requestedBy}
                </Descriptions.Item>
                <Descriptions.Item label="Request Date" span={3}>
                  {selectedRequest.requestDate}
                </Descriptions.Item>
                <Descriptions.Item label="Urgency" span={3}>
                  <Tag
                    color={
                      selectedRequest.urgency === "High"
                        ? "red"
                        : selectedRequest.urgency === "Medium"
                          ? "orange"
                          : "green"
                    }
                  >
                    {selectedRequest.urgency}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                  <Tag
                    color={
                      selectedRequest.status === "Completed" ? "green" : "blue"
                    }
                  >
                    {selectedRequest.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Payment Amount" span={3}>
                  UGX {selectedRequest.paymentAmount}
                </Descriptions.Item>
                <Descriptions.Item label="Notes" span={3}>
                  {selectedRequest.notes}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              <Title level={4}>Request Timeline</Title>
              {renderRequestTimeline(selectedRequest)}
              <Divider />
              <Title level={4}>E-Signature</Title>
              <SignatureCanvas
                ref={(ref) => setSignatureRef(ref)}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
              <Button
                onClick={() => {
                  if (signatureRef) {
                    const signatureData = signatureRef.toDataURL();
                    console.log("Signature data:", signatureData);
                    message.success("Signature captured successfully");
                  }
                }}
                style={{ marginTop: 16 }}
              >
                Capture Signature
              </Button>
            </>
          )}
        </Drawer>

        <Modal
          title="Document Version History"
          open={isVersionHistoryVisible}
          onCancel={() => setIsVersionHistoryVisible(false)}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={selectedDocumentVersions}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<FileTextOutlined />} />}
                  title={`Version ${item.version}`}
                  description={`Uploaded on ${item.uploadDate} by ${item.uploadedBy}`}
                />
                <Button size="small">View</Button>
              </List.Item>
            )}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default DocumentLibraryAdmin;
