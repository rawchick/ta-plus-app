import iModel from "./iModel";

export interface iPinCodeScreenState {
    pinCode: string | null
    pinCodeConfirmation: string | null
    isPinCodeSet: boolean
    pinCodeErrorMessage: string | null
    pinCodeHeaderMessage: string | null
    biometric: any
    fingerPrintErrorMessage: string | null
    fingerPrintPopupShowed: boolean
}

class mPinCodeScreenState implements iModel, iPinCodeScreenState  {
    public ClassName = "mPinCode"
    public pinCode = null
    public pinCodeConfirmation = null
    public isPinCodeSet = false
    public pinCodeErrorMessage = null
    public pinCodeHeaderMessage = "Please enter your pin"
    public biometric = undefined
    public fingerPrintErrorMessage = null
    public fingerPrintPopupShowed = false
}

export default new mPinCodeScreenState