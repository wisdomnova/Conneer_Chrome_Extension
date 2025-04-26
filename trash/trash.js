// chrome.cookies.get({ url: 'https://app.conneer.com/login', name: '_Conneer_SignedIn_User' }, function(cookie) {
//     if (cookie) {
//         const cookieValue = JSON.parse(decodeURIComponent(cookie.value));
//         const currentTime = new Date().getTime();
//         if (currentTime > cookieValue.expiration) {
//             console.log('Cookie has expired');
//             // Optionally remove the expired cookie
//             chrome.cookies.remove({ url: 'https://app.conneer.com/login', name: '_Conneer_SignedIn_User' });
//             chrome.tabs.create({ url: 'https://app.conneer.com/login' }); 
//         }else{
//             console.log('User found:', cookieValue.user);
//             let extension_user = cookieValue.user;
//             let extension_user_id = extension_user.id;
//             let extension_user_plan = extension_user.plan;
//             let extension_user_board_count = extension_user.board_count;
            
//             if(extension_user_plan == "Free"){
//                 if(extension_user_board_count !== 5 ){
//                     InitiateSave_Action(extension_user_id);
//                 }else{
//                     alert('You have reached the limit for the free plan\nPlease see upgrade options on your Conneer Dashboard!');
//                 }
//             }else{
//                 InitiateSave_Action(extension_user_id);
//             }
//         }
//     } else {
//         console.log('not found');
//         chrome.tabs.create({ url: 'https://app.conneer.com/login' }); 
//     }
// });