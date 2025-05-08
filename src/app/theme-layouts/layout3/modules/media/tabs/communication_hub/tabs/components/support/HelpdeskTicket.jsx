import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const HelpdeskTicket = ({
  userName = "John Doe",
  ticketNumber = "12345",
  ticketSubject = "Login Issues with Student Portal",
  ticketStatus = "In Progress",
  assignedTo = "Sarah Johnson",
  estimatedResolution = "Within 24 hours",
  ticketDescription = "Unable to log in to the student portal. Password reset doesn't work.",
  portalLink = "https://support.nkumbauniversity.ac.ug/tickets",
  contactEmail = "helpdesk@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123461",
}) => {
  // Status color mapping
  const statusColors = {
    New: "#3498db",
    "In Progress": "#f39c12",
    "On Hold": "#e74c3c",
    Resolved: "#2ecc71",
    Closed: "#7f8c8d",
  }

  const statusColor = statusColors[ticketStatus] || "#3498db"

  return (
    <EmailLayout>
      <Header title={`Support Ticket Update – #${ticketNumber}`} backgroundColor="#6200ea" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          This is an update regarding your support ticket <span className="font-semibold">#{ticketNumber}</span> about "
          <span className="font-semibold">{ticketSubject}</span>".
        </p>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-purple-800 font-bold text-lg">Ticket Details</h3>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
            >
              {ticketStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-600">Ticket Number:</div>
            <div className="font-medium text-gray-800">#{ticketNumber}</div>

            <div className="text-gray-600">Subject:</div>
            <div className="font-medium text-gray-800">{ticketSubject}</div>

            <div className="text-gray-600">Assigned To:</div>
            <div className="font-medium text-gray-800">{assignedTo}</div>

            <div className="text-gray-600">Estimated Resolution:</div>
            <div className="font-medium text-gray-800">{estimatedResolution}</div>
          </div>

          <Divider color="#e9d5ff" />

          <div className="text-sm">
            <div className="text-gray-600 mb-2">Description:</div>
            <div className="font-medium text-gray-800 bg-white p-3 rounded border border-purple-100">
              {ticketDescription}
            </div>
          </div>
        </div>

        <InfoBox title="Current Status" borderColor="#6200ea" bgColor="#f5f0ff">
          <p>
            Your ticket is currently being worked on by our support team. We are investigating the issue and will
            provide a solution as soon as possible.
          </p>
          <p className="mt-2">
            Estimated resolution time: <strong>{estimatedResolution}</strong>
          </p>
        </InfoBox>

        <div className="text-center my-6">
          <Button href={portalLink} color="#6200ea">
            View Ticket Details
          </Button>
        </div>

        <p className="text-gray-700">
          If you have any additional information to add to this ticket, please reply to this email or contact our
          helpdesk:
        </p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Support Hours:</strong> Monday to Friday, 8:00 AM to 6:00 PM
          </p>
        </div>

        <p className="text-gray-700 mt-4">Thank you for your patience.</p>

        <p className="text-gray-700">
          Best regards,
          <br />
          <span className="font-semibold">IT Support Team</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default HelpdeskTicket

