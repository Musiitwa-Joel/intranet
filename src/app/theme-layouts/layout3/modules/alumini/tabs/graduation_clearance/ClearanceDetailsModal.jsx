import React, { useEffect, useState } from "react";
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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Close, Download } from "@mui/icons-material";
import {
  selectClearanceDetailsModalVisible,
  selectSelectedStudent,
  setClearanceDetailsModalVisible,
} from "../../store/alumniSlice";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "@apollo/client";
import { CLEAR_STUDENT_FOR_GRADUATION } from "../../graphql/mutations";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";

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

const ClearanceDetailsModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectClearanceDetailsModalVisible);
  const student = useSelector(selectSelectedStudent);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [clearStdForGraduation, { error, loading }] = useMutation(
    CLEAR_STUDENT_FOR_GRADUATION,
    {
      refetchQueries: ["Load_clearance_students"],
    }
  );

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

  const handleCancel = () => {
    dispatch(setClearanceDetailsModalVisible(false));
  };

  const handleClear = async () => {

    const payload = {
      payload: {
        clearance_id: student.section_id,
        student_no: student.student_no,
        status: "cleared",
      },
    };

    console.log("payload", payload);

    const res = await clearStdForGraduation({
      variables: payload,
    });

    if (res.data?.clearStudentForGraduation) {
      if (res.data?.clearStudentForGraduation.success) {
        // onStatusUpdate("rejected", reason);
        dispatch(setClearanceDetailsModalVisible(false));
        dispatch(
          showMessage({
            message: "The student has been cleared for graduation.",
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

  const alumniPayColumns = [
    {
      title: "Date",
      dataIndex: "rejected_at",
      key: "rejected_at",
      width: "30%",
    },
    {
      title: "Payment Token",
      dataIndex: "prt",
      key: "prt",
      width: "20%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
   
  ];

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
      <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", marginTop: 5 }}
            >
              <Avatar
                size={120}
                src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${student?.student_no}`}
                style={{ marginBottom: 16 }}
              />
              <Typography.Title level={5}>
                {student.student_name}
              </Typography.Title>
              <Tag
                color={
                  student.status === "pending"
                    ? "gold"
                    : student.status === "cleared"
                      ? "green"
                      : "red"
                }
              >
                {student.status?.toUpperCase()}
              </Tag>
            </Card>
          </Col>

          <Col span={16}>
            <Descriptions title="Student Information" column={2} bordered>
              <Descriptions.Item label="Student No">
                {student.student_no}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Course Code">
                {student.course_code}
              </Descriptions.Item>
              <Descriptions.Item label="Campus">
                {student.campus_title}
              </Descriptions.Item>
              <Descriptions.Item label="Study Time">
                {student.study_time_title}
              </Descriptions.Item>
              <Descriptions.Item label="Intake">
                {student.intake_title}
              </Descriptions.Item>
              <Descriptions.Item label="Academic Year" span={2}>
                {student.acc_yr_title}
              </Descriptions.Item>
              <Descriptions.Item label="Course Title" span={2}>
                {student.course_title}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <>
            <Divider orientation="left">Payment Information</Divider>
            <Table
              dataSource={[]}
              columns={alumniPayColumns}
              pagination={false}
              size="small"
            />
          </>

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

        <Divider />

        {student?.status === "pending" && (
          <>
            <Row justify="end" gutter={[16, 16]}>
              <Col>
                <Space>
                  <Button
                    type="primary"
                    onClick={handleClear}
                    disabled={student.status !== "pending" || loading}
                    loading={loading}
                    
                  >
                    Clear Student
                  </Button>
                  <Button
                    danger
                    onClick={handleReject}
                    disabled={student.status !== "pending"}
                  >
                    Reject
                  </Button>
                </Space>
              </Col>
            </Row>
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
          okButtonProps={{ danger: true, loading: loading, disabled: loading }}
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
    </Modal>
  );
};

export default ClearanceDetailsModal;
