let state = false;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'CannonerTrigger') {
        state = !state;  
    }else{
        state = !state;  
    }
});