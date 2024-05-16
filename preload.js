const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  actionSniffer: (status) => ipcRenderer.send('action-sniffer', status),
  receiveSnifferData: (callback) => ipcRenderer.on('receive-snifferData', ( event,value)=> callback(value)),
  removeSnifferListener:(callback)=> ipcRenderer.removeListener('receive-snifferData', callback)
})



