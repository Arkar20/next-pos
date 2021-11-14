import {useSession} from "next-auth/react"
import { alpha, styled } from '@mui/material/styles';
import {useContext, useMemo} from "react"
import Image from "next/image"
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from "@mui/material/AppBar";
import {Badge} from "@mui/material"
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import {Cart} from "../context/CartContext"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InputBase from "@mui/material/InputBase";
import Link from "../src/Link"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import SearchProducts from "./ui/Search/SearchProducts"
import SendIcon from '@mui/icons-material/Send';
import ShoppingCart from "./ui/ShoppingCart"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slide from '@mui/material/Slide';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {useState} from "react"
import Avatar from '@mui/material/Avatar';

const HeaderMargin=styled('div')(({theme})=>({
     ...theme.mixins.toolbar,
   [theme.breakpoints.down("md")]: {
       marginBottom: "1em",
    },
    [theme.breakpoints.down("sm")]: {
       marginBottom: "0em",
    },
}))


function HideOnScroll(props) {

const { children, window } = props;



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
    
  const usersession= useSession();
    console.log(usersession);


const list= (
          <Box
                role="presentation"
                // onClick={()=>toggleDrawer(anchor, false)}
                // onKeyDown={()=toggleDrawer(anchor, false)}
              >
                <List disablePadding={true} style={{width:"20em"}}>
                    <ListItem button  style={{padding:'20px',justifyContent:'center'}} component={Link} href="/Home">
                      <ListItemIcon>
                          <InboxIcon /> 
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button  style={{padding:'20px',justifyContent:'center'}} component={Link} href="/about">
                      <ListItemIcon>
                          <MailIcon /> 
                      </ListItemIcon>
                      <ListItemText primary="About" />
                    </ListItem>
                    {
                      !usersession.data && (
                            <ListItem button  style={{padding:'20px',justifyContent:'center'}} component={Link} href="/auth/signin">
                              <ListItemIcon>
                                  <LockOpenIcon /> 
                              </ListItemIcon>
                               <ListItemText primary="Sign In" />
                            </ListItem>
                      )
                    }
                    {
                      usersession.data && (
                            <ListItem button  style={{padding:'20px',justifyContent:'center'}} component={Link} href="/api/auth/signout">
                              <ListItemIcon>
                                  <LockOpenIcon color="error"/> 
                              </ListItemIcon>
                               <ListItemText primary="Sign Out" style={{color:"red"}}/>
                            </ListItem>
                      )
                    }
                  
                </List>
                {/* <Divider /> */}
          </Box>

)

  const data =useContext(Cart)
  // const cart={state}
  const totalcartitems=useMemo(()=>data.state.reduce((total,item)=>{
    console.log('this renders')
    return total+Number(item.qty)
  },0),[data.state])



   const [state, setState] = useState({
     right:false,
     left:false
   })

   

   const toggleDrawer = (anchor, open) =>  {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    console.log(anchor)
    setState({ ...state, [anchor]: open });
  };

 
   

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
                  onClick={()=>toggleDrawer("left", true)}
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
              
              <SearchProducts />
          
                 <IconButton
                      size="medium"
                      color="inherit"
                      aria-label="menu"
                      sx={{ padding: 2 }}
                      onClick={()=>toggleDrawer("right", true)}
                 >
                   <Badge badgeContent={totalcartitems} color="error">
                            <ShoppingCartIcon />
                  </Badge>

         </IconButton>
            {
           usersession.status=="authenticated" &&
           (<IconButton
                  size="medium"
                  edge="start"
                  color="primary"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  component={Link}
                  href="/Profile"
                >
                 <Image  src={usersession.data.user.image} width={40} height={40} className="avatar" />
                
                </IconButton>)
         }
             
              </Toolbar>
            </AppBar>
       </HideOnScroll>
    </Box>
   
           <SwipeableDrawer
              anchor='left'
              open={state.left}
              onClose={()=>toggleDrawer("left", false)}
              onOpen={()=>toggleDrawer("left", true)}
          >
               {list}
         </SwipeableDrawer>


        <ShoppingCart 
                drawerstate={state}
                toggleDrawer={toggleDrawer}
            />
       <HeaderMargin />
    </div>
    );
};

export default Header;
