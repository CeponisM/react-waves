import React, { useState, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

function SineWave({ waves, blendMode }) {
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColor = (p5, wave, index, total) => {
    switch (wave.colorMode) {
      case 'gradient':
        return p5.lerpColor(p5.color('#ff0000'), p5.color('#0000ff'), index / total);
      case 'random':
        return p5.color(p5.random(255), p5.random(255), p5.random(255));
      case 'sinusoidal':
        return p5.color(128 + 128 * Math.sin(index / total * Math.PI), 128, 128);
      case 'opacityVariation':
        return p5.color(0, 0, 0, index / total * 255);
      case 'complementary':
        return index % 2 === 0 ? p5.color('#ff0000') : p5.color('#00ff00');
      default:
        return p5.color('#000000');
    }
  };

  // useEffect(() => {
  //   let interval;
  //   if (isRotating) {
  //     interval = setInterval(() => {
  //       setRotation(prevRotation => prevRotation + parseFloat(rotationSpeed));
  //     }, 20);
  //   } else {
  //     clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [isRotating, rotationSpeed]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTheta(prevTheta => prevTheta + (0.02 * frequency));
  //   }, 200 / speed);
  //   return () => clearInterval(interval);
  // }, [frequency, speed]);

  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(canvasSize.width, canvasSize.height);
      p5.frameRate(240);
    };

    p5.draw = () => {
      p5.background(255);
      p5.blendMode(p5[blendMode]);

      waves.forEach(wave => {
        drawSineWave(p5, wave);
      });

      p5.blendMode(p5.BLEND);
    };
  };

  const drawSineWave = (p5, wave) => {
    let xspacing = 16;
    let w = canvasSize.width;
    let period = w / wave.frequency;
    let dx = (p5.TWO_PI / period) * xspacing;
    let yvalues = new Array(p5.floor(w / xspacing));

    let theta = wave.isRotating ? p5.radians(wave.rotation) : 0;
    wave.rotation += wave.rotationSpeed;
    let x = theta + wave.phase;
    for (let i = 0; i < yvalues.length; i++) {
      p5.stroke(getColor(p5, wave, i, yvalues.length));
      yvalues[i] = Math.sin(x) * wave.amplitude;
      x += dx;
    }

    // Apply rotation if isRotating2 is true
    if (wave.isRotating2) {
      wave.rotation2 += wave.rotationSpeed2;
    }

    p5.push();
    p5.strokeWeight(9);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(wave.lineColor);
    p5.rotate(p5.radians(wave.rotation2)); // Apply rotation
    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < yvalues.length; i++) {
      p5.curveVertex(i * xspacing - p5.width / 2, p5.height / 2 + yvalues[i] - p5.height / 2);
    }
    p5.endShape();

    p5.pop(); // Restore the original drawing state
  };

  return <ReactP5Wrapper sketch={sketch} />;
}

export default SineWave;