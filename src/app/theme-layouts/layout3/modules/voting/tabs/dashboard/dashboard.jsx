import { useState, useEffect } from "react";
import moment from "moment";
import {
  DatePicker,
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Table,
  Radio,
  Progress,
  Typography,
  Tag,
  Tooltip,
} from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Remove min-w-screen or min-w-* classes from the root container
import {
  CalendarIcon as CalendarOutlined,
  CircleCheckIcon as CheckCircleOutlined,
  CircleOffIcon as CloseCircleOutlined,
  FilePlusIcon as FileAddOutlined,
  FileQuestionIcon as FileExclamationOutlined,
  FilterIcon as FilterOutlined,
  FireExtinguisherIcon as FireOutlined,
  LineChartIcon as LineChartOutlined,
  PieChartIcon as PieChartOutlined,
  RedoDotIcon as ReloadOutlined,
  UnderlineIcon as TeamOutlined,
  CloudLightningIcon as ThunderboltOutlined,
  TrophyIcon as TrophyOutlined,
  UserPlusIcon as UserAddOutlined,
  DeleteIcon as UserDeleteOutlined,
  UserRoundIcon as UserOutlined,
} from "lucide-react";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Dummy data for the dashboard
const generateDummyData = () => {
  // Elections data
  const elections = [
    {
      id: 1,
      name: "Student Guild Presidential Election",
      faculty: "University-wide",
      startDate: "2023-10-15",
      endDate: "2023-10-16",
      status: "Completed",
      candidates: 5,
      eligibleVoters: 12500,
      votesCount: 8750,
      turnoutRate: 70,
    },
    {
      id: 2,
      name: "Faculty of Engineering Representatives",
      faculty: "Engineering",
      startDate: "2023-11-05",
      endDate: "2023-11-06",
      status: "Completed",
      candidates: 12,
      eligibleVoters: 2200,
      votesCount: 1320,
      turnoutRate: 60,
    },
    {
      id: 3,
      name: "School of Law Student Council",
      faculty: "Law",
      startDate: "2023-11-20",
      endDate: "2023-11-21",
      status: "Completed",
      candidates: 8,
      eligibleVoters: 1800,
      votesCount: 1260,
      turnoutRate: 70,
    },
    {
      id: 4,
      name: "Faculty of Medicine Representatives",
      faculty: "Medicine",
      startDate: "2023-12-10",
      endDate: "2023-12-11",
      status: "Completed",
      candidates: 6,
      eligibleVoters: 1500,
      votesCount: 1050,
      turnoutRate: 70,
    },
    {
      id: 5,
      name: "College of Business Representatives",
      faculty: "Business",
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      status: "Completed",
      candidates: 10,
      eligibleVoters: 3200,
      votesCount: 1920,
      turnoutRate: 60,
    },
    {
      id: 6,
      name: "Faculty of Social Sciences Council",
      faculty: "Social Sciences",
      startDate: "2024-02-05",
      endDate: "2024-02-06",
      status: "Completed",
      candidates: 14,
      eligibleVoters: 2800,
      votesCount: 1680,
      turnoutRate: 60,
    },
    {
      id: 7,
      name: "School of Education Representatives",
      faculty: "Education",
      startDate: "2024-02-20",
      endDate: "2024-02-21",
      status: "Completed",
      candidates: 9,
      eligibleVoters: 2100,
      votesCount: 1470,
      turnoutRate: 70,
    },
    {
      id: 8,
      name: "Faculty of Agriculture Representatives",
      faculty: "Agriculture",
      startDate: "2024-03-10",
      endDate: "2024-03-11",
      status: "In Progress",
      candidates: 7,
      eligibleVoters: 1700,
      votesCount: 850,
      turnoutRate: 50,
    },
    {
      id: 9,
      name: "School of Computing & IT Council",
      faculty: "Computing & IT",
      startDate: "2024-03-25",
      endDate: "2024-03-26",
      status: "Scheduled",
      candidates: 11,
      eligibleVoters: 2400,
      votesCount: 0,
      turnoutRate: 0,
    },
    {
      id: 10,
      name: "Faculty of Arts Representatives",
      faculty: "Arts",
      startDate: "2024-04-15",
      endDate: "2024-04-16",
      status: "Scheduled",
      candidates: 8,
      eligibleVoters: 1900,
      votesCount: 0,
      turnoutRate: 0,
    },
    {
      id: 11,
      name: "School of Veterinary Medicine Council",
      faculty: "Veterinary Medicine",
      startDate: "2024-01-10",
      endDate: "2024-01-11",
      status: "Cancelled",
      candidates: 5,
      eligibleVoters: 800,
      votesCount: 0,
      turnoutRate: 0,
    },
  ];

  // Candidates data
  const candidatePositions = [
    "Guild President",
    "Vice President",
    "General Secretary",
    "Finance Secretary",
    "Academic Affairs",
    "Welfare & Sports",
    "Women Affairs",
    "Hall Representative",
    "Faculty Representative",
    "Department Representative",
  ];

  const disqualificationReasons = [
    "Incomplete academic records",
    "Below minimum GPA requirement",
    "Outstanding fees",
    "Disciplinary issues",
    "Missing required documents",
    "Failed verification process",
  ];

  // Generate statistics
  const stats = {
    electionsCreated: elections.length,
    electionsStarted: elections.filter(
      (e) => e.status === "In Progress" || e.status === "Completed"
    ).length,
    electionsCompleted: elections.filter((e) => e.status === "Completed")
      .length,
    electionsCancelled: elections.filter((e) => e.status === "Cancelled")
      .length,

    candidatesSubmitted: 95,
    candidatesApproved: 82,
    candidatesRejected: 13,

    votersUploaded: 32000,
    eligibleVoters: 30200,
    ineligibleVoters: 1800,

    averageTurnout: Math.round(
      elections
        .filter((e) => e.status === "Completed")
        .reduce((sum, e) => sum + e.turnoutRate, 0) /
        elections.filter((e) => e.status === "Completed").length
    ),
    totalVotesCast: elections.reduce((sum, e) => sum + e.votesCount, 0),
  };

  // Top positions data
  const topPositionsData = candidatePositions.slice(0, 5).map((position) => ({
    position,
    applications: Math.floor(Math.random() * 15) + 5,
  }));

  // Disqualification reasons data
  const disqualificationData = disqualificationReasons.map((reason) => ({
    reason,
    count: Math.floor(Math.random() * 100) + 20,
  }));

  // Faculty participation data
  const facultyParticipationData = [
    { faculty: "Engineering", turnout: 78 },
    { faculty: "Medicine", turnout: 82 },
    { faculty: "Law", turnout: 75 },
    { faculty: "Business", turnout: 65 },
    { faculty: "Social Sciences", turnout: 58 },
    { faculty: "Education", turnout: 62 },
    { faculty: "Agriculture", turnout: 55 },
    { faculty: "Computing & IT", turnout: 72 },
    { faculty: "Arts", turnout: 60 },
    { faculty: "Veterinary Medicine", turnout: 68 },
  ];

  // Monthly election trends
  const monthlyTrends = [
    { month: "Sep 2023", elections: 0, voters: 0 },
    { month: "Oct 2023", elections: 1, voters: 8750 },
    { month: "Nov 2023", elections: 2, voters: 2580 },
    { month: "Dec 2023", elections: 1, voters: 1050 },
    { month: "Jan 2024", elections: 2, voters: 1920 },
    { month: "Feb 2024", elections: 2, voters: 3150 },
    { month: "Mar 2024", elections: 2, voters: 850 },
    { month: "Apr 2024", elections: 1, voters: 0 },
  ];

  return {
    elections,
    stats,
    topPositionsData,
    disqualificationData,
    facultyParticipationData,
    monthlyTrends,
  };
};

const ElectionDashboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [datePreset, setDatePreset] = useState("month");
  const [data, setData] = useState(generateDummyData());
  const [filteredData, setFilteredData] = useState(data);

  // Colors for charts
  const COLORS = [
    "#8b5cf6",
    "#6366f1",
    "#3b82f6",
    "#0ea5e9",
    "#06b6d4",
    "#14b8a6",
  ];

  // Set initial date range to "This Month"
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setDateRange([moment(firstDay), moment(lastDay)]);
    applyDateFilter([moment(firstDay), moment(lastDay)]);
    applyDateFilter([firstDay, lastDay]);
  }, []);

  // Handle date preset changes
  const handlePresetChange = (e) => {
    const value = e.target.value;
    setDatePreset(value);

    const now = new Date();
    let start = null;
    let end = null;

    switch (value) {
      case "today":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        );
        break;
      case "week":
        const day = now.getDay();
        start = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - day
        );
        end = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + (6 - day),
          23,
          59,
          59
        );
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case "custom":
        // Keep the current date range
        return;
    }

    setDateRange([moment(start), moment(end)]);
    applyDateFilter([moment(start), moment(end)]);
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      setDatePreset("custom");
    }
  };

  // Apply date filter to data
  const applyDateFilter = (range) => {
    if (!range || !range[0] || !range[1]) return;
    const startDate = moment(range[0]).isValid()
      ? moment(range[0]).toDate().getTime()
      : range[0].getTime();
    const endDate = moment(range[1]).isValid()
      ? moment(range[1]).toDate().getTime()
      : range[1].getTime();

    const filtered = {
      ...data,
      elections: data.elections.filter((election) => {
        const electionStart = new Date(election.startDate).getTime();
        return electionStart >= startDate && electionStart <= endDate;
      }),
    };

    // Recalculate stats based on filtered elections
    filtered.stats = {
      ...data.stats,
      electionsCreated: filtered.elections.length,
      electionsStarted: filtered.elections.filter(
        (e) => e.status === "In Progress" || e.status === "Completed"
      ).length,
      electionsCompleted: filtered.elections.filter(
        (e) => e.status === "Completed"
      ).length,
      electionsCancelled: filtered.elections.filter(
        (e) => e.status === "Cancelled"
      ).length,
      totalVotesCast: filtered.elections.reduce(
        (sum, e) => sum + e.votesCount,
        0
      ),
      averageTurnout: Math.round(
        filtered.elections
          .filter((e) => e.status === "Completed")
          .reduce((sum, e) => sum + e.turnoutRate, 0) /
          (filtered.elections.filter((e) => e.status === "Completed").length ||
            1)
      ),
    };

    setFilteredData(filtered);
  };

  // Apply filter button click
  const handleApplyFilter = () => {
    applyDateFilter(dateRange);
  };

  // Refresh data
  const handleRefresh = () => {
    const newData = generateDummyData();
    setData(newData);
    applyDateFilter(dateRange);
  };

  // Get status tag for elections
  const getStatusTag = (status) => {
    switch (status) {
      case "Completed":
        return <Tag color="success">Completed</Tag>;
      case "In Progress":
        return <Tag color="processing">In Progress</Tag>;
      case "Scheduled":
        return <Tag color="default">Scheduled</Tag>;
      case "Cancelled":
        return <Tag color="error">Cancelled</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Recent elections table columns
  const electionsColumns = [
    {
      title: "Election Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Date",
      dataIndex: "startDate",
      key: "date",
      render: (text, record) => `${record.startDate} to ${record.endDate}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Candidates",
      dataIndex: "candidates",
      key: "candidates",
    },
    {
      title: "Turnout",
      dataIndex: "turnoutRate",
      key: "turnout",
      render: (rate) => (
        <Tooltip title={`${rate}% of eligible voters participated`}>
          <Progress
            percent={rate}
            size="small"
            status={rate < 50 ? "exception" : "normal"}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-8xl mx-auto p-20">
        <div className="mb-8">
          {/* Date Filter Section */}
          <Card className="mb-6 shadow-md rounded-xl border-0 overflow-hidden">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={6}>
                <Title level={5} className="mb-2 flex items-center">
                  <FilterOutlined className="mr-2" /> Date/Period Filter
                </Title>
              </Col>
              <Col xs={24} md={6}>
                <RangePicker
                  size="small"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  // className="w-full"
                />
              </Col>
              <Col xs={24} md={8}>
                <Radio.Group
                  value={datePreset}
                  onChange={handlePresetChange}
                  buttonStyle="solid"
                >
                  <Radio.Button value="today">Today</Radio.Button>
                  <Radio.Button value="week">This Week</Radio.Button>
                  <Radio.Button value="month">This Month</Radio.Button>
                  <Radio.Button value="custom">Custom</Radio.Button>
                </Radio.Group>
              </Col>
              <Col xs={24} md={2}>
                <Button
                  type="primary"
                  onClick={handleApplyFilter}
                  icon={<FilterOutlined size={18} />}
                  className="w-full"
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Elections Summary Section */}
          <Title
            level={4}
            className="mb-4 flex items-center bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-2 rounded-lg shadow-sm"
          >
            <LineChartOutlined className="mr-2" /> Elections Summary
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Elections Created"
                  value={filteredData.stats.electionsCreated}
                  prefix={<FileAddOutlined className="mr-2" />}
                  valueStyle={{ color: "#1677ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Elections Started"
                  value={filteredData.stats.electionsStarted}
                  prefix={<ThunderboltOutlined className="mr-2" />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Elections Completed"
                  value={filteredData.stats.electionsCompleted}
                  prefix={<CheckCircleOutlined className="mr-2" />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Cancelled/Postponed"
                  value={filteredData.stats.electionsCancelled}
                  prefix={<CloseCircleOutlined className="mr-2" />}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Monthly Trends Chart */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24}>
              <Card
                title="Monthly Election Trends"
                className="shadow-md rounded-xl border-0 overflow-hidden"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data.monthlyTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="elections"
                      name="Elections"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="voters"
                      name="Voters"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Candidate Stats Section */}
          <Title
            level={4}
            className="mb-4 flex items-center bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-2 rounded-lg shadow-sm"
          >
            <TeamOutlined className="mr-2" /> Candidate Statistics
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={8}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Candidates Submitted"
                  value={data.stats.candidatesSubmitted}
                  prefix={<UserOutlined className="mr-2" />}
                  valueStyle={{ color: "#1677ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Candidates Approved"
                  value={data.stats.candidatesApproved}
                  prefix={<CheckCircleOutlined className="mr-2" />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Rejected Nominations"
                  value={data.stats.candidatesRejected}
                  prefix={<CloseCircleOutlined className="mr-2" />}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card
                title="Top Applied Positions"
                className="shadow-md rounded-xl border-0 overflow-hidden h-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.topPositionsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="position" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="applications" fill="#8884d8">
                      {data.topPositionsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Faculty Participation Rates"
                className="shadow-md rounded-xl border-0 overflow-hidden h-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.facultyParticipationData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="faculty" />
                    <RechartsTooltip />
                    <Bar dataKey="turnout" fill="#82ca9d">
                      {data.facultyParticipationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.turnout > 70
                              ? "#52c41a"
                              : entry.turnout > 60
                                ? "#faad14"
                                : "#f5222d"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Voter Insights Section */}
          <Title
            level={4}
            className="mb-4 flex items-center bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-2 rounded-lg shadow-sm"
          >
            <UserOutlined className="mr-2" /> Voter Insights
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Voters Uploaded"
                  value={data.stats.votersUploaded}
                  prefix={<UserAddOutlined className="mr-2" />}
                  valueStyle={{ color: "#1677ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Eligible Voters"
                  value={data.stats.eligibleVoters}
                  prefix={<CheckCircleOutlined className="mr-2" />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Ineligible Voters"
                  value={data.stats.ineligibleVoters}
                  prefix={<UserDeleteOutlined className="mr-2" />}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Eligibility Rate"
                  value={Math.round(
                    (data.stats.eligibleVoters / data.stats.votersUploaded) *
                      100
                  )}
                  suffix="%"
                  prefix={<PieChartOutlined className="mr-2" />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card
                title="Disqualification Reasons"
                className="shadow-md rounded-xl border-0 overflow-hidden h-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.disqualificationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="reason"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {data.disqualificationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Voter Eligibility by Faculty"
                className="shadow-md rounded-xl border-0 overflow-hidden h-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.facultyParticipationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="faculty" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Bar
                      dataKey="turnout"
                      name="Eligibility Rate (%)"
                      fill="#1677ff"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Turnout & Participation Section */}
          <Title
            level={4}
            className="mb-4 flex items-center bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-2 rounded-lg shadow-sm"
          >
            <FireOutlined className="mr-2" /> Turnout & Participation
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Average Turnout"
                  value={filteredData.stats.averageTurnout}
                  suffix="%"
                  prefix={<PieChartOutlined className="mr-2" />}
                  valueStyle={{
                    color:
                      filteredData.stats.averageTurnout > 70
                        ? "#52c41a"
                        : filteredData.stats.averageTurnout > 50
                          ? "#faad14"
                          : "#f5222d",
                  }}
                />
                <Progress
                  percent={filteredData.stats.averageTurnout}
                  status={
                    filteredData.stats.averageTurnout > 70
                      ? "success"
                      : filteredData.stats.averageTurnout > 50
                        ? "normal"
                        : "exception"
                  }
                  className="mt-2"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Votes Cast"
                  value={filteredData.stats.totalVotesCast}
                  prefix={<LineChartOutlined className="mr-2" />}
                  valueStyle={{ color: "#1677ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Most Voted Election"
                  value="Guild Presidential"
                  prefix={<TrophyOutlined className="mr-2" />}
                  valueStyle={{ color: "#722ed1" }}
                />
                <Text type="secondary">8,750 votes</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md rounded-xl border-0 overflow-hidden h-full">
                <Statistic
                  title="Least Participation Faculty"
                  value="Agriculture"
                  prefix={<FileExclamationOutlined className="mr-2" />}
                  valueStyle={{ color: "#f5222d" }}
                />
                <Text type="secondary">55% turnout rate</Text>
              </Card>
            </Col>
          </Row>

          {/* Recent Elections Table */}
          <Title
            level={4}
            className="mb-4 flex items-center bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-2 rounded-lg shadow-sm"
          >
            <CalendarOutlined className="mr-2" /> Recent Elections
          </Title>
          <Card className="shadow-md rounded-xl border-0 overflow-hidden mb-6">
            <Table
              dataSource={filteredData.elections}
              columns={electionsColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ElectionDashboard;
