export const abilitiesDescription: Record<
  string,
  { label: string; description: string }
> = {
  updateUser: {
    label: "Update user",
    description:
      "Allows updating information about other users, including their name, email, and profile settings.",
  },
  deleteUser: {
    label: "Delete user",
    description:
      "Grants permission to permanently remove a user from the system, including all associated data.",
  },
  createBan: {
    label: "Create ban",
    description:
      "Enables the creation of bans for users, restricting their access to the platform for specified reasons.",
  },
  updateBan: {
    label: "Update ban",
    description:
      "Allows modification of existing bans, including changing the duration or reason for the ban.",
  },
  deleteBan: {
    label: "Delete ban",
    description:
      "Permits the removal of a ban, restoring the user's access to the platform.",
  },
  updateComment: {
    label: "Update comment",
    description:
      "Allows updating other users' comments, including changing the content or correcting mistakes.",
  },
  deleteComment: {
    label: "Delete comment",
    description:
      "Grants permission to remove comments from the platform, either by the original author or moderators.",
  },
  createRole: {
    label: "Create role",
    description:
      "Enables the creation of new roles within the system, defining permissions and responsibilities for users.",
  },
  updateRole: {
    label: "Update role",
    description:
      "Allows modification of existing roles, including changing permissions or renaming the role.",
  },
  deleteRole: {
    label: "Delete role",
    description:
      "Permits the removal of a role from the system, affecting all users assigned to that role.",
  },
};
