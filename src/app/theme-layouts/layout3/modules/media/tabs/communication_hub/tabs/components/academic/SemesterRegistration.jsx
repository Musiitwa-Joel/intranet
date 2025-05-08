import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const SemesterRegistration = ({
  studentName = "John Doe",
  semester = "Fall 2025",
  registrationDeadline = "August 15, 2025",
  lateRegistrationDeadline = "August 30, 2025",
  lateRegistrationFee = "UGX 50,000",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  contactEmail = "registrar@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123457",
}) => {
  return (
    <EmailLayout>
      <Header title="Semester Registration Reminder" backgroundColor="#00308F" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          This is a reminder that registration for the <span className="font-semibold">{semester}</span> semester is now
          open. Please complete your registration by <span className="font-semibold">{registrationDeadline}</span>.
        </p>

        <InfoBox title="Important Dates" borderColor="#00308F" bgColor="#f0f7ff">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Registration Deadline:</strong> {registrationDeadline}
            </li>
            <li>
              <strong>Late Registration Period:</strong> Until {lateRegistrationDeadline} (additional fee of{" "}
              {lateRegistrationFee})
            </li>
            <li>
              <strong>Classes Begin:</strong> September 1, 2025
            </li>
          </ul>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">Registration Steps:</p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Log in to the student portal</li>
          <li>Click on "Registration" in the main menu</li>
          <li>Select your courses for the semester</li>
          <li>Confirm your registration</li>
          <li>Pay the required tuition and fees</li>
          <li>Download and print your course registration form</li>
        </ol>

        <div className="text-center my-6">
          <Button href={portalLink} color="#00308F">
            Register Now
          </Button>
        </div>

        <p className="text-gray-700">
          <strong>Note:</strong> You must clear any outstanding balances before you can register for the new semester.
        </p>

        <InfoBox title="Need Help?" borderColor="#00308F" bgColor="#f0f7ff">
          <p>If you encounter any issues during registration, please contact:</p>
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>Office hours: Monday to Friday, 8:00 AM to 5:00 PM</p>
        </InfoBox>

        <p className="text-gray-700 mt-4">We look forward to seeing you in the upcoming semester!</p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">Office of the Registrar</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default SemesterRegistration

