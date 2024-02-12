import { useEffect, useState } from 'react';
import './App.css';
import { DisplayService } from './httpServices/display-service';
function App() {
    const [displays, setDisplays] = useState();

    useEffect(() => {
        populateDisplays();
    }, []);

    const contents = displays === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>ImageUrl</th>
                </tr>
            </thead>
            <tbody>
                {displays.map(forecast =>
                    <tr key={forecast.name}>
                        <td>{forecast.name}</td>
                        <td>{forecast.description}</td>
                        <td>{forecast.imageUrl}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Displays</h1>
            {contents}
        </div>
    );
    
    async function populateDisplays() {
        const displayService = new DisplayService();
        const data = await displayService.get_async();
        console.log('data');
        console.log(data);
        setDisplays(data);
    }
}

export default App;