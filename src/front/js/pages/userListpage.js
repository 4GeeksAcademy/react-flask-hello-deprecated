
import React,{ useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import "react-datepicker/dist/react-datepicker.css";

import UserList from '../component/userList';
import Navbar from '../component/navbar';

function UserPage() {
  const session = true
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const session = useSession(); // tokens, when session exists we have a user
  // const { isLoading } = useSessionContext();

  // if (isLoading) {
  //   return <>Loading....</>;
  // }

  // function handleSignIn() {
  //   setIsLoggedIn(true);
  // }


  return (
   
      <div style={{ width: '100vw', height: '100vh', justifyContent:'center', alignItems: 'center' }}>
        {session ? (
          <div className='home'>
            <Navbar />
           <UserList />
          </div>
        ) : (
          <>
          
          </>
        )}
      </div>
  );
}

export default UserPage;