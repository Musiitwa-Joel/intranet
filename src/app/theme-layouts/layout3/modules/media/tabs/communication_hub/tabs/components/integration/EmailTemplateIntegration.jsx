"use client"

import React, { useEffect, useState } from "react"
import AdmissionLetter from "../academic/AdmissionLetter"
import SemesterRegistration from "../academic/SemesterRegistration"
import ExamNotification from "../academic/ExamNotification"
import TuitionReminder from "../financial/TuitionReminder"
import PaymentConfirmation from "../financial/PaymentConfirmation"
import HelpdeskTicket from "../support/HelpdeskTicket"
import EventInvitation from "../events/EventInvitation"
import LoginAlert from "../security/LoginAlert"
import BirthdayTemplate from "../special/BirthdayTemplate"

// This component serves as the bridge between our email templates and the email sender admin
const EmailTemplateIntegration = ({ selectedTemplateId, emailVariables = {}, onHtmlGenerated }) => {
  const [templateHtml, setTemplateHtml] = useState("")
  const templateRef = React.useRef(null)

  // Map template IDs to components
  const templateMap = {
    admission: AdmissionLetter,
    registration: SemesterRegistration,
    exam: ExamNotification,
    tuition: TuitionReminder,
    payment: PaymentConfirmation,
    helpdesk: HelpdeskTicket,
    event: EventInvitation,
    login: LoginAlert,
    birthday: BirthdayTemplate,
  }

  // Default template data that will be overridden by emailVariables
  const defaultTemplateData = {
    studentName: emailVariables.recipient_name || "Student",
    recipientName: emailVariables.recipient_name || "Recipient",
    userName: emailVariables.recipient_name || "User",
    program: "Bachelor of Science",
    announcement_title: emailVariables.subject || "University Announcement",
    announcement_content: emailVariables.message || "This is an important announcement from the university.",
    portalLink: "https://portal.nkumbauniversity.ac.ug",
    dueDate: emailVariables.dueDate || "April 30, 2025",
    paymentMethods: emailVariables.paymentMethods || "Bank Transfer, Mobile Money",
    finance_portal_link: "https://finance.nkumbauniversity.ac.ug",
  }

  // Combine default data with provided variables
  const templateData = { ...defaultTemplateData, ...emailVariables }

  useEffect(() => {
    // When the component mounts or when the selected template changes,
    // we need to render the template to HTML
    if (selectedTemplateId && templateRef.current) {
      // Small delay to ensure the component has rendered
      setTimeout(() => {
        const html = templateRef.current.innerHTML
        setTemplateHtml(html)
        if (onHtmlGenerated) {
          onHtmlGenerated(html)
        }
      }, 100)
    }
  }, [selectedTemplateId, emailVariables, onHtmlGenerated])

  // Render the selected template component
  const renderTemplate = () => {
    if (!selectedTemplateId || !templateMap[selectedTemplateId]) {
      return <div>No template selected</div>
    }

    const TemplateComponent = templateMap[selectedTemplateId]
    return <TemplateComponent {...templateData} />
  }

  return (
    <div style={{ display: "block", position: "relative" }}>
      <div ref={templateRef}>{renderTemplate()}</div>
    </div>
  )
}

export default EmailTemplateIntegration

