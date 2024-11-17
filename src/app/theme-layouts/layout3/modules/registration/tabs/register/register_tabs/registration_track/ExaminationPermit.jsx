import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Modal,
  Image,
  Typography,
  QRCode,
  Divider,
  Row,
  Col,
  Button,
  Alert,
  Space,
} from "antd";
import ModuleTable from "./ModuleTable";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRegistrationPermitModalVisible,
  setRegistrationPermitModalVisible,
} from "../../../../store/registrationSlice";
import { Print, Refresh } from "@mui/icons-material";

const { Text, Title } = Typography;

// Correctly forward the ref to the printable content
const PrintableContent = React.forwardRef((props, ref) => (
  <div
    ref={ref} // Pass the ref to the root DOM element
    style={{
      padding: 16,
      backgroundColor: "white",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Image
        preview={false}
        width={200}
        src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg"
      />
      <Row justify="center">
        <div style={{ textAlign: "center", marginTop: "0px" }}>
          <Text strong style={{ fontSize: "2rem" }}>
            OFFICE OF THE ACADEMIC REGISTRAR
          </Text>
          <br />
          <Text>STUDENT EXAMINATION PERMIT</Text>
          <br />
          <Text style={{ fontSize: "1.4rem" }}>
            PRINT DATE:{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Text>
        </div>
      </Row>
      <QRCode
        size={70}
        bordered={false}
        type="svg"
        value="https://ant.design/"
      />
    </div>

    <Divider
      style={{
        marginTop: 10,
        borderColor: "#00008B",
        borderStyle: "dashed",
        borderWidth: 1,
      }}
    />

    <div
      style={{
        padding: 6,
        border: "1px dotted #00008B",
        borderRadius: 5,
      }}
    >
      <Row gutter={16} align="middle" justify="center">
        <Col span={5}>
          <Image
            preview={false}
            width={100}
            style={{ borderRadius: "50%" }}
            src="https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121"
          />
        </Col>

        <Col span={18}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Text strong>PROGRAMME:</Text> (BACE) BACHELOR OF ADULT AND
              COMMUNITY EDUCATION
            </Col>
            <Col span={24}>
              <Text strong>REGISTRATION NO:</Text> 2021/FEB/BCS/B228043/DAY
            </Col>
            <Col span={12}>
              <Text strong>FULL NAME:</Text> MUSIITWA Joel
            </Col>
            <Col span={12}>
              <Text strong>STUDENT NO:</Text> 2000100121
            </Col>
            <Col span={12}>
              <Text strong>STUDY YEAR:</Text> YEAR 1
            </Col>
            <Col span={12}>
              <Text strong>SEMESTER:</Text> SEMESTER I
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

    <Title
      level={5}
      style={{
        color: "green",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      REGISTERED COURSE MODULES
    </Title>
    <div style={{ marginTop: "-5px" }}>
      <ModuleTable />
    </div>

    <Divider
      style={{
        borderColor: "#00008B",
        borderStyle: "dashed",
        borderWidth: 1,
      }}
    />

    <div>
      <Title level={5}>NOTES:</Title>
      <Text style={{ fontStyle: "italic", lineHeight: 0.75 }}>
        <em>
          1. The total credits registered for Semester 1 of the 2024/2025
          academic year is 5.
        </em>
        <br />
        <em>
          2. This card is confidential and must be presented to the invigilator
          upon request at each examination.
        </em>
        <br />
        <em>
          3. Your <strong>STUDENT NUMBER</strong>, not your name, must be
          written on every answer booklet or supplementary sheet.
        </em>
        <br />
        <em>
          4. Unauthorized materials or notes must NOT be brought into the
          examination room.
        </em>
        <br />
        <em>
          5. Mobile phones, iPads, and tablets must NOT be brought near the
          examination room.
        </em>
        <br />
        <em>
          6. Students must comply with the University Examination Regulations.
        </em>
      </Text>
    </div>

    <div style={{ textAlign: "right", marginTop: 16 }}>
      <Image
        preview={false}
        width={200}
        src="https://content.govdelivery.com/attachments/fancy_images/USSOH/2015/12/704441/pdr-signature_original.png"
      />
      <div>ACADEMIC REGISTRAR</div>
    </div>
  </div>
));

function ExaminationPermit() {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const registrationPermitModalVisible = useSelector(
    selectRegistrationPermitModalVisible
  );

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Examination_Permit",
    pageStyle: `
    @page {
      size: A4 landscape;
      margin: 10mm;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      box-sizing: border-box;
    }
    .ant-table {
      border-collapse: collapse;
    }
  `,
  });

  const handleReload = () => {
    console.log("Reloading data...");
  };

  return (
    <div>
      <Modal
        title="Examination Permit Preview"
        open={registrationPermitModalVisible}
        onCancel={() => dispatch(setRegistrationPermitModalVisible(false))}
        footer={false}
        width={900}
        style={{ top: 20, maxHeight: 500 }}
      >
        <Alert
          message={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Text>REGISTRATION TOKEN: REG876723H2JHG23GJH</Text>
              </div>

              <Space>
                <Button
                  type="primary"
                  size="small"
                  ghost
                  icon={<Refresh />}
                  onClick={handleReload}
                >
                  Reload
                </Button>
                <Button
                  type="primary"
                  size="small"
                  ghost
                  icon={<Print />}
                  onClick={handlePrint}
                >
                  Print
                </Button>
              </Space>
            </div>
          }
        />
        <div
          style={{
            maxHeight: "calc(100vh - 220px)",
            overflowY: "auto",
          }}
        >
          <PrintableContent ref={componentRef} />
        </div>
      </Modal>
    </div>
  );
}

export default ExaminationPermit;
