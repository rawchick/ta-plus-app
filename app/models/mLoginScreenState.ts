import iModel from "./iModel";

export interface iLoginScreenState {
    //
}

class mLoginScreenState implements iModel, iLoginScreenState  {
    public ClassName = "mLoginScreenState";
}

export default new mLoginScreenState