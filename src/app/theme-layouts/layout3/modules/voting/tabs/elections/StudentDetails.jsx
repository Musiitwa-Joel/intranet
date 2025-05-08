import { Box } from "@mui/material";
import { Input, Space, Button, Typography, Collapse, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import StudentList from "./StudentList";
import {
  selectallInfoReqs,
  selectLayout,
  selectSelectedStdInfoItem,
  selectStdInfoReqs,
  setLayout,
  setAddCandidateModalVisible,
  searchCandidates,
  reloadCandidates,
  selectStudents,
  setSelectedStudent,
} from "../../store/VotingSlice";
import {
  Refresh,
  Add,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import AddCandidateModal from "./AddCandidateModal";
import StudentInfoModal from "./StudentInfoModal"; // Import the StudentInfoModal

const { Search } = Input;
const { Panel } = Collapse;

function StudentDetails({ panelWidth }) {
  const layout = useSelector(selectLayout);
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedStdInfoItem);
  const { campuses, intakes, acc_yrs } = useSelector(selectallInfoReqs);
  const stdInfoReqs = useSelector(selectStdInfoReqs);
  const [searchValue, setSearchValue] = useState("");
  const students = useSelector(selectStudents);
  const [electionDetailsOpen, setElectionDetailsOpen] = useState(false);

  // Find the campus, intake, and academic year titles
  const campus_title =
    campuses?.find((c) => c.id === stdInfoReqs?.campus)?.campus_title || "MAIN";
  const intake_title =
    intakes?.find((c) => c.id === stdInfoReqs?.intake)?.intake_title ||
    "JANUARY 2025";
  const acc_yr_title =
    acc_yrs?.find((c) => c.id === stdInfoReqs?.acc_yr)?.acc_yr_title ||
    "2024/2025";

  // Mock election details - replace with actual data from your API/state
  const electionDetails = {
    name: selectedItem?.label || "STUDENT COUNCIL ELECTIONS 2024/2025",
    registrationStatus: "ONGOING", // ONGOING, CLOSED, UPCOMING
    electionStatus: "UPCOMING", // UPCOMING, LIVE, COMPLETED
    nominationFee: {
      ugandan: "50,000 UGX",
      eastAfrican: "50,000 UGX",
      international: "50,000 UGX",
    },
    registrationDeadline: "May 15, 2025",
    votingDate: "May 26 2025",
    eligibleVoters: "All registered students",
    maxCandidatesPerPosition: 5,
  };

  const onSearch = (value) => {
    setSearchValue(value);
    dispatch(searchCandidates(value));
  };

  const handleAddCandidate = () => {
    console.log("Current students:", students);
    dispatch(setSelectedStudent(null)); // Reset the selected student
    dispatch(setAddCandidateModalVisible(true));
  };

  const handleReloadCandidates = () => {
    dispatch(reloadCandidates());
  };

  const handleTableLayoutChange = (e) => {
    dispatch(setLayout(e.target.value));
  };

  const toggleElectionDetails = () => {
    setElectionDetailsOpen(!electionDetailsOpen);
  };

  // Helper function to get status tag color
  const getStatusColor = (status) => {
    switch (status) {
      case "ONGOING":
        return "green";
      case "UPCOMING":
        return "blue";
      case "LIVE":
        return "red";
      case "CLOSED":
        return "gray";
      case "COMPLETED":
        return "purple";
      case "PENDING":
        return "orange";
      default:
        return "default";
    }
  };

  return (
    <div
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderColor: "lightgray",
          borderWidth: 1,
        }}
        className="p-5"
        style={{
          paddingLeft: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 15,
          marginBottom: 7,
        }}
      >
        <Typography.Text
          strong
          style={{
            visibility: selectedItem ? "visible" : "hidden",
            fontWeight: "500",
          }}
        >
          {`(${selectedItem?.code}) - ${selectedItem?.label}, ${campus_title} CAMPUS, ${intake_title} INTAKE ${acc_yr_title}`}
        </Typography.Text>
      </Box>
      <div
        style={{
          maxHeight: "calc(100vh - 188px)",
          minHeight: "calc(100vh - 188px)",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "lightgray",
            borderWidth: 1,
          }}
        >
          <div>
            <Space>
              <Search
                placeholder="Search Candidates..."
                onSearch={onSearch}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size="middle"
                width={500}
                style={{
                  width: 250,
                }}
              />
              <Button icon={<Add />} onClick={handleAddCandidate}>
                Add Candidates
              </Button>
              <Button icon={<Refresh />} onClick={handleReloadCandidates}>
                Reload Candidates
              </Button>
            </Space>
          </div>
        </div>

        {/* Election Details Collapsible Section */}
        <div
          style={{
            backgroundColor: "#fff",
            marginTop: 7,
            marginBottom: 7,
            border: "1px solid #f0f0f0",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#fafafa",
            }}
            onClick={toggleElectionDetails}
          >
            <Typography.Text strong style={{ fontSize: 16 }}>
              {electionDetails.name}
            </Typography.Text>
            {electionDetailsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>

          {electionDetailsOpen && (
            <div style={{ padding: "0 16px 16px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "24px",
                  whiteSpace: "nowrap", // optional: prevents wrapping within items
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: "#666" }}>
                    REGISTRATION STATUS
                  </div>
                  <Tag
                    color={getStatusColor(electionDetails.registrationStatus)}
                  >
                    {electionDetails.registrationStatus}
                  </Tag>
                </div>

                <div>
                  <div style={{ fontWeight: 500, color: "#666" }}>
                    ELECTION STATUS
                  </div>
                  <Tag color={getStatusColor(electionDetails.electionStatus)}>
                    {electionDetails.electionStatus}
                  </Tag>
                </div>

                <div>
                  <div style={{ fontWeight: 500, color: "#666" }}>
                    REGISTRATION DEADLINE
                  </div>
                  <div>{electionDetails.registrationDeadline}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 500, color: "#666" }}>
                    VOTING DATE
                  </div>
                  <div>{electionDetails.votingDate}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {layout === "list" && <StudentList />}
      </div>

      {/* Add Candidate Modal */}
      <AddCandidateModal />

      {/* Student Info Modal */}
      <StudentInfoModal />
    </div>
  );
}

export default StudentDetails;
