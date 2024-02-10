import { createContext } from "react";

export const State = createContext()
export const url = ''
export const img_url = ''
export const video_url = ''

export const StatePriveder = ({ children }) => {

    const data = {}

    return <State.Provider value={data}>{children}</State.Provider>
}