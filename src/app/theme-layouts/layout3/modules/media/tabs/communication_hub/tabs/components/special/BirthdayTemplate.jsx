"use client"
import EmailLayout from "../layout/EmailLayout"

const BirthdayTemplate = ({
  recipientName = "John Doe",
  contactEmail = "info@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123456",
}) => {
  return (
    <EmailLayout>
      <div
        className="relative overflow-hidden rounded-lg mb-6"
        style={{
          height: "250px",
          background: "linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)",
        }}
      >
        {/* Animated balloons */}
        <div
          className="absolute top-10 left-10 w-16 h-20 rounded-full opacity-80"
          style={{
            background: "#FF6B6B",
            transform: "translateY(0)",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute top-20 left-40 w-12 h-16 rounded-full opacity-80"
          style={{
            background: "#4ECDC4",
            transform: "translateY(0)",
            animation: "float 7s ease-in-out infinite 0.5s",
          }}
        ></div>
        <div
          className="absolute top-15 right-20 w-14 h-18 rounded-full opacity-80"
          style={{
            background: "#FFD166",
            transform: "translateY(0)",
            animation: "float 5s ease-in-out infinite 1s",
          }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
            Happy Birthday!
          </h1>
          <p className="text-xl" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
            Wishing you a wonderful day
          </p>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <p className="text-gray-700 text-xl">
          Dear <span className="font-semibold">{recipientName}</span>,
        </p>

        <p className="text-gray-700 text-lg">
          On behalf of the entire Nkumba University community, we wish you a very happy birthday!
        </p>

        <div
          className="py-8 px-6 my-6 rounded-lg"
          style={{
            background: "linear-gradient(to right, #f9f5ff, #fff5f5, #f0f9ff)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
        >
          <p className="text-gray-800 text-lg italic">
            "May your day be filled with happiness, success, and the company of those who matter most."
          </p>
        </div>

        <div className="flex justify-center space-x-4 my-8">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{
              background: "#FF6B6B",
              animation: "pulse 2s infinite",
            }}
          >
            <span className="text-white text-2xl">🎂</span>
          </div>
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{
              background: "#4ECDC4",
              animation: "pulse 2s infinite 0.5s",
            }}
          >
            <span className="text-white text-2xl">🎉</span>
          </div>
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{
              background: "#FFD166",
              animation: "pulse 2s infinite 1s",
            }}
          >
            <span className="text-white text-2xl">🎁</span>
          </div>
        </div>

        <p className="text-gray-700">
          As a valued member of our university family, we appreciate your contributions and presence. We hope this year
          brings you new opportunities, achievements, and joy.
        </p>

        <p className="text-gray-700 mt-8">
          Warmest wishes,
          <br />
          <span className="font-semibold">The Nkumba University Team</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </EmailLayout>
  )
}

export default BirthdayTemplate

