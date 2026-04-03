export const roleOptions = [
  {
    value: "Student",
    title: "Student",
    description: "For learners joining workshops and tracking participation.",
    professions: ["Student", "Research Scholar", "Teaching Assistant", "Club Lead", "Other"],
  },
  {
    value: "Coordinator",
    title: "Coordinator",
    description: "For faculty and organizers managing workshop delivery.",
    professions: [
      "Faculty Coordinator",
      "Workshop Coordinator",
      "Institute Coordinator",
      "Department Coordinator",
      "Program Manager",
      "Community Lead",
      "Other",
    ],
  },
  {
    value: "Admin",
    title: "Admin",
    description: "For full portal access, approvals, reporting, and account-level oversight.",
    professions: ["Portal Administrator", "Program Head", "Approval Manager", "Other"],
  },
];

export const getProfessionsForRole = (role) =>
  roleOptions.find((item) => item.value === role)?.professions ?? roleOptions[0].professions;
