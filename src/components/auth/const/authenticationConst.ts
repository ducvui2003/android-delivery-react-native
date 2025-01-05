// eslint-disable-next-line unused-imports/no-unused-vars
const RoleConst = {
	admin: "admin",
	user: "user",
} as const;

type Role = (typeof RoleConst)[keyof typeof RoleConst];

// eslint-disable-next-line unused-imports/no-unused-vars
const PermissionConst = {
	CAN_CREATE: "/",
} as const;

type Permission = (typeof PermissionConst)[keyof typeof PermissionConst];

export { Role, Permission };
