import iModel from "./iModel";
class mPinCode implements iModel  {
    public ClassName = "mPinCode";
    public firstTimeLoggedInFlag = true;
    public pinCode = null;
    public pinCodeConfirmation = null;
    public pinCodeSet = false;
    public pinCodeErrMessage = null;
    public biometric = undefined;
    public fingerPrintErrorMessage = null;
    public fingerPrintPopupShowed = false;
    public mode = "enter";
}


export default new mPinCode