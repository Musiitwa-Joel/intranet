import React from "react";
import { Typography, Button } from "antd";
import { Info } from "lucide-react";

const { Title, Paragraph } = Typography;

const SectionHeader = ({
  title,
  description,
  moreInfoLink,
  titleLevel = 3,
  extraContent,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "16px",
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: "16px",
      }}
    >
      <div>
        <Title level={titleLevel} style={{ marginBottom: "8px", marginTop: 0 }}>
          {title}
        </Title>
        <Paragraph style={{ color: "#595959", marginBottom: 0 }}>
          {description}
        </Paragraph>
        {extraContent && <div style={{ marginTop: "8px" }}>{extraContent}</div>}
      </div>

      {moreInfoLink && (
        <Button
          size="small"
          type="link"
          href={moreInfoLink}
          style={{ color: "#1890ff", padding: 0, height: "auto" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Info size={16} />
            More Info
          </span>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
