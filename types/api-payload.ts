import {
  IClass,
  ICommittee,
  IResource,
  ISection,
  IShift,
  IStudent,
  ITeacher,
} from "./api-response";

export interface IRegisterSendOtpPayload {
  phone: string;
}

export interface IRegisterResendOtpPayload {
  phone: string;
}

export interface IRegisterVerifyOtpPayload {
  phone: string;
  otp: number | string;
}

export interface IRegisterConfirmPayload {
  password: string;
}

type ShiftRequiredFields = Pick<IShift, "name">;

type ShiftOptionalFields = Partial<
  Omit<IShift, "_id" | "createdAt" | "updatedAt" | "institute_id">
>;

export type ICreateShiftPayload = ShiftRequiredFields & ShiftOptionalFields;

export type IUpdateShiftPayload = Partial<ICreateShiftPayload>;

type ClassRequiredFields = Pick<IClass, "name" | "shift_id">;

type ClassOptionalFields = Partial<
  Omit<IClass, "_id" | "createdAt" | "updatedAt" | "institute_id">
>;

export type ICreateClassPayload = ClassRequiredFields & ClassOptionalFields;

export type IUpdateClassPayload = Partial<ICreateClassPayload>;

type SectionRequiredFields = Pick<ISection, "name" | "class_id">;

type SectionOptionalFields = Partial<
  Omit<ISection, "_id" | "createdAt" | "updatedAt" | "institute_id">
>;

export type ICreateSectionPayload = SectionRequiredFields &
  SectionOptionalFields;

export type IUpdateSectionPayload = Partial<ICreateSectionPayload>;

type StudentRequiredFields = Pick<
  IStudent,
  "name" | "class_id" | "shift_id" | "section_id" | "roll"
>;

type StudentOptionalFields = Partial<
  Omit<
    IStudent,
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "institute_given_student_id"
    | "photoUrl"
  >
>;

export type ICreateStudentPayload = StudentRequiredFields &
  StudentOptionalFields;

export type IUpdateStudentPayload = Partial<ICreateStudentPayload>;

type TeacherRequiredFields = Pick<
  ITeacher,
  | "name"
  | "pds_id"
  | "mobile"
  | "photo_url"
  | "main_designation"
  | "designation"
  | "current_institute_joining_date"
  | "district"
  | "email"
>;

type TeacherOptionalFields = Partial<
  Omit<ITeacher, "_id" | "createdAt" | "updatedAt" | "institute">
>;

export type ICreateTeacherPayload = TeacherRequiredFields &
  TeacherOptionalFields;

export type IUpdateTeacherPayload = Partial<ICreateTeacherPayload>;

type CommitteeRequiredFields = Pick<
  ITeacher,
  "name" | "mobile" | "photo_url" | "email" | "designation"
>;

type CommitteeOptionalFields = Partial<
  Omit<ICommittee, "_id" | "createdAt" | "updatedAt" | "institute" | "session">
>;

export type ICreateCommitteePayload = CommitteeRequiredFields &
  CommitteeOptionalFields;

export type IUpdateCommitteePayload = Partial<ICreateCommitteePayload>;

type ResourceRequiredFields = Pick<
  IResource,
  | "title"
  | "description"
  | "file_url"
  | "datetime"
  | "isPublic"
  | "type"
  | "slug"
>;

type ResourceOptionalFields = Partial<
  Omit<IResource, "_id" | "createdAt" | "updatedAt">
>;

export type ICreateResourcePayload = ResourceRequiredFields &
  ResourceOptionalFields;

export type IUpdateResourcePayload = Partial<ICreateResourcePayload>;
