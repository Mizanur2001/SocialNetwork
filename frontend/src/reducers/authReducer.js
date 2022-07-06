const authReducer = (state = { authData: null, loding: false, error: false }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loding: true, error: false }
        case "AUTH_SUCCESS":
            console.log(action.data.credentials)
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loding: false, error: false }
        case "AUTH_FAIL":
            return { ...state, loding: false, error: true }
        default:
            return state
    }
}

export default authReducer