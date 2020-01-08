import AsyncStorage from '@react-native-community/async-storage';

export class LoginScreenAction {
    signIn = (tokens: any, accessTokens: any, userInfo: any) => async (dispatch: any, getState: any) => {
        const AuthState = getState().AuthState;
        try {
            await AsyncStorage.setItem('userToken', tokens.accessToken);
            await AsyncStorage.setItem('userId', tokens.userId);
            await AsyncStorage.setItem('accessToken', accessTokens.accessToken);

            const newAuthState = {
                ...AuthState,
                userInfo: userInfo,
                userToken: tokens.accessToken,
                userId: tokens.userId,
                accessToken: accessTokens.accessToken
            }

            dispatch({ type: "update", payload: newAuthState })
        } catch (error) {
            await AsyncStorage.removeItem('userToken', tokens.accessToken);
            await AsyncStorage.removeItem('userId', tokens.userId);
            await AsyncStorage.removeItem('accessToken', accessTokens.accessToken);
        }
    }
}

export default new LoginScreenAction;