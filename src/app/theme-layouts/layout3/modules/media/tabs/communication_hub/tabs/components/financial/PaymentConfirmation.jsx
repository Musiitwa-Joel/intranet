import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const PaymentConfirmation = ({
  studentName = "John Doe",
  studentID = "NKU/2025/001234",
  paymentAmount = "UGX 1,500,000",
  paymentDate = "August 15, 2025",
  paymentMethod = "Mobile Money",
  transactionReference = "TXN123456789",
  remainingBalance = "UGX 1,000,000",
  portalLink = "https://finance.nkumbauniversity.ac.ug",
  contactEmail = "finance@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123460",
}) => {
  return (
    <EmailLayout primaryColor="#1B5E20">
      <Header title="Payment Confirmation" backgroundColor="#1B5E20" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          Thank you for your payment. We are writing to confirm that we have received your payment for the Fall 2025
          semester.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-green-800 font-bold text-lg">Payment Receipt</h3>
            <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">Confirmed</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-600">Student ID:</div>
            <div className="font-medium text-gray-800">{studentID}</div>

            <div className="text-gray-600">Amount Paid:</div>
            <div className="font-medium text-gray-800">{paymentAmount}</div>

            <div className="text-gray-600">Payment Date:</div>
            <div className="font-medium text-gray-800">{paymentDate}</div>

            <div className="text-gray-600">Payment Method:</div>
            <div className="font-medium text-gray-800">{paymentMethod}</div>

            <div className="text-gray-600">Transaction Reference:</div>
            <div className="font-medium text-gray-800">{transactionReference}</div>

            <div className="text-gray-600">Remaining Balance:</div>
            <div className="font-medium text-gray-800">{remainingBalance}</div>
          </div>
        </div>

        <Divider color="#e0f2e0" />

        {remainingBalance !== "UGX 0" && (
          <InfoBox title="Remaining Balance" borderColor="#1B5E20" bgColor="#f0f9f0">
            <p>
              You have a remaining balance of <strong>{remainingBalance}</strong> for the Fall 2025 semester.
            </p>
            <p className="mt-2">
              Please ensure this amount is paid by <strong>September 30, 2025</strong> to avoid late payment fees.
            </p>
          </InfoBox>
        )}

        <div className="text-center my-6">
          <Button href={portalLink} color="#1B5E20">
            View Account Statement
          </Button>
        </div>

        <p className="text-gray-700">
          If you have any questions about this payment or your account, please contact the Finance Office:
        </p>

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

        <p className="text-gray-700 mt-4">Thank you for your payment.</p>

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

export default PaymentConfirmation

