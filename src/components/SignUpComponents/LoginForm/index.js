import React from 'react'
import { useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import Header from '../../common/Header';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [loading, setLoading] = useState(false);
   
    const dispatch= useDispatch()
    const navigate= useNavigate()

    const handleLogin=async()=>{
     setLoading(true)
     if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login Successful!");
        setLoading(false);
        navigate("/profile");
        // Navigate to the profile page
      } catch (error) {
        console.error("Error signing in:", error);
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Make sure email and password are not empty");
      setLoading(false);
    } 
  };
const handleForgetPass= async () => { 
  setLoading(true); 
  if (email) 
  {
     try{
         await sendPasswordResetEmail(auth, email);
          toast.success("Password reset email sent!");
           setLoading(false);
           }
            catch (error)
             {
               console.error("Error sending password reset email:", error); 
               toast.error(error.message); setLoading(false); 
              }
     }
                else
                 {
                   toast.error("Please enter your registered  email address"); 
                   setLoading(false); 
                  } 
 };
    

  return (
    <>
         
        <InputComponent 
        state={email}
        setState={setEmail}
        placeholder='Email'
        type="email"
        required={true}
        />
        <InputComponent 
        state={password}
       setState={setPassword}
        placeholder='Password'
        type="password"
        required={true}
        />
        
       <div className="forgot" style={{display:"flex",flexDirection:"row-reverse",justifyContent:"flex-end",alignItems:"end" ,  cursor:"pointer",textDecoration:"underline",textAlign:"right",width:"120px",fontSize:"16px",marginTop:"10px",marginBottom:"10px"}} onClick={handleForgetPass}>Forgot password ?</div>
       
       <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  )
}

export default LoginForm;