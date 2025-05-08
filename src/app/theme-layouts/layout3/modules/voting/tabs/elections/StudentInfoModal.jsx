import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { darken } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Close from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Card from "@mui/material/Card";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";
import {
  selectShowInfoModal,
  selectSelectedStudent,
  setShowInfoModal,
} from "../../store/VotingSlice";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function StudentInfoModal() {
  const modalVisible = useSelector(selectShowInfoModal);
  const selectedStudent = useSelector(selectSelectedStudent);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("manifesto");

  // Handle closing the modal
  const handleClose = () => {
    dispatch(setShowInfoModal(false));
  };

  if (!selectedStudent) {
    return null;
  }

  const fullName = selectedStudent.biodata
    ? `${selectedStudent.biodata.surname || ""} ${selectedStudent.biodata.other_names || ""}`
    : "Unknown Name";

  return (
    <Dialog
      maxWidth="md"
      open={modalVisible}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      style={{
        zIndex: 1300,
      }}
    >
      <Card
        className={clsx("", "shadow")}
        sx={{
          backgroundColor: (theme) =>
            darken(
              theme.palette.background.paper,
              theme.palette.mode === "light" ? 0.01 : 0.1
            ),
          width: "700px",
          maxWidth: "90vw",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1e293b",
          }}
          className="p-10"
          id="draggable-dialog-title"
          style={{
            paddingLeft: 15,
            display: "flex",
            justifyContent: "space-between",
            cursor: "move",
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{
              color: "white",
            }}
          >
            Candidate Details
          </Typography>

          <div
            onClick={handleClose}
            style={{
              color: "white",
              fontSize: 25,
              cursor: "pointer",
            }}
          >
            <Close />
          </div>
        </Box>

        <div
          style={{
            padding: "24px",
            maxHeight: "calc(80vh - 64px)",
            overflow: "auto",
          }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Photo and Basic Info */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${selectedStudent.student_no}`}
                  alt={fullName}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=128&width=128";
                  }}
                />
              </div>

              <Typography.Title
                level={4}
                style={{ margin: "0 0 4px 0", textAlign: "center" }}
              >
                {fullName}
              </Typography.Title>

              <Typography.Text
                style={{
                  fontSize: "16px",
                  color: "#1890ff",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {selectedStudent.student_no}
              </Typography.Text>

              <div className="bg-gray-100 rounded-md p-3 w-full mt-2">
                <Typography.Text
                  strong
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Contact Information
                </Typography.Text>

                {selectedStudent.biodata?.email && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500 mr-2">Email:</span>
                    <Typography.Text
                      copyable={{ text: selectedStudent.biodata.email }}
                    >
                      {selectedStudent.biodata.email}
                    </Typography.Text>
                  </div>
                )}

                {selectedStudent.biodata?.phone && (
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Phone:</span>
                    <Typography.Text
                      copyable={{ text: selectedStudent.biodata.phone }}
                    >
                      {selectedStudent.biodata.phone}
                    </Typography.Text>
                  </div>
                )}
              </div>

              <div className="bg-gray-100 rounded-md p-3 w-full mt-4">
                <Typography.Text
                  strong
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Election Information
                </Typography.Text>

                <div className="flex items-center mb-2">
                  <span className="text-gray-500 mr-2">Party:</span>
                  <span>{selectedStudent.party || "Independent"}</span>
                </div>

                {selectedStudent.election_name && (
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Election:</span>
                    <span>{selectedStudent.election_name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Tabs and Content */}
            <div className="md:w-2/3">
              {/* Custom Tab Navigation */}
              <div className="flex border-b mb-4">
                <div
                  className={`px-4 py-2 cursor-pointer ${
                    activeTab === "manifesto"
                      ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("manifesto")}
                >
                  Manifesto
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer ${
                    activeTab === "academic"
                      ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("academic")}
                >
                  Academic Info
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer ${
                    activeTab === "election"
                      ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("election")}
                >
                  Election Details
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-md shadow-sm p-4">
                {activeTab === "manifesto" && (
                  <div>
                    <Typography.Title
                      level={5}
                      style={{ marginTop: 0, marginBottom: "16px" }}
                    >
                      Campaign Manifesto
                    </Typography.Title>
                    <div
                      className="bg-gray-50 p-4 rounded-md"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {selectedStudent.manifesto || "No manifesto available."}
                    </div>
                  </div>
                )}

                {activeTab === "academic" && (
                  <div>
                    <Typography.Title
                      level={5}
                      style={{ marginTop: 0, marginBottom: "16px" }}
                    >
                      Academic Information
                    </Typography.Title>
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="School">
                        {selectedStudent.course?.course_title ||
                          selectedStudent.course?.course_code ||
                          "Not specified"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Year of Study">
                        {selectedStudent.year || "Not specified"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Student Number">
                        {selectedStudent.student_no}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                )}

                {activeTab === "election" && (
                  <div>
                    <Typography.Title
                      level={5}
                      style={{ marginTop: 0, marginBottom: "16px" }}
                    >
                      Election Details
                    </Typography.Title>
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="Election">
                        {selectedStudent.election_name || "Not specified"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Political Party">
                        {selectedStudent.party || "Independent"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Election ID">
                        {selectedStudent.election_id || "Not specified"}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Dialog>
  );
}

export default StudentInfoModal;
