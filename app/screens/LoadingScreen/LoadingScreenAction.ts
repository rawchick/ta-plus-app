import { AsyncStorage } from 'react-native';

export class LoadingScreenAction {
    getAccessToken = (accessToken: any) => async (dispatch: any, getState: any) => {
        const AuthState = getState().AuthState;
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');
            const userInfo = await AsyncStorage.getItem('userInfo');
            await AsyncStorage.setItem('accessToken', accessToken);
            const newAuthState = {
                ...AuthState,
                userInfo: userInfo,
                userToken: userToken,
                userId: userId,
                accessToken: accessToken
            }

            dispatch({ type: "update", payload: newAuthState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "clear", payload: {} })
        }
    }
}

export default new LoadingScreenAction;