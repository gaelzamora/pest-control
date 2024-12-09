import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createRegister } from '../api/registers'; // Asegúrate de que esta función esté configurada para enviar los datos al backend
import { useQueryClient } from '@tanstack/react-query';

interface DetectionResult {
  label: string;
  confidence: number;
}

const PestDetector: React.FC = () => {
  const queryClient = useQueryClient();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const [lastSent, setLastSent] = useState<{ timestamp: number; label: string | null }>({
    timestamp: 0,
    label: null,
  });

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

    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la cámara:', err.message);
          alert('No se pudo acceder a la cámara. Verifica los permisos.');
        });
    }
  }, []);

  const preprocessImage = (imgTensor: tf.Tensor3D) => {
    const resized = tf.image.resizeBilinear(imgTensor, [224, 224]).toFloat().div(255);
    const mean = tf.tensor([0.485, 0.456, 0.406]);
    const std = tf.tensor([0.229, 0.224, 0.225]);
    return resized.sub(mean).div(std).expandDims(0);
  };

  const captureAndSendImage = async (label: string, canvas: HTMLCanvasElement) => {
    const now = Date.now();

    if (now - lastSent.timestamp < 10000 && lastSent.label === label) return;

    const imageBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    });

    if (!imageBlob) {
      console.error('No se pudo generar el Blob de la imagen.');
      return;
    }

    const imageFile = new File([imageBlob], 'pest_detection.jpg', { type: 'image/jpeg' });

    try {
      await createRegister({
        pest_name: label,
        image: imageFile,
      });

      // Refrescar registros al enviar correctamente
      queryClient.invalidateQueries({queryKey: ["registers"]});
      console.log('Imagen y datos enviados con éxito');
      setLastSent({ timestamp: now, label });
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
    }
  };


  const detect = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgTensor = tf.browser.fromPixels(canvas) as tf.Tensor3D;
    const preprocessedImg = preprocessImage(imgTensor);

    const predictions = await model.predict(preprocessedImg) as tf.Tensor;
    const data = (await predictions.array()) as number[][];

    const results: DetectionResult[] = data[0].map((confidence: number, index: number) => ({
      label: index === 0 ? 'Cockroach' : 'Rat',
      confidence: confidence,
    }));

    const highConfidenceDetection = results.find((res) => res.confidence > 0.99);

    if (highConfidenceDetection) {
      setDetections([highConfidenceDetection]);
      await captureAndSendImage(highConfidenceDetection.label, canvas);
    }
  };

  useEffect(() => {
    const interval = setInterval(detect, 100);
    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <video ref={videoRef} style={{ width: '60%', maxWidth: '400px', border: '1px solid black' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
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
