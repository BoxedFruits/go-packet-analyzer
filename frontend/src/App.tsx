import { useEffect, useState } from 'react';
// import logo from './assets/images/logo-universal.png';
import './App.css';
import { GetNetworkInterfaces } from "../wailsjs/go/PacketCapture/NetworkInterfaces";
import { StartNetworkCapture } from "../wailsjs/go/PacketCapture/NetworkInterface";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { PacketCapture } from 'wailsjs/go/models';

function App() {
    const [interfaces, setInterfaces] = useState<PacketCapture.NetworkInterface[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNetworkDevices = async () => {
            GetNetworkInterfaces().then((interfaces) => {
                setInterfaces(interfaces)
            })
        }
        getNetworkDevices()
        console.log("Mounted")

    }, [])

    const startCapture = async () => {
        StartNetworkCapture(interfaces[1])
    }

    const handleClick = (interfaceName: string) => {
        navigate(`/capture/${interfaceName}`)
    }

    return (
        <div id="App">
            <div id="layout" className='m-5'>
                <h1 className='text-black flex'>Interfaces</h1>
                <div className='flex flex-col py-2'>
                    {interfaces?.map((item, _) =>
                        <div className='basis-3 my-2'>
                            <Button onClick={() => { handleClick(item.Name) }}>{item.Name}</Button>
                        </div>
                    )}
                </div>
                <button onClick={startCapture}>start</button>
            </div>
        </div>
    )
}

export default App
