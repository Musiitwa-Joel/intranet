import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Tabs,
  Spin,
  Typography,
  Row,
  Checkbox,
  Col,
  Divider,
  Tag,
  Space,
  Table,
  Modal,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CopyOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Mock data for email templates (same as in email-sender-admin.jsx)
const initialTemplates = [
  {
    id: 1,
    name: "Standard Announcement",
    subject: "[Nkumba University] - {{announcement_title}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.nkumbauniversity.ac.ug/images/logo.png" alt="Nkumba University Logo" style="max-width: 150px;">
        </div>
        <div style="background-color: #4B0082; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px;">
          {{announcement_title}}
        </div>
        <div style="padding: 20px 0;">
          <p>Dear {{recipient_name}},</p>
          <div>{{announcement_content}}</div>
          <p>For more information, please visit the <a href="{{portal_link}}" style="color: #4B0082; text-decoration: none; font-weight: bold;">Student Portal</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 14px;">
          <p style="margin: 0;">If you have any questions, please contact us at:</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> info@nkumbauniversity.ac.ug</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +256 414 123456</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
          <p>&copy; 2025 Nkumba University. All rights reserved.</p>
          <p>Entebbe Road, Kampala, Uganda</p>
        </div>
      </div>
    `,
    category: "general",
    isDefault: true,
    createdBy: "admin",
    createdAt: "2025-01-15T10:30:00",
    updatedAt: "2025-02-20T14:45:00",
  },
  {
    id: 2,
    name: "Academic Announcement",
    subject: "[Nkumba University] Academic Update - {{announcement_title}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.nkumbauniversity.ac.ug/images/logo.png" alt="Nkumba University Logo" style="max-width: 150px;">
        </div>
        <div style="background-color: #00308F; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px;">
          {{announcement_title}}
        </div>
        <div style="padding: 20px 0;">
          <p>Dear {{recipient_name}},</p>
          <div>{{announcement_content}}</div>
          <p>Please ensure you take note of all important dates and requirements.</p>
          <p>For more information, please visit the <a href="{{portal_link}}" style="color: #00308F; text-decoration: none; font-weight: bold;">Academic Portal</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 14px;">
          <p style="margin: 0;">If you have any questions, please contact the Academic Office:</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> academic@nkumbauniversity.ac.ug</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +256 414 123457</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
          <p>&copy; 2025 Nkumba University. All rights reserved.</p>
          <p>Entebbe Road, Kampala, Uganda</p>
        </div>
      </div>
    `,
    category: "academic",
    isDefault: false,
    createdBy: "academic-officer",
    createdAt: "2025-01-20T11:15:00",
    updatedAt: "2025-02-25T09:30:00",
  },
  {
    id: 3,
    name: "Urgent Announcement",
    subject: "[URGENT] [Nkumba University] - {{announcement_title}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.nkumbauniversity.ac.ug/images/logo.png" alt="Nkumba University Logo" style="max-width: 150px;">
        </div>
        <div style="background-color: #B22222; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px;">
          URGENT: {{announcement_title}}
        </div>
        <div style="padding: 20px 0;">
          <p>Dear {{recipient_name}},</p>
          <div style="padding: 15px; background-color: #FFEBEE; border-left: 4px solid #B22222; margin-bottom: 15px;">
            {{announcement_content}}
          </div>
          <p>Please take immediate action as required.</p>
          <p>For more information, please visit the <a href="{{portal_link}}" style="color: #B22222; text-decoration: none; font-weight: bold;">Student Portal</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 14px;">
          <p style="margin: 0;">If you have any questions, please contact us immediately at:</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> urgent@nkumbauniversity.ac.ug</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +256 414 123459</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
          <p>&copy; 2025 Nkumba University. All rights reserved.</p>
          <p>Entebbe Road, Kampala, Uganda</p>
        </div>
      </div>
    `,
    category: "urgent",
    isDefault: false,
    createdBy: "admin",
    createdAt: "2025-02-10T09:30:00",
    updatedAt: "2025-03-15T11:45:00",
  },
  {
    id: 4,
    name: "Financial Announcement",
    subject: "[Nkumba University] Financial Notice - {{announcement_title}}",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.nkumbauniversity.ac.ug/images/logo.png" alt="Nkumba University Logo" style="max-width: 150px;">
        </div>
        <div style="background-color: #1B5E20; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px;">
          {{announcement_title}}
        </div>
        <div style="padding: 20px 0;">
          <p>Dear {{recipient_name}},</p>
          <div>{{announcement_content}}</div>
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #1B5E20; border-radius: 5px;">
            <p style="font-weight: bold; margin: 0;">Important Financial Information:</p>
            <p style="margin: 5px 0;"><strong>Due Date:</strong> {{due_date}}</p>
            <p style="margin: 5px 0;"><strong>Payment Methods:</strong> {{payment_methods}}</p>
          </div>
          <p>For more information, please visit the <a href="{{finance_portal_link}}" style="color: #1B5E20; text-decoration: none; font-weight: bold;">Finance Portal</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 14px;">
          <p style="margin: 0;">If you have any questions, please contact the Finance Office:</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> finance@nkumbauniversity.ac.ug</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +256 414 123460</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
          <p>&copy; 2025 Nkumba University. All rights reserved.</p>
          <p>Entebbe Road, Kampala, Uganda</p>
        </div>
      </div>
    `,
    category: "financial",
    isDefault: false,
    createdBy: "finance-officer",
    createdAt: "2025-02-15T14:20:00",
    updatedAt: "2025-03-20T09:15:00",
  },
];

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [form] = Form.useForm();

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchText.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || template.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle creating a new template
  const handleCreateTemplate = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newTemplate = {
        id: templates.length + 1,
        name: values.name,
        subject: values.subject,
        content: editorContent,
        category: values.category,
        isDefault: values.isDefault || false,
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // If this is set as default, update other templates
      let updatedTemplates = [...templates];
      if (values.isDefault) {
        updatedTemplates = updatedTemplates.map((template) => {
          if (template.category === values.category) {
            return {
              ...template,
              isDefault: false,
            };
          }
          return template;
        });
      }

      setTemplates([newTemplate, ...updatedTemplates]);
      setIsModalVisible(false);
      form.resetFields();
      setEditorContent("");
      setLoading(false);
      message.success("Template created successfully!");
    }, 1500);
  };

  // Handle editing a template
  const handleEditTemplate = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      let updatedTemplates = templates.map((template) => {
        if (template.id === currentTemplate.id) {
          return {
            ...template,
            name: values.name,
            subject: values.subject,
            content: editorContent,
            category: values.category,
            isDefault: values.isDefault || false,
            updatedAt: new Date().toISOString(),
          };
        }
        return template;
      });

      // If this is set as default, update other templates
      if (values.isDefault) {
        updatedTemplates = updatedTemplates.map((template) => {
          if (
            template.id !== currentTemplate.id &&
            template.category === values.category
          ) {
            return {
              ...template,
              isDefault: false,
            };
          }
          return template;
        });
      }

      setTemplates(updatedTemplates);
      setIsModalVisible(false);
      form.resetFields();
      setCurrentTemplate(null);
      setEditorContent("");
      setLoading(false);
      message.success("Template updated successfully!");
    }, 1500);
  };

  // Handle deleting a template
  const handleDeleteTemplate = (id) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedTemplates = templates.filter(
        (template) => template.id !== id
      );
      setTemplates(updatedTemplates);
      setLoading(false);
      message.success("Template deleted successfully!");
    }, 1000);
  };

  // Handle duplicating a template
  const handleDuplicateTemplate = (template) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const duplicatedTemplate = {
        ...template,
        id: templates.length + 1,
        name: `${template.name} (Copy)`,
        isDefault: false,
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTemplates([duplicatedTemplate, ...templates]);
      setLoading(false);
      message.success("Template duplicated successfully!");
    }, 1000);
  };

  // Handle setting a template as default
  const handleSetDefault = (id) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const templateToUpdate = templates.find((t) => t.id === id);

      const updatedTemplates = templates.map((template) => {
        if (template.category === templateToUpdate.category) {
          return {
            ...template,
            isDefault: template.id === id,
          };
        }
        return template;
      });

      setTemplates(updatedTemplates);
      setLoading(false);
      message.success("Default template updated successfully!");
    }, 1000);
  };

  // Handle editor content change
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  // Handle edit button click
  const handleEditClick = (template) => {
    setCurrentTemplate(template);
    form.setFieldsValue({
      name: template.name,
      subject: template.subject,
      category: template.category,
      isDefault: template.isDefault,
    });
    setEditorContent(template.content);
    setIsModalVisible(true);
  };

  // Handle preview button click
  const handlePreviewClick = (template) => {
    setCurrentTemplate(template);
    setIsPreviewVisible(true);
  };

  // Columns for templates table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          {record.isDefault && <StarFilled style={{ color: "#faad14" }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        let color;
        switch (category) {
          case "general":
            color = "blue";
            break;
          case "academic":
            color = "green";
            break;
          case "urgent":
            color = "red";
            break;
          case "financial":
            color = "gold";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{category}</Tag>;
      },
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Preview">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handlePreviewClick(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditClick(record)}
            />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button
              type="text"
              icon={<CopyOutlined />}
              onClick={() => handleDuplicateTemplate(record)}
            />
          </Tooltip>
          {!record.isDefault && (
            <Tooltip title="Set as Default">
              <Button
                type="text"
                icon={<StarOutlined />}
                onClick={() => handleSetDefault(record.id)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="Are you sure you want to delete this template?"
            onConfirm={() => handleDeleteTemplate(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
            disabled={record.isDefault}
          >
            <Tooltip
              title={
                record.isDefault ? "Cannot delete default template" : "Delete"
              }
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                disabled={record.isDefault}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Card
        title={
          <Title level={4} style={{ margin: 0, color: "#4B0082" }}>
            Email Templates
          </Title>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentTemplate(null);
              form.resetFields();
              setEditorContent("");
              setIsModalVisible(true);
            }}
            style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
          >
            Create Template
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Input
                placeholder="Search templates"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by category"
                style={{ width: "100%" }}
                value={filterCategory}
                onChange={setFilterCategory}
              >
                <Option value="all">All Categories</Option>
                <Option value="general">General</Option>
                <Option value="academic">Academic</Option>
                <Option value="urgent">Urgent</Option>
                <Option value="financial">Financial</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTemplates}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Create/Edit Template Modal */}
      <Modal
        title={currentTemplate ? "Edit Template" : "Create Template"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={currentTemplate ? handleEditTemplate : handleCreateTemplate}
        >
          <Form.Item
            name="name"
            label="Template Name"
            rules={[
              { required: true, message: "Please enter the template name" },
            ]}
          >
            <Input placeholder="Enter template name" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Email Subject"
            rules={[
              { required: true, message: "Please enter the email subject" },
            ]}
          >
            <Input placeholder="Enter email subject" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              <Option value="general">General</Option>
              <Option value="academic">Academic</Option>
              <Option value="urgent">Urgent</Option>
              <Option value="financial">Financial</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Email Content"
            rules={[
              { required: true, message: "Please enter the email content" },
            ]}
          >
            <ReactQuill
              value={editorContent}
              onChange={handleEditorChange}
              style={{ height: 300, marginBottom: 50 }}
            />
          </Form.Item>

          <Divider />

          <div style={{ marginBottom: 16 }}>
            <Text strong>Available Variables:</Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="blue">{"{{announcement_title}}"}</Tag>
              <Tag color="blue">{"{{announcement_content}}"}</Tag>
              <Tag color="blue">{"{{recipient_name}}"}</Tag>
              <Tag color="blue">{"{{portal_link}}"}</Tag>
              <Tag color="blue">{"{{due_date}}"}</Tag>
              <Tag color="blue">{"{{payment_methods}}"}</Tag>
              <Tag color="blue">{"{{finance_portal_link}}"}</Tag>
            </div>
          </div>

          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default template for this category</Checkbox>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
              >
                {currentTemplate ? "Update Template" : "Save Template"}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title="Template Preview"
        visible={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsPreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {currentTemplate && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Subject:</Text>
              <div
                style={{
                  padding: 8,
                  border: "1px solid #d9d9d9",
                  borderRadius: 4,
                  marginTop: 8,
                }}
              >
                {currentTemplate.subject}
              </div>
            </div>

            <Text strong>Content:</Text>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: 4,
                padding: 16,
                marginTop: 8,
                backgroundColor: "#fff",
              }}
              dangerouslySetInnerHTML={{ __html: currentTemplate.content }}
            />
          </div>
        )}
      </Modal>
    </Spin>
  );
};

export default EmailTemplates;
