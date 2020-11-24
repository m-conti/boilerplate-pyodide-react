import { useEffect, useState, useRef } from 'react';
import useForceUpdate from './useForceUpdate';
import * as workers from '../workers';

const useWorker = (workerName, callback=(() => {})) => {
  const forceUpdate = useForceUpdate();

  const initWorker = () => {
    const WorkerConstructor = workers[workerName];
    if (!WorkerConstructor)
      throw new Error(`"${workerName}" is not handle as worker.`);
    const worker = new WorkerConstructor();
    worker.onmessage = messageHandler;
    worker.onerror = errorHandler;
    setPost(() => worker.postMessage.bind(worker));
    return () => worker.terminate();
  };

  const messageHandler = ({ data: { result, error } }) => {
    if (error) return console.error(`${workerName}Worker error:`, error);
    results.current = [ ...results.current, result ];
    forceUpdate();
  };

  const errorHandler = ({ filename, lineno, message }) => {
    console.error(
      `Error ${workerName}Worker: ${filename}, Line: ${lineno}, ${message}`
    );
  };

  const resultHandler = () => {
    if (results.current.length)
      return callback(results.current[results.current.length - 1]);
  };

  const results = useRef([]);
  const [ post, setPost ] = useState(null);

  useEffect(resultHandler, [results.current]);
  useEffect(initWorker, []);

  return [ results.current, post ];
}

export default useWorker;
