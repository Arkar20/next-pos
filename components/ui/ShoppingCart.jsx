import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import  Button from "@mui/material/Button"
import {useEffect,useContext} from "react"
import {Cart} from "../../context/CartContext"
const ShoppingCart = (props) => {


    const {state,dispatch} =useContext(Cart)

    
    const removeFromCart=(id)=>{
     return dispatch({
          type:'REMOVE_ITEM',payload:{id}
        })
    }

    return (
      <SwipeableDrawer
        anchor="right"
        open={props.drawerstate.right}
        onClose={() => props.toggleDrawer('right',false)}
        onOpen={() => props.toggleDrawer('right',true)}
      >
        <Typography variant="h5" style={{ padding: 10 }}>
          Shopping Cart
        </Typography>
        <List
          sx={{
            width: "20em",
            maxWidth: 360,
            bgcolor: "background.paper",
            margin: 0,
          }}
        >
          {state.map((cartitem,index) => {
            const labelId = `checkbox-list-label-${index}`;

            return (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                  onClick={()=>removeFromCart(cartitem.id)}
                  edge="end" aria-label="comments">
                    <DeleteIcon color="error" />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} dense>
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
                  <ListItemText
                    id={labelId}
                    primary={cartitem.title}
                    secondary={`Qty x ${cartitem.qty}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" endIcon={<SendIcon />}>
            Checkout
          </Button>
        </div>
      </SwipeableDrawer>
    );
}

export default ShoppingCart