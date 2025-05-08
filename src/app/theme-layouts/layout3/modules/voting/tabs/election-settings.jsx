import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Card,
  Tabs,
  Select,
  InputNumber,
  Divider,
  Space,
  Upload,
  message,
  Radio,
  Alert,
} from "antd";
import {
  SaveOutlined,
  UploadOutlined,
  BellOutlined,
  LockOutlined,
  UserOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

export default function ElectionSettings() {
  const [form] = Form.useForm();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [votingMethod, setVotingMethod] = useState("single");

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Settings saved successfully!");
    // In a real app, you would submit the form data to your API
  };

  const uploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <h1>Election System Settings</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          systemName: "University Election Portal",
          logoPosition: "left",
          primaryColor: "#FFD700",
          secondaryColor: "#DC143C",
          accentColor: "#000000",
          emailNotifications: true,
          smsNotifications: false,
          votingMethod: "single",
          allowAbstain: true,
          requireVerification: true,
          verificationMethod: "email",
          maxCandidatesPerPosition: 10,
          manifestoMaxLength: 500,
          allowPartyAffiliation: true,
          allowIndependentCandidates: true,
          defaultNominationFee: 50000,
          paymentMethods: ["cash", "mobileMoney", "bankTransfer"],
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <GlobalOutlined /> General
              </span>
            }
            key="1"
          >
            <Card title="System Information" style={{ marginBottom: 16 }}>
              <Form.Item
                name="systemName"
                label="System Name"
                rules={[
                  { required: true, message: "Please enter the system name" },
                ]}
              >
                <Input placeholder="e.g. University Election Portal" />
              </Form.Item>

              <Form.Item name="systemDescription" label="System Description">
                <TextArea
                  rows={3}
                  placeholder="Brief description of the election system"
                />
              </Form.Item>

              <Form.Item
                name="logo"
                label="System Logo"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
              >
                <Upload {...uploadProps} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="logoPosition" label="Logo Position">
                <Select>
                  <Option value="left">Left</Option>
                  <Option value="center">Center</Option>
                  <Option value="right">Right</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="Appearance" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Form.Item
                  name="primaryColor"
                  label="Primary Color"
                  style={{ flex: 1, minWidth: 200 }}
                >
                  <Input type="color" />
                </Form.Item>

                <Form.Item
                  name="secondaryColor"
                  label="Secondary Color"
                  style={{ flex: 1, minWidth: 200 }}
                >
                  <Input type="color" />
                </Form.Item>

                <Form.Item
                  name="accentColor"
                  label="Accent Color"
                  style={{ flex: 1, minWidth: 200 }}
                >
                  <Input type="color" />
                </Form.Item>
              </div>

              <Form.Item name="customCss" label="Custom CSS">
                <TextArea rows={4} placeholder="Add custom CSS styles" />
              </Form.Item>
            </Card>

            <Card title="Contact Information" style={{ marginBottom: 16 }}>
              <Form.Item
                name="contactEmail"
                label="Contact Email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="e.g. elections@university.edu" />
              </Form.Item>

              <Form.Item name="contactPhone" label="Contact Phone">
                <Input placeholder="e.g. +256 700 123456" />
              </Form.Item>

              <Form.Item name="supportHours" label="Support Hours">
                <Input placeholder="e.g. Monday-Friday, 9am-5pm" />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <SettingOutlined /> Election Settings
              </span>
            }
            key="2"
          >
            <Card title="Voting Settings" style={{ marginBottom: 16 }}>
              <Form.Item name="votingMethod" label="Voting Method">
                <Radio.Group onChange={(e) => setVotingMethod(e.target.value)}>
                  <Space direction="vertical">
                    <Radio value="single">
                      <div>
                        <div>Single Choice Voting</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.45)",
                          }}
                        >
                          Voters can select only one candidate per position
                        </div>
                      </div>
                    </Radio>
                    <Radio value="ranked">
                      <div>
                        <div>Ranked Choice Voting</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.45)",
                          }}
                        >
                          Voters rank candidates in order of preference
                        </div>
                      </div>
                    </Radio>
                    <Radio value="approval">
                      <div>
                        <div>Approval Voting</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.45)",
                          }}
                        >
                          Voters can select multiple candidates per position
                        </div>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {votingMethod === "approval" && (
                <Form.Item
                  name="maxSelectionsPerPosition"
                  label="Maximum Selections Per Position"
                  rules={[
                    {
                      required: true,
                      message: "Please enter maximum selections",
                    },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              )}

              <Form.Item
                name="allowAbstain"
                label="Allow Abstain Option"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, voters can choose to abstain from voting for a
                position
              </div>

              <Form.Item
                name="requireAllPositions"
                label="Require Voting for All Positions"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, voters must vote for all positions to submit their
                ballot
              </div>

              <Form.Item
                name="allowVoteChange"
                label="Allow Vote Changes"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, voters can change their vote until the election
                closes
              </div>
            </Card>

            <Card title="Candidate Settings" style={{ marginBottom: 16 }}>
              <Form.Item
                name="maxCandidatesPerPosition"
                label="Maximum Candidates Per Position"
                rules={[
                  {
                    required: true,
                    message: "Please enter maximum candidates",
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="manifestoMaxLength"
                label="Manifesto Maximum Length (characters)"
                rules={[
                  { required: true, message: "Please enter maximum length" },
                ]}
              >
                <InputNumber min={100} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="allowPartyAffiliation"
                label="Allow Party Affiliation"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="allowIndependentCandidates"
                label="Allow Independent Candidates"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="requireProfilePhoto"
                label="Require Profile Photo"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>

            <Card title="Payment Settings" style={{ marginBottom: 16 }}>
              <Form.Item
                name="defaultNominationFee"
                label="Default Nomination Fee (UGX)"
                rules={[
                  { required: true, message: "Please enter default fee" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                name="paymentMethods"
                label="Accepted Payment Methods"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one payment method",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Select payment methods">
                  <Option value="cash">Cash</Option>
                  <Option value="mobileMoney">Mobile Money</Option>
                  <Option value="bankTransfer">Bank Transfer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="paymentInstructions"
                label="Payment Instructions"
              >
                <TextArea
                  rows={4}
                  placeholder="Instructions for making payments"
                />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <LockOutlined /> Security
              </span>
            }
            key="3"
          >
            <Card title="Voter Verification" style={{ marginBottom: 16 }}>
              <Form.Item
                name="requireVerification"
                label="Require Voter Verification"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, voters must verify their identity before voting
              </div>

              <Form.Item name="verificationMethod" label="Verification Method">
                <Select>
                  <Option value="email">Email Verification</Option>
                  <Option value="sms">SMS Verification</Option>
                  <Option value="studentId">Student ID Verification</Option>
                  <Option value="multiple">Multiple Methods</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="verificationExpiry"
                label="Verification Code Expiry (minutes)"
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Card>

            <Card title="Access Control" style={{ marginBottom: 16 }}>
              <Form.Item
                name="ipRestriction"
                label="IP Address Restriction"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, voting is restricted to specific IP ranges
              </div>

              <Form.Item name="allowedIpRanges" label="Allowed IP Ranges">
                <TextArea
                  rows={3}
                  placeholder="Enter IP ranges, one per line"
                />
              </Form.Item>

              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (minutes)"
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="maxLoginAttempts" label="Maximum Login Attempts">
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Card>

            <Card title="Audit & Logging" style={{ marginBottom: 16 }}>
              <Form.Item
                name="enableAuditLog"
                label="Enable Audit Logging"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, all system actions are logged for audit purposes
              </div>

              <Form.Item
                name="logRetentionDays"
                label="Log Retention Period (days)"
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="adminActionNotification"
                label="Admin Action Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, notifications are sent for sensitive admin actions
              </div>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BellOutlined /> Notifications
              </span>
            }
            key="4"
          >
            <Card title="Email Notifications" style={{ marginBottom: 16 }}>
              <Form.Item
                name="emailNotifications"
                label="Enable Email Notifications"
                valuePropName="checked"
              >
                <Switch onChange={setEmailNotifications} />
              </Form.Item>

              {emailNotifications && (
                <>
                  <Form.Item
                    name="smtpServer"
                    label="SMTP Server"
                    rules={[
                      { required: true, message: "Please enter SMTP server" },
                    ]}
                  >
                    <Input placeholder="e.g. smtp.gmail.com" />
                  </Form.Item>

                  <Form.Item
                    name="smtpPort"
                    label="SMTP Port"
                    rules={[
                      { required: true, message: "Please enter SMTP port" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="e.g. 587"
                    />
                  </Form.Item>

                  <Form.Item
                    name="smtpUsername"
                    label="SMTP Username"
                    rules={[
                      { required: true, message: "Please enter SMTP username" },
                    ]}
                  >
                    <Input placeholder="e.g. elections@university.edu" />
                  </Form.Item>

                  <Form.Item
                    name="smtpPassword"
                    label="SMTP Password"
                    rules={[
                      { required: true, message: "Please enter SMTP password" },
                    ]}
                  >
                    <Input.Password placeholder="Enter SMTP password" />
                  </Form.Item>

                  <Form.Item name="emailSender" label="Email Sender Name">
                    <Input placeholder="e.g. University Election System" />
                  </Form.Item>

                  <Divider orientation="left">Email Templates</Divider>

                  <Form.Item
                    name="welcomeEmailSubject"
                    label="Welcome Email Subject"
                  >
                    <Input placeholder="e.g. Welcome to the University Election System" />
                  </Form.Item>

                  <Form.Item
                    name="welcomeEmailTemplate"
                    label="Welcome Email Template"
                  >
                    <TextArea
                      rows={4}
                      placeholder="HTML template for welcome emails"
                    />
                  </Form.Item>

                  <Form.Item
                    name="verificationEmailSubject"
                    label="Verification Email Subject"
                  >
                    <Input placeholder="e.g. Verify Your Email to Vote" />
                  </Form.Item>

                  <Form.Item
                    name="verificationEmailTemplate"
                    label="Verification Email Template"
                  >
                    <TextArea
                      rows={4}
                      placeholder="HTML template for verification emails"
                    />
                  </Form.Item>
                </>
              )}
            </Card>

            <Card title="SMS Notifications" style={{ marginBottom: 16 }}>
              <Form.Item
                name="smsNotifications"
                label="Enable SMS Notifications"
                valuePropName="checked"
              >
                <Switch onChange={setSmsNotifications} />
              </Form.Item>

              {smsNotifications && (
                <>
                  <Form.Item
                    name="smsProvider"
                    label="SMS Provider"
                    rules={[
                      { required: true, message: "Please select SMS provider" },
                    ]}
                  >
                    <Select placeholder="Select SMS provider">
                      <Option value="twilio">Twilio</Option>
                      <Option value="africasTalking">Africa's Talking</Option>
                      <Option value="custom">Custom Provider</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="smsApiKey"
                    label="SMS API Key"
                    rules={[
                      { required: true, message: "Please enter SMS API key" },
                    ]}
                  >
                    <Input.Password placeholder="Enter SMS API key" />
                  </Form.Item>

                  <Form.Item
                    name="smsApiSecret"
                    label="SMS API Secret"
                    rules={[
                      {
                        required: true,
                        message: "Please enter SMS API secret",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter SMS API secret" />
                  </Form.Item>

                  <Form.Item name="smsSenderId" label="SMS Sender ID">
                    <Input placeholder="e.g. UNIELECT" />
                  </Form.Item>

                  <Divider orientation="left">SMS Templates</Divider>

                  <Form.Item
                    name="verificationSmsTemplate"
                    label="Verification SMS Template"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Template for verification SMS"
                    />
                  </Form.Item>

                  <Form.Item
                    name="reminderSmsTemplate"
                    label="Reminder SMS Template"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Template for reminder SMS"
                    />
                  </Form.Item>
                </>
              )}
            </Card>

            <Card title="Notification Events" style={{ marginBottom: 16 }}>
              <Alert
                message="Notification Settings"
                description="Select which events should trigger notifications to users and administrators."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />

              <Divider orientation="left">User Notifications</Divider>

              <Form.Item
                name="notifyOnRegistration"
                label="Registration Confirmation"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyOnElectionStart"
                label="Election Start"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyOnElectionEnd"
                label="Election End"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyOnResultsRelease"
                label="Results Release"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Divider orientation="left">Admin Notifications</Divider>

              <Form.Item
                name="notifyAdminOnCandidateRegistration"
                label="Candidate Registration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyAdminOnPayment"
                label="Payment Received"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyAdminOnElectionStart"
                label="Election Start"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyAdminOnElectionEnd"
                label="Election End"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="notifyAdminOnHighVoterTurnout"
                label="High Voter Turnout"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <UserOutlined /> User Management
              </span>
            }
            key="5"
          >
            <Card title="Admin Roles" style={{ marginBottom: 16 }}>
              <Form.Item name="adminRoles" label="Available Admin Roles">
                <Select mode="multiple" placeholder="Select admin roles">
                  <Option value="superAdmin">Super Administrator</Option>
                  <Option value="electionManager">Election Manager</Option>
                  <Option value="candidateManager">Candidate Manager</Option>
                  <Option value="paymentManager">Payment Manager</Option>
                  <Option value="reportViewer">Report Viewer</Option>
                </Select>
              </Form.Item>

              <Form.Item name="defaultAdminRole" label="Default Admin Role">
                <Select placeholder="Select default role for new admins">
                  <Option value="electionManager">Election Manager</Option>
                  <Option value="candidateManager">Candidate Manager</Option>
                  <Option value="reportViewer">Report Viewer</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="User Registration" style={{ marginBottom: 16 }}>
              <Form.Item
                name="allowStudentRegistration"
                label="Allow Student Self-Registration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, students can register themselves in the system
              </div>

              <Form.Item
                name="requireApproval"
                label="Require Admin Approval for Registration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="requiredStudentFields"
                label="Required Student Fields"
              >
                <Select mode="multiple" placeholder="Select required fields">
                  <Option value="name">Full Name</Option>
                  <Option value="studentId">Student ID</Option>
                  <Option value="email">Email</Option>
                  <Option value="phone">Phone Number</Option>
                  <Option value="faculty">Faculty/Department</Option>
                  <Option value="yearOfStudy">Year of Study</Option>
                  <Option value="dateOfBirth">Date of Birth</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="Password Policy" style={{ marginBottom: 16 }}>
              <Form.Item
                name="minimumPasswordLength"
                label="Minimum Password Length"
              >
                <InputNumber min={6} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="requirePasswordComplexity"
                label="Require Password Complexity"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                When enabled, passwords must include uppercase, lowercase,
                numbers, and special characters
              </div>

              <Form.Item
                name="passwordExpiryDays"
                label="Password Expiry (days)"
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.45)",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              >
                Set to 0 for no expiry
              </div>
            </Card>
          </TabPane>
        </Tabs>

        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
}
