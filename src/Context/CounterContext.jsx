import { createContext , useState} from "react";

export let CounterContext =  createContext(0);

export default function CounterContextProvider(props){

const [count, setCount] = useState(0)

function changeCounter(){
    setCount(Math.random)
}

    return <CounterContext.Provider value={{count , changeCounter,setCount}}>
        {props.children}
    </CounterContext.Provider>
}