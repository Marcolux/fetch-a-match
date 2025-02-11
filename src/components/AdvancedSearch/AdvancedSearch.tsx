import { searchService } from '../../services/search_service.ts'
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../services/context/Context.tsx'
import './advanced-search.scss'

const AdvancedSearch = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error("context not valid")
    }
    
    const { 
        searchBreedFilter,
        searchZipCodesFilter,
        searchAgeMinFilter,
        searchAgeMaxFilter
    } = context 
    
    const [breedFilter, setBreedFilter] = searchBreedFilter  
    const [_zipCodeFilter, setZipCodeFilter] = searchZipCodesFilter 
    const [ageMinFilter, setAgeMinFilter] = searchAgeMinFilter 
    const [ageMaxFilter, setAgeMaxFilter] = searchAgeMaxFilter
    
    const [searchTempZip, setSearchTempZip] = useState<string[]>([])
    const [allBreads, setAllBreads] = useState<string[]>([])
    const [zipCodeFilterOn, setZipCodeFilterOn] = useState<boolean>(false)

    const fetchAllTheBreeds = async () => {
        const allTheBreads = await searchService.allBreads()
        setAllBreads(allTheBreads)
    }
    
    const filterBreed =  (breedName: string) => {
        const newFilter = [...breedFilter]
        !newFilter.includes(breedName)
            ? newFilter.push(breedName)
            : newFilter.splice(newFilter.indexOf(breedName), 1)

        setBreedFilter(newFilter)
    }

    useEffect(()=>{ fetchAllTheBreeds() },[])

    return(
        <div id="advanced_search">
            <h3><u>Filter By:</u></h3>
            <div className='inputFilters'>
                <label>ZIP Code</label>
                <div id="inputZipCode">
                    <input 
                        type='text' 
                        value={searchTempZip} 
                        onChange={(e) => {
                            setZipCodeFilterOn(false)
                            if (e.target.value.trim() !== '') {
                                setSearchTempZip(e.target.value.split(','))
                            } else {
                                setSearchTempZip([])
                            }
                        }}
                        onKeyDown={() => {
                            setZipCodeFilterOn(false)
                            setZipCodeFilter([])
                        }}
                    />
                    <div>
                        <label >Apply Zip Code Filter</label>
                        <div className="custom_chk">
                            <input 
                                type='checkbox'
                                id='zip_check'
                                checked={zipCodeFilterOn}
                                onChange={(e) => {
                                    (e.target.checked && searchTempZip.length !== 0) 
                                    ? setZipCodeFilter(searchTempZip) 
                                    : setZipCodeFilter([])
                                    setZipCodeFilterOn(prev=> {
                                        let newValue 
                                        searchTempZip.length !== 0 
                                        ? newValue = !prev
                                        : newValue = false
                                        return newValue
                                    })
                                }}
                            />
                            <label
                                tabIndex={0}
                                htmlFor='zip_check'
                            ></label>
                        </div>

                    </div>
                </div>
            </div>
            <div id='age_filters'>

                <div className='inputFilters'>
                    <label>Age Min</label>
                    <input 
                        type='text' 
                        value={ageMinFilter} 
                        onChange={(e) => {
                            setAgeMinFilter(e.target.value)
                        }}
                    />
                </div>

                <div className='inputFilters'>
                    <label>Age Max</label>
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
                                <div className="custom_chk">
                                    <input 
                                        type="checkbox" 
                                        id={`custom_chk_${i}`}
                                        onClick={() => {
                                            filterBreed(breed)
                                        }}
                                    />
                                    <label
                                        tabIndex={0}
                                        htmlFor={`custom_chk_${i}`}
                                    ></label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>  
    )
}

export default AdvancedSearch