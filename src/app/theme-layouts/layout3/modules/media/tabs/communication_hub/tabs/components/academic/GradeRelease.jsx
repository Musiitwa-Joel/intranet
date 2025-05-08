import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const GradeRelease = ({
  studentName = "John Doe",
  semester = "Fall 2025",
  program = "Bachelor of Science in Computer Science",
  releaseDate = "December 20, 2025",
  portalLink = "https://portal.nkumbauniversity.ac.ug/grades",
  appealDeadline = "January 10, 2026",
  contactEmail = "academics@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123457",
}) => {
  return (
    <EmailLayout>
      <Header
        title={`${semester} Semester Grades Released`}
        backgroundColor="#00308F"
      />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          We are pleased to inform you that your grades for the{" "}
          <span className="font-semibold">{semester}</span> semester have been
          finalized and are now available for viewing on the student portal.
        </p>

        <div className="text-center my-6">
          <Button href={portalLink} color="#00308F">
            View Your Grades
          </Button>
        </div>

        <InfoBox
          title="Important Dates"
          borderColor="#00308F"
          bgColor="#f0f7ff"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Grade Release Date:</strong> {releaseDate}
            </li>
            <li>
              <strong>Grade Appeal Deadline:</strong> {appealDeadline}
            </li>
            <li>
              <strong>Next Semester Registration:</strong> January 15-30, 2026
            </li>
          </ul>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">Academic Standing:</p>

        <p className="text-gray-700">
          Your academic standing will be calculated based on your cumulative
          GPA. Please review the following guidelines:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Good Standing:</strong> GPA of 2.0 or higher
          </li>
          <li>
            <strong>Academic Warning:</strong> GPA between 1.7 and 1.99
          </li>
          <li>
            <strong>Academic Probation:</strong> GPA below 1.7
          </li>
        </ul>

        <p className="text-gray-700 mt-4">
          If you believe there has been an error in your grade calculation, you
          may submit a grade appeal by {appealDeadline}. The grade appeal
          process can be found on the student portal under "Academic Policies."
        </p>

        <InfoBox
          title="Academic Advising"
          borderColor="#00308F"
          bgColor="#f0f7ff"
        >
          <p>
            We encourage you to schedule a meeting with your academic advisor to
            discuss your academic progress and plan for the upcoming semester.
            Academic advisors will be available for appointments starting
            January 5, 2026.
          </p>
        </InfoBox>

        <p className="text-gray-700 mt-4">
          If you have any questions about your grades or need assistance, please
          contact the Academic Office:
        </p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Office:</strong> Room 205, Academic Building
          </p>
        </div>

        <p className="text-gray-700 mt-4">
          Congratulations on completing the {semester} semester! We wish you
          continued success in your academic journey.
        </p>

        <p className="text-gray-700">
          Sincerely,
          <br />
          <span className="font-semibold">Office of the Registrar</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  );
};

export default GradeRelease;
