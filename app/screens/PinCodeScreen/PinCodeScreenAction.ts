import AsyncStorage from '@react-native-community/async-storage';
import mPinCode from '../../models/mPinCode'

export class PinCodeScreenAction {
    toggleFingerPrintPopup = (flag: boolean) => (dispatch: any, getState: any) => {
        const PinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newPinCodeScreenState = {
                ...PinCodeScreenState,
                fingerPrintPopupShowed: flag
            }

            dispatch({ type: "update", payload: newPinCodeScreenState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "clear", payload: {} })
        }
    }

    setPinCode = (pinCode: any) => (dispatch: any, getState: any) => {
        const PinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCode: pinCode,
                pinCodeErrMessage: null,
                mode: "confirm"
            }

            dispatch({ type: "update", payload: newPinCodeScreenState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "clear", payload: {} })
        }
    }

    confirmPinCode = (pinCode: any) => async (dispatch: any, getState: any) => {
        const PinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCodeConfirmation: pinCode,
                pinCodeSet: true,
                pinCodeErrMessage: null
            }

            await AsyncStorage.setItem('pinCode', pinCode);
            dispatch({ type: "update", payload: newPinCodeScreenState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "clear", payload: {} })
        }
    }

    updateErrMessage = (message: any) => (dispatch: any, getState: any) => {
        const PinCodeScreenState = getState().PinCodeScreenState;
        try {
            const newPinCodeScreenState = {
                ...PinCodeScreenState,
                pinCodeErrMessage: message
            }

            dispatch({ type: "update", payload: newPinCodeScreenState })
        } catch (error) {
            console.log('ERROR: ', error)
            dispatch({ type: "clear", payload: {} })
        }
    }
}

export default new PinCodeScreenAction;