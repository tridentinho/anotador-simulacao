import Table from './components/Table';
import './App.css';
import { useEffect, useState } from 'react';
import { sha256 } from 'crypto-hash';
import { CSVLink } from "react-csv";
import Simulate from './utils/hacks';

function App() {
  const [clients, setClients] = useState([]);

  const getCsvData = (fake = false) => {
    const headers = [
      {
        label: "ID",
        key: "id"
      },
      {
        label: "Chegada",
        key: "arrived"
      },
      {
        label: "Inicio serviço",
        key: "serviceStarted"
      },
      {
        label: "Final serviço",
        key: "serviceEnded"
      }
    ];

    const csvReport = {
      data: clients,
      headers: headers,
      filename: 'Relatorio_Simulacao.csv'
    };

    return csvReport;
  }

  useEffect(() => {
    const localClients = localStorage.getItem('clients');
    if (localClients) {
      setClients(JSON.parse(localClients));
    }
  }, [])

  const updateClients = (newState) => {
    localStorage.setItem('clients', JSON.stringify(newState));
  }

  const addClient = async () => {
    const addHours = (h) => {
      let date = new Date();
      date.setTime(date.getTime() + (h * 60 * 60 * 1000));
      return date;
    }

    const addDays = (d) => {
      let date = new Date();
      date.setDate(date.getDate() + d);
      return date;
    }

    const newUser = {
      id: await sha256(Date.now().toString()),
      arrived: addDays(addHours(4))
    };
    updateClients([...clients, newUser]);
    setClients([...clients, newUser]);
  }

  return (
    <div className="App">
      <Table data={clients} setUsersChanger={setClients} clientUpdater={updateClients} />
      <div>
        <button onClick={async () => addClient()} className='add-button'>
          Add client
        </button>
      </div>
      <div>
        <CSVLink {...getCsvData()}> Export to CSV </CSVLink>
        <button onClick={() => setClients(Simulate())} className='add-button'>
          Simulate
        </button>
        <button onClick={() => {
          localStorage.clear();
          setClients([])
        }} className='add-button'>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
