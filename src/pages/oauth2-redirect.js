import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Pocketbase from 'pocketbase';
import axios from "axios";

export default function Oauth2Redirect() {
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        async function sortAuth() {
            if (requestSent) return; // Prevent duplicate requests
            const params = (new URL(window.location)).searchParams;
            const provider = JSON.parse(localStorage.getItem('provider'));

            if (provider.state !== params.get('state')) {
                throw new Error("State parameters don't match.");
            }

            if (params.get('error')) {
                window.close();
            }


            try {
                await axios.post('/api/auth/completeSignup', {
                    code: params.get('code'),
                    code_verifier: localStorage.getItem('code_verifier'),
                    state: params.get('state')
                });

                setRequestSent(true); // Set the flag after the request is successful

                window.close();
            } catch (e) {
                console.error(e);
            }
        }

        if (typeof window !== 'undefined') {
            sortAuth();
        }
    }, [requestSent]); // Add requestSent as a dependency

    return (
        <div className="h-screen w-screen bg-black" id="content">

        </div>
    )
}