import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Space, Tag, Tooltip, Avatar, Badge } from "antd";
import {
  School,
  PhotoLibrary,
  Hub,
  Assignment,
  People,
  Settings,
  Dashboard,
  Book,
  Close,
  Fullscreen,
  Download,
} from "@mui/icons-material";

const UserGuideApp = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Sample applications data - replace with your actual apps and PDF paths
  const applications = [
    {
      id: "admissions",
      name: "Admissions",
      description: "Student admission process and requirements",
      logo: "https://tredumo.com/api/module_logos/admissions.png",
      color: "#1976d2",
      pdfUrl: "/assets/pdfs/Admissions.pdf", // Replace with actual PDF path
      category: "Academic",
      lastUpdated: "2024-01-15",
    },
    {
      id: "photo-management",
      name: "Photo Management",
      description: "Manage and organize institutional photos",
      icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
      color: "#388e3c",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Media",
      lastUpdated: "2024-01-10",
    },
    {
      id: "course-hub",
      name: "Course Hub",
      description: "Course management and scheduling system",
      icon: <Hub sx={{ fontSize: 40 }} />,
      color: "#f57c00",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Academic",
      lastUpdated: "2024-01-20",
    },
    {
      id: "course-hubs",
      name: "Course Hub",
      description: "Course management and scheduling system",
      icon: <Hub sx={{ fontSize: 40 }} />,
      color: "#f57c00",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Academic",
      lastUpdated: "2024-01-20",
    },
    {
      id: "assignments",
      name: "Assignments",
      description: "Assignment creation and submission portal",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: "#7b1fa2",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Academic",
      lastUpdated: "2024-01-12",
    },
    {
      id: "user-management",
      name: "User Management",
      description: "Manage users, roles and permissions",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#d32f2f",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Administration",
      lastUpdated: "2024-01-18",
    },
    {
      id: "system-settings",
      name: "System Settings",
      description: "Configure system preferences and settings",
      icon: <Settings sx={{ fontSize: 40 }} />,
      color: "#455a64",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Administration",
      lastUpdated: "2024-01-08",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Main dashboard and analytics overview",
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      color: "#00796b",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Overview",
      lastUpdated: "2024-01-22",
    },
    {
      id: "library",
      name: "Library System",
      description: "Library management and book tracking",
      icon: <Book sx={{ fontSize: 40 }} />,
      color: "#5d4037",
      pdfUrl: "/placeholder.svg?height=800&width=600", // Replace with actual PDF path
      category: "Academic",
      lastUpdated: "2024-01-14",
    },
  ];

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setPdfDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setPdfDialogOpen(false);
    setSelectedApp(null);
    setFullscreen(false);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "blue",
      Media: "green",
      Administration: "red",
      Overview: "purple",
    };
    return colors[category] || "default";
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📚 User Guide Center
          </Typography>
          <Chip
            label={`${applications.length} Applications`}
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Application User Guides
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Click on any application icon to view its user guide documentation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {applications.map((app) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleAppClick(app)}
                  sx={{ height: "100%" }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Badge dot color={getCategoryColor(app.category)}>
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          backgroundColor: app.color,
                          margin: "0 auto 16px auto",
                        }}
                      >
                        {app.logo}
                      </Avatar>
                    </Badge>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {app.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {app.description}
                    </Typography>

                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <Tag color={getCategoryColor(app.category)}>
                        {app.category}
                      </Tag>
                      <Typography variant="caption" color="text.secondary">
                        Updated: {app.lastUpdated}
                      </Typography>
                    </Space>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* PDF Preview Dialog */}
      <Dialog
        open={pdfDialogOpen}
        onClose={handleCloseDialog}
        maxWidth={fullscreen ? false : "lg"}
        fullWidth
        fullScreen={fullscreen}
        PaperProps={{
          sx: {
            height: fullscreen ? "100vh" : "90vh",
          },
        }}
      >
        {selectedApp && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: selectedApp.color,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {selectedApp.icon}
                <Typography variant="h6">
                  {selectedApp.name} - User Guide
                </Typography>
              </Box>
              <Box>
                <Tooltip title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                  <IconButton
                    onClick={toggleFullscreen}
                    sx={{ color: "white" }}
                  >
                    <Fullscreen />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download PDF">
                  <IconButton sx={{ color: "white" }}>
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton
                    onClick={handleCloseDialog}
                    sx={{ color: "white" }}
                  >
                    <Close />
                  </IconButton>
                </Tooltip>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0, height: "100%" }}>
              {/* PDF Preview - Replace with actual PDF viewer */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {/* Replace this with actual PDF embed */}
                <iframe
                  src={selectedApp.pdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title={`${selectedApp.name} User Guide`}
                />
              </Box>
            </DialogContent>

            {!fullscreen && (
              <DialogActions sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                <Button onClick={handleCloseDialog}>Close</Button>
                <Button variant="contained" startIcon={<Download />}>
                  Download PDF
                </Button>
              </DialogActions>
            )}
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserGuideApp;
