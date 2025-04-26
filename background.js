let state = false;
let userInfo;

chrome.runtime.onInstalled.addListener(() => {

    fetchUserCookie();

    setTimeout(function(){

        if(userInfo == null || userInfo == undefined){
            chrome.tabs.create({url: "https://app.conneer.com/signup"});
        }

    },200);

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    fetchUserCookie();

    if((request.message === 'UserInfo')){
        sendResponse(userInfo);
    }
    if((request.message === 'UpdateCookie')){
        sendResponse(userInfo);
    }
});

function fetchUserCookie(){
    chrome.cookies.get({ url: 'https://app.conneer.com/', name: '_Conneer_SignedIn_User' }, function(cookie) {
        if(cookie) {
            const cookieValue = JSON.parse(decodeURIComponent(cookie.value));
            const currentTime = new Date().getTime();
            if (currentTime > cookieValue.expiration) {
                userInfo = null;
                chrome.cookies.remove({ url: 'https://app.conneer.com/', name: '_Conneer_SignedIn_User' });
            }else{
                userInfo = cookieValue.user;
                fetchUpdate(cookieValue.user.id);
            }
        }else{
            userInfo = undefined;
        }
    });
}

chrome.action.onClicked.addListener(function(tab) {
    // checkUserCookie();
    chrome.tabs.create({url: "https://app.conneer.com/"});
});

function fetchUpdate(userId) {
    const url = `https://x2qg-wetb-81br.n7c.xano.io/api:kx6TxxUG/current_user?user_id=${encodeURIComponent(userId)}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                state = !state;
                // throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Assuming the response contains the user object directly
            setUserCookie(data);
        })
        .catch(error => {
            state = !state
            // console.error('There was a problem with the fetch operation:', error);
        });
}

function setUserCookie(user) {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Set expiration to 1 month from now

    const cookieDetails = {
        url: 'https://app.conneer.com/', // Replace with the actual domain where you want to set the cookie
        name: '_Conneer_SignedIn_User',
        value: encodeURIComponent(JSON.stringify({
            user: user,
            expiration: expirationDate.getTime()
        })),
        expirationDate: expirationDate.getTime() / 1000, // Convert to seconds since epoch
        path: '/'
    };

    chrome.cookies.set(cookieDetails, function(cookie) {
        if (chrome.runtime.lastError) {
            // console.error('Error setting cookie:', chrome.runtime.lastError);
            state = !state;
        } else {
            state = !state;
            // console.log('Cookie set successfully:', cookie);
        }
    });
}

function checkUserCookie() {
    chrome.cookies.get({ url: 'https://app.conneer.com/', name: '_Conneer_SignedIn_User' }, function(cookie) {
        if (cookie) {
            const cookieValue = JSON.parse(decodeURIComponent(cookie.value));
            const currentTime = new Date().getTime();

            if (currentTime > cookieValue.expiration) {
                // Optionally remove the expired cookie
                chrome.cookies.remove({ url: 'https://app.conneer.com/', name: '_Conneer_SignedIn_User' });
                chrome.tabs.create({ url: 'https://app.conneer.com/login' }); 
            }else{
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id,  {message: "CannonerTrigger"});
                });
            }
        } else {
            chrome.tabs.create({ url: 'https://app.conneer.com/signup' }); 
        }
    });
}