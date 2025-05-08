"use client"

const Button = ({
  children,
  href = "#",
  color = "#4B0082",
  textColor = "white",
  className = "",
  fullWidth = false,
}) => {
  return (
    <a
      href={href}
      className={`inline-block px-6 py-3 rounded-md font-medium text-center transition-all duration-300 ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transform: "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)"
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      {children}
    </a>
  )
}

export default Button

