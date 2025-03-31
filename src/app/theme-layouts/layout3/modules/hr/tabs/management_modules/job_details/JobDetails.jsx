import React from "react";
import { useState } from "react";
import { Tabs, Table, Button, Input, Modal, Form, message } from "antd";
import {
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  Copy,
  DollarSign,
  UserCheck,
} from "lucide-react";
import SectionHeader from "../SectionHeader";

const JobManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("jobTitles");

  // State for search text
  const [searchText, setSearchText] = useState("");

  // State for modal visibility and form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // Sample data for job titles
  const [jobTitles, setJobTitles] = useState([
    { key: "1", code: "SE", title: "Software Engineer" },
    { key: "2", code: "ASE", title: "Assistant Software Engineer" },
    { key: "3", code: "PM", title: "Project Manager" },
    { key: "4", code: "QAE", title: "QA Engineer" },
    { key: "5", code: "PRM", title: "Product Manager" },
    { key: "6", code: "AQAE", title: "Assistant QA Engineer" },
    { key: "7", code: "TPM", title: "Technical Project Manager" },
    { key: "8", code: "PRS", title: "Pre-Sales Executive" },
  ]);

  // Sample data for pay grades
  const [payGrades, setPayGrades] = useState([
    {
      key: "1",
      code: "G1",
      name: "Entry Level",
      minSalary: 30000,
      maxSalary: 45000,
    },
    {
      key: "2",
      code: "G2",
      name: "Junior",
      minSalary: 45001,
      maxSalary: 60000,
    },
    {
      key: "3",
      code: "G3",
      name: "Mid-Level",
      minSalary: 60001,
      maxSalary: 85000,
    },
    {
      key: "4",
      code: "G4",
      name: "Senior",
      minSalary: 85001,
      maxSalary: 110000,
    },
    {
      key: "5",
      code: "G5",
      name: "Lead",
      minSalary: 110001,
      maxSalary: 140000,
    },
    {
      key: "6",
      code: "G6",
      name: "Manager",
      minSalary: 140001,
      maxSalary: 180000,
    },
  ]);

  // Sample data for employment status
  const [employmentStatuses, setEmploymentStatuses] = useState([
    {
      key: "1",
      code: "FT",
      name: "Full Time",
      description: "Regular employee working 40 hours per week",
    },
    {
      key: "2",
      code: "PT",
      name: "Part Time",
      description: "Employee working less than 40 hours per week",
    },
    {
      key: "3",
      code: "CT",
      name: "Contract",
      description: "Fixed-term employment contract",
    },
    {
      key: "4",
      code: "INT",
      name: "Intern",
      description: "Temporary position for students or trainees",
    },
    {
      key: "5",
      code: "PRB",
      name: "Probation",
      description: "Initial trial period for new employees",
    },
  ]);

  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchText("");
  };

  // Function to handle search
  const handleSearch = () => {
    // Implement search functionality based on active tab
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
        // Add new record based on active tab
        if (activeTab === "jobTitles") {
          const newJobTitle = {
            key: String(jobTitles.length + 1),
            code: values.code,
            title: values.title,
          };
          setJobTitles([...jobTitles, newJobTitle]);
          message.success("Job title added successfully");
        } else if (activeTab === "payGrades") {
          const newPayGrade = {
            key: String(payGrades.length + 1),
            code: values.code,
            name: values.name,
            minSalary: values.minSalary,
            maxSalary: values.maxSalary,
          };
          setPayGrades([...payGrades, newPayGrade]);
          message.success("Pay grade added successfully");
        } else if (activeTab === "employmentStatuses") {
          const newStatus = {
            key: String(employmentStatuses.length + 1),
            code: values.code,
            name: values.name,
            description: values.description,
          };
          setEmploymentStatuses([...employmentStatuses, newStatus]);
          message.success("Employment status added successfully");
        }
      } else if (modalType === "edit") {
        // Edit existing record based on active tab
        if (activeTab === "jobTitles") {
          const updatedJobTitles = jobTitles.map((item) =>
            item.key === currentRecord.key
              ? { ...item, code: values.code, title: values.title }
              : item
          );
          setJobTitles(updatedJobTitles);
          message.success("Job title updated successfully");
        } else if (activeTab === "payGrades") {
          const updatedPayGrades = payGrades.map((item) =>
            item.key === currentRecord.key
              ? {
                  ...item,
                  code: values.code,
                  name: values.name,
                  minSalary: values.minSalary,
                  maxSalary: values.maxSalary,
                }
              : item
          );
          setPayGrades(updatedPayGrades);
          message.success("Pay grade updated successfully");
        } else if (activeTab === "employmentStatuses") {
          const updatedStatuses = employmentStatuses.map((item) =>
            item.key === currentRecord.key
              ? {
                  ...item,
                  code: values.code,
                  name: values.name,
                  description: values.description,
                }
              : item
          );
          setEmploymentStatuses(updatedStatuses);
          message.success("Employment status updated successfully");
        }
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
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        if (activeTab === "jobTitles") {
          setJobTitles(jobTitles.filter((item) => item.key !== record.key));
        } else if (activeTab === "payGrades") {
          setPayGrades(payGrades.filter((item) => item.key !== record.key));
        } else if (activeTab === "employmentStatuses") {
          setEmploymentStatuses(
            employmentStatuses.filter((item) => item.key !== record.key)
          );
        }
        message.success("Item deleted successfully");
      },
    });
  };

  // Function to handle copy
  const handleCopy = (record) => {
    if (activeTab === "jobTitles") {
      const newJobTitle = {
        key: String(jobTitles.length + 1),
        code: `${record.code}_COPY`,
        title: `${record.title} (Copy)`,
      };
      setJobTitles([...jobTitles, newJobTitle]);
    } else if (activeTab === "payGrades") {
      const newPayGrade = {
        key: String(payGrades.length + 1),
        code: `${record.code}_COPY`,
        name: `${record.name} (Copy)`,
        minSalary: record.minSalary,
        maxSalary: record.maxSalary,
      };
      setPayGrades([...payGrades, newPayGrade]);
    } else if (activeTab === "employmentStatuses") {
      const newStatus = {
        key: String(employmentStatuses.length + 1),
        code: `${record.code}_COPY`,
        name: `${record.name} (Copy)`,
        description: record.description,
      };
      setEmploymentStatuses([...employmentStatuses, newStatus]);
    }
    message.success("Item copied successfully");
  };

  // Columns for job titles table
  const jobTitleColumns = [
    {
      title: "Job Title Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
          <Button
            size="small"
            type="primary"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
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

  // Columns for pay grades table
  const payGradeColumns = [
    {
      title: "Grade Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Grade Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Minimum Salary",
      dataIndex: "minSalary",
      key: "minSalary",
      render: (value) => `UGX ${value.toLocaleString()}`,
      sorter: (a, b) => a.minSalary - b.minSalary,
    },
    {
      title: "Maximum Salary",
      dataIndex: "maxSalary",
      key: "maxSalary",
      render: (value) => `UGX ${value.toLocaleString()}`,
      sorter: (a, b) => a.maxSalary - b.maxSalary,
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
          <Button
            size="small"
            type="primary"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
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

  // Columns for employment status table
  const employmentStatusColumns = [
    {
      title: "Status Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Status Name",
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
          <Button
            size="small"
            type="primary"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
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

  // Render form fields based on active tab
  const renderFormFields = () => {
    if (activeTab === "jobTitles") {
      return (
        <>
          <Form.Item
            name="code"
            label="Job Title Code"
            rules={[{ required: true, message: "Please enter job title code" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
        </>
      );
    } else if (activeTab === "payGrades") {
      return (
        <>
          <Form.Item
            name="code"
            label="Grade Code"
            rules={[{ required: true, message: "Please enter grade code" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Grade Name"
            rules={[{ required: true, message: "Please enter grade name" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
          <Form.Item
            name="minSalary"
            label="Minimum Salary"
            rules={[{ required: true, message: "Please enter minimum salary" }]}
          >
            <Input type="number" disabled={modalType === "view"} prefix="UGX" />
          </Form.Item>
          <Form.Item
            name="maxSalary"
            label="Maximum Salary"
            rules={[{ required: true, message: "Please enter maximum salary" }]}
          >
            <Input type="number" disabled={modalType === "view"} prefix="UGX" />
          </Form.Item>
        </>
      );
    } else if (activeTab === "employmentStatuses") {
      return (
        <>
          <Form.Item
            name="code"
            label="Status Code"
            rules={[{ required: true, message: "Please enter status code" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Status Name"
            rules={[{ required: true, message: "Please enter status name" }]}
          >
            <Input disabled={modalType === "view"} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} disabled={modalType === "view"} />
          </Form.Item>
        </>
      );
    }
    return null;
  };

  // Get modal title based on type and active tab
  const getModalTitle = () => {
    const action =
      modalType === "add" ? "Add" : modalType === "edit" ? "Edit" : "View";
    const item =
      activeTab === "jobTitles"
        ? "Job Title"
        : activeTab === "payGrades"
          ? "Pay Grade"
          : "Employment Status";
    return `${action} ${item}`;
  };

  // Get section title and description based on active tab
  const getSectionInfo = () => {
    if (activeTab === "jobTitles") {
      return {
        title: "Job Titles",
        description:
          "Here you can manage the job titles in your organization. Each employee needs to be assigned a job title.",
      };
    } else if (activeTab === "payGrades") {
      return {
        title: "Pay Grades",
        description:
          "Manage salary ranges for different job levels in your organization. Pay grades help ensure fair and consistent compensation.",
      };
    } else {
      return {
        title: "Employment Status",
        description:
          "Define different types of employment relationships in your organization, such as full-time, part-time, or contract.",
      };
    }
  };

  return (
    <div
      style={{
        padding: "0px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            key: "jobTitles",
            label: (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <UserCheck size={16} />
                Job Titles
              </span>
            ),
          },
          {
            key: "payGrades",
            label: (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <DollarSign size={16} />
                Pay Grades
              </span>
            ),
          },
          {
            key: "employmentStatuses",
            label: (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <UserCheck size={16} />
                Employment Status
              </span>
            ),
          },
        ]}
      />

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "0px",
        }}
      >
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

        {activeTab === "jobTitles" && (
          <Table
            size="small"
            columns={jobTitleColumns}
            dataSource={jobTitles}
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        )}

        {activeTab === "payGrades" && (
          <Table
            size="small"
            columns={payGradeColumns}
            dataSource={payGrades}
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        )}

        {activeTab === "employmentStatuses" && (
          <Table
            size="small"
            columns={employmentStatusColumns}
            dataSource={employmentStatuses}
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>

      <Modal
        title={getModalTitle()}
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
  );
};

export default JobManagement;
