import React from "react";
import { useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Input,
  Space,
  Tooltip,
  Modal,
  DatePicker,
  Select,
  Form,
} from "antd";
import { Filter, Search, Edit2, Eye } from "lucide-react";
import SectionHeader from "../SectionHeader";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AuditLog = () => {
  const [activeTab, setActiveTab] = useState("audit");
  const [searchText, setSearchText] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterForm] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null > null);

  // Sample data for Audit Log
  const auditLogData = [
    {
      key: "1",
      time: "2025-02-27 08:23:13",
      user: "admin",
      employee: "Musiitwa Joel [EmpId = EMP001]",
      ip: "172.69.22.240",
      type: "Authentication",
      details: "User Login",
    },
    {
      key: "2",
      time: "2025-02-26 12:07:31",
      user: "tashahdesire2",
      employee: "Tasha Desire [EmpId = NUA3346]",
      ip: "172.69.135.82",
      type: "Authentication",
      details: "User Login",
    },
    {
      key: "3",
      time: "2025-02-26 12:06:23",
      user: "admin",
      employee: "Musiitwa Joel [EmpId = EMP001]",
      ip: "172.71.154.13",
      type: "Add",
      details: "Added an object to UserInvitation [id:1]",
    },
    {
      key: "4",
      time: "2025-02-26 09:24:34",
      user: "admin",
      employee: "Musiitwa Joel [EmpId = EMP001]",
      ip: "172.69.22.109",
      type: "Edit",
      details: "Edited an object in Employee [id:1]",
    },
    {
      key: "5",
      time: "2025-02-26 09:21:10",
      user: "admin",
      employee: "IceHrm Employee [EmpId = EMP001]",
      ip: "162.158.167.15",
      type: "Authentication",
      details: "User Login",
    },
  ];

  // Sample data for Email Log
  const emailLogData = [
    {
      key: "1",
      time: "2025-02-26 17:36:22",
      subject: "Musiitwa Joel invites you to Nkumba Hrm",
      recipient: "tashahdesire2@gmail.com",
      sentTime: "2025-02-26 17:36:22",
      status: "Sent",
    },
    {
      key: "2",
      time: "2025-02-26 17:36:44",
      subject: "Your Nkumba Hrm account is ready",
      recipient: "tashahdesire2@gmail.com",
      sentTime: "2025-02-26 17:36:44",
      status: "Sent",
    },
  ];

  const auditLogColumns = [
    {
      title: "Time (GMT)",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => a.time.localeCompare(b.time),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      sorter: (a, b) => a.employee.localeCompare(b.employee),
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      sorter: (a, b) => a.ip.localeCompare(b.ip),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              size="small"
              type="primary"
              icon={<Edit2 size={16} />}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="View">
            <Button
              size="small"
              type="primary"
              icon={<Eye size={16} />}
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
              onClick={() => handleView(record)}
            >
              View
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const emailLogColumns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => a.time.localeCompare(b.time),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
      sorter: (a, b) => a.recipient.localeCompare(b.recipient),
    },
    {
      title: "Sent Time",
      dataIndex: "sentTime",
      key: "sentTime",
      sorter: (a, b) => a.sentTime.localeCompare(b.sentTime),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button
              size="small"
              type="primary"
              icon={<Eye size={16} />}
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
              onClick={() => handleView(record)}
            >
              View
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchText);
  };

  const handleEdit = (record) => {
    console.log("Editing record:", record);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterSubmit = () => {
    filterForm.validateFields().then((values) => {
      console.log("Filter values:", values);
      setIsFilterModalVisible(false);
    });
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
        <SectionHeader
          title="System Logs"
          description="View and manage system audit logs and email logs"
          moreInfoLink="#"
        />

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Audit Log" key="audit" />
          <TabPane tab="Email Log" key="email" />
        </Tabs>

        <div
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            icon={<Filter size={16} />}
            onClick={handleFilter}
          >
            Filters
          </Button>
          <Space>
            <Input
              size="small"
              placeholder="input search text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              size="small"
              type="primary"
              icon={<Search size={16} />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Space>
        </div>

        <Table
          size="small"
          columns={activeTab === "audit" ? auditLogColumns : emailLogColumns}
          dataSource={activeTab === "audit" ? auditLogData : emailLogData}
          pagination={{
            total:
              activeTab === "audit" ? auditLogData.length : emailLogData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

        {/* Filter Modal */}
        <Modal
          title="Filter Logs"
          open={isFilterModalVisible}
          onOk={handleFilterSubmit}
          onCancel={() => setIsFilterModalVisible(false)}
        >
          <Form form={filterForm} layout="vertical">
            <Form.Item name="dateRange" label="Date Range">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
            {activeTab === "audit" && (
              <>
                <Form.Item name="type" label="Type">
                  <Select
                    mode="multiple"
                    placeholder="Select types"
                    options={[
                      { value: "Authentication", label: "Authentication" },
                      { value: "Add", label: "Add" },
                      { value: "Edit", label: "Edit" },
                      { value: "Delete", label: "Delete" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="user" label="User">
                  <Select
                    mode="multiple"
                    placeholder="Select users"
                    options={[
                      { value: "admin", label: "admin" },
                      { value: "tashahdesire2", label: "tashahdesire2" },
                    ]}
                  />
                </Form.Item>
              </>
            )}
            {activeTab === "email" && (
              <>
                <Form.Item name="status" label="Status">
                  <Select
                    mode="multiple"
                    placeholder="Select status"
                    options={[
                      { value: "Sent", label: "Sent" },
                      { value: "Failed", label: "Failed" },
                      { value: "Pending", label: "Pending" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="recipient" label="Recipient">
                  <Input placeholder="Enter recipient email" />
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>

        {/* View Modal */}
        <Modal
          title="Log Details"
          open={viewModalVisible}
          onOk={() => setViewModalVisible(false)}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button
              size="small"
              key="close"
              onClick={() => setViewModalVisible(false)}
            >
              Close
            </Button>,
          ]}
        >
          {selectedRecord && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {Object.entries(selectedRecord).map(([key, value]) => (
                <div key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AuditLog;
