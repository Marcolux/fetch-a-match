import React, { useState, createContext, ReactNode } from "react"


interface MyContextType {
  searchResultsList: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  searchBreedFilter: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  searchZipCodesFilter: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  searchAgeMinFilter: [string, React.Dispatch<React.SetStateAction<string>>];
  searchAgeMaxFilter: [string, React.Dispatch<React.SetStateAction<string>>];
  savFavsFriendsList: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}


const Context = createContext<MyContextType | undefined>(undefined)

const Provider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [searchList, setSearchList] = useState<string[]>([])
  const [breedFilter, setBreedFilter] = useState<string[]>([])
  const [zipCodeFilter, setZipCodeFilter] = useState<string[]>([])
  const [ageMinFilter, setAgeMinFilter] = useState<string>('')
  const [ageMaxFilter, setAgeMaxFilter] = useState<string>('')
  const [favsFriendsList, setFavsFriendsList] = useState<string[]>([])

  const state: MyContextType = {
    searchResultsList: [searchList, setSearchList],
    searchBreedFilter: [breedFilter, setBreedFilter],
    searchZipCodesFilter: [zipCodeFilter, setZipCodeFilter],
    searchAgeMinFilter: [ageMinFilter, setAgeMinFilter],
    searchAgeMaxFilter: [ageMaxFilter, setAgeMaxFilter],
    savFavsFriendsList: [favsFriendsList, setFavsFriendsList],
  }

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }





