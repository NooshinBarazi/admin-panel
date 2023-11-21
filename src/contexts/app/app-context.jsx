import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";
import { useTranslation } from "react-i18next";

const AppContext = createContext();
const initialState = {
    language: localStorage.getItem('language') || 'fa',
    theme: localStorage.getItem('theme') || 'light',
};

const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(appReducer, initialState);
    const {i18n} = useTranslation();

    const changeLanguage = (language)=>{
        dispatch({type: 'CHANGE_LANGUAGE', payload: language})
    }

    const changeTheme = (theme)=>{
        dispatch({type: 'CHANGE_THEME', payload: theme})
    }

    useEffect(()=>{
        i18n.changeLanguage(state.language);
        localStorage.setItem('language', state.language);
        document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
    },[state.language])

    useEffect(()=>{
        localStorage.setItem('theme', state.theme);
    }, [state.theme])


    return <AppContext.Provider value= {{...state, changeLanguage, changeTheme}}>
        {children}
    </AppContext.Provider>
}

const useAppContext = ()=>{
    return useContext(AppContext);
}

export {useAppContext, AppProvider}