import StudentData from "./StudentData";

export default interface Student{
    userId: number;
    studyLevel: string;
    courseTitle: string;
    courseCode: string;
    email: string;
    phone: string;
    studentData: StudentData[];
}