import AbsenceReasons from "./AbsenceReasons";

export default interface AbsenceReasonsResponse{
    overall: AbsenceReasons,
    absenceReasons : AbsenceReasons[]
}