import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ActivityIndicator, AppState, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {RootState} from "../../configs/redux/store.config";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
	const isAuthenticated = useSelector((state: RootState) => state.authState.accessToken);
	const status = useSelector((state: RootState) => state.authState.loading);  // Loading state from auth

	const [visible, setVisible] = useState(false);  // State for dialog visibility
	const navigation = useNavigation();

	// Show dialog if user is not authenticated
	useEffect(() => {
		if (!isAuthenticated && status == true) {
			setVisible(true);  // Show dialog if not authenticated
		}
	}, [isAuthenticated, status]);

	// Close dialog and redirect to sign-in screen
	const handleDialogClose = () => {
		setVisible(false);
		navigation.navigate('SignIn');  // Redirect to SignIn screen
	};

	if (status == true) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff"/>
			</View>
		);
	}

	if (!isAuthenticated) {
		return (
			<Text>You are not authenticated. Please sign in to continue."</Text>
		);
	}

	return children;
};
