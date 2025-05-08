const InfoBox = ({
  children,
  title,
  borderColor = "#4B0082",
  bgColor = "#f9f5ff",
  icon = null,
}) => {
  return (
    <div
      className="my-4 p-4 rounded-md"
      style={{
        borderLeft: `4px solid ${borderColor}`,
        backgroundColor: bgColor,
        animation: "slideIn 0.5s ease-out",
      }}
    >
      {title && (
        <div className="flex items-center mb-2">
          {icon && <span className="mr-2">{icon}</span>}
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
      )}
      <div className="text-gray-700">{children}</div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InfoBox;
