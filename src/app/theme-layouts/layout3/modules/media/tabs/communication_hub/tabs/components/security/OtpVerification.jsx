import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const OtpVerification = ({
  userName = "John Doe",
  otpCode = "386242",
  expiryTime = "10 minutes",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  contactEmail = "itsupport@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
}) => {
  return (
    <EmailLayout>
      <Header title="Verification Code" backgroundColor="#0050C8" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{userName}</span>,
        </p>

        <p className="text-gray-700">
          You have requested a verification code for your Nkumba University
          account. Please use the code below to complete your verification:
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 my-6 text-center">
          <h3 className="text-blue-800 font-bold text-lg mb-2">
            Your Verification Code
          </h3>
          <div className="flex justify-center">
            <div className="bg-white px-8 py-4 rounded-md border border-blue-300 inline-block">
              <span className="text-3xl font-mono font-bold tracking-widest text-blue-800">
                {otpCode}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This code will expire in{" "}
            <span className="font-semibold">{expiryTime}</span>
          </p>
        </div>

        <InfoBox title="Important" borderColor="#E53935" bgColor="#FFEBEE">
          <p>
            If you did not request this verification code, please ignore this
            email or contact our IT support team immediately.
          </p>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">Security Tips:</p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
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

        <div className="text-center my-6">
          <Button href={portalLink} color="#0050C8">
            Go to Portal
          </Button>
        </div>

        <p className="text-gray-700 mt-4">
          If you have any questions or concerns, please contact our IT support
          team:
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

export default OtpVerification;
