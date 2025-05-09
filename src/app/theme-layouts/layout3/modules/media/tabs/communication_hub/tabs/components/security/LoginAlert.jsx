import EmailLayout from "../layout/EmailLayout";
import Button from "../common/Button";
import Divider from "../common/Divider";

const LoginAlert = ({
  userName = "John Doe",
  deviceType = "Windows PC",
  browser = "Chrome",
  ipAddress = "192.168.1.1",
  location = "Kampala, Uganda",
  loginTime = "October 5, 2025, 10:15 AM",
  resetLink = "https://portal.nkumbauniversity.ac.ug/reset-password",
  reportLink = "https://portal.nkumbauniversity.ac.ug/report-suspicious-activity",
  contactEmail = "itsecurity@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
  sessionId = "SID-2025100501-XYZ",
}) => {
  return (
    <EmailLayout primaryColor="#0A2540">
      {/* Logo and Security Shield */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-2"
          style={{ border: "1px solid rgba(10, 37, 64, 0.1)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A2540"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          New Sign-in Detected
        </h1>
      </div>

      <div className="space-y-6">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          We detected a new sign-in to your Nkumba University account. If this
          was you, no action is needed. If you don't recognize this activity,
          please secure your account immediately.
        </p>

        {/* Clean, professional login details card */}
        <div
          className="border rounded-lg overflow-hidden"
          style={{ borderColor: "rgba(10, 37, 64, 0.1)" }}
        >
          <div
            className="bg-gray-50 px-6 py-3 border-b"
            style={{ borderColor: "rgba(10, 37, 64, 0.1)" }}
          >
            <h3 className="text-sm font-medium text-gray-700">
              SIGN-IN DETAILS
            </h3>
          </div>

          <div className="px-6 py-4">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td
                    className="py-2 text-gray-500 pr-4 align-top"
                    style={{ width: "120px" }}
                  >
                    Date & Time
                  </td>
                  <td className="py-2 text-gray-800 font-medium">
                    {loginTime}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4 align-top">Device</td>
                  <td className="py-2 text-gray-800 font-medium">
                    {deviceType}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4 align-top">Browser</td>
                  <td className="py-2 text-gray-800 font-medium">{browser}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4 align-top">
                    Location
                  </td>
                  <td className="py-2 text-gray-800 font-medium">{location}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4 align-top">
                    IP Address
                  </td>
                  <td className="py-2 text-gray-800 font-medium">
                    {ipAddress}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clean action buttons */}
        <div className="pt-2">
          <p className="text-gray-700 font-medium mb-4">Was this you?</p>
          <div className="space-y-3">
            <Button
              href={reportLink}
              color="#D03801"
              fullWidth={true}
              className="font-medium"
            >
              No, secure my account
            </Button>
            <Button
              href="#"
              color="#E5E7EB"
              textColor="#374151"
              fullWidth={true}
              className="font-medium"
            >
              Yes, this was me
            </Button>
          </div>
        </div>

        <Divider color="#E5E7EB" />

        {/* Security recommendations */}
        <div>
          <p className="text-gray-700 font-medium mb-3">
            Security recommendations:
          </p>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>• Use a strong, unique password for your university account</li>
            <li>• Enable two-factor authentication for additional security</li>
            <li>• Always sign out when using shared computers</li>
            <li>• Regularly review your account activity</li>
          </ul>
        </div>

        <Divider color="#E5E7EB" />

        {/* Footer with contact info */}
        <div className="text-gray-500 text-sm">
          <p>If you need assistance, please contact IT Security:</p>
          <p className="mt-1">
            {contactEmail} | {contactPhone}
          </p>
          <p className="mt-3 text-xs">Reference: {sessionId}</p>
        </div>
      </div>
    </EmailLayout>
  );
};

export default LoginAlert;
