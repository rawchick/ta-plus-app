import ProfileService, { IProfileService } from '../../services/ProfileService'
import PlaceService, { IPlaceService } from '../../services/PlaceService'

export class SearchScreenAction {
    private ProfileService: IProfileService;
    private PlaceService: IPlaceService;
    constructor(ProfileService: IProfileService, PlaceService: IPlaceService) {
        this.ProfileService = ProfileService;
        this.PlaceService = PlaceService;
    }

    fetchUser = (keyword: any) => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        let SearchScreenState = getState().SearchScreenState;
        dispatch({ type: "update", payload: { ...SearchScreenState, loading: true, isRefreshing: true } })
        try {
            const results = await this.ProfileService.searchProfile(keyword, 0, 10);

            const newSearchScreenState = {
                ...SearchScreenState,
                loading: false,
                isRefreshing: false,
                listData: results,
                offset: 10
            }

            dispatch({ type: "update", payload: newSearchScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "clear", payload: { ...SearchScreenState } })
        }
    }

    fetchPlace = (keyword: any) => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        let SearchScreenState = getState().SearchScreenState;
        dispatch({ type: "update", payload: { ...SearchScreenState, loading: true, isRefreshing: true } })
        try {
            const results = await this.PlaceService.searchPlace(keyword, 0, 10);
            const newSearchScreenState = {
                ...SearchScreenState,
                loading: false,
                isRefreshing: false,
                listData: results,
                offset: 10
            }

            dispatch({ type: "update", payload: newSearchScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "clear", payload: { ...SearchScreenState } })
        }
    }

    clearList = () => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        let SearchScreenState = getState().SearchScreenState;
        try {
            const newSearchScreenState = {
                ...SearchScreenState,
                listData: []
            }

            dispatch({ type: "update", payload: newSearchScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "default", payload: {} })
        }
    }
}

export default new SearchScreenAction(ProfileService, PlaceService);