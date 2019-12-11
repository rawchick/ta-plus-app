import IActionType from '../IAction';
import ActionType from '../ActionType';
import IHomeScreenStateDTO, { initialHomeScreenState } from '../../DTOs/HomeScreenDTO'

const reducer = (state: IHomeScreenStateDTO = initialHomeScreenState, action: IActionType<any>): IHomeScreenStateDTO => {
    switch (action.type) {
        default:
            return {
                ...state
            };
        case ActionType.HOME_SCREEN_INIT:
            return {
                ...initialHomeScreenState,
                ...action.payload,
            };
        case ActionType.HOME_SCREEN_INIT:
            return {
                ...state,
                ...action.payload
            };
    }
};

export default reducer;