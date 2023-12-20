const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600
  })

  win.loadURL('http://localhost:6969')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', ()=>{
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})

// const { app, BrowserWindow } = require('electron');
// const installExtension = require('electron-redux-devtools');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1000,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true, // Habilita el uso de Node.js en la ventana del navegador
//     },
//   });

//   mainWindow.loadURL('http://localhost:6969');

//   // Instala las extensiones de Redux DevTools
//   installExtension.default(installExtension.REDUX_DEVTOOLS)
//     .then((name) => console.log(`Added Extension: ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });

//   app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//       app.quit();
//     }
//   });
// });
