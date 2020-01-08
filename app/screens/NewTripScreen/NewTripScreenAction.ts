import { AsyncStorage } from 'react-native';

export class NewTripScreenAction {
    toggleShowDatePicker = (flag: any, mode: string, field: string) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                [field]: flag,
                mode: mode
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setTravellingDate = (newDate: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trTravellingDate: newDate,
                isTravellingDatePickerShow: false,
                isTravellingDateChanged: true
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setReturnDate = (newDate: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trReturnDate: newDate,
                isReturnDatePickerShow: false,
                isReturnDateChanged: true
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setTravellerData = (data: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trTravellerId: data.employeeId,
                trTravellerName: data.firstName+" "+data.sureName
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setFromLocationData = (data: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trFromId: data.locationId,
                trFromText: data.title+" "+data.subTitle
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }
}

export default new NewTripScreenAction;