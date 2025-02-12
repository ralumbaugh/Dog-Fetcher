'use client'
import { useState, useEffect } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { SideDogBar } from '../components/SideDogBar';
import { getThemDoggos } from '../utils/getThemDoggos';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
        const [dogList, setDogList] = useState<string[]>([]);
        useEffect(() => {
            setDogList(getThemDoggos(8, localStorage.getItem("Image") || ""));
        }, []);

    const navigate = useNavigate();
    const hasLoggedIn = localStorage.getItem("Has logged in");
    const signInMessage = hasLoggedIn? "Welcome back! Your new pup is waiting!" : "Sign in to meet your new best friend!"

    const onSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(name, email);

        if(result.status == 200) {
            console.log("Login successful!");
            localStorage.setItem("Has logged in", "true");
            navigate("/dashboard");
        } else {
            console.log("Awwww beans! Login wasn't successful. Status Code: ", result.status);
        }
    }

    return (
    <>
        <SideDogBar dog1={dogList[0]} dog2={dogList[1]} dog3={dogList[3]} dog4={dogList[4]}/>
            <div className='grid place-items-center flex-1 '>
                <form className='border rounded-2xl border-gray-500 py-6 px-4 shadow min-sm:w-lg ' onSubmit={onSignIn}>
                    <div>
                        <h2 className='text-lg'>{signInMessage}</h2>
                        <div className='py-3 flex justify-between'>
                            <label className="px-3 w-25" htmlFor="email">Email</label>
                            <input className="px-3 border rounded-sm min-sm:w-lg" type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder='example@email.com'/>
                        </div>
                        <div className='flex justify-between'>
                            <label className="px-3 w-25" htmlFor="name">Name</label>
                            <input className="px-3 border rounded-sm min-sm:w-lg" type="name" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder='John Doe'/>
                        </div>
                        <button type="submit" className='bg-purple-500 hover:bg-purple-700 text-white border-black w-30 my-3 border rounded-lg '>Log In</button>
                    </div>
                </form>
            </div>
        <SideDogBar dog1={dogList[5]} dog2={dogList[6]} dog3={dogList[7]} dog4={dogList[8]}/>
    </>
    );
}