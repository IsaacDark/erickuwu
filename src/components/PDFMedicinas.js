import React from 'react'
import { Document, Page, Text, Font, StyleSheet } from "@react-pdf/renderer"

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'Oswald',
    textAlign: 'center',
  },
  text: {
    marginBottom: 6,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
const PDFMedicinas = ({medicinas}) => {
    
  return (
    
    <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ SE Enfermedades UNEDL ~
      </Text>
      <Text style={styles.title}>Sistema experto de enfermedades</Text>
      <Text style={styles.author}>Expediente de análisis para receta</Text>
      
      {medicinas.map(medicina => (
        <>
          <Text style={styles.subtitle}>
				    {medicina.enfermedad}
			    </Text>
          
          {medicina.medicinas.length > 0 ? 
            medicina.medicinas.map(medicina => (
              <Text style={styles.text}>{medicina}</Text>
            ))
            :
            <Text style={styles.text}>Esta enfermedad no cuenta con medicamentos</Text>
          }
          
        </>
        )) 
      }
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
    
  );

   

}

export default PDFMedicinas