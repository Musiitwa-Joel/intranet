import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditStudentsRecordsModalVisible,
  setEditStudentRecordsModalVisible,
} from "../../../admissionsSlice";
import { Close } from "@mui/icons-material";
const EditStudentRecordsModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectEditStudentsRecordsModalVisible);

  const handleOk = () => {
    dispatch(setEditStudentRecordsModalVisible(false));
  };
  const handleCancel = () => {
    dispatch(setEditStudentRecordsModalVisible(false));
  };
  return (
    <>
      <Modal
        title={
          <Typography.Text
            style={{
              color: "#fff",
            }}
          >
            {`STUDENT DETAILS`}
          </Typography.Text>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={
          <Close
            style={{
              color: "#fff",
            }}
          />
        }
        styles={{
          body: {
            paddingLeft: 10,
            paddingRight: 10,
            height: "auto",

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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default EditStudentRecordsModal;
