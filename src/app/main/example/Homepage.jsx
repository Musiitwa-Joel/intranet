import { useState, useEffect, useRef } from "react";

import {
  CalendarIcon,
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  DoorOpenIcon,
  UserIcon,
  BuildingIcon,
  InfoIcon,
  TrendingUpIcon,
  CheckIcon,
  PlusIcon,
  XIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import Marquee from "react-fast-marquee";

// Import for charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Clock component with professional styling
const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTimeUnit = (unit) => {
    return unit.toString().padStart(2, "0");
  };

  const hours = time.getHours();
  const minutes = formatTimeUnit(time.getMinutes());
  const seconds = formatTimeUnit(time.getSeconds());
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const dateString = time
    .toLocaleDateString("en-US", dateOptions)
    .toUpperCase();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    timeContainer: {
      display: "flex",
      alignItems: "flex-end",
      gap: "4px",
    },
    timeBox: {
      backgroundColor: "#111827",
      color: "white",
      fontSize: "2.5rem",
      fontFamily: "monospace",
      borderRadius: "6px",
      padding: "4px 8px",
      width: "48px",
      textAlign: "center",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    colon: {
      fontSize: "1.9rem",
      fontWeight: "bold",
      marginBottom: "4px",
    },
    ampm: {
      marginLeft: "4px",
      fontSize: "1.6rem",
      fontWeight: "500",
      color: "#4B5563",
    },
    date: {
      fontSize: "1.9rem",
      color: "#6B7280",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.timeContainer}>
        <div style={styles.timeBox}>{formatTimeUnit(displayHours)}</div>
        <div style={styles.colon}>:</div>
        <div style={styles.timeBox}>{minutes}</div>
        <div style={styles.colon}>:</div>
        <div style={styles.timeBox}>{seconds}</div>
        <div style={styles.ampm}>{ampm}</div>
      </div>
      <div style={styles.date}>{dateString}</div>
    </div>
  );
};

// Task List Component
const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review examination timetables", completed: false },
    { id: 2, text: "Prepare faculty meeting agenda", completed: true },
    { id: 3, text: "Submit monthly attendance report", completed: false },
    { id: 4, text: "Update course materials", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const styles = {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "600",
    },
    addButton: {
      fontSize: "1.3rem",
      color: "#4F46E5",
      display: "flex",
      alignItems: "center",
      transition: "color 0.2s",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    addForm: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      animation: "fadeIn 0.5s ease-out forwards",
    },
    input: {
      flexGrow: 1,
      fontSize: "1.75rem",
      border: "1px solid #E5E7EB",
      borderRadius: "0.375rem 0 0 0.375rem",
      padding: "4px 8px",
      outline: "none",
    },
    addTaskButton: {
      backgroundColor: "#4F46E5",
      color: "white",
      fontSize: "1.75rem",
      padding: "4px 8px",
      borderRadius: "0 0.375rem 0.375rem 0",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    cancelButton: {
      marginLeft: "4px",
      color: "#6B7280",
      padding: "4px",
      borderRadius: "0.375rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      transition: "color 0.2s, background-color 0.2s",
    },
    taskList: {
      flexGrow: 1,
      overflowY: "auto",
    },
    taskItem: {
      display: "flex",
      alignItems: "flex-start",
      padding: "4px 4px",
      borderRadius: "0.375rem",
      transition: "background-color 0.2s",
    },
    checkbox: (completed) => ({
      flexShrink: 0,
      height: "16px",
      width: "16px",
      marginTop: "2px",
      borderRadius: "4px",
      border: completed ? "none" : "1px solid #D1D5DB",
      backgroundColor: completed ? "#4F46E5" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s, border-color 0.2s",
      cursor: "pointer",
    }),
    taskText: (completed) => ({
      marginLeft: "8px",
      fontSize: "1.75rem",
      color: completed ? "#9CA3AF" : "#374151",
      textDecoration: completed ? "line-through" : "none",
      transition: "color 0.2s, text-decoration 0.2s",
    }),
    deleteButton: {
      marginLeft: "auto",
      color: "#9CA3AF",
      background: "none",
      border: "none",
      padding: "0",
      cursor: "pointer",
      opacity: 0,
      transition: "opacity 0.2s, color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tasks</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            style={styles.addButton}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3730A3")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4F46E5")}
          >
            <PlusIcon
              style={{ height: "12px", width: "12px", marginRight: "4px" }}
            />
            Add Task
          </button>
        )}
      </div>

      {isAdding && (
        <div style={styles.addForm}>
          <input
            ref={inputRef}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            style={styles.addTaskButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4338CA")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4F46E5")
            }
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            style={styles.cancelButton}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#6B7280";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <XIcon style={{ height: "12px", width: "12px" }} />
          </button>
        </div>
      )}

      <div style={styles.taskList}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={styles.taskItem}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
                const deleteButton =
                  e.currentTarget.querySelector(".delete-button");
                if (deleteButton) deleteButton.style.opacity = "1";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                const deleteButton =
                  e.currentTarget.querySelector(".delete-button");
                if (deleteButton) deleteButton.style.opacity = "0";
              }}
            >
              <button
                onClick={() => handleToggleTask(task.id)}
                style={styles.checkbox(task.completed)}
              >
                {task.completed && (
                  <CheckIcon
                    style={{ height: "10px", width: "10px", color: "white" }}
                  />
                )}
              </button>
              <span style={styles.taskText(task.completed)}>{task.text}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-button"
                style={styles.deleteButton}
                onMouseOver={(e) => (e.currentTarget.style.color = "#EF4444")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              >
                <TrashIcon style={{ height: "12px", width: "12px" }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Sticky Note Component
const StickyNote = () => {
  const [note, setNote] = useState(
    "Remember to prepare for the faculty meeting on April 22nd. Key points to discuss:\n- New curriculum changes\n- Upcoming accreditation visit\n- Student feedback results"
  );
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const styles = {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FFFBEB",
      borderBottomWidth: "4px",
      borderBottomStyle: "solid",
      borderBottomColor: "#FEF08A",
      borderRadius: "6px",
      transition: "all 0.2s",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px",
      borderBottom: "1px solid #FEF9C3",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "600",
      color: "#92400E",
    },
    editButton: {
      color: "#CA8A04",
      background: "none",
      border: "none",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    content: {
      flexGrow: 1,
      padding: "8px",
    },
    textarea: {
      width: "100%",
      height: "100%",
      fontSize: "1.75rem",
      backgroundColor: "#FFFBEB",
      border: "none",
      outline: "none",
      resize: "none",
    },
    noteText: {
      fontSize: "1.75rem",
      color: "#92400E",
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <div
      style={styles.container}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)")
      }
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={styles.header}>
        <h2 style={styles.title}>Notes</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={styles.editButton}
          onMouseOver={(e) => (e.currentTarget.style.color = "#854D0E")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#CA8A04")}
        >
          <EditIcon style={{ height: "14px", width: "14px" }} />
        </button>
      </div>
      <div style={styles.content}>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.textarea}
          />
        ) : (
          <div style={styles.noteText}>{note}</div>
        )}
      </div>
    </div>
  );
};

// Sample attendance data for charts
const attendanceData = [
  { date: "Apr 09", status: "present", hours: 8.5 },
  { date: "Apr 10", status: "present", hours: 8.2 },
  { date: "Apr 11", status: "present", hours: 8.7 },
  { date: "Apr 12", status: "present", hours: 8.0 },
  { date: "Apr 13", status: "weekend", hours: 0 },
  { date: "Apr 14", status: "present", hours: 8.3 },
  { date: "Apr 15", status: "present", hours: 4.2 }, // Current day (partial)
];

// Attendance summary data for pie chart
const attendanceSummary = [
  { name: "Present", value: 22 },
  { name: "Late", value: 3 },
  { name: "Absent", value: 1 },
  { name: "Leave", value: 2 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171", "#a78bfa"];

// GitHub-style Attendance Heat Map
const AttendanceHeatMap = () => {
  // Generate sample attendance data for the last 365 days
  const generateAttendanceData = () => {
    const data = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Generate random attendance data
      // 0: absent, 1: partial day, 2: normal day, 3: long day, 4: weekend
      let status;

      if (date.getDay() === 0 || date.getDay() === 6) {
        // Weekend
        status = 0;
      } else {
        // Weekday - random status with higher probability of normal attendance
        const rand = Math.random();
        if (rand < 0.1)
          status = 0; // 10% absent
        else if (rand < 0.2)
          status = 1; // 10% partial day
        else if (rand < 0.8)
          status = 2; // 60% normal day
        else status = 3; // 20% long day
      }

      data.push({
        date: date.toISOString().split("T")[0],
        status,
        day: date.getDate(),
        dayOfWeek: date.getDay(),
      });
    }

    return data;
  };

  const attendanceData = generateAttendanceData();

  // Group data by week for display
  const weeks = [];
  let currentWeek = [];

  attendanceData.forEach((day, index) => {
    currentWeek.push(day);

    // Start a new week after 7 days or at the end
    if (currentWeek.length === 7 || index === attendanceData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  // Color mapping for different attendance statuses
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#F3F4F6"; // absent or weekend
      case 1:
        return "#BBF7D0"; // partial day
      case 2:
        return "#4ADE80"; // normal day
      case 3:
        return "#16A34A"; // long day
      default:
        return "#F3F4F6";
    }
  };

  const getStatusTooltip = (status, date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    switch (status) {
      case 0:
        return `No attendance: ${formattedDate}`;
      case 1:
        return `Partial day (4-6 hrs): ${formattedDate}`;
      case 2:
        return `Full day (7-9 hrs): ${formattedDate}`;
      case 3:
        return `Extended day (>9 hrs): ${formattedDate}`;
      default:
        return `${formattedDate}`;
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "500",
      color: "#374151",
    },
    legend: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    legendText: {
      fontSize: "1.3rem",
      color: "#6B7280",
    },
    colorScale: {
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    colorBox: {
      height: "8px",
      width: "8px",
      borderRadius: "2px",
    },
    weeksContainer: {
      display: "flex",
      gap: "2px",
    },
    week: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    day: (color) => ({
      height: "10px",
      width: "10px",
      backgroundColor: color,
      borderRadius: "2px",
      transition: "all 0.2s",
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Yearly Attendance</h3>
        <div style={styles.legend}>
          <span style={styles.legendText}>Less</span>
          <div style={styles.colorScale}>
            <div
              style={{ ...styles.colorBox, backgroundColor: "#F3F4F6" }}
            ></div>
            <div
              style={{ ...styles.colorBox, backgroundColor: "#BBF7D0" }}
            ></div>
            <div
              style={{ ...styles.colorBox, backgroundColor: "#4ADE80" }}
            ></div>
            <div
              style={{ ...styles.colorBox, backgroundColor: "#16A34A" }}
            ></div>
          </div>
          <span style={styles.legendText}>More</span>
        </div>
      </div>

      <div style={styles.weeksContainer}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              const color = getStatusColor(day.status);
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  style={styles.day(color)}
                  title={getStatusTooltip(day.status, day.date)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 0 1px #9CA3AF")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  // Check-in state
  const [checkInStatus, setCheckInStatus] = useState({
    isCheckedIn: true,
    time: "08:45 AM",
    location: "Main Gate",
    date: "MON-APR-15-2025",
  });

  // Stats with proper typing
  const stats = [
    {
      label: "Faculty",
      value: 845,
      icon: (
        <UserIcon style={{ height: "16px", width: "16px", color: "#4F46E5" }} />
      ),
    },

    {
      label: "Courses",
      value: 348,
      icon: (
        <BookOpenIcon
          style={{ height: "16px", width: "16px", color: "#2563EB" }}
        />
      ),
    },
    {
      label: "Departments",
      value: 28,
      icon: (
        <BuildingIcon
          style={{ height: "16px", width: "16px", color: "#7C3AED" }}
        />
      ),
    },
  ];

  // Marquee announcements
  const marqueeItems = [
    "Important: Faculty meeting scheduled for April 22nd at 2:00 PM in Conference Room A",
    "Reminder: End of semester examination timetables have been published",
    "Notice: The main library will be closed for renovations from April 20-25",
    "Alert: New course registration begins on April 18th",
  ];

  const styles = {
    container: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#F9FAFB",
    },
    marquee: {
      backgroundColor: "#EEF2FF",
      border: "1px solid #E0E7FF",
      borderRadius: "6px",
      marginBottom: "16px",
      overflow: "hidden",
      animation: "fadeIn 0.5s ease-out forwards",
    },
    marqueeItem: {
      display: "flex",
      alignItems: "center",
      marginLeft: "32px",
      marginRight: "32px",
    },
    marqueeIcon: {
      height: "14px",
      width: "14px",
      color: "#4F46E5",
      marginRight: "8px",
    },
    marqueeText: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#4338CA",
    },
    gridRow: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    gridCol2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    gridCol3: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "6px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      border: "1px solid #E5E7EB",
      padding: "12px",
    },
    checkInCard: {
      display: "flex",
      alignItems: "center",
      animation: "slideInLeft 0.5s ease-out forwards",
    },
    checkInIcon: {
      padding: "10px",
      borderRadius: "9999px",
      backgroundColor: "#DCFCE7",
    },
    checkInContent: {
      marginLeft: "12px",
    },
    checkInHeader: {
      display: "flex",
      alignItems: "center",
    },
    checkInTitle: {
      fontSize: "1.8rem",
      fontWeight: "500",
      color: "#111827",
    },
    checkInBadge: {
      marginLeft: "8px",
      padding: "2px 6px",
      fontSize: "0.9rem",
      fontWeight: "500",
      backgroundColor: "#DCFCE7",
      color: "#166534",
      borderRadius: "9999px",
    },
    checkInDetails: {
      marginTop: "4px",
      fontSize: "1.75rem",
      color: "#4B5563",
      display: "flex",
      alignItems: "center",
    },
    checkInDetailIcon: {
      height: "14px",
      width: "14px",
      color: "#9CA3AF",
      marginRight: "4px",
    },
    checkInDetailDivider: {
      margin: "0 6px",
      color: "#D1D5DB",
    },
    statCard: {
      display: "flex",
      alignItems: "center",
      animation: "fadeIn 0.5s ease-out forwards",
    },
    statIconContainer: {
      backgroundColor: "#F9FAFB",
      padding: "12px",
      borderRadius: "6px",
    },
    statContent: {
      marginLeft: "12px",
    },
    statValue: {
      fontSize: "1.875rem",
      fontWeight: "600",
    },
    statLabel: {
      fontSize: "1.5rem",
      color: "#6B7280",
    },
    cardTitle: {
      fontSize: "1.875rem",
      fontWeight: "600",
      marginBottom: "8px",
    },
    announcementItem: {
      borderBottom: "1px solid #F3F4F6",
      paddingBottom: "8px",
      marginBottom: "8px",
    },
    announcementHeader: {
      display: "flex",
      alignItems: "center",
    },
    priorityDot: (priority) => ({
      height: "6px",
      width: "6px",
      borderRadius: "9999px",
      marginRight: "6px",
      backgroundColor:
        priority === "high"
          ? "#EF4444"
          : priority === "medium"
            ? "#F59E0B"
            : "#10B981",
    }),
    announcementTitle: {
      fontSize: "1.4rem",
      fontWeight: "500",
      color: "#111827",
    },
    announcementDate: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.0rem",
      color: "#6B7280",
      marginTop: "2px",
      marginBottom: "4px",
    },
    announcementContent: {
      fontSize: "1.2rem",
      color: "#4B5563",
    },
    eventItem: {
      display: "flex",
      alignItems: "flex-start",
      borderBottom: "1px solid #F3F4F6",
      paddingBottom: "8px",
      marginBottom: "8px",
    },
    eventDate: {
      flexShrink: 0,
      backgroundColor: "#EEF2FF",
      border: "1px solid #E0E7FF",
      color: "#4F46E5",
      borderRadius: "6px",
      padding: "4px",
      textAlign: "center",
      marginRight: "8px",
      width: "40px",
      transition: "background-color 0.2s",
    },
    eventDateMonth: {
      fontSize: "1.3rem",
      fontWeight: "500",
    },
    eventDateDay: {
      fontSize: "1.7rem",
      fontWeight: "700",
    },
    eventContent: {
      flexGrow: 1,
    },
    eventTitle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#111827",
    },
    eventTime: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.2rem",
      color: "#6B7280",
      marginTop: "2px",
    },
    eventLocation: {
      fontSize: "1.3rem",
      color: "#6B7280",
      marginTop: "2px",
    },
    chartHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    chartTitle: {
      fontSize: "1.875rem",
      fontWeight: "600",
    },
    chartStats: {
      display: "flex",
      alignItems: "center",
    },
    chartStatsIcon: {
      height: "14px",
      width: "14px",
      color: "#10B981",
      marginRight: "4px",
    },
    chartStatsText: {
      fontSize: "1.2rem",
      color: "#10B981",
    },
    chartContainer: {
      height: "192px",
    },
    pieChartContainer: {
      height: "192px",
      display: "flex",
      alignItems: "center",
    },
    pieChartLeft: {
      width: "50%",
      height: "100%",
    },
    pieChartRight: {
      width: "50%",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "6px",
    },
    legendColor: (color) => ({
      height: "10px",
      width: "10px",
      borderRadius: "2px",
      marginRight: "6px",
      backgroundColor: color,
    }),
    legendText: {
      fontSize: "1.5rem",
    },
    legendTextBold: {
      fontWeight: "500",
    },
    legendTextNormal: {
      color: "#4B5563",
    },
    attendanceRate: {
      marginTop: "12px",
      paddingTop: "8px",
      borderTop: "1px solid #F3F4F6",
    },
    attendanceRateText: {
      fontSize: "1.5rem",
      color: "#6B7280",
    },
    attendanceRateValue: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#10B981",
    },
  };

  // Media query for responsive layout
  const getGridStyle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      return {
        topGrid: { ...styles.gridRow, gridTemplateColumns: "1fr 1fr 1fr" },
        statsGrid: styles.gridCol3,
        contentGrid: styles.gridCol2,
        chartsGrid: styles.gridCol2,
      };
    } else {
      return {
        topGrid: styles.gridRow,
        statsGrid: styles.gridCol3,
        contentGrid: styles.gridRow,
        chartsGrid: styles.gridRow,
      };
    }
  };

  const gridStyle = getGridStyle();

  return (
    <div style={styles.container}>
      {/* Marquee for scrolling information */}
      <div style={styles.marquee}>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          style={{ padding: "6px 0" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {marqueeItems.map((item, index) => (
              <div key={index} style={styles.marqueeItem}>
                <InfoIcon style={styles.marqueeIcon} />
                <span style={styles.marqueeText}>{item}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Top section with check-in status, heat map and clock */}
      <div style={gridStyle.topGrid}>
        {/* Check-in Status Card */}
        <div style={{ ...styles.card, ...styles.checkInCard }}>
          <div
            style={{
              ...styles.checkInIcon,
              backgroundColor: checkInStatus.isCheckedIn
                ? "#DCFCE7"
                : "#FEF9C3",
            }}
          >
            {checkInStatus.isCheckedIn ? (
              <CheckCircleIcon
                style={{ height: "20px", width: "20px", color: "#16A34A" }}
              />
            ) : (
              <DoorOpenIcon
                style={{ height: "20px", width: "20px", color: "#CA8A04" }}
              />
            )}
          </div>
          <div style={styles.checkInContent}>
            <div style={styles.checkInHeader}>
              <h2 style={styles.checkInTitle}>
                {checkInStatus.isCheckedIn ? "Checked In" : "Not Checked In"}
              </h2>
              <span style={styles.checkInBadge}>Active</span>
            </div>
            <div style={styles.checkInDetails}>
              <ClockIcon style={styles.checkInDetailIcon} />
              <span>{checkInStatus.time}</span>
              <span style={styles.checkInDetailDivider}>|</span>
              <DoorOpenIcon style={styles.checkInDetailIcon} />
              <span>{checkInStatus.location}</span>
            </div>
          </div>
        </div>

        {/* Attendance Heat Map */}
        <div
          style={{
            ...styles.card,
            animation: "slideIn 0.5s ease-out forwards",
          }}
        >
          <AttendanceHeatMap />
        </div>

        {/* Digital Clock */}
        <div
          style={{
            ...styles.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "slideInRight 0.5s ease-out forwards",
          }}
        >
          <DigitalClock />
        </div>
      </div>

      {/* Stats Row */}
      <div style={gridStyle.statsGrid}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...styles.statCard,
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div style={styles.statIconContainer}>{stat.icon}</div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{stat.value.toLocaleString()}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Task List and Sticky Note */}
      <div style={gridStyle.contentGrid}>
        {/* Task List */}
        <div
          style={{
            ...styles.card,
            height: "192px",
            animation: "slideInLeft 0.5s ease-out forwards",
          }}
        >
          <TaskList />
        </div>

        {/* Sticky Note */}
        <div
          style={{
            height: "192px",
            animation: "slideInRight 0.5s ease-out forwards",
          }}
        >
          <StickyNote />
        </div>
      </div>

      {/* Main Content Grid - Announcements and Events */}
      <div style={gridStyle.contentGrid}>
        {/* Announcements */}
        <div
          style={{
            ...styles.card,
            animation: "slideInUp 0.5s ease-out forwards",
          }}
        >
          <h2 style={styles.cardTitle}>Announcements</h2>
          <div>
            {[
              {
                title: "End of Semester Examinations",
                date: "May 15, 2025",
                content: "Examination timetables have been published.",
                priority: "high",
              },
              {
                title: "Library Closure",
                date: "April 20, 2025",
                content:
                  "The main library will be closed for renovations from April 20-25.",
                priority: "medium",
              },
              {
                title: "New Course Registration",
                date: "April 18, 2025",
                content:
                  "Registration for new courses will begin on April 18th.",
                priority: "low",
              },
            ].map((announcement, index) => (
              <div
                key={index}
                style={{
                  ...styles.announcementItem,
                  borderBottom: index === 2 ? "none" : "1px solid #F3F4F6",
                  paddingBottom: index === 2 ? "0" : "8px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9FAFB")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div style={styles.announcementHeader}>
                  <div style={styles.priorityDot(announcement.priority)} />
                  <h3 style={styles.announcementTitle}>{announcement.title}</h3>
                </div>
                <div style={styles.announcementDate}>
                  <CalendarIcon
                    style={{
                      height: "12px",
                      width: "12px",
                      marginRight: "4px",
                    }}
                  />
                  {announcement.date}
                </div>
                <p style={styles.announcementContent}>{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          style={{
            ...styles.card,
            animation: "slideInUp 0.5s ease-out forwards",
            animationDelay: "100ms",
          }}
        >
          <h2 style={styles.cardTitle}>Upcoming Events</h2>
          <div>
            {[
              {
                title: "Graduation Ceremony",
                date: "June 10",
                time: "10:00 AM",
                location: "Main Auditorium",
              },
              {
                title: "Career Fair",
                date: "May 5",
                time: "9:00 AM - 4:00 PM",
                location: "Student Center",
              },
              {
                title: "Faculty Meeting",
                date: "April 22",
                time: "2:00 PM",
                location: "Conference Room A",
              },
            ].map((event, index) => (
              <div
                key={index}
                style={{
                  ...styles.eventItem,
                  borderBottom: index === 2 ? "none" : "1px solid #F3F4F6",
                  paddingBottom: index === 2 ? "0" : "8px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#F9FAFB";
                  const dateBox = e.currentTarget.querySelector(".event-date");
                  if (dateBox) dateBox.style.backgroundColor = "#E0E7FF";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  const dateBox = e.currentTarget.querySelector(".event-date");
                  if (dateBox) dateBox.style.backgroundColor = "#EEF2FF";
                }}
              >
                <div className="event-date" style={styles.eventDate}>
                  <div style={styles.eventDateMonth}>
                    {event.date.split(" ")[0]}
                  </div>
                  <div style={styles.eventDateDay}>
                    {event.date.split(" ")[1]}
                  </div>
                </div>
                <div style={styles.eventContent}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <div style={styles.eventTime}>
                    <ClockIcon
                      style={{
                        height: "12px",
                        width: "12px",
                        marginRight: "4px",
                      }}
                    />
                    {event.time}
                  </div>
                  <div style={styles.eventLocation}>{event.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Graphs - Now at the bottom */}
      <div style={gridStyle.chartsGrid}>
        {/* Daily Hours Chart */}
        <div
          style={{
            ...styles.card,
            animation: "slideInUp 0.5s ease-out forwards",
            animationDelay: "200ms",
          }}
        >
          <div style={styles.chartHeader}>
            <h2 style={styles.chartTitle}>Daily Hours</h2>
            <div style={styles.chartStats}>
              <TrendingUpIcon style={styles.chartStatsIcon} />
              <span style={styles.chartStatsText}>+5% vs. last week</span>
            </div>
          </div>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendanceData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: "10px", padding: "4px 8px" }}
                  itemStyle={{ fontSize: "10px" }}
                  labelStyle={{ fontSize: "10px", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="hours"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === "weekend" ? "#e5e7eb" : "#6366f1"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Summary */}
        <div
          style={{
            ...styles.card,
            animation: "slideInUp 0.5s ease-out forwards",
            animationDelay: "300ms",
          }}
        >
          <h2 style={styles.cardTitle}>Monthly Attendance</h2>
          <div style={styles.pieChartContainer}>
            <div style={styles.pieChartLeft}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceSummary}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={300}
                    animationDuration={1500}
                  >
                    {attendanceSummary.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: "10px", padding: "4px 8px" }}
                    itemStyle={{ fontSize: "10px" }}
                    labelStyle={{ fontSize: "10px", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={styles.pieChartRight}>
              <div>
                {attendanceSummary.map((item, index) => (
                  <div key={index} style={styles.legendItem}>
                    <div
                      style={styles.legendColor(COLORS[index % COLORS.length])}
                    />
                    <div style={styles.legendText}>
                      <span style={styles.legendTextBold}>{item.name}: </span>
                      <span style={styles.legendTextNormal}>
                        {item.value} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.attendanceRate}>
                <div style={styles.legendText}>
                  <span style={styles.legendTextBold}>Attendance Rate: </span>
                  <span style={styles.attendanceRateValue}>96%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
