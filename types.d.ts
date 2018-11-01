declare namespace yubo {

  // electron.ts
  export interface IAqDicEdit {
    launchArgs:   {filePath: string}
    dictWindow:   Electron.BrowserWindow;
    showDictWindow(): void;
    showAboutWindow(): void;
    initAppMenu(options: {isDebug: boolean}): void;
    initDockMenu(): void;
    handleOpenUrl(scheme: string): void;
  }

}
