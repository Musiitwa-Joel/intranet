"use client";

import EmailLayout from "../layout/EmailLayout";
import Button from "../common/Button";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const WelcomeEmail = ({
  studentName = "John Doe",
  program = "Bachelor of Science in Computer Science",
  academicYear = "2025/2026",
  orientationDate = "August 25, 2025",
  portalLink = "https://portal.nkumbauniversity.ac.ug",
  contactEmail = "admissions@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123456",
}) => {
  return (
    <EmailLayout>
      <div
        className="relative overflow-hidden rounded-lg mb-6"
        style={{
          height: "180px",
          background: "linear-gradient(135deg, #4B0082 0%, #9370DB 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20"
          style={{
            background: "white",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-16 h-16 rounded-full opacity-20"
          style={{
            background: "white",
            animation: "float 8s ease-in-out infinite",
          }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to Nkumba University!
          </h1>
          <p className="text-lg">Your journey to excellence begins now</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{studentName}</span>,
        </p>

        <p className="text-gray-700">
          On behalf of the entire Nkumba University community, I am delighted to
          welcome you to our institution. Congratulations on your admission to
          the <span className="font-semibold">{program}</span> program for the{" "}
          <span className="font-semibold">{academicYear}</span> academic year.
        </p>

        <p className="text-gray-700">
          We are excited that you have chosen Nkumba University for your higher
          education journey. Our university is committed to providing you with a
          transformative educational experience that will prepare you for a
          successful career and meaningful contribution to society.
        </p>

        <InfoBox
          title="Important Dates"
          borderColor="#4B0082"
          bgColor="#f9f5ff"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Orientation Week:</strong> Begins on {orientationDate}
            </li>
            <li>
              <strong>Registration Deadline:</strong> August 20, 2025
            </li>
            <li>
              <strong>Classes Begin:</strong> September 1, 2025
            </li>
          </ul>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">Next Steps:</p>

        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Complete your registration on the student portal</li>
          <li>Pay your tuition and fees</li>
          <li>Attend the orientation program</li>
          <li>Set up your university email account</li>
          <li>Explore campus resources and student organizations</li>
        </ol>

        <div className="text-center my-6">
          <Button href={portalLink} color="#4B0082">
            Access Student Portal
          </Button>
        </div>

        <p className="text-gray-700">
          We have a comprehensive orientation program planned to help you
          transition smoothly into university life. During orientation, you will
          learn about academic expectations, campus resources, student services,
          and have the opportunity to meet faculty members and fellow students.
        </p>

        <p className="text-gray-700">
          If you have any questions or need assistance, please don't hesitate to
          contact us:
        </p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Office:</strong> Admissions Office, Administration Building
          </p>
        </div>

        <p className="text-gray-700 mt-4">
          We look forward to meeting you soon and supporting you throughout your
          academic journey at Nkumba University.
        </p>

        <p className="text-gray-700">
          Warm regards,
          <br />
          <span className="font-semibold">Dr. Sarah Nakato</span>
          <br />
          Dean of Students
          <br />
          Nkumba University
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </EmailLayout>
  );
};

export default WelcomeEmail;
