import React, { useRef, useEffect } from "react";
import { Radio, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "perfect-scrollbar";
import {
  selectActiveBioDataTab,
  selectSelectedStudent,
  selectStudentDetails,
  setActiveBioDataTab,
} from "../../../store/infoCenterSlice";
import AcademicInfo from "./biodata_tabs/AcademicInfo";
import PersonalInfo from "./biodata_tabs/PersonalInfo";
import TranscriptSettings from "./biodata_tabs/TranscriptSettings";
import dayjs from "dayjs";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function BioData({ form }) {
  const dispatch = useDispatch();
  const activeBioDataTab = useSelector(selectActiveBioDataTab);
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const selectedStudent = useSelector(selectSelectedStudent);
  const studentDetails = useSelector(selectStudentDetails);

  const handleTabChange = (e) => {
    dispatch(setActiveBioDataTab(e.target.value));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      psRef.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
      });
    }

    return () => {
      if (psRef.current) {
        psRef.current.destroy();
        psRef.current = null;
      }
    };
  }, []);

  // Update scrollbar when tab changes
  useEffect(() => {
    if (psRef.current) {
      psRef.current.update();
    }
  }, [activeBioDataTab]);

  console.log("student details", studentDetails);

  if (!selectedStudent) return;

  useEffect(() => {
    if (studentDetails) {
      form.setFieldsValue({
        student_no: studentDetails.student_no,
        reg_no: studentDetails.registration_no,
        intake: studentDetails.intake_id,
        entry_acc_yr: studentDetails.entry_acc_yr,
        // course_code: selectedStudent.course.course_code,
        course_title: studentDetails.course_details.course.id,
        course_version: studentDetails.course_details.id,
        entry_study_yr: studentDetails.entry_study_yr,
        level: studentDetails.course_details.course.level_details.level_title,
        campus: studentDetails.campus_id,
        status: studentDetails.graduation_status == "completed" ? "Graduated" : studentDetails.status == 1 ? "Active" : "Inactive",
        sponsorship: studentDetails.sponsorship,
        study_time: studentDetails.study_time_id,
        current_yr: studentDetails.current_info.true_study_yr,
        sem: studentDetails.current_info.true_sem,
        college: studentDetails.course_details.course.school.college.id,
        school: studentDetails.course_details.course.school.id,
        surname: studentDetails.biodata.surname,
        othernames: studentDetails.biodata.other_names,
        email: studentDetails.biodata.email,
        phoneNo: studentDetails.biodata.phone_no,
        religion: studentDetails.biodata.religion?.toUpperCase(),
        national_id: studentDetails.biodata.nin?.toUpperCase(),
        gender: studentDetails.biodata.gender?.toUpperCase(),
        marital_status: studentDetails.biodata.marital_status?.toUpperCase(),
        date_of_birth: dayjs(parseInt(studentDetails.biodata.date_of_birth)),
        nationality:
          studentDetails.biodata.nationality.nationality_title?.toUpperCase(),
        billing_nationality:
          studentDetails.biodata.nationality.nationality_category?.toUpperCase(),
        guardian_name:
          studentDetails.next_of_kin?.full_name?.toUpperCase(),
        guardian_phone:
          studentDetails.next_of_kin?.phone_no?.toUpperCase(),
          guardian_relation:
          studentDetails.next_of_kin?.relation?.toUpperCase(),
          guardian_email:
          studentDetails.next_of_kin?.email,
          nin:
          studentDetails.biodata?.nin?.toUpperCase(),
      });
    }
  }, [studentDetails]);




  return (
    <div>
      <Radio.Group value={activeBioDataTab} onChange={handleTabChange}>
        <Radio.Button value="academic_info">Academic Info</Radio.Button>
        <Radio.Button value="personal_info">Personal Information</Radio.Button>
        <Radio.Button value="transcript_settings">
          Transcript Settings
        </Radio.Button>
      </Radio.Group>

      <div
        ref={scrollContainerRef}
        style={{
          position: "relative",
          height: "calc(100vh - 250px)", // Adjust this height as needed
          marginTop: 10,
          // backgroundColor: "red",
          overflow: "hidden", // Hide default scrollbars
        }}
      >
       <Form form={form} {...layout}>
          <div style={{ display: activeBioDataTab === "academic_info" ? "block" : "none" }}>
            <AcademicInfo form={form} />
          </div>
          <div style={{ display: activeBioDataTab === "personal_info" ? "block" : "none" }}>
            <PersonalInfo form={form} />
          </div>
          <div style={{ display: activeBioDataTab === "transcript_settings" ? "block" : "none" }}>
            <TranscriptSettings />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default BioData;
