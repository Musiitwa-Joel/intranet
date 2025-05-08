import React from "react";
import { Card, Typography, Space } from "antd";

const { Title, Text, Paragraph } = Typography;

const CertificatePreview = ({
  data = {
    institution: "CERTIFICATE OF ACHIEVEMENT",
    recipient: "Musiitwa Joel",
    course: "Managing my money",
    director: "Johnathan Smith",
    chairman: "Abraham Lincoln",
    date: "12/02/2000",
  },
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "48px",
        backgroundColor: "#fff",
        position: "relative",
        border: "none",
      }}
    >
      {/* Decorative Border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "30px solid",
          borderImage: `url(${
            (typeof process !== "undefined"
              ? process.env.NEXT_PUBLIC_BORDER_IMAGE
              : "") ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20at%2014.11.35.png-63WQsk5f5vBY62SXBYVm9cGxmXudVf.jpeg"
          }) 30 round`,
          pointerEvents: "none",
        }}
      />

      <Space
        direction="vertical"
        size={48}
        style={{ width: "100%", position: "relative", zIndex: 1 }}
      >
        {/* Header Section with Curved Text */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <svg viewBox="0 0 500 150" style={{ width: "100%", height: "140px" }}>
            <path id="curve" d="M50,100 Q250,10 450,100" fill="transparent" />
            <text width="500" style={{ fill: "#800000" }}>
              <textPath
                xlinkHref="#curve"
                startOffset="50%"
                style={{
                  fontSize: "24px",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "2px",
                  textAnchor: "middle",
                }}
              >
                CERTIFICATE OF ACHIEVEMENT
              </textPath>
            </text>
          </svg>

          {/* Decorative Divider */}
          <div
            style={{
              margin: "10px auto 30px",
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, height: "2px", background: "#800000" }} />
            <div style={{ margin: "0 15px" }}>
              <svg width="30" height="20" viewBox="0 0 30 20">
                <path d="M15 0L30 20H0L15 0Z" fill="#800000" />
              </svg>
            </div>
            <div style={{ flex: 1, height: "2px", background: "#800000" }} />
          </div>

          <div style={{ margin: "24px 0" }}>
            <Text
              style={{ fontSize: "24px", color: "#666", fontStyle: "italic" }}
            >
              Awarded to:
            </Text>
          </div>
          <Title
            level={2}
            style={{
              color: "#800000",
              fontSize: "48px",
              marginTop: "16px",
              fontFamily: "'Great Vibes', cursive",
              fontWeight: "normal",
            }}
          >
            {data.recipient}
          </Title>
        </div>

        {/* Message Section */}
        <Paragraph
          style={{
            fontSize: "18px",
            textAlign: "center",
            color: "#444",
            maxWidth: "700px",
            margin: "32px auto",
            lineHeight: "1.8",
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          This is to certify that {data.recipient} has successfully completed
          the course in Advanced Machine Learning. This course was conducted and
          covered various advanced topics in machine learning, including deep
          learning, reinforcement learning, and natural language processing.
        </Paragraph>

        {/* Signature Area */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "64px",
            padding: "0 32px",
          }}
        >
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "1px",
                backgroundColor: "#800000",
                marginBottom: "8px",
                margin: "0 auto",
              }}
            />
            <Text style={{ color: "#666", display: "block" }}>
              {data.director}
            </Text>
            <Text style={{ color: "#888", fontSize: "14px" }}>Director</Text>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="https://png.pngtree.com/png-clipart/20221119/ourmid/pngtree-seal-golden-gold-medal-metal-certificate-png-image_6471134.png"
              alt="Certificate Seal"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                margin: "0 20px",
              }}
            />
          </div>

          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "1px",
                backgroundColor: "#800000",
                marginBottom: "8px",
                margin: "0 auto",
              }}
            />
            <Text style={{ color: "#666", display: "block" }}>
              {data.chairman}
            </Text>
            <Text style={{ color: "#888", fontSize: "14px" }}>Chairman</Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default CertificatePreview;
