import { createContext, useContext, useReducer } from "react";
import appReducer from "./app-reducer";

const AppContext = createContext();
const initialState = {
    language: localStorage.getItem('language') || 'fa'
};

const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(appReducer, initialState);

    const changeLanguage = (language)=>{
        dispatch({type: 'CHANGE_LANGUAGE', payload: language})
    }

    return <AppProvider value= {{...state, changeLanguage}}>
        {children}
    </AppProvider>
}

const useAppContext = ()=>{
    return useContext(AppContext);
}

export {useAppContext, AppProvider}