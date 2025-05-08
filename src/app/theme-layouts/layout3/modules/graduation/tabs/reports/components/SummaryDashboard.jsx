import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Space,
  Tag,
  Table,
  Progress,
  Typography,
  Button,
  Spin,
  Dropdown,
} from "antd";
import {
  UserOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import GaugeComponent from "react-gauge-component";
import CountUp from "react-countup";
import styled from "styled-components";
import { Download, OpenInNew } from "@mui/icons-material";
import { url2 } from "app/configs/apiConfig";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  DOWNLOAD_GRADUATION_LIST,
  GET_CLEARANCE_STATISTICS,
} from "../../../gql/queries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LOAD_REQS = gql`
  query reqs {
    acc_yrs {
      id
      acc_yr_title
    }
    campuses {
      id
      campus_title
    }
    intakes {
      id
      intake_title
    }
    study_times {
      id
      study_time_title
    }
  }
`;

const { Option } = Select;
const { Title } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const StatCard = styled(StyledCard)`
  background: ${(props) => props.bgcolor || "#fff"};
  .ant-card-body {
    padding: 20px;
  }
  .stat-title {
    color: ${(props) => props.textcolor || "#8c8c8c"};
    font-size: 14px;
    margin-bottom: 8px;
  }
  .stat-value {
    color: ${(props) => props.textcolor || "#000"};
    font-size: 24px;
    font-weight: 600;
  }
  .stat-icon {
    font-size: 24px;
    color: ${(props) => props.iconcolor || "#1890ff"};
  }
`;

const SummaryDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(LOAD_REQS);
  const [filters, setFilters] = useState({
    academic_year: "",
    campus: "all",
    intake: "all",
    study_time: "all",
    faculty: "all",
  });

  const [
    downloadGraduationList,
    {
      loading: downloadLoading,
      data: downloadData,
      error: downloadError,
      refetch: refetchDownload,
    },
  ] = useLazyQuery(DOWNLOAD_GRADUATION_LIST);

  const {
    loading: statsLoading,
    data: statsData,
    error: statsError,
    refetch: refetchStats,
  } = useQuery(GET_CLEARANCE_STATISTICS, {
    variables: {
      accYrId: filters.academic_year,
      campusId: filters.campus,
      intakeId: filters.intake,
      studyTimeId: filters.study_time,
    },
    skip: !filters.academic_year,
    fetchPolicy: "no-cache",
  });

  const transformedFacultyData = useMemo(() => {
    if (!statsData?.get_graduation_clearance_statistics_by_course) return [];

    const groupedBySchool =
      statsData.get_graduation_clearance_statistics_by_course.reduce(
        (acc, course) => {
          if (!acc[course.school_id]) {
            acc[course.school_id] = {
              faculty: course.school_title,
              school_code: course.school_code,
              courses: [],
            };
          }

          acc[course.school_id].courses.push({
            name: course.course_code,
            title: course.course_title,
            total: course.total_qualified,
            cleared: course.total_cleared,
            pending: course.total_pending,
            rejected: course.total_rejected,
          });

          return acc;
        },
        {}
      );

    return Object.values(groupedBySchool);
  }, [statsData]);

  const lineChartData = useMemo(() => {
    return transformedFacultyData.map((faculty) => {
      const totalCleared = faculty.courses.reduce(
        (sum, course) => sum + course.cleared,
        0
      );
      const totalPending = faculty.courses.reduce(
        (sum, course) => sum + course.pending,
        0
      );
      const totalRejected = faculty.courses.reduce(
        (sum, course) => sum + course.rejected,
        0
      );

      return {
        faculty: faculty.school_code,
        cleared: totalCleared,
        pending: totalPending,
        rejected: totalRejected,
      };
    });
  }, [transformedFacultyData]);

  useEffect(() => {
    if (filters.academic_year) {
      refetchStats({
        accYrId: filters.academic_year,
        campusId: filters.campus,
        intakeId: filters.intake,
        studyTimeId: filters.study_time,
      });
    }
  }, [filters]);

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (statsError) {
      dispatch(
        showMessage({
          message: statsError.message,
          variant: "error",
        })
      );
    }
  }, [error, statsError]);

  useEffect(() => {
    if (data?.acc_yrs?.length > 0) {
      setFilters((prev) => ({
        ...prev,
        academic_year: data.acc_yrs[0].acc_yr_title,
      }));
    }
  }, [data]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  // Add these handler functions
  const handleDownloadReport = async (format) => {
    try {
      const { data } = await downloadGraduationList({
        variables: {
          accYrId: filters.academic_year,
          campusId: filters.campus,
          intakeId: filters.intake,
          studyTimeId: filters.study_time,
          format: format,
        },
      });

      if (data?.download_graduation_clearance_statistics) {
        window.open(data.download_graduation_clearance_statistics, "_blank");
      }
    } catch (error) {
      dispatch(
        showMessage({
          message: "Failed to generate download link",
          variant: "error",
        })
      );
    }
  };

  const handleDownloadAllReport = () => {
    handleDownloadReport("all");
  };

  const handlePreviewStudents = (record) => {
    // Implement your preview modal logic here
    console.log("Preview students for:", record);
  };

  // Dummy data for statistics
  const stats = {
    total_students: 1250,
    cleared_students: 850,
    pending_students: 300,
    rejected_students: 100,
    photo_submitted: 920,
    documents_verified: 890,
  };

  const facultyCoursesData = [
    {
      faculty: "School of Computing & IT",
      courses: [
        {
          name: "BSc Computer Science",
          total: 120,
          cleared: 100,
          pending: 15,
          rejected: 5,
        },
        {
          name: "BSc Information Technology",
          total: 100,
          cleared: 85,
          pending: 10,
          rejected: 5,
        },
        {
          name: "BSc Software Engineering",
          total: 80,
          cleared: 65,
          pending: 15,
          rejected: 0,
        },
      ],
    },
    {
      faculty: "School of Business",
      courses: [
        {
          name: "Bachelor of Commerce",
          total: 150,
          cleared: 120,
          pending: 20,
          rejected: 10,
        },
        {
          name: "BBA Management",
          total: 180,
          cleared: 150,
          pending: 25,
          rejected: 5,
        },
        {
          name: "BSc Economics",
          total: 120,
          cleared: 100,
          pending: 15,
          rejected: 5,
        },
      ],
    },
    // ... add more faculties
  ];

  // Dummy data for faculty breakdown
  const facultyData = [
    {
      faculty: "School of Computing & IT",
      total: 300,
      cleared: 250,
      pending: 40,
      rejected: 10,
    },
    {
      faculty: "School of Business",
      total: 450,
      cleared: 300,
      pending: 120,
      rejected: 30,
    },
    {
      faculty: "School of Engineering",
      total: 280,
      cleared: 200,
      pending: 60,
      rejected: 20,
    },
    {
      faculty: "School of Education",
      total: 220,
      cleared: 100,
      pending: 80,
      rejected: 40,
    },
  ];

  const columns = [
    { title: "Faculty", dataIndex: "faculty", key: "faculty" },
    { title: "Total Students", dataIndex: "total", key: "total" },
    {
      title: "Clearance Progress",
      key: "progress",
      render: (_, record) => (
        <Progress
          percent={Math.round((record.cleared / record.total) * 100)}
          size="small"
          status="active"
        />
      ),
    },
    { title: "Cleared", dataIndex: "cleared", key: "cleared" },
    { title: "Pending", dataIndex: "pending", key: "pending" },
    { title: "Rejected", dataIndex: "rejected", key: "rejected" },
  ];

  // Dummy data for trend chart
  const trendData = Array.from({ length: 30 }, (_, i) => ({
    date: `2024-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
    cleared: Math.floor(Math.random() * 50) + 20,
    pending: Math.floor(Math.random() * 30) + 10,
  }));

  const config = {
    data: trendData,
    xField: "date",
    yField: ["cleared", "pending"],
    seriesField: "type",
    smooth: true,
    animation: true,
    areaStyle: {
      fillOpacity: 0.6,
    },
    color: ["#52c41a", "#faad14"],
  };

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            Graduation Clearance Overview
          </Title>
        </Col>
        <Col>
          <Space size="middle">
            <Select
              value={filters.academic_year}
              style={{ width: 120 }}
              onChange={(value) =>
                setFilters({ ...filters, academic_year: value })
              }
            >
              {data?.acc_yrs?.map((year) => (
                <Option key={year.id} value={year.id}>
                  {year.acc_yr_title}
                </Option>
              ))}
            </Select>

            <Select
              value={filters.campus}
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, campus: value })}
            >
              <Option value="all">All Campuses</Option>
              {data?.campuses?.map((campus) => (
                <Option key={campus.id} value={campus.id}>
                  {campus.campus_title}
                </Option>
              ))}
            </Select>

            <Select
              value={filters.intake}
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, intake: value })}
            >
              <Option value="all">All Intakes</Option>
              {data?.intakes?.map((intake) => (
                <Option key={intake.id} value={intake.id}>
                  {intake.intake_title}
                </Option>
              ))}
            </Select>

            <Select
              value={filters.study_time}
              style={{ width: 120 }}
              onChange={(value) =>
                setFilters({ ...filters, study_time: value })
              }
            >
              <Option value="all">All Times</Option>
              {data?.study_times?.map((time) => (
                <Option key={time.id} value={time.id}>
                  {time.study_time_title}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>
      </Row>

      <Spin spinning={statsLoading}>
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={6}>
            <StatCard bgcolor="#1890ff" textcolor="#fff" iconcolor="#fff">
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="stat-title">Total Students</div>
                  <div className="stat-value">
                    <CountUp
                      end={
                        statsData?.get_graduation_clearance_statistics
                          ?.total_qualified_students || 0
                      }
                      duration={2.5}
                    />
                  </div>
                </Col>
                <Col>
                  <UserOutlined className="stat-icon" />
                </Col>
              </Row>
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard bgcolor="#52c41a" textcolor="#fff" iconcolor="#fff">
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="stat-title">Cleared</div>
                  <div className="stat-value">
                    <CountUp
                      end={
                        statsData?.get_graduation_clearance_statistics
                          ?.total_cleared_students || 0
                      }
                      duration={2.5}
                    />
                  </div>
                </Col>
                <Col>
                  <CheckCircleOutlined className="stat-icon" />
                </Col>
              </Row>
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard bgcolor="#faad14" textcolor="#fff" iconcolor="#fff">
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="stat-title">Pending</div>
                  <div className="stat-value">
                    <CountUp
                      end={
                        statsData?.get_graduation_clearance_statistics
                          ?.total_pending_students || 0
                      }
                      duration={2.5}
                    />
                  </div>
                </Col>
                <Col>
                  <FileProtectOutlined className="stat-icon" />
                </Col>
              </Row>
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard bgcolor="#ff4d4f" textcolor="#fff" iconcolor="#fff">
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="stat-title">Rejected</div>
                  <div className="stat-value">
                    <CountUp
                      end={
                        statsData?.get_graduation_clearance_statistics
                          ?.total_rejected_students || 0
                      }
                      duration={2.5}
                    />
                  </div>
                </Col>
                <Col>
                  <CloseCircleOutlined className="stat-icon" />
                </Col>
              </Row>
            </StatCard>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <StyledCard
                  title="Student Statistics per Faculty"
                  extra={
                    <Space>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "pdf",
                              label: "Download as PDF",
                              icon: <Download style={{ fontSize: 14 }} />,
                              onClick: () => handleDownloadReport("pdf"),
                            },
                            {
                              key: "csv",
                              label: "Download as CSV",
                              icon: <Download style={{ fontSize: 14 }} />,
                              onClick: () => handleDownloadReport("csv"),
                            },
                          ],
                        }}
                      >
                        <Button
                          type="primary"
                          ghost
                          icon={<Download style={{ fontSize: 14 }} />}
                          loading={downloadLoading}
                        >
                          Download All
                        </Button>
                      </Dropdown>
                      <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={(value) =>
                          setFilters({ ...filters, faculty: value })
                        }
                      >
                        <Option value="all">All Faculties</Option>
                        {transformedFacultyData.map((fac) => (
                          <Option key={fac.school_code} value={fac.school_code}>
                            {fac.faculty}
                          </Option>
                        ))}
                      </Select>
                    </Space>
                  }
                >
                  <Table
                    rowKey={"school_code"}
                    columns={[
                      {
                        title: "Faculty",
                        dataIndex: "faculty",
                        key: "faculty",
                        render: (text, record) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{ color: "#3b3bff", fontWeight: "600" }}
                            >
                              {`${record.school_code} - ${record.faculty}`}
                            </span>
                            <Space size="small">
                              <Button
                                size="small"
                                type="primary"
                                ghost
                                onClick={() =>
                                  handleDownloadReport(record.school_code)
                                }
                                icon={<Download style={{ fontSize: 14 }} />}
                              />
                              <Button
                                size="small"
                                danger
                                onClick={() => handlePreviewStudents(record)}
                                icon={
                                  <OpenInNew
                                    color="red"
                                    style={{ fontSize: 14 }}
                                  />
                                }
                              />
                            </Space>
                          </div>
                        ),
                      },
                    ]}
                    expandable={{
                      expandedRowRender: (faculty) => (
                        <Table
                          columns={[
                            {
                              title: "Course Code",
                              dataIndex: "name",
                              key: "name",
                              width: "15%",
                              ellipsis: true,
                            },
                            {
                              title: "Course Title",
                              dataIndex: "title",
                              key: "title",
                              width: "40%",
                              ellipsis: true,
                            },
                            {
                              title: "Total",
                              dataIndex: "total",
                              key: "total",
                              width: "10%",
                            },
                            {
                              title: "Cleared",
                              dataIndex: "cleared",
                              key: "cleared",
                              width: "10%",
                              render: (text) => (
                                <span style={{ color: "green" }}>{text}</span>
                              ),
                            },
                            {
                              title: "Pending",
                              dataIndex: "pending",
                              key: "pending",
                              width: "10%",
                              render: (text) => (
                                <span style={{ color: "orange" }}>{text}</span>
                              ),
                            },
                            {
                              title: "Rejected",
                              dataIndex: "rejected",
                              key: "rejected",
                              width: "10%",
                              render: (text) => (
                                <span style={{ color: "red" }}>{text}</span>
                              ),
                            },
                          ]}
                          dataSource={faculty.courses}
                          pagination={false}
                          size="small"
                          bordered
                          summary={(pageData) => {
                            let totalStudents = 0;
                            let totalCleared = 0;
                            let totalPending = 0;
                            let totalRejected = 0;

                            pageData.forEach((data) => {
                              totalStudents += data.total;
                              totalCleared += data.cleared;
                              totalPending += data.pending;
                              totalRejected += data.rejected;
                            });

                            return (
                              <Table.Summary.Row>
                                <Table.Summary.Cell
                                  colSpan={2}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell>
                                  <span style={{ fontWeight: "bold" }}>
                                    {totalStudents}
                                  </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    {totalCleared}
                                  </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "orange",
                                    }}
                                  >
                                    {totalPending}
                                  </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                  <span
                                    style={{ fontWeight: "bold", color: "red" }}
                                  >
                                    {totalRejected}
                                  </span>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                            );
                          }}
                        />
                      ),
                    }}
                    dataSource={transformedFacultyData}
                    pagination={false}
                    size="small"
                  />
                </StyledCard>
              </Col>

              <Col span={24}>
                <StyledCard title="Faculty Distribution Trend">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="faculty"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cleared"
                        stroke="#52c41a"
                        activeDot={{ r: 8 }}
                        name="Cleared Students"
                      />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#faad14"
                        name="Pending Students"
                      />
                      <Line
                        type="monotone"
                        dataKey="rejected"
                        stroke="#ff4d4f"
                        name="Rejected Students"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </StyledCard>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <StyledCard title="Quick Stats">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Faculty Completion Status
                </Typography.Title>
                <div style={{ height: 400 }}>
                  <Pie
                    data={transformedFacultyData.map((faculty) => {
                      const totalCleared = faculty.courses.reduce(
                        (sum, course) => sum + course.cleared,
                        0
                      );
                      const totalStudents = faculty.courses.reduce(
                        (sum, course) => sum + course.total,
                        0
                      );
                      return {
                        type: faculty.faculty,
                        value: totalCleared,
                        total: totalStudents,
                      };
                    })}
                    angleField="value"
                    colorField="type"
                    radius={0.8}
                    label={{
                      type: "outer",
                      formatter: (datum) =>
                        `${Math.round((datum.value / datum.total) * 100)}%`,
                    }}
                    tooltip={{
                      formatter: (datum) => ({
                        name: datum.type,
                        value: `${Math.round((datum.value / datum.total) * 100)}% (${
                          datum.value
                        }/${datum.total})`,
                      }),
                    }}
                    legend={{
                      layout: "vertical",
                      position: "right",
                    }}
                  />
                </div>

                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  % of Students Cleared
                </Typography.Title>

                <GaugeComponent
                  arc={{
                    subArcs: [
                      {
                        limit: 20,
                        color: "#EA4228",
                        showTick: true,
                      },
                      {
                        limit: 40,
                        color: "#F58B19",
                        showTick: true,
                      },
                      {
                        limit: 60,
                        color: "#F5CD19",
                        showTick: true,
                      },
                      {
                        limit: 100,
                        color: "#5BE12C",
                        showTick: true,
                      },
                    ],
                  }}
                  value={
                    Math.round(
                      (statsData?.get_graduation_clearance_statistics
                        ?.total_cleared_students /
                        statsData?.get_graduation_clearance_statistics
                          ?.total_qualified_students) *
                        100
                    ) || 0
                  }
                  labels={{
                    valueLabel: {
                      style: {
                        fontSize: "35px",
                        fill: "red",
                        color: "red",
                        textShadow: "none",
                      },
                      matchColorWithArc: true,
                      formatTextValue: (value) => `${value}%`,
                    },
                  }}
                  pointer={{
                    type: "arrow",
                    elastic: true,
                  }}
                  style={{
                    width: "100%", // Ensures the gauge fits within its container
                    backgroundColor: "#fff",
                    padding: 0,
                  }}
                />
              </Space>
            </StyledCard>
          </Col>
        </Row>

        {/* <Card title="Faculty Breakdown" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={facultyData}
          pagination={false}
          size="small"
        />
      </Card> */}
      </Spin>
    </div>
  );
};

export default SummaryDashboard;
