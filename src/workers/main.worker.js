import * as python from '../python';
self.languagePluginUrl = process.env.PUBLIC_URL;
importScripts('public/pyodide.js');

const getRunPython = (type) => (payload) => {
  const func = python[type];
  if (!func) throw new Error(`type ${type} is not handle`);
  languagePluginLoader.then(() => {
    pyodide.loadPackage(['micropip']).then(() => {
      self.data = payload;
      pyodide.runPythonAsync(func)
        .then((result) => result && self.postMessage({ result }))
        .catch((err) => console.error(err));
    });
  });
}

const dispatchAction = ({ type, payload }) => ({
  RETURN: (payload) => postMessage(payload),
}[type] || (getRunPython(type)))(payload);

onmessage = ({ data: { type, payload } }) => {
  dispatchAction({ type, payload });
}
