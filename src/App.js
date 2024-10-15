import { useState } from 'react';
import SidebarItem from './Componets/SidebarItem';
import './App.css';
import Slider from './Componets/Slider';
import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs'


const DEFAULT_OPTION = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
];

function App() {
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(DEFAULT_OPTION);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedOption = options[selectedIndex];

  const handleChange = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  const applyFilters = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return {
      filter: filters.join(' ')
    };
  };


  const sliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) return option;
        return { ...option, value: target.value };
      });
    });
  };
  const downloadimage = () =>{
    htmlToImage.toPng(document.getElementById("image")).then((dataUrl)=>{
      download(dataUrl,`${Date.now()}.png`);
    })
  }
const resetdefault= () =>{
  setOptions(DEFAULT_OPTION)
}
  return (
    <div className="container">
      {image ? (
        <div  className="main-image">
          <img  src={image} alt="Selected"  id="image" style={applyFilters()} />
        </div>
      ) : (
        <div className="upload-image">
          <h1>Photoshop Editor</h1>
          <input type="file" accept="image/*" onChange={handleChange} />
        </div>
      )}
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedIndex}
              handleClick={() => setSelectedIndex(index)}
            />
          );
        })}
        <button  onClick={resetdefault} className='reset' >Reset</button>
        <button onClick={downloadimage} className='download'>Download</button>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={sliderChange}
      />
    </div>
  );
}

export default App;
