import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Card,
  Table,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Typography,
  Avatar,
  Progress,
  message,
  Tabs,
  List,
  Switch,
  Breadcrumb,
  Popconfirm,
  Rate,
  Tooltip,
  Badge,
} from "antd";
import {
  Book,
  Video,
  Users,
  Clock,
  CheckCircle,
  Plus,
  Pencil,
  Star,
  LineChart,
  Trash2,
  Eye,
  EyeOff,
  Search,
  BadgeIcon as Certificate,
  Printer,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";
import html2canvas from "html2canvas";
import CertificatePreview from "./CertificatePreview";
import { initialCourses } from "./courses";

import {
  engagementData,
  assessmentData,
  feedbackData,
  COLORS,
} from "./chartData";
import { v4 as uuidv4 } from "uuid";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const EnhancedAlumniCourseManagement = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const certificateRef = useRef(null);

  useEffect(() => {
    if (editingCourse) {
      form.setFieldsValue({
        ...editingCourse,
        startDate: dayjs(editingCourse.startDate),
        endDate: dayjs(editingCourse.endDate),
      });
    } else {
      form.resetFields();
    }
  }, [editingCourse, form]);

  const handleCreateOrUpdateCourse = (values) => {
    const newCourse = {
      key: editingCourse ? editingCourse.key : uuidv4(),
      ...values,
      enrolled: editingCourse ? editingCourse.enrolled : 0,
      completionRate: editingCourse ? editingCourse.completionRate : 0,
      rating: editingCourse ? editingCourse.rating : 0,
      color: editingCourse ? editingCourse.color : "#1890ff",
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };

    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.key === editingCourse.key ? newCourse : course
        )
      );
      message.success("Course updated successfully");
    } else {
      setCourses([...courses, newCourse]);
      message.success("Course created successfully");
    }

    setIsModalVisible(false);
    setEditingCourse(null);
    form.resetFields();
  };

  const handleArchiveCourse = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.key === courseId ? { ...course, status: "Archived" } : course
      )
    );
    message.success("Course archived successfully");
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.key !== courseId));
    message.success("Course deleted successfully");
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsModalVisible(true);
  };

  const handleToggleEnrollment = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.key === courseId
          ? { ...course, enrollmentOpen: !course.enrollmentOpen }
          : course
      )
    );
    message.success("Enrollment status updated successfully");
  };

  const handleToggleCertificate = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.key === courseId
          ? { ...course, certificateEnabled: !course.certificateEnabled }
          : course
      )
    );
    message.success("Certificate status updated successfully");
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case "online":
        return <Video size={16} />;
      case "hybrid":
        return <Users size={16} />;
      default:
        return <Book size={16} />;
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintCertificate = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: "Certificate",
  });

  const handleDownloadCertificate = async () => {
    const certificateElement = certificateRef.current;
    if (certificateElement) {
      const canvas = await html2canvas(certificateElement);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${selectedCourse?.name}_certificate.png`;
      link.href = imgData;
      link.click();
    }
  };

  const columns = [
    {
      title: "Course",
      key: "course",
      render: (record) => (
        <Space>
          <Avatar
            icon={<Book size={15} />}
            style={{ backgroundColor: record.color }}
            size={30}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary">{record.instructor}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Category & Format",
      key: "category",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Tag color="blue">{record.category}</Tag>
          <Space>
            {getFormatIcon(record.format)}
            <Text type="secondary">
              {record.format.charAt(0).toUpperCase() + record.format.slice(1)}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Enrollment & Progress",
      key: "progress",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Space>
            <Users size={16} />
            <Text>{record.enrolled} enrolled</Text>
          </Space>
          <Progress
            percent={record.completionRate}
            size="small"
            status={record.completionRate >= 80 ? "success" : "active"}
          />
        </Space>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record) => (
        <Space direction="vertical" size={2}>
          <Text>Start: {record.startDate}</Text>
          <Text type="secondary">End: {record.endDate}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag
          color={
            record.status === "Active"
              ? "green"
              : record.status === "Upcoming"
                ? "blue"
                : "red"
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Tooltip title="View Analytics">
            <Button
              icon={<LineChart size={13} />}
              onClick={() => setSelectedCourse(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Course">
            <Button
              icon={<Pencil size={13} />}
              onClick={() => handleEditCourse(record)}
            />
          </Tooltip>
          <Tooltip
            title={
              record.enrollmentOpen ? "Close Enrollment" : "Open Enrollment"
            }
          >
            <Button
              icon={
                record.enrollmentOpen ? <EyeOff size={13} /> : <Eye size={13} />
              }
              onClick={() => handleToggleEnrollment(record.key)}
            />
          </Tooltip>
          <Tooltip
            title={
              record.certificateEnabled
                ? "Disable Certificates"
                : "Enable Certificates"
            }
          >
            <Button
              icon={<Certificate size={13} />}
              onClick={() => handleToggleCertificate(record.key)}
              style={{
                color: record.certificateEnabled ? "#52c41a" : undefined,
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Course">
            <Popconfirm
              title="Are you sure you want to delete this course?"
              onConfirm={() => handleDeleteCourse(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<Trash2 size={13} />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const renderDashboard = () => (
    <div style={{ padding: "0px" }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <Space size="middle">
                <Title level={4} style={{ margin: 0 }}>
                  Alumni Course Management
                </Title>
                <Badge
                  count={courses.length}
                  style={{ backgroundColor: "#52c41a" }}
                />
              </Space>
            }
            extra={
              <Space>
                <Input
                  placeholder="Search courses"
                  prefix={<Search size={16} />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  type="primary"
                  icon={<Plus size={16} />}
                  onClick={() => {
                    setEditingCourse(null);
                    setIsModalVisible(true);
                  }}
                >
                  Create Course
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredCourses}
              rowKey="key"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} courses`,
              }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingCourse ? "Edit Course" : "Create New Course"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCourse(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrUpdateCourse}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="name"
                label="Course Name"
                rules={[
                  { required: true, message: "Please enter course name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select>
                  <Option value="Technology">Technology</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Leadership">Leadership</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[
                  { required: true, message: "Please enter instructor name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="format"
                label="Course Format"
                rules={[{ required: true, message: "Please select format" }]}
              >
                <Select>
                  <Option value="online">Online</Option>
                  <Option value="hybrid">Hybrid</Option>
                  <Option value="inPerson">In Person</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Course Description"
            rules={[
              { required: true, message: "Please enter course description" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="isPublic"
                valuePropName="checked"
                label="Public Course"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="certificateEnabled"
                valuePropName="checked"
                label="Enable Certificates"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="enrollmentOpen"
                valuePropName="checked"
                label="Open Enrollment"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingCourse(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

  const renderAnalytics = () => {
    if (!selectedCourse) return null;

    return (
      <div style={{ padding: "24px" }}>
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>
            <a onClick={() => setSelectedCourse(null)}>All Courses</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{selectedCourse.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Enrolled Students"
                  value={selectedCourse.enrolled}
                  prefix={<Users size={16} />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Completion Rate"
                  value={selectedCourse.completionRate}
                  suffix="%"
                  prefix={<CheckCircle size={16} />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Average Score"
                  value={85}
                  suffix="%"
                  prefix={<Star size={16} />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Active Time"
                  value={1250}
                  suffix="hrs"
                  prefix={<Clock size={16} />}
                />
              </Card>
            </Col>
          </Row>

          <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
            <TabPane tab="Engagement" key="1">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Attendance"
                  />
                  <Area
                    type="monotone"
                    dataKey="participation"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Participation"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabPane>

            <TabPane tab="Assessments" key="2">
              <ResponsiveContainer width="100%" height={300}>
                <RechartBarChart data={assessmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="avgScore" fill="#8884d8" name="Average Score" />
                </RechartBarChart>
              </ResponsiveContainer>
            </TabPane>

            <TabPane tab="Feedback" key="3">
              <Row gutter={24}>
                <Col span={12}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={feedbackData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {feedbackData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>
                <Col span={12}>
                  <List
                    header={<Title level={5}>Recent Comments</Title>}
                    itemLayout="horizontal"
                    dataSource={[
                      {
                        user: "John Doe",
                        comment: "Excellent course content and delivery!",
                        rating: 5,
                        avatar:
                          "https://xsgames.co/randomusers/avatar.php?g=male",
                      },
                      {
                        user: "Sarah Smith",
                        comment: "Very practical and well-structured.",
                        rating: 4,
                        avatar:
                          "https://xsgames.co/randomusers/avatar.php?g=female",
                      },
                      {
                        user: "Mike Johnson",
                        comment: "The hands-on projects were very helpful.",
                        rating: 5,
                        avatar:
                          "https://xsgames.co/randomusers/avatar.php?g=male",
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={item.avatar}>{item.user[0]}</Avatar>
                          }
                          title={
                            <Space>
                              <Text strong>{item.user}</Text>
                              <Rate disabled defaultValue={item.rating} />
                            </Space>
                          }
                          description={item.comment}
                        />
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Certificate" key="4">
              <Row gutter={24}>
                <Col span={16}>
                  <div ref={certificateRef}>
                    <CertificatePreview course={selectedCourse} />
                  </div>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      icon={<Printer size={16} />}
                      onClick={() => handlePrintCertificate()}
                      style={{ width: "100%" }}
                    >
                      Print Certificate
                    </Button>
                    <Button
                      icon={<Download size={16} />}
                      onClick={handleDownloadCertificate}
                      style={{ width: "100%" }}
                    >
                      Download Digital Certificate
                    </Button>
                  </Space>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 0px" }}>
        <Layout style={{ padding: "0px 0", background: "#fff" }}>
          <Content style={{ padding: "0 0px", minHeight: 280 }}>
            {selectedCourse ? renderAnalytics() : renderDashboard()}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default EnhancedAlumniCourseManagement;
