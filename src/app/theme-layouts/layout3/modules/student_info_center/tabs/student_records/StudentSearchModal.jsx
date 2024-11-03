import React from "react";
import { Modal, Input, Table, ConfigProvider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStudentSearchModalVisible,
  setStudentSearchModalVisible,
} from "../../store/infoCenterSlice";

const { Search } = Input;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "index",
    width: 100,
    render: (text, record, index) => renderRow(record, index + 1),
  },
  {
    title: "Student Number",
    dataIndex: "std_no",
    ellipsis: true,
    // render: (text, record, index) => (
    //   <span>{formatDateString(parseInt(text))}</span>
    // ),
    render: (text, record, index) =>
      renderRow(record, formatDateString(parseInt(text))),
    width: 120,
  },
  {
    title: "Reg No",
    ellipsis: true,
    dataIndex: "regno",
    render: (text, record, index) => renderRow(record, text),
    width: 180,
  },
  {
    title: "Course",
    ellipsis: true,
    dataIndex: "courses",
    render: (text, record, index) => renderRow(record, text),
    width: 150,
  },
  {
    title: "Course Code",
    dataIndex: "course_code",
    ellipsis: true,
    width: 100,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
];

const StudentSearchModal = () => {
  const dispatch = useDispatch();
  const studentSearchModalVisible = useSelector(
    selectStudentSearchModalVisible
  );
  return (
    <>
      <Modal
        // title="Search Student"
        // centered

        open={studentSearchModalVisible}
        // footer={false}
        // onOk={() => dispatch(setStudentSearchModalVisible(false))}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        onCancel={() => dispatch(setStudentSearchModalVisible(false))}
        cancelText="Close"
        width={800}
        style={{
          maxHeight: 300,
        }}
      >
        <div
          style={{
            marginTop: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                marginRight: 10,
              }}
            >
              <span>Search Criteria:</span>
            </div>
            <div>
              <Select
                size="default"
                defaultValue="a1"
                placeholder="Campus"
                //   onChange={handleChange}
                style={{
                  width: 200,
                }}
                options={options}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Search
              style={{ marginBottom: 8, width: 500 }}
              placeholder="Search Student"
              // width={100}

              size="large"
              //   onChange={onSearchChange}
            />
          </div>

          <ConfigProvider
            theme={{
              components: {
                Table: {
                  // headerBg: "rgba(0, 0, 0, 0.04)",
                  borderColor: "lightgray",
                  borderRadius: 0,
                  headerBorderRadius: 0,
                  cellFontSize: 10,
                  fontSize: 13,
                  lineHeight: 0.8,
                },
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={[]}
              // loading={loadingApplications |}
              rowKey="std_id"
              bordered
              sticky
              // rowSelection={rowSelection}
              // expandable={defaultExpandable}
              showHeader={true}
              tableLayout="fixed"
              size="small"
              pagination={{
                position: ["bottomRight"],
              }}
              scroll={{
                y: "calc(100vh - 200px)", // Set the same height as in the style to ensure content scrolls
                // x: "100vw",
              }}

              // scroll={{
              //   y: "calc(100vh - 370px)",
              //   x: "100vw",
              // }}
            />
          </ConfigProvider>
        </div>
      </Modal>
    </>
  );
};
export default StudentSearchModal;
