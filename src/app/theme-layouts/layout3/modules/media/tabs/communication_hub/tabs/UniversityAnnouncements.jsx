import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Tabs,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
  Space,
  Table,
  Modal,
  Tooltip,
  Badge,
  Drawer,
  Checkbox,
  List,
  Avatar,
  Menu,
  Descriptions,
  Statistic,
} from "antd";
import {
  SendOutlined,
  MailOutlined,
  UploadOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SaveOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";

// Import our professional email templates
import AdmissionLetter from "../tabs/components/academic/AdmissionLetter";
import SemesterRegistration from "../tabs/components/academic/SemesterRegistration";
import ExamNotification from "../tabs/components/academic/ExamNotification";
import TuitionReminder from "../tabs/components/financial/TuitionReminder";
import PaymentConfirmation from "../tabs/components/financial/PaymentConfirmation";
import HelpdeskTicket from "../tabs/components/support/HelpdeskTicket";
import EventInvitation from "../tabs/components/events/EventInvitation";
import LoginAlert from "../tabs/components/security/LoginAlert";
import BirthdayTemplate from "../tabs/components/special/BirthdayTemplate";
import OtpVerification from "../tabs/components/security/OtpVerification";
import AccountCreation from "../tabs/components/security/AccountCreation";
import PasswordReset from "../tabs/components/security/PasswordReset";
import WelcomeEmail from "../tabs/components/general/WelcomeEmail";
import SystemMaintenance from "../tabs/components/general/SystemMaintenance";
import GradeRelease from "../tabs/components/academic/GradeRelease";
import GeneralInformation from "../tabs/components/general/GeneralInformation";

// Import our template registry
import emailTemplateRegistry from "../tabs/components/integration/EmailTemplateRegistry";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Content } = Layout;
const { Dragger } = Upload;
const { SubMenu } = Menu;

// Mock data for recipients
const mockRecipients = [
  {
    id: 1,
    name: "John Musiitwa",
    email: "jmusiitwa.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Computer Science",
    year: "3",
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Nakato",
    email: "snakato.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Business Administration",
    year: "2",
    avatar: null,
  },
  {
    id: 3,
    name: "Dr. Robert Mukasa",
    email: "rmukasa@nkumbauniversity.ac.ug",
    group: "Faculty",
    department: "Computer Science",
    position: "Senior Lecturer",
    avatar: null,
  },
  {
    id: 4,
    name: "Jane Akello",
    email: "jakello@nkumbauniversity.ac.ug",
    group: "Staff",
    department: "Finance",
    position: "Accountant",
    avatar: null,
  },
  {
    id: 5,
    name: "David Ochieng",
    email: "dochieng.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Engineering",
    year: "4",
    avatar: null,
  },
];

// Mock data for recipient groups
const mockRecipientGroups = [
  {
    id: 1,
    name: "All Students",
    count: 5000,
    description: "All enrolled students",
  },
  {
    id: 2,
    name: "Faculty Members",
    count: 250,
    description: "All teaching staff",
  },
  {
    id: 3,
    name: "Administrative Staff",
    count: 120,
    description: "All non-teaching staff",
  },
  {
    id: 4,
    name: "Computer Science Department",
    count: 450,
    description: "Students and faculty in Computer Science",
  },
  {
    id: 5,
    name: "Business School",
    count: 1200,
    description: "Students and faculty in Business School",
  },
  {
    id: 6,
    name: "First Year Students",
    count: 1500,
    description: "All first-year students",
  },
];

// Mock data for sent emails
const mockSentEmails = [
  {
    id: 1,
    subject: "End of Semester Examination Schedule",
    recipients: 1245,
    delivered: 1240,
    opened: 980,
    clicked: 750,
    failed: 5,
    sentDate: "2025-04-05T10:30:00",
    status: "completed",
    template: "Academic Announcement",
  },
  {
    id: 2,
    subject: "Tuition Payment Deadline Reminder",
    recipients: 3500,
    delivered: 3480,
    opened: 2800,
    clicked: 2100,
    failed: 20,
    sentDate: "2025-04-02T09:15:00",
    status: "completed",
    template: "Financial Announcement",
  },
  {
    id: 3,
    subject: "Campus Security Alert",
    recipients: 5870,
    delivered: 5850,
    opened: 4900,
    clicked: 3200,
    failed: 20,
    sentDate: "2025-03-28T16:45:00",
    status: "completed",
    template: "Urgent Announcement",
  },
  {
    id: 4,
    subject: "Library Hours Update",
    recipients: 5000,
    delivered: 4980,
    opened: 3100,
    clicked: 1800,
    failed: 20,
    sentDate: "2025-03-25T11:20:00",
    status: "completed",
    template: "Standard Announcement",
  },
  {
    id: 5,
    subject: "Career Fair 2025 Invitation",
    recipients: 4500,
    delivered: 4480,
    opened: 3600,
    clicked: 2900,
    failed: 20,
    sentDate: "2025-03-20T14:10:00",
    status: "completed",
    template: "Event Invitation",
  },
];

// Email Sender Admin Component
const EmailSenderWithTemplates = () => {
  const [activeTab, setActiveTab] = useState("compose");
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [recipientDrawerVisible, setRecipientDrawerVisible] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [sentEmails, setSentEmails] = useState(mockSentEmails);
  const [emailConfigured, setEmailConfigured] = useState(true);
  const [emailSettings, setEmailSettings] = useState({
    host: "",
    port: "587",
    secure: false,
    user: "",
    password: "",
    fromName: "Nkumba University",
    fromEmail: "no-reply@nkumbauniversity.ac.ug",
  });
  const [recipientSearchText, setRecipientSearchText] = useState("");
  const [groupSearchText, setGroupSearchText] = useState("");
  const [filteredRecipients, setFilteredRecipients] = useState(mockRecipients);
  const [filteredGroups, setFilteredGroups] = useState(mockRecipientGroups);
  const [emailDetailVisible, setEmailDetailVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // New state for professional templates
  const [selectedProfessionalTemplate, setSelectedProfessionalTemplate] =
    useState(null);
  const [templateHtml, setTemplateHtml] = useState("");

  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const templateContainerRef = useRef(null);

  // Fetch email templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Filter recipients when search text changes
  useEffect(() => {
    if (recipientSearchText) {
      const filtered = mockRecipients.filter(
        (recipient) =>
          recipient.name
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          recipient.email
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          recipient.group
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          (recipient.department &&
            recipient.department
              .toLowerCase()
              .includes(recipientSearchText.toLowerCase()))
      );
      setFilteredRecipients(filtered);
    } else {
      setFilteredRecipients(mockRecipients);
    }
  }, [recipientSearchText]);

  // Filter groups when search text changes
  useEffect(() => {
    if (groupSearchText) {
      const filtered = mockRecipientGroups.filter(
        (group) =>
          group.name.toLowerCase().includes(groupSearchText.toLowerCase()) ||
          group.description
            .toLowerCase()
            .includes(groupSearchText.toLowerCase())
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups(mockRecipientGroups);
    }
  }, [groupSearchText]);

  // Fetch email templates from the server
  const fetchTemplates = async () => {
    try {
      setLoading(true);

      // Convert our professional template registry to the format expected by the admin
      const professionalTemplates = emailTemplateRegistry.map(
        (template, index) => ({
          id: 100 + index, // Use IDs that won't conflict with existing templates
          name: template.name,
          subject: template.subject,
          content: "", // The actual content will be generated dynamically
          category: template.category,
          templateType: "professional", // Add this to identify professional templates
          templateId: template.id, // Store the original template ID
        })
      );

      // Set templates
      setTemplates(professionalTemplates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
      message.error("Failed to fetch email templates");
      setLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateChange = (templateId) => {
    const template = templates.find(
      (t) => t.id === Number.parseInt(templateId)
    );

    if (template) {
      setSelectedTemplate(template);

      if (template.templateType === "professional") {
        // For professional templates, we'll render the actual component
        setSelectedProfessionalTemplate(template.templateId);
        setEmailContent(""); // Clear the standard template content

        // Set the subject from the template
        form.setFieldsValue({
          subject: template.subject,
        });

        // Generate the preview content
        generateProfessionalTemplateHtml(template.templateId);
      }
    }
  };

  // Generate HTML for professional templates
  const generateProfessionalTemplateHtml = (templateId) => {
    // Get form values to use as variables
    const formValues = form.getFieldsValue();

    // Create variables object for the template
    const variables = {
      recipient_name: formValues.recipientName || "Valued Member",
      studentName: formValues.recipientName || "Student",
      userName: formValues.recipientName || "User",
      subject: formValues.subject || "",
      announcement_title: formValues.subject || "University Announcement",
      announcement_content:
        formValues.message ||
        "This is an important announcement from the university.",
      program: formValues.program || "Bachelor of Science",
      dueDate: formValues.dueDate || "April 30, 2025",
      paymentMethods:
        formValues.paymentMethods || "Bank Transfer, Mobile Money",
      portal_link: "https://portal.nkumbauniversity.ac.ug",
      finance_portal_link: "https://finance.nkumbauniversity.ac.ug",
    };

    // In a real implementation, you would use a server-side rendering approach
    // or a client-side approach to capture the rendered HTML

    // For this example, we'll set a placeholder
    setTemplateHtml(`<div>Professional template: ${templateId}</div>`);
  };

  // Add this function to check email delivery status
  const checkEmailDeliveryStatus = async (messageId) => {
    try {
      setLoading(true);

      // In a real app, this would be an API call
      // const response = await axios.get(`/api/email-status/${messageId}`);

      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        setLoading(false);
        Modal.info({
          title: "Email Delivery Status",
          content: (
            <div>
              <p>
                <strong>Message ID:</strong> {messageId}
              </p>
              <p>
                <strong>Status:</strong> Sent to mail server
              </p>
              <p>
                <strong>Note:</strong> This only confirms the email was accepted
                by your mail server. It does not guarantee final delivery to the
                recipient's inbox.
              </p>
              <p>Common reasons for non-delivery:</p>
              <ul>
                <li>Recipient's email address is incorrect</li>
                <li>Email was filtered as spam</li>
                <li>Recipient's mailbox is full</li>
                <li>Mail server configuration issues</li>
              </ul>
            </div>
          ),
        });
      }, 1000);
    } catch (error) {
      console.error("Error checking email status:", error);
      message.error("Failed to check email status");
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (selectedRecipients.length === 0 && selectedGroups.length === 0) {
        message.error("Please select at least one recipient or group");
        return;
      }

      setLoading(true);

      // Prepare recipient list
      let recipientEmails = [];

      // Add individual recipients
      if (selectedRecipients.length > 0) {
        recipientEmails = selectedRecipients.map((r) => r.email);
      }

      // Add group recipients (in a real app, this would fetch emails from the database)
      if (selectedGroups.length > 0) {
        // For demo purposes, we'll just add some dummy emails
        const groupEmails = selectedGroups.flatMap((group) => {
          return mockRecipients
            .filter(
              (r) =>
                r.group ===
                (group.id === 1
                  ? "Student"
                  : group.id === 2
                    ? "Faculty"
                    : "Staff")
            )
            .map((r) => r.email);
        });

        recipientEmails = [...new Set([...recipientEmails, ...groupEmails])];
      }

      // Process template variables
      const variables = {
        announcement_title: values.subject,
        announcement_content: values.message,
        recipient_name: "Valued Member",
        portal_link: "https://portal.nkumbauniversity.ac.ug",
        due_date: values.dueDate || "N/A",
        payment_methods: values.paymentMethods || "Bank Transfer, Mobile Money",
        finance_portal_link: "https://finance.nkumbauniversity.ac.ug",
      };

      // In a real app, this would be an API call to send the email
      // const response = await axios.post('/api/send-email', {
      //   from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
      //   to: recipientEmails.join(','),
      //   subject: values.subject,
      //   template: emailContent,
      //   variables: variables,
      //   attachments: values.attachments ? values.attachments.fileList : [],
      // });

      // For demo purposes, we'll simulate a successful email send
      setTimeout(() => {
        // Add to sent emails
        const newEmail = {
          id: sentEmails.length + 1,
          subject: values.subject,
          recipients: recipientEmails.length,
          delivered: recipientEmails.length,
          opened: 0,
          clicked: 0,
          failed: 0,
          sentDate: new Date().toISOString(),
          status: "completed",
          template: selectedTemplate ? selectedTemplate.name : "Custom",
        };

        setSentEmails([newEmail, ...sentEmails]);

        // Reset form
        form.resetFields();
        setSelectedRecipients([]);
        setSelectedGroups([]);
        setEmailContent("");
        setSelectedTemplate(null);
        setSelectedProfessionalTemplate(null);

        setLoading(false);
        message.success(
          `Email sent successfully to ${recipientEmails.length} recipients`
        );

        // Switch to history tab
        setActiveTab("history");
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      message.error("Failed to send email");
      setLoading(false);
    }
  };

  // Handle recipient selection
  const handleRecipientSelect = (recipient) => {
    const isSelected = selectedRecipients.some((r) => r.id === recipient.id);

    if (isSelected) {
      setSelectedRecipients(
        selectedRecipients.filter((r) => r.id !== recipient.id)
      );
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  // Handle group selection
  const handleGroupSelect = (group) => {
    const isSelected = selectedGroups.some((g) => g.id === group.id);

    if (isSelected) {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  // View email details
  const viewEmailDetails = (email) => {
    setSelectedEmail(email);
    setEmailDetailVisible(true);
  };

  // Columns for sent emails table
  const sentEmailsColumns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
      render: (template) => <Tag color="blue">{template}</Tag>,
    },
    {
      title: "Recipients",
      dataIndex: "recipients",
      key: "recipients",
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
      render: (delivered, record) => (
        <Tooltip title="Emails accepted by the mail server">
          <span>
            {delivered} ({Math.round((delivered / record.recipients) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Opened",
      dataIndex: "opened",
      key: "opened",
      render: (opened, record) => (
        <Tooltip title="Recipients who opened the email">
          <span>
            {opened} ({Math.round((opened / record.delivered) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Clicked",
      dataIndex: "clicked",
      key: "clicked",
      render: (clicked, record) => (
        <Tooltip title="Recipients who clicked links in the email">
          <span>
            {clicked} ({Math.round((clicked / record.opened) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let icon;

        switch (status) {
          case "completed":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
          case "failed":
            color = "error";
            icon = <CloseCircleOutlined />;
            break;
          case "in-progress":
            color = "processing";
            icon = <LoadingOutlined />;
            break;
          default:
            color = "default";
            icon = null;
        }

        return (
          <Badge
            status={color}
            text={
              <Space>
                {icon}
                {status}
              </Space>
            }
          />
        );
      },
    },
    {
      title: "Sent Date",
      dataIndex: "sentDate",
      key: "sentDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => viewEmailDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Check Delivery Status">
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => checkEmailDeliveryStatus(record.id)}
            />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button type="text" icon={<CopyOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Upload props for attachments
  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // Function to render the appropriate template component
  const renderProfessionalTemplate = (templateId, variables) => {
    // Use the existing template components directly
    switch (templateId) {
      case "general":
        return <GeneralInformation {...variables} />;
      case "admission":
        return <AdmissionLetter {...variables} />;
      case "registration":
        return <SemesterRegistration {...variables} />;
      case "exam":
        return <ExamNotification {...variables} />;
      case "grades":
        return <GradeRelease {...variables} />;
      case "tuition":
        return <TuitionReminder {...variables} />;
      case "payment":
        return <PaymentConfirmation {...variables} />;
      case "helpdesk":
        return <HelpdeskTicket {...variables} />;
      case "event":
        return <EventInvitation {...variables} />;
      case "login":
        return <LoginAlert {...variables} />;
      case "otp":
        return <OtpVerification {...variables} />;
      case "account":
        return <AccountCreation {...variables} />;
      case "password":
        return <PasswordReset {...variables} />;
      case "welcome":
        return <WelcomeEmail {...variables} />;
      case "maintenance":
        return <SystemMaintenance {...variables} />;
      case "birthday":
        return <BirthdayTemplate {...variables} />;
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <Spin spinning={loading} tip="Processing...">
        <Card
          title={
            <Title level={3} style={{ margin: 0, color: "#4B0082" }}>
              Email Communication System
            </Title>
          }
          extra={
            <Space>
              {activeTab === "compose" && (
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setPreviewVisible(true)}
                  disabled={!selectedProfessionalTemplate}
                  style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
                >
                  Preview
                </Button>
              )}
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <MailOutlined /> Compose Email
                </span>
              }
              key="compose"
            >
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="template" label="Email Template">
                      <Select
                        placeholder="Select a template"
                        onChange={handleTemplateChange}
                        allowClear
                      >
                        <Option value="" disabled>
                          -- Official Communication Templates --
                        </Option>
                        {templates
                          .filter((t) =>
                            [
                              "general",
                              "admission",
                              "registration",
                              "exam",
                              "grades",
                              "tuition",
                              "payment",
                              "event",
                              "welcome",
                              "helpdesk",
                            ].includes(t.templateId)
                          )
                          .map((template) => (
                            <Option key={template.id} value={template.id}>
                              {template.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the email subject",
                        },
                      ]}
                    >
                      <Input placeholder="Enter email subject" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Additional fields for professional templates */}
                {selectedProfessionalTemplate && (
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="recipientName" label="Recipient Name">
                        <Input placeholder="e.g., John Doe" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="program"
                        label="Program (for academic templates)"
                      >
                        <Input placeholder="e.g., Bachelor of Science in Computer Science" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <Form.Item
                  label={
                    <Space>
                      Recipients
                      <Tooltip title="Select individual recipients or groups">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Button
                    type="dashed"
                    onClick={() => setRecipientDrawerVisible(true)}
                    style={{ width: "100%" }}
                    icon={<UserOutlined />}
                  >
                    Select Recipients
                  </Button>

                  {(selectedRecipients.length > 0 ||
                    selectedGroups.length > 0) && (
                    <div style={{ marginTop: 8 }}>
                      {selectedRecipients.length > 0 && (
                        <div style={{ marginBottom: 8 }}>
                          <Text strong>
                            Individual Recipients ({selectedRecipients.length}):
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            {selectedRecipients.map((recipient) => (
                              <Tag
                                key={recipient.id}
                                closable
                                onClose={() => handleRecipientSelect(recipient)}
                                style={{ marginBottom: 4 }}
                              >
                                {recipient.name} ({recipient.email})
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedGroups.length > 0 && (
                        <div>
                          <Text strong>Groups:</Text>
                          <div style={{ marginTop: 4 }}>
                            {selectedGroups.map((group) => (
                              <Tag
                                key={group.id}
                                color="blue"
                                closable
                                onClose={() => handleGroupSelect(group)}
                                style={{ marginBottom: 4 }}
                              >
                                {group.name} ({group.count})
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the email message",
                    },
                  ]}
                >
                  <TextArea rows={6} placeholder="Enter your message here" />
                </Form.Item>

                {/* Show template preview for professional templates */}
                {selectedProfessionalTemplate && (
                  <Form.Item
                    label="Professional Template Preview"
                    help="This is how your email will look with the selected professional template"
                  >
                    <div
                      style={{
                        border: "1px solid #d9d9d9",
                        borderRadius: 4,
                        padding: 8,
                        height: 300,
                        overflow: "auto",
                        backgroundColor: "#fff",
                      }}
                    >
                      {/* Directly render the template component */}
                      {renderProfessionalTemplate(
                        selectedProfessionalTemplate,
                        {
                          recipientName:
                            form.getFieldValue("recipientName") ||
                            "Valued Member",
                          studentName:
                            form.getFieldValue("recipientName") || "Student",
                          userName:
                            form.getFieldValue("recipientName") || "User",
                          program:
                            form.getFieldValue("program") ||
                            "Bachelor of Science",
                          subject: form.getFieldValue("subject") || "",
                          message:
                            form.getFieldValue("message") ||
                            "This is an important announcement from the university.",
                          dueDate:
                            form.getFieldValue("dueDate") || "April 30, 2025",
                          paymentMethods:
                            form.getFieldValue("paymentMethods") ||
                            "Bank Transfer, Mobile Money",
                        }
                      )}
                    </div>
                  </Form.Item>
                )}

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="dueDate"
                      label="Due Date (for financial notices)"
                    >
                      <Input placeholder="e.g., April 30, 2025" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="paymentMethods"
                      label="Payment Methods (for financial notices)"
                    >
                      <Input placeholder="e.g., Bank Transfer, Mobile Money" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="attachments" label="Attachments">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Select Files</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      style={{
                        backgroundColor: "#4B0082",
                        borderColor: "#4B0082",
                      }}
                    >
                      Send Email
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={() => {
                        form.resetFields();
                        setSelectedRecipients([]);
                        setSelectedGroups([]);
                        setEmailContent("");
                        setSelectedTemplate(null);
                        setSelectedProfessionalTemplate(null);
                      }}
                    >
                      Reset
                    </Button>
                    <Button htmlType="button" icon={<SaveOutlined />}>
                      Save as Draft
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <HistoryOutlined /> Email History
                </span>
              }
              key="history"
            >
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col flex="auto">
                    <Input
                      placeholder="Search emails"
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </Col>
                  <Col>
                    <Button icon={<FilterOutlined />}>Filter</Button>
                  </Col>
                  <Col>
                    <Button icon={<DownloadOutlined />}>Export</Button>
                  </Col>
                </Row>
              </div>

              <Table
                columns={sentEmailsColumns}
                dataSource={sentEmails}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <FileTextOutlined /> Templates
                </span>
              }
              key="templates"
            >
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col flex="auto">
                    <Input
                      placeholder="Search templates"
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{
                        backgroundColor: "#4B0082",
                        borderColor: "#4B0082",
                      }}
                    >
                      Create Template
                    </Button>
                  </Col>
                </Row>
              </div>

              <Row gutter={[16, 16]}>
                {templates.map((template) => (
                  <Col xs={24} sm={12} md={8} key={template.id}>
                    <Card
                      hoverable
                      title={template.name}
                      extra={<Tag color="purple">{template.category}</Tag>}
                      actions={[
                        <Tooltip title="Preview" key="preview">
                          <EyeOutlined
                            onClick={() => {
                              handleTemplateChange(template.id);
                              setPreviewVisible(true);
                            }}
                          />
                        </Tooltip>,
                        <Tooltip title="Edit" key="edit">
                          <EditOutlined />
                        </Tooltip>,
                        <Tooltip title="Delete" key="delete">
                          <DeleteOutlined />
                        </Tooltip>,
                      ]}
                    >
                      <div style={{ height: 100, overflow: "hidden" }}>
                        <Text
                          ellipsis={{ rows: 2 }}
                          style={{ marginBottom: 8 }}
                        >
                          {template.subject}
                        </Text>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span>
                            Professional template with dynamic content
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>
        </Card>

        {/* Email Preview Modal */}
        <Modal
          title="Email Preview"
          visible={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={[
            <Button key="close" onClick={() => setPreviewVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 4,
              padding: 16,
              backgroundColor: "#fff",
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {selectedProfessionalTemplate &&
              // Directly render the template component
              renderProfessionalTemplate(selectedProfessionalTemplate, {
                recipientName:
                  form.getFieldValue("recipientName") || "Valued Member",
                studentName: form.getFieldValue("recipientName") || "Student",
                userName: form.getFieldValue("recipientName") || "User",
                program: form.getFieldValue("program") || "Bachelor of Science",
                subject: form.getFieldValue("subject") || "",
                message:
                  form.getFieldValue("message") ||
                  "This is an important announcement from the university.",
                dueDate: form.getFieldValue("dueDate") || "April 30, 2025",
                paymentMethods:
                  form.getFieldValue("paymentMethods") ||
                  "Bank Transfer, Mobile Money",
              })}
          </div>
        </Modal>

        {/* Recipients Drawer */}
        <Drawer
          title="Select Recipients"
          placement="right"
          onClose={() => setRecipientDrawerVisible(false)}
          visible={recipientDrawerVisible}
          width={600}
          extra={
            <Space>
              <Button onClick={() => setRecipientDrawerVisible(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => setRecipientDrawerVisible(false)}
                style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
              >
                Done
              </Button>
            </Space>
          }
        >
          <Tabs defaultActiveKey="individuals">
            <TabPane
              tab={
                <span>
                  <UserOutlined /> Individual Recipients
                </span>
              }
              key="individuals"
            >
              <Input
                placeholder="Search recipients"
                prefix={<SearchOutlined />}
                value={recipientSearchText}
                onChange={(e) => setRecipientSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
                allowClear
              />

              <List
                itemLayout="horizontal"
                dataSource={filteredRecipients}
                renderItem={(recipient) => (
                  <List.Item
                    actions={[
                      <Checkbox
                        key={recipient.id}
                        checked={selectedRecipients.some(
                          (r) => r.id === recipient.id
                        )}
                        onChange={() => handleRecipientSelect(recipient)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<UserOutlined />}
                          style={{
                            backgroundColor:
                              recipient.group === "Student"
                                ? "#1890ff"
                                : "#52c41a",
                          }}
                        />
                      }
                      title={recipient.name}
                      description={
                        <>
                          <div>{recipient.email}</div>
                          <div>
                            <Tag
                              color={
                                recipient.group === "Student"
                                  ? "blue"
                                  : recipient.group === "Faculty"
                                    ? "green"
                                    : "orange"
                              }
                            >
                              {recipient.group}
                            </Tag>
                            {recipient.department && (
                              <Tag color="purple">{recipient.department}</Tag>
                            )}
                            {recipient.year && (
                              <Tag color="cyan">Year {recipient.year}</Tag>
                            )}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined /> Groups
                </span>
              }
              key="groups"
            >
              <Input
                placeholder="Search groups"
                prefix={<SearchOutlined />}
                value={groupSearchText}
                onChange={(e) => setGroupSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
                allowClear
              />

              <List
                itemLayout="horizontal"
                dataSource={filteredGroups}
                renderItem={(group) => (
                  <List.Item
                    actions={[
                      <Checkbox
                        key={group.id}
                        checked={selectedGroups.some((g) => g.id === group.id)}
                        onChange={() => handleGroupSelect(group)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<TeamOutlined />}
                          style={{ backgroundColor: "#722ed1" }}
                        />
                      }
                      title={group.name}
                      description={
                        <>
                          <div>{group.description}</div>
                          <div>
                            <Tag color="blue">{group.count} recipients</Tag>
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                }}
              />
            </TabPane>
          </Tabs>
        </Drawer>

        {/* Email Detail Modal */}
        <Modal
          title="Email Details"
          visible={emailDetailVisible}
          onCancel={() => setEmailDetailVisible(false)}
          footer={[
            <Button key="close" onClick={() => setEmailDetailVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {selectedEmail && (
            <div>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Subject" span={2}>
                  {selectedEmail.subject}
                </Descriptions.Item>
                <Descriptions.Item label="Template">
                  <Tag color="blue">{selectedEmail.template}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Sent Date">
                  {new Date(selectedEmail.sentDate).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge
                    status={
                      selectedEmail.status === "completed" ? "success" : "error"
                    }
                    text={selectedEmail.status}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Recipients">
                  {selectedEmail.recipients}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Delivery Stats">
                    <Statistic
                      title="Delivered"
                      value={`${selectedEmail.delivered}/${selectedEmail.recipients}`}
                      suffix={`(${Math.round((selectedEmail.delivered / selectedEmail.recipients) * 100)}%)`}
                    />
                    <Statistic
                      title="Failed"
                      value={`${selectedEmail.failed}/${selectedEmail.recipients}`}
                      suffix={`(${Math.round((selectedEmail.failed / selectedEmail.recipients) * 100)}%)`}
                      valueStyle={{
                        color: selectedEmail.failed > 0 ? "#cf1322" : "#3f8600",
                      }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Engagement Stats">
                    <Statistic
                      title="Opened"
                      value={`${selectedEmail.opened}/${selectedEmail.delivered}`}
                      suffix={`(${Math.round((selectedEmail.opened / selectedEmail.delivered) * 100)}%)`}
                    />
                    <Statistic
                      title="Clicked"
                      value={`${selectedEmail.clicked}/${selectedEmail.opened}`}
                      suffix={`(${Math.round((selectedEmail.clicked / selectedEmail.opened) * 100)}%)`}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Actions">
                    <Button
                      block
                      icon={<CopyOutlined />}
                      style={{ marginBottom: 8 }}
                    >
                      Duplicate Email
                    </Button>
                    <Button
                      block
                      icon={<DownloadOutlined />}
                      style={{ marginBottom: 8 }}
                    >
                      Export Report
                    </Button>
                    <Button
                      block
                      icon={<InfoCircleOutlined />}
                      onClick={() => checkEmailDeliveryStatus(selectedEmail.id)}
                    >
                      Check Status
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </Spin>
    </Content>
  );
};

export default EmailSenderWithTemplates;
