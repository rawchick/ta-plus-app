import AsyncStorage from '@react-native-community/async-storage';
import { iAuthState } from '../../models/mAuthState'

export class LoginScreenAction {
    signIn = (tokens: any, userInfo: any) => async (dispatch: any, getState: any) => {
        const AuthState: iAuthState = getState().AuthState;
        try {
            await AsyncStorage.setItem('userTokens', JSON.stringify(tokens));
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

            const newAuthState: iAuthState = {
                ...AuthState,
                userTokens: tokens,
                userInfo: userInfo,
            }

            dispatch({ type: "update", payload: newAuthState })
        } catch (error) {
            console.log("error >>>> ", error)
            await AsyncStorage.removeItem('userTokens');
            await AsyncStorage.removeItem('userInfo');
            dispatch({ type: "default", payload: {} })
        }
    }
}

export default new LoginScreenAction;