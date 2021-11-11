
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from "next/image"
import Link from "../src/Link"

const ProductSingleCard = ({data}) => {
    return (
      <Card >
        <CardActionArea
          component={Link}
          href={"/product/"+data.id}
        >
          <CardMedia
            width="100"
            height="350"
            alt="green iguana"
          >
          <Image
                width={300}
                height={300}
                src={data.image}
                objectFit="contain"
                /> 
              </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data.title}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              ${data.price}
            </Typography>
          </CardContent>
        </CardActionArea> 
      </Card>
    );
}
 
export default ProductSingleCard;