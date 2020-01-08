import iModel from "./iModel";
class NewTripScreenState implements iModel  {
    public ClassName = "mNewTripScreen";
    public trTravellingDate = new Date();
    public trReturnDate = new Date();
    public mode = 'date';
    public isReturnDatePickerShow = false;
    public isTravellingDatePickerShow = false;
    public isTravellingDateChanged = false;
    public isReturnDateChanged = false;

    public trTravelerId = null;
    public trTravelerName = null;
}

export default new NewTripScreenState