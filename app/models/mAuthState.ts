import iModel from "./iModel";

export interface iAuthState {
    userInfo: object | null
    userTokens: object | null
    accessTokens?: object | null
}

class mAuthState implements iModel, iAuthState  {
    public ClassName = "mAuthState"
    public userInfo = null
    public userTokens = null
    public accessTokens = null
}

export default new mAuthState