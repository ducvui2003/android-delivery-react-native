import {Provider} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "./src/navigations/stack.type";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import store from "./src/configs/redux/store.config";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import {WelcomeScreen} from "./src/screens/WelcomeScreen";
import IntroduceScreen from "./src/screens/IntroduceScreen";

const RootStack = createStackNavigator<RootStackParamList>()

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <SafeAreaView style={{flex: 1}}>
                    <Root/>
                </SafeAreaView>
            </Provider>
        </SafeAreaProvider>
    );
}

function Root() {
    return (
        <NavigationContainer>
            <RootStack.Navigator  initialRouteName="LoadingScreen" screenOptions={{
                headerShown: false,
            }}>
                <RootStack.Screen name={"MainScreen"}
                                  component={MainScreen}/>
                <RootStack.Screen name={"LoadingScreen"}
                                  component={LoadingScreen}/>
                <RootStack.Screen name={"WelcomeScreen"}
                                  component={WelcomeScreen}/>
                <RootStack.Screen name={"IntroduceScreen"}
                                  component={IntroduceScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
