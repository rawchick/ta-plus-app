import ProfileService, { IProfileService } from '../../services/ProfileService'

export class TripDetailScreenAction {
    private ProfileService: IProfileService
    constructor(ProfileService: IProfileService) {
        this.ProfileService = ProfileService
    }

    fetchProfileById = (employeeId: string) => async (dispatch: any, getState: any) => {
        //stackexchange User API url
        let TripDetailScreenState = getState().TripDetailScreenState;
        try {
            const result = await this.ProfileService.getProfileById(employeeId)

            const newSearchScreenState = {
                ...TripDetailScreenState,
                profileData: result,
            }

            dispatch({ type: "update", payload: TripDetailScreenState })
        } catch (err) {
            console.log('ERROR: ', err)
            dispatch({ type: "default", payload: { ...TripDetailScreenState } })
        }
    }
}

export default new TripDetailScreenAction(ProfileService);