import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Tooltip,
  message,
  Badge,
  Tabs,
  Timeline,
  Avatar,
  Divider,
  Alert,
  Switch,
  Popconfirm,
  Progress,
  Empty,
  Radio,
} from "antd";
import {
  FileOutlined,
  VideoCameraOutlined,
  LinkOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  TeamOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
  FileProtectOutlined,
  HistoryOutlined,
  StarOutlined,
  GlobalOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  BarChart3,
  FileArchive,
  FileCheck,
  FileX,
  Users,
  BookOpen,
  Layers,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Dragger } = Upload;

// Sample resource categories
const categories = [
  { value: "career", label: "Career Development" },
  { value: "networking", label: "Networking" },
  { value: "scholarships", label: "Scholarships" },
  { value: "research", label: "Research Papers" },
  { value: "events", label: "Event Materials" },
  { value: "newsletters", label: "Newsletters" },
  { value: "guides", label: "Alumni Guides" },
];

// Sample access levels
const accessLevels = [
  { value: "all", label: "All Alumni" },
  { value: "recent", label: "Recent Graduates" },
  { value: "donors", label: "Donors" },
  { value: "premium", label: "Premium Members" },
];

// Sample initial resources
const initialResources = [
  {
    id: "1",
    title: "Career Development Guide 2024",
    type: "pdf",
    category: "career",
    tags: ["career", "guide", "2024"],
    accessLevel: "all",
    status: "published",
    uploadDate: "2024-03-15",
    lastModified: "2024-03-15",
    size: "2.5 MB",
    downloads: 145,
    views: 289,
    rating: 4.5,
    description:
      "Comprehensive guide for career advancement and professional development",
    version: "1.0",
    author: "Career Services Team",
    approvedBy: "John Smith",
    approvalDate: "2024-03-15",
    url: "https://example.com/career-guide-2024.pdf",
    engagement: {
      lastWeekViews: 45,
      lastWeekDownloads: 23,
      averageRating: 4.5,
      feedback: 12,
    },
  },
  {
    id: "2",
    title: "Alumni Networking Workshop Recording",
    type: "video",
    category: "networking",
    tags: ["networking", "workshop", "video"],
    accessLevel: "premium",
    status: "pending",
    uploadDate: "2024-03-14",
    lastModified: "2024-03-14",
    size: "156 MB",
    downloads: 0,
    views: 0,
    rating: 0,
    description:
      "Recording of the virtual networking workshop held on March 14, 2024",
    version: "1.0",
    author: "Alumni Relations",
    approvedBy: null,
    approvalDate: null,
    url: "https://example.com/networking-workshop.mp4",
    engagement: {
      lastWeekViews: 0,
      lastWeekDownloads: 0,
      averageRating: 0,
      feedback: 0,
    },
  },
];

const ResourceManagement = () => {
  const [resources, setResources] = useState(initialResources);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Calculate statistics
  const totalResources = resources.length;
  const publishedResources = resources.filter(
    (r) => r.status === "published"
  ).length;
  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);
  const totalViews = resources.reduce((sum, r) => sum + r.views, 0);

  const handleAddResource = () => {
    setSelectedResource(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditResource = (resource) => {
    setSelectedResource(resource);
    form.setFieldsValue({
      ...resource,
      tags: resource.tags.join(", "),
    });
    setIsModalVisible(true);
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setIsViewModalVisible(true);
  };

  const handleArchiveResource = (resource) => {
    setSelectedResource(resource);
    setIsArchiveModalVisible(true);
  };

  const handleDeleteResource = (resourceId) => {
    setResources(resources.filter((r) => r.id !== resourceId));
    message.success("Resource deleted successfully");
  };

  const handleSaveResource = (values) => {
    const tags = values.tags.split(",").map((tag) => tag.trim());
    const newResource = {
      ...values,
      id: selectedResource ? selectedResource.id : `${resources.length + 1}`,
      tags,
      status: values.status || "pending",
      uploadDate: selectedResource
        ? selectedResource.uploadDate
        : new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      downloads: selectedResource ? selectedResource.downloads : 0,
      views: selectedResource ? selectedResource.views : 0,
      rating: selectedResource ? selectedResource.rating : 0,
      engagement: selectedResource
        ? selectedResource.engagement
        : {
            lastWeekViews: 0,
            lastWeekDownloads: 0,
            averageRating: 0,
            feedback: 0,
          },
    };

    if (selectedResource) {
      setResources(
        resources.map((r) => (r.id === selectedResource.id ? newResource : r))
      );
      message.success("Resource updated successfully");
    } else {
      setResources([...resources, newResource]);
      message.success("Resource added successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  const getTypeIcon = (type) => {
    const icons = {
      pdf: <FileTextOutlined style={{ color: "#ff4d4f" }} />,
      video: <VideoCameraOutlined style={{ color: "#1890ff" }} />,
      link: <LinkOutlined style={{ color: "#52c41a" }} />,
      article: <FileOutlined style={{ color: "#722ed1" }} />,
    };
    return icons[type] || <FileOutlined />;
  };

  const getStatusColor = (status) => {
    const colors = {
      published: "success",
      pending: "warning",
      archived: "default",
      rejected: "error",
    };
    return colors[status];
  };

  const columns = [
    {
      title: "Resource",
      key: "resource",
      render: (record) => (
        <Space>
          {getTypeIcon(record.type)}
          <Space direction="vertical" size={0}>
            <Text strong style={{ fontSize: "16px" }}>
              {record.title}
            </Text>
            <Space size={4} style={{ marginTop: "4px" }}>
              {record.tags.map((tag) => (
                <Tag
                  key={tag}
                  color="blue"
                  style={{ borderRadius: "4px", fontSize: "10px" }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </Space>
        </Space>
      ),
    },
    {
      title: "Category & Access",
      key: "category",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Tag
            color="cyan"
            icon={<Layers style={{ width: "10px", height: "10px" }} />}
          >
            &nbsp;{categories.find((c) => c.value === record.category)?.label}
          </Tag>
          <Tag
            color="purple"
            icon={<Users style={{ width: "10px", height: "10px" }} />}
          >
            &nbsp;
            {accessLevels.find((a) => a.value === record.accessLevel)?.label}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Engagement",
      key: "engagement",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">
              <EyeOutlined /> {record.views}
            </Text>
            <Text type="secondary">
              <DownloadOutlined /> {record.downloads}
            </Text>
          </Space>
          <Progress
            percent={record.rating * 20}
            size="small"
            format={() => `${record.rating}/5`}
            strokeColor="#faad14"
          />
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Tag
            color={getStatusColor(record.status)}
            icon={
              record.status === "published" ? (
                <CheckCircleOutlined />
              ) : record.status === "pending" ? (
                <ClockCircleOutlined />
              ) : record.status === "archived" ? (
                <FileArchive style={{ width: "12px", height: "12px" }} />
              ) : (
                <FileX style={{ width: "12px", height: "12px" }} />
              )
            }
          >
            {record.status.toUpperCase()}
          </Tag>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Last modified: {record.lastModified}
          </Text>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewResource(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Resource">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditResource(record)}
            />
          </Tooltip>
          <Tooltip title="Archive Resource">
            <Button
              type="text"
              icon={<FileArchive style={{ width: "16px", height: "16px" }} />}
              onClick={() => handleArchiveResource(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Resource"
            description="Are you sure you want to delete this resource? This action cannot be undone."
            onConfirm={() => handleDeleteResource(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 4 }}>
      {/* Summary Statistics */}
      <Row gutter={[4, 4]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title={
                <Space>
                  <BookOpen
                    style={{ width: 16, height: 16, color: "#1890ff" }}
                  />
                  <Text strong>Total Resources</Text>
                </Space>
              }
              value={totalResources}
              prefix={<Badge status="processing" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title={
                <Space>
                  <FileCheck
                    style={{ width: 16, height: 16, color: "#52c41a" }}
                  />
                  <Text strong>Published Resources</Text>
                </Space>
              }
              value={publishedResources}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title={
                <Space>
                  <DownloadOutlined style={{ color: "#722ed1" }} />
                  <Text strong>Total Downloads</Text>
                </Space>
              }
              value={totalDownloads}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title={
                <Space>
                  <TrendingUp
                    style={{ width: 16, height: 16, color: "#fa8c16" }}
                  />
                  <Text strong>Total Views</Text>
                </Space>
              }
              value={totalViews}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <div style={{ marginBottom: 24 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                Resource Management
              </Title>
            </Col>
            <Col>
              <Space>
                <Button
                  icon={<CloudUploadOutlined />}
                  type="primary"
                  onClick={handleAddResource}
                >
                  Upload New Resource
                </Button>
                <Button icon={<DownloadOutlined />}>Export Report</Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col span={8}>
            <Input
              placeholder="Search resources..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ borderRadius: 6 }}
            />
          </Col>
          <Col>
            <Space>
              <Select
                placeholder="Filter by Category"
                style={{ width: 180 }}
                value={filterCategory}
                onChange={setFilterCategory}
              >
                <Select.Option value="all">All Categories</Select.Option>
                {categories.map((cat) => (
                  <Select.Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Select.Option>
                ))}
              </Select>
              <Select
                placeholder="Filter by Status"
                style={{ width: 150 }}
                value={filterStatus}
                onChange={setFilterStatus}
              >
                <Select.Option value="all">All Status</Select.Option>
                <Select.Option value="published">Published</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="archived">Archived</Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>

        {/* Resources Table */}
        <Table
          size="small"
          columns={columns}
          dataSource={resources}
          rowKey="id"
          pagination={{
            total: resources.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} resources`,
          }}
        />

        {/* Add/Edit Resource Modal */}
        <Modal
          title={
            <Space>
              {selectedResource ? (
                <EditOutlined style={{ color: "#1890ff" }} />
              ) : (
                <CloudUploadOutlined style={{ color: "#1890ff" }} />
              )}
              <Text strong>
                {selectedResource ? "Edit Resource" : "Upload New Resource"}
              </Text>
            </Space>
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveResource}
            initialValues={{ status: "pending", accessLevel: "all" }}
          >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="title"
                  label="Resource Title"
                  rules={[
                    { required: true, message: "Please enter resource title" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="type"
                  label="Resource Type"
                  rules={[
                    { required: true, message: "Please select resource type" },
                  ]}
                >
                  <Select>
                    <Select.Option value="pdf">PDF Document</Select.Option>
                    <Select.Option value="video">Video</Select.Option>
                    <Select.Option value="link">External Link</Select.Option>
                    <Select.Option value="article">Article</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select category" },
                  ]}
                >
                  <Select>
                    {categories.map((cat) => (
                      <Select.Option key={cat.value} value={cat.value}>
                        {cat.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="accessLevel"
                  label="Access Level"
                  rules={[
                    { required: true, message: "Please select access level" },
                  ]}
                >
                  <Select>
                    {accessLevels.map((level) => (
                      <Select.Option key={level.value} value={level.value}>
                        {level.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                { required: true, message: "Please enter at least one tag" },
              ]}
              help="Separate tags with commas"
            >
              <Input placeholder="career, guide, 2024" />
            </Form.Item>

            <Form.Item
              name="url"
              label="Resource URL"
              rules={[{ required: true, message: "Please enter resource URL" }]}
            >
              <Input />
            </Form.Item>

            <Alert
              message="Resource Upload Guidelines"
              description={
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: 16,
                    marginTop: 8,
                  }}
                >
                  <li>Maximum file size: 100MB</li>
                  <li>Supported formats: PDF, MP4, DOC, DOCX</li>
                  <li>Resources will be reviewed before publishing</li>
                </ul>
              }
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {selectedResource ? "Update Resource" : "Upload Resource"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* View Resource Modal */}
        <Modal
          title={null}
          open={isViewModalVisible}
          onCancel={() => setIsViewModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedResource && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: 32,
                  background: "#f5f5f5",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Space direction="vertical" size={4}>
                  <Space size={4}>
                    {selectedResource.tags.map((tag) => (
                      <Tag
                        key={tag}
                        color="blue"
                        style={{ borderRadius: "9999px" }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                  <Title level={3} style={{ marginBottom: 8 }}>
                    {selectedResource.title}
                  </Title>
                  <Space split={<Divider type="vertical" />}>
                    <Text type="secondary">
                      Uploaded on {selectedResource.uploadDate}
                    </Text>
                    <Text type="secondary">
                      Version {selectedResource.version}
                    </Text>
                    <Tag color={getStatusColor(selectedResource.status)}>
                      {selectedResource.status.toUpperCase()}
                    </Tag>
                  </Space>
                </Space>
              </div>

              {/* Content */}
              <div style={{ padding: 32 }}>
                <Row gutter={[24, 24]}>
                  {/* Resource Details */}
                  <Col span={16}>
                    <Card title="Resource Information" bordered={false}>
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <div>
                          <Text type="secondary">Description</Text>
                          <Paragraph style={{ marginTop: 4 }}>
                            {selectedResource.description}
                          </Paragraph>
                        </div>
                        <Row gutter={48}>
                          <Col span={12}>
                            <Text type="secondary">Category</Text>
                            <div style={{ marginTop: 4 }}>
                              <Tag
                                color="cyan"
                                icon={
                                  <Layers
                                    style={{ width: "12px", height: "12px" }}
                                  />
                                }
                              >
                                {
                                  categories.find(
                                    (c) => c.value === selectedResource.category
                                  )?.label
                                }
                              </Tag>
                            </div>
                          </Col>
                          <Col span={12}>
                            <Text type="secondary">Access Level</Text>
                            <div style={{ marginTop: 4 }}>
                              <Tag
                                color="purple"
                                icon={
                                  <Users
                                    style={{ width: "12px", height: "12px" }}
                                  />
                                }
                              >
                                {
                                  accessLevels.find(
                                    (a) =>
                                      a.value === selectedResource.accessLevel
                                  )?.label
                                }
                              </Tag>
                            </div>
                          </Col>
                        </Row>
                      </Space>
                    </Card>
                  </Col>

                  {/* Engagement Stats */}
                  <Col span={8}>
                    <Card title="Engagement" bordered={false}>
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <Statistic
                          title="Total Views"
                          value={selectedResource.views}
                          prefix={<EyeOutlined />}
                        />
                        <Statistic
                          title="Total Downloads"
                          value={selectedResource.downloads}
                          prefix={<DownloadOutlined />}
                        />
                        <div>
                          <Text type="secondary">Rating</Text>
                          <div style={{ marginTop: 4 }}>
                            <Progress
                              percent={selectedResource.rating * 20}
                              format={() => `${selectedResource.rating}/5`}
                              strokeColor="#faad14"
                            />
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  {/* Weekly Stats */}
                  <Col span={24}>
                    <Card title="Weekly Performance" bordered={false}>
                      <Row gutter={24}>
                        <Col span={6}>
                          <Statistic
                            title="Views This Week"
                            value={selectedResource.engagement.lastWeekViews}
                            prefix={
                              <TrendingUp
                                style={{ width: "16px", height: "16px" }}
                              />
                            }
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Downloads This Week"
                            value={
                              selectedResource.engagement.lastWeekDownloads
                            }
                            prefix={<DownloadOutlined />}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Average Rating"
                            value={selectedResource.engagement.averageRating}
                            prefix={<StarOutlined />}
                            precision={1}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="User Feedback"
                            value={selectedResource.engagement.feedback}
                            prefix={<MessageOutlined />}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Approval Information */}
                  {selectedResource.approvedBy && (
                    <Col span={24}>
                      <Card title="Approval Information" bordered={false}>
                        <Space split={<Divider type="vertical" />}>
                          <Text>
                            Approved by:{" "}
                            <Text strong>{selectedResource.approvedBy}</Text>
                          </Text>
                          <Text>
                            Approval Date:{" "}
                            <Text strong>{selectedResource.approvalDate}</Text>
                          </Text>
                        </Space>
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "24px 32px",
                  background: "#ffffff",
                  borderTop: "1px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <Button onClick={() => setIsViewModalVisible(false)}>
                  Close
                </Button>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  href={selectedResource.url}
                  target="_blank"
                >
                  Download Resource
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Archive Resource Modal */}
        <Modal
          title="Archive Resource"
          open={isArchiveModalVisible}
          onCancel={() => setIsArchiveModalVisible(false)}
          footer={null}
        >
          {selectedResource && (
            <Form
              layout="vertical"
              onFinish={(values) => {
                const updatedResources = resources.map((r) => {
                  if (r.id === selectedResource.id) {
                    return {
                      ...r,
                      status: "archived",
                      archiveReason: values.reason,
                      archiveDate: new Date().toISOString().split("T")[0],
                    };
                  }
                  return r;
                });
                setResources(updatedResources);
                setIsArchiveModalVisible(false);
                message.success("Resource archived successfully");
              }}
            >
              <Alert
                message="Archive Confirmation"
                description={`Are you sure you want to archive "${selectedResource.title}"? Archived resources will be hidden from users but can be restored later.`}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />

              <Form.Item
                name="reason"
                label="Archive Reason"
                rules={[
                  {
                    required: true,
                    message: "Please provide a reason for archiving",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                  <Button onClick={() => setIsArchiveModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Confirm Archive
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default ResourceManagement;
