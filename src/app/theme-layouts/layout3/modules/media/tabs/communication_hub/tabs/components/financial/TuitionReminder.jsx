import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const TuitionReminder = ({
  studentName = "John Doe",
  studentID = "NKU/2025/001234",
  semester = "Fall 2025",
  dueAmount = "UGX 2,500,000",
  dueDate = "August 30, 2025",
  paymentMethods = "Bank Transfer, Mobile Money, University Cashier",
  portalLink = "https://finance.nkumbauniversity.ac.ug",
  contactEmail = "finance@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123460",
}) => {
  return (
    <EmailLayout primaryColor="#1B5E20">
      <Header title="Tuition Payment Reminder" backgroundColor="#1B5E20" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          This is a reminder that your tuition payment for the <span className="font-semibold">{semester}</span>{" "}
          semester is due by
          <span className="font-semibold"> {dueDate}</span>.
        </p>

        <InfoBox title="Payment Details" borderColor="#1B5E20" bgColor="#f0f9f0">
          <ul className="list-none space-y-2">
            <li>
              <strong>Student ID:</strong> {studentID}
            </li>
            <li>
              <strong>Amount Due:</strong> {dueAmount}
            </li>
            <li>
              <strong>Due Date:</strong> {dueDate}
            </li>
            <li>
              <strong>Late Payment Fee:</strong> UGX 100,000 after due date
            </li>
          </ul>
        </InfoBox>

        <Divider color="#e0f2e0" />

        <p className="text-gray-700 font-semibold">Payment Methods:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Bank Transfer</h4>
            <p className="text-sm text-gray-600">
              <strong>Bank:</strong> First National Bank
              <br />
              <strong>Account Name:</strong> Nkumba University
              <br />
              <strong>Account Number:</strong> 1234567890
              <br />
              <strong>Branch Code:</strong> 123456
              <br />
              <strong>Reference:</strong> {studentID}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Mobile Money</h4>
            <p className="text-sm text-gray-600">
              <strong>Provider:</strong> MTN/Airtel Money
              <br />
              <strong>Business Number:</strong> *185*4*1#
              <br />
              <strong>Merchant Code:</strong> NKUMBA
              <br />
              <strong>Reference:</strong> {studentID}
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          <strong>Important:</strong> Always include your Student ID ({studentID}) as the reference for all payments to
          ensure proper crediting to your account.
        </p>

        <div className="text-center my-6">
          <Button href={portalLink} color="#1B5E20">
            Pay Online Now
          </Button>
        </div>

        <InfoBox title="Payment Plan Options" borderColor="#1B5E20" bgColor="#f0f9f0">
          <p>
            If you are unable to pay the full amount by the due date, please contact the Finance Office to discuss
            payment plan options.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> All payment plans must be approved before the payment deadline.
          </p>
        </InfoBox>

        <p className="text-gray-700">For any questions regarding your tuition or fees, please contact:</p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Office Hours:</strong> Monday to Friday, 8:00 AM to 4:00 PM
          </p>
        </div>

        <p className="text-gray-700 mt-4">Thank you for your prompt attention to this matter.</p>

        <p className="text-gray-700">
          Sincerely,
          <br />
          <span className="font-semibold">Finance Department</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default TuitionReminder

