const Divider = ({ color = "#e5e7eb", className = "", style = {} }) => {
  return (
    <div
      className={`my-6 ${className}`}
      style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        ...style,
      }}
    />
  )
}

export default Divider

