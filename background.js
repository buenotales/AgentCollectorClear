chrome.runtime.onInstalled.addListener(() => {

    console.log('onInstalled...');

    chrome.alarms.create('refresh', { periodInMinutes: 1 });

});

chrome.alarms.onAlarm.addListener((alarm) => {

    chrome.windows.getAll({ populate: true }, function (windows) {

        for (let x = 0; x < windows.length; x++)
            for (let y = 0; y < windows[x].tabs.length; y++)
                if (windows[x].tabs[y].favIconUrl === "https://pro.clear.com.br/src/assets/img/favicon-clear.ico") {

                    let dateNow = new Date();

                    chrome.tabs.executeScript(windows[x].tabs[y].id, {
                        code: `
                    
                    function CreateAndDownload(filename, text) {

                        var pom = document.createElement('a');
                        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                        pom.setAttribute('download', filename);
                    
                        if (document.createEvent) {
                            var event = document.createEvent('MouseEvents');
                            event.initEvent('click', true, true);
                            pom.dispatchEvent(event);
                        }
                        else {
                            pom.click();
                        }
                    }

                    document.getElementsByTagName('iframe')[1].contentDocument.body.children[1].innerHTML !== null &&
                    document.getElementsByTagName('iframe')[1].contentDocument.body.children[1].innerHTML !== undefined
                    ? CreateAndDownload('AgentCollectorClearResult_${dateNow}', document.getElementsByTagName('iframe')[1].contentDocument.body.children[1].innerHTML)
                    : '';
                    ` }, console.log("New file downloaded: AgentCollectorClearResult_" + dateNow));


                }
    });
});