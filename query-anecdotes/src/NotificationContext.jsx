import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
	return action
}

const NotificationContext = createContext()

const initialState = ''

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value = {[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationMessage = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const setNotification = (message) => {
    return dispatch => {
        dispatch(useNotificationDispatch(message))
        setTimeout(() =>
          dispatch(useNotificationDispatch(initialState)), 5000)
    }
}

export default NotificationContext