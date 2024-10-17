import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi-NCR","Banglore","Gurugram","Pune","Mumbai","Bihar","Patna"]
  },
  {
    filterType:"Industry",
  array:["FrontEnd Developer",
  "BackEnd Developer",
  "Graphic Designer",
  "FullStack Developer",
  "MERN Developer",
  "UI/UX Designer",
  "System Designer",
  "Software Tester",
  "Data Scientist",
  "Machine Learning",
  "Data Analyist",
  "IT Assosiate",]
  },
  {
    filterType:"Salary",
    array:["0-2L","2L-10L","10L-30L"]
  }

]
const FilterCard = () => {
  const dispatch= useDispatch()
  const [selectedValue, setSelectedValue]= useState('');
  const changeHandler=(value)=> {
    setSelectedValue(value);
  }
  useEffect(()=>{

dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div className='border bg-gray-50 border-violet-200 rounded-md shadow-lg pl-2 pr-2 '>
<h1 className='font-bold text-2xl'>Filter<span className='font-bold text-2xl text-red-700'>Jobs</span></h1>
{/* for horizental line */}
<hr className='mt-3'/>
<RadioGroup value={selectedValue} onValueChange={changeHandler}>
  {
    filterData.map((data, index)=>(
      <div className=''>
        <h1 className='font-semibold text-lg'>{data.filterType}</h1>
        {
          data.array.map((item, idx)=>{
            const itemId= `id${index}-${idx}`
            return (
              <div className='flex items-center space-x-2 my-2 text-gray-600'>
                <RadioGroupItem value={item} id={itemId}/>
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            )
          })
        }
      </div>
    ))
  }
</RadioGroup>

    </div>
  )
}

export default FilterCard