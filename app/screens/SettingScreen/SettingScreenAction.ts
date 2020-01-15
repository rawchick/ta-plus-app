import AsyncStorage from '@react-native-community/async-storage';

export class SettingScreenAction {
    Logout = () => async (dispatch: any, getState: any) => {
        try {
            await AsyncStorage.removeItem('userTokens');
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('accessTokens');
            await AsyncStorage.removeItem('pinCode');
            dispatch({ type: "clear", payload: {} })
        } catch (err) {
            console.log('error >>>>>', err)
            dispatch({ type: "clear", payload: {} })
        }
    }
}

export default new SettingScreenAction;