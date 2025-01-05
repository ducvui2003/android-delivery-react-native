import { Role, Permission } from "../const/authenticationConst";

type ProtectedRouteProps = {
	allowRole?: Role;
	allowPermissions?: Permission[];
	children: React.ReactNode;
};

export default ProtectedRouteProps;
