import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

interface DetectionResult {
  label: string;
  confidence: number;
}

const PestDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Cargar el modelo al montar el componente
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel('/model/model.json');
        setModel(loadedModel);
        console.log('Modelo cargado');
      } catch (error) {
        console.error('Error al cargar el modelo:', error);
        alert('No se pudo cargar el modelo. Verifica el archivo model.json.');
      }
    };

    loadModel();

    // Configuración de la webcam
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          } else {
            setError('No se pudo acceder a la cámara. Intenta nuevamente.');
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la cámara:', err.message);
          setError('No se pudo acceder a la cámara. Verifica los permisos.');
        });
    }

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Función de preprocesamiento manual para MobileNetV2
  const preprocessImage = (imgTensor: tf.Tensor3D) => {
    // Redimensionamos la imagen a 224x224 y la normalizamos entre [0, 1]
    const resized = tf.image.resizeBilinear(imgTensor, [224, 224]).toFloat().div(255);

    // Media y desviación estándar para MobileNetV2
    const mean = tf.tensor([0.485, 0.456, 0.406]); // Media para cada canal: R, G, B
    const std = tf.tensor([0.229, 0.224, 0.225]); // Desviación estándar para cada canal: R, G, B

    // Substraer media y dividir por desviación estándar
    const normalized = resized.sub(mean).div(std);

    // Añadir una dimensión de batch
    return normalized.expandDims(0);
  };

  // Función de detección que se ejecuta cada 100 ms
  const detect = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Establecer el tamaño del canvas a las dimensiones del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el cuadro del video en el canvas
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Preprocesar la imagen para el modelo
    const imgTensor = tf.browser.fromPixels(canvas) as tf.Tensor3D; // Convertir a Tensor3D
    const preprocessedImg = preprocessImage(imgTensor);

    // Realizar la predicción
    const predictions = await model.predict(preprocessedImg) as tf.Tensor;
    const data = (await predictions.array()) as number[][]; // Convertir el tensor a array

    // Interpretar los resultados (ajustar según las clases de tu modelo)
    const results: DetectionResult[] = data[0].map((confidence: number, index: number) => ({
      label: index === 0 ? 'Rat' : 'Cockroach', // Etiquetas según las clases de tu modelo
      confidence: confidence,
    }));

    // Filtrar detecciones con alta confianza (> 0.5)
    setDetections(results.filter((res) => res.confidence > 0.5));
  };

  // Llamar a detect() cada 100 ms para predicciones en tiempo real
  useEffect(() => {
    const interval = setInterval(detect, 100); // 10 FPS
    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [model]);

  return (
    <div>
      <h1>Detección de Plagas en Vivo</h1>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '600px', border: '1px solid black' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Mostrar mensaje de error si no se puede acceder a la cámara */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        {detections.length > 0 ? (
          detections.map((detection, idx) => (
            <p key={idx}>
              {detection.label}: {(detection.confidence * 100).toFixed(2)}%
            </p>
          ))
        ) : (
          <p>No se detectaron plagas o la confianza es baja.</p>
        )}
      </div>
    </div>
  );
};

export default PestDetector;
