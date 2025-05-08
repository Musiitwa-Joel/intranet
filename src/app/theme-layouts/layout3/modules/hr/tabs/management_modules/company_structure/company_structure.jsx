import React from "react";

import { useState } from "react";
import {
  Table,
  Card,
  Tabs,
  Typography,
  Button,
  Input,
  Space,
  Tooltip,
  Tag,
  Breadcrumb,
  theme,
  Modal,
  Form,
  Select,
  Drawer,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  ApartmentOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Link, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const CompanyStructurePage = () => {
  const { token } = theme.useToken();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState([
    {
      key: "1",
      name: "Your Company",
      address: "",
      type: "Company",
      country: "United States",
      timeZone: "Europe/London",
      parentStructure: undefined,
    },
    {
      key: "2",
      name: "Head Office",
      address: "PO Box 001002 Sample Road, Sample Town",
      type: "Head Office",
      country: "United States",
      timeZone: "Europe/London",
      parentStructure: "Your Company",
    },
    {
      key: "3",
      name: "Marketing Department",
      address: "PO Box 001002 Sample Road, Sample Town",
      type: "Department",
      country: "United States",
      timeZone: "Europe/London",
      parentStructure: "Head Office",
    },
  ]);

  const handleAdd = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsDrawerVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    messageApi.success("Structure deleted successfully");
  };

  const handleCopy = (record) => {
    const newRecord = {
      ...record,
      key: `${Date.now()}`,
      name: `${record.name} (Copy)`,
    };
    setData([...data, newRecord]);
    messageApi.success("Structure copied successfully");
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingKey) {
        // Edit existing record
        setData(
          data.map((item) =>
            item.key === editingKey ? { ...item, ...values } : item
          )
        );
        messageApi.success("Structure updated successfully");
      } else {
        // Add new record
        const newRecord = {
          ...values,
          key: `${Date.now()}`,
        };
        setData([...data, newRecord]);
        messageApi.success("Structure added successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Space>
          {record.type === "Company" && <ApartmentOutlined />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const colors = {
          Company: "blue",
          "Head Office": "purple",
          Department: "green",
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Time Zone",
      dataIndex: "timeZone",
      key: "timeZone",
    },
    {
      title: "Parent Structure",
      dataIndex: "parentStructure",
      key: "parentStructure",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="action-button edit"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="action-button view"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Structure"
            description="Are you sure you want to delete this structure?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="action-button delete"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Copy">
            <Button
              type="text"
              icon={<CopyOutlined />}
              className="action-button copy"
              onClick={() => handleCopy(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "0px", backgroundColor: token.colorBgContainer }}>
      {contextHolder}
      <Card bordered={false}>
        <Breadcrumb
          items={[
            {
              title: (
                <>
                  <HomeOutlined /> Home
                </>
              ),
            },
            {
              title: "Company Management",
            },
            {
              title: "Company Structure",
            },
          ]}
          style={{ marginBottom: "16px" }}
        />

        <Tabs defaultActiveKey="structure">
          <TabPane tab="Company Structure" key="structure">
            <div style={{ marginBottom: "24px" }}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Company Structure
                  </Title>
                  <Link
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <InfoCircleOutlined />
                    More Info
                  </Link>
                </div>
                <Text type="secondary">
                  Here you can define the structure of the company by adding
                  branches, departments, company units, etc. Each employee needs
                  to be connected to a company structure.
                </Text>
              </Space>
            </div>

            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Add New
              </Button>
              <Input
                placeholder="Search..."
                prefix={
                  <SearchOutlined
                    style={{ color: token.colorTextPlaceholder }}
                  />
                }
                onChange={(e) => setSearchText(e.target.value)}
                style={{ maxWidth: "300px" }}
                allowClear
              />
            </div>

            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                total: filteredData.length,
                pageSize: 10,
                showTotal: (total) => `Total ${total} items`,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              bordered
              size="small"
              scroll={{ x: "max-content" }}
            />
          </TabPane>
          <TabPane tab="Company Graph" key="graph">
            <div
              style={{
                minHeight: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text type="secondary">
                Company Graph visualization will be displayed here
              </Text>
            </div>
          </TabPane>
        </Tabs>

        {/* Add/Edit Modal */}
        <Modal
          title={editingKey ? "Edit Structure" : "Add New Structure"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ type: "Department" }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please select type" }]}
            >
              <Select>
                <Option value="Company">Company</Option>
                <Option value="Head Office">Head Office</Option>
                <Option value="Department">Department</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please select country" }]}
            >
              <Select showSearch>
                <Option value="United States">United States</Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="Canada">Canada</Option>
                {/* Add more countries as needed */}
              </Select>
            </Form.Item>

            <Form.Item
              name="timeZone"
              label="Time Zone"
              rules={[{ required: true, message: "Please select time zone" }]}
            >
              <Select showSearch>
                <Option value="Europe/London">Europe/London</Option>
                <Option value="America/New_York">America/New_York</Option>
                <Option value="Asia/Tokyo">Asia/Tokyo</Option>
                {/* Add more time zones as needed */}
              </Select>
            </Form.Item>

            <Form.Item name="parentStructure" label="Parent Structure">
              <Select
                allowClear
                showSearch
                placeholder="Select parent structure"
              >
                {data.map((item) => (
                  <Option key={item.key} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* View Details Drawer */}
        <Drawer
          title="Structure Details"
          placement="right"
          onClose={() => setIsDrawerVisible(false)}
          open={isDrawerVisible}
          width={400}
        >
          {selectedRecord && (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Text type="secondary">Name</Text>
                <Paragraph strong>{selectedRecord.name}</Paragraph>
              </div>

              <div>
                <Text type="secondary">Type</Text>
                <Paragraph>
                  <Tag
                    color={
                      selectedRecord.type === "Company"
                        ? "blue"
                        : selectedRecord.type === "Head Office"
                          ? "purple"
                          : "green"
                    }
                  >
                    {selectedRecord.type}
                  </Tag>
                </Paragraph>
              </div>

              {selectedRecord.address && (
                <div>
                  <Text type="secondary">Address</Text>
                  <Paragraph>{selectedRecord.address}</Paragraph>
                </div>
              )}

              <div>
                <Text type="secondary">Country</Text>
                <Paragraph>
                  <Space>
                    <GlobalOutlined />
                    {selectedRecord.country}
                  </Space>
                </Paragraph>
              </div>

              <div>
                <Text type="secondary">Time Zone</Text>
                <Paragraph>
                  <Space>
                    <ClockCircleOutlined />
                    {selectedRecord.timeZone}
                  </Space>
                </Paragraph>
              </div>

              {selectedRecord.parentStructure && (
                <div>
                  <Text type="secondary">Parent Structure</Text>
                  <Paragraph>
                    <Space>
                      <ApartmentOutlined />
                      {selectedRecord.parentStructure}
                    </Space>
                  </Paragraph>
                </div>
              )}
            </Space>
          )}
        </Drawer>
      </Card>

      <style>{`
        .action-button {
          padding: 4px 8px;
          height: 32px;
        }
        .action-button:hover {
          background-color: ${token.colorBgTextHover};
        }
        .action-button.edit:hover {
          color: ${token.colorPrimary};
        }
        .action-button.view:hover {
          color: ${token.colorInfo};
        }
        .action-button.delete:hover {
          color: ${token.colorError};
        }
        .action-button.copy:hover {
          color: ${token.colorSuccess};
        }
        .ant-table-cell {
          vertical-align: middle !important;
        }
      `}</style>
    </div>
  );
};

export default CompanyStructurePage;
