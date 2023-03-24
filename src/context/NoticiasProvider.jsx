import React from 'react'
import axios from 'axios'
import { useState, useEffect, createContext } from 'react'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {
   const [categoria, setCategoria] = useState('general')
   const [noticias, setNoticias] = useState([])
   const [pagina, setPagina] = useState(1)
   const [totalNoticias, setTotalNoticias] = useState(0) //pra almacenar cuantas noticias ha encontrado y cuantas paginas vamos a crear

   useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=au&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

      const { data } = await axios(url)
      // console.log(data)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
      setPagina(1)
    }

    consultarAPI()
   },[categoria]) // Cada vez q cambie q haga una consulta

   useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=au&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

      const { data } = await axios(url)
        // console.log(data)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
    }

    consultarAPI()
   },[pagina])

   const handleChangeCategoria = e => {
    setCategoria(e.target.value)
   }

   const handleChangePagina = (e, valor) => {
    // console.log(valor)
    setPagina(valor)
   }

  return(
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina
      }}
    >
      {children}
    </NoticiasContext.Provider>
  )
}

export {
  NoticiasProvider
}

export default NoticiasContext