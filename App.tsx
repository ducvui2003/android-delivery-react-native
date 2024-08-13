import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import store from "./src/configs/redux/store.config";
import MainScreen from "./src/screens/rootScreens/MainScreen";
import LoadingScreen from "./src/screens/rootScreens/LoadingScreen";
import AnotherScreeHasNotHeaderFooterScreen from "./src/screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
import {RootStackParamList} from "./src/navigations/stack.type";


const RootStack = createStackNavigator<RootStackParamList>()

export default function App() {
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    );
}

function Root() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="LoadingScreen" screenOptions={{
                headerShown: false,
            }}>
                <RootStack.Screen name={"MainScreen"}
                                  component={MainScreen}/>
                <RootStack.Screen name={"LoadingScreen"}
                                  component={LoadingScreen}/>
                <RootStack.Screen name={"AnotherScreeHasNotHeaderScreen"}
                                  component={AnotherScreeHasNotHeaderFooterScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
