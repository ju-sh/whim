browser.runtime.onMessage.addListener(notify);

async function getCurrentTab() {
    let tabArr = await browser.tabs.query({currentWindow: true, active: true});
    let currentTab = tabArr[0];
    return currentTab;
}

async function notify(message) {
    console.log("bg got message!");
    var task = message.task;
    //var currentTab = await browser.tabs.getCurrent();

    if(task === "close-tab") {
        var tabArr = await browser.tabs.query({currentWindow: true, active: true});
        var currentTab = tabArr[0];
        console.log(currentTab);
        browser.tabs.remove(currentTab.id).then(() => {
            console.log(`Removed: ${currentTab.url}`);
        }, console.error);
    } else if(task === "U") {
        browser.sessions.getRecentlyClosed({maxResults: 1}).then(function(sessions) {
            let closedTab = sessions[0];
            browser.sessions.restore(closedTab.sessionId);
        })
    } else if(task === "J-or-K") { //circular cycling
        var n = message.n;
        var tabArr = await browser.tabs.query({currentWindow: true, active: true});
        var currentTabIndex = tabArr[0].index;
        console.log(currentTabIndex);
        var tabArr = await browser.tabs.query({currentWindow: true});
        var targetTabIndex = (currentTabIndex + n + tabArr.length) % tabArr.length;
        console.log(targetTabIndex);
        var targetTab = tabArr[targetTabIndex];
        console.log(targetTab);
        if(targetTab) {
            await browser.tabs.update(targetTab.id, {"active" : true});
        }

//        var n = message.n;
//        var tabArr = await browser.tabs.query({currentWindow: true, active: true});
//        var currentTab = tabArr[0];
//        console.log(currentTab);
//        var tabArr = await browser.tabs.query({currentWindow: true});
//        //var tabIds = tabArr.map(tabArrElem => tabArrElem.id); 
//        //console.log("tab ids: ");
//        //console.log(tabIds);
//        //var currentTabIndex = tabIds.indexOf(currentTab.id);
//        var currentTabIndex = tabArr.findIndex(obj => obj.id==currentTab.id);
//        console.log(currentTabIndex);
//        var targetTabIndex = currentTabIndex + n;
//        console.log(targetTabIndex);
//        var targetTab = tabArr[targetTabIndex];
//        console.log(targetTab);
//        if(targetTab) {
//            //await browser.tabs.update(currentTab.id, {"active" : false});
//            await browser.tabs.update(targetTab.id, {"active" : true});
//        }
    }


}
