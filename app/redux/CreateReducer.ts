class CreateReducer {
    initialState : any;
    constructor(state : any) {
      this.initialState = state
    }
    reducer = (state = this.initialState  , { type , payload } : {type : string, payload : any}) =>
    {
        switch (type) {
            case "update":
                return { ...state, ...payload }
            case "clear":
                return {}
            default:
                return state
        }
        return state
    }
  }
export default CreateReducer