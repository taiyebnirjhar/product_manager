export interface ITeacher {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  pds_id: string;
  mobile: string;
  photo_url: string;
  main_designation: string;
  designation: string;
  current_institute_joining_date?: string;
  institute?: string;
  district: string;
  email?: string | null; // nullable
}

export interface ICommittee {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  photo_url: string;
  designation: string;
  mobile: string;
  email?: string | null; // nullable
  session?: string | null; // nullable
  institute?: string | null;
}

export interface IStudent {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  class_id: string;
  shift_id: string;
  section_id: string;
  institute_given_student_id?: string;
  roll: number;
  photoUrl?: string;
}

export interface IStudentResponse {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  class_id: {
    _id?: string;
    name?: string;
  };
  shift_id: {
    _id?: string;
    name?: string;
  };
  section_id: {
    _id?: string;
    name?: string;
  };
  institute_given_student_id?: string;
  roll: number;
  photoUrl?: string;
}

export interface IUser {
  _id: string;
  createdAt?: string;
  phone: string;
  password: string;
  isNeedPassCreate: boolean;
  name: string;
  isOtpVerified: boolean;
}

export enum ResourceTypeEnum {
  NOTICE = "notice",
  DOWNLOAD = "download",
}

export interface IResource {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  file_url: string;
  datetime: string; // ISO 8601 date-time string like "2025-07-26T15:00:00.000Z"
  isPublic: boolean;
  type: ResourceTypeEnum;
  slug?: string;
}

export interface IShiftDetail {
  name: string;
  startTime: string; // Format: "HH:mm" or ISO string
  endTime: string; // Format: "HH:mm" or ISO string
  totalStudents: number;
  totalTeachers: number;
}

export enum HeadTeacherTypeEnum {
  PRINCIPAL = "principal",
  HEAD_TEACHER = "head-teacher",
  OTHER_MANUAL_ENTRY = "other_manual_entry",
}

export interface IInstituteAbout {
  nameBn: string;
  nameEn: string;
  address: string;
  road: string;
  wardNo: string;
  union: string;
  postOffice: string;
  upazila: string;
  zilla: string;
  division: string;
  telephone: string;
  email: string;
  website: string;

  eiin: string;
  totalStudents: number;
  shiftCount: number;
  institutionType: string;

  headTeacherName: string;
  headTeacherType: HeadTeacherTypeEnum;
  headTeacherPhotoUrl: string;

  collaborator: string;
  collaboratorUrl: string;

  shifts: IShiftDetail[];

  totalLandAcre: number;
  totalBuildings: number;
  totalClassrooms: number;

  hasMultimediaClassroom: boolean;

  hasIctLab: boolean;
  ictLabCount: number;

  hasScienceLab: boolean;
  scienceLabCount: number;

  libraryRoomNumber: string;

  hasAuditorium: boolean;
  hasBorderFacility: boolean;

  historyText: string;
}

export interface IShift {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  institute_id?: string;
}

export interface ISection {
  _id?: string;
  name: string;
  class_id?: string;
  class_name?: string;
  shift_id?: string;
  shift_name?: string;
  createdAt?: string;
  updatedAt?: string;
  institute_id?: string;
}

export interface ISectionResponse {
  _id?: string;
  name: string;
  classes?: Array<{
    _id?: string;
    name: string;
    sections?: Array<{
      _id?: string;
      name: string;
      createdAt?: string;
      updatedAt?: string;
    }>;
  }>;
}

export interface IClass {
  _id?: string;
  name: string;
  shift_id: string;
  shift_name?: string;
  createdAt?: string; //2025-07-25T23:46:37.151+00:00
  updatedAt?: string; //2025-07-25T23:46:37.151+00:00
  institute_id?: string;
}

export interface IInstituteInfoResponse {
  address: {
    road: string;
    wardNo: string;
    union: string;
    postOffice: string;
    postCode: number;
    upazila: string;
    district: string;
    division: string;
  };
  collaborator: {
    name: string;
    url: string;
  };
  _id?: string;
  eiin: number;
  nameBn: string;
  nameEn: string;
  telephone: string;
  email: string;
  website: string;
  totalStudents: number;
  totalTeachers: number;
  totalShift: string;
  institutionType: string;
  headTeacherName: string;
  headTeacherPhotoURL: string;
  shifts: {
    shiftName: string;
    shiftDetails: string;
    _id?: string;
  }[];
  totalAcre: number;
  totalBuildings: number;
  totalClassrooms: number;
  multimediaClassrooms: string;
  ictLab: boolean;
  ictLabCount: number;
  scienceLab: boolean;
  scienceLabCount: number;
  __v: number;
  president_name: string;
  president_photoUrl: string;
  mapLink: string;
  banner_url: string;
  lastUpdated: string; // ISO date string
  history_bn: string;
  hasBoundary: boolean;
}
