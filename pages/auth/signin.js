
import {getSession, getProviders, signIn, useSession } from "next-auth/react"
import {useState} from "react"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from '@mui/material/CircularProgress';
import GitHubIcon from "@mui/icons-material/GitHub";
import Header from "../../components/Header"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles"
import Backdrop from '@mui/material/Backdrop';
const LoginFormContainer = styled('div')(({ theme }) => ({
  width: "100%",
  height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}))

const Loading=styled(Backdrop)(({theme})=>({
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1 
}))






const SignIn = ({ providers }) => {

    const usersession= useSession();
    const [loading,setLoading]=useState(false)
    const handleSignIn=(e)=>{
      e.preventDefault()
      signIn(providers.github.id);
      setLoading(()=>{
        return usersession.loading !=='authenticated' 
      })

    }




  return (
    <>
   
    <Header />

    
    <LoginFormContainer>
     
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography  variant="h4" gutterBottom style={{textAlign: 'center',fontWeight: 'bold'}}>
           SignIn
          </Typography>
            <List>
            <ListItem disablePadding>
              <ListItemButton onClick={(e)=>handleSignIn(e)}>
                <ListItemIcon>
                  <GitHubIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sign In With GitHub" />
              </ListItemButton>
            </ListItem>
            
       
          </List>
           <Loading
                open={loading}
                close={!loading}
              >
                   <CircularProgress color="primary" />
            </Loading>
          
        </CardContent>
        
      </Card>
    </LoginFormContainer>
    </>
  );
};
 
export default SignIn;


export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session= await getSession(context)
 
  if(session){
    return {
      redirect:{
        destination:"/Home",
        permanent:true
      }
    }
  }
 
  return {
    props: { providers },
  };
}