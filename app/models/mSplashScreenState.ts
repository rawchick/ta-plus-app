import iModel from "./iModel";

export interface iSplashScreenState {
    isLoggedIn: boolean
}

class mSplashScreenState implements iModel, iSplashScreenState  {
    public ClassName = "mSplashScreenState";
    public isLoggedIn = false;
}

export default new mSplashScreenState