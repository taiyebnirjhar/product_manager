export enum TAG_TYPES {
  GLOBAL = "global",
  SHIFTS = "shifts",
  SECTIONS = "sections",
  CLASSES = "classes",
  RESOURCES = "resources",
  STUDENTS = "students",
  TEACHERS = "teachers",
  COMMITTEES = "committees",
  NOTICES = "notices",
  DOWNLOADS = "downloads",
  INSTITUTE = "institute",
}

export const tagTypesList = Object.values(TAG_TYPES).filter(
  (value) => typeof value === "string"
);
