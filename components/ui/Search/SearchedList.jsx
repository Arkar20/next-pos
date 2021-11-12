import {useEffect, useState} from "react"
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Link from "../../../src/Link";
import Image from "next/image"
const SearchedListContainer=styled("div")(({theme})=>({
    position:"absolute",
    background:'black',
    width:"100%"
}))

const SearchedList=({searchkeyword})=>{

    const [data,setData]=useState([])
    const [searchedData,setSearchedData]=useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
            .then((data) => {
                setData(data)
            });
         
    },[])


    useEffect(() => {
        setSearchedData(() =>
          data.filter((item) =>
           {  
              return  item.title.toLowerCase().includes(searchkeyword.toString().toLowerCase());
          }
          )
        );
    },[data,setData,searchkeyword])



    return (
      <SearchedListContainer>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {searchedData.length === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          {searchedData.slice(0, 10).map((data) => (
            <>
              <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton
                  dense
                  component={Link}
                  href={"/product/" + data.id}
                >
                  <ListItemAvatar>
                    <Image src={data.image} width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {data.title}
                        </Typography>
                      </>
                    }
                    secondary={data.description.slice(0, 20) + "..."}
                  />
                </ListItemButton>
              </ListItem>

              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </SearchedListContainer>
    );
}

export default SearchedList;
