import React, { useRef, useEffect } from "react";
import { Radio, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "perfect-scrollbar";
import {
  selectActiveBioDataTab,
  selectSelectedStudent,
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

  if (!selectedStudent) return;

  useEffect(() => {
    if (selectedStudent) {
      form.setFieldsValue({
        student_no: selectedStudent.student_no,
        reg_no: selectedStudent.registration_no,
        intake: selectedStudent.intake_id,
        entry_acc_yr: selectedStudent.entry_acc_yr,
        // course_code: selectedStudent.course.course_code,
        course_title: selectedStudent.course.id,
        course_version: selectedStudent.course_details.id,
        entry_study_yr: selectedStudent.entry_study_yr,
        level: selectedStudent.course.level_details.level_title,
        campus: selectedStudent.campus_id,
        status: selectedStudent.status == 1 ? "Active" : "Inactive",
        sponsorhip: selectedStudent.sponsorhip,
        study_time: selectedStudent.study_time_id,
        current_yr: selectedStudent.study_yr,
        sem: selectedStudent.current_sem,
        college: selectedStudent.course.school.college.id,
        school: selectedStudent.course.school.id,
        surname: selectedStudent.biodata.surname,
        othernames: selectedStudent.biodata.other_names,
        email: selectedStudent.biodata.email,
        phoneNo: selectedStudent.biodata.phone_no,
        religion: selectedStudent.biodata.religion?.toUpperCase(),
        national_id: selectedStudent.biodata.nin?.toUpperCase(),
        gender: selectedStudent.biodata.gender?.toUpperCase(),
        marital_status: selectedStudent.biodata.marital_status?.toUpperCase(),
        date_of_birth: dayjs(parseInt(selectedStudent.biodata.date_of_birth)),
        nationality:
          selectedStudent.biodata.nationality.nationality_title?.toUpperCase(),
        billing_nationality:
          selectedStudent.biodata.nationality.nationality_category?.toUpperCase(),
      });
    }
  }, [selectedStudent]);




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
