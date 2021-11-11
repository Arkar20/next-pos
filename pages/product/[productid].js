import {Cart} from "../../context/CartContext"
import {useContext,useState} from "react"
import {Button, Grid, IconButton} from "@mui/material"
import { alpha, styled } from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from "../../components/Header"
import Image from "next/image"
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'

const ContainerDiv=styled("div")(({theme})=>({
    padding:10,
    margin:10,
    [theme.breakpoints.down('xs')]:{
        padding:5,
        margin:5
    }
}))


const ProductDetail=({product})=>{

    const [qty,setQty]=useState(0)

    const {state,dispatch}=useContext(Cart)


    const addToCart=(product)=>{
        dispatch({
            type:"ADD_TO_CART",
            payload:{...product,qty}
        })

        alert("ADDED")


    }
    const router=useRouter()
        if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
      <div>
        <Header />
        <ContainerDiv>
            <Grid container  >
                <Grid item xs={12} md={4}>
                    <Image
                        src={product.image}
                        width="400"
                        height="600"
                        />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ContainerDiv style={{margin:20}}>
                        <Typography variant="h4">{product.title}</Typography>
                        <Typography variant="h7">Category: {product.category}</Typography>
                       
                        <ContainerDiv>
                                <Typography variant="h6">Price: ${product.price}</Typography>
                        </ContainerDiv>

                          <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                   {product.description}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        <ContainerDiv>
                                <IconButton color="error">
                                     <FavoriteIcon />
                                        <Typography variant="p" style={{fontSize:17}}>{product.rating.count}</Typography>
                                 </IconButton>
                                <ContainerDiv>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography variant="h5">Quantity</Typography>
                                    </Grid>
                                    <Grid item>
                                        <input type="number" style={{width:40,height:40}} min="0" value={qty} onChange={(e)=>setQty(e.target.value)}/>
                                    </Grid>
                                 </Grid>
                             </ContainerDiv>

                        </ContainerDiv>

                            <Button variant="contained"
                                onClick={()=>addToCart(product)}
                                >Add To Cart</Button>

                    </ContainerDiv>
                </Grid>
            </Grid>
        </ContainerDiv>
        </div>
    );
}

export const getStaticProps=async (req,res)=>{
    
        const results=await fetch("https://fakestoreapi.com/products")
        const data=await results.json()
        const {productid} =req.params
         const product=data.find((product)=>{return product.id==productid})
  
     
     


    return {
        props:{product}
    }
}
export const getStaticPaths=async ()=>{
         const results=await fetch("https://fakestoreapi.com/products")
        const data=await results.json()

        const params=data.slice(0,4).map(product=>{
            return {params:{productid:product.id.toString()}}
        })

   


    return {
        paths:params,
        fallback:true
    }

}


export default ProductDetail
