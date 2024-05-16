const { contextBridge, ipcRenderer } = require('electron/renderer');

let snifferOn;
contextBridge.exposeInMainWorld('electronAPI', {
  actionSniffer: (status) => ipcRenderer.send('action-sniffer', status),
  receiveSnifferData: (callback) => {
    snifferOn = (_event, value) => callback(value);
    ipcRenderer.on("receive-snifferData", snifferOn);
  },
  offSniffData:() => ipcRenderer.off('receive-snifferData', snifferOn)
})



