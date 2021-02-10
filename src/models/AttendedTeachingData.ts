import AttendanceData from "./AttendanceData";

export default interface AttendedTeachingData {
    course: string;
    attendanceData: AttendanceData[];
}