//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
//include your index.scss file into the bundle
import "../styles/index.css";
//import your own components
import Layout from "./layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createClient} from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
//render your react application
const supabase = createClient(
    'https://qcgjushzuosarkebiisf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZ2p1c2h6dW9zYXJrZWJpaXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDkzMTQsImV4cCI6MjA0ODY4NTMxNH0._xXVYgSaDRuOaogKBjSMOJ6xKF9mzJBSvx9AxgNgAbk'
)

ReactDOM.render(
    <SessionContextProvider supabaseClient={supabase}>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID} >
        <Layout  />
    </GoogleOAuthProvider>
    </SessionContextProvider>, document.querySelector("#app"));

// serviceWorker.unregister();