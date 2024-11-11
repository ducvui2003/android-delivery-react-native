import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

type ProtectedRouteProps = {
	children: React.ReactNode;
	roles: string[];
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
	const userSelector = useSelector((state: RootState) => state.authState.user);

	if (!userSelector) {
		return null;
	}

	if (roles && !roles.includes(userSelector?.role)) {
		return null;
	}

	return children;
};
