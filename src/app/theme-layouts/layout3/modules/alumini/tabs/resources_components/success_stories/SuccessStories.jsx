import React from "react";

import { useState } from "react";
import {
  Card,
  Button,
  Space,
  Table,
  Tag,
  Input,
  Form,
  Upload,
  Modal,
  message,
  Typography,
  Row,
  Col,
  Switch,
  Tooltip,
  Popconfirm,
  Statistic,
  Avatar,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  StarOutlined,
  TrophyOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  UserOutlined,
  BookOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import type { SuccessStory } from "./types";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Mock data with more detailed success stories
const mockStories = [
  {
    id: "1",
    alumniName: "Alice Johnson",
    graduationYear: 2018,
    title: "Senior Software Engineer",
    company: "Google",
    industry: "Technology",
    imageUrl: "/placeholder.svg?height=400&width=400",
    story:
      "Started as an intern and worked my way up through dedication and continuous learning...",
    advice:
      "Never stop learning. The tech industry moves fast, and staying current is key.",
    achievements: [
      "Led a team of 5 engineers on a critical project",
      "Launched 3 major features used by millions",
      "Received 2 promotions in 3 years",
    ],
    featured: true,
    socialLinks: {
      linkedIn: "https://linkedin.com/in/alice",
      website: "https://alice.dev",
    },
    careerPath: [
      {
        role: "Software Engineer",
        company: "Google",
        duration: "2018-2020",
        description: "Full-stack development",
      },
      {
        role: "Senior Software Engineer",
        company: "Google",
        duration: "2020-present",
        description: "Technical lead",
      },
    ],
    skills: ["React", "Node.js", "Cloud Architecture"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
    mentoring: {
      available: true,
      expertise: ["Career Guidance", "Technical Mentoring"],
    },
  },
  {
    id: "2",
    alumniName: "Bob Williams",
    graduationYear: 2019,
    title: "Data Science Lead",
    company: "Microsoft",
    industry: "Technology",
    imageUrl: "/placeholder.svg?height=400&width=400",
    story:
      "Transitioned from software engineering to data science through focused upskilling...",
    advice: "Don't be afraid to pivot your career if you find a new passion.",
    achievements: [
      "Built company-wide data analytics platform",
      "Published 2 research papers",
      "Mentored 10+ junior data scientists",
    ],
    featured: false,
    socialLinks: {
      linkedIn: "https://linkedin.com/in/bob",
      twitter: "https://twitter.com/bob",
    },
    skills: ["Python", "Machine Learning", "Data Visualization"],
    certifications: [
      "Microsoft Data Scientist",
      "Deep Learning Specialization",
    ],
    mentoring: {
      available: true,
      expertise: ["Data Science", "Career Transition"],
    },
  },
];

const AlumniStoriesAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState(mockStories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [previewStory, setPreviewStory] = useState(null);
  const [form] = Form.useForm();

  const handleAddStory = () => {
    setEditingStory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    form.setFieldsValue({
      ...story,
      photo: story.imageUrl ? [{ url: story.imageUrl }] : [],
    });
    setIsModalVisible(true);
  };

  const handlePreview = (story) => {
    setPreviewStory(story);
    setIsPreviewVisible(true);
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        imageUrl: values.photo?.[0]?.url || values.photo?.[0]?.response?.url,
      };

      if (editingStory) {
        // Update existing story
        setStories((prev) =>
          prev.map((s) =>
            s.id === editingStory.id ? { ...s, ...formData } : s
          )
        );
        message.success("Success story updated");
      } else {
        // Create new story
        const newStory = {
          id: `story-${Date.now()}`,
          ...formData,
        };
        setStories((prev) => [...prev, newStory]);
        message.success("Success story created");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save story");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      setStories((prev) => prev.filter((s) => s.id !== id));
      message.success("Story deleted successfully");
    } catch (error) {
      message.error("Failed to delete story");
    } finally {
      setLoading(false);
    }
  };

  const renderMetrics = () => (
    <Row gutter={[4, 4]} className="mb-6">
      <Col span={6}>
        <Card style={{ borderColor: "#1890ff" }}>
          <Statistic
            title="Total Stories"
            value={stories.length}
            prefix={<BookOutlined />}
            valueStyle={{ color: "#1890ff" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderColor: "#52c41a" }}>
          <Statistic
            title="Featured Stories"
            value={stories.filter((s) => s.featured).length}
            prefix={<StarOutlined />}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderColor: "#722ed1" }}>
          <Statistic
            title="Industries Represented"
            value={new Set(stories.map((s) => s.industry)).size}
            prefix={<RiseOutlined />}
            valueStyle={{ color: "#722ed1" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderColor: "#faad14" }}>
          <Statistic
            title="Available Mentors"
            value={stories.filter((s) => s.mentoring?.available).length}
            prefix={<TrophyOutlined />}
            valueStyle={{ color: "#faad14" }}
          />
        </Card>
      </Col>
    </Row>
  );

  const renderStoryPreview = (story) => (
    <div className="story-preview">
      <Row gutter={24}>
        <Col span={8}>
          <Avatar
            src={story.imageUrl}
            size={200}
            icon={<UserOutlined />}
            className="mb-4"
          />
          <Title level={4}>{story.alumniName}</Title>
          <Text type="secondary">Class of {story.graduationYear}</Text>

          <Divider />

          <Space direction="vertical" size="small">
            <Tag color="blue">{story.title}</Tag>
            <Tag color="cyan">{story.company}</Tag>
            <Tag color="purple">{story.industry}</Tag>
          </Space>

          <Divider />

          <Space direction="vertical">
            {story.socialLinks?.linkedIn && (
              <Button
                icon={<LinkedinOutlined />}
                href={story.socialLinks.linkedIn}
                target="_blank"
              >
                LinkedIn Profile
              </Button>
            )}
            {story.socialLinks?.website && (
              <Button
                icon={<GlobalOutlined />}
                href={story.socialLinks.website}
                target="_blank"
              >
                Personal Website
              </Button>
            )}
          </Space>
        </Col>
        <Col span={16}>
          <Title level={4}>Success Story</Title>
          <Paragraph>{story.story}</Paragraph>

          <Title level={4}>Career Path</Title>
          {story.careerPath?.map((path, index) => (
            <Card key={index} size="small" className="mb-2">
              <Text strong>{path.role}</Text>
              <br />
              <Text type="secondary">
                {path.company} • {path.duration}
              </Text>
              <Paragraph>{path.description}</Paragraph>
            </Card>
          ))}

          <Title level={4}>Key Achievements</Title>
          <ul>
            {story.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>

          <Title level={4}>Career Advice</Title>
          <Paragraph>{story.advice}</Paragraph>

          {story.mentoring?.available && (
            <>
              <Title level={4}>Mentoring</Title>
              <Space wrap>
                {story.mentoring.expertise.map((exp, index) => (
                  <Tag key={index} color="green">
                    {exp}
                  </Tag>
                ))}
              </Space>
            </>
          )}
        </Col>
      </Row>
    </div>
  );

  return (
    <div style={{ padding: 4, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4}>Alumni Success Stories</Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddStory}
              >
                Add Success Story
              </Button>
            </Col>
          </Row>

          {renderMetrics()}

          <Table
            size="small"
            dataSource={stories}
            rowKey="id"
            columns={[
              {
                title: "Alumni",
                key: "alumni",
                render: (_, record) => (
                  <Space>
                    <Avatar
                      src={record.imageUrl}
                      icon={!record.imageUrl && <UserOutlined />}
                    />
                    <Space direction="vertical" size={0}>
                      <Text strong>{record.alumniName}</Text>
                      <Text type="secondary">
                        Class of {record.graduationYear}
                      </Text>
                    </Space>
                    {record.featured && (
                      <StarOutlined style={{ color: "#faad14" }} />
                    )}
                  </Space>
                ),
              },
              {
                title: "Current Role",
                key: "role",
                render: (_, record) => (
                  <Space direction="vertical" size={0}>
                    <Text>{record.title}</Text>
                    <Text type="secondary">{record.company}</Text>
                  </Space>
                ),
              },
              {
                title: "Industry",
                dataIndex: "industry",
                key: "industry",
                render: (industry) => <Tag color="blue">{industry}</Tag>,
              },
              {
                title: "Mentoring",
                key: "mentoring",
                render: (_, record) =>
                  record.mentoring?.available ? (
                    <Tag color="success">Available</Tag>
                  ) : (
                    <Tag color="default">Not Available</Tag>
                  ),
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <Space>
                    <Tooltip title="Preview">
                      <Button
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(record)}
                      />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditStory(record)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Popconfirm
                        title="Are you sure you want to delete this story?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Tooltip>
                  </Space>
                ),
              },
            ]}
          />
        </Space>
      </Card>

      {/* Story Form Modal */}
      <Modal
        title={
          <Space>
            {editingStory ? <EditOutlined /> : <PlusOutlined />}
            <span>{`${editingStory ? "Edit" : "Add"} Success Story`}</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="alumniName"
                label="Alumni Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="featured"
                label="Featured Story"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="graduationYear"
                label="Graduation Year"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="title"
                label="Current Position"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="photo"
            label="Profile Photo"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              action="/api/upload"
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="story"
            label="Success Story"
            rules={[{ required: true }]}
          >
            <ReactQuill
              theme="snow"
              style={{ height: 200, marginBottom: 50 }}
            />
          </Form.Item>

          <Form.Item
            name="advice"
            label="Career Advice"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.List name="achievements">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label={index === 0 ? "Achievements" : ""}
                      required={false}
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input achievement or delete this field",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter achievement"
                        style={{ width: 500 }}
                      />
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      onClick={() => remove(field.name)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Achievement
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingStory ? "Update" : "Create"} Story
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title="Story Preview"
        open={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsPreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={1000}
      >
        {previewStory && renderStoryPreview(previewStory)}
      </Modal>

      <style>{`
        .story-preview {
          padding: 20px;
        }
        
        .ant-upload-select-picture-card {
          width: 100%;
          height: 200px;
        }

        .ant-form-item-label {
          font-weight: 500;
        }

        .ql-editor {
          min-height: 200px;
        }

        .mb-2 {
          margin-bottom: 8px;
        }

        .mb-4 {
          margin-bottom: 16px;
        }

        .mb-6 {
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
};

export default AlumniStoriesAdmin;
