import React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Logout = ({ onSignOut }) => {
  const supabase = useSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
    onSignOut(); // Notify parent component of sign out
  }

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Logout;
