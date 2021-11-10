import {useCallback, useEffect, useState} from "react"
import Header from "../components/Header";
import Products from "../components/Products"


export const getStaticProps=async ()=>{
  const response=await fetch('https://fakestoreapi.com/products')
  const  data=await response.json()
      
  return{
    props:{products:data}
  }
}


const Home = (props) => {

  const [text, setText] = useState("")  
  const [filterdata, setFilterdata] = useState([])
  

  useEffect(() => {
    console.log(text)
    setFilterdata(()=>props.products.filter(item=>item.title.includes(text)))
  
  },[text,setText])

  useEffect(()=>{
        setFilterdata(props.products)
        
  },[])
  return ( <div>
               <Header />
                 <Products data={props.products}/>
         </div> );
}
 
export default Home;