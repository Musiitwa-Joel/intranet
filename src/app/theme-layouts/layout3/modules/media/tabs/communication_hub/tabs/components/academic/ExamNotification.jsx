import EmailLayout from "../layout/EmailLayout"
import Header from "../common/Header"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const ExamNotification = ({
  studentName = "John Doe",
  program = "Bachelor of Science in Computer Science",
  year = "Second Year",
  examStartDate = "November 15, 2025",
  examEndDate = "December 5, 2025",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  timetableLink = "https://portal.nkumbauniversity.ac.ug/exams/timetable",
  contactEmail = "exams@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123458",
}) => {
  return (
    <EmailLayout>
      <Header title={`Examination Schedule – ${program} (${year})`} backgroundColor="#00308F" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          This is to inform you that the end-of-semester examinations for{" "}
          <span className="font-semibold">
            {program} ({year})
          </span>{" "}
          will take place from <span className="font-semibold">{examStartDate}</span> to{" "}
          <span className="font-semibold">{examEndDate}</span>.
        </p>

        <InfoBox title="Examination Requirements" borderColor="#00308F" bgColor="#f0f7ff">
          <ul className="list-disc pl-5 space-y-2">
            <li>Valid student ID card</li>
            <li>Examination card (available for download from the portal)</li>
            <li>Evidence of tuition payment</li>
            <li>Appropriate stationery (pens, pencils, calculators where permitted)</li>
          </ul>
        </InfoBox>

        <p className="text-gray-700">Please note that you must have:</p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Attended at least 75% of classes</li>
          <li>Completed all required coursework and assignments</li>
          <li>Cleared all outstanding fees</li>
        </ul>

        <Divider />

        <p className="text-gray-700 font-semibold">Examination Rules:</p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Arrive at least 30 minutes before the scheduled start time</li>
          <li>Mobile phones and electronic devices are strictly prohibited in examination rooms</li>
          <li>Follow all instructions given by invigilators</li>
          <li>Any form of academic dishonesty will result in serious disciplinary action</li>
        </ol>

        <div className="text-center my-6">
          <Button href={timetableLink} color="#00308F">
            Download Exam Timetable
          </Button>
        </div>

        <p className="text-gray-700">
          <strong>Special Arrangements:</strong> If you require any special accommodations due to medical conditions or
          disabilities, please contact the Examinations Office immediately.
        </p>

        <InfoBox title="Contact Information" borderColor="#00308F" bgColor="#f0f7ff">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Office:</strong> Room 105, Administration Block
          </p>
        </InfoBox>

        <p className="text-gray-700 mt-4">We wish you success in your examinations!</p>

        <p className="text-gray-700">
          Sincerely,
          <br />
          <span className="font-semibold">Examinations Office</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  )
}

export default ExamNotification

