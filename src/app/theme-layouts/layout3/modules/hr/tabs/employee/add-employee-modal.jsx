import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Divider,
  message,
} from "antd";

import dayjs from "dayjs";

const { Step } = Steps;

const AddEmployeeModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  isEditing,
  form,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      if (isEditing && initialValues) {
        form.setFieldsValue({
          employeeNumber: initialValues.employeeNumber,
          firstName: initialValues.name.split(" ")[0],
          lastName: initialValues.name.split(" ").pop(),
          nationality: initialValues.nationality,
          dateOfBirth: initialValues.dob ? dayjs(initialValues.dob) : null,
          gender: initialValues.gender,
          maritalStatus: initialValues.maritalStatus,
          // Identification
          nationalId: initialValues.identification.nationalId,
          socialInsurance: initialValues.identification.socialInsurance,
          personalTaxId: initialValues.identification.personalTaxId,
          healthInsurance: initialValues.identification.healthInsurance,
          additionalIds: initialValues.identification.additionalIds,
          drivingLicense: initialValues.identification.drivingLicense,
          // Work
          employmentStatus: initialValues.jobDetails.employmentStatus,
          department: initialValues.jobDetails.department,
          jobTitle: initialValues.jobDetails.jobTitle,
          joinedDate: initialValues.joinedDate
            ? dayjs(initialValues.joinedDate)
            : null,
          timezone: initialValues.timezone,
          // Contact
          addressLine1: initialValues.contact.address,
          city: initialValues.contact.city,
          country: initialValues.contact.country,
          postalCode: initialValues.contact.postalCode,
          homePhone: initialValues.contact.homePhone,
          workPhone: initialValues.contact.workPhone,
          privateEmail: initialValues.contact.privateEmail,
          // Report
          manager: initialValues.jobDetails.manager,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, isEditing, initialValues, form]);

  const steps = [
    {
      title: "Personal",
      content: (
        <div style={{ padding: "20px 0" }}>
          <Form.Item
            name="employeeNumber"
            label="Employee Number"
            rules={[
              { required: true, message: "Please enter employee number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter first name" },
              { min: 2, message: "First name must be at least 2 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="middleName" label="Middle Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please enter last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nationality"
            label="Nationality"
            rules={[{ required: true, message: "Please select nationality" }]}
          >
            <Select
              showSearch
              placeholder="Select nationality"
              options={[
                { value: "UGANDAN", label: "Ugandan" },
                { value: "KENYAN", label: "Kenyan" },
                { value: "AMERICAN", label: "American" },
                { value: "BRITISH", label: "British" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select date of birth" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              placeholder="Select Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={[
              { required: true, message: "Please select marital status" },
            ]}
          >
            <Select
              placeholder="Select marital status"
              options={[
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
                { value: "Divorced", label: "Divorced" },
                { value: "Widowed", label: "Widowed" },
              ]}
            />
          </Form.Item>
          <Form.Item name="ethnicity" label="Ethnicity">
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Identification",
      content: (
        <div style={{ padding: "20px 0" }}>
          <Form.Item name="immigrationStatus" label="Immigration Status">
            <Select
              placeholder="Select immigration status"
              options={[
                { value: "Citizen", label: "Citizen" },
                { value: "Permanent Resident", label: "Permanent Resident" },
                { value: "Work Visa", label: "Work Visa" },
                { value: "Student Visa", label: "Student Visa" },
              ]}
            />
          </Form.Item>
          <Form.Item name="personalTaxId" label="Personal Tax ID">
            <Input />
          </Form.Item>
          <Form.Item name="socialInsurance" label="Social Insurance">
            <Input />
          </Form.Item>
          <Form.Item name="nationalId" label="National ID">
            <Input />
          </Form.Item>
          <Form.Item name="additionalIds" label="Additional IDs">
            <Input />
          </Form.Item>
          <Form.Item name="drivingLicense" label="Driving License">
            <Input />
          </Form.Item>
          <Form.Item name="healthInsurance" label="Health Insurance">
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Work",
      content: (
        <div style={{ padding: "20px 0" }}>
          <Form.Item
            name="employmentStatus"
            label="Employment Status"
            rules={[
              { required: true, message: "Please select employment status" },
            ]}
          >
            <Select
              placeholder="Select employment status"
              options={[
                { value: "Full Time", label: "Full Time" },
                { value: "Part Time", label: "Part Time" },
                { value: "Contract", label: "Contract" },
                { value: "Intern", label: "Intern" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please select department" }]}
          >
            <Select
              placeholder="Select department"
              options={[
                { value: "Computing", label: "Computing" },
                { value: "Engineering", label: "Engineering" },
                { value: "Finance", label: "Finance" },
                { value: "Human Resources", label: "Human Resources" },
                { value: "Marketing", label: "Marketing" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="payGrade" label="Pay Grade">
            <Select
              placeholder="Select pay grade"
              options={[
                { value: "A1", label: "A1" },
                { value: "A2", label: "A2" },
                { value: "B1", label: "B1" },
                { value: "B2", label: "B2" },
                { value: "C1", label: "C1" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="joinedDate"
            label="Joined Date"
            rules={[{ required: true, message: "Please select joined date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="confirmationDate" label="Confirmation Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="terminationDate" label="Termination Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="workStationId" label="Work Station ID">
            <Input />
          </Form.Item>
          <Form.Item name="timezone" label="Time Zone">
            <Select
              placeholder="Select timezone"
              options={[
                { value: "UTC", label: "UTC" },
                { value: "Europe/London", label: "Europe/London" },
                { value: "America/New_York", label: "America/New_York" },
                { value: "Asia/Tokyo", label: "Asia/Tokyo" },
                { value: "Africa/Nairobi", label: "Africa/Nairobi" },
              ]}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Contact",
      content: (
        <div style={{ padding: "20px 0" }}>
          <Form.Item name="addressLine1" label="Address Line 1">
            <Input />
          </Form.Item>
          <Form.Item name="addressLine2" label="Address Line 2">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Select
              showSearch
              placeholder="Select country"
              options={[
                { value: "Uganda", label: "Uganda" },
                { value: "Kenya", label: "Kenya" },
                { value: "United States", label: "United States" },
                { value: "United Kingdom", label: "United Kingdom" },
              ]}
            />
          </Form.Item>
          <Form.Item name="province" label="Province">
            <Input />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal/Zip Code">
            <Input />
          </Form.Item>
          <Form.Item name="homePhone" label="Home Phone">
            <Input />
          </Form.Item>
          <Form.Item name="mobilePhone" label="Mobile Phone">
            <Input />
          </Form.Item>
          <Form.Item name="workPhone" label="Work Phone">
            <Input />
          </Form.Item>
          <Form.Item name="workEmail" label="Work Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="privateEmail" label="Private Email">
            <Input type="email" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Report",
      content: (
        <div style={{ padding: "20px 0" }}>
          <Form.Item name="manager" label="Manager">
            <Select
              placeholder="Select manager"
              options={[
                { value: "Musiitwa Joel", label: "Musiitwa Joel" },
                { value: "Muwanga Christopher", label: "Muwanga Christopher" },
              ]}
            />
          </Form.Item>
          <Form.Item name="indirectManagers" label="Indirect Managers">
            <Select
              mode="multiple"
              placeholder="Select indirect managers"
              options={[
                { value: "Musiitwa Joel", label: "Musiitwa Joel" },
                { value: "Muwanga Christopher", label: "Muwanga Christopher" },
                { value: "Tasha Desire", label: "Tasha Desire" },
              ]}
            />
          </Form.Item>
          <Form.Item name="firstLevelApprover" label="First Level Approver">
            <Select
              placeholder="Select first level approver"
              options={[
                { value: "Musiitwa Joel", label: "Musiitwa Joel" },
                { value: "Muwanga Christopher", label: "Muwanga Christopher" },
              ]}
            />
          </Form.Item>
          <Form.Item name="secondLevelApprover" label="Second Level Approver">
            <Select
              placeholder="Select second level approver"
              options={[
                { value: "Musiitwa Joel", label: "Musiitwa Joel" },
                { value: "Muwanga Christopher", label: "Muwanga Christopher" },
              ]}
            />
          </Form.Item>
          <Form.Item name="thirdLevelApprover" label="Third Level Approver">
            <Select
              placeholder="Select third level approver"
              options={[
                { value: "Musiitwa Joel", label: "Musiitwa Joel" },
                { value: "Muwanga Christopher", label: "Muwanga Christopher" },
              ]}
            />
          </Form.Item>
        </div>
      ),
    },
  ];

  const next = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    try {
      setSubmitting(true);
      console.log("Form values:", values); // Log all form values

      // Validate required fields
      if (!values.firstName || !values.lastName) {
        console.error("Missing required fields:", {
          firstName: values.firstName,
          lastName: values.lastName,
        });
        throw new Error("First name and last name are required");
      }

      // Convert DatePicker values to strings
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.format("YYYY-MM-DD")
          : "",
        joinedDate: values.joinedDate
          ? values.joinedDate.format("YYYY-MM-DD")
          : "",
        confirmationDate: values.confirmationDate
          ? values.confirmationDate.format("YYYY-MM-DD")
          : "",
        terminationDate: values.terminationDate
          ? values.terminationDate.format("YYYY-MM-DD")
          : "",
      };

      console.log("Submitting form with values:", formattedValues);
      await onSubmit(formattedValues, isEditing);
      message.success(
        isEditing
          ? "Employee updated successfully"
          : "Employee added successfully"
      );
      onCancel(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error in handleFinish:", error);
      message.error(error.message || "Failed to add/update employee");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Employee" : "Add a New Employee"}
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
      destroyOnClose
    >
      <Steps current={currentStep} style={{ marginBottom: 20 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={(errorInfo) => {
          console.log("Form validation failed:", errorInfo);
        }}
        initialValues={{
          employmentStatus: "Full Time",
          gender: "Male",
          maritalStatus: "Single",
          timezone: "UTC",
        }}
      >
        <div>{steps[currentStep].content}</div>

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" loading={submitting}>
              {isEditing ? "Update" : "Submit"}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
