enum ActionType {
    // Use when action inputs fail validation or when you don't want to change any state
    // so it falls into default case of a reducer
    NO_CHANGE,

    // LOGIN_CONTROL
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    //Login Screen
    LOGIN_SCREEN_INIT,

    //Setting Screen
    LOGOUT_SUCCESS
}

export default ActionType;