import { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Typography,
  Avatar,
  Dropdown,
  Space,
  Button,
  Tabs,
  Select,
  DatePicker,
  Input,
  Tag,
  Progress,
  Segmented,
  Divider,
  ConfigProvider,
  theme,
  List,
} from "antd";
import {
  Users,
  UserCheck,
  CalendarDays,
  DollarSign,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  ArrowUpRight,
  Clock,
  MapPin,
  FileText,
  Mail,
  Sliders,
  Grid3X3,
  ListIcon,
  Eye,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  Layers,
  Zap,
  LucideBanknote,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  TimeScale,
} from "chart.js";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import "chart.js/auto";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);

const { Title: AntTitle, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Search: SearchInput } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  TimeScale
);

// Rich dataset
const dummyEvents = [
  {
    id: 1,
    title: "Annual Alumni Gala",
    date: "2023-06-15",
    location: "Grand Ballroom",
    attendees: 245,
    status: "upcoming",
    type: "fundraising",
    organizer: "Alumni Association",
    description: "Annual fundraising event with dinner and silent auction",
  },
  {
    id: 2,
    title: "Tech Industry Career Fair",
    date: "2023-06-20",
    location: "Virtual",
    attendees: 320,
    status: "upcoming",
    type: "networking",
    organizer: "Career Services",
    description: "Connect with tech industry employers",
  },
  {
    id: 3,
    title: "Leadership Workshop Series",
    date: "2023-06-25",
    location: "Business Center",
    attendees: 85,
    status: "upcoming",
    type: "educational",
    organizer: "Business School",
    description: "Workshop on executive leadership skills",
  },
  {
    id: 4,
    title: "Capital Campaign Kickoff",
    date: "2023-07-01",
    location: "Main Campus",
    attendees: 180,
    status: "upcoming",
    type: "fundraising",
    organizer: "Development Office",
    description: "Launch of the 5-year capital campaign",
  },
  {
    id: 5,
    title: "Homecoming Weekend",
    date: "2023-07-10",
    location: "Campus-wide",
    attendees: 650,
    status: "upcoming",
    type: "social",
    organizer: "Alumni Relations",
    description: "Annual homecoming celebration with multiple events",
  },
  {
    id: 6,
    title: "Research Symposium",
    date: "2023-06-05",
    location: "Science Center",
    attendees: 120,
    status: "completed",
    type: "educational",
    organizer: "Graduate Studies",
    description: "Showcase of alumni research projects",
  },
];

const dummyDonations = [
  {
    id: 1,
    amount: 25000,
    date: "2023-06-01",
    donor: "John Smith",
    campaign: "Scholarship Fund",
    paymentMethod: "Credit Card",
    recurring: false,
    status: "completed",
  },
  {
    id: 2,
    amount: 5000,
    date: "2023-06-05",
    donor: "Sarah Johnson",
    campaign: "Library Expansion",
    paymentMethod: "Bank Transfer",
    recurring: true,
    status: "completed",
  },
  {
    id: 3,
    amount: 10000,
    date: "2023-06-10",
    donor: "Michael Brown",
    campaign: "Research Grant",
    paymentMethod: "Check",
    recurring: false,
    status: "completed",
  },
  {
    id: 4,
    amount: 7500,
    date: "2023-06-15",
    donor: "Emily Davis",
    campaign: "Sports Complex",
    paymentMethod: "Credit Card",
    recurring: false,
    status: "completed",
  },
  {
    id: 5,
    amount: 15000,
    date: "2023-06-20",
    donor: "Robert Wilson",
    campaign: "Scholarship Fund",
    paymentMethod: "Stock Transfer",
    recurring: false,
    status: "completed",
  },
  {
    id: 6,
    amount: 2000,
    date: "2023-06-22",
    donor: "Jennifer Lee",
    campaign: "Arts Program",
    paymentMethod: "Credit Card",
    recurring: true,
    status: "completed",
  },
  {
    id: 7,
    amount: 50000,
    date: "2023-06-25",
    donor: "William Taylor",
    campaign: "Endowment",
    paymentMethod: "Wire Transfer",
    recurring: false,
    status: "pending",
  },
];

const recentAlumni = [
  {
    id: 1,
    name: "Jessica Parker",
    year: 2022,
    department: "Computer Science",
    engagement: 85,
    email: "j.parker@example.com",
    location: "San Francisco, CA",
    jobTitle: "Software Engineer",
    company: "Tech Innovations",
    lastActive: "2023-06-01",
    donations: 1500,
    eventsAttended: 3,
  },
  {
    id: 2,
    name: "David Thompson",
    year: 2021,
    department: "Business",
    engagement: 72,
    email: "d.thompson@example.com",
    location: "New York, NY",
    jobTitle: "Financial Analyst",
    company: "Global Finance",
    lastActive: "2023-05-28",
    donations: 500,
    eventsAttended: 2,
  },
  {
    id: 3,
    name: "Amanda Lewis",
    year: 2022,
    department: "Engineering",
    engagement: 91,
    email: "a.lewis@example.com",
    location: "Austin, TX",
    jobTitle: "Mechanical Engineer",
    company: "Innovative Solutions",
    lastActive: "2023-06-02",
    donations: 2000,
    eventsAttended: 4,
  },
  {
    id: 4,
    name: "Ryan Martinez",
    year: 2020,
    department: "Medicine",
    engagement: 64,
    email: "r.martinez@example.com",
    location: "Boston, MA",
    jobTitle: "Medical Resident",
    company: "City Hospital",
    lastActive: "2023-05-15",
    donations: 0,
    eventsAttended: 1,
  },
  {
    id: 5,
    name: "Sophia Chen",
    year: 2019,
    department: "Law",
    engagement: 78,
    email: "s.chen@example.com",
    location: "Chicago, IL",
    jobTitle: "Associate Attorney",
    company: "Legal Partners",
    lastActive: "2023-05-30",
    donations: 1000,
    eventsAttended: 2,
  },
];

const departmentData = [
  { name: "Business", alumni: 2450, engagement: 76, donations: 1250000 },
  { name: "Engineering", alumni: 1850, engagement: 82, donations: 980000 },
  {
    name: "Computer Science",
    alumni: 1620,
    engagement: 88,
    donations: 1100000,
  },
  { name: "Medicine", alumni: 1200, engagement: 71, donations: 2300000 },
  { name: "Law", alumni: 950, engagement: 68, donations: 1800000 },
  { name: "Arts", alumni: 780, engagement: 65, donations: 420000 },
  { name: "Sciences", alumni: 1100, engagement: 74, donations: 750000 },
];

// Monthly data for the past year
const monthlyData = {
  labels: [
    "Jul '22",
    "Aug '22",
    "Sep '22",
    "Oct '22",
    "Nov '22",
    "Dec '22",
    "Jan '23",
    "Feb '23",
    "Mar '23",
    "Apr '23",
    "May '23",
    "Jun '23",
  ],
  activeUsers: [420, 435, 450, 480, 510, 490, 520, 540, 560, 580, 590, 610],
  newRegistrations: [35, 42, 38, 45, 52, 48, 55, 49, 58, 62, 57, 65],
  donations: [
    85000, 72000, 93000, 110000, 125000, 180000, 95000, 88000, 105000, 115000,
    130000, 150000,
  ],
  events: [4, 3, 5, 6, 8, 10, 5, 4, 6, 7, 8, 9],
  engagementRate: [62, 64, 65, 68, 70, 72, 71, 73, 75, 76, 78, 80],
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlumni: 10000,
    activeUsers: 5800,
    upcomingEvents: 0,
    totalDonations: 0,
    growthRate: 12.5,
    engagementRate: 68,
    donationGrowth: 15.3,
    eventAttendance: 82.4,
  });

  const [events, setEvents] = useState(dummyEvents);
  const [donations, setDonations] = useState(dummyDonations);
  const [alumni, setAlumni] = useState(recentAlumni);
  const [departments, setDepartments] = useState(departmentData);

  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, "day"),
    dayjs(),
  ]);
  const [loading, setLoading] = useState(false);

  const [viewMode, setViewMode] = useState("card");
  const [darkMode, setDarkMode] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {
    // Calculate stats based on dummy data
    setStats({
      totalAlumni: 10000,
      activeUsers: 5800,
      upcomingEvents: dummyEvents.filter((e) => e.status === "upcoming").length,
      totalDonations: dummyDonations.reduce(
        (sum, donation) => sum + donation.amount,
        0
      ),
      growthRate: 12.5,
      engagementRate: 68,
      donationGrowth: 15.3,
      eventAttendance: 82.4,
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Simulate data refresh
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Enhanced chart data
  const engagementChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Active Users",
        data: monthlyData.activeUsers,
        backgroundColor: "rgba(24, 144, 255, 0.6)",
        borderColor: "rgba(24, 144, 255, 1)",
        borderWidth: 2,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "New Registrations",
        data: monthlyData.newRegistrations,
        backgroundColor: "rgba(82, 196, 26, 0.6)",
        borderColor: "rgba(82, 196, 26, 1)",
        borderWidth: 2,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const donationChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Donations (Ugx)",
        data: monthlyData.donations,
        backgroundColor: "rgba(250, 173, 20, 0.2)",
        borderColor: "rgba(250, 173, 20, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(250, 173, 20, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const engagementRateData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: monthlyData.engagementRate,
        backgroundColor: "rgba(114, 46, 209, 0.2)",
        borderColor: "rgba(114, 46, 209, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const donationDistributionData = {
    labels: [
      "Scholarship Fund",
      "Research Grants",
      "Campus Development",
      "Student Activities",
      "Endowment",
      "Athletics",
      "Other",
    ],
    datasets: [
      {
        data: [35, 25, 20, 10, 5, 3, 2],
        backgroundColor: [
          "rgba(24, 144, 255, 0.8)",
          "rgba(82, 196, 26, 0.8)",
          "rgba(250, 173, 20, 0.8)",
          "rgba(245, 34, 45, 0.8)",
          "rgba(114, 46, 209, 0.8)",
          "rgba(19, 194, 194, 0.8)",
          "rgba(144, 144, 144, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const departmentEngagementData = {
    labels: departments.map((d) => d.name),
    datasets: [
      {
        label: "Engagement Score",
        data: departments.map((d) => d.engagement),
        backgroundColor: "rgba(24, 144, 255, 0.2)",
        borderColor: "rgba(24, 144, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(24, 144, 255, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: darkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          callback: (value) => {
            if (value >= 1000) {
              return `UGX${value / 1000}k`;
            }
            return `UGX${value}`;
          },
        },
      },
    },
  };

  const percentageChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: darkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
    },
    cutout: "70%",
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
          color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
        pointLabels: {
          color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          font: {
            size: 11,
          },
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        angleLines: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const getStatusColor = (value) => {
    if (value >= 80) return "#52c41a";
    if (value >= 60) return "#1890ff";
    if (value >= 40) return "#faad14";
    return "#ff4d4f";
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "upcoming":
        return <Tag color="blue">Upcoming</Tag>;
      case "ongoing":
        return <Tag color="green">Ongoing</Tag>;
      case "completed":
        return <Tag color="gray">Completed</Tag>;
      case "cancelled":
        return <Tag color="red">Cancelled</Tag>;
      case "pending":
        return <Tag color="orange">Pending</Tag>;
      case "failed":
        return <Tag color="red">Failed</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getEventTypeTag = (type) => {
    switch (type) {
      case "networking":
        return <Tag color="blue">Networking</Tag>;
      case "fundraising":
        return <Tag color="gold">Fundraising</Tag>;
      case "educational":
        return <Tag color="green">Educational</Tag>;
      case "social":
        return <Tag color="purple">Social</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatLargeNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const eventColumns = [
    {
      title: "Event",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar style={{ backgroundColor: "#1890ff", marginRight: 8 }}>
            <CalendarDays size={14} />
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.organizer}
            </Text>
          </div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("MMM D, YYYY"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <MapPin size={14} style={{ marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: "Attendees",
      dataIndex: "attendees",
      key: "attendees",
      sorter: (a, b) => a.attendees - b.attendees,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => getEventTypeTag(text),
      filters: [
        { text: "Networking", value: "networking" },
        { text: "Fundraising", value: "fundraising" },
        { text: "Educational", value: "educational" },
        { text: "Social", value: "social" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => getStatusTag(text),
      filters: [
        { text: "Upcoming", value: "upcoming" },
        { text: "Ongoing", value: "ongoing" },
        { text: "Completed", value: "completed" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<Eye size={14} />} />
          <Button type="text" icon={<FileText size={14} />} />
          <Button type="text" icon={<Mail size={14} />} />
        </Space>
      ),
    },
  ];

  const donationColumns = [
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
      render: (text) => <div style={{ fontWeight: 500 }}>{text}</div>,
      sorter: (a, b) => a.donor.localeCompare(b.donor),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <div style={{ fontWeight: 600, color: "#52c41a" }}>
          {formatCurrency(text)}
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("MMM D, YYYY"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
      filters: [
        { text: "Scholarship Fund", value: "Scholarship Fund" },
        { text: "Library Expansion", value: "Library Expansion" },
        { text: "Research Grant", value: "Research Grant" },
        { text: "Sports Complex", value: "Sports Complex" },
        { text: "Endowment", value: "Endowment" },
        { text: "Arts Program", value: "Arts Program" },
      ],
      onFilter: (value, record) => record.campaign === value,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      filters: [
        { text: "Credit Card", value: "Credit Card" },
        { text: "Bank Transfer", value: "Bank Transfer" },
        { text: "Check", value: "Check" },
        { text: "Stock Transfer", value: "Stock Transfer" },
        { text: "Wire Transfer", value: "Wire Transfer" },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: "Recurring",
      dataIndex: "recurring",
      key: "recurring",
      render: (recurring) =>
        recurring ? (
          <CheckCircle2 size={16} color="#52c41a" />
        ) : (
          <AlertCircle size={16} color="#d9d9d9" />
        ),
      filters: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      onFilter: (value, record) => record.recurring === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => getStatusTag(text),
      filters: [
        { text: "Completed", value: "completed" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const alumniColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: getStatusColor(record.engagement),
              marginRight: 8,
            }}
          >
            {text.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.jobTitle} at {record.company}
            </Text>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Class",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Computer Science", value: "Computer Science" },
        { text: "Business", value: "Business" },
        { text: "Engineering", value: "Engineering" },
        { text: "Medicine", value: "Medicine" },
        { text: "Law", value: "Law" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Engagement",
      dataIndex: "engagement",
      key: "engagement",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", width: 150 }}>
          <Progress
            percent={value}
            size="small"
            strokeColor={getStatusColor(value)}
            style={{ flex: 1, marginRight: 8 }}
          />
          <span style={{ minWidth: 40, fontSize: 12 }}>{value}%</span>
        </div>
      ),
      sorter: (a, b) => a.engagement - b.engagement,
    },
    {
      title: "Donations",
      dataIndex: "donations",
      key: "donations",
      render: (value) => formatCurrency(value),
      sorter: (a, b) => a.donations - b.donations,
    },
    {
      title: "Events",
      dataIndex: "eventsAttended",
      key: "eventsAttended",
      sorter: (a, b) => a.eventsAttended - b.eventsAttended,
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (text) => dayjs(text).format("MMM D, YYYY"),
      sorter: (a, b) => dayjs(a.lastActive).unix() - dayjs(b.lastActive).unix(),
    },
  ];

  const moreMenu = (
    <Dropdown
      menu={{
        items: [
          { key: "1", label: "Export to Excel" },
          { key: "2", label: "Export to PDF" },
          { key: "3", label: "Print Report" },
          { key: "4", label: "Share Dashboard" },
          { key: "5", label: "Customize View" },
          { key: "6", label: "Settings" },
        ],
      }}
      trigger={["click"]}
    >
      <Button type="text" icon={<MoreHorizontal size={16} />} />
    </Dropdown>
  );

  const themeConfig = {
    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1890ff",
      borderRadius: 6,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        className="dashboard-container"
        style={{
          padding: "16px 24px",
          backgroundColor: darkMode ? "#141414" : "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Row gutter={[0, 16]} align="middle" style={{ marginBottom: 16 }}>
          <Col xs={24} md={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Layers size={24} style={{ marginRight: 12, color: "#1890ff" }} />
              <div>
                <AntTitle level={3} style={{ margin: 0 }}>
                  Alumni Analytics Dashboard
                </AntTitle>
                <Text type="secondary">
                  Data from {dayjs(dateRange[0]).format("MMM D, YYYY")} to{" "}
                  {dayjs(dateRange[1]).format("MMM D, YYYY")}
                </Text>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "right" }}>
            <Space wrap>
              <RangePicker
                value={dateRange}
                onChange={(dates) => dates && setDateRange(dates)}
                allowClear={false}
              />
              <Button
                icon={<RefreshCw size={16} />}
                onClick={refreshData}
                loading={loading}
              >
                Refresh
              </Button>
              <Button icon={<Download size={16} />}>Export</Button>
              <Button icon={<Sliders size={16} />}>Filters</Button>
              <Segmented
                options={[
                  {
                    value: "card",
                    icon: <Grid3X3 size={16} />,
                  },
                  {
                    value: "table",
                    icon: <ListIcon size={16} />,
                  },
                ]}
                value={viewMode}
                onChange={(value) =>
                  setViewMode(value === "card" ? "card" : "table")
                }
              />
              <Button
                type={darkMode ? "primary" : "default"}
                icon={darkMode ? <Zap size={16} /> : <Zap size={16} />}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light" : "Dark"}
              </Button>
              {moreMenu}
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <Statistic
                title={
                  <span
                    style={{
                      fontSize: "14px",
                      color: darkMode
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    Total Alumni
                  </span>
                }
                value={stats.totalAlumni}
                prefix={<Users size={20} color="#1890ff" />}
                // suffix={
                //   <Text type="secondary" style={{ fontSize: "12px" }}>
                //     <ArrowUpRight size={12} style={{ color: "#52c41a" }} /> 5.2%
                //   </Text>
                // }
                valueStyle={{ color: "#1890ff", fontWeight: "600" }}
                formatter={(value) => formatLargeNumber(value)}
              />
              <div style={{ marginTop: 8 }}>
                <Progress
                  percent={stats.growthRate}
                  size="small"
                  showInfo={false}
                  strokeColor="#1890ff"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Growth Rate
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>
                    {stats.growthRate}%
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <Statistic
                title={
                  <span
                    style={{
                      fontSize: "14px",
                      color: darkMode
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    Active Users
                  </span>
                }
                value={stats.activeUsers}
                prefix={<UserCheck size={20} color="#52c41a" />}
                // suffix={
                //   <Text type="secondary" style={{ fontSize: "12px" }}>
                //     <ArrowUpRight size={12} style={{ color: "#52c41a" }} /> 8.3%
                //   </Text>
                // }
                valueStyle={{ color: "#52c41a", fontWeight: "600" }}
                formatter={(value) => formatLargeNumber(value)}
              />
              <div style={{ marginTop: 8 }}>
                <Progress
                  percent={stats.engagementRate}
                  size="small"
                  showInfo={false}
                  strokeColor="#52c41a"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Engagement Rate
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>
                    {stats.engagementRate}%
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <Statistic
                title={
                  <span
                    style={{
                      fontSize: "14px",
                      color: darkMode
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    Upcoming Events
                  </span>
                }
                value={stats.upcomingEvents}
                prefix={<CalendarDays size={20} color="#722ed1" />}
                valueStyle={{ color: "#722ed1", fontWeight: "600" }}
              />
              <div style={{ marginTop: 8 }}>
                <Progress
                  percent={stats.eventAttendance}
                  size="small"
                  showInfo={false}
                  strokeColor="#722ed1"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Attendance Rate
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>
                    {stats.eventAttendance}%
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <Statistic
                title={
                  <span
                    style={{
                      fontSize: "14px",
                      color: darkMode
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    Total Donations
                  </span>
                }
                value={stats.totalDonations}
                prefix={<LucideBanknote size={20} color="#faad14" />}
                // suffix={
                //   <Text type="secondary" style={{ fontSize: "12px" }}>
                //     <ArrowUpRight size={12} style={{ color: "#52c41a" }} />{" "}
                //     {stats.donationGrowth}%
                //   </Text>
                // }
                valueStyle={{ color: "#faad14", fontWeight: "600" }}
                formatter={(value) => formatCurrency(value)}
              />
              <div style={{ marginTop: 8 }}>
                <Progress
                  percent={stats.donationGrowth}
                  size="small"
                  showInfo={false}
                  strokeColor="#faad14"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Growth Rate
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>
                    {stats.donationGrowth}%
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BarChart3 size={18} style={{ marginRight: 8 }} />
                  <span>Alumni Engagement Analytics</span>
                </div>
              }
              extra={
                <Space>
                  <Select defaultValue="monthly" style={{ width: 120 }}>
                    <Select.Option value="weekly">Weekly</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                    <Select.Option value="quarterly">Quarterly</Select.Option>
                    <Select.Option value="yearly">Yearly</Select.Option>
                  </Select>
                  <Button type="text" icon={<Download size={16} />} />
                  {moreMenu}
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab="User Engagement" key="1">
                  <div style={{ height: "320px", padding: "12px 0" }}>
                    <Bar
                      ref={chartRef}
                      data={engagementChartData}
                      options={chartOptions}
                    />
                  </div>
                </TabPane>
                <TabPane tab="Donations" key="2">
                  <div style={{ height: "320px", padding: "12px 0" }}>
                    <Line data={donationChartData} options={lineChartOptions} />
                  </div>
                </TabPane>
                <TabPane tab="Engagement Rate" key="3">
                  <div style={{ height: "320px", padding: "12px 0" }}>
                    <Line
                      data={engagementRateData}
                      options={percentageChartOptions}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PieChart size={18} style={{ marginRight: 8 }} />
                  <span>Donation Distribution</span>
                </div>
              }
              extra={
                <Space>
                  <Button type="text" icon={<Download size={16} />} />
                  {moreMenu}
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <div
                style={{
                  height: "320px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Doughnut
                  data={donationDistributionData}
                  options={doughnutOptions}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} md={12}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LineChart size={18} style={{ marginRight: 8 }} />
                  <span>Department Analytics</span>
                </div>
              }
              extra={
                <Space>
                  <Select defaultValue="engagement" style={{ width: 150 }}>
                    <Select.Option value="engagement">Engagement</Select.Option>
                    <Select.Option value="donations">Donations</Select.Option>
                    <Select.Option value="alumni">Alumni Count</Select.Option>
                  </Select>
                  <Button type="text" icon={<Download size={16} />} />
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              loading={loading}
            >
              <div style={{ height: "320px", padding: "12px 0" }}>
                <Radar data={departmentEngagementData} options={radarOptions} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default Dashboard;
