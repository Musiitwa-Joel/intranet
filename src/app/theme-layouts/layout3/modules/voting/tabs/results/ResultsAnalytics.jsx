"use client";

import { useRef, useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Table,
  Tag,
  Avatar,
  Progress,
  Tabs,
  Divider,
  Badge,
  List,
  Timeline,
  Image,
} from "antd";
import {
  Box,
  Paper,
  LinearProgress,
  Chip,
  Stack,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Trophy,
  Medal,
  Award,
  Users,
  CheckCircle,
  Clock,
  Smartphone,
  Laptop,
  Monitor,
  Cpu,
  Globe,
  Clock3,
  BarChart2,
  PieChartIcon,
  TrendingUp,
  UserCheck,
  UserX,
  Percent,
  Calendar,
  MapPin,
  School,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock election data
const generateMockElectionData = () => {
  const candidates = [
    {
      id: 1,
      name: "John Smith",
      position: "Guild President",
      votes: 1245,
      party: "Students Democratic Party",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      color: "#1890ff",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Guild President",
      votes: 982,
      party: "Progressive Students Alliance",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
      color: "#52c41a",
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "Guild President",
      votes: 768,
      party: "Independent",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      color: "#faad14",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Guild President",
      votes: 543,
      party: "Student Reform Movement",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
      color: "#eb2f96",
    },
    {
      id: 5,
      name: "David Wilson",
      position: "Guild President",
      votes: 321,
      party: "Campus Unity Party",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      color: "#722ed1",
    },
  ];

  // Sort candidates by votes (descending)
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  // Calculate total votes
  const totalVotes = sortedCandidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  // Calculate percentages and add rank
  const candidatesWithStats = sortedCandidates.map((candidate, index) => ({
    ...candidate,
    rank: index + 1,
    percentage: ((candidate.votes / totalVotes) * 100).toFixed(2),
  }));

  return {
    electionName: "Guild Presidential Election 2025",
    electionDate: "March 15, 2025",
    totalVotes: totalVotes,
    totalEligibleVoters: 4500,
    turnout: ((totalVotes / 4500) * 100).toFixed(2),
    candidates: candidatesWithStats,
    winner: candidatesWithStats[0],
    runnerUp: candidatesWithStats[1],
    secondRunnerUp: candidatesWithStats[2],
    status: "Completed",
    startTime: "8:00 AM",
    endTime: "6:00 PM",
    campus: "Main Campus",
    academicYear: "2024/2025",
    deviceStats: {
      mobile: 2150,
      desktop: 1250,
      tablet: 459,
    },
    osStats: {
      Android: 1850,
      iOS: 300,
      Windows: 950,
      macOS: 300,
      Linux: 150,
      Other: 309,
    },
    browserStats: {
      Chrome: 2100,
      Safari: 650,
      Firefox: 350,
      Edge: 450,
      Opera: 150,
      Other: 159,
    },
    facultyStats: [
      { name: "Business School", votes: 1250, color: "#1890ff" },
      { name: "Engineering", votes: 950, color: "#52c41a" },
      { name: "Arts & Social Sciences", votes: 850, color: "#faad14" },
      { name: "Medicine", votes: 650, color: "#eb2f96" },
      { name: "Law", votes: 300, color: "#722ed1" },
    ],
    timeStats: {
      "8:00 - 10:00": 850,
      "10:00 - 12:00": 1200,
      "12:00 - 14:00": 950,
      "14:00 - 16:00": 550,
      "16:00 - 18:00": 450,
    },
    studyYearStats: {
      "Year 1": 1450,
      "Year 2": 1250,
      "Year 3": 950,
      "Year 4": 650,
      "Year 5+": 200,
    },
    genderStats: {
      Male: 2100,
      Female: 1759,
    },
    votingTimelineData: [
      { time: "08:00", votes: 120 },
      { time: "09:00", votes: 240 },
      { time: "10:00", votes: 380 },
      { time: "11:00", votes: 520 },
      { time: "12:00", votes: 680 },
      { time: "13:00", votes: 750 },
      { time: "14:00", votes: 820 },
      { time: "15:00", votes: 930 },
      { time: "16:00", votes: 1020 },
      { time: "17:00", votes: 1150 },
      { time: "18:00", votes: 1200 },
    ],
    locationStats: {
      "Main Campus": 2500,
      "North Campus": 1200,
      "South Campus": 800,
      Online: 359,
    },
    votingSessionStats: {
      averageTime: "2m 15s",
      fastestTime: "45s",
      slowestTime: "5m 30s",
      totalSessions: 3859,
      completedSessions: 3859,
      abandonedSessions: 0,
    },
  };
};

const ResultsAnalytics = ({ onDataReady }) => {
  const [electionData, setElectionData] = useState(generateMockElectionData());
  const [activeTab, setActiveTab] = useState("1");
  const dashboardRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const podiumRef = useRef(null);
  const statsRef = useRef(null);
  const tableRef = useRef(null);

  // COLORS
  const COLORS = [
    "#1890ff",
    "#52c41a",
    "#faad14",
    "#eb2f96",
    "#722ed1",
    "#fa541c",
  ];

  // Format data for pie chart
  const pieChartData = electionData.candidates.map((candidate) => ({
    name: candidate.name,
    value: Number.parseInt(candidate.votes),
    color: candidate.color,
  }));

  // Format data for bar chart
  const barChartData = electionData.candidates.map((candidate) => ({
    name: candidate.name.split(" ")[0], // Use first name only for better display
    votes: candidate.votes,
    color: candidate.color,
  }));

  // Format data for device stats
  const deviceData = [
    {
      name: "Mobile",
      value: electionData.deviceStats.mobile,
      icon: <Smartphone size={16} />,
    },
    {
      name: "Desktop",
      value: electionData.deviceStats.desktop,
      icon: <Monitor size={16} />,
    },
    {
      name: "Tablet",
      value: electionData.deviceStats.tablet,
      icon: <Laptop size={16} />,
    },
  ];

  // Format data for OS stats
  const osData = Object.entries(electionData.osStats).map(([name, value]) => ({
    name,
    value,
    color:
      name === "Android"
        ? "#3DDC84"
        : name === "iOS"
          ? "#000000"
          : name === "Windows"
            ? "#0078D6"
            : name === "macOS"
              ? "#999999"
              : name === "Linux"
                ? "#FCC624"
                : "#CCCCCC",
  }));

  // Format data for browser stats
  const browserData = Object.entries(electionData.browserStats).map(
    ([name, value]) => ({
      name,
      value,
      color:
        name === "Chrome"
          ? "#4285F4"
          : name === "Safari"
            ? "#000000"
            : name === "Firefox"
              ? "#FF7139"
              : name === "Edge"
                ? "#0078D7"
                : name === "Opera"
                  ? "#FF1B2D"
                  : "#CCCCCC",
    })
  );

  // Format data for faculty pie chart
  const facultyData = electionData.facultyStats.map((faculty) => ({
    name: faculty.name,
    value: faculty.votes,
    color: faculty.color,
  }));

  // Format data for time stats
  const timeData = Object.entries(electionData.timeStats).map(
    ([time, votes]) => ({
      time,
      votes,
    })
  );

  // Format data for study year stats
  const studyYearData = Object.entries(electionData.studyYearStats).map(
    ([year, votes]) => ({
      name: year,
      value: votes,
      color:
        year === "Year 1"
          ? "#1890ff"
          : year === "Year 2"
            ? "#52c41a"
            : year === "Year 3"
              ? "#faad14"
              : year === "Year 4"
                ? "#eb2f96"
                : "#722ed1",
    })
  );

  // Format data for gender stats
  const genderData = Object.entries(electionData.genderStats).map(
    ([gender, votes]) => ({
      name: gender,
      value: votes,
      color: gender === "Male" ? "#1890ff" : "#eb2f96",
    })
  );

  // Format data for location stats
  const locationData = Object.entries(electionData.locationStats).map(
    ([location, votes]) => ({
      name: location,
      value: votes,
      color:
        location === "Main Campus"
          ? "#1890ff"
          : location === "North Campus"
            ? "#52c41a"
            : location === "South Campus"
              ? "#faad14"
              : "#eb2f96",
    })
  );

  // Table columns
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank) => {
        let color = "default";
        let icon = null;
        if (rank === 1) {
          color = "gold";
          icon = <Trophy size={16} />;
        } else if (rank === 2) {
          color = "silver";
          icon = <Medal size={16} />;
        } else if (rank === 3) {
          color = "#cd7f32"; // bronze
          icon = <Award size={16} />;
        }
        return (
          <Tag color={color} style={{ fontWeight: "bold" }}>
            {icon} {rank}
          </Tag>
        );
      },
    },
    {
      title: "Candidate",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={record.avatar} />
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>
              {record.party}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
      width: 100,
      render: (votes) => (
        <span style={{ fontWeight: "bold" }}>{votes.toLocaleString()}</span>
      ),
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      width: 200,
      render: (percentage, record) => (
        <div>
          <Progress
            percent={Number.parseFloat(percentage)}
            size="small"
            strokeColor={record.color}
            showInfo={false}
            style={{ width: "120px", marginRight: "10px" }}
          />
          <span>{percentage}%</span>
        </div>
      ),
    },
  ];

  // Make data available to parent component
  useEffect(() => {
    if (typeof onDataReady === "function") {
      onDataReady({
        data: electionData.candidates,
        columns: columns,
      });
    }
  }, [electionData]);

  return (
    <div
      ref={dashboardRef}
      style={{
        backgroundColor: "#f0f2f5",
        height: "100%",
        overflow: "auto",
        padding: "0px",
        marginTop: "10px",
        scrollbarWidth: "thin",
      }}
    >
      {/* Key Statistics */}
      <Row gutter={[16, 16]} ref={statsRef}>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <Statistic
              title="Total Votes Cast"
              value={electionData.totalVotes}
              prefix={<Users size={16} style={{ marginRight: "5px" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <Statistic
              title="Eligible Voters"
              value={electionData.totalEligibleVoters}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <Statistic
              title="Voter Turnout"
              value={electionData.turnout}
              suffix="%"
              precision={2}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <Statistic
              title="Election Status"
              value={electionData.status}
              prefix={
                electionData.status === "Completed" ? (
                  <CheckCircle size={16} style={{ marginRight: "5px" }} />
                ) : (
                  <Clock size={16} style={{ marginRight: "5px" }} />
                )
              }
              valueStyle={{
                color:
                  electionData.status === "Completed" ? "#52c41a" : "#faad14",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Winner Podium */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderColor: "lightgray",
          borderWidth: 1,
          padding: 2,
          marginTop: 2,
          marginBottom: 2,
          borderRadius: "4px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <Title level={4}>Winner Podium</Title>
        <div ref={podiumRef}>
          <div
            style={{
              position: "relative",
              height: "300px",
              background: "linear-gradient(to bottom, #87CEEB, #f0f2f5)",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            {/* Second place - left */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "calc(50% - 250px)",
                width: "200px",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#C0C0C0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  border: "3px solid white",
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                2
              </div>
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: "#C0C0C0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid white",
                    marginBottom: "5px",
                  }}
                >
                  <Image
                    src={electionData.runnerUp.avatar || "/placeholder.svg"}
                    alt={electionData.runnerUp.name}
                    // style={{
                    //   width: "100%",
                    //   height: "100%",
                    //   objectFit: "cover",
                    // }}
                  />
                </div>
                <Text
                  strong
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {electionData.runnerUp.name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {electionData.runnerUp.votes} votes (
                  {electionData.runnerUp.percentage}%)
                </Text>
              </div>
            </div>

            {/* First place - center */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "220px",
                height: "240px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#FFD700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  border: "3px solid white",
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                1
              </div>
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  background: "#FFD700",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid white",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={electionData.winner.avatar || "/placeholder.svg"}
                    alt={electionData.winner.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Text
                  strong
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {electionData.winner.name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {electionData.winner.votes} votes (
                  {electionData.winner.percentage}%)
                </Text>
              </div>
            </div>

            {/* Third place - right */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "calc(50% - 250px)",
                width: "200px",
                height: "140px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#CD7F32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  border: "3px solid white",
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                3
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90px",
                  background: "#CD7F32",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid white",
                    marginBottom: "5px",
                  }}
                >
                  <img
                    src={
                      electionData.secondRunnerUp.avatar || "/placeholder.svg"
                    }
                    alt={electionData.secondRunnerUp.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Text
                  strong
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  {electionData.secondRunnerUp.name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  {electionData.secondRunnerUp.votes} votes (
                  {electionData.secondRunnerUp.percentage}%)
                </Text>
              </div>
            </div>

            {/* Base platform */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "10px",
                background: "#4a4a4a",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </Box>

      {/* Tabs for different analytics views */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderColor: "lightgray",
          borderWidth: 1,
          padding: 2,
          marginTop: 2,
          marginBottom: 2,
          borderRadius: "4px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <Tabs defaultActiveKey="1" onChange={setActiveTab}>
          <TabPane
            tab={
              <span style={{ display: "flex", alignItems: "center" }}>
                <BarChart2 size={16} style={{ marginRight: "8px" }} />
                Candidate Results
              </span>
            }
            key="1"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Votes Distribution</Title>
                  <div ref={barChartRef} style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes`,
                            props.payload.name,
                          ]}
                          labelFormatter={(label) => `Candidate: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="votes" name="Votes" radius={[5, 5, 0, 0]}>
                          {barChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Vote Share (%)</Title>
                  <div ref={pieChartRef} style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(2)}%`
                          }
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(2)}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            {/* Detailed Results Table */}
            <Box
              sx={{
                backgroundColor: "#fff",
                borderColor: "lightgray",
                borderWidth: 1,
                padding: 2,
                marginTop: 2,
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={4}>Detailed Results</Title>
              <div ref={tableRef}>
                <Table
                  columns={columns}
                  dataSource={electionData.candidates}
                  rowKey="id"
                  pagination={false}
                  bordered={false}
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Box>
          </TabPane>

          <TabPane
            tab={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Cpu size={16} style={{ marginRight: "8px" }} />
                Device Analytics
              </span>
            }
            key="2"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Device Types</Title>
                  <Row gutter={[16, 16]}>
                    {deviceData.map((device, index) => (
                      <Col span={8} key={index}>
                        <Card bordered={false} style={{ textAlign: "center" }}>
                          <div
                            style={{ fontSize: "24px", marginBottom: "8px" }}
                          >
                            {device.icon}
                          </div>
                          <Statistic
                            title={device.name}
                            value={device.value}
                            suffix={`(${((device.value / electionData.totalVotes) * 100).toFixed(1)}%)`}
                            valueStyle={{
                              color: COLORS[index % COLORS.length],
                            }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Box>
              </Col>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Operating Systems</Title>
                  <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={osData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {osData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Browser Distribution</Title>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={browserData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            props.payload.name,
                          ]}
                        />
                        <Legend />
                        <Bar dataKey="value" name="Votes" radius={[5, 5, 0, 0]}>
                          {browserData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Device Analytics Summary</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <List
                        header={
                          <div style={{ fontWeight: "bold" }}>
                            Top Platforms
                          </div>
                        }
                        bordered
                        dataSource={osData.slice(0, 3)}
                        renderItem={(item) => (
                          <List.Item>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <div>
                                <Badge color={item.color} text={item.name} />
                              </div>
                              <div>
                                {item.value} votes (
                                {(
                                  (item.value / electionData.totalVotes) *
                                  100
                                ).toFixed(1)}
                                %)
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <List
                        header={
                          <div style={{ fontWeight: "bold" }}>Top Browsers</div>
                        }
                        bordered
                        dataSource={browserData.slice(0, 3)}
                        renderItem={(item) => (
                          <List.Item>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <div>
                                <Badge color={item.color} text={item.name} />
                              </div>
                              <div>
                                {item.value} votes (
                                {(
                                  (item.value / electionData.totalVotes) *
                                  100
                                ).toFixed(1)}
                                %)
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Globe size={16} style={{ marginRight: "8px" }} />
                Demographics
              </span>
            }
            key="3"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Votes by Faculty</Title>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={facultyData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {facultyData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Votes by Study Year</Title>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={studyYearData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            props.payload.name,
                          ]}
                        />
                        <Legend />
                        <Bar dataKey="value" name="Votes" radius={[5, 5, 0, 0]}>
                          {studyYearData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} md={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Gender Distribution</Title>
                  <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
              <Col xs={24} md={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Voting Locations</Title>
                  <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes (${((value / electionData.totalVotes) * 100).toFixed(1)}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Demographic Insights</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <School
                            size={20}
                            style={{ marginRight: "8px", color: "#1890ff" }}
                          />
                          <Text strong>Faculty Participation</Text>
                        </div>
                        <Paragraph>
                          The Business School had the highest participation rate
                          with {facultyData[0].value} votes (
                          {(
                            (facultyData[0].value / electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of total votes).
                        </Paragraph>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (facultyData[0].value /
                              electionData.totalEligibleVoters) *
                            100
                          }
                          style={{
                            marginTop: "10px",
                            height: "8px",
                            borderRadius: "4px",
                          }}
                        />
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <Users
                            size={20}
                            style={{ marginRight: "8px", color: "#52c41a" }}
                          />
                          <Text strong>Study Year Analysis</Text>
                        </div>
                        <Paragraph>
                          First-year students were the most active voters with{" "}
                          {studyYearData[0].value} votes (
                          {(
                            (studyYearData[0].value / electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of total votes).
                        </Paragraph>
                        <Stack
                          direction="row"
                          spacing={1}
                          style={{ marginTop: "10px" }}
                        >
                          {studyYearData.map((year, index) => (
                            <MuiTooltip
                              key={index}
                              title={`${year.name}: ${year.value} votes`}
                            >
                              <Chip
                                label={year.name}
                                style={{
                                  backgroundColor: year.color,
                                  color: "white",
                                  fontSize: "11px",
                                }}
                              />
                            </MuiTooltip>
                          ))}
                        </Stack>
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <MapPin
                            size={20}
                            style={{ marginRight: "8px", color: "#faad14" }}
                          />
                          <Text strong>Location Distribution</Text>
                        </div>
                        <Paragraph>
                          {locationData[0].name} recorded the highest number of
                          votes with {locationData[0].value} (
                          {(
                            (locationData[0].value / electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of total votes).
                        </Paragraph>
                        <div style={{ marginTop: "10px" }}>
                          {locationData.map((location, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "5px",
                              }}
                            >
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: location.color,
                                  marginRight: "8px",
                                }}
                              />
                              <Text>
                                {location.name}: {location.value} votes
                              </Text>
                            </div>
                          ))}
                        </div>
                      </Paper>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Clock3 size={16} style={{ marginRight: "8px" }} />
                Time Analysis
              </span>
            }
            key="4"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Voting Timeline</Title>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={electionData.votingTimelineData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value) => [
                            `${value} votes`,
                            "Cumulative Votes",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="votes"
                          stroke="#1890ff"
                          fill="#1890ff"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Votes by Time Period</Title>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={timeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} votes`,
                            "Votes",
                          ]}
                        />
                        <Legend />
                        <Bar
                          dataKey="votes"
                          name="Votes"
                          fill="#1890ff"
                          radius={[5, 5, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
              <Col xs={24} lg={12}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Voting Session Statistics</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <Card bordered={false} style={{ textAlign: "center" }}>
                        <Statistic
                          title="Average Time"
                          value={electionData.votingSessionStats.averageTime}
                          valueStyle={{ color: "#1890ff" }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card bordered={false} style={{ textAlign: "center" }}>
                        <Statistic
                          title="Fastest Vote"
                          value={electionData.votingSessionStats.fastestTime}
                          valueStyle={{ color: "#52c41a" }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card bordered={false} style={{ textAlign: "center" }}>
                        <Statistic
                          title="Slowest Vote"
                          value={electionData.votingSessionStats.slowestTime}
                          valueStyle={{ color: "#faad14" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                  <Divider />
                  <Timeline style={{ marginTop: "20px" }}>
                    <Timeline.Item color="green">
                      Election started at {electionData.startTime}
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      Peak voting period: 10:00 - 12:00 ({timeData[1].votes}{" "}
                      votes)
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      Slowest voting period: 16:00 - 18:00 ({timeData[4].votes}{" "}
                      votes)
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      Election ended at {electionData.endTime}
                    </Timeline.Item>
                  </Timeline>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Voting Efficiency Metrics</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <UserCheck
                            size={20}
                            style={{ marginRight: "8px", color: "#52c41a" }}
                          />
                          <Text strong>Completed Sessions</Text>
                        </div>
                        <Statistic
                          value={
                            electionData.votingSessionStats.completedSessions
                          }
                          suffix={`/ ${electionData.votingSessionStats.totalSessions}`}
                          valueStyle={{ color: "#52c41a" }}
                        />
                        <Progress
                          percent={100}
                          status="success"
                          showInfo={false}
                          style={{ marginTop: "10px" }}
                        />
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <UserX
                            size={20}
                            style={{ marginRight: "8px", color: "#ff4d4f" }}
                          />
                          <Text strong>Abandoned Sessions</Text>
                        </div>
                        <Statistic
                          value={
                            electionData.votingSessionStats.abandonedSessions
                          }
                          suffix={`/ ${electionData.votingSessionStats.totalSessions}`}
                          valueStyle={{ color: "#ff4d4f" }}
                        />
                        <Progress
                          percent={0}
                          status="exception"
                          showInfo={false}
                          style={{ marginTop: "10px" }}
                        />
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={1}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <Percent
                            size={20}
                            style={{ marginRight: "8px", color: "#1890ff" }}
                          />
                          <Text strong>Completion Rate</Text>
                        </div>
                        <Statistic
                          value="100%"
                          valueStyle={{ color: "#1890ff" }}
                        />
                        <Text
                          type="secondary"
                          style={{ marginTop: "10px", display: "block" }}
                        >
                          All voting sessions were completed successfully with
                          no abandoned sessions.
                        </Text>
                      </Paper>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span style={{ display: "flex", alignItems: "center" }}>
                <TrendingUp size={16} style={{ marginRight: "8px" }} />
                Summary
              </span>
            }
            key="5"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Election Summary</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card title="Key Metrics" bordered={false}>
                        <List
                          itemLayout="horizontal"
                          dataSource={[
                            {
                              title: "Total Votes",
                              value: electionData.totalVotes,
                              icon: (
                                <Users size={16} style={{ color: "#1890ff" }} />
                              ),
                            },
                            {
                              title: "Voter Turnout",
                              value: `${electionData.turnout}%`,
                              icon: (
                                <Percent
                                  size={16}
                                  style={{ color: "#52c41a" }}
                                />
                              ),
                            },
                            {
                              title: "Election Date",
                              value: electionData.electionDate,
                              icon: (
                                <Calendar
                                  size={16}
                                  style={{ color: "#faad14" }}
                                />
                              ),
                            },
                            {
                              title: "Election Duration",
                              value: `${electionData.startTime} - ${electionData.endTime}`,
                              icon: (
                                <Clock size={16} style={{ color: "#eb2f96" }} />
                              ),
                            },
                          ]}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={item.icon}
                                title={item.title}
                                description={item.value}
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="Winner Information" bordered={false}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                          }}
                        >
                          <Avatar
                            src={electionData.winner.avatar}
                            size={64}
                            style={{ marginRight: "16px" }}
                          />
                          <div>
                            <Title level={5} style={{ margin: 0 }}>
                              {electionData.winner.name}
                            </Title>
                            <Text type="secondary">
                              {electionData.winner.party}
                            </Text>
                            <div style={{ marginTop: "8px" }}>
                              <Tag color="gold">
                                <Trophy
                                  size={12}
                                  style={{ marginRight: "4px" }}
                                />
                                Winner
                              </Tag>
                              <Tag color="blue">
                                {electionData.winner.votes} votes
                              </Tag>
                              <Tag color="green">
                                {electionData.winner.percentage}%
                              </Tag>
                            </div>
                          </div>
                        </div>
                        <Progress
                          percent={Number.parseFloat(
                            electionData.winner.percentage
                          )}
                          status="active"
                          strokeColor="#FFD700"
                        />
                      </Card>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>Key Insights</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={2}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <BarChart2
                            size={20}
                            style={{ marginRight: "8px", color: "#1890ff" }}
                          />
                          <Text strong>Candidate Performance</Text>
                        </div>
                        <Paragraph>
                          The winner secured {electionData.winner.percentage}%
                          of the total votes, with a lead of{" "}
                          {(
                            electionData.winner.votes -
                            electionData.runnerUp.votes
                          ).toLocaleString()}{" "}
                          votes over the runner-up. All candidates maintained
                          strong engagement throughout the election period.
                        </Paragraph>
                        <div style={{ marginTop: "10px" }}>
                          {electionData.candidates
                            .slice(0, 3)
                            .map((candidate, index) => (
                              <div key={index} style={{ marginBottom: "8px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text>{candidate.name}</Text>
                                  <Text strong>{candidate.votes} votes</Text>
                                </div>
                                <Progress
                                  percent={Number.parseFloat(
                                    candidate.percentage
                                  )}
                                  showInfo={false}
                                  strokeColor={candidate.color}
                                />
                              </div>
                            ))}
                        </div>
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={2}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <PieChartIcon
                            size={20}
                            style={{ marginRight: "8px", color: "#52c41a" }}
                          />
                          <Text strong>Demographic Highlights</Text>
                        </div>
                        <Paragraph>
                          First-year students showed the highest participation
                          rate. The Business School led faculty participation
                          with {facultyData[0].value} votes, representing{" "}
                          {(
                            (facultyData[0].value / electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of total votes.
                        </Paragraph>
                        <div style={{ marginTop: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Text>Gender Distribution:</Text>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                flex: genderData[0].value,
                                height: "20px",
                                backgroundColor: genderData[0].color,
                                borderRadius: "3px 0 0 3px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{ color: "white", fontSize: "12px" }}
                              >
                                {(
                                  (genderData[0].value /
                                    electionData.totalVotes) *
                                  100
                                ).toFixed(0)}
                                %
                              </Text>
                            </div>
                            <div
                              style={{
                                flex: genderData[1].value,
                                height: "20px",
                                backgroundColor: genderData[1].color,
                                borderRadius: "0 3px 3px 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{ color: "white", fontSize: "12px" }}
                              >
                                {(
                                  (genderData[1].value /
                                    electionData.totalVotes) *
                                  100
                                ).toFixed(0)}
                                %
                              </Text>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>{genderData[0].name}</Text>
                            <Text>{genderData[1].name}</Text>
                          </div>
                        </div>
                      </Paper>
                    </Col>
                    <Col xs={24} md={8}>
                      <Paper
                        elevation={2}
                        style={{ padding: "16px", height: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <Cpu
                            size={20}
                            style={{ marginRight: "8px", color: "#faad14" }}
                          />
                          <Text strong>Technical Insights</Text>
                        </div>
                        <Paragraph>
                          Mobile devices were the preferred voting platform (
                          {(
                            (electionData.deviceStats.mobile /
                              electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of votes). Android was the dominant OS with{" "}
                          {electionData.osStats.Android} votes (
                          {(
                            (electionData.osStats.Android /
                              electionData.totalVotes) *
                            100
                          ).toFixed(1)}
                          % of total).
                        </Paragraph>
                        <div style={{ marginTop: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Text>Top Browsers:</Text>
                          </div>
                          {browserData.slice(0, 3).map((browser, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                              }}
                            >
                              <Badge
                                color={browser.color}
                                text={browser.name}
                              />
                              <Text>
                                {(
                                  (browser.value / electionData.totalVotes) *
                                  100
                                ).toFixed(1)}
                                %
                              </Text>
                            </div>
                          ))}
                        </div>
                      </Paper>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    padding: 2,
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Title level={4}>System Performance</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="System Uptime"
                          value="100%"
                          valueStyle={{ color: "#52c41a" }}
                          prefix={<CheckCircle size={16} />}
                        />
                        <Paragraph style={{ marginTop: "10px" }}>
                          The voting system maintained 100% uptime throughout
                          the election period with no reported issues or
                          downtime.
                        </Paragraph>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Voting Success Rate"
                          value="100%"
                          valueStyle={{ color: "#52c41a" }}
                          prefix={<CheckCircle size={16} />}
                        />
                        <Paragraph style={{ marginTop: "10px" }}>
                          All {electionData.totalVotes} votes were successfully
                          recorded with no failed or incomplete voting sessions.
                        </Paragraph>
                      </Card>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Box>
    </div>
  );
};

export default ResultsAnalytics;
