import { useRef, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { List, Typography, Skeleton, Tooltip } from "antd";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadingStudents,
  selectStudents,
  setSelectedStudent,
  setAddCandidateModalVisible,
} from "../../store/VotingSlice";
import { Edit, School, CalendarMonth } from "@mui/icons-material";

// Party color mapping
const partyColors = {
  Independent: "#6c757d",
  "Student Democratic Party": "#0d6efd",
  "Progressive Student Alliance": "#198754",
  "Campus Reform Movement": "#dc3545",
  "Student Unity Coalition": "#6f42c1",
};

// Default color for unknown parties
const defaultPartyColor = "#6c757d";

const StudentList = () => {
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const dispatch = useDispatch();
  const loadingStudents = useSelector(selectLoadingStudents);
  const students = useSelector(selectStudents);

  useEffect(() => {
    if (scrollContainerRef.current) {
      psRef.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 2,
        wheelPropagation: false,
        minScrollbarLength: 20,
      });

      const updateScrollableHeight = () => {
        if (scrollContainerRef.current) {
          const containerHeight = scrollContainerRef.current.clientHeight;
          const contentHeight = scrollContainerRef.current.scrollHeight;
          setScrollableHeight(contentHeight - containerHeight);
        }
      };

      updateScrollableHeight();
      window.addEventListener("resize", updateScrollableHeight);

      return () => {
        if (psRef.current) {
          psRef.current.destroy();
          psRef.current = null;
        }
        window.removeEventListener("resize", updateScrollableHeight);
      };
    }
  }, []);

  useEffect(() => {
    if (psRef.current) {
      psRef.current.update();
    }
  }, [students]);

  useEffect(() => {
    console.log("Students data updated:", students);
    // Force component re-render when students data changes
    if (psRef.current) {
      psRef.current.update();
    }
  }, [students]);

  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (container) {
      const { deltaY } = e;
      const { scrollTop } = container;

      if (
        (deltaY > 0 && scrollTop >= scrollableHeight) ||
        (deltaY < 0 && scrollTop <= 0)
      ) {
        e.preventDefault();
      }
    }
  };

  const handleEditCandidate = (item) => {
    // Set the selected student and open the edit modal
    dispatch(setSelectedStudent(item));
    dispatch(setAddCandidateModalVisible(true));
  };

  // Function to get party color
  const getPartyColor = (party) => {
    return partyColors[party] || defaultPartyColor;
  };

  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: "lightgray",
        marginTop: 7,
      }}
    >
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        style={{
          position: "relative",
          height: "calc(100vh - 260px)",
          backgroundColor: "#fff",
          padding: "16px",
          overflow: "hidden",
        }}
      >
        {loadingStudents ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Paper
                key={item}
                className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden"
              >
                <Skeleton active avatar paragraph={{ rows: 4 }} />
              </Paper>
            ))}
          </div>
        ) : (
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={students}
            locale={{ emptyText: "No candidates found" }}
            renderItem={(item) => {
              const partyColor = getPartyColor(item.party);
              return (
                <List.Item>
                  <Paper
                    className="flex flex-col flex-auto shadow-lg rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl"
                    style={{
                      borderTop: `4px solid ${partyColor}`,
                      transform: "translateY(0)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    }}
                    sx={{
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <div className="relative p-6 flex flex-col items-center">
                      {/* Party Badge */}
                      {item.party && (
                        <div
                          className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium z-30"
                          style={{
                            backgroundColor: partyColor,
                            color: "#fff",
                          }}
                        >
                          {item.party}
                        </div>
                      )}

                      {/* Circular Profile Image */}
                      <div
                        className="rounded-full overflow-hidden border-4 mb-4 shadow-md"
                        style={{
                          borderColor: partyColor,
                          height: 128,
                          width: 128,
                        }}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={
                            item.photo_url ||
                            `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${item.student_no || "/placeholder.svg"}`
                          }
                          alt={
                            item.biodata
                              ? `${item.biodata.surname || ""} ${item.biodata.other_names || ""}`
                              : "Candidate"
                          }
                          onError={(e) => {
                            e.target.src =
                              "/placeholder.svg?height=128&width=128";
                          }}
                        />
                      </div>

                      {/* Candidate Name */}
                      <Typography.Title
                        level={4}
                        className="mt-0 mb-1 text-center"
                        style={{
                          fontWeight: 600,
                          color: "#333",
                        }}
                      >
                        {item.biodata
                          ? `${item.biodata.surname || ""} ${item.biodata.other_names || ""}`
                          : "Unknown Name"}
                      </Typography.Title>

                      {/* Student Number */}
                      <Typography.Text
                        className="font-medium mb-2"
                        style={{ color: partyColor }}
                      >
                        {item.student_no}
                      </Typography.Text>

                      {/* Course and Year Info */}
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <School fontSize="small" style={{ color: "#666" }} />
                        <Typography.Text className="text-gray-600">
                          {item.course?.course_code || "Unknown Course"}
                        </Typography.Text>
                      </div>

                      {item.year && (
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <CalendarMonth
                            fontSize="small"
                            style={{ color: "#666" }}
                          />
                          <Typography.Text className="text-gray-600">
                            {item.year}
                          </Typography.Text>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="w-full px-2 mt-2">
                        {item.biodata?.email && (
                          <Tooltip title={item.biodata.email}>
                            <div className="flex items-center mb-1 overflow-hidden">
                              <FuseSvgIcon
                                size={16}
                                color="action"
                                className="mr-1 flex-shrink-0"
                              >
                                heroicons-solid:mail
                              </FuseSvgIcon>
                              <Typography.Text
                                ellipsis
                                className="text-xs text-gray-500"
                              >
                                {item.biodata.email}
                              </Typography.Text>
                            </div>
                          </Tooltip>
                        )}

                        {item.biodata?.phone && (
                          <Tooltip title={item.biodata.phone}>
                            <div className="flex items-center overflow-hidden">
                              <FuseSvgIcon
                                size={16}
                                color="action"
                                className="mr-1 flex-shrink-0"
                              >
                                heroicons-solid:phone
                              </FuseSvgIcon>
                              <Typography.Text
                                ellipsis
                                className="text-xs text-gray-500"
                              >
                                {item.biodata.phone}
                              </Typography.Text>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    {/* Edit Button */}
                    <button
                      className="w-full py-3 flex items-center justify-center transition-colors duration-150 mt-auto"
                      style={{
                        backgroundColor: partyColor,
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                      onClick={() => handleEditCandidate(item)}
                    >
                      <Edit fontSize="small" style={{ marginRight: 8 }} />
                      Edit Candidate
                    </button>
                  </Paper>
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentList;
