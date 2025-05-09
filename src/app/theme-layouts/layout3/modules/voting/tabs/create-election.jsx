import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  Switch,
  Divider,
  Card,
  Steps,
  message,
  Upload,
  Space,
  InputNumber,
  Tooltip,
} from "antd";
import {
  CalendarOutlined,
  SettingOutlined,
  UserOutlined,
  CheckOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;

export default function CreateElection() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [electionType, setElectionType] = useState("online");
  const [nominationFeeRequired, setNominationFeeRequired] = useState(true);

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Election created successfully!");
    // In a real app, you would submit the form data to your API
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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

  const steps = [
    {
      title: "Basic Information",
      icon: <CalendarOutlined />,
      content: (
        <div>
          <Form.Item
            name="title"
            label="Election Title"
            rules={[
              { required: true, message: "Please enter the election title" },
            ]}
          >
            <Input placeholder="e.g. Guild Presidential Election 2023/2024" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the purpose of this election"
            />
          </Form.Item>

          <Form.Item
            name="electionType"
            label="Election Type"
            rules={[
              { required: true, message: "Please select the election type" },
            ]}
          >
            <Radio.Group
              onChange={(e) => setElectionType(e.target.value)}
              value={electionType}
            >
              <Space direction="vertical">
                <Radio value="online">
                  <div>
                    <div>Online Election</div>
                    <div
                      style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}
                    >
                      Voting will be conducted through the online portal
                    </div>
                  </div>
                </Radio>
                <Radio value="physical">
                  <div>
                    <div>Physical Election</div>
                    <div
                      style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}
                    >
                      Voting will be conducted at physical polling stations
                    </div>
                  </div>
                </Radio>
                <Radio value="hybrid">
                  <div>
                    <div>Hybrid Election</div>
                    <div
                      style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}
                    >
                      Voting will be available both online and at physical
                      locations
                    </div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {(electionType === "physical" || electionType === "hybrid") && (
            <Form.Item
              name="location"
              label="Physical Location"
              rules={[
                {
                  required: true,
                  message: "Please enter the physical location",
                },
              ]}
            >
              <Input placeholder="e.g. Main Campus, Freedom Square" />
            </Form.Item>
          )}

          <Form.Item
            name="eligibleVoters"
            label="Eligible Voters"
            rules={[
              { required: true, message: "Please specify eligible voters" },
            ]}
          >
            <Select placeholder="Select who can vote in this election">
              <Select.Option value="all">All registered students</Select.Option>
              <Select.Option value="faculty">
                Students from specific faculties
              </Select.Option>
              <Select.Option value="year">
                Students from specific year of study
              </Select.Option>
              <Select.Option value="custom">Custom eligibility</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="visibility"
            label="Visibility"
            valuePropName="checked"
            initialValue={true}
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
            When enabled, this election will be visible to students in the
            portal
          </div>
        </div>
      ),
    },
    {
      title: "Schedule",
      icon: <CalendarOutlined />,
      content: (
        <div>
          <Form.Item
            name="registrationPeriod"
            label="Candidate Registration Period"
            rules={[
              {
                required: true,
                message: "Please select the registration period",
              },
            ]}
          >
            <RangePicker style={{ width: "100%" }} showTime />
          </Form.Item>

          <Form.Item
            name="votingPeriod"
            label="Voting Period"
            rules={[
              { required: true, message: "Please select the voting period" },
            ]}
          >
            <RangePicker style={{ width: "100%" }} showTime />
          </Form.Item>

          <Form.Item
            name="resultsRelease"
            label="Results Release Date"
            rules={[
              {
                required: true,
                message: "Please select when results will be released",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} showTime />
          </Form.Item>

          <Form.Item
            name="automaticRelease"
            label="Automatic Results Release"
            valuePropName="checked"
            initialValue={true}
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
            When enabled, results will be automatically published at the
            specified date and time
          </div>
        </div>
      ),
    },
    {
      title: "Nomination Settings",
      icon: <SettingOutlined />,
      content: (
        <div>
          <Form.Item
            name="nominationFeeRequired"
            label="Nomination Fee Required"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch onChange={(checked) => setNominationFeeRequired(checked)} />
          </Form.Item>

          {nominationFeeRequired && (
            <>
              <Form.Item
                name="nominationFee"
                label="Nomination Fee Amount (UGX)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the nomination fee amount",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  placeholder="e.g. 50000"
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
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="mobileMoney">
                    Mobile Money
                  </Select.Option>
                  <Select.Option value="bankTransfer">
                    Bank Transfer
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="paymentInstructions"
                label="Payment Instructions"
              >
                <TextArea
                  rows={4}
                  placeholder="Provide instructions for payment"
                />
              </Form.Item>
            </>
          )}

          <Form.Item name="requiredDocuments" label="Required Documents">
            <Select mode="multiple" placeholder="Select required documents">
              <Select.Option value="nominationForm">
                Nomination Form
              </Select.Option>
              <Select.Option value="studentId">Student ID</Select.Option>
              <Select.Option value="academicTranscript">
                Academic Transcript
              </Select.Option>
              <Select.Option value="recommendationLetter">
                Recommendation Letter
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="uploadTemplates"
            label="Upload Document Templates"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload Templates</Button>
            </Upload>
          </Form.Item>

          <Form.List name="eligibilityCriteria">
            {(fields, { add, remove }) => (
              <>
                <Divider orientation="left">Eligibility Criteria</Divider>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "criterion"]}
                      rules={[{ required: true, message: "Missing criterion" }]}
                    >
                      <Input placeholder="e.g. Minimum GPA" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Missing value" }]}
                    >
                      <Input placeholder="e.g. 3.0" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Eligibility Criterion
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      title: "Positions & Candidates",
      icon: <UserOutlined />,
      content: (
        <div>
          <Form.List name="positions">
            {(fields, { add, remove }) => (
              <>
                <Divider orientation="left">Positions</Divider>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} style={{ marginBottom: 16 }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label="Position Title"
                        rules={[
                          { required: true, message: "Missing position title" },
                        ]}
                      >
                        <Input placeholder="e.g. Guild President" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        label="Description"
                      >
                        <TextArea
                          rows={2}
                          placeholder="Describe this position"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "maxCandidates"]}
                        label="Maximum Candidates"
                        rules={[
                          {
                            required: true,
                            message: "Please specify maximum candidates",
                          },
                        ]}
                      >
                        <InputNumber min={1} style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "nominationFee"]}
                        label={
                          <span>
                            Position-specific Nomination Fee
                            <Tooltip title="Leave blank to use the default fee">
                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                          placeholder="e.g. 50000"
                        />
                      </Form.Item>
                    </Space>
                    <Button
                      type="text"
                      danger
                      onClick={() => remove(name)}
                      style={{ position: "absolute", top: 10, right: 10 }}
                    >
                      Remove
                    </Button>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Position
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="allowIndependentCandidates"
            label="Allow Independent Candidates"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="allowPartyAffiliation"
            label="Allow Party Affiliation"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <Form.List name="parties">
            {(fields, { add, remove }) => (
              <>
                <Divider orientation="left">Political Parties</Divider>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        { required: true, message: "Missing party name" },
                      ]}
                    >
                      <Input placeholder="Party Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "color"]}
                      rules={[{ required: true, message: "Missing color" }]}
                    >
                      <Input type="color" style={{ width: 50 }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Political Party
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      title: "Review & Create",
      icon: <CheckOutlined />,
      content: (
        <div>
          <div style={{ marginBottom: 24 }}>
            <h3>Review your election settings before creating</h3>
            <p>
              Please review all the information you've entered. Once you create
              the election, some settings cannot be changed.
            </p>
          </div>

          <Card title="Election Summary" style={{ marginBottom: 16 }}>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldsValue }) => {
                const values = getFieldsValue();
                return (
                  <div>
                    <p>
                      <strong>Title:</strong> {values.title || "Not specified"}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {values.electionType
                        ? values.electionType.charAt(0).toUpperCase() +
                          values.electionType.slice(1)
                        : "Not specified"}
                    </p>
                    <p>
                      <strong>Visibility:</strong>{" "}
                      {values.visibility
                        ? "Visible to students"
                        : "Hidden from students"}
                    </p>
                    <p>
                      <strong>Nomination Fee:</strong>{" "}
                      {values.nominationFeeRequired
                        ? `UGX ${values.nominationFee?.toLocaleString() || "Not specified"}`
                        : "Not required"}
                    </p>
                    <p>
                      <strong>Positions:</strong>{" "}
                      {values.positions?.length || 0} position(s) defined
                    </p>
                  </div>
                );
              }}
            </Form.Item>
          </Card>

          <Form.Item
            name="publishImmediately"
            label="Publish Immediately"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.45)",
              marginTop: "-20px",
            }}
          >
            When enabled, the election will be immediately visible to students
            (if visibility is turned on)
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Create New Election</h1>

      <Steps current={current} style={{ marginBottom: 40 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          electionType: "online",
          nominationFeeRequired: true,
          visibility: true,
          automaticRelease: true,
          allowIndependentCandidates: true,
          allowPartyAffiliation: true,
          publishImmediately: false,
        }}
      >
        <div>{steps[current].content}</div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {current > 0 && <Button onClick={prev}>Previous</Button>}

          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={next}
              style={{ marginLeft: "auto" }}
            >
              Next
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "auto" }}
            >
              Create Election
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
