import AsyncStorage from '@react-native-community/async-storage';
import { iPinCodeScreenState } from '../../models/mPinCodeScreenState'

export class PinCodeScreenAction {
    toggleFingerPrintPopup = (flag: boolean) => (dispatch: any, getState: any) => {
        const PinCodeScreenState: iPinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newState: iPinCodeScreenState = {
                ...PinCodeScreenState,
                fingerPrintPopupShowed: flag
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            console.log('error >>>>>', error)
            dispatch({ type: "default", payload: {} })
        }
    }

    setPinCode = (pinCode: string) => (dispatch: any, getState: any) => {
        const PinCodeScreenState: iPinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newState: iPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCode: pinCode,
                pinCodeHeaderMessage: "Please confirm your pin",
                pinCodeErrorMessage: null
            }

            console.log(newState)

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "default", payload: {} })
        }
    }

    confirmPinCode = (pinCode: string) => async (dispatch: any, getState: any) => {
        const PinCodeScreenState: iPinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newState: iPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCodeConfirmation: pinCode,
                pinCodeErrorMessage: null
            }

            await AsyncStorage.setItem('pinCode', pinCode);
            dispatch({ type: "update", payload: newState })
        } catch (error) {
            console.log('error >>>>>', error)
            await AsyncStorage.removeItem('pinCode');
            dispatch({ type: "default", payload: {} })
        }
    }

    setPinCodeError = (message: any) => (dispatch: any, getState: any) => {
        const PinCodeScreenState: iPinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newState: iPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCodeErrorMessage: message
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            console.log('error >>>>>', error)
            dispatch({ type: "default", payload: {} })
        }
    }
}

export default new PinCodeScreenAction;