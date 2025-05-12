import { Box } from "@mui/material";
import {
  Input,
  Space,
  Button,
  Typography,
  Collapse,
  message,
  QRCode,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import VoterDataTable from "./VoterDataTable";
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
import { jsPDF } from "jspdf";
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
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const qrCodeRef = useRef(null);
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

  // Generate QR code data URL when component mounts
  useEffect(() => {
    // This function will be called when the QR code is downloaded
    const handleQRCodeDownload = (dataURL) => {
      setQrCodeDataURL(dataURL);
    };

    // Create a hidden QR code and trigger download
    if (qrCodeRef.current) {
      qrCodeRef.current.downloadImage(handleQRCodeDownload);
    }
  }, []);

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

  // Function to export data to PDF with custom header
  const exportToPDF = async () => {
    try {
      if (!tableData.data || tableData.data.length === 0) {
        message.error("No data available to export");
        return;
      }

      // If QR code is not ready yet, generate it
      if (!qrCodeDataURL && qrCodeRef.current) {
        await new Promise((resolve) => {
          qrCodeRef.current.downloadImage((dataURL) => {
            setQrCodeDataURL(dataURL);
            resolve();
          });
        });
      }

      // Create a new PDF document
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Define document dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;

      // Load university logo
      const logoUrl =
        "https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg";
      const logoImg = new Image();
      logoImg.crossOrigin = "Anonymous";

      // Create a promise to handle image loading
      const loadLogoPromise = new Promise((resolve, reject) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => {
          console.error("Error loading logo");
          resolve(); // Resolve anyway to continue with PDF generation
        };
        logoImg.src = logoUrl;
      });

      // Wait for logo to load
      await loadLogoPromise;

      // Add logo to the left
      try {
        const logoWidth = 50; // mm
        const logoHeight = 20; // mm
        doc.addImage(logoImg, "SVG", margin, 10, logoWidth, logoHeight);
      } catch (error) {
        console.error("Error adding logo to PDF:", error);
        // Continue without logo if there's an error
      }

      // Add QR code to the right if available
      if (qrCodeDataURL) {
        try {
          const qrSize = 20; // mm
          doc.addImage(
            qrCodeDataURL,
            "PNG",
            pageWidth - margin - qrSize,
            10,
            qrSize,
            qrSize
          );
        } catch (error) {
          console.error("Error adding QR code to PDF:", error);
          // Continue without QR code if there's an error
        }
      }

      // Add center text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("OFFICE OF THE DEAN OF STUDENTS", pageWidth / 2, 15, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("VOTERS LIST REPORT", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(9);
      doc.text(
        `PRINT DATE: ${new Date().toLocaleString()}`,
        pageWidth / 2,
        25,
        { align: "center" }
      );

      // Add horizontal line
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(margin, 32, pageWidth - margin, 32);

      // Add report details
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);

      const reportDetails = [
        `Election: ${selectedItem?.label || "General Election"}`,
        `Campus: ${campus_title}`,
        `Intake: ${intake_title}`,
        `Academic Year: ${acc_yr_title}`,
        `Total Voters: ${tableData.data.length}`,
      ];

      reportDetails.forEach((detail, index) => {
        doc.text(detail, margin, 40 + index * 5);
      });

      // Calculate voting statistics
      const votedCount = tableData.data.filter(
        (voter) => voter.voting_status === "Voted"
      ).length;
      const notVotedCount = tableData.data.length - votedCount;
      const votedPercentage = (
        (votedCount / tableData.data.length) *
        100
      ).toFixed(1);

      // Add voting statistics
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text("Voting Statistics:", pageWidth - margin - 80, 40);

      doc.setTextColor(0, 128, 0); // Green for voted
      doc.text(
        `Voted: ${votedCount} (${votedPercentage}%)`,
        pageWidth - margin - 80,
        45
      );

      doc.setTextColor(255, 0, 0); // Red for not voted
      doc.text(
        `Not Voted: ${notVotedCount} (${(100 - Number.parseFloat(votedPercentage)).toFixed(1)}%)`,
        pageWidth - margin - 80,
        50
      );

      doc.setTextColor(0, 0, 0); // Reset color

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

      // Create the table
      autoTable(doc, {
        startY: 65,
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
          fillColor: [0, 51, 102], // Dark blue to match university colors
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

      // Add signature section
      const finalY = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(10);
      doc.text("Approved by:", margin, finalY);
      doc.line(margin, finalY + 15, margin + 50, finalY + 15); // Signature line
      doc.text("Dean of Students", margin, finalY + 20);

      doc.text("Date:", 100, finalY);
      doc.line(100, finalY + 15, 150, finalY + 15); // Date line

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pageHeight - 10);
        doc.text(
          "© Nkumba University - Election System",
          margin,
          pageHeight - 10
        );
      }

      // Save the PDF
      doc.save(
        `Nkumba_University_Voters_List_${new Date().toISOString().split("T")[0]}.pdf`
      );
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
      {/* Hidden QR Code for PDF export */}
      <div style={{ display: "none" }}>
        <QRCode
          ref={qrCodeRef}
          size={70}
          bordered={false}
          value="https://nkumbauniversity.ac.ug/"
          type="canvas"
        />
      </div>

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
