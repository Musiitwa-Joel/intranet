import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const AdmissionLetter = ({
  studentName = "John Doe",
  program = "Bachelor of Science in Computer Science",
  startDate = "September 1, 2025",
  tuitionAmount = "UGX 2,500,000",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  contactEmail = "admissions@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123456",
}) => {
  return (
    <EmailLayout>
      <Header title="Admission Offer" backgroundColor="#4B0082" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          Congratulations! We are pleased to inform you that your application to Nkumba University has been successful.
          You have been admitted to the <span className="font-semibold">{program}</span> program.
        </p>

        <InfoBox title="Program Details" borderColor="#4B0082" bgColor="#f9f5ff">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Program:</strong> {program}
            </li>
            <li>
              <strong>Start Date:</strong> {startDate}
            </li>
            <li>
              <strong>Tuition Fee:</strong> {tuitionAmount} per semester
            </li>
            <li>
              <strong>Duration:</strong> 4 years (8 semesters)
            </li>
          </ul>
        </InfoBox>

        <p className="text-gray-700">To secure your place, please complete the following steps:</p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Accept this offer by logging into the student portal</li>
          <li>Pay the acceptance fee of UGX 200,000</li>
          <li>Complete the online registration form</li>
          <li>Submit your original academic documents for verification</li>
        </ol>

        <Divider />

        <p className="text-gray-700">
          Please note that all steps must be completed by <strong>August 15, 2025</strong>. Failure to complete these
          steps may result in the offer being withdrawn.
        </p>

        <div className="text-center my-6">
          <Button href={portalLink} color="#4B0082">
            Accept Offer & Register
          </Button>
        </div>

        <p className="text-gray-700">If you have any questions, please contact the Admissions Office:</p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
        </div>

        <p className="text-gray-700 mt-6">We look forward to welcoming you to Nkumba University!</p>

        <p className="text-gray-700">
          Sincerely,
          <br />
          <span className="font-semibold">The Admissions Team</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default AdmissionLetter

