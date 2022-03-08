const { app, BrowserWindow, Notification, ipcMain, session } = require('electron')
const path = require('path')
const os = require('os')

const reactDevToolsPath = path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.23.0_0')

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // Open Devtools
  isDev && win.webContents.openDevTools()
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.whenReady()
  .then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      } 
    })
  })
  .then(async () => {
    await session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true })
  })

ipcMain.on('notify', (e, message) => {
  new Notification ({
    title: 'Notification',
    body: message
  }).show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
