import { Card, Typography, Avatar } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { MedalIcon } from "lucide-react";

const { Text, Title } = Typography;

const PodiumCard = ({ position, candidate, color, icon }) => {
  return (
    <Card
      style={{
        width: 100,
        height: 100,
        backgroundColor: color,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 8px",
        border: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {icon}
        <Text
          strong
          style={{
            fontSize: 24,
            color:
              position === 1 ? "#d4af37" : position === 2 ? "#666" : "#cd7f32",
            display: "block",
            marginTop: 4,
          }}
        >
          {position}
        </Text>
      </div>
    </Card>
  );
};

const ElectionResultsPodium = ({ candidates = [] }) => {
  // Sort candidates by vote count in descending order
  const sortedCandidates = [...candidates]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  // If we don't have enough candidates, pad with empty ones
  while (sortedCandidates.length < 3) {
    sortedCandidates.push({ name: "-", votes: 0, position: "-" });
  }

  return (
    <div>
      <Title level={4} style={{ textAlign: "center", marginBottom: 16 }}>
        Election Results
      </Title>

      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        {/* Second place */}
        <div style={{ alignSelf: "flex-end", marginTop: 20 }}>
          <PodiumCard
            position={2}
            candidate={sortedCandidates[1]}
            color="#e0e0e0"
            icon={<MedalIcon style={{ fontSize: 24, color: "#666" }} />}
          />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Avatar
              size={40}
              src={
                sortedCandidates[1].avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(sortedCandidates[1].name)}&background=random`
              }
              style={{ marginBottom: 4 }}
            />
            <Text strong style={{ display: "block" }}>
              {sortedCandidates[1].name}
            </Text>
            <Text>{sortedCandidates[1].position}</Text>
            <Text type="secondary" style={{ display: "block" }}>
              {sortedCandidates[1].votes} votes
            </Text>
          </div>
        </div>

        {/* First place - taller */}
        <div style={{ marginTop: -20 }}>
          <PodiumCard
            position={1}
            candidate={sortedCandidates[0]}
            color="#fff9e6"
            icon={<TrophyOutlined style={{ fontSize: 28, color: "#d4af37" }} />}
          />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Avatar
              size={50}
              src={
                sortedCandidates[0].avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(sortedCandidates[0].name)}&background=random`
              }
              style={{ marginBottom: 4 }}
            />
            <Text strong style={{ display: "block", fontSize: 16 }}>
              {sortedCandidates[0].name}
            </Text>
            <Text>{sortedCandidates[0].position}</Text>
            <Text type="secondary" style={{ display: "block" }}>
              {sortedCandidates[0].votes} votes
            </Text>
          </div>
        </div>

        {/* Third place */}
        <div style={{ alignSelf: "flex-end", marginTop: 40 }}>
          <PodiumCard
            position={3}
            candidate={sortedCandidates[2]}
            color="#d9a066"
            icon={<MedalIcon style={{ fontSize: 24, color: "#cd7f32" }} />}
          />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Avatar
              size={40}
              src={
                sortedCandidates[2].avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(sortedCandidates[2].name)}&background=random`
              }
              style={{ marginBottom: 4 }}
            />
            <Text strong style={{ display: "block" }}>
              {sortedCandidates[2].name}
            </Text>
            <Text>{sortedCandidates[2].position}</Text>
            <Text type="secondary" style={{ display: "block" }}>
              {sortedCandidates[2].votes} votes
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsPodium;
