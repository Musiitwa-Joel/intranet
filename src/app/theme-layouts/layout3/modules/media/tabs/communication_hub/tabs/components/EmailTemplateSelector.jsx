"use client"

import { useState } from "react"
import AdmissionLetter from "./academic/AdmissionLetter"
import SemesterRegistration from "./academic/SemesterRegistration"
import ExamNotification from "./academic/ExamNotification"
import TuitionReminder from "./financial/TuitionReminder"
import PaymentConfirmation from "./financial/PaymentConfirmation"
import HelpdeskTicket from "./support/HelpdeskTicket"
import EventInvitation from "./events/EventInvitation"
import LoginAlert from "./security/LoginAlert"
import BirthdayTemplate from "./special/BirthdayTemplate"

const EmailTemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("admission")

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "admission":
        return <AdmissionLetter />
      case "registration":
        return <SemesterRegistration />
      case "exam":
        return <ExamNotification />
      case "tuition":
        return <TuitionReminder />
      case "payment":
        return <PaymentConfirmation />
      case "helpdesk":
        return <HelpdeskTicket />
      case "event":
        return <EventInvitation />
      case "login":
        return <LoginAlert />
      case "birthday":
        return <BirthdayTemplate />
      default:
        return <AdmissionLetter />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Email Template Preview</h1>

      <div className="mb-6">
        <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Template
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <optgroup label="Academic">
            <option value="admission">Admission Letter</option>
            <option value="registration">Semester Registration</option>
            <option value="exam">Exam Notification</option>
          </optgroup>
          <optgroup label="Financial">
            <option value="tuition">Tuition Reminder</option>
            <option value="payment">Payment Confirmation</option>
          </optgroup>
          <optgroup label="Support & Services">
            <option value="helpdesk">Helpdesk Ticket</option>
          </optgroup>
          <optgroup label="Events & Activities">
            <option value="event">Event Invitation</option>
          </optgroup>
          <optgroup label="Security">
            <option value="login">Login Alert</option>
          </optgroup>
          <optgroup label="Special">
            <option value="birthday">Birthday Greeting</option>
          </optgroup>
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">{renderTemplate()}</div>
    </div>
  )
}

export default EmailTemplateSelector

