import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Input,
  Space,
  Splitter,
  Typography,
  Tree,
  Card,
  Table,
  ConfigProvider,
  Upload,
  Modal,
} from "antd";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { url2 } from "app/configs/apiConfig";
import { useDispatch } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { useMutation } from "@apollo/client";
import {
  SEND_RESULTS_UPLOAD_SECURITY_CODE,
  UPLOAD_MIGRATED_RESULTS,
} from "../../../gql/mutations";
import UploadConfirmationModal from "../../UploadConfirmationModal";

const { DirectoryTree } = Tree;

const columns = [
  {
    title: "#",
    dataIndex: "#",
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
    title: "Student No",
    dataIndex: "student_no",
    ellipsis: true,
    width: 120,
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
    title: "Academic Year",
    dataIndex: "accyr",
    ellipsis: true,
    width: 120,
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
    width: 140,
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
    title: "Course work Mark",
    dataIndex: "cw_marks",
    width: 140,
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
    title: "Exam Mark",
    dataIndex: "exam",
    width: 100,
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
    title: "Final Mark",
    dataIndex: "final_mark",
    width: 100,
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
    title: "Retake Count",
    dataIndex: "retake_count",
    width: 110,
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
    title: "Remark",
    dataIndex: "remark",
    width: 100,
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

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CustomSplitter = ({ style, ...restProps }) => {
  const dispatch = useDispatch();
  const [workbook, setWorkbook] = useState(null);
  const [sheetData, setSheetData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [sheetError, setError] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [verifyCodeModalVisible, setVerifyCodeMoodalVisible] = useState(false);
  const [securityCode, setSecurityCode] = useState("");

  const [sendResultsUploadSecurityCode, { error, loading }] = useMutation(
    SEND_RESULTS_UPLOAD_SECURITY_CODE
  );

  const [
    uploadMigratedResults,
    { error: uploadErr, loading: uploadingResults },
  ] = useMutation(UPLOAD_MIGRATED_RESULTS);

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (uploadErr) {
      dispatch(
        showMessage({
          message: uploadErr.message,
          variant: "error",
        })
      );
    }
  }, [error, uploadErr]);

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
            const {
              stdno,
              accyr,
              module_code,
              cswk,
              exam,
              final_mark,
              remark,
              retake_count,
            } = record;

            data = {
              student_no: stdno,
              course_unit_code: module_code,
              cw_marks: cswk,
              exam,
              final_mark,
              remark,
              retake_count,
              accyr,
            };

            if ((!stdno || !module_code || !accyr, !exam)) {
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

  const treeData = [
    {
      title: "Sheets",
      key: "0-0",
      children: sheetNames.map((sheet_name, i) => ({
        title: sheet_name,
        key: i,
        isLeaf: true,
      })),
    },
  ];

  const handleDownload = () => {
    const downloadUrl = `${url2}/templates/activeStudentsTemplate.xlsx`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "activeStudentsTemplate.xlsx"); // Optional, browser may still download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    setSelectedFile(file);
    return false; // Prevent default upload behavior
  };

  const handleUpload = async () => {
    // send code to user's email/sms
    const res = await sendResultsUploadSecurityCode();

    if (res.data?.sendResultsUploadVerificationCode?.success) {
      setVerifyCodeMoodalVisible(true);
    }
  };

  const handleConfirm = async (securityCode) => {
    const results = sheetData
      .filter((record) => record.error === false)
      .map((mk) => ({
        acc_yr: mk.accyr,
        course_unit_code: mk.course_unit_code,
        course_work: mk.cw_marks || null,
        exam: mk.exam || null,
        final_mark: mk.final_mark || null,
        remark: mk.remark || null,
        retake_count: mk.retake_count || 0,
        student_no: `${mk.student_no}`,
      }));

    const payload = {
      securityCode: parseInt(securityCode),
      migrationType: "active",
      payload: results,
    };

    const res = await uploadMigratedResults({
      variables: payload,
    });

    if (res.data?.uploadMigratedResults?.success) {
      Modal.success({
        content: res.data?.uploadMigratedResults?.message,
        centered: true,
      });
      setSheetData([]);
    } else {
      Modal.error({
        title: "Results Upload Error",
        content: res.data?.uploadMigratedResults?.message,
        centered: true,
      });
    }
    setVerifyCodeMoodalVisible(false);
    setSecurityCode("");
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      dispatch(
        showMessage({
          message: "No File Selected!",
          variant: "info",
        })
      );
      return;
    }

    setIsExtracting(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      setWorkbook(workbook);

      // Get all sheet names
      const sheetNames = workbook.SheetNames;
      setSheetNames(sheetNames);
      setIsExtracting(false);
    };
  };

  return (
    <Splitter
      style={{
        ...style,
      }}
      {...restProps}
    >
      <Splitter.Panel
        collapsible
        defaultSize="25%"
        min="20%"
        max="30%"
        style={{
          backgroundColor: "#fff",
          // borderLeftColor: "lightgray",
          // borderTopColor: "lightgray",
          // borderBottomColor: "lightgray",
          // borderWidth: 1.5,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 10px",
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
            <Button
              type="primary"
              ghost
              onClick={handleExtract}
              loading={isExtracting}
              disabled={isExtracting}
            >
              Extract
            </Button>
          </div>

          <Divider
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: "lightgray",
            }}
          />

          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Typography.Title
              style={{
                margin: 0,
                paddingTop: 5,
                paddingBottom: 5,
              }}
              level={5}
            >
              Extracted Data
            </Typography.Title>
          </div>
          <Divider
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: "lightgray",
            }}
          />

          <div>
            <DirectoryTree
              style={{
                padding: 10,
              }}
              multiple
              defaultExpandedKeys={["0-0"]}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div>
        </div>
      </Splitter.Panel>
      <Splitter.Panel collapsible>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%", // Ensure it takes full height
          }}
        >
          <div style={{ flexGrow: 1, padding: 10, overflow: "auto" }}>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    borderColor: "lightgray",
                    borderRadius: 0,
                    headerBorderRadius: 5,
                  },
                },
              }}
            >
              <Table
                size="small"
                title={() => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      Active Students Results Preview
                    </Typography.Title>

                    <Space>
                      <Button
                        type="primary"
                        ghost
                        size="small"
                        icon={<Download size={12} />}
                        onClick={handleDownload}
                      >
                        Download Template
                      </Button>
                    </Space>
                  </div>
                )}
                bordered
                columns={columns}
                dataSource={sheetData}
                pagination={false}
                onChange={onChange}
                scroll={{
                  y: "calc(100vh - 322px)",
                }}
              />
            </ConfigProvider>
          </div>

          <div
            style={{
              paddingTop: 5,
              paddingLeft: 5,
              borderTop: "1px solid lightgray",
              background: "#fff",
              // textAlign: "right",
            }}
          >
            <Button
              onClick={handleUpload}
              disabled={
                sheetData.filter((record) => record.error === false).length ===
                  0 || loading
              }
              loading={loading}
            >
              Upload Results
            </Button>
          </div>
        </div>
        <UploadConfirmationModal
          visible={verifyCodeModalVisible}
          onConfirm={handleConfirm}
          onCancel={() => setVerifyCodeMoodalVisible(false)}
          loading={uploadingResults}
          securityCode={securityCode}
          setSecurityCode={setSecurityCode}
        />
      </Splitter.Panel>
    </Splitter>
  );
};

const ActiveStdResultsUpload = () => (
  <CustomSplitter
    style={{
      height: "calc(100vh - 175px)",
    }}
  />
);
export default ActiveStdResultsUpload;
