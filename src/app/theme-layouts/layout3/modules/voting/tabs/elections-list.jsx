import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Dropdown,
  Modal,
  message,
  Badge,
  Switch,
  DatePicker,
  Select,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  UserOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ElectionsList({ type }) {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [statusFilter, setStatusFilter] = useState([]);

  // Mock data for different election types
  const mockData = {
    upcoming: [
      {
        key: "1",
        title: "Nkumba University Guild Presidential Election 2023/2024",
        startDate: "2023-06-15",
        registrationDeadline: "2023-05-15",
        location: "Main Campus, Freedom Square",
        type: "Online",
        candidates: 3,
        status: "Registration Open",
        visibility: true,
      },
      {
        key: "2",
        title: "Student Council Representatives",
        startDate: "2023-07-10",
        registrationDeadline: "2023-06-10",
        location: "University Auditorium",
        type: "Physical",
        candidates: 5,
        status: "Registration Open",
        visibility: true,
      },
      {
        key: "3",
        title: "Faculty Representatives",
        startDate: "2023-07-20",
        registrationDeadline: "2023-06-20",
        location: "Faculty Buildings",
        type: "Hybrid",
        candidates: 8,
        status: "Draft",
        visibility: false,
      },
    ],
    ongoing: [
      {
        key: "1",
        title: "Nkumba University Guild Presidential Election",
        endDate: "2023-05-15",
        startDate: "2023-05-10",
        location: "Online Platform",
        type: "Online",
        candidates: 3,
        votes: 1243,
        status: "Active",
        visibility: true,
      },
      {
        key: "2",
        title: "Health Minister Election",
        endDate: "2023-05-12",
        startDate: "2023-05-08",
        location: "Online Platform",
        type: "Online",
        candidates: 3,
        votes: 654,
        status: "Active",
        visibility: true,
      },
    ],
    past: [
      {
        key: "1",
        title: "Makerere University Guild Presidential Election 2022/2023",
        endDate: "2022-11-15",
        startDate: "2022-11-10",
        location: "Main Campus",
        type: "Physical",
        candidates: 3,
        votes: 3245,
        turnout: "78%",
        status: "Completed",
        visibility: true,
      },
      {
        key: "2",
        title: "Kyambogo University Student Council Representatives 2022",
        endDate: "2022-09-20",
        startDate: "2022-09-15",
        location: "University Auditorium",
        type: "Physical",
        candidates: 3,
        votes: 2176,
        turnout: "65%",
        status: "Completed",
        visibility: true,
      },
      {
        key: "3",
        title:
          "Mbarara University of Science & Technology Health Minister 2022",
        endDate: "2022-07-12",
        startDate: "2022-07-08",
        location: "Online Platform",
        type: "Online",
        candidates: 3,
        votes: 1854,
        turnout: "72%",
        status: "Completed",
        visibility: true,
      },
      {
        key: "4",
        title: "Uganda Christian University Student Guild Elections 2022",
        endDate: "2022-08-15",
        startDate: "2022-08-10",
        location: "Main Campus",
        type: "Hybrid",
        candidates: 3,
        votes: 2543,
        turnout: "81%",
        status: "Completed",
        visibility: true,
      },
    ],
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData(mockData[type]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [type]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (record) => {
    setSelectedElection(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the election
    setData(data.filter((item) => item.key !== selectedElection.key));
    setDeleteModalVisible(false);
    message.success("Election deleted successfully");
  };

  const handleVisibilityChange = (checked, record) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === record.key);
    newData[index].visibility = checked;
    setData(newData);
    message.success(`Election ${checked ? "visible" : "hidden"} to students`);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(item.status);

    let matchesDate = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      const itemDate = new Date(
        type === "upcoming" ? item.startDate : item.endDate
      );
      matchesDate = itemDate >= startDate && itemDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getColumns = () => {
    const baseColumns = [
      {
        title: "Election Title",
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
          <div>
            <div>{text}</div>
            <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>
              {record.location}
            </div>
          </div>
        ),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type) => {
          let color = "default";
          if (type === "Online") color = "blue";
          if (type === "Physical") color = "green";
          if (type === "Hybrid") color = "purple";
          return <Tag color={color}>{type}</Tag>;
        },
      },
      {
        title: "Candidates",
        dataIndex: "candidates",
        key: "candidates",
        render: (candidates) => (
          <Tag icon={<UserOutlined />} color="default">
            {candidates}
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

          if (status === "Active") {
            color = "processing";
            icon = <ClockCircleOutlined />;
          } else if (status === "Registration Open") {
            color = "warning";
            icon = <CalendarOutlined />;
          } else if (status === "Completed") {
            color = "default";
            icon = <CheckCircleOutlined />;
          } else if (status === "Draft") {
            color = "default";
            icon = <EditOutlined />;
          }

          return (
            <Tag icon={icon} color={color}>
              {status}
            </Tag>
          );
        },
      },
      {
        title: "Visibility",
        dataIndex: "visibility",
        key: "visibility",
        render: (visibility, record) => (
          <Switch
            checked={visibility}
            onChange={(checked) => handleVisibilityChange(checked, record)}
            size="small"
          />
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          const items = [
            {
              key: "1",
              label: "View Details",
              icon: <EyeOutlined />,
            },
            {
              key: "2",
              label: "Edit",
              icon: <EditOutlined />,
            },
            {
              key: "3",
              label: "Delete",
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => handleDelete(record),
            },
          ];

          if (type === "past") {
            items.push({
              key: "4",
              label: "Download Results",
              icon: <DownloadOutlined />,
            });
          }

          if (type === "upcoming" || type === "ongoing") {
            items.push({
              key: "5",
              label: "Settings",
              icon: <SettingOutlined />,
            });
          }

          return (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          );
        },
      },
    ];

    // Add type-specific columns
    if (type === "upcoming") {
      return [
        ...baseColumns.slice(0, 3),
        {
          title: "Start Date",
          dataIndex: "startDate",
          key: "startDate",
        },
        {
          title: "Registration Deadline",
          dataIndex: "registrationDeadline",
          key: "registrationDeadline",
        },
        ...baseColumns.slice(3),
      ];
    } else if (type === "ongoing") {
      return [
        ...baseColumns.slice(0, 3),
        {
          title: "End Date",
          dataIndex: "endDate",
          key: "endDate",
        },
        {
          title: "Votes",
          dataIndex: "votes",
          key: "votes",
        },
        ...baseColumns.slice(3),
      ];
    } else if (type === "past") {
      return [
        ...baseColumns.slice(0, 3),
        {
          title: "End Date",
          dataIndex: "endDate",
          key: "endDate",
        },
        {
          title: "Votes",
          dataIndex: "votes",
          key: "votes",
        },
        {
          title: "Turnout",
          dataIndex: "turnout",
          key: "turnout",
        },
        ...baseColumns.slice(3),
      ];
    }

    return baseColumns;
  };

  const getTitle = () => {
    if (type === "upcoming") return "Upcoming Elections";
    if (type === "ongoing") return "Ongoing Elections";
    return "Past Elections";
  };

  const getStatusOptions = () => {
    if (type === "upcoming") {
      return [
        { value: "Registration Open", label: "Registration Open" },
        { value: "Draft", label: "Draft" },
      ];
    } else if (type === "ongoing") {
      return [{ value: "Active", label: "Active" }];
    } else {
      return [{ value: "Completed", label: "Completed" }];
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>{getTitle()}</h1>
        {type === "upcoming" && (
          <Button type="primary" icon={<PlusOutlined />}>
            Create New Election
          </Button>
        )}
      </div>

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Input
            placeholder="Search elections"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          <Button
            icon={<SettingOutlined />}
            onClick={() => setFilterVisible(!filterVisible)}
          >
            Filters
          </Button>
        </Space>
        <Space>
          <Badge count={filteredData.length}>
            <Button>Export</Button>
          </Badge>
        </Space>
      </div>

      {filterVisible && (
        <div
          style={{
            marginBottom: "16px",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: "8px" }}>Date Range</div>
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={(dates) => setDateRange(dates)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: "8px" }}>Status</div>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select status"
                  onChange={(values) => setStatusFilter(values)}
                  options={getStatusOptions()}
                />
              </div>
            </div>
          </Space>
        </div>
      )}

      <Table
        columns={getColumns()}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="key"
      />

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <ExclamationCircleOutlined
            style={{ color: "#ff4d4f", fontSize: "22px", marginRight: "16px" }}
          />
          <span>
            Are you sure you want to delete this election? This action cannot be
            undone.
          </span>
        </div>
      </Modal>
    </div>
  );
}
