import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIAL': {
            return {...state, isInitialized: action.initial}
        }
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (initial: boolean) => ({type: 'APP/SET-INITIAL', initial} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setIsInitializedType = ReturnType<typeof setIsInitializedAC>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    debugger
    authApi.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }
    })
        .finally(() => dispatch(setIsInitializedAC(true)))
}

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setIsInitializedType