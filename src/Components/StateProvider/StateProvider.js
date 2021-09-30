import { createContext, useContext, useReducer } from "react"

// Create Context
const StateContext = createContext()

// Context Value Sate And Share
export const ContextProvider = ({reducer, initialState, children}) => {
    return <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
}

// Use Context
export const useStateValue = () => useContext(StateContext)