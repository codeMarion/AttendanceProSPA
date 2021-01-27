export default interface UploadModel{
    id: number;
    userId: number;
    studyLevel: string;
    courseYear: string;
    regStatus: string;
    courseTitle: string;
    courseCode: string;
    teaching: number;
    attended: number;
    explained: number;
    nonAttended: number;
    percentAttendance: number;
    unexcusedPercentAttendance: number;
    lastAttendance: Date;
}