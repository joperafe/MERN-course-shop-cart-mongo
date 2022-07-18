import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export function Canvas({
  setCanvas,
  children,
}: {
  setCanvas: (canvas: fabric.Canvas) => void;
  children?: React.ReactNode | React.ReactNodeArray;
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(
      new fabric.Canvas(canvasRef.current, {
        renderOnAddRemove: true,
      }),
    );
  }, [setCanvas]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      {children}
    </>
  );
}

export function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | undefined>();
  return <Canvas setCanvas={setCanvas} />;
}