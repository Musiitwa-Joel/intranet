import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateNewCourse,
  updateCreateModuleModalOpen,
} from "../../../store/progAndCoursesSlice";
import { Table, Space, Input, Button } from "antd";

import TestTable from "../TestTable";

const { Search } = Input;

function CourseUnits() {
  const createNewCourse = useSelector(selectCreateNewCourse);
  const dispatch = useDispatch();

  const handleCreateNewModule = () => {
    dispatch(updateCreateModuleModalOpen(true));
  };

  const handleUploadModule = () => {};

  return (
    <div
      style={{
        backgroundColor: "#324462",
      }}
    >
      <Space
        style={{
          marginBottom: 5,
          paddingLeft: 10,
        }}
        size={15}
      >
        <Button
          size="small"
          type="text"
          style={{
            color: "#fff",
          }}
          onClick={handleCreateNewModule}
        >
          Create New Module
        </Button>

        <Button
          size="small"
          type="text"
          style={{
            color: "#fff",
          }}
          onClick={handleUploadModule}
        >
          Upload Modules
        </Button>

        <Button
          size="small"
          type="text"
          style={{
            color: "#fff",
          }}
        >
          Download Modules
        </Button>

        {/* <Dropdown menu={menuProps}>
              <Button size="small">
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown> */}

        <Button
          size="small"
          type="text"
          style={{
            color: "#fff",
          }}
        >
          Edit Module
        </Button>

        <Button
          size="small"
          //   danger
          disabled
          type="text"
          style={{
            color: "#fff",
          }}
        >
          Delete Module
        </Button>
      </Space>

      {!createNewCourse ? <TestTable /> : <Table dataSource={[]} />}
    </div>
  );
}

export default CourseUnits;
