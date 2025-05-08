import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  Col,
  Form,
  Row,
  Modal,
  Typography,
  Card,
  Button,
  Space,
  Input,
  Descriptions,
  Tag,
  Avatar,
  Divider,
  Table,
  Steps,
  theme,
  Checkbox,
  Radio,
  Upload,
  message,
  Alert,
} from "antd";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Webcam from "react-webcam";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Close, Download } from "@mui/icons-material";
import {
  selectClearanceDetailsModalVisible,
  selectSelectedStudent,
  setClearanceDetailsModalVisible,
} from "../../store/graduationSlice";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "@apollo/client";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { CLEAR_STUDENT_FOR_GRADUATION } from "../../../examinations/graphql/mutations";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 2px 10px;
    text-align: left;
    border: 1px solid #ddd;
    color: #000;
  }

  th {
    background-color: #f4f4f4;
    color: #1a4b96;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

// Dummy rejection logs
const rejectionLogs = [
  {
    id: "1",
    clearance_id: "9",
    reject_reason: "Missing library clearance documentation",
    rejected_at: "1744664400000",
    rejected_by: "ADM001",
    rejected_by_user: "John Smith",
  },
  {
    id: "2",
    clearance_id: "9",
    reject_reason: "Incomplete financial records",
    rejected_at: "1744578000000",
    rejected_by: "ADM002",
    rejected_by_user: "Jane Doe",
  },
];

const rejectionColumns = [
  {
    title: "Rejected By",
    dataIndex: "rejected_by_user",
    key: "rejected_by_user",
  },
  {
    title: "Reason",
    dataIndex: "reject_reason",
    key: "reject_reason",
    width: "40%",
  },
  {
    title: "Date",
    dataIndex: "rejected_at",
    key: "rejected_at",
    render: (text) =>
      formatDistanceToNow(parseInt(text), { addSuffix: true }),
  },
];

const ClearanceDetailsModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectClearanceDetailsModalVisible);
  const student = useSelector(selectSelectedStudent);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 75,
    aspect: 3 / 4,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [clearStdForGraduation, { error, loading }] = useMutation(
    CLEAR_STUDENT_FOR_GRADUATION,
    {
      refetchQueries: [
        "Load_clearance_students",
        "global_search_clearance_students",
      ],
    }
  );
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [photoSource, setPhotoSource] = useState("upload"); // 'upload' or 'camera'
  const [showWebcam, setShowWebcam] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const webcamRef = useRef(null);
  const [clearanceData, setClearanceData] = useState({
    biodata: {
      verified: false,
    },
    documents: {
      originalDocumentsVerified: false,
      digitalCopiesMatch: false,
      verifiedDocuments: [],
    },
    photo: {
      graduationPhoto: null,
    },
  });

  useEffect(() => {
    if (student) {
     
      setClearanceData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          originalDocumentsVerified: student?.original_documents_verified,
          digitalCopiesMatch: student?.digital_copies_match,
          verifiedDocuments:  student?.attachments?.map((attachment) => ({
            id: attachment.id,
            description: attachment.description,
            verified: attachment?.verified,
            originalPresented: attachment?.original_presented,
          }))
        },
      }));
    }
  }, [student])

  const validateStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Biodata
        return clearanceData.biodata.verified;
      case 1: // Documents
        if (!student?.attachments?.length) return true; // Skip if no documents
        return (
          clearanceData.documents.originalDocumentsVerified &&
          clearanceData.documents.digitalCopiesMatch &&
          clearanceData.documents.verifiedDocuments.length ===
            student?.attachments?.length
        );
      case 2: // Photo
        return !!clearanceData.photo.graduationPhoto;
      default:
        return false;
    }
  };

  const getCroppedImg = async () => {
    if (!completedCrop || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], "cropped-graduation-photo.jpg", {
              type: "image/jpeg",
            })
          );
        },
        "image/jpeg",
        1
      );
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    dispatch(setClearanceDetailsModalVisible(false));
  };

  const handleClear = async (formData) => {
    const payload = {
      payload: Object.fromEntries(formData),
    };

    console.log("payload", payload);

    const res = await clearStdForGraduation({
      variables: payload,
    });

    console.log("res.data", res.data);

    if (res.data?.clearStudentForGraduation) {
      if (res.data?.clearStudentForGraduation.success) {
        dispatch(setClearanceDetailsModalVisible(false));
        dispatch(
          showMessage({
            message: res.data?.clearStudentForGraduation.message,
            variant: "success",
          })
        );
      }
    }
  };

  const handleReject = () => {
    setIsRejecting(true);
  };

  const handleRejectConfirm = async () => {
    // Handle rejection logic here
    // console.log("Rejecting student:", student.student_no, "Reason:", rejectReason);

    const payload = {
      payload: {
        clearance_id: student.section_id,
        student_no: student.student_no,
        status: "rejected",
        reason: rejectReason,
      },
    };

    const res = await clearStdForGraduation({
      variables: payload,
    });

    //   // console.log("response", res.data);

    if (res.data?.clearStudentForGraduation) {
      if (res.data?.clearStudentForGraduation.success) {
        // onStatusUpdate("rejected", reason);
        setIsRejecting(false);
        setRejectReason("");
        dispatch(setClearanceDetailsModalVisible(false));
        dispatch(
          showMessage({
            message: "The student has been notified of the rejection.",
            variant: "success",
          })
        );
      }
    }
  };

  const steps = [
    {
      title: "Bio data Verification",
      content: (
        <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Card bordered={false} style={{ textAlign: "center" }}>
                <Avatar
                  size={120}
                  src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${student?.student_no}`}
                  style={{ marginBottom: 16 }}
                />
                <Typography.Title level={5}>
                  {student?.student_name}
                </Typography.Title>
                <Tag
                  color={
                    student?.status === "pending"
                      ? "gold"
                      : student?.status === "cleared"
                        ? "green"
                        : "red"
                  }
                >
                  {student?.status?.toUpperCase()}
                </Tag>
              </Card>
            </Col>

            <Col span={16}>
              <Descriptions style={{ marginTop: 15 }} column={2} bordered>
                <Descriptions.Item label="Student No">
                  {student?.student_no}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {student?.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Course Code">
                  {student?.course_code}
                </Descriptions.Item>
                <Descriptions.Item label="Campus">
                  {student?.campus_title}
                </Descriptions.Item>
                <Descriptions.Item label="Study Time">
                  {student?.study_time_title}
                </Descriptions.Item>
                <Descriptions.Item label="Intake">
                  {student?.intake_title}
                </Descriptions.Item>
                <Descriptions.Item label="Academic Year" span={2}>
                  {student?.acc_yr_title}
                </Descriptions.Item>
                <Descriptions.Item label="Course Title" span={2}>
                  {student?.course_title}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>

          {student?.rejection_logs?.length > 0 && (
            <>
              <Divider orientation="left">Rejection History</Divider>
              <Table
                dataSource={student?.rejection_logs || []}
                columns={rejectionColumns}
                pagination={false}
                size="small"
              />
            </>
          )}

          <Modal
            title={
              <span
                style={{
                  color: "#fff",
                }}
              >
                Reject Clearance
              </span>
            }
            open={isRejecting}
            onOk={handleRejectConfirm}
            onCancel={() => setIsRejecting(false)}
            okText="Confirm Rejection"
            okButtonProps={{
              danger: true,
              loading: loading,
              disabled: loading,
            }}
            closeIcon={<Close style={{ color: "#fff" }} />}
            styles={{
              body: {
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                height: "auto",
                // paddingBottom: 10
                // Ensure the content is not clipped
              },
              content: {
                padding: 0,
                height: "auto",
                // Ensure the content is not clipped
              },
              footer: {
                padding: 10,
              },
              header: {
                backgroundColor: "#2f405d",
                padding: "7px 10px",
              },
            }}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Modal>
        </div>
      ),
    },
    {
      title: "Documents Verification",
      content: (
        <>
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ borderColor: "#ddd", color: "#1a4b96" }}
          >
            Required Documents
          </Divider>

          {student?.attachments?.length == 0 ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>
                No documents found. Student should be notified to use their
                student portal to upload all the required documents.
              </p>
            </div>
          ) : (
            <div>
              <Alert
                message="Note: Please ensure that all required documents are available for verification."
                type="info"
                showIcon
                style={{
                  marginBottom: "10px",
                }}
              />
              <StyledTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Document Type</th>
                    <th>Original Presented</th>
                    <th>Digital Copy</th>
                    <th>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {student?.attachments?.map((attachment, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{attachment.description}</td>
                      <td>
                        <Checkbox
                          checked={
                            clearanceData.documents.verifiedDocuments.find(
                              (doc) => doc.id === attachment.id
                            )?.originalPresented || false
                          }
                          onChange={(e) => {
                            setClearanceData((prev) => {
                              const existingDocIndex =
                                prev.documents.verifiedDocuments.findIndex(
                                  (doc) => doc.id === attachment.id
                                );

                              const updatedDocs = [
                                ...prev.documents.verifiedDocuments,
                              ];

                              if (existingDocIndex !== -1) {
                                updatedDocs[existingDocIndex] = {
                                  ...updatedDocs[existingDocIndex],
                                  originalPresented: e.target.checked,
                                };
                              } else {
                                updatedDocs.push({
                                  id: attachment.id,
                                  description: attachment.description,
                                  originalPresented: e.target.checked,
                                  verified: false,
                                });
                              }

                              return {
                                ...prev,
                                documents: {
                                  ...prev.documents,
                                  verifiedDocuments: updatedDocs,
                                },
                              };
                            });
                          }}
                        />
                      </td>
                      <td>
                        <a
                          target="_blank"
                          href={attachment.url}
                          className="text-[#1a4b96]"
                        >
                          {attachment.file_name}
                        </a>
                      </td>
                      <td>
                        <Checkbox
                          checked={
                            clearanceData.documents.verifiedDocuments.find(
                              (doc) => doc.id === attachment.id
                            )?.verified || false
                          }
                          onChange={(e) => {
                            setClearanceData((prev) => {
                              const existingDocIndex =
                                prev.documents.verifiedDocuments.findIndex(
                                  (doc) => doc.id === attachment.id
                                );

                              const updatedDocs = [
                                ...prev.documents.verifiedDocuments,
                              ];

                              if (existingDocIndex !== -1) {
                                updatedDocs[existingDocIndex] = {
                                  ...updatedDocs[existingDocIndex],
                                  verified: e.target.checked,
                                };
                              } else {
                                updatedDocs.push({
                                  id: attachment.id,
                                  description: attachment.description,
                                  originalPresented: false,
                                  verified: e.target.checked,
                                });
                              }

                              return {
                                ...prev,
                                documents: {
                                  ...prev.documents,
                                  verifiedDocuments: updatedDocs,
                                },
                              };
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
              <div style={{ marginTop: 15 }}>
                <Space direction="vertical">
                  <Checkbox
                    checked={
                      clearanceData?.documents?.originalDocumentsVerified
                    }
                    onChange={(e) => {
                      setClearanceData((prev) => ({
                        ...prev,
                        documents: {
                          ...prev.documents,
                          originalDocumentsVerified: e.target.checked,
                        },
                      }));
                    }}
                  >
                    All original documents have been physically verified
                  </Checkbox>
                  <Checkbox
                    checked={
                      clearanceData?.documents?.digitalCopiesMatch
                    }
                    onChange={(e) => {
                      setClearanceData((prev) => ({
                        ...prev,
                        documents: {
                          ...prev.documents,
                          digitalCopiesMatch: e.target.checked,
                        },
                      }));
                    }}
                  >
                    Digital copies match the original documents
                  </Checkbox>
                </Space>
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      title: "Photo Upload",
      content: (
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            maxHeight: "calc(100vh - 300px)",
            overflow: "scroll",
          }}
        >
          <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Radio.Group
                value={photoSource}
                onChange={(e) => {
                  setPhotoSource(e.target.value);
                  setImageSrc(null);
                  setPhotoFile(null);
                }}
                style={{ marginBottom: 16 }}
              >
                <Radio.Button value="upload">
                  <UploadOutlined /> Upload Photo
                </Radio.Button>
                <Radio.Button value="camera">
                  <CameraOutlined /> Take Photo
                </Radio.Button>
              </Radio.Group>

              {photoSource === "upload" ? (
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImageSrc(reader.result);
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                >
                  {!imageSrc && "+ Upload Graduation Photo"}
                </Upload>
              ) : (
                <div style={{ textAlign: "center" }}>
                  {showWebcam ? (
                    <>
                      <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{ maxWidth: "100%", marginBottom: 16 }}
                      />
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => {
                            const imageSrc = webcamRef.current.getScreenshot();
                            setImageSrc(imageSrc);
                            setShowWebcam(false);
                          }}
                        >
                          Capture Photo
                        </Button>
                        <Button onClick={() => setShowWebcam(false)}>
                          Cancel
                        </Button>
                      </Space>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      icon={<CameraOutlined />}
                      onClick={() => setShowWebcam(true)}
                      disabled={imageSrc}
                    >
                      Start Camera
                    </Button>
                  )}
                </div>
              )}

              {imageSrc && (
                <>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={3 / 4}
                  >
                    <img
                      ref={imageRef}
                      src={imageSrc}
                      style={{ maxWidth: "100%" }}
                    />
                  </ReactCrop>
                  <Space style={{ marginTop: 16 }}>
                    <Button
                      type="primary"
                      onClick={async () => {
                        const croppedFile = await getCroppedImg();
                        setPhotoFile(croppedFile);
                        setClearanceData((prev) => ({
                          ...prev,
                          photo: {
                            graduationPhoto: croppedFile,
                          },
                        }));
                        message.success("Photo cropped successfully");
                      }}
                    >
                      Confirm Crop
                    </Button>
                    <Button
                      onClick={() => {
                        setImageSrc(null);
                        setPhotoFile(null);
                        setCrop({
                          unit: "%",
                          width: 75,
                          aspect: 3 / 4,
                        });
                      }}
                    >
                      Reset
                    </Button>
                  </Space>
                </>
              )}

              {photoFile && (
                <Alert
                  message="Photo Requirements"
                  description={
                    <ul>
                      <li>Professional attire required</li>
                      <li>Plain background</li>
                      <li>Good lighting</li>
                      <li>Face clearly visible</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              )}
            </Space>
          </Card>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle = {
    // lineHeight: '260px',
    // textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }
  }, [error]);

  const handleOk = () => {
    dispatch(setClearanceDetailsModalVisible(false));
  };

 

  if (!student) {
    return null;
  }

  return (
    <Modal
      title={
        <Typography.Title
          level={4}
          style={{ color: "#fff", padding: 0, margin: 0 }}
        >
          Student Clearance Details
        </Typography.Title>
      }
      open={isModalOpen}
      maskClosable={false}
      onCancel={handleCancel}
      width={800}
      style={{ top: 50 }}
      closeIcon={<Close style={{ color: "#fff" }} />}
      styles={{
        body: {
          paddingLeft: 10,
          paddingRight: 10,
          height: "auto",
          paddingBottom: 10,
          // Ensure the content is not clipped
        },
        content: {
          padding: 0,
          height: "auto",
          // Ensure the content is not clipped
        },
        footer: {
          padding: 10,
        },
        header: {
          backgroundColor: "#2f405d",
          padding: "7px 10px",
        },
      }}
      footer={null}
    >
      <div
        style={{
          marginTop: 10,
        }}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button type="primary" danger ghost onClick={handleReject}>
              Reject
            </Button>
          </div>

          <div>
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}

            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                type="primary"
                loading={loading}
                disabled={loading}
                onClick={() => {
                  // if (!validateStep(1) || !validateStep(2)) {
                  //   message.error("Please complete all required steps");
                  //   return;
                  // }

                  // Prepare final payload
                  const formData = new FormData();
                  formData.append("clearance_id", student.section_id);
                  formData.append("student_no", student.student_no);
                  formData.append("status", "cleared");
                  formData.append(
                    "documents_verified",
                    JSON.stringify({
                      originalDocumentsVerified:
                        clearanceData.documents.originalDocumentsVerified,
                      digitalCopiesMatch:
                        clearanceData.documents.digitalCopiesMatch,
                      verifiedDocuments:
                        clearanceData.documents.verifiedDocuments,
                    })
                  );
                  formData.append(
                    "graduation_photo",
                    clearanceData.photo.graduationPhoto
                  );

                  console.log("Clearance Data:", {
                    student: student.student_no,
                    biodata: clearanceData.biodata,
                    documents: clearanceData.documents,
                    photo: "Graduation photo file attached",
                  });

                  // Call your mutation here
                  handleClear(formData);
                }}
              >
                Clear Student
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClearanceDetailsModal;
