import iModel from "./iModel";

export interface iTripDetailScreenState {
    profileData: object | null
}

class mTripDetailScreenState implements iModel, iTripDetailScreenState  {
    public ClassName = "mTripDetailScreenState";
    public profileData = null;
}

export default new mTripDetailScreenState