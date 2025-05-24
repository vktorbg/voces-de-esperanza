import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query DevocionalDelDia {
    allGoogleSpreadsheetHoja1 {
      nodes {
        fecha
        titulo
        contenido
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const hoy = new Date().toISOString().split("T")[0] // YYYY-MM-DD
  const devocional = data.allGoogleSpreadsheetHoja1.nodes.find(d => d.fecha === hoy)

  return (
    <main className="p-4 font-sans">
      {devocional ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{devocional.titulo}</h1>
          <p>{devocional.contenido}</p>
        </>
      ) : (
        <p>No hay devocional para hoy.</p>
      )}
    </main>
  )
}

export default IndexPage
