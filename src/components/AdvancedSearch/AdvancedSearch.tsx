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

    const { searchZipCodesFilter } = context
    const [zipCodeFilter, setZipCodeFilter] = searchZipCodesFilter

    const { searchAgeMinFilter} = context
    const [ageMinFilter, setAgeMinFilter] = searchAgeMinFilter

    const { searchAgeMaxFilter} = context
    const [ageMaxFilter, setAgeMaxFilter] = searchAgeMaxFilter

    const [allBreads, setAllBreads] = useState<string[]>([])

    const fetchAllTheBreeds = async () => {
        const allTheBreads = await searchService.allBreads()
        setAllBreads(allTheBreads)
    }
    
    const filterBreed =  (breedName: string) => {
        const newFilter = [...breedFilter]
        !newFilter.includes(breedName)
            ? newFilter.push(breedName)
            : newFilter.splice(newFilter.indexOf(breedName), 1)
        
        // const newResults = await searchService.allDogsAvailable({
        //     breeds : breedFilter,
        //     zipCodes: zipCodeFilter,
        //     ageMin: ageMinFilter ,
        //     ageMax: ageMaxFilter,
        // })
        // const newSearcList = newResults.resultIds
        // setSearchList(newSearcList)
        setBreedFilter(newFilter)
    }

    const applyFilters =  async () => {
        const newResults = await searchService.allDogsAvailable({
            breeds : breedFilter,
            zipCodes: zipCodeFilter,
            ageMin: ageMinFilter ,
            ageMax: ageMaxFilter,
        })
        console.log(breedFilter,zipCodeFilter)
        const newSearcList = newResults.resultIds
        setSearchList(newSearcList)
    }

    useEffect(()=>{
       fetchAllTheBreeds()
    },[])

    return(
        
            <div id="advanced_search">
                <button onClick={() =>{applyFilters()}}>Apply Filters</button>
                <div className='inputFilters'>
                    <label>ZIP Code</label>
                    <div id="inputZipCode">
                        <input 
                            type='text' 
                            value={zipCodeFilter.join(',').toString()} 
                            onChange={(e) => {
                                setZipCodeFilter(e.target.value.split(','))
                            }}
                        />
                    </div>
                </div>
                <div className='inputFilters'>
                    <label>Age Min</label>
                    <div id="inputZipCode">
                        <input 
                            type='text' 
                            value={ageMinFilter} 
                            onChange={(e) => {
                                setAgeMinFilter(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className='inputFilters'>
                    <label>Age Max</label>
                    <div id="inputZipCode">
                        <input 
                            type='text' 
                            value={ageMaxFilter} 
                            onChange={(e) => {
                                setAgeMaxFilter(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div id='breeds'>
                    <label>Breeds</label>
                    <div id="breed-options">
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
            </div>
        
    )
}

export default AdvancedSearch