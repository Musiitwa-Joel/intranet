import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const PasswordReset = ({
  userName = "John Doe",
  resetLink = "https://portal.nkumbauniversity.ac.ug/reset-password?token=abc123xyz",
  expiryTime = "24 hours",
  contactEmail = "itsupport@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
}) => {
  return (
    <EmailLayout>
      <Header title="Password Reset Request" backgroundColor="#FF6D00" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          We received a request to reset the password for your Nkumba University
          account. To proceed with the password reset, please click the button
          below:
        </p>

        <div className="text-center my-6">
          <Button href={resetLink} color="#FF6D00">
            Reset Your Password
          </Button>
        </div>

        <p className="text-gray-700 text-sm">
          If the button above doesn't work, copy and paste the following link
          into your browser:
        </p>
        <div className="bg-gray-50 p-3 rounded-md text-xs font-mono break-all">
          {resetLink}
        </div>

        <InfoBox title="Important" borderColor="#FF6D00" bgColor="#FFF3E0">
          <p>
            This password reset link will expire in{" "}
            <strong>{expiryTime}</strong>.
          </p>
          <p className="mt-2">
            If you did not request a password reset, please ignore this email or
            contact our IT support team immediately as your account may be at
            risk.
          </p>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">Password Security Tips:</p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
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

        <p className="text-gray-700 mt-4">
          If you have any questions or need assistance, please contact our IT
          support team:
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

        <p className="text-gray-700 mt-4">
          Thank you for helping us keep your account secure.
        </p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">IT Security Team</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  );
};

export default PasswordReset;
