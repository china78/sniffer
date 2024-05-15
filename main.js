const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const url = require('url');
// const { spawn } = require("child_process");
const { PythonShell } = require('python-shell');

const mode = process.argv[2];

let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if (mode === 'dev') {
    mainWindow.loadURL('http://localhost:3000/')
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'), 
      protocol: 'file:', 
      slashes: true 
    }))
  }
  // 打开开发者工具
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  // 创建 Python 子进程
  createPythonProcess();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 获取 Python 解释器路径
// const _pythonPath = execSync('which python').toString().trim();
// console.log('Python 解释器路径：', _pythonPath);

let pythonShell;

// 替换成您在终端和 VSCode 中使用的 Python 解释器路径
const pythonPath = '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3.10';

function createPythonProcess() {
  console.log('主进程启动 Python 子进程...');
  
  pythonShell = new PythonShell('./python/sniffer.py', {
    pythonPath,
    mode: 'text',
  });

  pythonShell.on('message', (message) => {
    console.log('从 Python 返回:', message);
    mainWindow.webContents.send('receive-snifferData', message);
  });

  pythonShell.on('stderr', (stderr) => {
    console.error('Python 子进程错误:', stderr);
  });

  pythonShell.on('close', (code) => {
    console.log(`Python 子进程退出，退出码 ${code}`);
  });

  pythonShell.on('error', (error) => {
    console.error('Python 子进程启动失败:', error);
  });
}

function start_sniffing() {
  console.log('发送命令: start_sniffing');
  pythonShell.send('start_sniffing');
}

function stop_sniffing() {
  console.log('发送命令: stop_sniffing');
  pythonShell.send('stop_sniffing');
}

ipcMain.on('action-sniffer', (event, status) => {
  console.log('--- status ---: ', status)
  status ? start_sniffing(): stop_sniffing();
})