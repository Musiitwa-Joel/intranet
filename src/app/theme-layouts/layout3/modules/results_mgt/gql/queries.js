import { gql } from "@apollo/client";

const GET_STUDENT_MARKS = gql`
  query getStudentMarks($studentNo: String!) {
    get_student_marks(student_no: $studentNo) {
      id
      student_no
      biodata {
        surname
        other_names
        date_of_birth
        gender
      }
      registration_no
      course_details {
        version_title
        course {
          course_code
          course_title
          school {
            school_code
            school_title
          }
        }
      }
      student_marks {
        student_no
        acc_yr_title
        course_unit_code
        course_unit_title
        study_yr
        semester
        yrsem
        coursework
        exam
        credit_units
        final_mark
        grade
        grade_point
        GPA
        CGPA
        TCU
        CTCU
        CTWS
        remarks
      }
    }
  }
`;

export { GET_STUDENT_MARKS };
