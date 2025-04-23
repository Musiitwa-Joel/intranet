import {
  Button,
  Space,
  Typography,
  List,
  Divider,
  Tooltip,
  Popconfirm,
} from "antd";
import React from "react";

function Courseunit({
  courseUnits,
  lecturerName,
  roomName,
  entryId,
  onEdit,
  entry,
  onDelete,
}) {
  const handleEdit = () => {
    onEdit({
      entryId,
      courseUnits,
      lecturerName,
      roomName,
      entry,
    });
  };

  const handleDelete = () => {
    onDelete(entryId);
  };
  return (
    <div style={{ padding: 10 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <ul>
          {courseUnits.map((courseUnit, index) => (
            <li key={index}>
              <Tooltip
                title={`${courseUnit.course_unit_code} - ${courseUnit.course_unit_title} - ${courseUnit.course_version?.course?.course_code} (${courseUnit.course_version.version_title})`}
              >
                <Typography.Text
                  ellipsis
                  style={{ maxWidth: "200px", display: "inline-block" }}
                >
                  {courseUnit.course_unit_title}
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: "12px", marginLeft: "8px" }}
                  >
                    ({courseUnit.course_unit_code})
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: "12px", marginLeft: "8px" }}
                    >
                      - {courseUnit.course_version?.course?.course_code}
                    </Typography.Text>
                  </Typography.Text>
                </Typography.Text>
              </Tooltip>
            </li>
          ))}
        </ul>
        {/* <List
          size="small"
          dataSource={courseUnits}
          renderItem={(courseUnit) => (
            <List.Item style={{ padding: '0px 0' }}>
              <List.Item.Meta
                title={
                  <Tooltip title={courseUnit.course_unit_title}>
                    <Typography.Text ellipsis style={{ maxWidth: '200px', display: 'inline-block' }}>
                      {courseUnit.course_unit_title}
                      <Typography.Text type="secondary" style={{ fontSize: '12px', marginLeft: '8px' }}>
                        ({courseUnit.course_unit_code})
                      </Typography.Text>
                    </Typography.Text>
                  </Tooltip>
                }
              />
            </List.Item>
          )}
        /> */}
        {/* <Divider style={{ margin: '8px 0' }} /> */}
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <Typography.Text strong>Lecturer:</Typography.Text>
            <Typography.Text>{lecturerName}</Typography.Text>
          </Space>
          <Space>
            <Typography.Text strong>Room:</Typography.Text>
            <Typography.Text>{roomName}</Typography.Text>
          </Space>
          <Space style={{ marginTop: "8px", padding: 0 }}>
            <Button size="small" type="link" onClick={() => handleEdit(entry)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete Timetable Entry"
              description={
                <>
                  Are you sure to delete?
                  <br />
                  This action can not be undone
                </>
              }
              onConfirm={() => {
                handleDelete();
              }}
              okText="Yes"
              okButtonProps={{
                style: {
                  backgroundColor: "dodgerblue",
                },
              }}
              cancelText="No"
            >
              <Button size="small" type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </Space>
      </Space>
    </div>
  );
}

export default Courseunit;
