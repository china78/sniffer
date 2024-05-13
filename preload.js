const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  actionSniffer: (status) => ipcRenderer.send('action-sniffer', status)
})