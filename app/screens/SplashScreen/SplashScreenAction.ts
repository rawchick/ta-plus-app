import AsyncStorage from '@react-native-community/async-storage'
import { iAuthState } from '../../models/mAuthState'
import { iSplashScreenState } from '../../models/mSplashScreenState'

export class SplashScreenAction {
    refreshAccessToken = (accessTokens: any) => async (dispatch: any, getState: any) => {
        const AuthState: iAuthState = getState().AuthState
        try {
            await AsyncStorage.setItem('accessTokens', JSON.stringify(accessTokens))
            const newAuthState: iAuthState = {
                ...AuthState,
                accessTokens: accessTokens
            }

            dispatch({ type: "update", payload: newAuthState })
        } catch (error) {
            console.log('error >>>>>', error)
            await AsyncStorage.removeItem('accessTokens')
            dispatch({ type: "default", payload: {} })
        }
    }

    setLoggedIn = () => async (dispatch: any, getState: any) => {
        const SplashScreenState: iSplashScreenState = getState().SplashScreenState
        try {
            const newSplashScreenState: iSplashScreenState = {
                ...SplashScreenState,
                isLoggedIn: true
            }

            dispatch({ type: "update", payload: newSplashScreenState })
        } catch (error) {
            console.log('error >>>>>', error)
            await AsyncStorage.removeItem('accessTokens')
            dispatch({ type: "default", payload: {} })
        }
    }
}

export default new SplashScreenAction;