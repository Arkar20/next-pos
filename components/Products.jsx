import { Grid } from "@mui/material";
import ProductSingleCard from "./ProductSingleCard";
import useMediaQuery from '@mui/material/useMediaQuery';

const Products = ({data}) => {

      const matches = useMediaQuery('(min-width:600px)');

    return (  
        <div>
            <Grid container style={{padding:40}} spacing={3} justifyContent={matches?'start':"center"}>
                 { data.map((item,index)=>(
                    <Grid key={index+1} item lg={3} md={4} sm={6}>
                     <ProductSingleCard  data={item}/>
                    </Grid>
                 ))
      }
              </Grid>
        </div>
    );
}
 
export default Products;
<div>
</div>