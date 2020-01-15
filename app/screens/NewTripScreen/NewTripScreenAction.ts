import { AsyncStorage } from 'react-native';
import MyTripService, { IMyTripService } from '../../services/MyTripService'

export class NewTripScreenAction {
    private MyTripService: IMyTripService;
    constructor(MyTripService: IMyTripService) {
        this.MyTripService = MyTripService;
    }

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

    setTravellingDate = (event: any, newDate: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trTravellingDate: newDate,
                isTravellingDatePickerShow: false,
                isTravellingDateChanged: true,
                travellingDateTimeStamp: event.nativeEvent.timestamp
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setTripObjective = (data: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                tripObjective: data,
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setReturnDate = (event: any, newDate: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trReturnDate: newDate,
                isReturnDatePickerShow: false,
                isReturnDateChanged: true,
                returnDateTimeStamp: event.nativeEvent.timestamp
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
                trTravelerId: data.employeeId,
                trTravelerName: data.firstName + " " + data.sureName
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    stackDestination = (item: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        let tripDestination = NewTripScreenState.tripDestination ? NewTripScreenState.tripDestination : []
        let tripDestinationDisplay = NewTripScreenState.tripDestinationDisplay ? NewTripScreenState.tripDestinationDisplay : []

        let newTripDestination = {
            "trdId": 0,
            "trdDestinationId": item.locationId,
            "trdSeq": parseInt(tripDestination.length) + 1
        }

        let newTripDestinationDisplay = {
            "locationId": item.locationId,
            "title": item.title
        }

        tripDestination.push(newTripDestination)
        tripDestinationDisplay.push(newTripDestinationDisplay)

        try {
            const newState = {
                ...NewTripScreenState,
                tripDestination: tripDestination,
                tripDestinationDisplay: tripDestinationDisplay
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
                trFromText: data.title + " " + data.subTitle
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    setTravelType = (value: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            const newState = {
                ...NewTripScreenState,
                trTravelType: value
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {

        }
    }

    stackClearanceStaff = (item: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        let tripClearanceStaff = NewTripScreenState.tripClearanceStaff ? NewTripScreenState.tripClearanceStaff : []
        let tripClearanceStaffDisplay = NewTripScreenState.tripClearanceStaffDisplay ? NewTripScreenState.tripClearanceStaffDisplay : []

        const newTripClearanceStaff = {
            "trcsId": 0,
            "trcsEmployeeId": item.employeeId,
        }

        const newTripClearanceStaffDisplay = {
            "employeeId": item.employeeId,
            "shortName": item.firstName.slice(0, 1) + '' + item.sureName.slice(0, 1),
        }

        tripClearanceStaff.push(newTripClearanceStaff)
        tripClearanceStaffDisplay.push(newTripClearanceStaffDisplay)

        try {
            const newState = {
                ...NewTripScreenState,
                tripClearanceStaff: tripClearanceStaff,
                tripClearanceStaffDisplay: tripClearanceStaffDisplay
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            throw error
        }
    }

    removeDestinationItem = (locationId: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState
        let destinationArray = NewTripScreenState.tripDestination
        let destinationDisplayArray = NewTripScreenState.tripDestinationDisplay
        try {
            destinationArray = destinationArray.filter((obj: any) => {
                return obj.trdDestinationId !== locationId;
            });

            destinationDisplayArray = destinationDisplayArray.filter((obj: any) => {
                return obj.locationId !== locationId;
            });

            const newState = {
                ...NewTripScreenState,
                tripDestination: destinationArray,
                tripDestinationDisplay: destinationDisplayArray
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            throw error
        }
    }

    removeClearanceStaffItem = (employeeId: any) => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState
        let clearanceStaffArray = NewTripScreenState.tripClearanceStaff
        let clearanceStaffDisplayArray = NewTripScreenState.tripClearanceStaffDisplay
        try {
            clearanceStaffArray = clearanceStaffArray.filter((obj: any) => {
                return obj.trcsEmployeeId !== employeeId;
            });

            clearanceStaffDisplayArray = clearanceStaffDisplayArray.filter((obj: any) => {
                return obj.employeeId !== employeeId;
            });

            const newState = {
                ...NewTripScreenState,
                tripClearanceStaff: clearanceStaffArray,
                tripClearanceStaffDisplay: clearanceStaffDisplayArray
            }

            dispatch({ type: "update", payload: newState })
        } catch (error) {
            throw error
        }
    }

    createTrip = () => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        const preparerId = await AsyncStorage.getItem('userId')
        const newTrip = {
            "trId": 0,
            "tvtStaId": NewTripScreenState.travelTypeSelected,
            "trTravellingDate": 1577407486, // TEMP
            "trTravelerId": "300139", // TEMP
            "trReturnDate": 1577666686, // TEMP
            "trPreparerId": "200601", // TEMP
            "trObjective": NewTripScreenState.tripObjective,
            "trFromId": NewTripScreenState.trFromId,
            "tripClearanceStaff": NewTripScreenState.tripClearanceStaff,
            "tripDestination": NewTripScreenState.tripDestination
        }

        try {
            let newTripData = await this.MyTripService.createTrip(newTrip);
            // const newState = {
            //     ...NewTripScreenState,
            //     tripClearanceStaff: tripClearanceStaff
            // }

            // dispatch({ type: "update", payload: newState })
        } catch (error) {
            throw error
        }
    }

    clearNewTripState = () => async (dispatch: any, getState: any) => {
        const NewTripScreenState = getState().NewTripScreenState;
        try {
            dispatch({ type: "default", payload: { ...NewTripScreenState } })
        } catch (error) {
            throw error
        }
    }
}

export default new NewTripScreenAction(MyTripService);