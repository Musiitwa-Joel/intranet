import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const GeneralInformation = ({
  recipientName = "John Doe",
  subject = "Important University Information",
  message = "This is an important announcement from Nkumba University. Please read the information below carefully.",
  ctaText = "Learn More",
  ctaLink = "https://nkumbauniversity.ac.ug",
  contactEmail = "info@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123456",
}) => {
  return (
    <EmailLayout>
      <Header title={subject} backgroundColor="#4B0082" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{recipientName}</span>,
        </p>

        <p className="text-gray-700">{message}</p>

        <Divider />

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 my-6">
          <h3 className="text-purple-800 font-bold text-lg mb-4">
            Key Information
          </h3>
          <div className="prose prose-sm text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        </div>

        <div className="text-center my-6">
          <Button href={ctaLink} color="#4B0082">
            {ctaText}
          </Button>
        </div>

        <InfoBox
          title="Need Assistance?"
          borderColor="#4B0082"
          bgColor="#f9f5ff"
        >
          <p>
            If you have any questions or need further information, please don't
            hesitate to contact us:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Email:</strong> {contactEmail}
            </li>
            <li>
              <strong>Phone:</strong> {contactPhone}
            </li>
            <li>
              <strong>Office Hours:</strong> Monday to Friday, 8:00 AM to 5:00
              PM
            </li>
          </ul>
        </InfoBox>

        <p className="text-gray-700 mt-4">
          Thank you for your attention to this matter.
        </p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">
            Nkumba University Administration
          </span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  );
};

export default GeneralInformation;
