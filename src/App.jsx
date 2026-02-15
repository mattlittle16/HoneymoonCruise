import CountdownClock from './components/CountdownClock';
import CruiseShipAnimation from './components/CruiseShipAnimation';
import WaveAnimation from './components/WaveAnimation';
import YouTubePlayer from './components/YouTubePlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="CContainer1">
        <CountdownClock />
        <YouTubePlayer />
        <WaveAnimation />
      </div>
      <CruiseShipAnimation />
    </div>
  );
}

export default App;
