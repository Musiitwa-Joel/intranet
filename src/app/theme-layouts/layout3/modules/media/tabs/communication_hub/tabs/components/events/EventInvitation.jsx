"use client"
import EmailLayout from "../layout/EmailLayout"
import Button from "../common/Button"
import Divider from "../common/Divider"
import InfoBox from "../common/InfoBox"

const EventInvitation = ({
  recipientName = "John Doe",
  eventName = "Annual Career Fair 2025",
  eventDate = "October 15, 2025",
  eventTime = "9:00 AM - 4:00 PM",
  eventLocation = "Main Campus, Multipurpose Hall",
  eventDescription = "Connect with over 50 employers from various industries and explore career opportunities.",
  rsvpLink = "https://events.nkumbauniversity.ac.ug/rsvp",
  contactEmail = "events@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123462",
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
          <h1 className="text-2xl font-bold mb-2">{eventName}</h1>
          <p className="text-lg">
            {eventDate} • {eventTime}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{recipientName}</span>,
        </p>

        <p className="text-gray-700">
          You are cordially invited to attend the <span className="font-semibold">{eventName}</span>.
        </p>

        <div className="bg-gray-50 rounded-lg p-5 my-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 mb-1">Date:</div>
              <div className="font-medium text-gray-800">{eventDate}</div>
            </div>

            <div>
              <div className="text-gray-600 mb-1">Time:</div>
              <div className="font-medium text-gray-800">{eventTime}</div>
            </div>

            <div>
              <div className="text-gray-600 mb-1">Location:</div>
              <div className="font-medium text-gray-800">{eventLocation}</div>
            </div>

            <div>
              <div className="text-gray-600 mb-1">RSVP By:</div>
              <div className="font-medium text-gray-800">October 10, 2025</div>
            </div>
          </div>

          <Divider />

          <div>
            <div className="text-gray-600 mb-2">Event Description:</div>
            <div className="font-medium text-gray-800">{eventDescription}</div>
          </div>
        </div>

        <InfoBox title="What to Expect" borderColor="#4B0082" bgColor="#f9f5ff">
          <ul className="list-disc pl-5 space-y-2">
            <li>Networking opportunities with industry professionals</li>
            <li>CV review and career counseling sessions</li>
            <li>On-the-spot interviews with select employers</li>
            <li>Workshops on job search strategies and interview skills</li>
          </ul>
        </InfoBox>

        <div className="text-center my-6">
          <Button href={rsvpLink} color="#4B0082">
            RSVP Now
          </Button>
        </div>

        <p className="text-gray-700">If you have any questions about this event, please contact:</p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
        </div>

        <p className="text-gray-700 mt-4">We look forward to your participation!</p>

        <p className="text-gray-700">
          Best regards,
          <br />
          <span className="font-semibold">Events Committee</span>
          <br />
          Nkumba University
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </EmailLayout>
  )
}

export default EventInvitation

