import React from "react";
import { useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Popconfirm,
  Typography,
  DatePicker,
  Select,
} from "antd";
import {
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  Copy,
  GraduationCap,
  Award,
  Languages,
  Lightbulb,
} from "lucide-react";
import SectionHeader from "../SectionHeader";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const SkillsManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("skills");

  // State for search text
  const [searchText, setSearchText] = useState("");

  // State for modal visibility and form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // Sample data for skills
  const [skills, setSkills] = useState([
    {
      key: "1",
      name: "Programming and Application Development",
      description: "Programming and Application Development",
    },
    { key: "2", name: "Project Management", description: "Project Management" },
    {
      key: "3",
      name: "Help Desk/Technical Support",
      description: "Help Desk/Technical Support",
    },
    { key: "4", name: "Networking", description: "Networking" },
    { key: "5", name: "Databases", description: "Databases" },
    {
      key: "6",
      name: "Business Intelligence",
      description: "Business Intelligence",
    },
    { key: "7", name: "Cloud Computing", description: "Cloud Computing" },
    {
      key: "8",
      name: "Information Security",
      description: "Information Security",
    },
  ]);

  // Sample data for education
  const [educations, setEducations] = useState([
    {
      key: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "MIT",
      graduationYear: 2020,
    },
    {
      key: "2",
      degree: "Master of Business Administration",
      institution: "Harvard Business School",
      graduationYear: 2022,
    },
    {
      key: "3",
      degree: "Associate Degree in Graphic Design",
      institution: "Rhode Island School of Design",
      graduationYear: 2018,
    },
  ]);

  // Sample data for certifications
  const [certifications, setCertifications] = useState([
    {
      key: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      validUntil: "2025-12-31",
    },
    {
      key: "2",
      name: "Certified Information Systems Security Professional (CISSP)",
      issuer: "ISC²",
      validUntil: "2026-06-30",
    },
    {
      key: "3",
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      validUntil: "2024-09-30",
    },
  ]);

  // Sample data for languages
  const [languages, setLanguages] = useState([
    { key: "1", name: "English", proficiency: "Native" },
    { key: "2", name: "Spanish", proficiency: "Fluent" },
    { key: "3", name: "French", proficiency: "Intermediate" },
    { key: "4", name: "Mandarin", proficiency: "Beginner" },
  ]);

  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchText("");
  };

  // Function to handle search
  const handleSearch = () => {
    message.success(`Searching for "${searchText}" in ${activeTab}`);
  };

  // Function to show modal
  const showModal = (type, record) => {
    setModalType(type);
    setCurrentRecord(record);

    if (type === "edit" || type === "view") {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }

    setIsModalVisible(true);
  };

  // Function to handle modal OK
  const handleModalOk = () => {
    if (modalType === "view") {
      setIsModalVisible(false);
      return;
    }

    form.validateFields().then((values) => {
      if (modalType === "add") {
        const newItem = {
          key: String(Date.now()),
          ...values,
        };
        switch (activeTab) {
          case "skills":
            setSkills([...skills, newItem]);
            break;
          case "education":
            setEducations([...educations, newItem]);
            break;
          case "certifications":
            setCertifications([...certifications, newItem]);
            break;
          case "languages":
            setLanguages([...languages, newItem]);
            break;
        }
        message.success(`${activeTab.slice(0, -1)} added successfully`);
      } else if (modalType === "edit") {
        switch (activeTab) {
          case "skills":
            setSkills(
              skills.map((item) =>
                item.key === currentRecord.key ? { ...item, ...values } : item
              )
            );
            break;
          case "education":
            setEducations(
              educations.map((item) =>
                item.key === currentRecord.key ? { ...item, ...values } : item
              )
            );
            break;
          case "certifications":
            setCertifications(
              certifications.map((item) =>
                item.key === currentRecord.key ? { ...item, ...values } : item
              )
            );
            break;
          case "languages":
            setLanguages(
              languages.map((item) =>
                item.key === currentRecord.key ? { ...item, ...values } : item
              )
            );
            break;
        }
        message.success(`${activeTab.slice(0, -1)} updated successfully`);
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Function to handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle delete
  const handleDelete = (record) => {
    switch (activeTab) {
      case "skills":
        setSkills(skills.filter((item) => item.key !== record.key));
        break;
      case "education":
        setEducations(educations.filter((item) => item.key !== record.key));
        break;
      case "certifications":
        setCertifications(
          certifications.filter((item) => item.key !== record.key)
        );
        break;
      case "languages":
        setLanguages(languages.filter((item) => item.key !== record.key));
        break;
    }
    message.success(`${activeTab.slice(0, -1)} deleted successfully`);
  };

  // Function to handle copy
  const handleCopy = (record) => {
    const newItem = {
      ...record,
      key: String(Date.now()),
      name: `${record.name} (Copy)`,
    };
    switch (activeTab) {
      case "skills":
        setSkills([...skills, newItem]);
        break;
      case "education":
        setEducations([...educations, newItem]);
        break;
      case "certifications":
        setCertifications([...certifications, newItem]);
        break;
      case "languages":
        setLanguages([...languages, newItem]);
        break;
    }
    message.success(`${activeTab.slice(0, -1)} copied successfully`);
  };

  // Columns for skills table
  const skillColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => showModal("edit", record)}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<Eye size={16} />}
            onClick={() => showModal("view", record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            View
          </Button>
          <Popconfirm
            title="Delete Skill"
            description="Are you sure you want to delete this skill?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="primary"
            icon={<Copy size={16} />}
            onClick={() => handleCopy(record)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Copy
          </Button>
        </div>
      ),
    },
  ];

  // Columns for education table
  const educationColumns = [
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      sorter: (a, b) => a.degree.localeCompare(b.degree),
    },
    {
      title: "Institution",
      dataIndex: "institution",
      key: "institution",
      sorter: (a, b) => a.institution.localeCompare(b.institution),
    },
    {
      title: "Graduation Year",
      dataIndex: "graduationYear",
      key: "graduationYear",
      sorter: (a, b) => a.graduationYear - b.graduationYear,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => showModal("edit", record)}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<Eye size={16} />}
            onClick={() => showModal("view", record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            View
          </Button>
          <Popconfirm
            title="Delete Education"
            description="Are you sure you want to delete this education record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="primary"
            icon={<Copy size={16} />}
            onClick={() => handleCopy(record)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Copy
          </Button>
        </div>
      ),
    },
  ];

  // Columns for certifications table
  const certificationColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Issuer",
      dataIndex: "issuer",
      key: "issuer",
      sorter: (a, b) => a.issuer.localeCompare(b.issuer),
    },
    {
      title: "Valid Until",
      dataIndex: "validUntil",
      key: "validUntil",
      sorter: (a, b) => a.validUntil.localeCompare(b.validUntil),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => showModal("edit", record)}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<Eye size={16} />}
            onClick={() => showModal("view", record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            View
          </Button>
          <Popconfirm
            title="Delete Certification"
            description="Are you sure you want to delete this certification?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="primary"
            icon={<Copy size={16} />}
            onClick={() => handleCopy(record)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Copy
          </Button>
        </div>
      ),
    },
  ];

  // Columns for languages table
  const languageColumns = [
    {
      title: "Language",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Proficiency",
      dataIndex: "proficiency",
      key: "proficiency",
      sorter: (a, b) => a.proficiency.localeCompare(b.proficiency),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => showModal("edit", record)}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<Eye size={16} />}
            onClick={() => showModal("view", record)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            View
          </Button>
          <Popconfirm
            title="Delete Language"
            description="Are you sure you want to delete this language?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="primary"
            icon={<Copy size={16} />}
            onClick={() => handleCopy(record)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Copy
          </Button>
        </div>
      ),
    },
  ];

  // Get section title and description based on active tab
  const getSectionInfo = () => {
    if (activeTab === "skills") {
      return {
        title: "Skills",
        description:
          "Here you can define the different types of skills that you can add under each employee profile.",
      };
    } else if (activeTab === "education") {
      return {
        title: "Education",
        description:
          "Manage educational qualifications and academic achievements for employee profiles.",
      };
    } else if (activeTab === "certifications") {
      return {
        title: "Certifications",
        description:
          "Track professional certifications and licenses held by employees.",
      };
    } else {
      return {
        title: "Languages",
        description:
          "Record language proficiencies and communication skills of employees.",
      };
    }
  };

  // Render form fields based on active tab
  const renderFormFields = () => {
    switch (activeTab) {
      case "skills":
        return (
          <>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter skill name" }]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter skill description" },
              ]}
            >
              <Input.TextArea rows={4} disabled={modalType === "view"} />
            </Form.Item>
          </>
        );
      case "education":
        return (
          <>
            <Form.Item
              name="degree"
              label="Degree"
              rules={[{ required: true, message: "Please enter degree" }]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="institution"
              label="Institution"
              rules={[{ required: true, message: "Please enter institution" }]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="graduationYear"
              label="Graduation Year"
              rules={[
                { required: true, message: "Please enter graduation year" },
              ]}
            >
              <DatePicker picker="year" disabled={modalType === "view"} />
            </Form.Item>
          </>
        );
      case "certifications":
        return (
          <>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter certification name" },
              ]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="issuer"
              label="Issuer"
              rules={[{ required: true, message: "Please enter issuer" }]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="validUntil"
              label="Valid Until"
              rules={[
                { required: true, message: "Please enter expiration date" },
              ]}
            >
              <DatePicker disabled={modalType === "view"} />
            </Form.Item>
          </>
        );
      case "languages":
        return (
          <>
            <Form.Item
              name="name"
              label="Language"
              rules={[
                { required: true, message: "Please enter language name" },
              ]}
            >
              <Input disabled={modalType === "view"} />
            </Form.Item>
            <Form.Item
              name="proficiency"
              label="Proficiency"
              rules={[
                { required: true, message: "Please select proficiency level" },
              ]}
            >
              <Select disabled={modalType === "view"}>
                <Select.Option value="Beginner">Beginner</Select.Option>
                <Select.Option value="Intermediate">Intermediate</Select.Option>
                <Select.Option value="Advanced">Advanced</Select.Option>
                <Select.Option value="Fluent">Fluent</Select.Option>
                <Select.Option value="Native">Native</Select.Option>
              </Select>
            </Form.Item>
          </>
        );
    }
  };

  return (
    <div
      style={{
        padding: "0px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: "skills",
              label: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Lightbulb size={16} />
                  Skills
                </span>
              ),
            },
            {
              key: "education",
              label: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <GraduationCap size={16} />
                  Education
                </span>
              ),
            },
            {
              key: "certifications",
              label: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Award size={16} />
                  Certifications
                </span>
              ),
            },
            {
              key: "languages",
              label: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Languages size={16} />
                  Languages
                </span>
              ),
            },
          ]}
        />

        <div style={{ marginTop: "24px" }}>
          <SectionHeader
            title={getSectionInfo().title}
            description={getSectionInfo().description}
            moreInfoLink="#"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              marginTop: "24px",
            }}
          >
            <Button
              size="small"
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => showModal("add")}
            >
              Add New
            </Button>

            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                size="small"
                placeholder="input search text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: "250px" }}
              />
              <Button
                size="small"
                type="primary"
                icon={<Search size={16} />}
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          <Table
            size="small"
            columns={
              activeTab === "skills"
                ? skillColumns
                : activeTab === "education"
                  ? educationColumns
                  : activeTab === "certifications"
                    ? certificationColumns
                    : languageColumns
            }
            dataSource={
              activeTab === "skills"
                ? skills
                : activeTab === "education"
                  ? educations
                  : activeTab === "certifications"
                    ? certifications
                    : languages
            }
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        </div>

        <Modal
          title={`${
            modalType === "add" ? "Add" : modalType === "edit" ? "Edit" : "View"
          } ${getSectionInfo().title}`}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={modalType === "view" ? "Close" : "Save"}
          cancelText="Cancel"
          okButtonProps={{
            style: { display: modalType === "view" ? "none" : "inline-block" },
          }}
        >
          <Form form={form} layout="vertical">
            {renderFormFields()}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SkillsManagement;
