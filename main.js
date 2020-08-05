// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 640,
        webPreferences: {
            nodeIntegration: true,
        },
        backgroundColor: '#ffffff',
        resizable: false,
        frame: false,
        show: false,
    });

    mainWindow.loadFile('index.html');

    // 取消打开时窗口闪烁
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            mainWindow.show();
        }, 500);
    });

    // mainWindow.webContents.openDevTools();
}
Menu.setApplicationMenu(null);
app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
