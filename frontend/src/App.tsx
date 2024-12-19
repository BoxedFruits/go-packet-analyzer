import { useEffect, useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet, GetNetworkDevices } from "../wailsjs/go/main/App";
import { main } from '../wailsjs/go/models';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

function App() {
    const [name, setName] = useState('');
    const [interfaces, setInterfaces] = useState<main.Interface[]>([]);
    const updateName = (e: any) => setName(e.target.value);
    const navigate = useNavigate();


    useEffect(() => {
        const getNetworkDevices = async () => {
            GetNetworkDevices().then((devices) => {
                setInterfaces(devices)
            })
        }
        getNetworkDevices()
        console.log("Mounted")
    }, [])

    const handleClick = (interfaceName: string) => {
        navigate(`/capture/${interfaceName}`)
    }

    return (
        <div id="App">
            <div id="layout" className='m-5'>
                <h1 className='text-black flex'>Interfaces</h1>
                <div className='flex flex-col py-2'>
                    {interfaces?.map((item, i) =>
                        <div className='basis-3 my-2'>
                            <Button onClick={() => { handleClick(item.Name) }}>{item.Name}</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
