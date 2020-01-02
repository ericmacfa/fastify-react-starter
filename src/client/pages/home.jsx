import React, { useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/cookies';

export function Home(props) {
    const userInfo = getUserInfo();

    // This is only used to trigger the acquisition of user info via cookies
    useEffect(() => {
        axios.get('/api/hello').catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <main className="react-app-main">
            <section className="section">
                <div className="container">
                    {userInfo ? (
                        <div>
                            Hello <b>{userInfo.name}</b>!
                            <br />
                            <pre>{JSON.stringify(userInfo, null, 4)}</pre>
                        </div>
                    ) : (
                        <div className="test">You are unauthorized, please log in.</div>
                    )}
                </div>
            </section>
        </main>
    );
}
