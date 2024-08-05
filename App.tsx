import {StyleSheet, Text, View} from 'react-native';
import GoogleAuth from "./components/auth/GoogleAuth";


export default function App() {
    return (
        <View style={styles.container}>
            <Text>Chào mừng bạn đến với chức năng đăng nhập bằng google</Text>
            <GoogleAuth/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
