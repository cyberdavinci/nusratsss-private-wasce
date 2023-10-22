import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "GENDER", uid: "gender", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "SUBJECTS", uid: "subjects", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "REGISTRATION STATUS", uid: "registrationStatus", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Complete", uid: "complete" },
  { name: "Incomplete", uid: "incomplete" },
  { name: "Denied", uid: "denied" },
];
const subjectOptions = [
  { name: "Math", uid: "math" },
  { name: "English", uid: "english" },
  { name: "Physics", uid: "physics" },
  { name: "Chemistry", uid: "chemistry" },
  { name: "Arts", uid: "arts" },
  { name: "Geography", uid: "geography" },
];

export { columns, statusOptions, subjectOptions };
