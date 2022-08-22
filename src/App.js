import './App.css';
import { Table, TopScorers, TopManagers, TopAssists, AdditionalStats } from './components';

function App() {
  return (
    <div className="App">
      <div id="top-stats">
        <TopScorers />
        <TopManagers />
        <TopAssists />
      </div>
      <AdditionalStats />
      <Table />
    </div>
  );
}

export default App;
