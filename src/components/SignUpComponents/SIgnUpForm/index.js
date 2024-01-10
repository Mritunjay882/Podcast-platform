import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { auth,db,storage } from '../../../firebase';
import { doc,setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
    const [FullName, setFullName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [confPass,setConfPass]=useState('')
   const[loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignUp=async()=>{
       
            setLoading(true)
            console.log("handle sign up")
      
            if (
              password == confPass &&
              password.length >= 6 &&
              FullName &&
              email
            ) 
            {
            try{
              //creating user acount
              const userCredential=await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              const user = userCredential.user;
              console.log("user", user);
              //saving user details
              
              await setDoc(doc(db,"users",user.uid),{
                name:FullName,
                email:user.email,
                uid:user.uid,
              });
              //save data nd call redux
              
              dispatch(
                setUser({
                  name:FullName,
                  email:user.email,
                  uid:user.uid,
                })
              )
              toast.success("User has been created!");
              setLoading(false);
              navigate("/Profile");
            }
            catch(e){
              console.log('error',e)
              toast.error(e.message);
              setLoading(false);
            }
          }
          else {
            if (password != confPass) {
              toast.error(
                "Please Make Sure your password and Confirm Password matches!"
              );
            } else if (password.length < 6) {
              toast.error(
                "Please Make Sure your password is more than 6 digits long!"
              );
            }
            setLoading(false);
          }
        };
  
  return (
    <>
    
         <InputComponent 
        state={FullName}
        setState={setFullName}
        placeholder='Full Name'
        type="text"
        required={true}
        />
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
        <InputComponent 
        state={confPass}
       setState={setConfPass}
        placeholder='Confirm Password'
        type="password"
        required={true}
        />
        <Button text={loading ? "Loading...":"Signup"}  disabled={loading} onClick={handleSignUp}/>
    </>
  )
}

export default SignUpForm