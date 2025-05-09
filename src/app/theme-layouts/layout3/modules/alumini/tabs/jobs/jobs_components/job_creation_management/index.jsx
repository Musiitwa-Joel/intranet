import React from "react";
import { useState } from "react";
import { Tabs } from "antd";
import JobDashboard from "./JobDashboard";
import JobManagement from "./JobManagement";

const { TabPane } = Tabs;

// Mock data
const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    description: "We are looking for a Senior Software Engineer...",
    salaryRange: {
      min: 100000,
      max: 150000,
      currency: "UGX",
    },
    location: {
      type: "hybrid",
      address: "123 Tech Street",
      country: "US",
      city: "San Francisco",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: [
        "Bachelor's degree in Computer Science",
        "5+ years experience",
      ],
      experience: "5+ years",
      skills: ["React", "Node.js", "TypeScript"],
    },
    benefits: ["Health Insurance", "401k", "Remote Work"],
    applicationDeadline: "2024-03-31",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job1",
    },
    status: "published",
    priority: "featured",
    company: {
      id: "c1",
      name: "Tech Corp",
      industry: "Technology",
      logo: "data:image/png;base64,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",
      website: "https://techcorp.com",
      linkedIn: "https://linkedin.com/company/techcorp",
      email: "careers@techcorp.com",
      contact: {
        name: "Jane Smith",
        position: "HR Manager",
        email: "jane.smith@techcorp.com",
        phone: "+1234567890",
      },
    },
    tags: ["react", "nodejs", "typescript"],
    createdAt: "2024-02-01",
    updatedAt: "2024-02-20",
    views: 1500,
    applications: 45,
    isAlumniOwned: true,
  },
  {
    id: "2",
    title: "Junior Frontend Developer",
    description: "Join our team as a Junior Frontend Developer...",
    salaryRange: {
      min: 60000,
      max: 90000,
      currency: "UGX",
    },
    location: {
      type: "remote",
      address: "",
      country: "US",
      city: "",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: ["Bachelor's degree in Computer Science"],
      experience: "1+ years",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    benefits: ["Health Insurance", "Remote Work"],
    applicationDeadline: "2024-04-15",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job2",
    },
    status: "published",
    priority: "normal",
    company: {
      id: "c2",
      name: "Web Solutions",
      industry: "Web Development",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQpMmB0xyFjTaJNm3B7vtlK7LjIZcg_TFSg&s",
      website: "https://websolutions.com",
      linkedIn: "https://linkedin.com/company/websolutions",
      email: "careers@websolutions.com",
      contact: {
        name: "John Doe",
        position: "HR Specialist",
        email: "john.doe@websolutions.com",
        phone: "+1234567891",
      },
    },
    tags: ["html", "css", "javascript"],
    createdAt: "2024-02-10",
    updatedAt: "2024-02-25",
    views: 800,
    applications: 30,
    isAlumniOwned: false,
  },
  {
    id: "3",
    title: "Data Scientist",
    description: "We are seeking a Data Scientist to analyze large datasets...",
    salaryRange: {
      min: 120000,
      max: 180000,
      currency: "UGX",
    },
    location: {
      type: "onsite",
      address: "456 Data Lane",
      country: "US",
      city: "New York",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: ["Master's degree in Data Science"],
      experience: "3+ years",
      skills: ["Python", "R", "Machine Learning"],
    },
    benefits: ["Health Insurance", "401k", "Gym Membership"],
    applicationDeadline: "2024-05-01",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job3",
    },
    status: "published",
    priority: "featured",
    company: {
      id: "c3",
      name: "Data Insights",
      industry: "Data Analytics",
      logo: "data:image/png;base64,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",
      website: "https://datainsights.com",
      linkedIn: "https://linkedin.com/company/datainsights",
      email: "careers@datainsights.com",
      contact: {
        name: "Alice Johnson",
        position: "HR Director",
        email: "alice.johnson@datainsights.com",
        phone: "+1234567892",
      },
    },
    tags: ["python", "r", "machine-learning"],
    createdAt: "2024-02-15",
    updatedAt: "2024-03-01",
    views: 1200,
    applications: 50,
    isAlumniOwned: false,
  },
  {
    id: "4",
    title: "Product Manager",
    description:
      "Looking for an experienced Product Manager to lead our team...",
    salaryRange: {
      min: 110000,
      max: 160000,
      currency: "UGX",
    },
    location: {
      type: "hybrid",
      address: "789 Product Road",
      country: "US",
      city: "Los Angeles",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: ["Bachelor's degree in Business Administration"],
      experience: "4+ years",
      skills: ["Product Management", "Agile", "Scrum"],
    },
    benefits: ["Health Insurance", "401k", "Stock Options"],
    applicationDeadline: "2024-06-01",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job4",
    },
    status: "published",
    priority: "normal",
    company: {
      id: "c4",
      name: "Innovatech",
      industry: "Technology",
      logo: "data:image/png;base64,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",
      website: "https://innovatech.com",
      linkedIn: "https://linkedin.com/company/innovatech",
      email: "careers@innovatech.com",
      contact: {
        name: "Michael Brown",
        position: "HR Manager",
        email: "michael.brown@innovatech.com",
        phone: "+1234567893",
      },
    },
    tags: ["product-management", "agile", "scrum"],
    createdAt: "2024-02-20",
    updatedAt: "2024-03-05",
    views: 1000,
    applications: 40,
    isAlumniOwned: true,
  },
  {
    id: "5",
    title: "UX/UI Designer",
    description:
      "We need a creative UX/UI Designer to improve our user experience...",
    salaryRange: {
      min: 90000,
      max: 130000,
      currency: "UGX",
    },
    location: {
      type: "remote",
      address: "",
      country: "US",
      city: "",
    },
    employmentType: "full-time",
    requirements: {
      qualifications: ["Bachelor's degree in Design"],
      experience: "2+ years",
      skills: ["Sketch", "Figma", "Adobe XD"],
    },
    benefits: ["Health Insurance", "Remote Work"],
    applicationDeadline: "2024-07-01",
    applicationMethod: {
      type: "online",
      url: "https://careers.company.com/job5",
    },
    status: "published",
    priority: "normal",
    company: {
      id: "c5",
      name: "Creative Solutions",
      industry: "Design",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjcwy5dmj10gDsGgKIO-KVNR3uUYF_BfTzQ&s",
      website: "https://creativesolutions.com",
      linkedIn: "https://linkedin.com/company/creativesolutions",
      email: "careers@creativesolutions.com",
      contact: {
        name: "Emma Wilson",
        position: "HR Coordinator",
        email: "emma.wilson@creativesolutions.com",
        phone: "+1234567894",
      },
    },
    tags: ["sketch", "figma", "adobe-xd"],
    createdAt: "2024-02-25",
    updatedAt: "2024-03-10",
    views: 900,
    applications: 35,
    isAlumniOwned: false,
  },
];

const mockMetrics = {
  totalJobs: 150,
  activeJobs: 75,
  expiredJobs: 25,
  totalApplications: 1200,
  featuredJobs: 15,
  alumniOwnedJobs: 30,
  averageSalaryRange: {
    min: 80000,
    max: 120000,
    currency: "UGX",
  },
};

const mockIndustryMetrics = [
  {
    industry: "Technology",
    jobCount: 50,
    applicationCount: 500,
    averageSalary: 100000,
  },
  // Add more industry metrics
];

const mockLocationMetrics = [
  { type: "onsite", count: 50, percentage: 33.33 },
  { type: "remote", count: 60, percentage: 40 },
  { type: "hybrid", count: 40, percentage: 26.67 },
];

const mockTrends = [
  {
    date: "2024-01",
    newJobs: 25,
    applications: 200,
    views: 1500,
  },
  // Add more trend data
];

const JobsPage = () => {
  const [jobs, setJobs] = useState(mockJobs);

  const handleCreateJob = (job) => {
    setJobs([...jobs, job]);
  };

  const handleUpdateJob = (id, updatedJob) => {
    setJobs(jobs.map((job) => (job.id === id ? updatedJob : job)));
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <Tabs defaultActiveKey="1" type="card" size="large">
      <TabPane tab="Dashboard" key="1">
        <JobDashboard
          metrics={mockMetrics}
          industryMetrics={mockIndustryMetrics}
          locationMetrics={mockLocationMetrics}
          trends={mockTrends}
        />
      </TabPane>
      <TabPane tab="Job Management" key="2">
        <JobManagement
          jobs={jobs}
          onCreateJob={handleCreateJob}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
        />
      </TabPane>
    </Tabs>
  );
};

export default JobsPage;
