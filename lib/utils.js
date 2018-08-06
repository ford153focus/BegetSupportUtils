class Utils {
    static getExtensionFileContent($filePath) {
        let url = browser.extension.getURL($filePath);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    }
}
