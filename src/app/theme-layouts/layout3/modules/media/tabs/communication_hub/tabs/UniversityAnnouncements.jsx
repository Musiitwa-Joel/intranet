import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Tabs,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
  Space,
  Table,
  Modal,
  Tooltip,
  Badge,
  Drawer,
  Checkbox,
  List,
  Avatar,
  Menu,
  Descriptions,
  Statistic,
} from "antd";
import {
  SendOutlined,
  MailOutlined,
  UploadOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SaveOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";

// Import our professional email templates
import AdmissionLetter from "../tabs/components/academic/AdmissionLetter";
import SemesterRegistration from "../tabs/components/academic/SemesterRegistration";
import ExamNotification from "../tabs/components/academic/ExamNotification";
import TuitionReminder from "../tabs/components/financial/TuitionReminder";
import PaymentConfirmation from "../tabs/components/financial/PaymentConfirmation";
import HelpdeskTicket from "../tabs/components/support/HelpdeskTicket";
import EventInvitation from "../tabs/components/events/EventInvitation";
import LoginAlert from "../tabs/components/security/LoginAlert";
import BirthdayTemplate from "../tabs/components/special/BirthdayTemplate";
import OtpVerification from "../tabs/components/security/OtpVerification";
import AccountCreation from "../tabs/components/security/AccountCreation";
import PasswordReset from "../tabs/components/security/PasswordReset";
import WelcomeEmail from "../tabs/components/general/WelcomeEmail";
import SystemMaintenance from "../tabs/components/general/SystemMaintenance";
import GradeRelease from "../tabs/components/academic/GradeRelease";
import GeneralInformation from "../tabs/components/general/GeneralInformation";

// Import our template registry
import emailTemplateRegistry from "../tabs/components/integration/EmailTemplateRegistry";

const admissionTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admission Letter</title>
  <style>
    /* General styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    
    /* Container with better width handling */
    .container {
      width: 100%;
      max-width: 800px; /* Increased from 650px */
      margin: 20px auto;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* EmailLayout styles */
    .email-layout {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 30px;
      position: relative;
      overflow: hidden;
    }
    
    /* University logo styles */
    .university-logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: -10px;
      position: relative;
      z-index: 2;
    }
    
    .university-logo {
      width: 180px;
      height: 180px;
      position: relative;
      animation: fadeIn 1.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Decorative corner shapes */
    .corner-shape {
      position: absolute;
      width: 150px;
      height: 150px;
      z-index: 0;
    }
    
    .corner-shape.top-left {
      top: -75px;
      left: -75px;
      background: radial-gradient(circle at bottom right, transparent 70%, rgba(75, 0, 130, 0.1) 70%);
    }
    
    .corner-shape.bottom-right {
      bottom: -75px;
      right: -75px;
      background: radial-gradient(circle at top left, transparent 70%, rgba(75, 0, 130, 0.1) 70%);
    }
    
    /* Header styles with enhanced design */
    .header {
      background-color: #4B0082;
      color: white;
      padding: 18px 20px;
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 30px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(75, 0, 130, 0.3);
    }
    
    /* Header pattern overlay */
    .header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    /* University emblem placeholder */
    .university-emblem {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
    }
    
    /* Enhanced animations */
    @keyframes fadeInDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .header {
      animation: fadeInDown 0.8s ease-out;
    }
    
    /* Content container with better spacing */
    .content {
      position: relative;
      z-index: 1;
    }
    
    .space-y-4 > * {
      margin-bottom: 20px;
    }
    
    /* Text styles */
    .text-gray-700 {
      color: #4b5563;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    /* InfoBox styles with enhanced design */
    .info-box {
      margin: 24px 0;
      padding: 20px;
      border-radius: 10px;
      border-left: 6px solid #4B0082;
      background-color: #f9f5ff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    /* InfoBox pattern overlay */
    .info-box::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234b0082' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(-20px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .info-box {
      animation: slideIn 0.8s ease-out;
    }
    
    /* List styles with enhanced design */
    .list-disc {
      list-style-type: disc;
      padding-left: 25px;
    }
    
    .list-disc > li {
      margin-bottom: 10px;
      position: relative;
    }
    
    .list-decimal {
      list-style-type: decimal;
      padding-left: 25px;
      counter-reset: item;
    }
    
    .list-decimal > li {
      margin-bottom: 12px;
      position: relative;
    }
    
    /* Divider styles with enhanced design */
    .divider {
      height: 2px;
      margin: 30px 0;
      background: linear-gradient(to right, transparent, #4B0082, transparent);
      position: relative;
    }
    
    .divider::before {
      content: "✦";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 0 15px;
      color: #4B0082;
      font-size: 14px;
    }
    
    /* Button styles with enhanced design */
    .button {
      display: inline-block;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      background-color: #4B0082;
      color: white;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(75, 0, 130, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.5s ease;
    }
    
    .button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(75, 0, 130, 0.4);
    }
    
    .button:hover::after {
      left: 100%;
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .my-6 {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    
    /* Contact box with enhanced design */
    .bg-gray-50 {
      background-color: #f9fafb;
      padding: 20px;
      border-radius: 10px;
      color: #4b5563;
      font-size: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px dashed #e5e7eb;
    }
    
    .mt-6 {
      margin-top: 30px;
    }
    
    /* Signature section with animation */
    .signature {
      margin-top: 40px;
      position: relative;
    }
    
    .signature::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 120px;
      height: 2px;
      background-color: #4B0082;
      opacity: 0.3;
    }
    
    /* Footer styles */
    .footer {
      margin-top: 50px;
      border-top: 1px solid rgba(75, 0, 130, 0.2);
      padding-top: 30px;
      position: relative;
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
    }
    
    .footer-column {
      flex: 1;
      min-width: 200px;
    }
    
    .footer-column h4 {
      color: #4B0082;
      font-size: 16px;
      margin-bottom: 15px;
      position: relative;
      display: inline-block;
    }
    
    .footer-column h4::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #4B0082;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: 8px;
    }
    
    .footer-links a {
      color: #4b5563;
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
    }
    
    .footer-links a:hover {
      color: #4B0082;
    }
    
    .footer-links a svg {
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
    
    .footer-social {
      display: flex;
      gap: 12px;
      margin-top: 15px;
    }
    
    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .social-icon:hover {
      color: white;
      transform: translateY(-3px);
    }
    
    .footer-bottom {
      margin-top: 30px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      padding-top: 20px;
      border-top: 1px solid rgba(75, 0, 130, 0.1);
    }
    
    .footer-logo {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    }
    
    .footer-wave {
      position: absolute;
      top: -2px;
      left: 0;
      width: 100%;
      height: 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%234B0082'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%234B0082'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%234B0082'%3E%3C/path%3E%3C/svg%3E");
      background-size: cover;
      background-position: center;
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }
      
      .email-layout {
        padding: 20px;
      }
      
      .header {
        font-size: 18px;
        padding: 15px;
      }
      
      .university-emblem {
        width: 30px;
        height: 30px;
        font-size: 14px;
      }
      
      .university-logo {
        width: 120px;
        height: 120px;
      }
      
      .footer-content {
        flex-direction: column;
      }
      
      .footer-column {
        min-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- EmailLayout component -->
    <div class="email-layout">
      <!-- Decorative corner shapes -->
      <div class="corner-shape top-left"></div>
      <div class="corner-shape bottom-right"></div>
      
      <!-- University Logo -->
      <div class="university-logo-container">
        <!-- Replace this SVG with your actual university logo image -->
       <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="university-logo" />
      </div>
      
      <!-- Header component -->
      <div class="header">
        Admission Offer
        <div class="university-emblem">NU</div>
      </div>

      <div class="content space-y-4">
        <p class="text-gray-700">
          Dear <span class="font-semibold">John Doe</span>,
        </p>

        <p class="text-gray-700">
          Congratulations! We are pleased to inform you that your application to Nkumba University has been successful.
          You have been admitted to the <span class="font-semibold">Bachelor of Science in Computer Science</span> program.
        </p>

        <!-- InfoBox component -->
        <div class="info-box">
          <div class="font-semibold text-gray-800">Program Details</div>
          <div class="text-gray-700">
            <ul class="list-disc pl-5 space-y-2">
              <li>
                <strong>Program:</strong> Bachelor of Science in Computer Science
              </li>
              <li>
                <strong>Start Date:</strong> September 1, 2025
              </li>
              <li>
                <strong>Tuition Fee:</strong> UGX 2,500,000 per semester
              </li>
              <li>
                <strong>Duration:</strong> 4 years (8 semesters)
              </li>
            </ul>
          </div>
        </div>

        <p class="text-gray-700">To secure your place, please complete the following steps:</p>

        <ol class="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Accept this offer by logging into the student portal</li>
          <li>Pay the acceptance fee of UGX 200,000</li>
          <li>Complete the online registration form</li>
          <li>Submit your original academic documents for verification</li>
        </ol>

        <!-- Divider component -->
        <div class="divider"></div>

        <p class="text-gray-700">
          Please note that all steps must be completed by <strong>August 15, 2025</strong>. Failure to complete these
          steps may result in the offer being withdrawn.
        </p>

        <div class="text-center my-6">
          <!-- Button component -->
          <a href="https://portal.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
            Accept Offer & Register
          </a>
        </div>

        <p class="text-gray-700">If you have any questions, please contact the Admissions Office:</p>

        <div class="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> admissions@nkumbauniversity.ac.ug
          </p>
          <p>
            <strong>Phone:</strong> +256 414 123456
          </p>
        </div>

        <div class="signature">
          <p class="text-gray-700 mt-6">We look forward to welcoming you to Nkumba University!</p>

          <p class="text-gray-700">
            Sincerely,
            <br />
            <span class="font-semibold">The Admissions Team</span>
            <br />
            Nkumba University
          </p>
        </div>
        
        <!-- Footer -->
        <footer class="footer">
          <div class="footer-wave"></div>
          <div class="footer-content">
            <div class="footer-column">
              <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University" class="footer-logo" />
              <p class="text-gray-700" style="font-size: 14px;">
                Empowering minds, transforming lives through quality education and research excellence.
              </p>
              <div class="footer-social">
                <a href="#" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50">
<path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
</svg>
                </a>
                <a href="#" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="footer-column">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Academic Programs
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Admissions
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Student Portal
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Campus Life
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h4>Contact Us</h4>
              <ul class="footer-links">
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    P.O. Box 237, Entebbe, Uganda
                  </a>
                </li>
                <li>
                  <a href="tel:+256414123456">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>
                    +256 414 123456
                  </a>
                </li>
                <li>
                  <a href="mailto:info@nkumbauniversity.ac.ug">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                    info@nkumbauniversity.ac.ug
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; Nkumba University. All rights reserved.</p>
            <p>
              <a href="#" style="color: #4B0082; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
              <a href="#" style="color: #4B0082; text-decoration: none; margin: 0 10px;">Terms of Service</a> | 
              <a href="#" style="color: #4B0082; text-decoration: none; margin: 0 10px;">Sitemap</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
  
  <script>
    // Add bounce animation to important elements
    document.addEventListener('DOMContentLoaded', function() {
      // Add bounce animation to the button on page load
      setTimeout(function() {
        const button = document.querySelector('.button');
        button.style.animation = 'bounce 2s ease';
      }, 1500);
      
      // Add pulse animation to the info box on hover
      const infoBox = document.querySelector('.info-box');
      infoBox.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s infinite';
      });
      infoBox.addEventListener('mouseleave', function() {
        this.style.animation = 'slideIn 0.8s ease-out';
      });
    });
  </script>
</body>
</html>
`;
const generalTemplateHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>General Information - Nkumba University</title>
  <style>
    /* General styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    
    /* Container with better width handling */
    .container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* EmailLayout styles */
    .email-layout {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 30px;
      position: relative;
      overflow: hidden;
    }
    
    /* University logo styles */
    .university-logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      position: relative;
      z-index: 2;
    }
    
    .university-logo {
      width: 180px;
      height: 180px;
      position: relative;
      animation: fadeIn 1.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Header styles */
    .header {
      background-color: #4B0082;
      color: white;
      padding: 18px 20px;
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    
    /* Content container with spacing */
    .content {
      position: relative;
      z-index: 1;
    }
    
    .space-y-4 > * {
      margin-bottom: 16px;
    }
    
    /* Text styles */
    .text-gray-700 {
      color: #4b5563;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    /* Divider styles */
    .divider {
      height: 1px;
      margin: 24px 0;
      background: linear-gradient(to right, transparent, #e5e7eb, transparent);
    }
    
    /* Key Information section - exact colors from original */
    .bg-purple-50 {
      background-color: #faf5ff;
      border: 1px solid #e9d8fd;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    
    .text-purple-800 {
      color: #5521b5;
      font-weight: bold;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 16px;
    }
    
    .prose-sm {
      color: #4b5563;
      font-size: 14px;
    }
    
    /* Button styles */
    .button {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      background-color: #4B0082;
      color: white;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    /* InfoBox styles */
    .info-box {
      margin: 24px 0;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #4B0082;
      background-color: #f9f5ff;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
    }
    
    /* List styles */
    .list-disc {
      list-style-type: disc;
      padding-left: 20px;
      margin-top: 8px;
    }
    
    .list-disc > li {
      margin-bottom: 4px;
    }
    
    .space-y-1 > * {
      margin-bottom: 4px;
    }
    
    .mt-2 {
      margin-top: 8px;
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .my-6 {
      margin-top: 24px;
      margin-bottom: 24px;
    }
    
    .mt-4 {
      margin-top: 16px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }
      
      .email-layout {
        padding: 20px;
      }
      
      .header {
        font-size: 18px;
        padding: 15px;
      }
      
      .university-logo {
        width: 120px;
        height: 120px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- EmailLayout component -->
    <div class="email-layout">
      <!-- University Logo -->
      <div class="university-logo-container">
        <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="university-logo" />
      </div>
      
      <!-- Header component -->
      <div class="header">
        Important University Information
      </div>

      <div class="content space-y-4">
        <p class="text-gray-700">
          Dear <span class="font-semibold">John Doe</span>,
        </p>

        <p class="text-gray-700">
          This is an important announcement from Nkumba University. Please read the information below carefully.
        </p>

        <!-- Divider component -->
        <div class="divider"></div>

        <!-- Key Information section - using exact classes from original -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-5 my-6">
          <h3 class="text-purple-800 font-bold text-lg mb-4">
            Key Information
          </h3>
          <div class="prose prose-sm text-gray-700">
            This is an important announcement from Nkumba University. Please read the information below carefully.
          </div>
        </div>

        <div class="text-center my-6">
          <!-- Button component -->
          <a href="https://nkumbauniversity.ac.ug" class="button" style="color: white;">
            Learn More
          </a>
        </div>

        <!-- InfoBox component -->
        <div class="info-box">
          <div class="info-box-title">Need Assistance?</div>
          <p>
            If you have any questions or need further information, please don't
            hesitate to contact us:
          </p>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Email:</strong> info@nkumbauniversity.ac.ug
            </li>
            <li>
              <strong>Phone:</strong> +256 414 123456
            </li>
            <li>
              <strong>Office Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
            </li>
          </ul>
        </div>

        <p class="text-gray-700 mt-4">
          Thank you for your attention to this matter.
        </p>

        <p class="text-gray-700">
          Regards,
          <br />
          <span class="font-semibold">Nkumba University Administration</span>
          <br />
          Nkumba University
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
const semesterRegistration = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semester Registration Reminder - Nkumba University</title>
  <style>
    /* General styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    
    /* Container with better width handling */
    .container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      padding: 0 10px;
      box-sizing: border-box;
    }
    
    /* EmailLayout styles */
    .email-layout {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 25px;
    }
    
    /* University logo styles */
    .university-logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
    }
    
    .university-logo {
      width: 150px;
      height: auto;
    }
    
    /* Header styles - NAVY BLUE */
    .header {
      background-color: #00308F;
      color: white;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 25px;
      border-radius: 5px;
    }
    
    /* Content container with spacing */
    .space-y-4 > * {
      margin-bottom: 16px;
    }
    
    /* Text styles */
    .text-gray-700 {
      color: #4b5563;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    /* InfoBox styles - NAVY BLUE */
    .info-box {
      margin: 20px 0;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #00308F;
      background-color: #f0f7ff;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 10px;
    }
    
    /* Divider styles */
    .divider {
      height: 1px;
      margin: 20px 0;
      background: linear-gradient(to right, transparent, #e5e7eb, transparent);
    }
    
    /* List styles */
    .list-disc {
      list-style-type: disc;
      padding-left: 20px;
    }
    
    .list-disc > li {
      margin-bottom: 8px;
    }
    
    .list-decimal {
      list-style-type: decimal;
      padding-left: 20px;
    }
    
    .list-decimal > li {
      margin-bottom: 8px;
    }
    
    .space-y-2 > * {
      margin-bottom: 8px;
    }
    
    .pl-5 {
      padding-left: 20px;
    }
    
    /* Button styles - NAVY BLUE */
    .button {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      background-color: #00308F;
      color: white;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .my-6 {
      margin-top: 24px;
      margin-bottom: 24px;
    }
    
    .mt-4 {
      margin-top: 16px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-layout {
        padding: 15px;
      }
      
      .header {
        font-size: 18px;
        padding: 12px;
      }
      
      .button {
        display: block;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- EmailLayout component -->
    <div class="email-layout">
      <!-- University Logo -->
      <div class="university-logo-container">
        <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="university-logo" />
      </div>
      
      <!-- Header component - NAVY BLUE -->
      <div class="header">
        Semester Registration Reminder
      </div>

      <div class="space-y-4">
        <p class="text-gray-700">
          Dear <span class="font-semibold">John Doe</span>,
        </p>

        <p class="text-gray-700">
          This is a reminder that registration for the <span class="font-semibold">Fall 2025</span> semester is now
          open. Please complete your registration by <span class="font-semibold">August 15, 2025</span>.
        </p>

        <!-- InfoBox component - NAVY BLUE -->
        <div class="info-box">
          <div class="info-box-title">Important Dates</div>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong>Registration Deadline:</strong> August 15, 2025
            </li>
            <li>
              <strong>Late Registration Period:</strong> Until August 30, 2025 (additional fee of UGX 50,000)
            </li>
            <li>
              <strong>Classes Begin:</strong> September 1, 2025
            </li>
          </ul>
        </div>

        <!-- Divider component -->
        <div class="divider"></div>

        <p class="text-gray-700 font-semibold">Registration Steps:</p>

        <ol class="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Log in to the student portal</li>
          <li>Click on "Registration" in the main menu</li>
          <li>Select your courses for the semester</li>
          <li>Confirm your registration</li>
          <li>Pay the required tuition and fees</li>
          <li>Download and print your course registration form</li>
        </ol>

        <div class="text-center my-6">
          <!-- Button component - NAVY BLUE -->
          <a href="https://portal.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
            Register Now
          </a>
        </div>

        <p class="text-gray-700">
          <strong>Note:</strong> You must clear any outstanding balances before you can register for the new semester.
        </p>

        <!-- InfoBox component - NAVY BLUE -->
        <div class="info-box">
          <div class="info-box-title">Need Help?</div>
          <p>If you encounter any issues during registration, please contact:</p>
          <p>
            <strong>Email:</strong> registrar@nkumbauniversity.ac.ug
          </p>
          <p>
            <strong>Phone:</strong> +256 414 123457
          </p>
          <p>Office hours: Monday to Friday, 8:00 AM to 5:00 PM</p>
        </div>

        <p class="text-gray-700 mt-4">We look forward to seeing you in the upcoming semester!</p>

        <p class="text-gray-700">
          Regards,
          <br />
          <span class="font-semibold">Office of the Registrar</span>
          <br />
          Nkumba University
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
const ExamNotificationHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Examination Schedule - Nkumba University</title>
  <style>
    /* General styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300308F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    
    /* Container with better width handling */
    .container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      padding: 0 15px;
      box-sizing: border-box;
    }
    
    /* EmailLayout styles with enhanced design */
    .email-layout {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 48, 143, 0.15);
      padding: 30px;
      position: relative;
      overflow: hidden;
    }
    
    /* Decorative elements */
    .corner-shape {
      position: absolute;
      z-index: 0;
    }
    
    .corner-shape.top-left {
      top: 0;
      left: 0;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle at top left, rgba(0, 48, 143, 0.08) 0%, rgba(0, 48, 143, 0) 70%);
    }
    
    .corner-shape.bottom-right {
      bottom: 0;
      right: 0;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle at bottom right, rgba(0, 48, 143, 0.08) 0%, rgba(0, 48, 143, 0) 70%);
    }
    
    .exam-icon {
      position: absolute;
      width: 80px;
      height: 80px;
      top: 20px;
      right: 20px;
      opacity: 0.07;
      z-index: 0;
    }
    
    /* University logo styles */
    .university-logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      position: relative;
      z-index: 2;
    }
    
    .university-logo {
      width: 150px;
      height: auto;
      animation: fadeIn 1.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Header styles - NAVY BLUE */
    .header {
      background-color: #00308F;
      color: white;
      padding: 18px 20px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 48, 143, 0.3);
      animation: slideInDown 0.8s ease-out;
    }
    
    /* Header pattern overlay */
    .header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zm20 0l2.83-2.83 1.41 1.41L21.41 4.48H20V3.07zm0 17.76l2.83-2.83 1.41 1.41-2.83 2.83H20v-1.41zm0 17.76l2.83-2.83 1.41 1.41-2.83 2.83H20v-1.41zM40 3.07l-2.83-2.83-1.41 1.41 2.83 2.83H40V3.07zm0 17.76l-2.83-2.83-1.41 1.41 2.83 2.83H40v-1.41zm0 17.76l-2.83-2.83-1.41 1.41 2.83 2.83H40v-1.41z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.4;
    }
    
    /* Content container with spacing */
    .content {
      position: relative;
      z-index: 1;
    }
    
    .space-y-4 > * {
      margin-bottom: 16px;
      animation: fadeInUp 0.8s ease-out both;
      animation-delay: calc(var(--animation-order) * 0.1s);
    }
    
    /* Text styles */
    .text-gray-700 {
      color: #4b5563;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    /* InfoBox styles - NAVY BLUE */
    .info-box {
      margin: 24px 0;
      padding: 20px;
      border-radius: 10px;
      border-left: 5px solid #00308F;
      background-color: #f0f7ff;
      box-shadow: 0 4px 12px rgba(0, 48, 143, 0.08);
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .info-box:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 48, 143, 0.12);
    }
    
    /* InfoBox pattern overlay */
    .info-box::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300308F' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
      z-index: 0;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #00308F;
      margin-bottom: 12px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
    }
    
    .info-box-title::before {
      content: "";
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 8px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300308F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='16' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='8' x2='12.01' y2='8'%3E%3C/line%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    .info-box-content {
      position: relative;
      z-index: 1;
    }
    
    /* Divider styles with enhanced design */
    .divider {
      height: 2px;
      margin: 30px 0;
      background: linear-gradient(to right, transparent, #00308F, transparent);
      position: relative;
      opacity: 0.3;
    }
    
    .divider::before {
      content: "✦";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 0 15px;
      color: #00308F;
      font-size: 14px;
    }
    
    /* List styles with enhanced design */
    .list-disc {
      list-style-type: none;
      padding-left: 5px;
    }
    
    .list-disc > li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;
    }
    
    .list-disc > li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #00308F;
      opacity: 0.7;
    }
    
    .list-decimal {
      list-style-type: none;
      counter-reset: item;
      padding-left: 5px;
    }
    
    .list-decimal > li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 30px;
      counter-increment: item;
    }
    
    .list-decimal > li::before {
      content: counter(item);
      position: absolute;
      left: 0;
      top: 2px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: #00308F;
      color: white;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .space-y-2 > * {
      margin-bottom: 8px;
    }
    
    .pl-5 {
      padding-left: 5px;
    }
    
    /* Button styles with enhanced design */
    .button {
      display: inline-block;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      background-color: #00308F;
      color: white;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(0, 48, 143, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.5s ease;
    }
    
    .button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 48, 143, 0.4);
    }
    
    .button:hover::after {
      left: 100%;
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .my-6 {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    
    .mt-4 {
      margin-top: 16px;
    }
    
    /* Animations */
    @keyframes slideInDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
      
      .email-layout {
        padding: 20px;
      }
      
      .header {
        font-size: 18px;
        padding: 15px;
      }
      
      .university-logo {
        width: 120px;
      }
      
      .exam-icon {
        width: 60px;
        height: 60px;
        top: 15px;
        right: 15px;
      }
      
      .corner-shape.top-left,
      .corner-shape.bottom-right {
        width: 80px;
        height: 80px;
      }
    }
    
    @media (max-width: 480px) {
      .email-layout {
        padding: 15px;
      }
      
      .header {
        font-size: 16px;
        padding: 12px;
      }
      
      .button {
        display: block;
        width: 100%;
        padding: 12px 20px;
      }
      
      .info-box {
        padding: 15px;
      }
      
      .exam-icon {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- EmailLayout component -->
    <div class="email-layout">
      <!-- Decorative corner shapes -->
      <div class="corner-shape top-left"></div>
      <div class="corner-shape bottom-right"></div>
      
      <!-- Exam icon watermark -->
      <svg class="exam-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00308F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      
      <!-- University Logo -->
      <div class="university-logo-container">
        <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="university-logo" />
      </div>
      
      <!-- Header component - NAVY BLUE -->
      <div class="header">
        Examination Schedule
      </div>

      <div class="content space-y-4">
        <p class="text-gray-700" style="--animation-order: 1">
          Dear <span class="font-semibold">John Doe</span>,
        </p>

        <p class="text-gray-700" style="--animation-order: 2">
          This is to inform you that the end-of-semester examinations for
          <span class="font-semibold">Bachelor of Science in Computer Science (Second Year)</span>
          will take place from <span class="font-semibold">November 15, 2025</span> to
          <span class="font-semibold">December 5, 2025</span>.
        </p>

        <!-- InfoBox component - NAVY BLUE -->
        <div class="info-box" style="--animation-order: 3">
          <div class="info-box-title">Examination Requirements</div>
          <div class="info-box-content">
            <ul class="list-disc pl-5 space-y-2">
              <li>Valid student ID card</li>
              <li>Examination card (available for download from the portal)</li>
              <li>Evidence of tuition payment</li>
              <li>Appropriate stationery (pens, pencils, calculators where permitted)</li>
            </ul>
          </div>
        </div>

        <p class="text-gray-700" style="--animation-order: 4">Please note that you must have:</p>

        <ul class="list-disc pl-5 space-y-2 text-gray-700" style="--animation-order: 5">
          <li>Attended at least 75% of classes</li>
          <li>Completed all required coursework and assignments</li>
          <li>Cleared all outstanding fees</li>
        </ul>

        <!-- Divider component -->
        <div class="divider" style="--animation-order: 6"></div>

        <p class="text-gray-700 font-semibold" style="--animation-order: 7">Examination Rules:</p>

        <ol class="list-decimal pl-5 space-y-2 text-gray-700" style="--animation-order: 8">
          <li>Arrive at least 30 minutes before the scheduled start time</li>
          <li>Mobile phones and electronic devices are strictly prohibited in examination rooms</li>
          <li>Follow all instructions given by invigilators</li>
          <li>Any form of academic dishonesty will result in serious disciplinary action</li>
        </ol>

        <div class="text-center my-6" style="--animation-order: 9">
          <!-- Button component - NAVY BLUE -->
          <a href="https://portal.nkumbauniversity.ac.ug/exams/timetable" class="button" style="color: white !important;">
            Download Exam Timetable
          </a>
        </div>

        <p class="text-gray-700" style="--animation-order: 10">
          <strong>Special Arrangements:</strong> If you require any special accommodations due to medical conditions or
          disabilities, please contact the Examinations Office immediately.
        </p>

        <!-- InfoBox component - NAVY BLUE -->
        <div class="info-box" style="--animation-order: 11">
          <div class="info-box-title">Contact Information</div>
          <div class="info-box-content">
            <p>
              <strong>Email:</strong> exams@nkumbauniversity.ac.ug
            </p>
            <p>
              <strong>Phone:</strong> +256 414 123458
            </p>
            <p>
              <strong>Office:</strong> Room 105, Administration Block
            </p>
          </div>
        </div>

        <p class="text-gray-700 mt-4" style="--animation-order: 12">We wish you success in your examinations!</p>

        <p class="text-gray-700" style="--animation-order: 13">
          Sincerely,
          <br />
          <span class="font-semibold">Examinations Office</span>
          <br />
          Nkumba University
        </p>
      </div>
    </div>
  </div>
  
  <script>
    // Add animations and interactivity
    document.addEventListener('DOMContentLoaded', function() {
      // Add pulse animation to the button on page load
      setTimeout(function() {
        const button = document.querySelector('.button');
        button.style.animation = 'pulse 2s ease infinite';
      }, 2000);
      
      // Add hover effect to the info boxes
      const infoBoxes = document.querySelectorAll('.info-box');
      infoBoxes.forEach(function(box) {
        box.addEventListener('mouseenter', function() {
          this.style.borderLeftWidth = '8px';
        });
        
        box.addEventListener('mouseleave', function() {
          this.style.borderLeftWidth = '5px';
        });
      });
    });
  </script>
</body>
</html>
`;
const GradeReleaseHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semester Grades Released</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1rem;
    }
    
    .space-y-2 > * {
      margin-bottom: 0.5rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .my-4 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .list-disc {
      list-style-type: disc;
      padding-left: 1.25rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .text-gray-600 {
      color: #4b5563;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    /* Component styles */
    .header {
      padding: 0.75rem 1rem;
      text-align: center;
      font-weight: bold;
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      background-color: #00308F;
      color: white;
      border-radius: 5px;
      animation: fadeInDown 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .header-shape {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 0;
    }
    
    .shape-1 {
      top: -20px;
      right: -20px;
      animation: float 6s ease-in-out infinite;
    }
    
    .shape-2 {
      bottom: -30px;
      left: 20px;
      width: 40px;
      height: 40px;
      animation: float 8s ease-in-out infinite;
    }
    
    .button-container {
      text-align: center;
      margin: 1.5rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      text-align: center;
      background-color: #00308F;
      color: white;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      animation: pulse 2s infinite;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e5e7eb, transparent);
      margin: 1.5rem 0;
      position: relative;
    }
    
    .divider::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #00308F;
      border-radius: 50%;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      animation: slideAcross 3s ease-in-out infinite;
    }
    
    .info-box {
      margin: 1rem 0;
      padding: 1rem;
      border-radius: 0.375rem;
      border-left: 4px solid #00308F;
      background-color: #f0f7ff;
      animation: slideIn 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      position: relative;
      z-index: 1;
    }
    
    .info-box-shape {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: rgba(0, 48, 143, 0.05);
      z-index: 0;
    }
    
    .info-shape-1 {
      top: -50px;
      right: -50px;
      border-radius: 50%;
    }
    
    .info-shape-2 {
      bottom: -60px;
      left: -60px;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    
    /* Animations */
    @keyframes fadeInDown {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(-10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideAcross {
      0% {
        left: 10%;
      }
      50% {
        left: 90%;
      }
      100% {
        left: 10%;
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
  <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="width: 180px;" class="university-logo" />
  </div>
    <!-- Header -->
    <div class="header">
      <div class="header-shape shape-1"></div>
      <div class="header-shape shape-2"></div>
      <span style="position: relative; z-index: 1;">Fall 2025 Semester Grades Released</span>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        We are pleased to inform you that your grades for the
        <span class="font-semibold">Fall 2025</span> semester have been
        finalized and are now available for viewing on the student portal.
      </p>

      <div class="button-container">
        <a href="https://portal.nkumbauniversity.ac.ug/grades" class="button" style="color: white !important;">
          View Your Grades
        </a>
      </div>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-shape info-shape-1"></div>
        <div class="info-box-shape info-shape-2"></div>
        <div class="info-box-title">Important Dates</div>
        <div style="position: relative; z-index: 1;">
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong>Grade Release Date:</strong> December 20, 2025
            </li>
            <li>
              <strong>Grade Appeal Deadline:</strong> January 10, 2026
            </li>
            <li>
              <strong>Next Semester Registration:</strong> January 15-30, 2026
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <p class="text-gray-700 font-semibold">Academic Standing:</p>

      <p class="text-gray-700">
        Your academic standing will be calculated based on your cumulative
        GPA. Please review the following guidelines:
      </p>

      <ul class="list-disc pl-5 space-y-2 text-gray-700">
        <li>
          <strong>Good Standing:</strong> GPA of 2.0 or higher
        </li>
        <li>
          <strong>Academic Warning:</strong> GPA between 1.7 and 1.99
        </li>
        <li>
          <strong>Academic Probation:</strong> GPA below 1.7
        </li>
      </ul>

      <p class="text-gray-700 mt-4">
        If you believe there has been an error in your grade calculation, you
        may submit a grade appeal by January 10, 2026. The grade appeal
        process can be found on the student portal under "Academic Policies."
      </p>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-shape info-shape-1"></div>
        <div class="info-box-shape info-shape-2"></div>
        <div class="info-box-title">Academic Advising</div>
        <div style="position: relative; z-index: 1;">
          <p>
            We encourage you to schedule a meeting with your academic advisor to
            discuss your academic progress and plan for the upcoming semester.
            Academic advisors will be available for appointments starting
            January 5, 2026.
          </p>
        </div>
      </div>

      <p class="text-gray-700 mt-4">
        If you have any questions about your grades or need assistance, please
        contact the Academic Office:
      </p>

      <div class="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
        <p>
          <strong>Email:</strong> academics@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123457
        </p>
        <p>
          <strong>Office:</strong> Room 205, Academic Building
        </p>
      </div>

      <p class="text-gray-700 mt-4">
        Congratulations on completing the Fall 2025 semester! We wish you
        continued success in your academic journey.
      </p>

      <p class="text-gray-700">
        Sincerely,<br>
        <span class="font-semibold">Office of the Registrar</span><br>
        Nkumba University
      </p>
    </div>
  </div>
</body>
</html>

`;
const TuitionReminderHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tuition Payment Reminder</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-top: 5px solid #1B5E20;
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1rem;
    }
    
    .space-y-2 > * {
      margin-bottom: 0.5rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .my-4 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .list-none {
      list-style-type: none;
      padding-left: 0;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .bg-white {
      background-color: #ffffff;
    }
    
    .text-gray-600 {
      color: #4b5563;
    }
    
    .text-gray-800 {
      color: #1f2937;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .border {
      border-width: 1px;
    }
    
    .border-gray-200 {
      border-color: #e5e7eb;
    }
    
    .shadow-sm {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    /* Grid layout */
    .grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
    
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    /* Component styles */
    .header {
      padding: 0.75rem 1rem;
      text-align: center;
      font-weight: bold;
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      background-color: #1B5E20;
      color: white;
      border-radius: 5px;
      animation: fadeInDown 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .header-shape {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 0;
    }
    
    .shape-1 {
      top: -20px;
      right: -20px;
      animation: float 6s ease-in-out infinite;
    }
    
    .shape-2 {
      bottom: -30px;
      left: 20px;
      width: 40px;
      height: 40px;
      animation: float 8s ease-in-out infinite;
    }
    
    .shape-3 {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      top: 50%;
      left: 30%;
      animation: pulse 4s ease-in-out infinite;
    }
    
    .button-container {
      text-align: center;
      margin: 1.5rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      text-align: center;
      background-color: #1B5E20;
      color: white;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      animation: pulse 2s infinite;
      position: relative;
      overflow: hidden;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e0f2e0, transparent);
      margin: 1.5rem 0;
      position: relative;
    }
    
    .divider::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #1B5E20;
      border-radius: 50%;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      animation: slideAcross 3s ease-in-out infinite;
    }
    
    .info-box {
      margin: 1rem 0;
      padding: 1rem;
      border-radius: 0.375rem;
      border-left: 4px solid #1B5E20;
      background-color: #f0f9f0;
      animation: slideIn 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      position: relative;
      z-index: 1;
    }
    
    .info-box-shape {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: rgba(27, 94, 32, 0.05);
      z-index: 0;
    }
    
    .info-shape-1 {
      top: -50px;
      right: -50px;
      border-radius: 50%;
    }
    
    .info-shape-2 {
      bottom: -60px;
      left: -60px;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    
    .payment-method {
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .payment-method:hover {
      transform: translateY(-5px);
    }
    
    .payment-method::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #1B5E20;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
    
    .payment-method:hover::before {
      transform: scaleX(1);
    }
    
    /* Animations */
    @keyframes fadeInDown {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(-10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideAcross {
      0% {
        left: 10%;
      }
      50% {
        left: 90%;
      }
      100% {
        left: 10%;
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>

  <div class="email-container">
  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
  <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="width: 180px;" class="university-logo" />
  </div>
    <!-- Header -->
    <div class="header">
      <div class="header-shape shape-1"></div>
      <div class="header-shape shape-2"></div>
      <div class="header-shape shape-3"></div>
      <span style="position: relative; z-index: 1;">Tuition Payment Reminder</span>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        This is a reminder that your tuition payment for the <span class="font-semibold">Fall 2025</span>
        semester is due by
        <span class="font-semibold"> August 30, 2025</span>.
      </p>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-shape info-shape-1"></div>
        <div class="info-box-shape info-shape-2"></div>
        <div class="info-box-title">Payment Details</div>
        <div style="position: relative; z-index: 1;">
          <ul class="list-none space-y-2">
            <li>
              <strong>Student ID:</strong> NKU/2025/001234
            </li>
            <li>
              <strong>Amount Due:</strong> UGX 2,500,000
            </li>
            <li>
              <strong>Due Date:</strong> August 30, 2025
            </li>
            <li>
              <strong>Late Payment Fee:</strong> UGX 100,000 after due date
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <p class="text-gray-700 font-semibold">Payment Methods:</p>

      <div class="grid my-4">
        <div class="payment-method bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="font-semibold text-gray-800 mb-2">Bank Transfer</h4>
          <p class="text-sm text-gray-600">
            <strong>Bank:</strong> First National Bank
            <br>
            <strong>Account Name:</strong> Nkumba University
            <br>
            <strong>Account Number:</strong> 1234567890
            <br>
            <strong>Branch Code:</strong> 123456
            <br>
            <strong>Reference:</strong> NKU/2025/001234
          </p>
        </div>

        <div class="payment-method bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="font-semibold text-gray-800 mb-2">Mobile Money</h4>
          <p class="text-sm text-gray-600">
            <strong>Provider:</strong> MTN/Airtel Money
            <br>
            <strong>Business Number:</strong> *185*4*1#
            <br>
            <strong>Merchant Code:</strong> NKUMBA
            <br>
            <strong>Reference:</strong> NKU/2025/001234
          </p>
        </div>
      </div>

      <p class="text-gray-700">
        <strong>Important:</strong> Always include your Student ID (NKU/2025/001234) as the reference for all payments to
        ensure proper crediting to your account.
      </p>

      <div class="button-container">
        <a href="https://finance.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
          Pay Online Now
        </a>
      </div>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-shape info-shape-1"></div>
        <div class="info-box-shape info-shape-2"></div>
        <div class="info-box-title">Payment Plan Options</div>
        <div style="position: relative; z-index: 1;">
          <p>
            If you are unable to pay the full amount by the due date, please contact the Finance Office to discuss
            payment plan options.
          </p>
          <p class="mt-2">
            <strong>Note:</strong> All payment plans must be approved before the payment deadline.
          </p>
        </div>
      </div>

      <p class="text-gray-700">For any questions regarding your tuition or fees, please contact:</p>

      <div class="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
        <p>
          <strong>Email:</strong> finance@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123460
        </p>
        <p>
          <strong>Office Hours:</strong> Monday to Friday, 8:00 AM to 4:00 PM
        </p>
      </div>

      <p class="text-gray-700 mt-4">Thank you for your prompt attention to this matter.</p>

      <p class="text-gray-700">
        Sincerely,<br>
        <span class="font-semibold">Finance Department</span><br>
        Nkumba University
      </p>
    </div>
  </div>
</body>
</html>

`;
const PaymentConfirmationHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231b5e20' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    
    .email-header {
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 25px;
      padding-bottom: 20px;
      position: relative;
    }
    
    .university-logo {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }
    
    .university-name {
      font-size: 22px;
      font-weight: 600;
      color: #1B5E20;
      text-align: center;
      margin: 0;
      letter-spacing: 0.5px;
    }
    
    .department-name {
      font-size: 16px;
      color: #555;
      text-align: center;
      margin: 5px 0 0;
      letter-spacing: 0.3px;
    }
    
    .email-title {
      font-size: 20px;
      font-weight: 600;
      color: #1B5E20;
      text-align: center;
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
      letter-spacing: 0.3px;
      position: relative;
    }
    
    .email-title::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='6' width='20' height='12' rx='2'/%3E%3Cpath d='M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3Cpath d='M17 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3Cpath d='M7 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.2;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .email-title::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='6' width='20' height='12' rx='2'/%3E%3Cpath d='M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3Cpath d='M17 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3Cpath d='M7 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.2;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .text-gray-700 {
      color: #444;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .rounded-md {
      border-radius: 4px;
    }
    
    .rounded-lg {
      border-radius: 4px;
    }
    
    .rounded-full {
      border-radius: 9999px;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .bg-green-50 {
      background-color: #f0f9f0;
    }
    
    .bg-green-100 {
      background-color: #dcf0dc;
    }
    
    .border {
      border-width: 1px;
    }
    
    .border-green-200 {
      border-color: #c6e6c6;
    }
    
    .text-green-700 {
      color: #15803d;
    }
    
    .text-green-800 {
      color: #166534;
    }
    
    .text-gray-600 {
      color: #555;
    }
    
    .text-gray-800 {
      color: #333;
    }
    
    .text-sm {
      font-size: 0.9rem;
    }
    
    .text-lg {
      font-size: 1.125rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .font-bold {
      font-weight: 700;
    }
    
    .px-3 {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    
    .py-1 {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    
    /* Grid layout */
    .grid {
      display: grid;
      gap: 0.75rem;
    }
    
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .flex {
      display: flex;
    }
    
    .justify-between {
      justify-content: space-between;
    }
    
    .items-center {
      align-items: center;
    }
    
    /* Component styles */
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 1.5rem 0;
      position: relative;
    }
    
    .divider::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='10'%3E%3Cpath d='M0 5 L100 5' stroke='%231B5E20' stroke-width='1' stroke-dasharray='1 5' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      left: 50%;
      top: -5px;
      transform: translateX(-50%);
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 4px;
      border-left: 3px solid #1B5E20;
      background-color: #f9fcf9;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -30px;
      bottom: -30px;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #1B5E20;
      margin-bottom: 0.75rem;
      font-size: 1.05rem;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.75rem;
      border-radius: 4px;
      font-weight: 500;
      text-align: center;
      background-color: #1B5E20;
      color: white;
      text-decoration: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      transition: background-color 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    
    .button:hover {
      background-color: #154a19;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.03) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .contact-info {
      background-color: #f9fcf9;
      border: 1px solid #e0e9e0;
      padding: 1rem;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .contact-info::before {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -20px;
      bottom: -20px;
    }
    
    .footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .signature {
      margin-top: 1.5rem;
    }
    
    .receipt {
      background-color: #f0f9f0;
      border: 1px solid #c6e6c6;
      border-radius: 4px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .receipt::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231b5e20' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    .receipt-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }
    
    .receipt-title {
      color: #166534;
      font-weight: 700;
      font-size: 1.125rem;
      margin: 0;
    }
    
    .receipt-status {
      background-color: #dcf0dc;
      color: #15803d;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    
    .receipt-status::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #15803d;
      border-radius: 50%;
      margin-right: 6px;
    }
    
    .receipt-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      font-size: 0.9rem;
      position: relative;
      z-index: 1;
    }
    
    .receipt-label {
      color: #555;
    }
    
    .receipt-value {
      font-weight: 500;
      color: #333;
    }
    
    .receipt-watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 5rem;
      font-weight: 700;
      color: rgba(27, 94, 32, 0.03);
      white-space: nowrap;
      pointer-events: none;
    }
    
    .money-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      opacity: 0.1;
    }
    
    .money-icon-1 {
      top: 20px;
      right: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 6v12M8 12h8'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    .money-icon-2 {
      bottom: 20px;
      left: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B5E20' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .receipt-grid {
        grid-template-columns: 1fr;
      }
      
      .receipt-label {
        font-weight: 600;
        margin-bottom: 0.125rem;
      }
      
      .receipt-value {
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed rgba(27, 94, 32, 0.1);
      }
      
      .receipt-grid > div:nth-child(even) .receipt-value {
        border-bottom: none;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <div class="university-logo" style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
        <!-- University Logo Placeholder -->
      <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="width: 180px;" class="university-logo" />
      </div>
 

    <h2 class="email-title">PAYMENT CONFIRMATION</h2>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        Thank you for your payment. We are writing to confirm that we have received your payment for the Fall 2025
        semester.
      </p>

      <!-- Receipt -->
      <div class="receipt">
        <div class="receipt-watermark">PAID</div>
        <div class="receipt-header">
          <h3 class="receipt-title">Payment Receipt</h3>
          <span class="receipt-status">Confirmed</span>
        </div>

        <div class="receipt-grid">
          <div class="receipt-label">Student ID:</div>
          <div class="receipt-value">NKU/2025/001234</div>

          <div class="receipt-label">Amount Paid:</div>
          <div class="receipt-value">UGX 1,500,000</div>

          <div class="receipt-label">Payment Date:</div>
          <div class="receipt-value">August 15, 2025</div>

          <div class="receipt-label">Payment Method:</div>
          <div class="receipt-value">Mobile Money</div>

          <div class="receipt-label">Transaction Reference:</div>
          <div class="receipt-value">TXN123456789</div>

          <div class="receipt-label">Remaining Balance:</div>
          <div class="receipt-value">UGX 1,000,000</div>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-title">Remaining Balance</div>
        <p>
          You have a remaining balance of <strong>UGX 1,000,000</strong> for the Fall 2025 semester.
        </p>
        <p class="mt-2">
          Please ensure this amount is paid by <strong>September 30, 2025</strong> to avoid late payment fees.
        </p>
      </div>

      <div class="button-container">
        <a href="https://finance.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
          View Account Statement
        </a>
      </div>

      <p class="text-gray-700">
        If you have any questions about this payment or your account, please contact the Finance Office:
      </p>

      <div class="contact-info text-gray-600 text-sm">
        <p>
          <strong>Email:</strong> finance@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123460
        </p>
        <p>
          <strong>Office Hours:</strong> Monday to Friday, 8:00 AM to 4:00 PM
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700">Thank you for your payment.</p>

        <div class="signature">
          <p class="text-gray-700">
            Sincerely,<br>
            <span class="font-semibold">Finance Department</span><br>
            Nkumba University
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

`;
const SupportTicketHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Support Ticket Update</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236200ea' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    
    .email-header {
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 25px;
      padding-bottom: 20px;
      position: relative;
    }
    
    .university-logo {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }
    
    .university-name {
      font-size: 22px;
      font-weight: 600;
      color: #6200ea;
      text-align: center;
      margin: 0;
      letter-spacing: 0.5px;
    }
    
    .department-name {
      font-size: 16px;
      color: #555;
      text-align: center;
      margin: 5px 0 0;
      letter-spacing: 0.3px;
    }
    
    .email-title {
      font-size: 20px;
      font-weight: 600;
      color: #6200ea;
      text-align: center;
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
      letter-spacing: 0.3px;
      position: relative;
    }
    
    .email-title::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.2;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .email-title::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.2;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .text-gray-700 {
      color: #444;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .p-3 {
      padding: 0.75rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .px-3 {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    
    .py-1 {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    
    .rounded {
      border-radius: 0.25rem;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .rounded-full {
      border-radius: 9999px;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .bg-white {
      background-color: #ffffff;
    }
    
    .bg-purple-50 {
      background-color: #f5f0ff;
    }
    
    .border {
      border-width: 1px;
    }
    
    .border-purple-100 {
      border-color: #e9d5ff;
    }
    
    .border-purple-200 {
      border-color: #d8b4fe;
    }
    
    .text-purple-800 {
      color: #5b21b6;
    }
    
    .text-gray-600 {
      color: #555;
    }
    
    .text-gray-800 {
      color: #333;
    }
    
    .text-sm {
      font-size: 0.9rem;
    }
    
    .text-lg {
      font-size: 1.125rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .font-bold {
      font-weight: 700;
    }
    
    /* Grid layout */
    .grid {
      display: grid;
      gap: 0.75rem;
    }
    
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .flex {
      display: flex;
    }
    
    .justify-between {
      justify-content: space-between;
    }
    
    .items-center {
      align-items: center;
    }
    
    /* Component styles */
    .divider {
      height: 1px;
      background: #e9d5ff;
      margin: 1.5rem 0;
      position: relative;
    }
    
    .divider::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='10'%3E%3Cpath d='M0 5 L100 5' stroke='%236200ea' stroke-width='1' stroke-dasharray='1 5' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      left: 50%;
      top: -5px;
      transform: translateX(-50%);
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 4px;
      border-left: 3px solid #6200ea;
      background-color: #f5f0ff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -30px;
      bottom: -30px;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #6200ea;
      margin-bottom: 0.75rem;
      font-size: 1.05rem;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.75rem;
      border-radius: 4px;
      font-weight: 500;
      text-align: center;
      background-color: #6200ea;
      color: white;
      text-decoration: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      transition: background-color 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    
    .button:hover {
      background-color: #5000c9;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.03) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e0e0e0;
      padding: 1rem;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .contact-info::before {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -20px;
      bottom: -20px;
    }
    
    .footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .signature {
      margin-top: 1.5rem;
    }
    
    .ticket-details {
      background-color: #f5f0ff;
      border: 1px solid #d8b4fe;
      border-radius: 4px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .ticket-details::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236200ea' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    .ticket-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }
    
    .ticket-title {
      color: #5b21b6;
      font-weight: 700;
      font-size: 1.125rem;
      margin: 0;
    }
    
    .ticket-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    
    .ticket-status::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }
    
    .status-new {
      background-color: rgba(52, 152, 219, 0.1);
      color: #3498db;
    }
    
    .status-new::before {
      background-color: #3498db;
    }
    
    .status-in-progress {
      background-color: rgba(243, 156, 18, 0.1);
      color: #f39c12;
    }
    
    .status-in-progress::before {
      background-color: #f39c12;
    }
    
    .status-on-hold {
      background-color: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
    }
    
    .status-on-hold::before {
      background-color: #e74c3c;
    }
    
    .status-resolved {
      background-color: rgba(46, 204, 113, 0.1);
      color: #2ecc71;
    }
    
    .status-resolved::before {
      background-color: #2ecc71;
    }
    
    .status-closed {
      background-color: rgba(127, 140, 141, 0.1);
      color: #7f8c8d;
    }
    
    .status-closed::before {
      background-color: #7f8c8d;
    }
    
    .ticket-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      font-size: 0.9rem;
      position: relative;
      z-index: 1;
    }
    
    .ticket-label {
      color: #555;
    }
    
    .ticket-value {
      font-weight: 500;
      color: #333;
    }
    
    .ticket-description {
      background-color: #ffffff;
      border: 1px solid #e9d5ff;
      border-radius: 4px;
      padding: 0.75rem;
      font-weight: 500;
      color: #333;
      position: relative;
      z-index: 1;
    }
    
    .ticket-description::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236200ea' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: -1;
    }
    
    .tech-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      opacity: 0.1;
    }
    
    .tech-icon-1 {
      top: 20px;
      right: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='8' y1='21' x2='16' y2='21'%3E%3C/line%3E%3Cline x1='12' y1='17' x2='12' y2='21'%3E%3C/line%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    .tech-icon-2 {
      bottom: 20px;
      left: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236200ea' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='16 18 22 12 16 6'%3E%3C/polyline%3E%3Cpolyline points='8 6 2 12 8 18'%3E%3C/polyline%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .ticket-grid {
        grid-template-columns: 1fr;
      }
      
      .ticket-label {
        font-weight: 600;
        margin-bottom: 0.125rem;
      }
      
      .ticket-value {
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed rgba(98, 0, 234, 0.1);
      }
      
      .ticket-grid > div:nth-child(even) .ticket-value {
        border-bottom: none;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <div class="university-logo" style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
        <!-- University Logo Placeholder -->
       <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="width: 180px;" class="university
      </div>
     
      <div class="tech-icon tech-icon-1"></div>
      <div class="tech-icon tech-icon-2"></div>
    </div>

    <h2 class="email-title">SUPPORT TICKET UPDATE – #12345</h2>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        This is an update regarding your support ticket <span class="font-semibold">#12345</span> about "
        <span class="font-semibold">Login Issues with Student Portal</span>".
      </p>

      <!-- Ticket Details -->
      <div class="ticket-details">
        <div class="ticket-header">
          <h3 class="ticket-title">Ticket Details</h3>
          <span class="ticket-status status-in-progress">In Progress</span>
        </div>

        <div class="ticket-grid">
          <div class="ticket-label">Ticket Number:</div>
          <div class="ticket-value">#12345</div>

          <div class="ticket-label">Subject:</div>
          <div class="ticket-value">Login Issues with Student Portal</div>

          <div class="ticket-label">Assigned To:</div>
          <div class="ticket-value">Sarah Johnson</div>

          <div class="ticket-label">Estimated Resolution:</div>
          <div class="ticket-value">Within 24 hours</div>
        </div>

        <div class="divider"></div>

        <div class="text-sm">
          <div class="ticket-label mb-2">Description:</div>
          <div class="ticket-description">
            Unable to log in to the student portal. Password reset doesn't work.
          </div>
        </div>
      </div>

      <!-- Info Box -->
      <div class="info-box">
        <div class="info-box-title">Current Status</div>
        <p>
          Your ticket is currently being worked on by our support team. We are investigating the issue and will
          provide a solution as soon as possible.
        </p>
        <p class="mt-2">
          Estimated resolution time: <strong>Within 24 hours</strong>
        </p>
      </div>

      <div class="button-container">
        <a href="https://support.nkumbauniversity.ac.ug/tickets" class="button" style="color: white !important;">
          View Ticket Details
        </a>
      </div>

      <p class="text-gray-700">
        If you have any additional information to add to this ticket, please reply to this email or contact our
        helpdesk:
      </p>

      <div class="contact-info text-gray-600 text-sm">
        <p>
          <strong>Email:</strong> helpdesk@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123461
        </p>
        <p>
          <strong>Support Hours:</strong> Monday to Friday, 8:00 AM to 6:00 PM
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700">Thank you for your patience.</p>

        <div class="signature">
          <p class="text-gray-700">
            Best regards,<br>
            <span class="font-semibold">IT Support Team</span><br>
            Nkumba University
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

`;
const EventInvitationHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Invitation</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B0082' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    
    .email-header {
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 25px;
      padding-bottom: 20px;
      text-align: center;
    }
    
    .university-logo {
      margin-bottom: 15px;
    }
    
    .event-banner {
      position: relative;
      height: 180px;
      background: linear-gradient(135deg, #4B0082 0%, #9370DB 100%);
      border-radius: 8px;
      margin-bottom: 25px;
      overflow: hidden;
    }
    
    .decorative-circle-1 {
      position: absolute;
      top: 40px;
      left: 40px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      animation: float 6s ease-in-out infinite;
    }
    
    .decorative-circle-2 {
      position: absolute;
      bottom: 40px;
      right: 40px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      animation: float 8s ease-in-out infinite;
    }
    
    .event-banner-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 20px;
    }
    
    .event-title {
      font-size: 24px;
      font-weight: bold;
      margin: 0 0 10px 0;
    }
    
    .event-datetime {
      font-size: 18px;
      margin: 0;
    }
    
    .text-gray-700 {
      color: #444;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mb-1 {
      margin-bottom: 0.25rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mb-6 {
      margin-bottom: 1.5rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .border {
      border-width: 1px;
    }
    
    .border-gray-200 {
      border-color: #e5e7eb;
    }
    
    .text-gray-600 {
      color: #555;
    }
    
    .text-gray-800 {
      color: #333;
    }
    
    .text-sm {
      font-size: 0.9rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    /* Grid layout */
    .grid {
      display: grid;
      gap: 1rem;
    }
    
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    /* Component styles */
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 1.5rem 0;
      position: relative;
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 4px;
      border-left: 3px solid #4B0082;
      background-color: #f9f5ff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -30px;
      bottom: -30px;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #4B0082;
      margin-bottom: 0.75rem;
      font-size: 1.05rem;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.75rem;
      border-radius: 4px;
      font-weight: 500;
      text-align: center;
      background-color: #4B0082;
      color: white;
      text-decoration: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      transition: background-color 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    
    .button:hover {
      background-color: #3a006b;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.03) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e0e0e0;
      padding: 1rem;
      border-radius: 4px;
    }
    
    .list-disc {
      list-style-type: disc;
      padding-left: 1.25rem;
      margin: 0;
    }
    
    .space-y-2 > * {
      margin-bottom: 0.5rem;
    }
    
    .footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .signature {
      margin-top: 1.5rem;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .grid-cols-2 {
        grid-template-columns: 1fr;
      }
      
      .event-banner {
        height: 150px;
      }
      
      .event-title {
        font-size: 20px;
      }
      
      .event-datetime {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header with Logo -->
    <div class="email-header">
      <div class="university-logo" style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
        <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="width: 180px;">
      </div>
    </div>

    <!-- Event Banner -->
    <div class="event-banner">
      <div class="decorative-circle-1"></div>
      <div class="decorative-circle-2"></div>
      <div class="event-banner-content">
        <h1 class="event-title">Annual Career Fair 2025</h1>
        <p class="event-datetime">October 15, 2025 • 9:00 AM - 4:00 PM</p>
      </div>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        You are cordially invited to attend the <span class="font-semibold">Annual Career Fair 2025</span>.
      </p>

      <!-- Event Details -->
      <div class="bg-gray-50 rounded-lg p-5 my-6 border border-gray-200">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-gray-600 mb-1">Date:</div>
            <div class="font-medium text-gray-800">October 15, 2025</div>
          </div>

          <div>
            <div class="text-gray-600 mb-1">Time:</div>
            <div class="font-medium text-gray-800">9:00 AM - 4:00 PM</div>
          </div>

          <div>
            <div class="text-gray-600 mb-1">Location:</div>
            <div class="font-medium text-gray-800">Main Campus, Multipurpose Hall</div>
          </div>

          <div>
            <div class="text-gray-600 mb-1">RSVP By:</div>
            <div class="font-medium text-gray-800">October 10, 2025</div>
          </div>
        </div>

        <div class="divider"></div>

        <div>
          <div class="text-gray-600 mb-2">Event Description:</div>
          <div class="font-medium text-gray-800">Connect with over 50 employers from various industries and explore career opportunities.</div>
        </div>
      </div>

      <!-- What to Expect -->
      <div class="info-box">
        <div class="info-box-title">What to Expect</div>
        <ul class="list-disc pl-5 space-y-2">
          <li>Networking opportunities with industry professionals</li>
          <li>CV review and career counseling sessions</li>
          <li>On-the-spot interviews with select employers</li>
          <li>Workshops on job search strategies and interview skills</li>
        </ul>
      </div>

      <!-- RSVP Button -->
      <div class="button-container">
        <a href="https://events.nkumbauniversity.ac.ug/rsvp" class="button" style="color: white !important;">
          RSVP Now
        </a>
      </div>

      <p class="text-gray-700">If you have any questions about this event, please contact:</p>

      <!-- Contact Info -->
      <div class="contact-info text-gray-600 text-sm">
        <p>
          <strong>Email:</strong> events@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123462
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700">We look forward to your participation!</p>

        <div class="signature">
          <p class="text-gray-700">
            Best regards,<br>
            <span class="font-semibold">Events Committee</span><br>
            Nkumba University
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

`;
const LoginAlertHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Sign-in Detected</title>
  <style>
    /* Base styles with refined typography */
    body {
      font-family: 'Segoe UI', 'SF Pro Display', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230A2540' fill-opacity='0.01' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    
    .email-header {
      text-align: center;
     
      position: relative;
    }
    
    .security-icon-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 72px;
      width: 72px;
      border-radius: 50%;
      background: linear-gradient(145deg, #f0f7ff, #e6f0f9);
      margin-bottom: 16px;
      border: 1px solid rgba(10, 37, 64, 0.08);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(10, 37, 64, 0.06);
    }
    
    .security-icon-container::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(10, 37, 64, 0.03) 0%,
        rgba(10, 37, 64, 0) 70%
      );
      animation: pulse 4s ease-in-out infinite;
    }
    
    .security-icon {
      position: relative;
      z-index: 1;
      animation: shield-pulse 3s ease-in-out infinite;
    }
    
    .header-title {
      font-size: 22px;
      font-weight: 600;
      color: #0A2540;
      margin: 0;
      letter-spacing: -0.01em;
    }
    
    .text-gray-700 {
      color: #374151;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-6 > * {
      margin-bottom: 1.75rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mb-3 {
      margin-bottom: 0.75rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mb-6 {
      margin-bottom: 1.5rem;
    }
    
    .mt-1 {
      margin-top: 0.25rem;
    }
    
    .mt-3 {
      margin-top: 0.75rem;
    }
    
    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    
    .py-3 {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
    
    .py-4 {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    
    .px-6 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    
    .pt-2 {
      padding-top: 0.5rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .border {
      border: 1px solid rgba(10, 37, 64, 0.08);
    }
    
    .border-b {
      border-bottom: 1px solid rgba(10, 37, 64, 0.08);
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .text-gray-500 {
      color: #6b7280;
    }
    
    .text-gray-600 {
      color: #4b5563;
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .text-gray-800 {
      color: #1f2937;
    }
    
    .text-sm {
      font-size: 0.9375rem;
    }
    
    .text-xs {
      font-size: 0.8125rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .w-full {
      width: 100%;
    }
    
    .pr-4 {
      padding-right: 1rem;
    }
    
    .align-top {
      vertical-align: top;
    }
    
    /* Component styles with enhanced professionalism */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(10, 37, 64, 0.03), rgba(10, 37, 64, 0.08), rgba(10, 37, 64, 0.03));
      margin: 1.75rem 0;
    }
    
    .button-container {
      margin: 1.75rem 0;
    }
    
    .button {
      display: block;
      width: 100%;
      padding: 0.875rem 1.25rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      margin-bottom: 0.875rem;
      transition: all 0.2s ease;
      letter-spacing: 0.01em;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    
    .button-danger {
      background: linear-gradient(to bottom, #D03801, #C63500);
      color: white;
    }
    
    .button-danger:hover {
      background: linear-gradient(to bottom, #C63500, #B83000);
      box-shadow: 0 2px 4px rgba(208, 56, 1, 0.2);
    }
    
    .button-neutral {
      background: linear-gradient(to bottom, #F9FAFB, #F3F4F6);
      color: #374151;
      border: 1px solid #E5E7EB;
    }
    
    .button-neutral:hover {
      background: linear-gradient(to bottom, #F3F4F6, #E5E7EB);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .login-details {
      border: 1px solid rgba(10, 37, 64, 0.08);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      position: relative;
      background-color: #ffffff;
    }
    
    .login-details::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230A2540' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: -1;
    }
    
    .login-details-header {
      background: linear-gradient(to right, #f0f7ff, #f9fafb);
      padding: 0.875rem 1.5rem;
      border-bottom: 1px solid rgba(10, 37, 64, 0.08);
    }
    
    .login-details-body {
      padding: 1.25rem 1.5rem;
    }
    
    .login-details-table {
      width: 100%;
      font-size: 0.9375rem;
      border-collapse: collapse;
    }
    
    .login-details-table td {
      padding: 0.625rem 0;
      vertical-align: top;
    }
    
    .login-details-table td:first-child {
      color: #6b7280;
      padding-right: 1.5rem;
      width: 130px;
      font-weight: 500;
    }
    
    .login-details-table td:last-child {
      color: #1f2937;
      font-weight: 500;
    }
    
    .security-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .security-list li {
      padding-left: 1.5rem;
      position: relative;
      margin-bottom: 0.75rem;
      color: #4b5563;
      font-size: 0.9375rem;
      line-height: 1.5;
    }
    
    .security-list li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #0A2540;
    }
    
    .footer {
      color: #6b7280;
      font-size: 0.9375rem;
      line-height: 1.6;
    }
    
    .reference {
      color: #6b7280;
      font-size: 0.8125rem;
      margin-top: 1rem;
      opacity: 0.8;
    }
    
    /* Refined animations */
    @keyframes pulse {
      0% {
        transform: scale(0.97);
        opacity: 0.4;
      }
      50% {
        transform: scale(1);
        opacity: 0.6;
      }
      100% {
        transform: scale(0.97);
        opacity: 0.4;
      }
    }
    
    @keyframes shield-pulse {
      0% {
        transform: scale(1);
        opacity: 0.9;
      }
      50% {
        transform: scale(1.03);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.9;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    .delay-1 {
      animation-delay: 0.1s;
      opacity: 0;
    }
    
    .delay-2 {
      animation-delay: 0.2s;
      opacity: 0;
    }
    
    .delay-3 {
      animation-delay: 0.3s;
      opacity: 0;
    }
    
    /* Responsive adjustments with improved mobile experience */
    @media (max-width: 600px) {
      .email-container {
        padding: 30px 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .login-details-table td:first-child {
        width: 110px;
        padding-right: 1rem;
      }
      
      .header-title {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Enhanced Header with Security Icon -->
    <div class="email-header">
      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 0rem;">
       <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Security Icon" class="security-icon" style="width: 180px; height: 180px;">
      </div>
      <h1 class="header-title">New Sign-in Detected</h1>
    </div>

    <div class="space-y-6">
      <p class="text-gray-700 animate-fadeIn">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700 animate-fadeIn delay-1">
        We detected a new sign-in to your Nkumba University account. If this
        was you, no action is needed. If you don't recognize this activity,
        please secure your account immediately.
      </p>

      <!-- Enhanced Login Details Card -->
      <div class="login-details animate-fadeIn delay-2">
        <div class="login-details-header">
          <h3 class="text-sm font-medium text-gray-700" style="margin: 0; letter-spacing: 0.03em;">SIGN-IN DETAILS</h3>
        </div>

        <div class="login-details-body">
          <table class="login-details-table">
            <tbody>
              <tr>
                <td>Date & Time</td>
                <td>October 5, 2025, 10:15 AM</td>
              </tr>
              <tr>
                <td>Device</td>
                <td>Windows PC</td>
              </tr>
              <tr>
                <td>Browser</td>
                <td>Chrome</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>Kampala, Uganda</td>
              </tr>
              <tr>
                <td>IP Address</td>
                <td>192.168.1.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Refined Action Buttons -->
      <div class="pt-2 animate-fadeIn delay-3">
        <p class="text-gray-700 font-medium mb-4">Was this you?</p>
        <div class="button-container">
          <a href="https://portal.nkumbauniversity.ac.ug/report-suspicious-activity" class="button button-danger" style="color: white !important;">
            No, secure my account
          </a>
          <a href="#" class="button button-neutral">
            Yes, this was me
          </a>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Enhanced Security Recommendations -->
      <div>
        <p class="text-gray-700 font-medium mb-3">Security recommendations:</p>
        <ul class="security-list">
          <li>Use a strong, unique password for your university account</li>
          <li>Enable two-factor authentication for additional security</li>
          <li>Always sign out when using shared computers</li>
          <li>Regularly review your account activity</li>
        </ul>
      </div>

      <div class="divider"></div>

      <!-- Refined Footer with Contact Info -->
      <div class="footer">
        <p>If you need assistance, please contact IT Security:</p>
        <p class="mt-1">itsecurity@nkumbauniversity.ac.ug | +256 414 123463</p>
        <p class="reference">Reference: SID-2025100501-XYZ</p>
      </div>
    </div>
  </div>
</body>
</html>

`;
const OTPHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <style>
    /* Base styles with refined typography */
    body {
      font-family: 'Segoe UI', 'SF Pro Display', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230050C8' fill-opacity='0.01' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    
    .email-header {
      background: linear-gradient(to right, #0050C8, #0062f5);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 6px 6px 0 0;
      margin: -40px -40px 30px -40px;
      position: relative;
      overflow: hidden;
    }
    
    .email-header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3C/g%3E%3C/svg%3E");
      background-size: 30px 30px;
    }
    
    .header-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      position: relative;
      letter-spacing: -0.01em;
    }
    
    .text-gray-700 {
      color: #374151;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mt-3 {
      margin-top: 0.75rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .px-8 {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    
    .py-4 {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .bg-blue-50 {
      background-color: #EBF5FF;
    }
    
    .bg-white {
      background-color: #ffffff;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .border {
      border-width: 1px;
      border-style: solid;
    }
    
    .border-blue-200 {
      border-color: #BFDBFE;
    }
    
    .border-blue-300 {
      border-color: #93C5FD;
    }
    
    .text-blue-800 {
      color: #1E40AF;
    }
    
    .text-gray-600 {
      color: #4B5563;
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .text-3xl {
      font-size: 1.875rem;
    }
    
    .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    
    .font-bold {
      font-weight: 700;
    }
    
    .tracking-widest {
      letter-spacing: 0.2em;
    }
    
    .inline-block {
      display: inline-block;
    }
    
    .flex {
      display: flex;
    }
    
    .justify-center {
      justify-content: center;
    }
    
    /* Component styles with enhanced professionalism */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(0, 80, 200, 0.03), rgba(0, 80, 200, 0.1), rgba(0, 80, 200, 0.03));
      margin: 1.75rem 0;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.875rem 1.75rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease;
      letter-spacing: 0.01em;
      background: linear-gradient(to bottom, #0050C8, #0046b3);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 80, 200, 0.2);
    }
    
    .button:hover {
      background: linear-gradient(to bottom, #0046b3, #003d9e);
      box-shadow: 0 3px 6px rgba(0, 80, 200, 0.3);
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 6px;
      border-left: 4px solid #E53935;
      background-color: #FFEBEE;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #C62828;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }
    
    .verification-code-container {
      background-color: #EBF5FF;
      border: 1px solid #BFDBFE;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0, 80, 200, 0.08);
      position: relative;
      overflow: hidden;
    }
    
    .verification-code-container::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230050C8' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: 0;
    }
    
    .verification-code-title {
      color: #1E40AF;
      font-weight: 700;
      font-size: 1.125rem;
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
    }
    
    .verification-code {
      background-color: white;
      padding: 1rem 2rem;
      border-radius: 6px;
      border: 1px solid #93C5FD;
      display: inline-block;
      box-shadow: 0 2px 4px rgba(0, 80, 200, 0.1);
      position: relative;
      z-index: 1;
      animation: pulse 2s infinite;
    }
    
    .verification-code-text {
      font-size: 2rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #1E40AF;
    }
    
    .verification-code-expiry {
      font-size: 0.875rem;
      color: #4B5563;
      margin-top: 0.75rem;
      position: relative;
      z-index: 1;
    }
    
    .security-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0;
    }
    
    .security-list li {
      margin-bottom: 0.5rem;
      color: #374151;
      padding-left: 0.25rem;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      color: #4B5563;
    }
    
    .footer {
      margin-top: 2rem;
      color: #6B7280;
      font-size: 0.9375rem;
    }
    
    /* Animations */
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 80, 200, 0.2);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(0, 80, 200, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 80, 200, 0);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 30px 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .email-header {
        margin: -30px -20px 25px -20px;
        padding: 15px;
      }
      
      .verification-code-text {
        font-size: 1.75rem;
      }
      
      .px-8 {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="security-icon" style="width: 180px; height: 180px; display: block; margin: 0 auto;">
    <div class="email-header">
      <h1 class="header-title">Verification Code</h1>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        You have requested a verification code for your Nkumba University
        account. Please use the code below to complete your verification:
      </p>

      <!-- Verification Code Box -->
      <div class="verification-code-container">
        <h3 class="verification-code-title">Your Verification Code</h3>
        <div class="verification-code">
          <span class="verification-code-text">386242</span>
        </div>
        <p class="verification-code-expiry">
          This code will expire in <span class="font-semibold">10 minutes</span>
        </p>
      </div>

      <!-- Important Notice Box -->
      <div class="info-box">
        <h4 class="info-box-title">Important</h4>
        <p>
          If you did not request this verification code, please ignore this
          email or contact our IT support team immediately.
        </p>
      </div>

      <div class="divider"></div>

      <p class="text-gray-700 font-semibold">Security Tips:</p>

      <ul class="security-list">
        <li>Never share your verification code with anyone</li>
        <li>
          Nkumba University staff will never ask for your verification code
        </li>
        <li>
          Always ensure you're on the official university website before
          entering your code
        </li>
        <li>The code is valid for a limited time only</li>
      </ul>

      <div class="button-container">
        <a href="https://portal.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
          Go to Portal
        </a>
      </div>

      <p class="text-gray-700 mt-4">
        If you have any questions or concerns, please contact our IT support
        team:
      </p>

      <div class="contact-info">
        <p>
          <strong>Email:</strong> itsupport@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123463
        </p>
        <p>
          <strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700 mt-4">
          Thank you for helping us keep your account secure.
        </p>

        <p class="text-gray-700">
          Regards,<br>
          <span class="font-semibold">IT Security Team</span><br>
          Nkumba University
        </p>
      </div>
    </div>
  </div>
</body>
</html>

`;

const AccountCreationHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Created Successfully</title>
  <style>
    /* Base styles with refined typography */
    body {
      font-family: 'Segoe UI', 'SF Pro Display', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232E7D32' fill-opacity='0.01' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    
    .logo-container {
      text-align: center;
      margin-bottom: 25px;
      position: relative;
    }
    
    .logo {
      max-width: 180px;
      height: auto;
      animation: fadeInDown 1s ease-out;
    }
    
    .email-header {
      background: linear-gradient(to right, #2E7D32, #388E3C);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 6px;
      margin-bottom: 30px;
      position: relative;
      overflow: hidden;
      animation: fadeIn 0.8s ease-out;
    }
    
    .email-header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3C/g%3E%3C/svg%3E");
      background-size: 30px 30px;
    }
    
    .header-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      position: relative;
      letter-spacing: -0.01em;
    }
    
    .text-gray-700 {
      color: #374151;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mb-1 {
      margin-bottom: 0.25rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mt-1 {
      margin-top: 0.25rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .p-3 {
      padding: 0.75rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .rounded {
      border-radius: 0.25rem;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .bg-green-50 {
      background-color: #E8F5E9;
    }
    
    .bg-white {
      background-color: #ffffff;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .border {
      border-width: 1px;
      border-style: solid;
    }
    
    .border-green-100 {
      border-color: #C8E6C9;
    }
    
    .border-green-200 {
      border-color: #A5D6A7;
    }
    
    .text-green-800 {
      color: #2E7D32;
    }
    
    .text-gray-600 {
      color: #4B5563;
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .text-gray-800 {
      color: #1F2937;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .text-lg {
      font-size: 1.125rem;
    }
    
    .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .font-bold {
      font-weight: 700;
    }
    
    .grid {
      display: grid;
    }
    
    .grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    
    .gap-3 {
      gap: 0.75rem;
    }
    
    /* Component styles with enhanced professionalism */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(46, 125, 50, 0.03), rgba(46, 125, 50, 0.1), rgba(46, 125, 50, 0.03));
      margin: 1.75rem 0;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.875rem 1.75rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease;
      letter-spacing: 0.01em;
      background: linear-gradient(to bottom, #2E7D32, #1B5E20);
      color: white;
      box-shadow: 0 2px 4px rgba(46, 125, 50, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .button:hover {
      background: linear-gradient(to bottom, #1B5E20, #0A3D0A);
      box-shadow: 0 3px 6px rgba(46, 125, 50, 0.3);
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.03) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 6px;
      border-left: 4px solid #2E7D32;
      background-color: #E8F5E9;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E7D32' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -30px;
      bottom: -30px;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #2E7D32;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }
    
    .credentials-container {
      background-color: #E8F5E9;
      border: 1px solid #A5D6A7;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(46, 125, 50, 0.08);
    }
    
    .credentials-container::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232E7D32' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: 0;
    }
    
    .credentials-title {
      color: #2E7D32;
      font-weight: 700;
      font-size: 1.125rem;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }
    
    .credential-item {
      background-color: white;
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid #C8E6C9;
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .credential-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(46, 125, 50, 0.1);
    }
    
    .credential-item:nth-child(1) {
      animation-delay: 0.2s;
      opacity: 0;
    }
    
    .credential-item:nth-child(2) {
      animation-delay: 0.4s;
      opacity: 0;
    }
    
    .credential-label {
      color: #4B5563;
      font-weight: 500;
      margin-bottom: 0.25rem;
      font-size: 1.275rem;
    }
    
    .credential-value {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-weight: 700;
      color: #1F2937;
      font-size: 1.5375rem;
    }
    
    .list-decimal {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin: 0;
    }
    
    .list-disc {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0;
    }
    
    .space-y-1 > * {
      margin-bottom: 0.25rem;
    }
    
    .space-y-2 > * {
      margin-bottom: 0.5rem;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      border-radius: 6px;
      font-size: 1.275rem;
      color: #4B5563;
    }
    
    .footer {
      margin-top: 2rem;
      color: #6B7280;
      font-size: 0.9375rem;
    }
    
    .smile {
      display: inline-block;
      font-size: 2rem;
      margin-left: 0.25rem;
      animation: bounce 2s infinite;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      opacity: 0;
      animation: confetti 5s ease-in-out infinite;
    }
    
    .confetti-1 {
      top: 10%;
      left: 10%;
      background-color: #4CAF50;
      animation-delay: 0s;
    }
    
    .confetti-2 {
      top: 20%;
      right: 10%;
      background-color: #8BC34A;
      animation-delay: 0.5s;
    }
    
    .confetti-3 {
      bottom: 10%;
      left: 20%;
      background-color: #CDDC39;
      animation-delay: 1s;
    }
    
    .confetti-4 {
      bottom: 20%;
      right: 20%;
      background-color: #FFC107;
      animation-delay: 1.5s;
    }
    
    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-5px);
      }
      60% {
        transform: translateY(-2px);
      }
    }
    
    @keyframes confetti {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      35% {
        transform: translateY(-30px) rotate(90deg);
        opacity: 1;
      }
      70% {
        opacity: 0;
      }
      100% {
        transform: translateY(-60px) rotate(180deg);
        opacity: 0;
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 30px 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .logo {
        max-width: 150px;
      }
      
      .header-title {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Logo -->
    <div class="logo-container" style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem;">
      <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="logo">
      <!-- Confetti animation elements -->
      <div class="confetti confetti-1"></div>
      <div class="confetti confetti-2"></div>
      <div class="confetti confetti-3"></div>
      <div class="confetti confetti-4"></div>
    </div>
    
    <!-- Header -->
    <div class="email-header">
      <h1 class="header-title">Account Created Successfully</h1>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">Assoc.Prof Musiitwa Joel</span>,
      </p>

      <p class="text-gray-700">
        Your account has been successfully created in the Nkumba University
        system. You can now access all university digital resources using the
        credentials below. <span class="smile">😊</span>
      </p>

      <!-- Credentials Box -->
      <div class="credentials-container">
        <h3 class="credentials-title">Your Account Credentials</h3>

        <div class="grid grid-cols-1 gap-3 text-sm" >
          <div class="credential-item">
            <div class="credential-label">User ID:</div>
            <div class="credential-value">musiitwajoel@gmail.com</div>
          </div>

          <div class="credential-item">
            <div class="credential-label">Password:</div>
            <div class="credential-value">qm8Lfqcl</div>
          </div>
        </div>
      </div>

      <!-- Important Notice Box -->
      <div class="info-box" style="margin-top: 1rem;">
        <h4 class="info-box-title">Important</h4>
        <p>
          <strong>
            You are strongly encouraged to change your password after your
            first login.
          </strong>
        </p>
        <p class="mt-2">
          For security reasons, please ensure your new password:
        </p>
        <ul class="list-disc pl-5 space-y-1 mt-1">
          <li>Is at least 8 characters long</li>
          <li>Contains uppercase and lowercase letters</li>
          <li>Includes numbers and special characters</li>
          <li>Is not used for any other accounts</li>
        </ul>
      </div>

      <div class="button-container">
        <a href="https://portal.nkumbauniversity.ac.ug" class="button" style="color: white !important;">
          Login to Your Account
        </a>
      </div>

      <div class="divider"></div>

      <p class="text-gray-700 font-semibold">Next Steps:</p>

      <ol class="list-decimal pl-5 space-y-2 text-gray-700">
        <li>Log in using the credentials provided above</li>
        <li>Change your password immediately</li>
        <li>Complete your profile information</li>
        <li>Review and set up notification preferences</li>
      </ol>

      <p class="text-gray-700 mt-4">
        If you have any questions or need assistance, please contact our IT
        support team:
      </p>

      <div class="contact-info">
        <p>
          <strong>Email:</strong> itsupport@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123463
        </p>
        <p>
          <strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700 mt-4">
          Welcome to Nkumba University's digital community! <span class="smile">🎓</span>
        </p>

        <p class="text-gray-700">
          Regards,<br>
          <span class="font-semibold">IT Department</span><br>
          Nkumba University
        </p>
      </div>
    </div>
  </div>
</body>
</html>

`;
const PasswordResetHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    /* Base styles with refined typography */
    body {
      font-family: 'Segoe UI', 'SF Pro Display', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FF6D00' fill-opacity='0.01' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    
    .email-header {
      background: linear-gradient(to right, #FF6D00, #FF9800);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 6px 6px 0 0;
      margin: -40px -40px 30px -40px;
      position: relative;
      overflow: hidden;
      animation: fadeIn 0.8s ease-out;
    }
    
    .email-header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z'/%3E%3C/g%3E%3C/svg%3E");
      background-size: 30px 30px;
    }
    
    .header-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      position: relative;
      letter-spacing: -0.01em;
    }
    
    .text-gray-700 {
      color: #374151;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.25rem;
    }
    
    .my-6 {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .p-3 {
      padding: 0.75rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-xs {
      font-size: 0.75rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    
    .break-all {
      word-break: break-all;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    /* Component styles with enhanced professionalism */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(255, 109, 0, 0.03), rgba(255, 109, 0, 0.1), rgba(255, 109, 0, 0.03));
      margin: 1.75rem 0;
    }
    
    .button-container {
      text-align: center;
      margin: 1.75rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 0.875rem 1.75rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease;
      letter-spacing: 0.01em;
      background: linear-gradient(to bottom, #FF6D00, #E65100);
      color: white;
      box-shadow: 0 2px 4px rgba(255, 109, 0, 0.2);
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.8s ease-out;
    }
    
    .button:hover {
      background: linear-gradient(to bottom, #E65100, #BF360C);
      box-shadow: 0 3px 6px rgba(255, 109, 0, 0.3);
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.03) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .info-box {
      margin: 1.5rem 0;
      padding: 1.25rem;
      border-radius: 6px;
      border-left: 4px solid #FF6D00;
      background-color: #FFF3E0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      animation: fadeIn 1s ease-out;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF6D00' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 8v4'%3E%3C/path%3E%3Cpath d='M12 16h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -30px;
      bottom: -30px;
    }
    
    .info-box-title {
      font-weight: 600;
      color: #E65100;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }
    
    .reset-link {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0.75rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 1.75rem;
      word-break: break-all;
      color: #4B5563;
      margin: 0.5rem 0 1.5rem;
      position: relative;
      animation: fadeIn 1s ease-out;
      transition: all 0.3s ease;

    }
    
    .reset-link:hover {
      background-color: #f3f4f6;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    
    .security-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0;
    }
    
    .security-list li {
      margin-bottom: 0.5rem;
      color: #374151;
      padding-left: 0.25rem;
      position: relative;
      animation: fadeInLeft 0.8s ease-out;
      animation-fill-mode: both;
    }
    
    .security-list li:nth-child(1) {
      animation-delay: 0.1s;
    }
    
    .security-list li:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .security-list li:nth-child(3) {
      animation-delay: 0.3s;
    }
    
    .security-list li:nth-child(4) {
      animation-delay: 0.4s;
    }
    
    .security-list li:nth-child(5) {
      animation-delay: 0.5s;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      border-radius: 6px;
      font-size: 1.275rem;
      color: #4B5563;
      animation: fadeIn 1.2s ease-out;
    }
    
    .footer {
      margin-top: 2rem;
      color: #6B7280;
      font-size: 0.9375rem;
      animation: fadeIn 1.4s ease-out;
    }
    
    /* Lock icon animation */
    .lock-icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
      position: relative;
      animation: pulse 2s infinite;
    }
    
    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        padding: 30px 20px;
        width: 100%;
        border-radius: 0;
      }
      
      .email-header {
        margin: -30px -20px 25px -20px;
        padding: 15px;
      }
      
      .header-title {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>

  
   
  
   <!-- Header -->
 <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
      <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" class="logo" style="width: 180px; height: auto; margin-bottom: 30px;">
    </div>    <div class="email-header">
    <h1 class="header-title">Password Reset Request</h1>
    </div>

    <div class="space-y-4">
      <p class="text-gray-700">
        Dear <span class="font-semibold">John Doe</span>,
      </p>

      <p class="text-gray-700">
        We received a request to reset the password for your Nkumba University
        account. To proceed with the password reset, please click the button
        below:
      </p>

      <div class="text-center my-6">
        <a href="https://portal.nkumbauniversity.ac.ug/reset-password?token=abc123xyz" class="button" style="color: white !important;">
          Reset Your Password
        </a>
      </div>

      <p class="text-gray-700 text-md">
        If the button above doesn't work, copy and paste the following link
        into your browser:
      </p>
      <div class="reset-link">
        https://portal.nkumbauniversity.ac.ug/reset-password?token=abc123xyz
      </div>

      <!-- Important Notice Box -->
      <div class="info-box">
        <h4 class="info-box-title">Important</h4>
        <p>
          This password reset link will expire in
          <strong>24 hours</strong>.
        </p>
        <p class="mt-2">
          If you did not request a password reset, please ignore this email or
          contact our IT support team immediately as your account may be at
          risk.
        </p>
      </div>

      <div class="divider"></div>

      <p class="text-gray-700 font-semibold">Password Security Tips:</p>

      <ul class="security-list">
        <li>Create a strong password with at least 8 characters</li>
        <li>
          Include a mix of uppercase and lowercase letters, numbers, and
          special characters
        </li>
        <li>Avoid using personal information or common words</li>
        <li>Use a different password for each of your accounts</li>
        <li>
          Consider using a password manager to securely store your passwords
        </li>
      </ul>

      <p class="text-gray-700 mt-4">
        If you have any questions or need assistance, please contact our IT
        support team:
      </p>

      <div class="contact-info">
        <p>
          <strong>Email:</strong> itsupport@nkumbauniversity.ac.ug
        </p>
        <p>
          <strong>Phone:</strong> +256 414 123463
        </p>
        <p>
          <strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
        </p>
      </div>

      <div class="footer">
        <p class="text-gray-700 mt-4">
          Thank you for helping us keep your account secure.
        </p>

        <p class="text-gray-700">
          Regards,<br>
          <span class="font-semibold">IT Security Team</span><br>
          Nkumba University
        </p>
      </div>
    </div>
  </div>
</body>
</html>

`;

const WelcomeTemplateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Nkumba University</title>
  <style>
    /* Base styles with refined typography */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Poppins', 'Segoe UI', Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
    }
    
    .email-content {
      padding: 40px;
      position: relative;
      z-index: 2;
    }
    
    /* Background pattern */
    .bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B0082' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      z-index: 1;
      opacity: 0.5;
    }
    
    /* Header styles */
    .header-banner {
      position: relative;
      height: 280px;
      background: linear-gradient(135deg, #4B0082 0%, #9370DB 100%);
      overflow: hidden;
    }
    
    .header-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      z-index: 10;
    }
    
    .university-logo {
      width: 100px;
      height: 100px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      position: relative;
      animation: logoEntrance 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }
    
    .university-logo::before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      animation: pulseBorder 2s infinite;
    }
    
    .university-logo img {
      width: 80px;
      height: auto;
    }
    
    .header-title {
      color: white;
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s ease-out 0.5s forwards;
    }
    
    .header-subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 18px;
      font-weight: 400;
      margin: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s ease-out 0.8s forwards;
    }
    
    /* Decorative elements */
    .decorative-shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
      z-index: 5;
    }
    
    .shape-1 {
      width: 120px;
      height: 120px;
      top: 20px;
      left: 20px;
      animation: float 8s ease-in-out infinite;
    }
    
    .shape-2 {
      width: 80px;
      height: 80px;
      bottom: 30px;
      right: 40px;
      animation: float 6s ease-in-out infinite 1s;
    }
    
    .shape-3 {
      width: 40px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.2);
      animation: pulse 4s ease-in-out infinite;
    }
    
    .shape-4 {
      width: 160px;
      height: 160px;
      top: -80px;
      right: -80px;
      border-radius: 0;
      background: linear-gradient(45deg, rgba(147, 112, 219, 0.8), rgba(75, 0, 130, 0.8));
      transform: rotate(45deg);
      animation: rotate 20s linear infinite;
    }
    
    .shape-5 {
      width: 100px;
      height: 100px;
      bottom: -50px;
      left: -50px;
      border-radius: 0;
      background: linear-gradient(-45deg, rgba(147, 112, 219, 0.8), rgba(75, 0, 130, 0.8));
      transform: rotate(45deg);
      animation: rotate 15s linear infinite reverse;
    }
    
    /* Animated wave */
    .wave-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      overflow: hidden;
    }
    
    .wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23ffffff' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff' opacity='.75'%3E%3C/path%3E%3C/svg%3E");
      background-size: 50% 100%;
      animation: wave 12s linear infinite;
    }
    
    .wave:nth-child(2) {
      bottom: 0;
      animation: wave 8s linear infinite reverse;
      opacity: 0.8;
    }
    
    .wave:nth-child(3) {
      bottom: 0;
      animation: wave 10s linear infinite;
      opacity: 0.6;
    }
    
    /* Content styles */
    .text-gray-700 {
      color: #374151;
      font-size: 15px;
      line-height: 1.7;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .space-y-4 > * {
      margin-bottom: 1.5rem;
    }
    
    .my-6 {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-5 {
      padding: 1.25rem;
    }
    
    .pl-5 {
      padding-left: 1.25rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    /* Component styles with enhanced professionalism */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(75, 0, 130, 0.05), rgba(75, 0, 130, 0.2), rgba(75, 0, 130, 0.05));
      margin: 2rem 0;
      position: relative;
    }
    
    .divider::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #4B0082;
      border-radius: 50%;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 0 3px rgba(75, 0, 130, 0.1);
    }
    
    .button-container {
      text-align: center;
      margin: 2rem 0;
    }
    
    .button {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, #4B0082, #9370DB);
      color: white;
      box-shadow: 0 4px 15px rgba(75, 0, 130, 0.3);
      position: relative;
      overflow: hidden;
      z-index: 1;
      letter-spacing: 0.5px;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(75, 0, 130, 0.4);
    }
    
    .button::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
      z-index: -1;
    }
    
    .button::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }
    
    .info-box {
      margin: 2rem 0;
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid #4B0082;
      background-color: #f9f5ff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      animation: fadeIn 1s ease-out;
    }
    
    .info-box::before {
      content: "";
      position: absolute;
      width: 200px;
      height: 200px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -50px;
      bottom: -50px;
    }
    
    .info-box-title {
      font-weight: 700;
      color: #4B0082;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
    }
    
    .info-box-title::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    
    .list-disc {
      list-style-type: none;
      padding-left: 0.5rem;
      margin: 0;
    }
    
    .list-disc li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      animation: fadeInLeft 0.5s ease-out forwards;
      opacity: 0;
    }
    
    .list-disc li:nth-child(1) {
      animation-delay: 0.2s;
    }
    
    .list-disc li:nth-child(2) {
      animation-delay: 0.4s;
    }
    
    .list-disc li:nth-child(3) {
      animation-delay: 0.6s;
    }
    
    .list-disc li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #9370DB;
    }
    
    .list-decimal {
      counter-reset: item;
      list-style-type: none;
      padding-left: 0.5rem;
      margin: 0;
    }
    
    .list-decimal li {
      position: relative;
      padding-left: 4rem;
      margin-bottom: 0.75rem;
      counter-increment: item;
      animation: fadeInLeft 0.5s ease-out forwards;
      opacity: 0;
    }
    
    .list-decimal li:nth-child(1) {
      animation-delay: 0.2s;
    }
    
    .list-decimal li:nth-child(2) {
      animation-delay: 0.4s;
    }
    
    .list-decimal li:nth-child(3) {
      animation-delay: 0.6s;
    }
    
    .list-decimal li:nth-child(4) {
      animation-delay: 0.8s;
    }
    
    .list-decimal li:nth-child(5) {
      animation-delay: 1s;
    }
    
    .list-decimal li::before {
      content: counter(item);
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #4B0082;
      color: white;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .contact-info {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 1.25rem;
      font-size: 1.2375rem;
      color: #4B5563;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    
    .contact-info::before {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.05;
      right: -20px;
      bottom: -20px;
    }
    
    .contact-info p {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
    }
    
    .contact-info p strong {
      margin-right: 0.5rem;
      color: #4B0082;
    }
    
    .contact-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.7;
    }
    
    .icon-email {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'%3E%3C/path%3E%3Cpolyline points='22,6 12,13 2,6'%3E%3C/polyline%3E%3C/svg%3E");
    }
    
    .icon-phone {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'%3E%3C/path%3E%3C/svg%3E");
    }
    
    .icon-office {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0082' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E");
    }
    
    .signature {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px dashed rgba(75, 0, 130, 0.2);
    }
    
    .signature-name {
      font-weight: 600;
      color: #4B0082;
    }
    
    .signature-title {
      color: #6B7280;
      font-size: 1.2375rem;
    }
    
    .signature-university {
      color: #6B7280;
      font-size: 1.2375rem;
    }
    
    .footer {
      background: linear-gradient(135deg, #4B0082 0%, #9370DB 100%);
      color: white;
      text-align: center;
      padding: 20px;
      border-radius: 0 0 12px 12px;
      position: relative;
      overflow: hidden;
    }
    
    .footer-text {
      position: relative;
      z-index: 2;
      font-size: 14px;
      opacity: 0.9;
    }
    
    .footer-shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .footer-shape-1 {
      width: 60px;
      height: 60px;
      top: -20px;
      left: 10%;
    }
    
    .footer-shape-2 {
      width: 40px;
      height: 40px;
      bottom: -10px;
      right: 10%;
    }
    
    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 0.8;
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-150%) rotate(45deg);
      }
      100% {
        transform: translateX(150%) rotate(45deg);
      }
    }
    
    @keyframes pulseBorder {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes logoEntrance {
      0% {
        transform: translateY(-50px) scale(0.8);
        opacity: 0;
      }
      60% {
        transform: translateY(10px) scale(1.1);
      }
      100% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
    
    @keyframes wave {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    @keyframes rotate {
      0% {
        transform: rotate(45deg);
      }
      100% {
        transform: rotate(405deg);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        border-radius: 0;
      }
      
      .email-content {
        padding: 30px 20px;
      }
      
      .header-banner {
        height: 220px;
      }
      
      .header-title {
        font-size: 24px;
      }
      
      .header-subtitle {
        font-size: 16px;
      }
      
      .university-logo {
        width: 180px;
        height: 180px;
      }
      
      .university-logo img {
        width: 60px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
 <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="height: auto; width:  180px" />
  </div>
    <!-- Background pattern -->
    <div class="bg-pattern"></div>
    
    <!-- Header Banner -->
    <div class="header-banner">
      <!-- Decorative shapes -->
      <div class="decorative-shape shape-1"></div>
      <div class="decorative-shape shape-2"></div>
      <div class="decorative-shape shape-3"></div>
      <div class="decorative-shape shape-4"></div>
      <div class="decorative-shape shape-5"></div>
      
      <!-- Header content -->
      <div class="header-content">
        <h1 class="header-title">Welcome to Nkumba University!</h1>
        <p class="header-subtitle">Your journey to excellence begins now</p>
      </div>
      
      <!-- Wave effect at bottom -->
      <div class="wave-container">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
    
    <!-- Email Content -->
    <div class="email-content">
      <div class="space-y-4">
        <p class="text-gray-700">
          Dear <span class="font-semibold">John Doe</span>,
        </p>

        <p class="text-gray-700">
          On behalf of the entire Nkumba University community, I am delighted to
          welcome you to our institution. Congratulations on your admission to
          the <span class="font-semibold">Bachelor of Science in Computer Science</span> program for the
          <span class="font-semibold">2025/2026</span> academic year.
        </p>

        <p class="text-gray-700">
          We are excited that you have chosen Nkumba University for your higher
          education journey. Our university is committed to providing you with a
          transformative educational experience that will prepare you for a
          successful career and meaningful contribution to society.
        </p>

        <!-- Important Dates Box -->
        <div class="info-box">
          <h4 class="info-box-title">Important Dates</h4>
          <ul class="list-disc">
            <li>
              <strong>Orientation Week:</strong> Begins on August 25, 2025
            </li>
            <li>
              <strong>Registration Deadline:</strong> August 20, 2025
            </li>
            <li>
              <strong>Classes Begin:</strong> September 1, 2025
            </li>
          </ul>
        </div>

        <div class="divider"></div>

        <p class="text-gray-700 font-semibold">Next Steps:</p>

        <ol class="list-decimal">
          <li>Complete your registration on the student portal</li>
          <li>Pay your tuition and fees</li>
          <li>Attend the orientation program</li>
          <li>Set up your university email account</li>
          <li>Explore campus resources and student organizations</li>
        </ol>

        <div class="button-container">
          <a href="https://portal.nkumbauniversity.ac.ug" class="button" style="color: #fff !important;">
            Access Student Portal
          </a>
        </div>

        <p class="text-gray-700">
          We have a comprehensive orientation program planned to help you
          transition smoothly into university life. During orientation, you will
          learn about academic expectations, campus resources, student services,
          and have the opportunity to meet faculty members and fellow students.
        </p>

        <p class="text-gray-700">
          If you have any questions or need assistance, please don't hesitate to
          contact us:
        </p>

        <div class="contact-info">
          <p>
            <span class="contact-icon icon-email"></span>
            <strong>Email:</strong> admissions@nkumbauniversity.ac.ug
          </p>
          <p>
            <span class="contact-icon icon-phone"></span>
            <strong>Phone:</strong> +256 414 123456
          </p>
          <p>
            <span class="contact-icon icon-office"></span>
            <strong>Office:</strong> Admissions Office, Administration Building
          </p>
        </div>

        <p class="text-gray-700 mt-4">
          We look forward to meeting you soon and supporting you throughout your
          academic journey at Nkumba University.
        </p>

        <div class="signature">
          <p class="text-gray-700">
            Warm regards,<br>
            <span class="signature-name">Dr. Sarah Nakato</span><br>
            <span class="signature-title">Dean of Students</span><br>
            <span class="signature-university">Nkumba University</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-shape footer-shape-1"></div>
      <div class="footer-shape footer-shape-2"></div>
      <p class="footer-text">© Nkumba University. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`;

const MaintenanceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scheduled System Maintenance - Nkumba University</title>
  <!-- Minimal styles for animations and pseudo-elements that can't be inlined -->
  <style>
    @keyframes morphShape {
      0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
      50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
      100% { border-radius: 41% 59% 45% 55% / 33% 56% 44% 67%; }
    }
    
    @keyframes floatShape {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-5px, 15px) rotate(-5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.1; }
      50% { transform: scale(1.2); opacity: 0.2; }
      100% { transform: scale(1); opacity: 0.1; }
    }
    
    @keyframes logoUnderline {
      0% { width: 0; left: 50%; transform: translateX(-50%); }
      50% { width: 100%; left: 0; transform: translateX(0); }
      100% { width: 0; left: 50%; transform: translateX(-50%); }
    }
    
    @media (min-width: 768px) {
      .grid { grid-template-columns: 1fr 1fr; }
      .grid-span-2 { grid-column: span 2; }
    }
  </style>
</head>
<body style="background-color: #f5f5f5; color: #333; line-height: 1.6; padding: 20px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); position: relative; z-index: 1;">
    <!-- Decorative background shapes -->
    <div style="position: absolute; z-index: 0; opacity: 0.15; pointer-events: none; top: 0; left: 0; width: 300px; height: 300px; background: linear-gradient(45deg, #5C6BC0, #7986CB); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; animation: morphShape 15s ease-in-out infinite alternate, floatShape 20s ease-in-out infinite;"></div>
    <div style="position: absolute; z-index: 0; opacity: 0.15; pointer-events: none; bottom: 10%; right: 0; width: 200px; height: 200px; background: linear-gradient(45deg, #5C6BC0, #9FA8DA); border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; animation: morphShape 12s ease-in-out infinite alternate, floatShape 15s ease-in-out infinite reverse;"></div>
    
    <!-- University logo -->
    <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 2rem; text-align: center; margin-bottom: 16px; position: relative; z-index: 2; padding-top: 20px; animation: fadeIn 1s ease-out;">
      <div >
       <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="height: auto; width:  180px; animation: fadeInDown 1s ease-out;" />
        <span style="position: absolute; bottom: -5px; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, #5C6BC0, transparent); animation: logoUnderline 3s infinite;"></span>
      </div>
    </div>
    
    <!-- Header -->
    <div style="padding: 16px 20px; text-align: center; font-weight: bold; font-size: 20px; margin-bottom: 24px; background-color: #5C6BC0; color: white; position: relative; overflow: hidden; animation: fadeInDown 0.5s ease-out; z-index: 2;">
      <div style="position: relative; z-index: 1;">Scheduled System Maintenance</div>
    </div>
    
    <!-- Email content -->
    <div style="padding: 24px; position: relative; overflow: hidden; z-index: 2;">
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2;">
        Dear <span style="font-weight: 600;">John Doe</span>,
      </p>
      
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2;">
        We are writing to inform you about scheduled maintenance on our
        university systems. During this time, some services will be
        temporarily unavailable.
      </p>
      
      <!-- Maintenance details box -->
      <div style="background-color: #E8EAF6; border: 1px solid #C5CAE9; border-radius: 0.5rem; padding: 1.25rem; margin: 1.5rem 0; position: relative; z-index: 2; animation: fadeIn 0.5s ease-out;">
        <h3 style="color: #3949AB; font-weight: 700; font-size: 1.125rem; margin-bottom: 1rem;">
          Maintenance Details
        </h3>
        
        <div style="display: grid; grid-gap: 1rem;">
          <div style="background-color: white; padding: 0.75rem; border-radius: 0.25rem; border: 1px solid #C5CAE9; margin-bottom: 0.5rem;">
            <div style="color: #5C6BC0; margin-bottom: 0.25rem; font-weight: 500;">Date:</div>
            <div style="font-weight: 700; color: #4a4a4a;">April 15, 2025</div>
          </div>
          
          <div style="background-color: white; padding: 0.75rem; border-radius: 0.25rem; border: 1px solid #C5CAE9; margin-bottom: 0.5rem;">
            <div style="color: #5C6BC0; margin-bottom: 0.25rem; font-weight: 500;">Time:</div>
            <div style="font-weight: 700; color: #4a4a4a;">
              10:00 PM - 2:00 AM (East Africa Time)
            </div>
          </div>
          
          <div style="background-color: white; padding: 0.75rem; border-radius: 0.25rem; border: 1px solid #C5CAE9; margin-bottom: 0.5rem;">
            <div style="color: #5C6BC0; margin-bottom: 0.25rem; font-weight: 500;">
              Affected Systems:
            </div>
            <div style="font-weight: 700; color: #4a4a4a;">Student Portal, Library System, Email Services</div>
          </div>
        </div>
      </div>
      
      <!-- Info box -->
      <div style="margin: 16px 0; padding: 16px; border-radius: 6px; border-left: 4px solid #5C6BC0; background-color: #E8EAF6; position: relative; overflow: hidden; animation: slideIn 0.5s ease-out; z-index: 2;">
        <div style="position: relative; z-index: 1;">
          <div style="font-weight: 600; margin-bottom: 8px; color: #333; display: flex; align-items: center;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background-color: #5C6BC0; color: white; border-radius: 50%; margin-right: 8px; font-size: 14px; font-style: italic;">i</span>
            Why This Maintenance Is Necessary
          </div>
          <p style="margin-bottom: 0; color: #4a4a4a;">
            This scheduled maintenance is part of our ongoing efforts to improve
            system performance, enhance security, and implement new features.
            The updates will help ensure that our digital services continue to
            meet the needs of our university community.
          </p>
        </div>
      </div>
      
      <!-- Divider -->
      <div style="height: 1px; background: linear-gradient(to right, transparent, #C5CAE9, transparent); margin: 24px 0; position: relative; z-index: 2;">
        <span style="position: absolute; width: 10px; height: 10px; background-color: #5C6BC0; border-radius: 50%; top: -4px; left: 50%; transform: translateX(-50%);"></span>
      </div>
      
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2; font-weight: 600;">
        During the maintenance period:
      </p>
      
      <!-- List -->
      <ul style="padding-left: 20px; margin-bottom: 16px; list-style-type: none; position: relative; z-index: 2;">
        <li style="margin-bottom: 8px; position: relative; padding-left: 25px; animation: fadeInLeft 0.5s ease-out; animation-delay: 0.1s; animation-fill-mode: both;">
          <span style="position: absolute; left: 0; top: 8px; width: 16px; height: 16px; background-color: #5C6BC0; border-radius: 50%; transform: scale(0.4);"></span>
          You will not be able to access the affected systems
        </li>
        <li style="margin-bottom: 8px; position: relative; padding-left: 25px; animation: fadeInLeft 0.5s ease-out; animation-delay: 0.2s; animation-fill-mode: both;">
          <span style="position: absolute; left: 0; top: 8px; width: 16px; height: 16px; background-color: #5C6BC0; border-radius: 50%; transform: scale(0.4);"></span>
          Any work in progress should be saved before the maintenance begins
        </li>
        <li style="margin-bottom: 8px; position: relative; padding-left: 25px; animation: fadeInLeft 0.5s ease-out; animation-delay: 0.3s; animation-fill-mode: both;">
          <span style="position: absolute; left: 0; top: 8px; width: 16px; height: 16px; background-color: #5C6BC0; border-radius: 50%; transform: scale(0.4);"></span>
          Automated services like scheduled reports may be delayed
        </li>
        <li style="margin-bottom: 8px; position: relative; padding-left: 25px; animation: fadeInLeft 0.5s ease-out; animation-delay: 0.4s; animation-fill-mode: both;">
          <span style="position: absolute; left: 0; top: 8px; width: 16px; height: 16px; background-color: #5C6BC0; border-radius: 50%; transform: scale(0.4);"></span>
          Email delivery may be delayed but not lost
        </li>
      </ul>
      
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2; margin-top: 1rem;">
        We recommend completing any urgent tasks before the maintenance period
        begins. All services should be fully restored by 2:00 AM on
        April 15, 2025.
      </p>
      
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2; margin-top: 1rem;">
        If you experience any issues after the maintenance is complete, please
        contact our IT support team:
      </p>
      
      <!-- Contact box -->
      <div style="background-color: #f7f7f7; padding: 16px; border-radius: 6px; font-size: 14px; color: #555; margin: 16px 0; border: 1px solid #e0e0e0; position: relative; overflow: hidden; animation: fadeIn 0.5s ease-out; z-index: 2;">
        <div style="position: relative; z-index: 1; display: flex; align-items: center; margin-bottom: 8px;">
          <span style="display: inline-block; width: 20px; margin-right: 8px; text-align: center; color: #5C6BC0;">✉️</span>
          <p style="margin: 0;"><strong>Email:</strong> itsupport@nkumbauniversity.ac.ug</p>
        </div>
        <div style="position: relative; z-index: 1; display: flex; align-items: center; margin-bottom: 8px;">
          <span style="display: inline-block; width: 20px; margin-right: 8px; text-align: center; color: #5C6BC0;">📞</span>
          <p style="margin: 0;"><strong>Phone:</strong> +256 414 123463</p>
        </div>
        <div style="position: relative; z-index: 1; display: flex; align-items: center; margin-bottom: 8px;">
          <span style="display: inline-block; width: 20px; margin-right: 8px; text-align: center; color: #5C6BC0;">🕒</span>
          <p style="margin: 0;"><strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM</p>
        </div>
      </div>
      
      <p style="margin-bottom: 16px; color: #4a4a4a; position: relative; z-index: 2; margin-top: 1rem;">
        We apologize for any inconvenience this may cause and appreciate your
        understanding.
      </p>
      
      <!-- Footer -->
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eaeaea; color: #666; font-size: 14px; position: relative; z-index: 2;">
        <div style="position: relative; z-index: 1;">
          <p style="margin-bottom: 0;">
            Regards,<br>
            <span style="font-weight: 600;">IT Department</span><br>
            Nkumba University
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

`;

const BirthdayHTML = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Birthday Greetings - Nkumba University</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;width:100%;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* GMAIL BLUE LINKS */
    u + #body a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* SAMSUNG MAIL BLUE LINKS */
    #MessageViewBody a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* Universal styles */
    body {
      background-color: #f5f5f5;
      font-family: Arial, Helvetica, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 16px;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    /* Responsive styles */
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
      }
      .fluid {
        max-width: 100% !important;
        height: auto !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .stack-column,
      .stack-column-center {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        direction: ltr !important;
      }
      .stack-column-center {
        text-align: center !important;
      }
      .center-on-narrow {
        text-align: center !important;
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
        float: none !important;
      }
      table.center-on-narrow {
        display: inline-block !important;
      }
    }

    /* Subtle animation */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; background-color: #f5f5f5;">
  <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #f5f5f5;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
    <td>
    <![endif]-->

    <!-- Preheader text (remove comment to use) -->
    <div style="max-height: 0; overflow: hidden; mso-hide: all;" aria-hidden="true">
      Nkumba University wishes you a happy birthday...
    </div>
    <!-- Visually hidden preheader text : END -->

    <!-- Email Body : BEGIN -->
    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0;" class="email-container">
      <!-- Logo Header : BEGIN -->
      <tr>
        <td style="display: flex; justify-content: center; align-items: center; padding: 20px; text-align: center; border-bottom: 2px solid #0039a6; background-color: #ffffff;">
 <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="height: auto; width:  180px" />
        </td>
      </tr>
      <!-- Logo Header : END -->

      <!-- Header : BEGIN -->
      <tr>
        <td style="padding: 25px; text-align: center; background-color: #0039a6; color: white;">
          <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; line-height: 36px; font-weight: normal;">Birthday Greetings</h1>
        </td>
      </tr>
      <!-- Header : END -->

      <!-- Main Content : BEGIN -->
      <tr>
        <td style="padding: 40px 30px; background-color: #ffffff;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <!-- Greeting : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                Dear <span style="font-weight: bold;">John Doe</span>,
              </td>
            </tr>
            <!-- Greeting : END -->

            <!-- Introduction : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                On behalf of Nkumba University, we would like to extend our sincere birthday wishes to you. As a valued member of our institution, we recognize your contributions and dedication to excellence.
              </td>
            </tr>
            <!-- Introduction : END -->

            <!-- Quote Box : BEGIN -->
            <tr>
              <td style="padding: 0 0 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 20px; background-color: #f9f9f9; border-left: 3px solid #0039a6; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; font-style: italic;">
                      "We wish you continued success and fulfillment in both your personal and professional endeavors in the coming year. Your dedication and commitment to excellence continue to inspire those around you."
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Quote Box : END -->

            <!-- Appreciation : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                Your commitment to excellence has been an asset to our university community. Throughout your time with us, you have demonstrated exceptional qualities that align with our institutional values:
              </td>
            </tr>
            <!-- Appreciation : END -->

            <!-- Qualities List : BEGIN -->
            <tr>
              <td style="padding: 0 0 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 5px 0 5px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                          <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                            <strong>Dedication</strong> to academic and professional excellence
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0 5px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                          <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                            <strong>Commitment</strong> to our university's mission and values
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0 5px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                          <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                            <strong>Positive attitude</strong> that inspires colleagues and students alike
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Qualities List : END -->

            <!-- Well Wishes : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                We hope this day brings you moments of joy and reflection. May the coming year be filled with:
              </td>
            </tr>
            <!-- Well Wishes : END -->

            <!-- Two Column Section : BEGIN -->
            <tr>
              <td style="padding: 0 0 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <!-- Column 1 : BEGIN -->
                    <td width="48%" style="padding: 10px; background-color: #f9f9f9; border: 1px solid #e0e0e0; text-align: center;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #0039a6; padding-bottom: 10px; font-weight: bold;">
                            Professional Growth
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: Arial, sans-serif; font-size: 14px; line-height: 22px; color: #333333;">
                            New opportunities for advancement and development in your career path
                          </td>
                        </tr>
                      </table>
                    </td>
                    <!-- Column 1 : END -->
                    <!-- Column Spacer : BEGIN -->
                    <td width="4%" style="padding: 0;">&nbsp;</td>
                    <!-- Column Spacer : END -->
                    <!-- Column 2 : BEGIN -->
                    <td width="48%" style="padding: 10px; background-color: #f9f9f9; border: 1px solid #e0e0e0; text-align: center;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #0039a6; padding-bottom: 10px; font-weight: bold;">
                            Personal Fulfillment
                          </td>
                        </tr>
                        <tr>
                          <td style="font-family: Arial, sans-serif; font-size: 14px; line-height: 22px; color: #333333;">
                            Moments of joy, good health, and meaningful connections with family and friends
                          </td>
                        </tr>
                      </table>
                    </td>
                    <!-- Column 2 : END -->
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Two Column Section : END -->

            <!-- Additional Message : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                As we celebrate your birthday, we also want to acknowledge the positive impact you have had on our institution. Your contributions have helped strengthen our academic community and uphold our university's reputation for excellence.
              </td>
            </tr>
            <!-- Additional Message : END -->

            <!-- Contact Information : BEGIN -->
            <tr>
              <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                Should you have any questions or require any assistance, please do not hesitate to contact our office. We are here to support you in your continued journey with Nkumba University.
              </td>
            </tr>
            <!-- Contact Information : END -->

            <!-- Signature : BEGIN -->
            <tr>
              <td style="padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 5px;">
                      Regards,
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; font-weight: bold; padding-bottom: 5px;">
                      The Nkumba University Administration
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Arial, sans-serif; font-size: 14px; line-height: 22px; color: #666666; padding-bottom: 5px;">
                      Office of University Relations
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Arial, sans-serif; font-size: 14px; line-height: 22px; color: #666666;">
                      Entebbe, Uganda
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Signature : END -->
          </table>
        </td>
      </tr>
      <!-- Main Content : END -->

      <!-- University Motto : BEGIN -->
      <tr>
        <td style="padding: 15px; text-align: center; background-color: #ffcc00; color: #0039a6; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; font-weight: bold;">
          "I OWE YOU"
        </td>
      </tr>
      <!-- University Motto : END -->

      <!-- Footer : BEGIN -->
      <tr>
        <td style="padding: 20px; background-color: #f2f2f2; text-align: center; border-top: 1px solid #e0e0e0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <!-- Contact Information : BEGIN -->
            <tr>
              <td style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666; text-align: center;">
                <strong>Contact Information:</strong>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666; text-align: center;">
                Email: <a href="mailto:info@nkumbauniversity.ac.ug" style="color: #0039a6; text-decoration: none;">info@nkumbauniversity.ac.ug</a> | Phone: +256 414 123456
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666; text-align: center;">
                Entebbe Road, Kawuku | P.O. Box 237, Entebbe, Uganda
              </td>
            </tr>
            <!-- Contact Information : END -->

            <!-- Divider : BEGIN -->
            <tr>
              <td style="padding: 15px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="border-top: 1px solid #e0e0e0; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Divider : END -->

            <!-- Copyright : BEGIN -->
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 12px; line-height: 18px; color: #999999; text-align: center;">
                © Nkumba University. All rights reserved.
              </td>
            </tr>
            <!-- Copyright : END -->

            <!-- Unsubscribe : BEGIN -->
            <tr>
              <td style="padding-top: 10px; font-family: Arial, sans-serif; font-size: 12px; line-height: 18px; color: #999999; text-align: center;">
                This is an automated message from Nkumba University.
              </td>
            </tr>
            <!-- Unsubscribe : END -->
          </table>
        </td>
      </tr>
      <!-- Footer : END -->
    </table>
    <!-- Email Body : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>

`;

const GradClearHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Graduation Clearance Approval</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f9fc; color: #333333; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Congratulations! Your graduation clearance has been approved by The University Bursar department. Your clearance process is moving forward.
  </div>
  
  <!-- Main Container -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f7f9fc;">
    <tr>
      <td align="center" valign="top" style="padding: 40px 10px;">
        <!-- Email Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.1);">
          
          <!-- Top Border Accent -->
          <tr>
            <td style="height: 8px; background: linear-gradient(90deg, green 0%, #0052cc 100%);"></td>
          </tr>
          
          <!-- Header Section -->
          <tr>
            <td style="padding: 0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 30px 40px; background-color: #FABA5F; background-image: url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z\" fill=\"%23ffffff\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E'); background-position: center; background-repeat: repeat;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td width="50%" style="vertical-align: middle;">
                          <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="display: block; max-width: 180px; height: auto; -ms-interpolation-mode: bicubic;">
                        </td>
                        <td width="50%" style="vertical-align: middle; text-align: right;">
                          <p style="margin: 0; font-size: 14px; color: #ffffff; opacity: 0.9;">GRADUATION CLEARANCE</p>
                          <p style="margin: 5px 0 0; font-size: 14px; color: #ffffff; opacity: 0.7;">Ref: GC-2025-0472</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Status Banner - Approval -->
          <tr>
            <td style="padding: 0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="background-color: #e8f5e9; border-left: 5px solid #2e7d32; padding: 20px 40px; animation: fadeIn 0.5s ease-in-out;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td width="40" style="vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #2e7d32; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 32px; color: white; font-weight: bold; font-size: 16px;">✓</div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 15px;">
                          <p style="margin: 0; font-size: 18px; font-weight: 600; color: #2e7d32;">Good News: Clearance Approved</p>
                          <p style="margin: 5px 0 0; font-size: 14px; color: #4b5563;">Your clearance request has been processed successfully</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <!-- Greeting -->
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.5; color: #4b5563; animation: fadeIn 0.7s ease-in-out;">
                Hello <span style="font-weight: 600; text-transform: uppercase; color: #1f2937;">MUSIITWA JOEL</span>,
              </p>
              
              <!-- Main Message -->
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #4b5563; animation: fadeIn 0.9s ease-in-out;">
                We are pleased to inform you that your graduation clearance form has been <span style="font-weight: 600; color: #2e7d32;">approved</span> by <span style="font-weight: 600; color: #1f2937;">The University Bursar department</span>. This is an important milestone in your graduation process.
              </p>
              
              <!-- Approval Details Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); animation: slideIn 1s ease-in-out;">
                <tr>
                  <td style="background-color: #f8fafc; padding: 20px 25px; border: 1px solid #e5e7eb;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">Clearance Details</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Department:</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">The University Bursar department</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Status:</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2e7d32;">Approved</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Date Approved:</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #1f2937;">May 15, 2025</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Approved By:</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #1f2937;">Mr. John Mukasa</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Next Department:</p>
                              </td>
                              <td width="50%" style="padding: 5px 0; vertical-align: top;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">Academic Registrar department</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Next Steps Section -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; animation: slideIn 1.2s ease-in-out;">
                <tr>
                  <td style="background-color: #f0f7ff; padding: 25px; border-left: 5px solid #00308F;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #00308F;">Next Steps</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #4b5563;">
                            Your clearance form has now been forwarded to the <span style="font-weight: 600; color: #1f2937;">Academic Registrar department</span> for further processing. Here's what happens next:
                          </p>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td width="30" style="vertical-align: top; padding-top: 5px;">
                                <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #00308F; color: white; text-align: center; line-height: 20px; font-size: 12px; font-weight: bold;">1</div>
                              </td>
                              <td style="vertical-align: top; padding: 5px 0 10px 10px;">
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4b5563;">The Academic Registrar will review your academic records and verify that all requirements have been met.</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="30" style="vertical-align: top; padding-top: 5px;">
                                <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #00308F; color: white; text-align: center; line-height: 20px; font-size: 12px; font-weight: bold;">2</div>
                              </td>
                              <td style="vertical-align: top; padding: 5px 0 10px 10px;">
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4b5563;">You will receive another email notification once the Academic Registrar has processed your clearance.</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="30" style="vertical-align: top; padding-top: 5px;">
                                <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #00308F; color: white; text-align: center; line-height: 20px; font-size: 12px; font-weight: bold;">3</div>
                              </td>
                              <td style="vertical-align: top; padding: 5px 0 0 10px;">
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4b5563;">Continue to monitor your student portal for real-time updates on your clearance status.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Clearance Progress Tracker -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 35px; border-collapse: collapse; animation: fadeIn 1.4s ease-in-out;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">Your Clearance Progress</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <!-- Progress Bar -->
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td width="40%" style="background-color: #2e7d32; height: 8px; border-radius: 4px 0 0 4px;"></td>
                              <td width="60%" style="background-color: #e5e7eb; height: 8px; border-radius: 0 4px 4px 0;"></td>
                            </tr>
                          </table>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td width="40%" style="text-align: left; padding-top: 8px;">
                                <p style="margin: 0; font-size: 12px; color: #6b7280;">40% Complete</p>
                              </td>
                              <td width="60%" style="text-align: right; padding-top: 8px;">
                                <p style="margin: 0; font-size: 12px; color: #6b7280;">3 of 7 departments</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Department Status -->
                      <tr>
                        <td>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                            <!-- Header Row -->
                            <tr>
                              <td width="50%" style="padding: 12px 15px; background-color: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">Department</p>
                              </td>
                              <td width="30%" style="padding: 12px 15px; background-color: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">Status</p>
                              </td>
                              <td width="20%" style="padding: 12px 15px; background-color: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">Date</p>
                              </td>
                            </tr>
                            
                            <!-- Department 1 -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Faculty Department</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2e7d32;">Approved</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">May 10, 2025</p>
                              </td>
                            </tr>
                            
                            <!-- Department 2 -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Library Department</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2e7d32;">Approved</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">May 12, 2025</p>
                              </td>
                            </tr>
                            
                            <!-- Department 3 (Current) -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; background-color: #f0f7ff;">
                                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #1f2937;">University Bursar</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; background-color: #f0f7ff;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2e7d32;">Approved</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; background-color: #f0f7ff;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">May 15, 2025</p>
                              </td>
                            </tr>
                            
                            <!-- Department 4 (Next) -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Academic Registrar</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-style: italic; color: #6b7280;">Pending</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">-</p>
                              </td>
                            </tr>
                            
                            <!-- Department 5 -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Student Affairs</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-style: italic; color: #6b7280;">Pending</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">-</p>
                              </td>
                            </tr>
                            
                            <!-- Department 6 -->
                            <tr>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Halls of Residence</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; font-style: italic; color: #6b7280;">Pending</p>
                              </td>
                              <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">-</p>
                              </td>
                            </tr>
                            
                            <!-- Department 7 -->
                            <tr>
                              <td style="padding: 12px 15px;">
                                <p style="margin: 0; font-size: 14px; color: #4b5563;">Vice Chancellor's Office</p>
                              </td>
                              <td style="padding: 12px 15px;">
                                <p style="margin: 0; font-size: 14px; font-style: italic; color: #6b7280;">Pending</p>
                              </td>
                              <td style="padding: 12px 15px;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">-</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Important Information -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 35px; border-collapse: collapse; animation: fadeIn 1.6s ease-in-out;">
                <tr>
                  <td style="padding: 20px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td width="30" style="vertical-align: top;">
                          <div style="width: 24px; height: 24px; text-align: center;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'%3E%3C/path%3E%3Cline x1='12' y1='9' x2='12' y2='13'%3E%3C/line%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E" alt="Important" style="display: block; width: 24px; height: 24px;">
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 15px;">
                          <p style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #92400e;">Important Information</p>
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #92400e;">
                            Please continue to monitor your student portal for real-time updates on your clearance status. If you have any questions or concerns, please contact the respective department directly.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 35px; border-collapse: collapse; animation: pulse 2s infinite;">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <table border="0" cellspacing="0" cellpadding="  style="padding: 10px 0;">
                    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="background-color: #00308F; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                          <a href="https://portal.nkumbauniversity.ac.ug" target="_blank" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">Track Your Clearance Status</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Information -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; border-collapse: collapse; animation: fadeIn 1.8s ease-in-out;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">Need Assistance?</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 15px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0 0 5px; font-size: 14px; font-weight: 600; color: #4b5563;">University Bursar Department</p>
                                <p style="margin: 0 0 5px; font-size: 14px; color: #6b7280;">Email: bursar@nkumbauniversity.ac.ug</p>
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Phone: +256 414 123456</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 15px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0 0 5px; font-size: 14px; font-weight: 600; color: #4b5563;">Academic Registrar Department</p>
                                <p style="margin: 0 0 5px; font-size: 14px; color: #6b7280;">Email: registrar@nkumbauniversity.ac.ug</p>
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Phone: +256 414 123457</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Closing Message -->
              <p style="margin: 0 0 40px; font-size: 16px; line-height: 1.6; color: #4b5563; animation: fadeIn 2s ease-in-out;">
                We wish you all the best as you complete your graduation clearance process. Congratulations on this significant milestone in your academic journey!
              </p>
              
              <!-- Signature -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; border-collapse: collapse;">
                <tr>
                  <td>
                    <p style="margin: 0 0 5px; font-size: 16px; color: #4b5563;">Sincerely,</p>
                    <p style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #1f2937;">Office of the University Bursar</p>
                    <p style="margin: 0; font-size: 16px; color: #4b5563;">Nkumba University</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #e5e7eb;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <img src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg" alt="Nkumba University Logo" style="display: block; max-width: 120px; height: auto; -ms-interpolation-mode: bicubic;">
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <p style="margin: 0; font-size: 14px; color: #4b5563;">P.O. Box 237, Entebbe, Uganda</p>
                          <p style="margin: 5px 0 0; font-size: 14px; color: #4b5563;">Tel: +256 414 123456 | Email: info@nkumbauniversity.ac.ug</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="padding: 0 10px;">
                                <a href="https://www.facebook.com/nkumbauni/" target="_blank" style="">
                                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'%3E%3C/path%3E%3C/svg%3E" alt="Facebook" style="display: block; width: 24px; height: 24px;">
                                </a>
                              </td>
                              <td style="padding: 0 10px;">
                                <a href="https://x.com/NkumbaUni" target="_blank" style="">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
</svg>                                </a>
                              </td>


                                 <td style="padding: 0 10px;">
                                <a href="https://www.tiktok.com/@nkumba_university" target="_blank" style="">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path fill="#212121" fill-rule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191	C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clip-rule="evenodd"></path><path fill="#ec407a" fill-rule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011	c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413	c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413V20.607L29.208,20.607z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1	c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391	C17.213,29.127,17.972,30.274,19.079,30.832z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157	c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923V28.79c-0.007,1.867-1.523,3.379-3.393,3.379	c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391	c0.359,0,0.705,0.056,1.03,0.159v-3.19c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183	c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clip-rule="evenodd"></path><path fill="#81d4fa" fill-rule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848	C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019	c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338	c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069	c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183	C14.374,24.749,17.611,21.463,21.635,21.38z" clip-rule="evenodd"></path>
</svg>                              </td>




                              <td style="padding: 0 10px;">
                                <a href="https://www.instagram.com/nkumba_uni" target="_blank" style="">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
</svg>                               </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 5px; font-size: 12px; color: #6b7280;">This is an automated message. Please do not reply to this email.</p>
                          <p style="margin: 0 0 5px; font-size: 12px; color: #6b7280;">© Nkumba University. All rights reserved.</p>
                          <p style="margin: 0; font-size: 12px; color: #6b7280;">
                            <a href="#" style="color: #00308F; text-decoration: none;">Privacy Policy</a> | 
                            <a href="#" style="color: #00308F; text-decoration: none;">Terms of Service</a> | 
                            <a href="#" style="color: #00308F; text-decoration: none;">Contact Us</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Bottom Border Accent -->
          <tr>
            <td style="height: 8px; background: linear-gradient(90deg, #00308F 0%, #0052cc 100%);"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  
  <!-- CSS Animations (will only work in email clients that support it) -->
  <style type="text/css">
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @media screen and (max-width: 600px) {
      table[class="container"] {
        width: 100% !important;
      }
      
      td[class="mobile-padding"] {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      
      td[class="mobile-stack"] {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  </style>
</body>
</html>
`;

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Content } = Layout;
const { Dragger } = Upload;
const { SubMenu } = Menu;

// Mock data for recipients
const mockRecipients = [
  {
    id: 1,
    name: "John Musiitwa",
    email: "jmusiitwa.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Computer Science",
    year: "3",
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Nakato",
    email: "snakato.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Business Administration",
    year: "2",
    avatar: null,
  },
  {
    id: 3,
    name: "Dr. Robert Mukasa",
    email: "rmukasa@nkumbauniversity.ac.ug",
    group: "Faculty",
    department: "Computer Science",
    position: "Senior Lecturer",
    avatar: null,
  },
  {
    id: 4,
    name: "Jane Akello",
    email: "jakello@nkumbauniversity.ac.ug",
    group: "Staff",
    department: "Finance",
    position: "Accountant",
    avatar: null,
  },
  {
    id: 5,
    name: "David Ochieng",
    email: "dochieng.std@nkumbauniversity.ac.ug",
    group: "Student",
    department: "Engineering",
    year: "4",
    avatar: null,
  },
];

// Mock data for recipient groups
const mockRecipientGroups = [
  {
    id: 1,
    name: "All Students",
    count: 5000,
    description: "All enrolled students",
  },
  {
    id: 2,
    name: "Faculty Members",
    count: 250,
    description: "All teaching staff",
  },
  {
    id: 3,
    name: "Administrative Staff",
    count: 120,
    description: "All non-teaching staff",
  },
  {
    id: 4,
    name: "Computer Science Department",
    count: 450,
    description: "Students and faculty in Computer Science",
  },
  {
    id: 5,
    name: "Business School",
    count: 1200,
    description: "Students and faculty in Business School",
  },
  {
    id: 6,
    name: "First Year Students",
    count: 1500,
    description: "All first-year students",
  },
];

// Mock data for sent emails
const mockSentEmails = [
  {
    id: 1,
    subject: "End of Semester Examination Schedule",
    recipients: 1245,
    delivered: 1240,
    opened: 980,
    clicked: 750,
    failed: 5,
    sentDate: "2025-04-05T10:30:00",
    status: "completed",
    template: "Academic Announcement",
  },
  {
    id: 2,
    subject: "Tuition Payment Deadline Reminder",
    recipients: 3500,
    delivered: 3480,
    opened: 2800,
    clicked: 2100,
    failed: 20,
    sentDate: "2025-04-02T09:15:00",
    status: "completed",
    template: "Financial Announcement",
  },
  {
    id: 3,
    subject: "Campus Security Alert",
    recipients: 5870,
    delivered: 5850,
    opened: 4900,
    clicked: 3200,
    failed: 20,
    sentDate: "2025-03-28T16:45:00",
    status: "completed",
    template: "Urgent Announcement",
  },
  {
    id: 4,
    subject: "Library Hours Update",
    recipients: 5000,
    delivered: 4980,
    opened: 3100,
    clicked: 1800,
    failed: 20,
    sentDate: "2025-03-25T11:20:00",
    status: "completed",
    template: "Standard Announcement",
  },
  {
    id: 5,
    subject: "Career Fair 2025 Invitation",
    recipients: 4500,
    delivered: 4480,
    opened: 3600,
    clicked: 2900,
    failed: 20,
    sentDate: "2025-03-20T14:10:00",
    status: "completed",
    template: "Event Invitation",
  },
];

// Email Sender Admin Component
const EmailSenderWithTemplates = () => {
  const [activeTab, setActiveTab] = useState("compose");
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [recipientDrawerVisible, setRecipientDrawerVisible] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [sentEmails, setSentEmails] = useState(mockSentEmails);
  const [emailConfigured, setEmailConfigured] = useState(true);
  const [emailSettings, setEmailSettings] = useState({
    host: "",
    port: "587",
    secure: false,
    user: "",
    password: "",
    fromName: "Nkumba University",
    fromEmail: "no-reply@nkumbauniversity.ac.ug",
  });
  const [recipientSearchText, setRecipientSearchText] = useState("");
  const [groupSearchText, setGroupSearchText] = useState("");
  const [filteredRecipients, setFilteredRecipients] = useState(mockRecipients);
  const [filteredGroups, setFilteredGroups] = useState(mockRecipientGroups);
  const [emailDetailVisible, setEmailDetailVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // New state for professional templates
  const [selectedProfessionalTemplate, setSelectedProfessionalTemplate] =
    useState(null);
  const [templateHtml, setTemplateHtml] = useState("");

  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const templateContainerRef = useRef(null);

  // Fetch email templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Filter recipients when search text changes
  useEffect(() => {
    if (recipientSearchText) {
      const filtered = mockRecipients.filter(
        (recipient) =>
          recipient.name
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          recipient.email
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          recipient.group
            .toLowerCase()
            .includes(recipientSearchText.toLowerCase()) ||
          (recipient.department &&
            recipient.department
              .toLowerCase()
              .includes(recipientSearchText.toLowerCase()))
      );
      setFilteredRecipients(filtered);
    } else {
      setFilteredRecipients(mockRecipients);
    }
  }, [recipientSearchText]);

  // Filter groups when search text changes
  useEffect(() => {
    if (groupSearchText) {
      const filtered = mockRecipientGroups.filter(
        (group) =>
          group.name.toLowerCase().includes(groupSearchText.toLowerCase()) ||
          group.description
            .toLowerCase()
            .includes(groupSearchText.toLowerCase())
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups(mockRecipientGroups);
    }
  }, [groupSearchText]);

  // Fetch email templates from the server
  const fetchTemplates = async () => {
    try {
      setLoading(true);

      // Convert our professional template registry to the format expected by the admin
      const professionalTemplates = emailTemplateRegistry.map(
        (template, index) => ({
          id: 100 + index, // Use IDs that won't conflict with existing templates
          name: template.name,
          subject: template.subject,
          content: "", // The actual content will be generated dynamically
          category: template.category,
          templateType: "professional", // Add this to identify professional templates
          templateId: template.id, // Store the original template ID
        })
      );

      // Set templates
      setTemplates(professionalTemplates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
      message.error("Failed to fetch email templates");
      setLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateChange = (templateId) => {
    const template = templates.find(
      (t) => t.id === Number.parseInt(templateId)
    );

    if (template) {
      setSelectedTemplate(template);

      if (template.templateType === "professional") {
        // For professional templates, we'll render the actual component
        setSelectedProfessionalTemplate(template.templateId);
        setEmailContent(""); // Clear the standard template content

        // Set the subject from the template
        form.setFieldsValue({
          subject: template.subject,
        });

        // Generate the preview content
        generateProfessionalTemplateHtml(template.templateId);
      }
    }
  };

  // Generate HTML for professional templates
  const generateProfessionalTemplateHtml = (templateId) => {
    // Get form values to use as variables
    const formValues = form.getFieldsValue();

    // Create variables object for the template
    const variables = {
      recipient_name: formValues.recipientName || "Valued Member",
      studentName: formValues.recipientName || "Student",
      userName: formValues.recipientName || "User",
      subject: formValues.subject || "",
      announcement_title: formValues.subject || "University Announcement",
      announcement_content:
        formValues.message ||
        "This is an important announcement from the university.",
      program: formValues.program || "Bachelor of Science",
      dueDate: formValues.dueDate || "April 30, 2025",
      paymentMethods:
        formValues.paymentMethods || "Bank Transfer, Mobile Money",
      portal_link: "https://portal.nkumbauniversity.ac.ug",
      finance_portal_link: "https://finance.nkumbauniversity.ac.ug",
    };

    // In a real implementation, you would use a server-side rendering approach
    // or a client-side approach to capture the rendered HTML

    // For this example, we'll set a placeholder
    setTemplateHtml(`<div>Professional template: ${templateId}</div>`);
  };

  // Add this function to check email delivery status
  const checkEmailDeliveryStatus = async (messageId) => {
    try {
      setLoading(true);

      // In a real app, this would be an API call
      // const response = await axios.get(`/api/email-status/${messageId}`);

      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        setLoading(false);
        Modal.info({
          title: "Email Delivery Status",
          content: (
            <div>
              <p>
                <strong>Message ID:</strong> {messageId}
              </p>
              <p>
                <strong>Status:</strong> Sent to mail server
              </p>
              <p>
                <strong>Note:</strong> This only confirms the email was accepted
                by your mail server. It does not guarantee final delivery to the
                recipient's inbox.
              </p>
              <p>Common reasons for non-delivery:</p>
              <ul>
                <li>Recipient's email address is incorrect</li>
                <li>Email was filtered as spam</li>
                <li>Recipient's mailbox is full</li>
                <li>Mail server configuration issues</li>
              </ul>
            </div>
          ),
        });
      }, 1000);
    } catch (error) {
      console.error("Error checking email status:", error);
      message.error("Failed to check email status");
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (selectedRecipients.length === 0 && selectedGroups.length === 0) {
        message.error("Please select at least one recipient or group");
        return;
      }

      setLoading(true);

      // Prepare recipient list
      let recipientEmails = [];

      // Add individual recipients
      if (selectedRecipients.length > 0) {
        recipientEmails = selectedRecipients.map((r) => r.email);
      }

      // Add group recipients (in a real app, this would fetch emails from the database)
      if (selectedGroups.length > 0) {
        // For demo purposes, we'll just add some dummy emails
        const groupEmails = selectedGroups.flatMap((group) => {
          return mockRecipients
            .filter(
              (r) =>
                r.group ===
                (group.id === 1
                  ? "Student"
                  : group.id === 2
                    ? "Faculty"
                    : "Staff")
            )
            .map((r) => r.email);
        });

        recipientEmails = [...new Set([...recipientEmails, ...groupEmails])];
      }

      // Process template variables
      const variables = {
        announcement_title: values.subject,
        announcement_content: values.message,
        recipient_name: "Valued Member",
        portal_link: "https://portal.nkumbauniversity.ac.ug",
        due_date: values.dueDate || "N/A",
        payment_methods: values.paymentMethods || "Bank Transfer, Mobile Money",
        finance_portal_link: "https://finance.nkumbauniversity.ac.ug",
      };

      // In a real app, this would be an API call to send the email
      // const response = await axios.post('/api/send-email', {
      //   from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
      //   to: recipientEmails.join(','),
      //   subject: values.subject,
      //   template: emailContent,
      //   variables: variables,
      //   attachments: values.attachments ? values.attachments.fileList : [],
      // });

      // For demo purposes, we'll simulate a successful email send
      setTimeout(() => {
        // Add to sent emails
        const newEmail = {
          id: sentEmails.length + 1,
          subject: values.subject,
          recipients: recipientEmails.length,
          delivered: recipientEmails.length,
          opened: 0,
          clicked: 0,
          failed: 0,
          sentDate: new Date().toISOString(),
          status: "completed",
          template: selectedTemplate ? selectedTemplate.name : "Custom",
        };

        setSentEmails([newEmail, ...sentEmails]);

        // Reset form
        form.resetFields();
        setSelectedRecipients([]);
        setSelectedGroups([]);
        setEmailContent("");
        setSelectedTemplate(null);
        setSelectedProfessionalTemplate(null);

        setLoading(false);
        message.success(
          `Email sent successfully to ${recipientEmails.length} recipients`
        );

        // Switch to history tab
        setActiveTab("history");
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      message.error("Failed to send email");
      setLoading(false);
    }
  };

  // Handle recipient selection
  const handleRecipientSelect = (recipient) => {
    const isSelected = selectedRecipients.some((r) => r.id === recipient.id);

    if (isSelected) {
      setSelectedRecipients(
        selectedRecipients.filter((r) => r.id !== recipient.id)
      );
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  // Handle group selection
  const handleGroupSelect = (group) => {
    const isSelected = selectedGroups.some((g) => g.id === group.id);

    if (isSelected) {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  // View email details
  const viewEmailDetails = (email) => {
    setSelectedEmail(email);
    setEmailDetailVisible(true);
  };

  // Columns for sent emails table
  const sentEmailsColumns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
      render: (template) => <Tag color="blue">{template}</Tag>,
    },
    {
      title: "Recipients",
      dataIndex: "recipients",
      key: "recipients",
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
      render: (delivered, record) => (
        <Tooltip title="Emails accepted by the mail server">
          <span>
            {delivered} ({Math.round((delivered / record.recipients) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Opened",
      dataIndex: "opened",
      key: "opened",
      render: (opened, record) => (
        <Tooltip title="Recipients who opened the email">
          <span>
            {opened} ({Math.round((opened / record.delivered) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Clicked",
      dataIndex: "clicked",
      key: "clicked",
      render: (clicked, record) => (
        <Tooltip title="Recipients who clicked links in the email">
          <span>
            {clicked} ({Math.round((clicked / record.opened) * 100)}%)
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let icon;

        switch (status) {
          case "completed":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
          case "failed":
            color = "error";
            icon = <CloseCircleOutlined />;
            break;
          case "in-progress":
            color = "processing";
            icon = <LoadingOutlined />;
            break;
          default:
            color = "default";
            icon = null;
        }

        return (
          <Badge
            status={color}
            text={
              <Space>
                {icon}
                {status}
              </Space>
            }
          />
        );
      },
    },
    {
      title: "Sent Date",
      dataIndex: "sentDate",
      key: "sentDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => viewEmailDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Check Delivery Status">
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => checkEmailDeliveryStatus(record.id)}
            />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button type="text" icon={<CopyOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Upload props for attachments
  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // Function to render the appropriate template component
  const renderProfessionalTemplate = (templateId, variables) => {
    // Use the existing template components directly
    switch (templateId) {
      case "admission":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: admissionTemplate,
            }}
          ></div>
        );
      case "general":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: generalTemplateHtml,
            }}
          ></div>
        );
      case "registration":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: semesterRegistration,
            }}
          ></div>
        );

      case "exam":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: ExamNotificationHTML,
            }}
          ></div>
        );
      case "grades":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: GradeReleaseHTML,
            }}
          ></div>
        );

      case "tuition":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: TuitionReminderHTML,
            }}
          ></div>
        );
      case "payment":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: PaymentConfirmationHTML,
            }}
          ></div>
        );
      case "helpdesk":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: SupportTicketHTML,
            }}
          ></div>
        );
      case "event":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: EventInvitationHTML,
            }}
          ></div>
        );
      case "login":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: LoginAlertHTML,
            }}
          ></div>
        );
      case "otp":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: OTPHTML,
            }}
          ></div>
        );
      case "account":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: AccountCreationHTML,
            }}
          ></div>
        );
      case "password":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: PasswordResetHTML,
            }}
          ></div>
        );
      case "welcome":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: WelcomeTemplateHTML,
            }}
          ></div>
        );
      case "maintenance":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: MaintenanceHTML,
            }}
          ></div>
        );
      case "birthday":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: BirthdayHTML,
            }}
          ></div>
        );
      case "gradclearence":
        return (
          <div
            contentEditable="false"
            dangerouslySetInnerHTML={{
              __html: GradClearHTML,
            }}
          ></div>
        );
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <Spin spinning={loading} tip="Processing...">
        <Card
          title={
            <Title level={3} style={{ margin: 0, color: "#4B0082" }}>
              Email Communication System
            </Title>
          }
          extra={
            <Space>
              {activeTab === "compose" && (
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setPreviewVisible(true)}
                  disabled={!selectedProfessionalTemplate}
                  style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
                >
                  Preview
                </Button>
              )}
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <MailOutlined /> Compose Email
                </span>
              }
              key="compose"
            >
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="template" label="Email Template">
                      <Select
                        placeholder="Select a template"
                        onChange={handleTemplateChange}
                        allowClear
                      >
                        <Option value="" disabled>
                          -- Official Communication Templates --
                        </Option>
                        {templates
                          .filter((t) =>
                            [
                              "general",
                              "admission",
                              "registration",
                              "exam",
                              "grades",
                              "tuition",
                              "payment",
                              "event",
                              "welcome",
                              "helpdesk",
                            ].includes(t.templateId)
                          )
                          .map((template) => (
                            <Option key={template.id} value={template.id}>
                              {template.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the email subject",
                        },
                      ]}
                    >
                      <Input placeholder="Enter email subject" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Additional fields for professional templates */}
                {selectedProfessionalTemplate && (
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="recipientName" label="Recipient Name">
                        <Input placeholder="e.g., John Doe" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="program"
                        label="Program (for academic templates)"
                      >
                        <Input placeholder="e.g., Bachelor of Science in Computer Science" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <Form.Item
                  label={
                    <Space>
                      Recipients
                      <Tooltip title="Select individual recipients or groups">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Button
                    type="dashed"
                    onClick={() => setRecipientDrawerVisible(true)}
                    style={{ width: "100%" }}
                    icon={<UserOutlined />}
                  >
                    Select Recipients
                  </Button>

                  {(selectedRecipients.length > 0 ||
                    selectedGroups.length > 0) && (
                    <div style={{ marginTop: 8 }}>
                      {selectedRecipients.length > 0 && (
                        <div style={{ marginBottom: 8 }}>
                          <Text strong>
                            Individual Recipients ({selectedRecipients.length}):
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            {selectedRecipients.map((recipient) => (
                              <Tag
                                key={recipient.id}
                                closable
                                onClose={() => handleRecipientSelect(recipient)}
                                style={{ marginBottom: 4 }}
                              >
                                {recipient.name} ({recipient.email})
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedGroups.length > 0 && (
                        <div>
                          <Text strong>Groups:</Text>
                          <div style={{ marginTop: 4 }}>
                            {selectedGroups.map((group) => (
                              <Tag
                                key={group.id}
                                color="blue"
                                closable
                                onClose={() => handleGroupSelect(group)}
                                style={{ marginBottom: 4 }}
                              >
                                {group.name} ({group.count})
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the email message",
                    },
                  ]}
                >
                  <TextArea rows={6} placeholder="Enter your message here" />
                </Form.Item>

                {/* Show template preview for professional templates */}
                {selectedProfessionalTemplate && (
                  <Form.Item
                    label="Professional Template Preview"
                    help="This is how your email will look with the selected professional template"
                  >
                    <div
                      style={{
                        border: "1px solid #d9d9d9",
                        borderRadius: 4,
                        padding: 8,
                        height: 300,
                        overflow: "auto",
                        backgroundColor: "#fff",
                      }}
                    >
                      {/* Directly render the template component */}
                      {renderProfessionalTemplate(
                        selectedProfessionalTemplate,
                        {
                          recipientName:
                            form.getFieldValue("recipientName") ||
                            "Valued Member",
                          studentName:
                            form.getFieldValue("recipientName") || "Student",
                          userName:
                            form.getFieldValue("recipientName") || "User",
                          program:
                            form.getFieldValue("program") ||
                            "Bachelor of Science",
                          subject: form.getFieldValue("subject") || "",
                          message:
                            form.getFieldValue("message") ||
                            "This is an important announcement from the university.",
                          dueDate:
                            form.getFieldValue("dueDate") || "April 30, 2025",
                          paymentMethods:
                            form.getFieldValue("paymentMethods") ||
                            "Bank Transfer, Mobile Money",
                        }
                      )}
                    </div>
                  </Form.Item>
                )}

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="dueDate"
                      label="Due Date (for financial notices)"
                    >
                      <Input placeholder="e.g., April 30, 2025" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="paymentMethods"
                      label="Payment Methods (for financial notices)"
                    >
                      <Input placeholder="e.g., Bank Transfer, Mobile Money" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="attachments" label="Attachments">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Select Files</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      style={{
                        backgroundColor: "#4B0082",
                        borderColor: "#4B0082",
                      }}
                    >
                      Send Email
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={() => {
                        form.resetFields();
                        setSelectedRecipients([]);
                        setSelectedGroups([]);
                        setEmailContent("");
                        setSelectedTemplate(null);
                        setSelectedProfessionalTemplate(null);
                      }}
                    >
                      Reset
                    </Button>
                    <Button htmlType="button" icon={<SaveOutlined />}>
                      Save as Draft
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <HistoryOutlined /> Email History
                </span>
              }
              key="history"
            >
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col flex="auto">
                    <Input
                      placeholder="Search emails"
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </Col>
                  <Col>
                    <Button icon={<FilterOutlined />}>Filter</Button>
                  </Col>
                  <Col>
                    <Button icon={<DownloadOutlined />}>Export</Button>
                  </Col>
                </Row>
              </div>

              <Table
                columns={sentEmailsColumns}
                dataSource={sentEmails}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <FileTextOutlined /> Templates
                </span>
              }
              key="templates"
            >
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col flex="auto">
                    <Input
                      placeholder="Search templates"
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{
                        backgroundColor: "#4B0082",
                        borderColor: "#4B0082",
                      }}
                    >
                      Create Template
                    </Button>
                  </Col>
                </Row>
              </div>

              <Row gutter={[16, 16]}>
                {templates.map((template) => (
                  <Col xs={24} sm={12} md={8} key={template.id}>
                    <Card
                      hoverable
                      title={template.name}
                      extra={<Tag color="purple">{template.category}</Tag>}
                      actions={[
                        <Tooltip title="Preview" key="preview">
                          <EyeOutlined
                            onClick={() => {
                              handleTemplateChange(template.id);
                              setPreviewVisible(true);
                            }}
                          />
                        </Tooltip>,
                        <Tooltip title="Edit" key="edit">
                          <EditOutlined />
                        </Tooltip>,
                        <Tooltip title="Delete" key="delete">
                          <DeleteOutlined />
                        </Tooltip>,
                      ]}
                    >
                      <div style={{ height: 100, overflow: "hidden" }}>
                        <Text
                          ellipsis={{ rows: 2 }}
                          style={{ marginBottom: 8 }}
                        >
                          {template.subject}
                        </Text>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span>
                            Professional template with dynamic content
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>
        </Card>

        {/* Email Preview Modal */}
        <Modal
          title="Email Preview"
          visible={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={[
            <Button key="close" onClick={() => setPreviewVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 4,
              padding: 16,
              backgroundColor: "#fff",
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {selectedProfessionalTemplate &&
              // Directly render the template component
              renderProfessionalTemplate(selectedProfessionalTemplate, {
                recipientName:
                  form.getFieldValue("recipientName") || "Valued Member",
                studentName: form.getFieldValue("recipientName") || "Student",
                userName: form.getFieldValue("recipientName") || "User",
                program: form.getFieldValue("program") || "Bachelor of Science",
                subject: form.getFieldValue("subject") || "",
                message:
                  form.getFieldValue("message") ||
                  "This is an important announcement from the university.",
                dueDate: form.getFieldValue("dueDate") || "April 30, 2025",
                paymentMethods:
                  form.getFieldValue("paymentMethods") ||
                  "Bank Transfer, Mobile Money",
              })}
          </div>
        </Modal>

        {/* Recipients Drawer */}
        <Drawer
          title="Select Recipients"
          placement="right"
          onClose={() => setRecipientDrawerVisible(false)}
          visible={recipientDrawerVisible}
          width={600}
          extra={
            <Space>
              <Button onClick={() => setRecipientDrawerVisible(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => setRecipientDrawerVisible(false)}
                style={{ backgroundColor: "#4B0082", borderColor: "#4B0082" }}
              >
                Done
              </Button>
            </Space>
          }
        >
          <Tabs defaultActiveKey="individuals">
            <TabPane
              tab={
                <span>
                  <UserOutlined /> Individual Recipients
                </span>
              }
              key="individuals"
            >
              <Input
                placeholder="Search recipients"
                prefix={<SearchOutlined />}
                value={recipientSearchText}
                onChange={(e) => setRecipientSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
                allowClear
              />

              <List
                itemLayout="horizontal"
                dataSource={filteredRecipients}
                renderItem={(recipient) => (
                  <List.Item
                    actions={[
                      <Checkbox
                        key={recipient.id}
                        checked={selectedRecipients.some(
                          (r) => r.id === recipient.id
                        )}
                        onChange={() => handleRecipientSelect(recipient)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<UserOutlined />}
                          style={{
                            backgroundColor:
                              recipient.group === "Student"
                                ? "#1890ff"
                                : "#52c41a",
                          }}
                        />
                      }
                      title={recipient.name}
                      description={
                        <>
                          <div>{recipient.email}</div>
                          <div>
                            <Tag
                              color={
                                recipient.group === "Student"
                                  ? "blue"
                                  : recipient.group === "Faculty"
                                    ? "green"
                                    : "orange"
                              }
                            >
                              {recipient.group}
                            </Tag>
                            {recipient.department && (
                              <Tag color="purple">{recipient.department}</Tag>
                            )}
                            {recipient.year && (
                              <Tag color="cyan">Year {recipient.year}</Tag>
                            )}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined /> Groups
                </span>
              }
              key="groups"
            >
              <Input
                placeholder="Search groups"
                prefix={<SearchOutlined />}
                value={groupSearchText}
                onChange={(e) => setGroupSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
                allowClear
              />

              <List
                itemLayout="horizontal"
                dataSource={filteredGroups}
                renderItem={(group) => (
                  <List.Item
                    actions={[
                      <Checkbox
                        key={group.id}
                        checked={selectedGroups.some((g) => g.id === group.id)}
                        onChange={() => handleGroupSelect(group)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<TeamOutlined />}
                          style={{ backgroundColor: "#722ed1" }}
                        />
                      }
                      title={group.name}
                      description={
                        <>
                          <div>{group.description}</div>
                          <div>
                            <Tag color="blue">{group.count} recipients</Tag>
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                }}
              />
            </TabPane>
          </Tabs>
        </Drawer>

        {/* Email Detail Modal */}
        <Modal
          title="Email Details"
          visible={emailDetailVisible}
          onCancel={() => setEmailDetailVisible(false)}
          footer={[
            <Button key="close" onClick={() => setEmailDetailVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {selectedEmail && (
            <div>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Subject" span={2}>
                  {selectedEmail.subject}
                </Descriptions.Item>
                <Descriptions.Item label="Template">
                  <Tag color="blue">{selectedEmail.template}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Sent Date">
                  {new Date(selectedEmail.sentDate).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge
                    status={
                      selectedEmail.status === "completed" ? "success" : "error"
                    }
                    text={selectedEmail.status}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Recipients">
                  {selectedEmail.recipients}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Delivery Stats">
                    <Statistic
                      title="Delivered"
                      value={`${selectedEmail.delivered}/${selectedEmail.recipients}`}
                      suffix={`(${Math.round((selectedEmail.delivered / selectedEmail.recipients) * 100)}%)`}
                    />
                    <Statistic
                      title="Failed"
                      value={`${selectedEmail.failed}/${selectedEmail.recipients}`}
                      suffix={`(${Math.round((selectedEmail.failed / selectedEmail.recipients) * 100)}%)`}
                      valueStyle={{
                        color: selectedEmail.failed > 0 ? "#cf1322" : "#3f8600",
                      }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Engagement Stats">
                    <Statistic
                      title="Opened"
                      value={`${selectedEmail.opened}/${selectedEmail.delivered}`}
                      suffix={`(${Math.round((selectedEmail.opened / selectedEmail.delivered) * 100)}%)`}
                    />
                    <Statistic
                      title="Clicked"
                      value={`${selectedEmail.clicked}/${selectedEmail.opened}`}
                      suffix={`(${Math.round((selectedEmail.clicked / selectedEmail.opened) * 100)}%)`}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Actions">
                    <Button
                      block
                      icon={<CopyOutlined />}
                      style={{ marginBottom: 8 }}
                    >
                      Duplicate Email
                    </Button>
                    <Button
                      block
                      icon={<DownloadOutlined />}
                      style={{ marginBottom: 8 }}
                    >
                      Export Report
                    </Button>
                    <Button
                      block
                      icon={<InfoCircleOutlined />}
                      onClick={() => checkEmailDeliveryStatus(selectedEmail.id)}
                    >
                      Check Status
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </Spin>
    </Content>
  );
};

export default EmailSenderWithTemplates;
