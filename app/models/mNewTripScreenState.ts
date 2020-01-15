import iModel from "./iModel";
import { arrayInsert } from "redux-form";
class NewTripScreenState implements iModel {
    public ClassName = "mNewTripScreenState";
    public tripObjective = null;

    public mode = 'date';

    public trTravellingDate = new Date();
    public isTravellingDatePickerShow = false;
    public isTravellingDateChanged = false;
    public travellingDateTimeStamp = null;

    public trReturnDate = new Date();
    public isReturnDatePickerShow = false;
    public isReturnDateChanged = false;
    public returnDateTimeStamp = null;

    public trTravelerId = null;
    public trTravelerName = null;

    public trTravelType = undefined;
    public trFromId = null;
    public trFromText = null;
    public tripDestination = null;
    public tripDestinationDisplay = null;

    public tripClearanceStaff = null;
    public tripClearanceStaffDisplay = null;
    public newTripId = null;
}

export default new NewTripScreenState