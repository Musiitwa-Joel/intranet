import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Dropdown,
  Typography,
  Badge,
  Modal,
  message,
  Popconfirm,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
  FilterOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import JobForm from "./JobForm";
import JobPreview from "./JobPreview";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const JobManagement = ({ jobs, onCreateJob, onUpdateJob, onDeleteJob }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [previewJob, setPreviewJob] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    type: "all",
  });

  const handleEdit = (job) => {
    // Format the dates using dayjs before setting the job data
    const formattedJob = {
      ...job,
      applicationDeadline: job.applicationDeadline
        ? dayjs(job.applicationDeadline)
        : undefined,
      createdAt: job.createdAt ? dayjs(job.createdAt) : undefined,
      updatedAt: job.updatedAt ? dayjs(job.updatedAt) : undefined,
    };
    setSelectedJob(formattedJob);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    onDeleteJob(id);
    message.success("Job deleted successfully");
  };

  const handleStatusChange = (id, status) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      onUpdateJob(id, { ...job, status });
      message.success(`Job status updated to ${status}`);
    }
  };

  const handlePriorityChange = (id, priority) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      onUpdateJob(id, { ...job, priority });
      message.success(`Job priority updated to ${priority}`);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "default",
      published: "success",
      archived: "warning",
      expired: "error",
    };
    return colors[status];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      normal: "blue",
      featured: "purple",
      urgent: "red",
    };
    return colors[priority];
  };

  const columns = [
    {
      title: "Job Details",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <Text strong>{text}</Text>
            {record.isAlumniOwned && (
              <Tag color="cyan" icon={<StarOutlined />}>
                Alumni Owned
              </Tag>
            )}
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.company.name} • {record.location.city},{" "}
            {record.location.country}
          </Text>
        </Space>
      ),
    },
    {
      title: "Type & Salary",
      key: "employment",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Tag color="blue">{record.employmentType}</Tag>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.salaryRange.currency}{" "}
            {record.salaryRange.min.toLocaleString()} -{" "}
            {record.salaryRange.max.toLocaleString()}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Badge status={getStatusColor(record.status)} text={record.status} />
          <Tag color={getPriorityColor(record.priority)}>{record.priority}</Tag>
        </Space>
      ),
    },
    {
      title: "Applications",
      key: "applications",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.applications}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.views} views
          </Text>
        </Space>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "applicationDeadline",
      key: "deadline",
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {new Date(date).toLocaleDateString()}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Preview">
            <Button
              icon={<EyeOutlined />}
              onClick={() => setPreviewJob(record)}
            />
          </Tooltip>

          <Dropdown
            menu={{
              items: [
                {
                  key: "status",
                  label: "Change Status",
                  children: [
                    {
                      key: "published",
                      label: "Publish",
                      icon: <CheckCircleOutlined />,
                      onClick: () => handleStatusChange(record.id, "published"),
                    },
                    {
                      key: "archived",
                      label: "Archive",
                      icon: <StopOutlined />,
                      onClick: () => handleStatusChange(record.id, "archived"),
                    },
                  ],
                },
                {
                  key: "priority",
                  label: "Set Priority",
                  children: [
                    {
                      key: "normal",
                      label: "Normal",
                      onClick: () => handlePriorityChange(record.id, "normal"),
                    },
                    {
                      key: "featured",
                      label: "Featured",
                      onClick: () =>
                        handlePriorityChange(record.id, "featured"),
                    },
                    {
                      key: "urgent",
                      label: "Urgent",
                      onClick: () => handlePriorityChange(record.id, "urgent"),
                    },
                  ],
                },
              ],
            }}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
          <Popconfirm
            title="Are you sure you want to delete this job?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="job-management">
      <Card>
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          className="table-header"
        >
          <Col>
            <Space size={16}>
              <Title level={4} style={{ margin: 0 }}>
                Job Listings
              </Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Create Job
              </Button>
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Input
                placeholder="Search jobs..."
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={(value) => setFilters({ ...filters, status: value })}
              >
                <Option value="all">All Status</Option>
                <Option value="published">Published</Option>
                <Option value="draft">Draft</Option>
                <Option value="archived">Archived</Option>
                <Option value="expired">Expired</Option>
              </Select>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={(value) => setFilters({ ...filters, type: value })}
              >
                <Option value="all">All Types</Option>
                <Option value="full-time">Full Time</Option>
                <Option value="part-time">Part Time</Option>
                <Option value="contract">Contract</Option>
                <Option value="internship">Internship</Option>
              </Select>
              <Button icon={<FilterOutlined />}>More Filters</Button>
            </Space>
          </Col>
        </Row>

        <Table
          size="small"
          columns={columns}
          dataSource={jobs}
          rowKey="id"
          pagination={{
            total: jobs.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} jobs`,
          }}
        />
      </Card>

      <Modal
        title={selectedJob ? "Edit Job" : "Create New Job"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedJob(null);
        }}
        width={1000}
        footer={null}
      >
        <JobForm
          initialValues={selectedJob}
          onSubmit={(values) => {
            if (selectedJob) {
              onUpdateJob(selectedJob.id, values);
            } else {
              onCreateJob(values);
            }
            setIsModalVisible(false);
            setSelectedJob(null);
          }}
        />
      </Modal>

      <JobPreview
        job={previewJob}
        open={!!previewJob}
        onClose={() => setPreviewJob(null)}
      />

      <style>{`
        .job-management {
          padding: 4px;
          padding-left: 2px
          background: #f0f2f5;
          min-height: 100vh;
        }

        .table-header {
          margin-bottom: 24px;
        }

        .ant-card {
          border-radius: 8px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
            0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        .ant-table {
          background: white;
          border-radius: 8px;
        }

        .ant-table-thead > tr > th {
          background: #fafafa;
        }
      `}</style>
    </div>
  );
};

export default JobManagement;
