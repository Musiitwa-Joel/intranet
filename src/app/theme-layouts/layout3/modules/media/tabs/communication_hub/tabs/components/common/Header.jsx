"use client"

const Header = ({ title, backgroundColor = "#4B0082", textColor = "white", borderRadius = "5px" }) => {
  return (
    <div
      className="py-3 px-4 text-center font-bold text-lg mb-6"
      style={{
        backgroundColor,
        color: textColor,
        borderRadius,
        animation: "fadeInDown 0.5s ease-out",
      }}
    >
      {title}

      <style jsx>{`
        @keyframes fadeInDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default Header

