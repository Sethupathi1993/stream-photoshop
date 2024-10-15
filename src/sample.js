import {useState} from 'react'
import SidebarItem from './Componets/SidebarItem';


import './App.css';
import Slider from './Componets/Slider';

const DEFAULT_OPTION=[
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },
  {
    name:"Saturation",
    property:"saturate",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },
  {
    name:"Grayscale",
    property:"grascale",
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:"%"
  },
  {
    name:"Sepia",
    property:"sepia",
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:"%"
  },
  {
    name:"Hue Rotate",
    property:"hue-rotate",
    value:0,
    range:{
      min:0,
      max:360
    },
    unit:"deg"
  },
  {
    name:"Blur",
    property:"blur",
    value:0,
    range:{
      min:0,
      max:20
    },
    unit:"px"
  },
 ]


function App() {
 const [image, setImage] = useState(null)
 const [options, setOptions]= useState(DEFAULT_OPTION)
 const [selectedIndex, setSelectedIndex]= useState(0)

 const selectedOption=options[selectedIndex]

 
 const handleChange = (event) =>{
  console.log(event.target.files[0])
  const objectUrl = URL.createObjectURL(event.target.files[0]); 
  setImage(objectUrl)

 }
 const applyFilters = () =>{
  const filters=options.map((option) =>{
    return ${option.property} (${option.value}${option.unit})
  })

  return{
    filter: filters.join(" "),
  backgroundImage : url(${image})
  }
 }

 const sliderchange = ({target}) =>{
  setOptions((prevOptions)=>{
    return prevOptions.map((option, index)=>{
      if(index !== selectedIndex) return option; 
      return{ ...option, value:target.value }; 
    } )
  })

 }



  return (
    <div className="container">
      {image ? (
        <div className="main-image" id ="image" style={applyFilters ()}></div>
      ) : (<div className='upload-image'>
        <h1>Photoshop Editors</h1>
        <input type="file" accept='image/*' onChange={handleChange}/> 

      </div>)}
      <div className='sidebar'>
       {options.map((option, index) =>{
        return(
          <SidebarItem key={index}
           name={option.name} 
           active={index===selectedIndex} 
           handleClick={()=> setSelectedIndex(index)}/>
        )
       })}
      </div>
      <Slider min={selectedOption.range.min} 
      max={selectedOption.range.max}
      value={selectedOption.value}
      handleChange ={sliderchange}
      />

    </div>
  );
}

export default App;