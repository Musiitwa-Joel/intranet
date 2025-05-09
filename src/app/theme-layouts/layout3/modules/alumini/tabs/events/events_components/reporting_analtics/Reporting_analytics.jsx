import React from "react";
import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Button,
  Table,
  Space,
  Typography,
  Tabs,
  List,
  Tag,
  Tooltip,
  Modal,
  Form,
  InputNumber,
  Empty,
} from "antd";
import {
  UserOutlined,
  DollarOutlined,
  BarChartOutlined,
  CalendarOutlined,
  TeamOutlined,
  DownloadOutlined,
  FundViewOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Line, Column, Pie } from "@ant-design/plots";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const EventAnalyticsReports = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [isKPIModalVisible, setIsKPIModalVisible] = useState(false);

  // Sample data for demonstration
  const events = [
    { id: "EVT001", name: "Alumni Homecoming 2024" },
    { id: "EVT002", name: "Career Fair 2024" },
    { id: "EVT003", name: "Networking Mixer 2024" },
  ];

  const attendanceData = [
    { date: "2024-01", attendees: 150, signups: 20, cancellations: 5 },
    { date: "2024-02", attendees: 180, signups: 25, cancellations: 8 },
    { date: "2024-03", attendees: 210, signups: 30, cancellations: 10 },
    { date: "2024-04", attendees: 250, signups: 35, cancellations: 12 },
    { date: "2024-05", attendees: 300, signups: 40, cancellations: 15 },
  ];

  const financialData = [
    { date: "2024-01", ticketSales: 7500, sponsorships: 5000 },
    { date: "2024-02", ticketSales: 9000, sponsorships: 6000 },
    { date: "2024-03", ticketSales: 10500, sponsorships: 7000 },
    { date: "2024-04", ticketSales: 12500, sponsorships: 8000 },
    { date: "2024-05", ticketSales: 15000, sponsorships: 10000 },
  ];

  const engagementData = [
    { group: "Recent Graduates", engagement: 75 },
    { group: "Mid-Career Alumni", engagement: 60 },
    { group: "Senior Alumni", engagement: 45 },
    { group: "International Alumni", engagement: 30 },
  ];

  const topEvents = [
    { name: "Alumni Homecoming 2024", attendance: 300, rating: 4.8 },
    { name: "Career Fair 2024", attendance: 250, rating: 4.6 },
    { name: "Networking Mixer 2024", attendance: 200, rating: 4.5 },
    { name: "Tech Symposium 2024", attendance: 180, rating: 4.7 },
    { name: "Fundraising Gala 2024", attendance: 150, rating: 4.9 },
  ];

  const topAlumni = [
    {
      name: "John Doe",
      eventsAttended: 15,
      lastEvent: "Alumni Homecoming 2024",
    },
    { name: "Jane Smith", eventsAttended: 12, lastEvent: "Career Fair 2024" },
    {
      name: "Mike Johnson",
      eventsAttended: 10,
      lastEvent: "Networking Mixer 2024",
    },
    {
      name: "Emily Brown",
      eventsAttended: 8,
      lastEvent: "Tech Symposium 2024",
    },
    {
      name: "David Lee",
      eventsAttended: 7,
      lastEvent: "Fundraising Gala 2024",
    },
  ];

  const registrationDropOffData = [
    { stage: "Visit Event Page", rate: 100 },
    { stage: "Start Registration", rate: 75 },
    { stage: "Fill Personal Info", rate: 60 },
    { stage: "Select Ticket Type", rate: 50 },
    { stage: "Payment", rate: 40 },
    { stage: "Confirmation", rate: 35 },
  ];

  const attendanceConfig = {
    data: attendanceData,
    xField: "date",
    yField: ["attendees", "signups", "cancellations"],
    seriesField: "type",
    legend: { position: "top" },
    smooth: true,
  };

  const financialConfig = {
    data: financialData,
    xField: "date",
    yField: ["ticketSales", "sponsorships"],
    seriesField: "type",
    legend: { position: "top" },
    smooth: true,
  };

  const engagementConfig = {
    data: engagementData,
    angleField: "engagement",
    colorField: "group",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  const dropOffConfig = {
    data: registrationDropOffData,
    xField: "stage",
    yField: "rate",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Implement export logic here
  };

  const handleKPISubmit = (values) => {
    console.log("KPI values:", values);
    setIsKPIModalVisible(false);
    // Implement KPI setting logic here
  };

  return (
    <div style={{ padding: "5px" }}>
      <Card>
        <Row gutter={16} align="middle" style={{ marginBottom: "24px" }}>
          <Col span={8}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select an event"
              onChange={(value) => setSelectedEvent(value)}
              value={selectedEvent}
            >
              {events.map((event) => (
                <Select.Option key={event.id} value={event.id}>
                  {event.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {selectedEvent && (
            <>
              <Col span={8}>
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={(dates) => setDateRange(dates)}
                />
              </Col>
              <Col span={8}>
                <Space>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport("excel")}
                  >
                    Export Excel
                  </Button>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport("pdf")}
                  >
                    Export PDF
                  </Button>
                  <Tooltip title="Set Key Performance Indicators">
                    <Button
                      icon={<SettingOutlined />}
                      onClick={() => setIsKPIModalVisible(true)}
                    >
                      Set KPIs
                    </Button>
                  </Tooltip>
                </Space>
              </Col>
            </>
          )}
        </Row>

        {selectedEvent ? (
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <DashboardOutlined />
                  &nbsp;Overview
                </span>
              }
              key="1"
            >
              <Row gutter={[4, 4]}>
                <Col span={6}>
                  <Card style={{ borderColor: "#3f8600" }}>
                    <Statistic
                      title="Total Attendees"
                      value={1090}
                      prefix={<UserOutlined />}
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{ borderColor: "#cf1322" }}>
                    <Statistic
                      title="Total Revenue"
                      value={54000}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{ borderColor: "#1890ff" }}>
                    <Statistic
                      title="Engagement Rate"
                      value={68.5}
                      suffix="%"
                      prefix={<BarChartOutlined />}
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{ borderColor: "#722ed1" }}>
                    <Statistic
                      title="Events Held"
                      value={5}
                      prefix={<CalendarOutlined />}
                      valueStyle={{ color: "#722ed1" }}
                    />
                  </Card>
                </Col>
              </Row>

              <Row gutter={[4, 4]} style={{ marginTop: "24px" }}>
                <Col span={12}>
                  <Card title="Attendance Trends">
                    <Line {...attendanceConfig} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Financial Performance">
                    <Line {...financialConfig} />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  &nbsp;Attendance
                </span>
              }
              key="2"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Card title="Detailed Attendance Report">
                    <Table
                      size="small"
                      dataSource={attendanceData}
                      columns={[
                        { title: "Date", dataIndex: "date", key: "date" },
                        {
                          title: "Attendees",
                          dataIndex: "attendees",
                          key: "attendees",
                        },
                        {
                          title: "Last-Minute Sign-ups",
                          dataIndex: "signups",
                          key: "signups",
                        },
                        {
                          title: "Cancellations",
                          dataIndex: "cancellations",
                          key: "cancellations",
                        },
                      ]}
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <DollarOutlined />
                  &nbsp;Financials
                </span>
              }
              key="3"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Card title="Financial Report">
                    <Table
                      size="small"
                      dataSource={financialData}
                      columns={[
                        { title: "Date", dataIndex: "date", key: "date" },
                        {
                          title: "Ticket Sales",
                          dataIndex: "ticketSales",
                          key: "ticketSales",
                          render: (value) => `UGX ${value}`,
                        },
                        {
                          title: "Sponsorships",
                          dataIndex: "sponsorships",
                          key: "sponsorships",
                          render: (value) => `UGX ${value}`,
                        },
                        {
                          title: "Total Revenue",
                          key: "totalRevenue",
                          render: (_, record) =>
                            `UGX ${record.ticketSales + record.sponsorships}`,
                        },
                      ]}
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BarChartOutlined />
                  &nbsp;Engagement
                </span>
              }
              key="4"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Engagement by Alumni Group">
                    <Pie {...engagementConfig} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Top Performing Events">
                    <List
                      dataSource={topEvents}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.name}
                            description={`Attendance: ${item.attendance}`}
                          />
                          <Tag color="blue">{item.rating} / 5</Tag>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  &nbsp;Alumni Involvement
                </span>
              }
              key="5"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Card title="Top Engaged Alumni">
                    <Table
                      size="small"
                      dataSource={topAlumni}
                      columns={[
                        { title: "Name", dataIndex: "name", key: "name" },
                        {
                          title: "Events Attended",
                          dataIndex: "eventsAttended",
                          key: "eventsAttended",
                        },
                        {
                          title: "Last Event",
                          dataIndex: "lastEvent",
                          key: "lastEvent",
                        },
                      ]}
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <FundViewOutlined />
                  &nbsp;Registration Funnel
                </span>
              }
              key="6"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Card title="Registration Drop-Off Analysis">
                    <Column {...dropOffConfig} />
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>Please select an event to view analytics and reports</span>
            }
          />
        )}
      </Card>

      <Modal
        title="Set Key Performance Indicators (KPIs)"
        visible={isKPIModalVisible}
        onCancel={() => setIsKPIModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleKPISubmit} layout="vertical">
          <Form.Item
            name="attendanceTarget"
            label="Attendance Target"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="revenueTarget"
            label="Revenue Target (UGX)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="engagementTarget"
            label="Engagement Rate Target (%)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="sponsorshipTarget"
            label="Sponsorship Target (UGX)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set KPIs
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventAnalyticsReports;
