import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import ProtectedRouteProps from "./type/protectedRoute.prop";
import { User } from "../../types/user.type";

const ProtectedRoute = ({ allowRoles, allowPermissions, children }: ProtectedRouteProps) => {
	const userSelector: User | undefined = useSelector((state: RootState) => state.authState.user);

	if (!userSelector) {
		return null;
	}
	console.log("userSelector", userSelector.email);

	const role = userSelector.role;
	const permissions = userSelector.permissions;

	console.log("role", role);

	if (allowRoles && allowRoles.find(allowRole => allowRole === role) === undefined) {
		return null;
	}

	if (allowPermissions && !allowPermissions.every(permission => permissions.includes(permission))) {
		return null;
	}

	return children;
};
export default ProtectedRoute;
