import { createContext , useEffect, useState} from "react";

export let ProductsContext =  createContext([]);

export default function ProductsContextProvider({children}){

    return <ProductsContext.Provider value={{products , setProducts}}>
        {children}
    </ProductsContext.Provider>
}