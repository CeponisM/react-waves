import React, { useState, useEffect, useRef, useCallback } from 'react';

// Seizure Warning Modal Component
const SeizureWarningModal = ({ isOpen, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
          <span className="text-red-500 text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Seizure Warning</h2>
        <p className="text-gray-700 mb-6">
          This application contains flashing lights and rapidly changing visual patterns that may trigger seizures in individuals with photosensitive epilepsy. Please proceed with caution.
        </p>
        <button
          onClick={onAccept}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          I Understand - Continue
        </button>
      </div>
    </div>
  );
};

// Individual Sine Wave Control Component
const SineWaveControls = ({ wave, index, onUpdate, onRemove, isMinimized, onToggleMinimize, invertColors }) => {
  const controlClass = invertColors ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const inputClass = invertColors ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900';

  return (
    <div className={`${controlClass} rounded-lg shadow-lg p-4 mb-4 border transition-all duration-200`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Wave {index + 1}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleMinimize(index)}
            className={`p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 transition-colors`}
          >
            {isMinimized ? '▼' : '▲'}
          </button>
          {index > 0 && (
            <button
              onClick={() => onRemove(index)}
              className="p-1 rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="space-y-4">
          {/* Wave Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm uppercase tracking-wide opacity-70">Wave Properties</h4>
              
              <label className="block">
                <span className="text-sm font-medium">Amplitude: {wave.amplitude}</span>
                <input
                  type="range"
                  min="-1000"
                  max="1000"
                  value={wave.amplitude}
                  onChange={e => onUpdate(index, 'amplitude', parseInt(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Frequency: {wave.frequency}</span>
                <input
                  type="range"
                  min="-10000"
                  max="10000"
                  value={wave.frequency}
                  onChange={e => onUpdate(index, 'frequency', parseInt(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Phase: {wave.phase.toFixed(2)}</span>
                <input
                  type="range"
                  min="0"
                  max="6.28"
                  step="0.01"
                  value={wave.phase}
                  onChange={e => onUpdate(index, 'phase', parseFloat(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Speed: {wave.speed}</span>
                <input
                  type="range"
                  min="-100000"
                  max="100000"
                  value={wave.speed}
                  onChange={e => onUpdate(index, 'speed', parseInt(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm uppercase tracking-wide opacity-70">Visual Properties</h4>
              
              <label className="block">
                <span className="text-sm font-medium">Line Color</span>
                <input
                  type="color"
                  value={wave.lineColor}
                  onChange={e => onUpdate(index, 'lineColor', e.target.value)}
                  className={`w-full mt-1 h-10 ${inputClass} rounded border-none`}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Fade Duration: {wave.fadeDuration}</span>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={wave.fadeDuration}
                  onChange={e => onUpdate(index, 'fadeDuration', parseInt(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Blend Mode</span>
                <select
                  value={wave.blendMode || 'source-over'}
                  onChange={e => onUpdate(index, 'blendMode', e.target.value)}
                  className={`w-full mt-1 p-2 ${inputClass} rounded border`}
                >
                  <option value="source-over">Normal</option>
                  <option value="multiply">Multiply</option>
                  <option value="screen">Screen</option>
                  <option value="overlay">Overlay</option>
                  <option value="darken">Darken</option>
                  <option value="lighten">Lighten</option>
                  <option value="color-dodge">Color Dodge</option>
                  <option value="color-burn">Color Burn</option>
                  <option value="hard-light">Hard Light</option>
                  <option value="soft-light">Soft Light</option>
                  <option value="difference">Difference</option>
                  <option value="exclusion">Exclusion</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Color Mode</span>
                <select
                  value={wave.colorMode}
                  onChange={e => onUpdate(index, 'colorMode', e.target.value)}
                  className={`w-full mt-1 p-2 ${inputClass} rounded border`}
                >
                  <option value="gradient">Gradient</option>
                  <option value="random">Random</option>
                  <option value="sinusoidal">Sinusoidal</option>
                  <option value="opacityVariation">Opacity Variation</option>
                  <option value="complementary">Complementary</option>
                </select>
              </label>
            </div>
          </div>

          {/* Rotation Controls */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm uppercase tracking-wide opacity-70 mb-3">Rotation Controls</h4>
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-medium">Static Rotation: {wave.rotation}°</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={wave.rotation}
                  onChange={e => onUpdate(index, 'rotation', parseInt(e.target.value))}
                  className={`w-full mt-1 ${inputClass} rounded`}
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate(index, 'isRotating', !wave.isRotating)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    wave.isRotating 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {wave.isRotating ? 'Stop Rotation' : 'Start Rotation'}
                </button>
                <label className="flex-1">
                  <span className="text-sm font-medium">Speed: {wave.rotationSpeed}</span>
                  <input
                    type="range"
                    min="-1000"
                    max="1000"
                    step="0.1"
                    value={wave.rotationSpeed}
                    onChange={e => onUpdate(index, 'rotationSpeed', parseFloat(e.target.value))}
                    className={`w-full mt-1 ${inputClass} rounded`}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main SineWave Canvas Component
const SineWave = ({ waves, fps, invertColors }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const rotationStateRef = useRef({});
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize rotation states for waves
    waves.forEach((wave, index) => {
      if (!rotationStateRef.current[index]) {
        rotationStateRef.current[index] = { rotation: 0 };
      }
    });
  }, [waves]);

  const drawSineWave = useCallback((ctx, wave, waveIndex, canvasWidth, canvasHeight, time) => {
    const xspacing = 16;
    const w = canvasWidth;
    const period = w / Math.abs(wave.frequency);
    const dx = (2 * Math.PI / period) * xspacing;
    const yvalues = [];

    // Update rotation state
    if (!rotationStateRef.current[waveIndex]) {
      rotationStateRef.current[waveIndex] = { rotation: 0 };
    }

    if (wave.isRotating) {
      rotationStateRef.current[waveIndex].rotation += wave.rotationSpeed * 0.1;
    }

    let theta = wave.isRotating ? rotationStateRef.current[waveIndex].rotation * Math.PI / 180 : 0;
    let x = theta + wave.phase + time * wave.speed * 0.0001;
    
    for (let i = 0; i < Math.floor(w / xspacing); i++) {
      yvalues[i] = Math.sin(x) * wave.amplitude;
      x += dx;
    }

    ctx.save();
    
    // Apply blend mode
    ctx.globalCompositeOperation = wave.blendMode || 'source-over';
    
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    
    // Apply static rotation
    if (wave.rotation) {
      ctx.rotate(wave.rotation * Math.PI / 180);
    }

    ctx.strokeStyle = wave.lineColor || '#000000';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginShape = () => ctx.beginPath();
    ctx.endShape = () => {};

    ctx.beginShape();
    for (let i = 0; i < yvalues.length; i++) {
      const px = i * xspacing - canvasWidth / 2;
      const py = canvasHeight / 2 + yvalues[i] - canvasHeight / 2;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.endShape();
    
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const animate = (currentTime) => {
      if (currentTime - lastTimeRef.current >= 1000 / fps) {
        ctx.fillStyle = invertColors ? '#000000' : '#ffffff';
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

        waves.forEach((wave, index) => {
          drawSineWave(ctx, wave, index, canvasSize.width, canvasSize.height, currentTime);
        });

        lastTimeRef.current = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waves, canvasSize, fps, invertColors, drawSineWave]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        backgroundColor: invertColors ? '#000000' : '#ffffff',
        display: 'block'
      }}
    />
  );
};

// Main App Component
function App() {
  const [showWarning, setShowWarning] = useState(true);
  const [invertColors, setInvertColors] = useState(false);
  const [fps, setFps] = useState(60);
  const [minimizedWaves, setMinimizedWaves] = useState(new Set());
  const [controlsMinimized, setControlsMinimized] = useState(false);
  const [sineWaves, setSineWaves] = useState([{
    amplitude: 75,
    frequency: 1000,
    phase: 0.1,
    lineColor: '#111111',
    fadeDuration: 100,
    speed: 20,
    rotation: 0,
    isRotating: false,
    rotationSpeed: 1,
    colorMode: 'gradient',
    blendMode: 'source-over',
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
      isRotating: false,
      rotationSpeed: 1,
      colorMode: 'gradient',
      blendMode: 'source-over',
    };
    setSineWaves([...sineWaves, newWave]);
  };

  const removeSineWave = (index) => {
    setSineWaves(sineWaves.filter((_, i) => i !== index));
    setMinimizedWaves(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const updateSineWave = (index, key, value) => {
    const updatedWaves = sineWaves.map((wave, i) =>
      i === index ? { ...wave, [key]: value } : wave
    );
    setSineWaves(updatedWaves);
  };

  const toggleMinimize = (index) => {
    setMinimizedWaves(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const bgClass = invertColors ? 'bg-gray-900' : 'bg-gray-100';
  const textClass = invertColors ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <SeizureWarningModal 
        isOpen={showWarning} 
        onAccept={() => setShowWarning(false)} 
      />

      {/* Canvas */}
      <div className="fixed inset-0">
        <SineWave waves={sineWaves} fps={fps} invertColors={invertColors} />
      </div>

      {/* Controls Panel */}
      <div className={`fixed left-4 top-4 bottom-4 ${controlsMinimized ? 'w-12' : 'w-96'} transition-all duration-300 z-10`}>
        {controlsMinimized ? (
          <button
            onClick={() => setControlsMinimized(false)}
            className={`${invertColors ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg p-3 shadow-2xl hover:bg-opacity-80 transition-colors`}
          >
            ⚙️
          </button>
        ) : (
          <div className={`${bgClass} bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-4 h-full overflow-y-auto`}>
            {/* Global Controls */}
            <div className={`${invertColors ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 mb-4 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  <h2 className="text-xl font-bold">Global Controls</h2>
                </div>
                <button
                  onClick={() => setControlsMinimized(true)}
                  className="p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
                >
                  ◀
                </button>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={invertColors}
                    onChange={(e) => setInvertColors(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Invert Colors</span>
                </label>

                <label className="block">
                  <span className="text-sm font-medium">FPS: {fps}</span>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={fps}
                    onChange={(e) => setFps(parseInt(e.target.value))}
                    className={`w-full mt-1 ${invertColors ? 'bg-gray-700' : 'bg-gray-100'} rounded`}
                  />
                </label>

                <button
                  onClick={addSineWave}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>+</span>
                  Add New Sine Wave
                </button>
              </div>
            </div>

            {/* Individual Wave Controls */}
            <div className="space-y-2">
              {sineWaves.map((wave, index) => (
                <SineWaveControls
                  key={index}
                  wave={wave}
                  index={index}
                  onUpdate={updateSineWave}
                  onRemove={removeSineWave}
                  isMinimized={minimizedWaves.has(index)}
                  onToggleMinimize={toggleMinimize}
                  invertColors={invertColors}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;