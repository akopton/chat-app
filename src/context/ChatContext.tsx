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

type TState = {
  chatId: string
  user: TUserInfo
}

type TAction = {
  type: "CHANGE_USER"
  payload: TUserInfo
}

export const ChatContext = createContext({
  state: {} as TState,
  dispatch: {} as Dispatch<TAction>,
})
export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useContext(AuthContext)
  const initialState = {
    chatId: "",
    user: {} as TUserInfo,
  }

  const chatReducer = (state: TState, action: TAction) => {
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
