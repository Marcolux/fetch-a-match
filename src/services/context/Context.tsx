import React, { useState, createContext, ReactNode } from "react"


interface MyContextType {
    searchResultsList: [string[], React.Dispatch<React.SetStateAction<string[]>>];
    searchBreedFilter: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}

const Context = createContext<MyContextType | undefined>(undefined)

const Provider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [ searchList, setSearchList] = useState<string[]>([])
  const [ breedFilter, setBreedFilter] = useState<string[]>([])

  const state: MyContextType = {
    searchResultsList: [searchList, setSearchList],
    searchBreedFilter: [ breedFilter, setBreedFilter] 
  }

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }





