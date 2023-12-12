import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "GENDER", uid: "gender", sortable: true },
  // { name: "ROLE", uid: "role", sortable: true },
  { name: "SUBJECTS", uid: "subjects", sortable: true },
  { name: "TOKEN", uid: "token" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "REGISTRATION STATUS", uid: "registrationStatus", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Complete", uid: "complete" },
  { name: "Incomplete", uid: "incomplete" },
  { name: "Denied", uid: "denied" },
];
const subjectOptions = [
  { name: "Mathematics", uid: "mathematics" },
  { name: "English Language", uid: "english language" },
  { name: "Physics", uid: "physics" },
  { name: "Chemistry", uid: "chemistry" },
  { name: "Geography", uid: "geography" },
  { name: "Agricultural Science", uid: "agricultural science" },
  { name: "Biology", uid: "biology" },
  { name: "History", uid: "history" },
  { name: "Health Science", uid: "health science" },
  { name: "General Science", uid: "general science" },
  { name: "Islamic Studies", uid: "islamic studies" },
  { name: "French", uid: "french" },
  { name: "Economics", uid: "economics" },
  { name: "Financial Accounting", uid: "financial accounting" },
  { name: "Business Management", uid: "business management" },
  { name: "Commerce", uid: "commerce" },
  { name: "Literature", uid: "literature" },
  { name: "Government", uid: "government" },
];

export { columns, statusOptions, subjectOptions };
