import { alpha, styled } from '@mui/material/styles';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import Image from "next/image"
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InputBase from "@mui/material/InputBase";
import Link from "../src/Link"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useState} from "react"
import {Badge} from "@mui/material"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const HeaderMargin=styled('div')(({theme})=>({
     ...theme.mixins.toolbar,
   [theme.breakpoints.down("md")]: {
       marginBottom: "1em",
    },
    [theme.breakpoints.down("sm")]: {
       marginBottom: "0em",
    },
}))


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': { 
    padding: theme.spacing(1, 1, 1, 0),

    // // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
       width: '6em',
      '&:focus': {
        width: '12em',
      },
    [theme.breakpoints.down('sm')]: {
        width: '4em',
          '&:focus': {
            width: '8em',
          },
     
    },
  },
}));

const list= (
          <Box
                role="presentation"
                // onClick={()=>toggleDrawer(anchor, false)}
                // onKeyDown={()=toggleDrawer(anchor, false)}
              >
                <List disablePadding={true} style={{width:"20em"}}>
                  {['Home', 'About'].map((text, index) => (
                    <ListItem button key={text} style={{padding:'20px',justifyContent:'center'}} component={Link} href={`\${text}`}>
                      <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                {/* <Divider /> */}
          </Box>

)
function HideOnScroll(props) {

const { children, window } = props;
// Note that you normally won't need to set the window ref as useScrollTrigger
// will default to window.
// This is only being set here because the demo is in an iframe.
const trigger = useScrollTrigger({
  target: window ? window() : undefined,
});
  
  console.log(trigger)
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const Header = (props) => {
   const [state, setState] = useState({
     right:false,
     left:false
   })

    const toggleDrawer = (drawerposition) => {
      
        setState(state=>{
          if(drawerposition=='left')
          {
            return {left:true,right:false}
          }
          else{
            return {right:true,true:false}

          }
        })
  };

  const closeDrawer=()=>{
    setState(()=>({ left:false,
     right:false}))
  }
   

  return(<div>
    <Box sx={{ flexGrow: 1 }}>
         <HideOnScroll {...props}>

            <AppBar >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={()=>toggleDrawer('left')}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  // sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                Arkar
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
          </Search>
          
                 <IconButton
                      size="medium"
                      color="inherit"
                      aria-label="menu"
                      sx={{ padding: 2 }}
                      onClick={()=>toggleDrawer()}
                 >
                   <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                  </Badge>

         </IconButton>
              </Toolbar>
            </AppBar>
       </HideOnScroll>
    </Box>
    {/* <Image src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=180"
           alt="Some title" 
           width={1600} 
           height={800}
           responsive={true}
       /> */}
           <SwipeableDrawer
              anchor='left'
              open={state.left}
              onClose={()=>closeDrawer()}
              onOpen={()=>toggleDrawer('left')}
          >
               {list}
         </SwipeableDrawer>


           <SwipeableDrawer
              anchor='right'
              open={state.right}
              onClose={()=>closeDrawer()}
              onOpen={()=>toggleDrawer('right')}
          >
        <Typography variant="h5" style={{padding:10}}>Shopping Cart</Typography>
      <List sx={{ width: '20em', maxWidth: 360, bgcolor: 'background.paper',margin:0}}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                 <DeleteIcon color="error"/>
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined}  dense>
              <ListItemIcon>
                {
                   <img
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    alt="img itlte"
                    loading="lazy"
                    width="40"
                  />
                }
              </ListItemIcon>
              <ListItemText id={labelId} primary="Adidas" secondary="Qty x 3" />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    <div style={{width:"100%",display:'flex',justifyContent:'center'}}>
        <Button variant="contained" endIcon={<SendIcon />}>
              Checkout
      </Button>
      </div>
         </SwipeableDrawer>
       <HeaderMargin />
    </div>
    );
};

export default Header;
