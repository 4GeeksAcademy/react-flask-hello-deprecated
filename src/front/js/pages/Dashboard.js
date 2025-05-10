
import React,{ useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import "react-datepicker/dist/react-datepicker.css";

import Login from '../component/GoogleLogin';
import EventCreation from '../component/CreateEvent';
import Navbar from '../component/navbar';

function Dashboard() {
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
            <EventCreation session={session} />
          </div>
        ) : (
          <>
           you need to login with google to 
          <Login onSignIn={handleSignIn} />
          </>
        )}
      </div>
  );
}

export default Dashboard;