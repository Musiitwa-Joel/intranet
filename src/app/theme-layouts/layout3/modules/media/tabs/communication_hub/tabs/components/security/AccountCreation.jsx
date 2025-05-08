import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const AccountCreation = ({
  userName = "Assoc.Prof Musiitwa Joel",
  userId = "musiitwajoel@gmail.com",
  password = "qm8Lfqcl",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  contactEmail = "itsupport@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
}) => {
  return (
    <EmailLayout>
      <Header title="Account Created Successfully" backgroundColor="#2E7D32" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          Your account has been successfully created in the Nkumba University
          system. You can now access all university digital resources using the
          credentials below.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-6">
          <h3 className="text-green-800 font-bold text-lg mb-4">
            Your Account Credentials
          </h3>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="bg-white p-3 rounded border border-green-100">
              <div className="text-gray-600 mb-1 font-medium">User ID:</div>
              <div className="font-mono font-bold text-gray-800">{userId}</div>
            </div>

            <div className="bg-white p-3 rounded border border-green-100">
              <div className="text-gray-600 mb-1 font-medium">Password:</div>
              <div className="font-mono font-bold text-gray-800">
                {password}
              </div>
            </div>
          </div>
        </div>

        <InfoBox title="Important" borderColor="#2E7D32" bgColor="#E8F5E9">
          <p>
            <strong>
              You are strongly encouraged to change your password after your
              first login.
            </strong>
          </p>
          <p className="mt-2">
            For security reasons, please ensure your new password:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Is at least 8 characters long</li>
            <li>Contains uppercase and lowercase letters</li>
            <li>Includes numbers and special characters</li>
            <li>Is not used for any other accounts</li>
          </ul>
        </InfoBox>

        <div className="text-center my-6">
          <Button href={portalLink} color="#2E7D32">
            Login to Your Account
          </Button>
        </div>

        <Divider />

        <p className="text-gray-700 font-semibold">Next Steps:</p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Log in using the credentials provided above</li>
          <li>Change your password immediately</li>
          <li>Complete your profile information</li>
          <li>Review and set up notification preferences</li>
        </ol>

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
          Welcome to Nkumba University's digital community!
        </p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">IT Department</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  );
};

export default AccountCreation;
