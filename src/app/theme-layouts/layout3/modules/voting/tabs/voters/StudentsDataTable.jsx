import { ConfigProvider, Table, theme } from "antd";
import { useEffect } from "react";

const VoterDataTable = ({ panelWidth = 100, onDataReady = () => {} }) => {
  // Create mock data with 20 voters
  const mockVoters = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    voter_no: `VTR${String(index + 1).padStart(4, "0")}`,
    name: `${["John", "Jane", "Michael", "Sarah", "David", "Emma", "Robert", "Olivia"][index % 8]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson"][index % 8]}`,
    registration_no: `REG${String(index + 1).padStart(4, "0")}`,
    study_yr: Math.floor(Math.random() * 3) + 1,
    program: `Program ${(index % 5) + 1}`,
    email: `voter${index + 1}@example.com`,
    phone: `+256 ${Math.floor(Math.random() * 900000000) + 100000000}`,
    gender: index % 2 === 0 ? "Male" : "Female",
    voting_status: index % 5 === 0 ? "Not Voted" : "Voted",
    voting_time:
      index % 5 === 0
        ? "-"
        : `${new Date().toISOString().split("T")[0]} ${Math.floor(Math.random() * 12) + 8}:${Math.floor(
            Math.random() * 60
          )
            .toString()
            .padStart(2, "0")}`,
  }));

  // Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Voter Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Voter No",
      dataIndex: "voter_no",
      key: "voter_no",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Registration No",
      dataIndex: "registration_no",
      key: "registration_no",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Study Year",
      dataIndex: "study_yr",
      key: "study_yr",
      width: 100,
    },
    {
      title: "Program",
      dataIndex: "program",
      key: "program",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Voting Status",
      dataIndex: "voting_status",
      key: "voting_status",
      width: 120,
      render: (text) => (
        <span style={{ color: text === "Voted" ? "green" : "red" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Voting Time",
      dataIndex: "voting_time",
      key: "voting_time",
      width: 150,
    },
  ];

  // Use useEffect to pass data to parent component after render
  useEffect(() => {
    if (typeof onDataReady === "function") {
      onDataReady({ data: mockVoters, columns });
    }
  }, [onDataReady]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <Table
        columns={columns}
        dataSource={mockVoters}
        rowKey="id"
        bordered
        size="small"
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} voters`,
          pageSizeOptions: ["5", "10", "20"],
          defaultPageSize: 10,
        }}
        style={{
          width: "100%",
          borderColor: "lightgray",
        }}
        scroll={{
          x: "max-content",
          y: "calc(100vh - 245px)",
        }}
      />
    </ConfigProvider>
  );
};

export default VoterDataTable;
