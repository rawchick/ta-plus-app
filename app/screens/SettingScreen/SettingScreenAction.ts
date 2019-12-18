import { AsyncStorage } from 'react-native';
import ILoginScreenStateDTO from '../../dtos/LoginScreenDTO';
import ActionType from '../../redux/ActionType';

export class SettingScreenAction {
    Logout = () => (dispatch: any, getState: any) => {
        try {
            AsyncStorage.removeItem('accessToken')
                .then((data) => {
                    dispatch({
                        type: ActionType.LOGOUT_SUCCESS,
                        payload: {
                            isLoggedIn: true
                        }
                    });
                })
                .catch((err) => {
                    console.log('ERROR: ', err)
                    dispatch({ type: ActionType.NO_CHANGE, payload: {} })
                })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: ActionType.NO_CHANGE, payload: {} })
        }
    }
}

export default new SettingScreenAction();