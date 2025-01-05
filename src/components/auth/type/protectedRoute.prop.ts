import { Role, Permission } from "../const/authenticationConst";

type ProtectedRouteProps = {
	allowRoles?: Role[];
	allowPermissions?: Permission[];
	children: React.ReactNode;
};

export default ProtectedRouteProps;
