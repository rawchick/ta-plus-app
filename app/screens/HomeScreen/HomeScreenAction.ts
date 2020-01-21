import myTripService, { IMyTripService } from '../../services/MyTripService'
import dropdownService, { IDropdownService } from '../../services/DropdownService'
import { Alert } from 'react-native'

export class HomeScreenAction {
    private myTripService: IMyTripService
    private dropdownService: IDropdownService
    constructor(myTripService: IMyTripService, dropdownService: IDropdownService) {
        this.myTripService = myTripService
        this.dropdownService = dropdownService
    }

    fetchTrip = (keyword: any, status: string) => async (dispatch: any, getState: any) => {
        let HomeScreenState = getState().HomeScreenState;
        dispatch({ type: "update", payload: { ...HomeScreenState, tripData: [], loading: true, isRefreshing: true } })
        try {
            const results = await this.myTripService.searchTrip(keyword, status, 0, 10)
            const total = await this.myTripService.getTripTotal(keyword, status, 0, 10)
            const newHomeScreenState = {
                ...HomeScreenState,
                loading: false,
                isRefreshing: false,
                tripData: results,
                offset: 10,
                tripDataTotal: total
            }

            Alert.alert(
                'Alert Title',
                JSON.stringify(results),
                [
                    { text: 'ERROR', onPress: () => console.log('Ask me later pressed') },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );

            dispatch({ type: "update", payload: newHomeScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            throw (err)
            dispatch({ type: "default", payload: { ...HomeScreenState } })
        }
    }

    loadMoreTrip = (keyword: any, status: string) => async (dispatch: any, getState: any) => {
        const HomeScreenState = getState().HomeScreenState;
        let { offset, limit, tripData } = HomeScreenState
        offset = parseInt(offset) + parseInt(limit)
        try {
            dispatch({ type: "update", payload: { ...HomeScreenState, loading: true } })
            const results = await this.myTripService.searchTrip(keyword, status, offset, parseInt(limit))
            tripData = tripData.concat(results) //concate list with response

            const newHomeScreenState = {
                ...HomeScreenState,
                loading: false,
                tripData: tripData,
                offset: offset
            }

            dispatch({ type: "update", payload: newHomeScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "clear", payload: { ...HomeScreenState } })
        }
    }

    fetchTripStatus = () => async (dispatch: any, getState: any) => {
        const HomeScreenState = getState().HomeScreenState;
        try {
            const results = await this.dropdownService.getTripStatus()

            const newHomeScreenState = {
                ...HomeScreenState,
                tripStatus: results
            }

            dispatch({ type: "update", payload: newHomeScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "clear", payload: { ...HomeScreenState } })
        }
    }
}

export default new HomeScreenAction(myTripService, dropdownService);