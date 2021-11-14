import { getSession } from "next-auth/react"
import Image from "next/image"
import Header from "../components/Header"
const Profile = ({usersession}) => {
    console.log(usersession)
    return  (<>
       <Header />
        {usersession.user.name}
        <Image src={usersession.user.image} width={60} height={60}/>
    </>)
}
export default Profile

export const getServerSideProps =async (context) => {
    const session = await getSession(context)
    
    console.log(session)

    if (!session) {
        return {
          redirect: {
            destination:
              "/auth/signin?callbackUrl=http://localhost:3000/profile",
            permanent: false,
          },
        };
    }
    return {
        props: {
            usersession:session
        }
    }
};
