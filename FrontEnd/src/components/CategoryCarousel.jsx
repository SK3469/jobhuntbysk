import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

// Creating array...
const category = [
  "FrontEnd Developer",
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
  "IT Assosiate",
]
const CategoryCarousel = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const searchJobHandler=(query)=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
      }
      return(
    <div>
      <Carousel className=" w-full mx-auto max-w-xl my-20">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem className=" md:basis-1/2 lg:basis-1/3  ">
                <Button onClick={()=>searchJobHandler(cat)} className=" rounded-full bg-violet-800">{cat}</Button> 
              </CarouselItem>
            ))
          }


        </CarouselContent>
        <CarouselPrevious/>
<CarouselNext/>
      </Carousel>
    </div>
    )
}

export default CategoryCarousel