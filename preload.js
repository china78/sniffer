const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  actionSniffer: (status) => ipcRenderer.send('action-sniffer', status),
  receiveSnifferData: (callback) => ipcRenderer.on('receive-snifferData', (_event, value) => callback(value))
})



