import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const LoginAlert = ({
  userName = "John Doe",
  deviceType = "Windows PC",
  browser = "Chrome",
  ipAddress = "192.168.1.1",
  location = "Kampala, Uganda",
  loginTime = "October 5, 2025, 10:15 AM",
  resetLink = "https://portal.nkumbauniversity.ac.ug/reset-password",
  contactEmail = "itsecurity@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
}) => {
  return (
    <EmailLayout>
      <Header title="Login to Your Nkumba Account" backgroundColor="#0050C8" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          We detected a new login to your Nkumba University account. If this was you, no further action is needed.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 my-6">
          <h3 className="text-blue-800 font-bold text-lg mb-4">Login Details</h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-600">Date & Time:</div>
            <div className="font-medium text-gray-800">{loginTime}</div>

            <div className="text-gray-600">Device:</div>
            <div className="font-medium text-gray-800">{deviceType}</div>

            <div className="text-gray-600">Browser:</div>
            <div className="font-medium text-gray-800">{browser}</div>

            <div className="text-gray-600">IP Address:</div>
            <div className="font-medium text-gray-800">{ipAddress}</div>

            <div className="text-gray-600">Location:</div>
            <div className="font-medium text-gray-800">{location}</div>
          </div>
        </div>

        <InfoBox title="If This Wasn't You" borderColor="#E53935" bgColor="#FFEBEE">
          <p>
            If you did not log in at this time, your account may have been compromised. Please take the following steps
            immediately:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Reset your password using the button below</li>
            <li>Review your account activity for any unauthorized changes</li>
            <li>Contact IT Security if you notice any suspicious activity</li>
          </ol>
        </InfoBox>

        <div className="text-center my-6">
          <Button href={resetLink} color="#E53935">
            Reset Your Password
          </Button>
        </div>

        <Divider />

        <p className="text-gray-700 font-semibold">Security Tips:</p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Use a strong, unique password for your university account</li>
          <li>Never share your password with anyone</li>
          <li>Enable two-factor authentication for additional security</li>
          <li>Always log out when using shared computers</li>
        </ul>

        <p className="text-gray-700 mt-4">
          If you have any questions or concerns about your account security, please contact:
        </p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
          </p>
        </div>

        <p className="text-gray-700 mt-4">Thank you for helping us keep your account secure.</p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">IT Security Team</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default LoginAlert

