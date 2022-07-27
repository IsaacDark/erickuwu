import React, { useState, useEffect} from 'react';
import { PDFDownloadLink} from "@react-pdf/renderer";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import "./style.css";
import FAQ from './FAQ'
import PDFMedicinas from './PDFMedicinas';
const animatedComponents = makeAnimated();


var object = []

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [enfermedades, setEnfermedades] = useState([])
  const [medicinas, setMedicinas] = useState([])

  useEffect( ()=> {
    getSintomas()
      return () => {
        object = []
      }
  },[])

  const getSintomas = async () => {
    const sintomas = await axios.get('http://127.0.0.1:8080/sintomas')
    const data = sintomas.data

    

    for(let i = 0; i < data.length; i++){
        const ob = {}

        ob.value = data[i]
        ob.label = data[i]
        object.push(ob)
    }

    //console.log(object)
}

  const handleSelect = () => {
    console.log(selectedOptions);
  };

  const getEnfermedad = async () => {
    handleSelect()
    setMedicinas([])
    setEnfermedades([])
    var o = []

    for(var i = 0; i < selectedOptions.length; i++){
      const d = selectedOptions[i].value
      const enfermedad = await axios.get(`http://127.0.0.1:8080/enfermedades/${d}`)
      
      const data = enfermedad.data

      for(var x = 0; x < data.length; x++){
        o.push(data[x])
      }

    }

    let result = o.filter((item,index)=>{
      return o.indexOf(item) === index;
    })

    setEnfermedades(result)

    console.log(result)
    getMedicina(result)

  }

  const getMedicina = async (enfermedades) => {
    var o = []
    var ob = []
    for(var i = 0; i < enfermedades.length; i++){
      const d = enfermedades[i]
      const medicina = await axios.get(`http://127.0.0.1:8080/medicinas/${d}`)
      
      const data = medicina.data

      const sintomas = await axios.get(`http://127.0.0.1:8080/sintomas/${d}`)

      const data1 = sintomas.data

      //console.log(`--------------------------------- ${i} ----------------- ${d}`)
      
      

      for(var x = 0; x < data.length; x++){
        o.push(data[x])
       
      }

      var xd = {
        enfermedad : d,
        medicinas : o,
        sintomas: data1,
        open: false
      }

      var uwu = 0;

      for(var y = 0; y < xd.sintomas.length; y++){
        

        for(var x = 0; x < selectedOptions.length; x++){
          if(xd.sintomas[y] === selectedOptions[x].value){
            uwu++;
          }
          //console.log(`${xd.sintomas[y]} ----- ${selectedOptions[x].value}`)
        }

        

      }

      if(uwu === selectedOptions.length){
        ob.push(xd)
        console.log(xd)
      }  
      o = []

    }
    //console.log(o)
    setMedicinas(ob)
    console.log(ob)
  }

  const toggleFAQ = index => {
    setMedicinas(medicinas.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      //console.log(enfermedades)

      return faq;
    }))
  }

 
  return (
    <>
      <Select
        components={animatedComponents}
        isMulti
        options={object}
        onChange={(item) => setSelectedOptions(item)}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
        placeholder="Selecciona un sintoma"
        closeMenuOnSelect={false}
        noOptionsMessage={() => 'No hay más sintomas :)'}
      />

      <button disabled={selectedOptions.length > 0 ? false : true} onClick={getEnfermedad}>Buscar</button>
      
      <PDFDownloadLink
        document={<PDFMedicinas medicinas={medicinas}/>}
        fileName="receta.pdf"
      >
        <button disabled={selectedOptions.length > 0 ? false : true}>Descargar PDF</button>
      </PDFDownloadLink>

      <div className="App">
        <div className="faqs">
          {medicinas.length > 0 ? 
            medicinas.map((faq, i) => (
              <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))  
            : <h1>Seleccione un sintoma</h1>
          } 
        </div>
      </div>

    </>
  )
}
export default MultiSelect