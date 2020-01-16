import service, { IMyTripService } from '../../services/MyTripService'

export class HomeScreenAction {
    private service: IMyTripService;
    constructor(service: IMyTripService) {
        this.service = service;
    }

    fetchUser = () => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        let HomeScreenState = getState().HomeScreenState;
        dispatch({ type: "update", payload: { ...HomeScreenState, loading: true, isRefreshing: true } })
        try {
            const results = await this.service.searchTrip("", "A", 0, 5);

            const newHomeScreenState = {
                ...HomeScreenState,
                loading: false,
                isRefreshing: false,
                tripData: results,
                offset: 5
            }

            dispatch({ type: "update", payload: newHomeScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "clear", payload: { ...HomeScreenState } })
        }
    }

    loadMoreUser = () => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        const HomeScreenState = getState().HomeScreenState;
        let { offset, limit, tripData } = HomeScreenState
        offset = parseInt(offset) + parseInt(limit)
        try {
            dispatch({ type: "update", payload: { ...HomeScreenState, loading: true } })
            const results = await this.service.searchTrip("", "A", offset, parseInt(limit));
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
}

export default new HomeScreenAction(service);