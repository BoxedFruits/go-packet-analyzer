import { useEffect, useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet, GetNetworkDevices } from "../wailsjs/go/main/App";
import { main } from '../wailsjs/go/models';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const [interfaces, setInterfaces] = useState<main.Interface[]>([]);
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);
    const navigate = useNavigate();


    function greet() {
        Greet(name).then(updateResultText);
    }

    useEffect(() => {
        const getNetworkDevices = async () => {
            GetNetworkDevices().then((devices) => {
                setInterfaces(devices)
            })
        }
        getNetworkDevices()
        console.log("Mounted")
    }, [])

    const handleClcik = () => {
        navigate("/capture")
    }

    return (

        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={greet}>Greet</button>
            </div>
            {interfaces?.map((item, i) => <Button>{item.Name}</Button>)}
            <Button onClick={handleClcik} />
        </div>
    )
}

export default App
