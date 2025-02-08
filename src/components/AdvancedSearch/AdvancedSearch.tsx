import { searchService } from '../../services/search_service.ts'
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../services/context/Context.tsx'
import './advanced-search.scss'

const AdvancedSearch = () => {
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const [searchResults, setSearchResults] = useState<string[]>([])

    const { searchResultsList } = context
    const [ searchList, setSearchList] = searchResultsList

    const { searchBreedFilter } = context
    const [  breedFilter, setBreedFilter] = searchBreedFilter

    const [allBreads, setAllBreads] = useState<string[]>([])

    const fetchAllTheBreeds = async () => {
        const allTheBreads = await searchService.allBreads()
        setAllBreads(allTheBreads)
    }
    
    const filterBreed = async (breedName: string) => {
        const newFilter = [...breedFilter]
        !newFilter.includes(breedName)
            ? newFilter.push(breedName)
            : newFilter.splice(newFilter.indexOf(breedName), 1)
        
        const newResults = await searchService.allDogsAvailable({
            breeds : newFilter,
            zipCodes: [],
            ageMin: '' ,
            ageMax: '',
        })
        const newSearcList = newResults.resultIds
        setSearchList(newSearcList)
        setBreedFilter(newFilter)
    }

    useEffect(()=>{
       fetchAllTheBreeds()
    },[])

    return(
        <>
            <div id="advanced_search">
                <p>Breeds</p>
                <div id="breeds-box">
                    {allBreads.map((breed , i)=>{

                        return(
                            <div className='labelCheck' key={i}>

                                <label >{breed}</label>
                                <input type="checkbox" onClick={() => {
                                    filterBreed(breed)
                                }}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AdvancedSearch