
class CreateReducer {
    initialState: any;
    constructor(state: any) {
        this.initialState = state
    }
    reducer = (state = this.initialState, { type, payload }: { type: string, payload: any }) => {
        switch (type) {
            case "update":
                if (state.ClassName === payload.ClassName) {
                    return { ...state, ...payload }
                }
                else {
                    return state
                }
            case "default":
                if (state.ClassName === payload.ClassName) {
                    return this.initialState
                } else {
                    return state
                }
            case "clear":
                return this.initialState
            default:
                return state
        }
    }
}
export default CreateReducer