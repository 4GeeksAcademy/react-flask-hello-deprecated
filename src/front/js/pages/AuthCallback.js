import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const AuthCallback = () => {
  const navigate = useNavigate(); 
  const supabase = createClient(
    'https://qcgjushzuosarkebiisf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZ2p1c2h6dW9zYXJrZWJpaXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDkzMTQsImV4cCI6MjA0ODY4NTMxNH0._xXVYgSaDRuOaogKBjSMOJ6xKF9mzJBSvx9AxgNgAbk'
  );

  useEffect(() => {
    // The user should be redirected back here after the OAuth flow
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during auth callback:', error.message);
        navigate('/login'); // Use navigate() to redirect to login if error
        return;
      }

      if (session) {
        // Successfully authenticated
        console.log('User authenticated:', session.user);
        navigate('/dashboard'); // Use navigate() to redirect to dashboard
      } else {
        // No session found (failed authentication)
        navigate('/login'); // Use navigate() to redirect to login page
      }
    };

    handleAuthCallback();
  }, [navigate, supabase]);  // Added supabase as a dependency

  return <div>Loading...</div>; // Show loading while checking the session
};

export default AuthCallback;
