import { Box } from "@mui/material";
import { Input, Space, Button, Typography, Collapse, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import VoterDataTable from "./StudentsDataTable";
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
import { Refresh, PictureAsPdf, TableChart } from "@mui/icons-material";
import * as XLSX from "xlsx";
// Import jspdf-autotable correctly
import { jsPDF as JsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
  const [tableData, setTableData] = useState({ data: [], columns: [] });
  const tableRef = useRef(null);

  // Find the campus, intake, and academic year titles
  const campus_title =
    campuses?.find((c) => c.id === stdInfoReqs?.campus)?.campus_title || "MAIN";
  const intake_title =
    intakes?.find((c) => c.id === stdInfoReqs?.intake)?.intake_title ||
    "JANUARY 2025";
  const acc_yr_title =
    acc_yrs?.find((c) => c.id === stdInfoReqs?.acc_yr)?.acc_yr_title ||
    "2024/2025";

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

  // Function to handle data from the VoterDataTable component
  const handleDataReady = (data) => {
    setTableData(data);
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    try {
      if (!tableData.data || tableData.data.length === 0) {
        message.error("No data available to export");
        return;
      }

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Format the data for Excel
      const formattedData = tableData.data.map((voter) => {
        // Create a new object with only the columns we want to export
        return {
          ID: voter.id,
          "Voter Name": voter.name,
          "Voter No": voter.voter_no,
          "Registration No": voter.registration_no,
          "Study Year": voter.study_yr,
          Program: voter.program,
          Email: voter.email,
          Phone: voter.phone,
          Gender: voter.gender,
          "Voting Status": voter.voting_status,
          "Voting Time": voter.voting_time,
        };
      });

      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Voters List");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create a Blob from the buffer
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Voters_List_${new Date().toISOString().split("T")[0]}.xlsx`;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      message.success("Excel file exported successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      message.error("Failed to export Excel file");
    }
  };

  // Function to export data to PDF - Fixed version
  const exportToPDF = () => {
    try {
      if (!tableData.data || tableData.data.length === 0) {
        message.error("No data available to export");
        return;
      }

      // Create a new PDF document using the correct import
      const doc = new JsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Add title and metadata
      const title = "Voters List";
      const subtitle = `${selectedItem?.label || "Election"} - ${campus_title} CAMPUS, ${intake_title} INTAKE ${acc_yr_title}`;
      const date = new Date().toLocaleDateString();

      // Add header image (replace with your actual image URL)
      // Uncomment this when you have the actual image
      // const imgData = 'YOUR_BASE64_IMAGE_DATA';
      // doc.addImage(imgData, 'PNG', 14, 10, 180, 30);

      // Add title and subtitle
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 102); // Dark blue color
      doc.text(title, 14, 30);

      doc.setFontSize(12);
      doc.setTextColor(102, 102, 102); // Gray color
      doc.text(subtitle, 14, 38);
      doc.text(`Generated on: ${date}`, 14, 44);

      // Format the data for PDF
      const formattedData = tableData.data.map((voter) => [
        voter.id,
        voter.name,
        voter.voter_no,
        voter.registration_no,
        voter.study_yr,
        voter.program,
        voter.voting_status,
        voter.voting_time,
      ]);

      // Define table columns
      const tableColumns = [
        "#",
        "Voter Name",
        "Voter No",
        "Registration No",
        "Study Year",
        "Program",
        "Voting Status",
        "Voting Time",
      ];

      // Use autoTable correctly
      autoTable(doc, {
        startY: 50,
        head: [tableColumns],
        body: formattedData,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineColor: [75, 75, 75],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [0, 51, 102],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        // Add conditional styling for voting status
        didDrawCell: (data) => {
          if (data.section === "body" && data.column.index === 6) {
            const status = tableData.data[data.row.index].voting_status;
            if (status === "Voted") {
              doc.setTextColor(0, 128, 0); // Green for voted
            } else {
              doc.setTextColor(255, 0, 0); // Red for not voted
            }
          }
        },
        didParseCell: (data) => {
          // Reset text color after each cell
          doc.setTextColor(0, 0, 0);
        },
      });

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() - 30,
          doc.internal.pageSize.getHeight() - 10
        );
        doc.text(
          "© Tredumo Election System",
          14,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      // Save the PDF
      doc.save(`Voters_List_${new Date().toISOString().split("T")[0]}.pdf`);
      message.success("PDF file exported successfully");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      message.error("Failed to export PDF file: " + error.message);
    }
  };

  return (
    <div
      style={{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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

              <Button icon={<Refresh />} onClick={handleReloadCandidates}>
                Reload Voters
              </Button>
              <Button icon={<PictureAsPdf />} onClick={exportToPDF}>
                Export to PDF
              </Button>
              <Button icon={<TableChart />} onClick={exportToExcel}>
                Export to Excel
              </Button>
            </Space>
          </div>
        </div>

        {layout === "list" && <VoterDataTable onDataReady={handleDataReady} />}
      </div>
    </div>
  );
}

export default StudentDetails;
