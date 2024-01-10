import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header'
import Loader from '../components/common/Loader'
// import Button from '../components/common/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import "./style.css";
const Profile = () => {
    const user = useSelector((state) => state.user.user);

  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }

  const handleLogout=()=>{
    signOut(auth).then(()=>{
    toast.success("User Logout")
    })
    .catch((error)=>{
        toast.error(error.message)
    })
  }


  return (
    <div>
      <Header />
      <br/>
      
      <div className="profileText">
     
        <h2>FullName : {user.name}</h2>
        <h2>  Email : {user.email}</h2>
        <br/>
        
        <button text={"logout"} onClick={handleLogout} className="btnChnge" >Logout</button>
        </div>
    
    </div>
  );
  }

export default Profile;