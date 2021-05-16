var gFlag = false;
var numStr = "";    // length==0 => inactive
var setMark = false;
var gotoMark = false;
var marks = {};      // pos marks
var n = 1;  // the num modifier

function isCharInt(x) {
    return (x >= '0') && (x <= '9');
}

function isCharAlpha(x) {
    return ((x >= 'a') && (x <= 'z')) || ((x >= 'A') && (x <= 'Z'));
}

function getNum() {
    // Returns 1 as default value
    if(numStr.length === 0) {
        return 1;   // default val
    }
    let numStrVal = Number(numStr);
    numStr = "";
    return numStrVal;
}

document.addEventListener("keydown", event => {
    if(event.isComposing || event.keyCode === 229) {
        return;
    }
    console.log("LIVE");
    var activeElem = document.activeElement;
    //console.log(activeElem.isContentEditable);

    if(activeElem) {
        console.log(activeElem.tagName);
        if(activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA' || activeElem.isContentEditable) {
            // user may be interacting with an <input> or some editable tag. So ignore keystrokes
            return;
        }
    } 

    // Check for g
    if(gFlag === true) {
        gFlag = false;
        if(event.key === 'g') {
            //window.scrollBy(0, -document.body.clientHeight); // gg
            window.scrollBy(0, -document.body.scrollHeight); // gg
            return;
        }
    }

    // Set mark
    if(setMark === true) {
        if(isCharAlpha(event.key) === true) {
            marks[event.key] = [window.scrollX, window.scrollY]; 
            console.log(`Mark set: ${event.key}`);
        } else {
            console.log("Mark setting rejected");
        }
        setMark = false;
        return;
    }

    // Go to mark
    if(gotoMark === true) {
        let markKey = event.key;
        if(markKey in marks) {
            let newX = marks[markKey][0];
            let newY = marks[markKey][1];
            window.scroll(newX, newY);
            console.log(`Goto mark ${markKey}`);
        } else {
            console.log(`Goto mark rejected. Invalid mark ${markKey}`);
        }
        gotoMark = false;
        return;
    }

    // Check if numStr is active
    if(numStr.length > 0) {
        console.log("numstr active");
        if(isCharInt(event.key) === true) {
            numStr += event.key;
            console.log(numStr);
            return;
        }
    }

    console.log(`key: ${event.key}`);
    
    if(event.ctrlKey === true) { // Checking for Ctrl
        if(event.key === 'f') {
            //console.log(event);
            n = getNum();
            console.log(`C-f ${n}`);
            event.preventDefault(); // disable the C-f search
            window.scrollBy(0, n*window.innerHeight); // C-f
        } else if(event.key == 'b') {
            event.preventDefault(); // disable toggling bookmark pane
            n = getNum();
            console.log(`C-b ${n}`);
            window.scrollBy(0, -n*window.innerHeight); // C-b
        } else if(event.key == 'd') {
            event.preventDefault();
            n = getNum();
            console.log(`C-d ${n}`);
            window.scrollBy(0, n*Math.floor(window.innerHeight/2)); // C-d ie, half C-f
        } else if(event.key == 'u') {
            event.preventDefault();
            n = getNum();
            console.log(`C-u ${n}`);
            window.scrollBy(0, -n*Math.floor(window.innerHeight/2)); // C-u ie, half C-b
        }
    } else if((event.key>'0' && event.key<='9') === true) { // a num other than 0. Coz 0 is beginning in Moolenar
        numStr += event.key;
    } else if(event.key == 'm') { // m ie, set motion mark
        setMark = true;        
    } else if(event.key == '`' || event.key == "'") { // ` ie, go to motion mark
        event.preventDefault();
        gotoMark = true;        
    } else if(event.key == 'g') { // g
        gFlag = true;
    } else if(event.key == 'j') {    // up
        n = getNum();
        console.log(`j ${n}`);
        window.scrollBy(0,  n*25);
    } else if(event.key == 'k') {   // down
        n = getNum();
        console.log(`k ${n}`);
        window.scrollBy(0,  -n*25);
    } else if(event.key == 'h') {    // up
        n = getNum();
        console.log(`h ${n}`);
        window.scrollBy(-n*25, 0);
    } else if(event.key == 'l') {    // up
        n = getNum();
        console.log(`l ${n}`);
        window.scrollBy(n*25, 0);
    } else if(event.key == 'd') {   // close tab
        event.preventDefault();
        n = getNum();
        console.log('d press');
        browser.runtime.sendMessage({"task": "close-tab"});
    } else if(event.key == 'G') {   // Bottom of page
        //window.scrollBy(0, document.body.offsetHeight); // negative for 'gg' effect
        //window.scrollBy(0, document.body.clientHeight); // negative for 'gg' effect
        n = getNum();
        console.log("G");
        window.scrollBy(0, document.body.scrollHeight);
    } else if(event.key == 'R') {   // Reload without cache #CUSTOM#
        n = getNum();
        window.location.reload();
    } else if(event.key == 'r') {   // Reload from cache
        n = getNum();
        window.location.reload(false);
    } else if(event.key == '^' || event.key == '0') {   // go to left-most margin
        n = getNum();
        console.log("^ or 0 pressed");
        window.scrollBy(-window.innerHeight, 0);
    } else if(event.key == '$') {   // go to right-most margin
        n = getNum();
        console.log("$ pressed");
        window.scrollBy(window.innerHeight, 0);
    } else if(event.key == 'H') {   // go to back
        n = getNum();
        console.log(`back: ${n}`);
        history.go(-n);
    } else if(event.key == 'L') {   // go to forward
        n = getNum();
        console.log(`forward: ${n}`);
        history.go(n);
    } else if(event.key == 'J') {   // go to next tab
        n = getNum();
        browser.runtime.sendMessage({"task": "J-or-K", "n": n});
        console.log(`J: ${n}`);
    } else if(event.key == 'K') {   // go to previous tab
        n = getNum();
        browser.runtime.sendMessage({"task": "J-or-K", "n": -n});
        console.log(`K: ${n}`);
    } else if(event.key == 'U') {   // undo close tab. Restore last closed tab
        n = getNum();
        browser.runtime.sendMessage({"task": "U"});
        console.log(`K: ${n}`);
    }

});


/*
* Needs two modes. Figure out if user is editing.
* Trigger C-f
* JK tab
* HL back forward
* See caret (F7): https://support.mozilla.org/en-US/kb/advanced-panel-settings-in-firefox#w_accessibility
* WARN: numStr is not always cleared
* right click menu: enable/disable menu item
* Caret: highlight and copy to clipboard highlighted text
* add a small bottom margin text box to accept ex cmds
* yy => copy current url to clipboard
* gT
* search (difficult in vanilla) https://stackoverflow.com/questions/32130130/how-to-highlight-all-occurrences-of-a-word-on-a-page-with-javascript-or-jquery
* highlight: https://developer.mozilla.org/en-US/docs/Web/API/Selection, https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection, https://discourse.mozilla.org/t/search-and-highlight-the-word-in-html/18883/8
* TIPS: https://dev.to/hellomeghna/tips-to-write-better-conditionals-in-javascript-2189
* tab-completion
* scroll active element instead of doc
* CONCERN: drop down active, but j scrolls
* HOPPER: C-b first time triggers bookmark  //Seems to have disappeared
* HOPPER: reload and positional marks are reset
* HOPPER: pos marks position changes if window size changes (minimise oder maximise oder resize)
* HOPPER: d cannot close new (unnamed) tabs or pdfs or unable to load pages
* jumplist for pos-mark nav
* convert HLJK to use nums. For HL use history.go()
* get curr tab to new window
* C-g : That's a no-go on the last.
* U: undo close tab
* D: duptab
* delete recent history command. C-H will set flag and follow up on that.
* detach tab to make a window. C-W will set flag. So `C-W T` should do it.
******
* gg
* positional marks (`)
* Numeric mod Number(x)
* G,gg: wikipedia, pytorch tut
* https://www.hackerrank.com/x/tests/all/688004/questions/777900/try J not working
* ^ or 0 left margin
* $ right margin
* h,l horiz scroll
* editable tags: //ENTIRE INPUT USED
* HOPPER: ignore textarea(found at https://app.monkeylearn.com/main/classifiers/cl_pi3C7JiL/) and iscontenteditable (found at teams.microsoft.com) along with input
* zoom //NOT NEEDED USE C-+ and C--
  - textarea (not disabled)
  - input.text (not disabled)   //disabled means cannot be focused. So no problem.
  - input.password
  - input.datetime-local
  - input.email
  - input.month
  - input.number
  - input.search
  - input.tel
  - input.url
  - input.week
  - no type (same as input.text) //will be automatically added. So no problem.
******INFO******
content script blocked at ff by default:
 - accounts-static.cdn.mozilla.net
 - accounts.firefox.com
 - addons.cdn.mozilla.net
 - addons.mozilla.org
 - api.accounts.firefox.com
 - content.cdn.mozilla.net
 - content.cdn.mozilla.net
 - discovery.addons.mozilla.org
 - input.mozilla.org
 - install.mozilla.org
 - oauth.accounts.firefox.com
 - profile.accounts.firefox.com
 - support.mozilla.org
 - sync.services.mozilla.com
 - testpilot.firefox.com
content script can use following WE api:
 - extension:
     - getURL()
     - inIncognitoContext
 - runtime:
     - connect()
     - getManifest()
     - getURL()
     - onConnect
     - onMessage
     - sendMessage()
 - i18n:
     - getMessage()
     - getAcceptLanguages()
     - getUILanguage()
     - detectLanguage()
 - menus:
     - getTargetElement
 - storage
*/
