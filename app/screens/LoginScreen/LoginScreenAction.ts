import { AsyncStorage } from 'react-native';
import ILoginScreenStateDTO from '../../dtos/LoginScreenDTO';
import ActionType from '../../redux/ActionType';

export class LoginScreenAction {
    Login = (token: string) => (dispatch: any, getState: any) => {
        try {
            AsyncStorage.setItem('accessToken', token)
                .then((data) => {
                    dispatch({
                        type: ActionType.LOGIN_SUCCESS,
                        payload: {
                            isLoggedIn: true
                        }
                    });
                })
                .catch((err) => {
                    console.log('ERROR: ', err)
                    dispatch({ type: ActionType.NO_CHANGE, payload: {} })
                })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: ActionType.NO_CHANGE, payload: {} })
        }
    }
}

export default new LoginScreenAction();