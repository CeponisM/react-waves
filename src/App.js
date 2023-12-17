import React, { useState } from 'react';
import './App.css';
import SineWave from './SineWave';

function App() {
  const [blendMode, setBlendMode] = useState('BLEND');
  const [sineWaves, setSineWaves] = useState([{
    amplitude: 75,
    frequency: 1000,
    phase: 0.1,
    lineColor: '#111111',
    fadeDuration: 100,
    speed: 20,
    rotation: 0,
    rotation2: 0,
    isRotating: false,
    isRotating2: false,
    rotationSpeed: 1,
    rotationSpeed2: 0,
    colorMode: 'gradient',
  }]);

  const addSineWave = () => {
    const newWave = {
      amplitude: 75,
      frequency: 1000,
      phase: 0.1,
      lineColor: '#111111',
      fadeDuration: 100,
      speed: 20,
      rotation: 0,
      rotation2: 0,
      isRotating: false,
      isRotating2: false,
      rotationSpeed: 1,
      rotationSpeed2: 0,
      colorMode: 'gradient',
    };
    setSineWaves([...sineWaves, newWave]);
  };

  const updateSineWave = (index, key, value) => {
    const updatedWaves = sineWaves.map((wave, i) =>
      i === index ? { ...wave, [key]: value } : wave
    );
    setSineWaves(updatedWaves);
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={addSineWave}>+ Add New Sine Wave</button>
        {sineWaves.map((wave, index) => (
          <div key={index} className="controlsList">
            <label>
              Amplitude:
              <input type="range" min="-1000" max="1000" value={wave.amplitude}
                onChange={e => updateSineWave(index, 'amplitude', parseInt(e.target.value))} />
            </label>
            <label>
              Frequency:
              <input type="range" min="-10000" max="10000" step="0.01" value={wave.frequency}
                onChange={e => updateSineWave(index, 'frequency', parseInt(e.target.value))} />
            </label>
            <label>
              Phase Shift:
              <input type="range" min="0" max="6.28" step="0.01" value={wave.phase}
                onChange={e => updateSineWave(index, 'phase', parseFloat(e.target.value))} />
            </label>
            <label>
              Line Color:
              <input type="color" value={wave.lineColor}
                onChange={e => updateSineWave(index, 'lineColor', e.target.value)} />
            </label>
            <label>
              Fade Duration:
              <input type="range" min="0" max="500" value={wave.fadeDuration}
                onChange={e => updateSineWave(index, 'fadeDuration', parseInt(e.target.value))} />
            </label>
            <label>
              Speed of Sine Wave:
              <input type="range" min="-100000" max="100000" value={wave.speed}
                onChange={e => updateSineWave(index, 'speed', parseInt(e.target.value))} />
            </label>
            <label>
              Rotation:
              <input type="range" min="0" max="360" value={wave.rotation}
                onChange={e => updateSineWave(index, 'rotation', parseInt(e.target.value))} />
            </label>
            <label>
              Spin:
              <input type="range" min="-5" max="5" step="0.1" value={wave.spin}
                onChange={e => updateSineWave(index, 'spin', parseFloat(e.target.value))} />
            </label>
            <button onClick={() => updateSineWave(index, 'isRotating', !wave.isRotating)}>
              {wave.isRotating ? 'Stop Rotation' : 'Start Rotation'}
            </button>
            <label>
              Rotation Speed:
              <input type="range" min="-1" max="1" step="0.001" value={wave.rotationSpeed}
                onChange={e => updateSineWave(index, 'rotationSpeed', parseFloat(e.target.value))} />
            </label>
            <button onClick={() => updateSineWave(index, 'isRotating2', !wave.isRotating2)}>
              {wave.isRotating2 ? 'Stop Rotation' : 'Start Rotation'}
            </button>
            <label>
              Rotation Speed:
              <input type="range" min="-1000" max="1000" step="0.1" value={wave.rotationSpeed2}
                onChange={e => updateSineWave(index, 'rotationSpeed2', parseFloat(e.target.value))} />
            </label>

            <label>
          Blend Mode:
          <select value={blendMode} onChange={e => setBlendMode(e.target.value)}>
            <option value="BLEND">Blend</option>
            <option value="ADD">Add</option>
            <option value="DARKEST">Darkest</option>
            <option value="LIGHTEST">Lightest</option>
            <option value="DIFFERENCE">Difference</option>
            <option value="EXCLUSION">Exclusion</option>
            <option value="MULTIPLY">Multiply</option>
            <option value="SCREEN">Screen</option>
          </select>
        </label>
          </div>
        ))}
      </div>
      <div className="sine-waves">
        <SineWave waves={sineWaves} blendMode={blendMode} />
      </div>
    </div>
  );
}

export default App;