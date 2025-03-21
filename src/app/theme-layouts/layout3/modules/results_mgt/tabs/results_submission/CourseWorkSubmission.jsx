import React, { useState } from "react";
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Input,
  Splitter,
  Table,
  Tree,
  Typography,
  Upload,
} from "antd";
import * as XLSX from "xlsx";
import { CarryOutOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import { url2 } from "app/configs/apiConfig";

const instructions = [
  {
    title: "First row: empty or column names only.",
    crucial: false,
  },
  {
    title: "Required fields must exist",
    crucial: false,
  },
  {
    title: "Coursework mark can't exceed 30",
    crucial: false,
  },
  {
    title: "Coursework submission Deadline: \n 10-03-2024",
    crucial: true,
  },
];

const Desc = (props) => (
  <Flex
    justify="center"
    align="center"
    style={{
      height: "100%",
    }}
  >
    <Typography.Title
      type="secondary"
      level={5}
      style={{
        whiteSpace: "nowrap",
      }}
    >
      {props.text}
    </Typography.Title>
  </Flex>
);

const columns = [
  {
    title: "#",
    dataIndex: "#",
    key: "index",
    width: 50,
    render: (text, record, index) => {
      if (record.error) {
        return (
          <Typography.Text
            style={{
              color: "red",
            }}
          >
            {index + 1}
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{index + 1}</Typography.Text>;
      }
    },
  },
  {
    title: "Student Number",
    dataIndex: "student_no",
    ellipsis: true,
    width: 150,
    render: (text, record, index) => {
      if (record.error) {
        return (
          <Typography.Text
            style={{
              color: "red",
            }}
          >
            {text}
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{text}</Typography.Text>;
      }
    },
  },
  {
    title: "Registration Number",
    dataIndex: "registration_no",
    ellipsis: true,
    width: 150,
    render: (text, record, index) => {
      if (record.error) {
        return (
          <Typography.Text
            style={{
              color: "red",
            }}
          >
            {text}
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{text}</Typography.Text>;
      }
    },
  },
  {
    title: "Course Unit Code",
    dataIndex: "course_unit_code",
    ellipsis: true,
    width: 150,
    render: (text, record, index) => {
      if (record.error) {
        return (
          <Typography.Text
            style={{
              color: "red",
            }}
          >
            {text}
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{text}</Typography.Text>;
      }
    },
  },
  {
    title: "Course Work Marks",
    dataIndex: "cw_marks",
    ellipsis: true,
    width: 150,
    render: (text, record, index) => {
      if (record.error) {
        return (
          <Typography.Text
            style={{
              color: "red",
            }}
          >
            {text}
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{text}</Typography.Text>;
      }
    },
  },
];

function CourseWorkSubmission() {
  const [workbook, setWorkbook] = useState(null);
  const [sheetData, setSheetData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [sheetError, setError] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");

  const treeData = [
    {
      title: "Root",
      key: "0-0",
      icon: <CarryOutOutlined />,
      children: sheetNames.map((sheet_name, i) => ({
        title: sheet_name,
        key: i,
        icon: <CarryOutOutlined />,
      })),
    },
  ];

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      setWorkbook(workbook);

      // Get all sheet names
      const sheetNames = workbook.SheetNames;
      setSheetNames(sheetNames);
    };

    reader.readAsArrayBuffer(file);
    setSelectedFile(file);
    return false; // Prevent default upload behavior
  };

  const onSelect = (selectedKeys, info) => {
    setLoadingData(true); // Set loading state immediately
    setError(null);

    const sheetName = info.node.title;
    setSelectedSheet(sheetName);

    setTimeout(() => {
      // Delay processing slightly to allow UI update
      try {
        if (workbook && workbook.Sheets && workbook.Sheets[sheetName]) {
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet);

          console.log("jsonData", jsonData);
          let _data;
          let data;

          const newArr = jsonData.map((record) => {
            // figure out records with the wrong data
            // the records we need
            const { stdno, regno, module_code, cw_marks } = record;

            data = {
              student_no: stdno,
              registration_no: regno,
              course_unit_code: module_code,
              cw_marks: cw_marks,
            };

            if (!stdno || !regno || !module_code || !cw_marks) {
              _data = { ...data, error: true };
            } else {
              _data = { ...data, error: false };
            }

            return _data;
          });

          setSheetData(newArr);
        } else {
          throw new Error("Sheet not found");
        }
      } catch (err) {
        setError("Failed to load sheet data. Please try again.");
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    }, 100); // Small delay to let loading state render
  };

  const handleDownload = () => {
    const downloadUrl = `${url2}/templates/coursework_submission_template.xlsx`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "applicants-template.xlsx"); // Optional, browser may still download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = () => {
    // logic for uploading the course
    console.log(
      "to be upload",
      sheetData.filter((record) => record.error === false)
    );
  };

  return (
    <div>
      <Splitter
        style={{
          height: "calc(100vh - 175px)",
          padding: 0,
          //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Splitter.Panel
          defaultSize="25%"
          min="20%"
          max="30%"
          style={{
            padding: 0,
          }}
        >
          <div>
            <Typography.Title level={5} className="font-medium text-20 bold">
              Upload Coursework marks
            </Typography.Title>

            <div>
              <div
                style={{
                  padding: "10px 0px",
                  // backgroundColor: "green",
                }}
              >
                <Upload
                  beforeUpload={handleFileUpload}
                  accept=".xlsx, .xls"
                  showUploadList={false}
                >
                  <Input
                    addonAfter={
                      <Button type="text" size="small">
                        Browse
                      </Button>
                    }
                    value={selectedFile ? selectedFile.name : "Select File"}
                    readOnly
                    placeholder="Select File"
                  />
                </Upload>
              </div>
              <Divider
                style={{
                  backgroundColor: "#eeee",
                  padding: 0,
                  margin: 0,
                }}
              />
              <div
                style={{
                  padding: "5px 5px",
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  ghost
                  icon={
                    <Download
                      style={{
                        fontSize: 13,
                      }}
                    />
                  }
                  onClick={handleDownload}
                >
                  Download Template
                </Button>
              </div>

              <Divider
                style={{
                  backgroundColor: "#eeee",
                  padding: 0,
                  margin: 0,
                }}
              />
              <div
                style={{
                  padding: "5px 5px",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Data Extract
                </Typography.Title>
              </div>
              <Divider
                style={{
                  backgroundColor: "#eeee",
                  padding: 0,
                  margin: 0,
                }}
              />

              <div
                style={{
                  padding: "5px 5px",
                  height: "calc(100vh - 500px)",
                }}
              >
                <Tree
                  showLine={true}
                  // showIcon={showIcon}
                  defaultExpandedKeys={["0-0"]}
                  onSelect={onSelect}
                  treeData={treeData}
                />
              </div>
            </div>

            <div className="mr-10">
              <Box
                className="p-16 w-full rounded-16 mb-0 border"
                //   sx={{
                //     backgroundColor: (theme) =>
                //       theme.palette.mode === "light"
                //         ? lighten(theme.palette.background.default, 0.4)
                //         : lighten(theme.palette.background.default, 0.02),
                //   }}
              >
                <Typography className="font-medium text-20 bold">
                  {"Instructions"}
                </Typography>
                {/* {console.log("folders", folders)} */}
                <div className="flex flex-wrap m-0 mt-0">
                  <ol>
                    {instructions.map((instruction, index) => (
                      <li
                        className="my-3"
                        style={{
                          color: instruction.crucial ? "red" : "black",
                          fontSize: "1.7rem",
                        }}
                      >{`${index + 1}. ${instruction.title}`}</li>
                    ))}
                    <li className="my-3">
                      4.{" "}
                      <a
                        href={`${url2}/templates/coursework_submission_template.xlsx`}
                      >
                        Download Template for coursework submmission
                      </a>
                    </li>
                  </ol>
                </div>
              </Box>
            </div>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div
            style={{
              padding: 10,
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    borderColor: "lightgray",
                    borderRadius: 0,
                    headerBorderRadius: 0,
                  },
                },
              }}
            >
              <Table
                // rowSelection={{
                //   type: selectionType,
                //   ...rowSelection,
                // }}
                title={() => (
                  <Typography.Title
                    level={5}
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    Course Work Results Preview
                  </Typography.Title>
                )}
                columns={columns}
                dataSource={sheetData}
                // pagination={false}
                showHeader={true}
                //  loading={loadingData}
                // tableLayout="fixed"
                // sticky
                size="small"
                // style={{
                //   // backgroundColor: "red",
                //   height: 300,
                //   overflow: "scroll",
                // }}
                scroll={{
                  y: 320,
                }}
                // footer={() => <Typography.Text>100 Records</Typography.Text>}
                bordered
                // scroll={{
                //   // y: "calc(100vh - 200px)", // Set the same height as in the style to ensure content scrolls
                //   // x: "100vw",

                // }}
              />
            </ConfigProvider>
          </div>
          <div
            style={{
              padding: 10,
              position: "absolute",
              bottom: 0,
              borderTopColor: "lightgray",
              borderTopWidth: 1,
              width: "100%",
            }}
          >
            <Button
              onClick={handleUpload}
              disabled={
                sheetData.filter((record) => record.error === false).length == 0
              }
            >
              Upload Course Work Results
            </Button>
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

export default CourseWorkSubmission;
