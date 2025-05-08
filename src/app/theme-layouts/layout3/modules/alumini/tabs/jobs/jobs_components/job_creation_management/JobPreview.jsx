import React from "react";
import { Modal, Tag, Space, Typography, Divider, Row, Col, Button } from "antd";
import {
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  StarOutlined,
  LinkOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const JobPreview = ({ job, open, onClose }) => {
  if (!job) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={1200}
      footer={null}
      className="job-preview-modal"
    >
      <div className="job-preview">
        {/* Header Section */}
        <div className="preview-header">
          <Row gutter={24} align="middle" justify="space-between">
            <Col>
              <div className="company-logo">
                {job.company.logo ? (
                  <img
                    src={job.company.logo || "/placeholder.svg"}
                    alt={job.company.name}
                  />
                ) : (
                  <div className="logo-placeholder">
                    {job.company.name.charAt(0)}
                  </div>
                )}
              </div>
            </Col>
            <Col flex="1">
              <div className="header-content">
                <Title level={2} style={{ marginBottom: 8 }}>
                  {job.title}
                </Title>
                <Space size={16}>
                  <Text strong>{job.company.name}</Text>
                  <Divider type="vertical" />
                  <Text>
                    <EnvironmentOutlined /> {job.location.city},{" "}
                    {job.location.country}
                  </Text>
                  <Divider type="vertical" />
                  <Text>
                    <GlobalOutlined /> {job.location.type}
                  </Text>
                </Space>
              </div>
            </Col>
            <Col>
              <Space direction="vertical" align="end">
                <Tag
                  color="blue"
                  style={{ padding: "4px 12px", fontSize: "14px" }}
                >
                  {job.employmentType}
                </Tag>
                {job.isAlumniOwned && (
                  <Tag
                    icon={<StarOutlined />}
                    color="cyan"
                    style={{ padding: "4px 12px" }}
                  >
                    Alumni Owned
                  </Tag>
                )}
              </Space>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Quick Info Section */}
        <div className="quick-info">
          <Row gutter={[32, 16]} justify="space-between">
            <Col span={8}>
              <div className="info-card salary">
                <Title level={5}>
                  <DollarOutlined /> Salary Range
                </Title>
                <div className="info-value">
                  {job.salaryRange.currency}{" "}
                  {job.salaryRange.min.toLocaleString()} -{" "}
                  {job.salaryRange.max.toLocaleString()}
                </div>
                <div className="info-subtitle">Per Annum</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="info-card deadline">
                <Title level={5}>
                  <ClockCircleOutlined /> Application Deadline
                </Title>
                <div className="info-value">
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
                <div className="info-subtitle">Don't miss out</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="info-card applications">
                <Title level={5}>
                  <TeamOutlined /> Applications
                </Title>
                <div className="info-value">{job.applications}</div>
                <div className="info-subtitle">
                  {job.views} people viewed this job
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Row gutter={24}>
            <Col span={16}>
              {/* Job Description */}
              <div className="content-section">
                <Title level={4}>About the Role</Title>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Requirements */}
              <div className="content-section">
                <Title level={4}>Requirements</Title>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <Title level={5}>Qualifications</Title>
                    <ul className="requirements-list">
                      {job.requirements.qualifications.map((qual, index) => (
                        <li key={index}>{qual}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col span={12}>
                    <Title level={5}>Required Skills</Title>
                    <div className="skills-container">
                      {job.requirements.skills.map((skill, index) => (
                        <Tag key={index} className="skill-tag">
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Benefits */}
              <div className="content-section">
                <Title level={4}>Benefits & Perks</Title>
                <Row gutter={[16, 16]}>
                  {job.benefits.map((benefit, index) => (
                    <Col span={12} key={index}>
                      <div className="benefit-item">
                        <CheckCircleIcon /> {benefit}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* Sidebar */}
            <Col span={8}>
              <div className="sidebar">
                {/* Company Info */}
                <div className="sidebar-section company-info">
                  <Title level={4}>About the Company</Title>
                  <div className="company-details">
                    <Text strong>{job.company.name}</Text>
                    <Text type="secondary" style={{ display: "block" }}>
                      {job.company.industry}
                    </Text>
                    <Space direction="vertical" style={{ marginTop: 16 }}>
                      {job.company.website && (
                        <a
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkOutlined /> Company Website
                        </a>
                      )}
                      {job.company.linkedIn && (
                        <a
                          href={job.company.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkOutlined /> LinkedIn Profile
                        </a>
                      )}
                    </Space>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="sidebar-section contact-info">
                  <Title level={4}>Contact Information</Title>
                  <div className="contact-details">
                    <Paragraph>
                      <strong>{job.company.contact.name}</strong>
                      <br />
                      {job.company.contact.position}
                    </Paragraph>
                    <Space direction="vertical">
                      <Text>
                        <MailOutlined /> {job.company.contact.email}
                      </Text>
                      {job.company.contact.phone && (
                        <Text>
                          <PhoneOutlined /> {job.company.contact.phone}
                        </Text>
                      )}
                    </Space>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="sidebar-section actions">
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<SendOutlined />}
                  >
                    Apply Now
                  </Button>
                  <Space style={{ marginTop: 16 }} wrap>
                    <Button icon={<ShareAltOutlined />}>Share</Button>
                    <Button icon={<PrinterOutlined />}>Print</Button>
                    <Button icon={<SaveOutlined />}>Save</Button>
                  </Space>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <style>{`
        .job-preview-modal .ant-modal-content {
          padding: 0;
          overflow: hidden;
        }

        .job-preview {
          background: #fff;
        }

        .preview-header {
          padding: 32px 40px;
          background: linear-gradient(to right, #f8f9fa, #ffffff);
          border-bottom: 1px solid #f0f0f0;
        }

        .company-logo {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .company-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .logo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          font-size: 36px;
          font-weight: bold;
          color: #999;
        }

        .header-content {
          padding-left: 16px;
        }

        .quick-info {
          padding: 24px 40px;
          background: #fafafa;
        }

        .info-card {
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .info-card .ant-typography {
          margin-bottom: 12px;
          color: #666;
        }

        .info-value {
          font-size: 24px;
          font-weight: 600;
          color: #262626;
          margin-bottom: 4px;
        }

        .info-subtitle {
          font-size: 14px;
          color: #8c8c8c;
        }

        .main-content {
          padding: 40px;
        }

        .content-section {
          margin-bottom: 40px;
        }

        .content-section:last-child {
          margin-bottom: 0;
        }

        .description {
          font-size: 16px;
          line-height: 1.6;
          color: #262626;
        }

        .requirements-list {
          padding-left: 20px;
          margin: 0;
        }

        .requirements-list li {
          margin-bottom: 12px;
          color: #262626;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          padding: 6px 12px;
          font-size: 14px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 14px;
        }

        .sidebar {
          position: sticky;
          top: 24px;
        }

        .sidebar-section {
          padding: 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          margin-bottom: 24px;
        }

        .sidebar-section:last-child {
          margin-bottom: 0;
        }

        .company-details,
        .contact-details {
          margin-top: 16px;
        }

        .actions .ant-btn-primary {
          height: 48px;
          font-size: 16px;
        }

        @media print {
          .job-preview {
            padding: 20px;
          }
        }
      `}</style>
    </Modal>
  );
};

export default JobPreview;

// Helper component for the checkmark icon in benefits
const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#52c41a" }}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
