"use client"
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react"
import { AuthContext } from "./AuthContext"
import { TUserInfo } from "@/types/TUserInfo"

type TState<T> = {
  chatId: string
  user: T
}

type TAction<T> = {
  type: "CHANGE_USER"
  payload: T
}

export const ChatContext = createContext({
  state: {} as TState<TUserInfo>,
  dispatch: {} as Dispatch<TAction<TUserInfo>>,
})
export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useContext(AuthContext)
  const initialState = {
    chatId: "",
    user: {} as TUserInfo,
  }

  const chatReducer = (
    state: TState<TUserInfo>,
    action: TAction<TUserInfo>
  ) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
