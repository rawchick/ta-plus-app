import { AsyncStorage } from 'react-native';

export class SettingScreenAction {
    Logout = () => async (dispatch: any, getState: any) => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('pinCode');
        } catch (err) {
            console.log('ERROR: ', err)
        }
    }
}

export default new SettingScreenAction;