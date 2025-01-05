import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import ProtectedRouteProps from "./type/protectedRoute.prop";
import { User } from "../../types/user.type";

const ProtectedRoute = ({ allowRole, allowPermissions, children }: ProtectedRouteProps) => {
	const userSelector: User | null = useSelector((state: RootState) => state.authState.user);
	const role = userSelector?.role;
	const permissions = userSelector?.permissions || [];

	if (!userSelector) {
		return null;
	}

	if (allowRole && role !== allowRole) {
		return null;
	}

	if (allowPermissions && !allowPermissions.every(permission => permissions.includes(permission))) {
		return null;
	}

	return children;
};
export default ProtectedRoute;
