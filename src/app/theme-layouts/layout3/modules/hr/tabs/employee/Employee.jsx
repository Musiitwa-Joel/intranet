import React from "react";
import { useState, useCallback } from "react";
import {
  Input,
  Tabs,
  Typography,
  Tag,
  Space,
  List,
  Avatar,
  message,
  Select,
  Button,
  Modal,
  Upload,
  Form,
} from "antd";
import {
  Filter,
  Search,
  Trash2,
  Edit2,
  XCircle,
  Copy,
  Phone,
  Mail,
  BadgeIcon as IdCard,
  Globe,
  Clock,
  Shield,
  Plus,
  Share,
  CloudUpload,
  FileSignature,
} from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AddEmployeeModal from "./add-employee-modal";
import InviteEmployeeModal from "./invite-employee-modal";
import Qualifications from "./qualifications";
import WorkHistory from "./work_history";
import Skills from "./skills";
import Education from "./education";
import Certifications from "./certifications";
import FilterEmployeesModal from "./filter-employees-modal";
import Dependents from "./dependents";
import Contacts from "./contacts";
import { Card } from "@mui/material";
// import { calc } from "antd/es/theme/internal";

const { Text, Title } = Typography;

const EmployeeManagement = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([
    {
      id: "1",
      initials:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
      name: "Musiitwa Joel",
      title: "Chief Executive Officer",
      company: "Nkumba University",
      phone: "0706-953-457",
      email: "managerbollz@gmail.com",
      employeeNumber: "EMP001",
      dob: "1984-03-17",
      gender: "Male",
      nationality: "UGANDAN",
      maritalStatus: "Married",
      joinedDate: "2018-01-01",
      timezone: "Europe/London",
      accessLevel: "Admin",
      identification: {
        nationalId: "294-38-3535",
        socialInsurance: "",
        personalTaxId: "",
        healthInsurance: "",
        additionalIds: "294-38-3535",
        drivingLicense: "",
      },
      contact: {
        address: "2772 Flynn Street, Willoughby",
        city: "Willoughby",
        country: "United States",
        postalCode: "44094",
        homePhone: "440-953-4578",
        workPhone: "440-953-4578",
        privateEmail: "hrm+admin@web-stalk.com",
      },
      jobDetails: {
        jobTitle: "Chief Executive Officer",
        employmentStatus: "Full Time Permanent",
        department: "Computing",
        manager: "Musiitwa Joel",
      },
      personalInfo: {
        dateOfBirth: "1984-03-17",
        gender: "Male",
        nationality: "Canadian",
        maritalStatus: "Married",
        joinedDate: "2005-08-03",
      },
    },
    {
      id: "2",
      initials:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100539",
      name: "Tasha Desire",
      title: "Software Engineer",
      company: "Nkumba University",
      phone: "0772-953-129",
      email: "tasha@example.com",
      employeeNumber: "NUA3346",
      dob: "1984-03-17",
      gender: "Male",
      nationality: "UGANDAN",
      maritalStatus: "Married",
      joinedDate: "2018-01-01",
      timezone: "Europe/London",
      accessLevel: "Employee",
      identification: {
        nationalId: "294-38-3536",
        socialInsurance: "NSSF099772",
        personalTaxId: "CM987436u67837536",
        healthInsurance: "APA234678",
        additionalIds: "294-38-3536",
        drivingLicense: "UILG667YUJ899",
      },
      contact: {
        address: "123 Main Street",
        city: "Cleveland",
        country: "United States",
        postalCode: "44101",
        homePhone: "440-953-1234",
        workPhone: "440-953-1234",
        privateEmail: "tasha@example.com",
      },
      jobDetails: {
        jobTitle: "Software Engineer",
        employmentStatus: "Full Time",
        department: "Engineering",
        manager: "Muwanga Christopher",
      },
      personalInfo: {
        dateOfBirth: "1990-05-15",
        gender: "Female",
        nationality: "American",
        maritalStatus: "Single",
        joinedDate: "2020-01-15",
      },
    },
    {
      id: "3",
      initials:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100125",
      name: "Kato Michael",
      title: "Network Administrator",
      company: "Nkumba University",
      phone: "0789-654-321",
      email: "kato.michael@example.com",
      employeeNumber: "NUA5678",
      dob: "1987-08-21",
      gender: "Male",
      nationality: "UGANDAN",
      maritalStatus: "Single",
      joinedDate: "2016-05-10",
      timezone: "Africa/Kampala",
      accessLevel: "Employee",
      identification: {
        nationalId: "301-45-6789",
        socialInsurance: "NSSF123456",
        personalTaxId: "CM123456789",
        healthInsurance: "JUB345678",
        additionalIds: "301-45-6789",
        drivingLicense: "UAL123XYZ567",
      },
      contact: {
        address: "Plot 25 Kampala Road",
        city: "Kampala",
        country: "Uganda",
        postalCode: "256",
        homePhone: "0392-123-456",
        workPhone: "0312-789-012",
        privateEmail: "kato.michael@example.com",
      },
      jobDetails: {
        jobTitle: "Network Administrator",
        employmentStatus: "Full Time",
        department: "IT Services",
        manager: "Nalubega Sarah",
      },
      personalInfo: {
        dateOfBirth: "1987-08-21",
        gender: "Male",
        nationality: "Ugandan",
        maritalStatus: "Single",
        joinedDate: "2016-05-10",
      },
    },
    {
      id: "4",
      initials:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100128",
      name: "Namakula Sharon",
      title: "Human Resource Officer",
      company: "Nkumba University",
      phone: "0753-987-654",
      email: "namakula.sharon@example.com",
      employeeNumber: "NUA7890",
      dob: "1992-12-05",
      gender: "Female",
      nationality: "UGANDAN",
      maritalStatus: "Married",
      joinedDate: "2019-08-01",
      timezone: "Africa/Kampala",
      accessLevel: "Employee",
      identification: {
        nationalId: "401-98-7654",
        socialInsurance: "NSSF543210",
        personalTaxId: "CM543210987",
        healthInsurance: "AAR567890",
        additionalIds: "401-98-7654",
        drivingLicense: "UAJ456YUI789",
      },
      contact: {
        address: "10 Jinja Road",
        city: "Entebbe",
        country: "Uganda",
        postalCode: "256",
        homePhone: "0417-654-321",
        workPhone: "0417-789-456",
        privateEmail: "namakula.sharon@example.com",
      },
      jobDetails: {
        jobTitle: "Human Resource Officer",
        employmentStatus: "Full Time",
        department: "Human Resources",
        manager: "Mugisha Paul",
      },
      personalInfo: {
        dateOfBirth: "1992-12-05",
        gender: "Female",
        nationality: "Ugandan",
        maritalStatus: "Married",
        joinedDate: "2019-08-01",
      },
    },
    {
      id: "5",
      initials:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101236",
      name: "Mugisha William",
      title: "Finance Manager",
      company: "Nkumba University",
      phone: "0701-234-567",
      email: "mugisha.william@example.com",
      employeeNumber: "NUA4567",
      dob: "1980-04-12",
      gender: "Male",
      nationality: "UGANDAN",
      maritalStatus: "Married",
      joinedDate: "2010-09-15",
      timezone: "Africa/Kampala",
      accessLevel: "Manager",
      identification: {
        nationalId: "502-76-5432",
        socialInsurance: "NSSF765432",
        personalTaxId: "CM876543210",
        healthInsurance: "SAN890123",
        additionalIds: "502-76-5432",
        drivingLicense: "UAP789WQR456",
      },
      contact: {
        address: "45 Namirembe Road",
        city: "Kampala",
        country: "Uganda",
        postalCode: "256",
        homePhone: "0414-890-123",
        workPhone: "0414-123-890",
        privateEmail: "mugisha.william@example.com",
      },
      jobDetails: {
        jobTitle: "Finance Manager",
        employmentStatus: "Full Time",
        department: "Finance",
        manager: "Nakato Christine",
      },
      personalInfo: {
        dateOfBirth: "1980-04-12",
        gender: "Male",
        nationality: "Ugandan",
        maritalStatus: "Married",
        joinedDate: "2010-09-15",
      },
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [searchText, setSearchText] = useState("");
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const [inviteEmployeeVisible, setInviteEmployeeVisible] = useState(false);
  const [filterEmployeesVisible, setFilterEmployeesVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [employeePhoto, setEmployeePhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = () => {
    message.success("Copied to clipboard");
  };

  const handleAddEmployee = useCallback(async () => {
    try {
      console.log("Received employeeData:", employeeData);
      if (!employeeData.firstName || !employeeData.lastName) {
        console.error("Missing required fields:", {
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
        });
        throw new Error("First name and last name are required");
      }
      const newEmployee = {
        id: isEditing ? selectedEmployee.id : (employees.length + 1).toString(),
        initials: `${employeeData.firstName.charAt(
          0
        )}${employeeData.lastName.charAt(0)}`,
        name: `${employeeData.firstName} ${employeeData.lastName}`,
        title: employeeData.jobTitle || "",
        company: "Nkumba University",
        phone: employeeData.mobilePhone || employeeData.homePhone || "",
        email: employeeData.workEmail || employeeData.privateEmail || "",
        employeeNumber: employeeData.employeeNumber || "",
        dob: employeeData.dateOfBirth || "",
        gender: employeeData.gender || "",
        nationality: employeeData.nationality || "",
        maritalStatus: employeeData.maritalStatus || "",
        joinedDate: employeeData.joinedDate || "",
        timezone: employeeData.timezone || "",
        accessLevel: isEditing ? selectedEmployee.accessLevel : "Employee",
        identification: {
          nationalId: employeeData.nationalId || "",
          socialInsurance: employeeData.socialInsurance || "",
          personalTaxId: employeeData.personalTaxId || "",
          healthInsurance: employeeData.healthInsurance || "",
          additionalIds: employeeData.additionalIds || "",
          drivingLicense: employeeData.drivingLicense || "",
          immigrationStatus: employeeData.immigrationStatus || "",
        },
        contact: {
          address: employeeData.addressLine1 || "",
          addressLine1: employeeData.addressLine1 || "",
          addressLine2: employeeData.addressLine2 || "",
          city: employeeData.city || "",
          country: employeeData.country || "",
          province: employeeData.province || "",
          postalCode: employeeData.postalCode || "",
          homePhone: employeeData.homePhone || "",
          mobilePhone: employeeData.mobilePhone || "",
          workPhone: employeeData.workPhone || "",
          workEmail: employeeData.workEmail || "",
          privateEmail: employeeData.privateEmail || "",
        },
        jobDetails: {
          jobTitle: employeeData.jobTitle || "",
          employmentStatus: employeeData.employmentStatus || "",
          department: employeeData.department || "",
          payGrade: employeeData.payGrade || "",
          confirmationDate: employeeData.confirmationDate || "",
          terminationDate: employeeData.terminationDate || "",
          workStationId: employeeData.workStationId || "",
          manager: employeeData.manager || "",
          indirectManagers: employeeData.indirectManagers || [],
          firstLevelApprover: employeeData.firstLevelApprover || "",
          secondLevelApprover: employeeData.secondLevelApprover || "",
          thirdLevelApprover: employeeData.thirdLevelApprover || "",
        },
        personalInfo: {
          dateOfBirth: employeeData.dateOfBirth || "",
          gender: employeeData.gender || "",
          nationality: employeeData.nationality || "",
          maritalStatus: employeeData.maritalStatus || "",
          joinedDate: employeeData.joinedDate || "",
        },
      };

      setEmployees((prevEmployees) => {
        if (isEditing) {
          return prevEmployees.map((emp) =>
            emp.id === selectedEmployee.id ? newEmployee : emp
          );
        } else {
          return [...prevEmployees, newEmployee];
        }
      });

      setSelectedEmployee(newEmployee);
      setAddEmployeeVisible(false);
      setIsEditing(false);
      message.success(
        isEditing
          ? "Employee updated successfully"
          : "Employee added successfully"
      );
      if (!newEmployee.initials.startsWith("http")) {
        newEmployee.initials = `${employeeData.firstName.charAt(0)}${employeeData.lastName.charAt(0)}`;
      }
    } catch (error) {
      console.error("Error in handleAddEmployee:", error);
      message.error(error.message || "Failed to add/update employee");
    }
  }, [employees.length, selectedEmployee]);

  const handleInviteEmployee = async () => {
    const newEmployee = {
      id: (employees.length + 1).toString(),
      initials: `${inviteData.firstName.charAt(0)}${inviteData.lastName.charAt(
        0
      )}`,
      name: `${inviteData.firstName} ${inviteData.lastName}`,
      title: inviteData.jobTitle || "New Employee",
      company: "Nkumba University",
      phone: "",
      email: inviteData.email,
      employeeNumber: inviteData.employeeNumber,
      dob: "",
      gender: "",
      nationality: "",
      maritalStatus: "",
      joinedDate: inviteData.joinedDate || "",
      timezone: inviteData.timezone || "UTC",
      accessLevel: inviteData.userLevel || "Employee",
      identification: {
        nationalId: "",
        socialInsurance: "",
        personalTaxId: "",
        healthInsurance: "",
        additionalIds: "",
        drivingLicense: "",
      },
      contact: {
        address: "",
        city: "",
        country: inviteData.country,
        postalCode: "",
        homePhone: "",
        workPhone: "",
        privateEmail: inviteData.email,
      },
      jobDetails: {
        jobTitle: inviteData.jobTitle || "",
        employmentStatus: inviteData.employmentStatus || "",
        department: inviteData.department || "",
        payGrade: inviteData.payGrade || "",
        manager: inviteData.directManager || "",
      },
      personalInfo: {
        dateOfBirth: "",
        gender: "",
        nationality: "",
        maritalStatus: "",
        joinedDate: inviteData.joinedDate || "",
      },
    };

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setSelectedEmployee(newEmployee);
  };

  const handleUploadPhoto = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmployeePhoto();
        message.success("Photo uploaded successfully");
      };
      reader.readAsDataURL();
    }
  };

  const handleRemovePhoto = () => {
    setEmployeePhoto(null);
    message.success("Photo removed successfully");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setAddEmployeeVisible(true);
  };

  const handleDeactivate = () => {
    Modal.confirm({
      title: "Deactivate Employee",
      content: `Are you sure you want to deactivate ${selectedEmployee.name}?`,
      onOk() {
        message.success(`${selectedEmployee.name} has been deactivated`);
      },
    });
  };

  const CopyableField = ({ label, value }) => (
    <div>
      <Text type="secondary">{label}</Text>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {value}
        {value && (
          <CopyToClipboard text={value} onCopy={() => handleCopy(value)}>
            <Copy size={14} style={{ cursor: "pointer", color: "#1890ff" }} />
          </CopyToClipboard>
        )}
      </div>
    </div>
  );

  const SectionHeader = ({ title, onEdit }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        {title}
      </Title>
      {onEdit && (
        <Tag
          color="blue"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px", // Adds spacing between icon and text
            fontSize: "8px",
            padding: "2px 6px",
            height: "auto",
            lineHeight: "normal",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={onEdit}
        >
          <Edit2 size={10} />
          Edit
        </Tag>
      )}
    </div>
  );

  const currentTime = new Date();
  const formattedTime = `${currentTime.getFullYear()} Feb ${currentTime.getDate()} : ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`;

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "4px", backgroundColor: "#EFEFEF" }}>
      {/* Top Actions */}
      <Space style={{ marginBottom: "5px" }}>
        <Button
          size="small"
          icon={<Share size={12} />}
          type="dashed"
          onClick={() => setInviteEmployeeVisible(true)}
        >
          Invite an Employee
        </Button>
        <Button
          size="small"
          icon={<Plus size={12} />}
          onClick={() => {
            setIsEditing(false);
            setAddEmployeeVisible(true);
          }}
        >
          Add a New Employee
        </Button>
        <Button
          size="small"
          icon={<Filter size={12} />}
          onClick={() => setFilterEmployeesVisible(true)}
        >
          Filter Employees
        </Button>
      </Space>

      <div
        style={{
          display: "flex",
          gap: "10px",
          height: "calc(100vh - 135px)",
        }}
      >
        {/* Left Side - Employee List */}
        <Card
          style={{
            backgroundColor: "white",
            borderRadius: 0,
            maxHeight: "calc(100vh - 135px)",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "300px",
            }}
          >
            <div style={{ marginBottom: "8px", marginTop: "16px", padding: 5 }}>
              <Input
                size="small"
                prefix={<Search size={16} />}
                placeholder="Search by Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <List
              size="small"
              dataSource={filteredEmployees}
              renderItem={(employee) => (
                <List.Item
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    backgroundColor:
                      employee.id === selectedEmployee.id
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={employee.initials}
                        style={{
                          backgroundColor:
                            employee.id === "1" ? "#e74c3c" : "#e67e22",
                          verticalAlign: "middle",
                        }}
                      />
                    }
                    title={employee.name}
                    description={`${employee.company} | ${employee.title}`}
                  />
                </List.Item>
              )}
            />

            {/* Pagination */}
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Tag>{"<"}</Tag>
              <Tag color="blue">1</Tag>
              <Tag>{">"}</Tag>
              <Select size="small" defaultValue="10" style={{ width: "120px" }}>
                <Select.Option value="10">10 / page</Select.Option>
                <Select.Option value="20">20 / page</Select.Option>
                <Select.Option value="50">50 / page</Select.Option>
              </Select>
            </div>
          </div>
        </Card>

        {/* Right Side - Employee Details */}

        <div
          style={{
            flex: 1,
            maxHeight: "calc(100vh - 135px)",
            overflowY: "scroll",
          }}
        >
          {/* Action Tags */}

          {/* Employee Profile */}

          <Card
            style={{
              backgroundColor: "white",
              borderRadius: 0,
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={() => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
                onChange={handleUploadPhoto}
              >
                <Button
                  type="default"
                  size="small"
                  icon={<CloudUpload size={10} />}
                  style={{
                    fontSize: "10px",
                    padding: "1px 4px",
                    height: "20px",
                    lineHeight: "normal",
                    borderColor: "#13c2c2",
                    color: "#13c2c2",
                  }}
                >
                  Upload Photo
                </Button>
              </Upload>

              <Button
                color="danger"
                variant="outlined"
                size="small"
                icon={<Trash2 size={10} />}
                style={{
                  fontSize: "10px",
                  padding: "1px 4px",
                  height: "20px",
                  lineHeight: "normal",
                  borderColor: "red",
                  color: "red",
                }}
                onClick={handleRemovePhoto}
              >
                Remove Photo
              </Button>
              <Button
                color="green"
                variant="outlined"
                size="small"
                icon={<Edit2 size={10} />}
                style={{
                  fontSize: "10px",
                  padding: "1px 4px",
                  height: "20px",
                  lineHeight: "normal",
                  borderColor: "green",
                  color: "green",
                }}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                color="danger"
                variant="dashed"
                size="small"
                icon={<XCircle size={10} />}
                style={{
                  fontSize: "10px",
                  padding: "1px 4px",
                  height: "20px",
                  lineHeight: "normal",
                  borderColor: "red",
                  color: "red",
                }}
                onClick={handleDeactivate}
              >
                Deactivate
              </Button>
              <Button
                color="purple"
                variant="outlined"
                size="small"
                icon={<Copy size={10} />}
                style={{
                  fontSize: "10px",
                  padding: "1px 4px",
                  height: "20px",
                  lineHeight: "normal",
                  borderColor: "purple",
                  color: "purple",
                }}
                onClick={() => {
                  const employeeData = {
                    ...selectedEmployee,
                    id: (employees.length + 1).toString(),
                    employeeNumber: `EMP${(employees.length + 1)
                      .toString()
                      .padStart(3, "0")}`,
                  };
                  setAddEmployeeVisible(true);
                  setIsEditing(false);
                  form.setFieldsValue(employeeData);
                  message.success(
                    "Employee data copied. You can now edit and save as a new employee."
                  );
                }}
              >
                Copy
              </Button>
            </div>
            <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
              <Avatar
                size={100}
                src={selectedEmployee.initials}
                style={{ backgroundColor: "#e74c3c", fontSize: "36px" }}
              />
              {/* {!employeePhoto && selectedEmployee.initials} */}
              {/* </Avatar> */}
              <div>
                <Title level={3} style={{ marginBottom: "16px" }}>
                  {selectedEmployee.name}
                </Title>

                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Space>
                    <Phone size={14} style={{ marginRight: "8px" }} />
                    <Text>{selectedEmployee.phone}</Text>
                    <CopyToClipboard
                      text={selectedEmployee.phone}
                      onCopy={() => handleCopy(selectedEmployee.phone)}
                    >
                      <Copy
                        size={14}
                        style={{ cursor: "pointer", color: "#1890ff" }}
                      />
                    </CopyToClipboard>
                  </Space>

                  <Space>
                    <Mail size={14} style={{ marginRight: "8px" }} />
                    <Text>{selectedEmployee.email}</Text>
                    <CopyToClipboard
                      text={selectedEmployee.email}
                      onCopy={() => handleCopy(selectedEmployee.email)}
                    >
                      <Copy
                        size={14}
                        style={{ cursor: "pointer", color: "#1890ff" }}
                      />
                    </CopyToClipboard>
                  </Space>

                  <Space>
                    <IdCard size={14} style={{ marginRight: "8px" }} />
                    <Text>
                      Employee Number: {selectedEmployee.employeeNumber}
                    </Text>
                    <CopyToClipboard
                      text={selectedEmployee.employeeNumber}
                      onCopy={() => handleCopy(selectedEmployee.employeeNumber)}
                    >
                      <Copy
                        size={14}
                        style={{ cursor: "pointer", color: "#1890ff" }}
                      />
                    </CopyToClipboard>
                  </Space>

                  <Space>
                    <Globe size={14} style={{ marginRight: "8px" }} />
                    <Text>Timezone: {selectedEmployee.timezone}</Text>
                    <Clock
                      size={14}
                      style={{ marginLeft: "12px", marginRight: "8px" }}
                    />
                    <Text>Time now: {formattedTime}</Text>
                  </Space>

                  <Space>
                    <Shield size={14} style={{ marginRight: "8px" }} />
                    <Text>Access Level:</Text>
                    <Tag
                      color="blue"
                      style={{
                        fontSize: "8px",
                        padding: "2px 4px",
                        height: "auto",
                        lineHeight: "normal",
                        borderRadius: "4px",
                      }}
                    >
                      {selectedEmployee.accessLevel}
                    </Tag>
                    <div
                      size={0}
                      style={{ marginLeft: "12px", marginRight: "8px" }}
                    />
                    <div style={{ fontSize: "20px" }}>✍️</div>

                    <Text>
                      Contract Health:{" "}
                      <span style={{ color: "red" }}>
                        Contract Expires in 10 months
                      </span>
                    </Text>
                  </Space>
                </Space>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <Tabs.TabPane tab="Basic Information" key="basic">
              {/* Personal Information Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <SectionHeader
                  title="Personal Information"
                  onEdit={() => console.log("Edit Personal Information")}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <CopyableField
                    label="Date of Birth"
                    value={selectedEmployee.dob}
                  />
                  <CopyableField
                    label="Gender"
                    value={selectedEmployee.gender}
                  />
                  <CopyableField
                    label="Nationality"
                    value={selectedEmployee.nationality}
                  />
                  <CopyableField
                    label="Marital Status"
                    value={selectedEmployee.maritalStatus}
                  />
                  <CopyableField
                    label="Join Date"
                    value={selectedEmployee.joinedDate}
                  />
                </div>
              </div>

              {/* Identification Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <SectionHeader
                  title="Identification"
                  onEdit={() => console.log("Edit Identification")}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <CopyableField
                    label="National ID"
                    value={selectedEmployee.identification.nationalId}
                  />
                  <CopyableField
                    label="Social Insurance"
                    value={selectedEmployee.identification.socialInsurance}
                  />
                  <CopyableField
                    label="Personal Tax ID"
                    value={selectedEmployee.identification.personalTaxId}
                  />
                  <CopyableField
                    label="Health Insurance"
                    value={selectedEmployee.identification.healthInsurance}
                  />
                  <CopyableField
                    label="Additional IDs"
                    value={selectedEmployee.identification.additionalIds}
                  />
                  <CopyableField
                    label="Driving License"
                    value={selectedEmployee.identification.drivingLicense}
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <SectionHeader
                  title="Contact Information"
                  onEdit={() => console.log("Edit Contact")}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <CopyableField
                    label="Address"
                    value={selectedEmployee.contact.address}
                  />
                  <CopyableField
                    label="City"
                    value={selectedEmployee.contact.city}
                  />
                  <CopyableField
                    label="Country"
                    value={selectedEmployee.contact.country}
                  />
                  <CopyableField
                    label="Postal/Zip Code"
                    value={selectedEmployee.contact.postalCode}
                  />
                  <CopyableField
                    label="Home Phone"
                    value={selectedEmployee.contact.homePhone}
                  />
                  <CopyableField
                    label="Work Phone"
                    value={selectedEmployee.contact.workPhone}
                  />
                  <CopyableField
                    label="Private Email"
                    value={selectedEmployee.contact.privateEmail}
                  />
                </div>
              </div>

              {/* Job Details Section */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <SectionHeader
                  title="Job Details"
                  onEdit={() => console.log("Edit Job Details")}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <CopyableField
                    label="Job Title"
                    value={selectedEmployee.jobDetails.jobTitle}
                  />
                  <CopyableField
                    label="Employment Status"
                    value={selectedEmployee.jobDetails.employmentStatus}
                  />
                  <CopyableField
                    label="Department"
                    value={selectedEmployee.jobDetails.department}
                  />
                  <CopyableField
                    label="Manager"
                    value={selectedEmployee.jobDetails.manager}
                  />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Qualifications" key="qualifications">
              <Qualifications employeeId={selectedEmployee.id} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Work History" key="work-history">
              <WorkHistory employeeId={selectedEmployee.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Skills" key="skills">
              <Skills employeeId={selectedEmployee.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Education" key="education">
              <Education employeeId={selectedEmployee.id} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Certifications" key="certifications">
              <Certifications employeeId={selectedEmployee.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dependents" key="dependents">
              <Dependents employeeId={selectedEmployee.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Contacts" key="contacts">
              <Contacts employeeId={selectedEmployee.id} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <AddEmployeeModal
        visible={addEmployeeVisible}
        onCancel={() => {
          setAddEmployeeVisible(false);
          setIsEditing(false);
        }}
        onSubmit={handleAddEmployee}
        initialValues={isEditing ? selectedEmployee : undefined}
        isEditing={isEditing}
        form={form}
      />

      <InviteEmployeeModal
        visible={inviteEmployeeVisible}
        onCancel={() => setInviteEmployeeVisible(false)}
        onSubmit={handleInviteEmployee}
      />

      <FilterEmployeesModal
        visible={filterEmployeesVisible}
        onCancel={() => setFilterEmployeesVisible(false)}
        onFilter={(filters) => {
          console.log("Applying filters:", filters);
          setFilterEmployeesVisible(false);
        }}
      />
    </div>
  );
};

export default EmployeeManagement;
