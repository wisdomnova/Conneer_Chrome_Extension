let observerAttached = false;

let isset = false;

let once = false;

let twice = false;

let thrice = false;

let state = false;

let link_lists = [
    "https://www.linkedin.com/jobs/collections/remote-jobs/",

    "https://www.linkedin.com/jobs/collections/recommended/",
    
    "https://www.linkedin.com/jobs/collections/it-services-and-it-consulting/",
    
    "https://www.linkedin.com/jobs/collections/easy-apply/",
    
    "https://www.linkedin.com/jobs/collections/small-business/",

    "https://www.linkedin.com/jobs/search/",
];

// Array of deep hex colors
const deepColors = [
    "#2c3e50", // Midnight Blue
    "#8e44ad", // Purple
    "#2980b9", // Strong Blue
    "#16a085", // Dark Teal
    "#f39c12", // Golden Orange
    "#c0392b", // Deep Red
    "#27ae60", // Deep Green
    "#34495e", // Dark Slate Gray
    "#d35400", // Deep Orange
    "#7f8c8d",  // Grayish Dark Cyan
    "#B01717" // Deep Orange
];

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * deepColors.length);
    return "3px solid "+deepColors[randomIndex];
}

async function convertImageToFormat(imageUrl, format = 'image/png') {
    if(imageUrl !== "https://earnest-medovik-6139b7.netlify.app/greyed.png"){
        // console.log('Full Image');
        try {
            // Fetch the image
            const response = await fetch(imageUrl, { mode: 'cors' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
            const blob = await response.blob();
    
            // Create an HTMLImageElement from the blob
            const img = document.createElement('img');
            const blobUrl = URL.createObjectURL(blob);
            img.src = blobUrl;
    
            // Wait for the image to load
            await new Promise((resolve) => {
                img.onload = resolve;
            });
    
            // Draw the image onto a canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
    
            // Convert the canvas to the desired format (PNG or JPEG)
            const dataUrl = canvas.toDataURL(format);
            
            return dataUrl;

        } catch (error) {
            // console.log('Error');
            //console.error('Error converting image:', error);
            return imageUrl;
        }
    }else{
        // console.log('Grey Image');
        return imageUrl;
    }
};

function saveLink(its){
    localStorage.setItem('lastUrl', its);
}

function getLastLink(){
    let a = localStorage.getItem('lastUrl');
    return a;
}

function removeFullExtension(){
    const cannonier_success_tab = document.getElementById('cannonier-success-tab');
    const cannonierTab = document.getElementById('cannonier-tab');
    const cannonierTrigger = document.getElementById('cannonier-trigger');
    
    if(cannonierTab){
        cannonierTab.remove();
    }
    
    if(cannonierTrigger){
        cannonierTrigger.remove();
    }

    if(cannonier_success_tab){
        cannonier_success_tab.remove();
    }
};

function inspect(){
    let url = window.location.href;
    let split_url = url.split('?')[0];

    if(link_lists.includes(split_url) == true){
        // console.log('Adding');
        loadExtension();

    }else{
        // console.log('Removing');
        removeFullExtension();
    }

    saveLink(split_url);
}

function fetchLists(){
    const ulElement = document.querySelector('.scaffold-layout__list-container');
    const liElements = ulElement.querySelectorAll('li');
    const matchingLiElements = Array.from(liElements).filter(li => {
    const classList = li.classList;
        return classList.contains('scaffold-layout__list-item') && !classList.contains('jobs-search-results__job-card-search--generic-occludable-area');   
    });
    return matchingLiElements;
};

function loadExtension(){
    let _jobs = fetchLists();

    _jobs.forEach(function(item,index,count){

        item.addEventListener('click', function(){
            isset = true;
            removeFullExtension();
            replaceExtension();
        });

    });
}

function removehreftag(input){
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    const anchorTag = tempDiv.querySelector('a');
    return anchorTag ? anchorTag.textContent : input;
}


function replaceExtension(){
    let job_data_holder = document.querySelector('.jobs-details__main-content');
    let job_holder_job_location_prop = document.querySelector('.job-details-jobs-unified-top-card__primary-description-container');

    let job_holder_company_img = (job_data_holder.getElementsByClassName('ivm-view-attr__img--centered EntityPhoto-square-1   evi-image lazy-image ember-view')[0] !== undefined
    ? job_data_holder.getElementsByClassName('ivm-view-attr__img--centered EntityPhoto-square-1   evi-image lazy-image ember-view')[0].src
    : "https://earnest-medovik-6139b7.netlify.app/greyed.png");

    let job_holder_company_name_prop =  (job_data_holder.getElementsByClassName('app-aware-link ')[1] == undefined 
    ? job_data_holder.getElementsByClassName('job-details-jobs-unified-top-card__company-name')[0].innerHTML.replace("<!---->","").replace("<!---->","").replace("","").trim() 
    : job_data_holder.getElementsByClassName('app-aware-link ')[1].innerHTML.replace("<!---->","").replace("<!---->","").replace('<span class="white-space-pre"> </span>','').trim());
    
    let job_holder_company_name = removehreftag(job_holder_company_name_prop);

    let job_holder_job_name_prop = job_data_holder.getElementsByClassName('t-24 t-bold inline')[0];
    let job_holder_job_name = job_holder_job_name_prop.querySelectorAll('.ember-view')[0].innerHTML;

    let job_holder_job_url = window.location.href;

    // let job_holder_job_description_prop = job_data_holder.getElementsByClassName('jobs-description-content__text--stretch')[0];
    // let job_holder_job_description = job_holder_job_description_prop.getElementsByClassName('job-details-module__content')[0].innerHTML;

    let job_holder_job_description_prop = job_data_holder.querySelectorAll('#job-details')[0];
    let job_holder_job_description = job_holder_job_description_prop.querySelector('div').innerHTML;


    let job_holder_job_location = job_holder_job_location_prop.querySelectorAll('span')[0].innerHTML.replace("<!---->","").replace("<!---->","");

    const cannonierTab = document.createElement('div');
    cannonierTab.className = 'cannonier-tab-holder cannonier-non-display';
    cannonierTab.id = 'cannonier-tab';
    
    const cannonierTabCloser = document.createElement('div');
    cannonierTabCloser.className = 'cannonier-tab-closer';
    cannonierTab.appendChild(cannonierTabCloser);
    
    const cannonierCloseSpan = document.createElement('span');
    cannonierCloseSpan.className = 'cannonier-tab-closer-span';
    cannonierCloseSpan.id = 'cannonier-close';
    cannonierCloseSpan.innerHTML = '&times;';
    cannonierTabCloser.appendChild(cannonierCloseSpan);
    
    const cannonierTopRow = document.createElement('div');
    cannonierTopRow.className = 'cannonier-top-row';
    cannonierTab.appendChild(cannonierTopRow);
    
    const cannonierTabImgHolder = document.createElement('div');
    cannonierTabImgHolder.className = 'cannonier-tab-img-holder';
    cannonierTopRow.appendChild(cannonierTabImgHolder);
    
    const cannonierTabImg = document.createElement('img');
    cannonierTabImg.className = 'cannonier-tab-img-holder-img';
    cannonierTabImg.src = job_holder_company_img;
    cannonierTabImg.alt = '';
    cannonierTabImgHolder.appendChild(cannonierTabImg);
    
    const cannonierTopColumn = document.createElement('div');
    cannonierTopColumn.className = 'cannonier-top-column';
    cannonierTopRow.appendChild(cannonierTopColumn);
    
    const jobNameSpan = document.createElement('span');
    jobNameSpan.className = 'connonier-tab-job-name';
    jobNameSpan.innerHTML = job_holder_job_name;
    cannonierTopColumn.appendChild(jobNameSpan);
    
    const jobCalisneticsSpan = document.createElement('span');
    jobCalisneticsSpan.className = 'connonier-tab-job-calisnetics';
    jobCalisneticsSpan.innerHTML = `${job_holder_company_name} | ${job_holder_job_location}`;
    cannonierTopColumn.appendChild(jobCalisneticsSpan);
    
    const cannonierContentHolder = document.createElement('div');
    cannonierContentHolder.className = 'cannonier-content-holder';
    cannonierTab.appendChild(cannonierContentHolder);
    
    const createInputHolder = (labelText, inputId, inputValue) => {
        const inputHolder = document.createElement('div');
        inputHolder.className = 'cannonier-input-holder';
        
        const inputHolderSpan = document.createElement('span');
        inputHolderSpan.className = 'cannonier-input-holder-span';
        inputHolderSpan.innerHTML = labelText;
        inputHolder.appendChild(inputHolderSpan);
        
        const input = document.createElement('input');
        input.className = 'cannonier-input-holder-input';
        input.type = 'text';
        input.id = inputId;
        input.value = inputValue;
        inputHolder.appendChild(input);
        
        return inputHolder;
    };
    
    cannonierContentHolder.appendChild(createInputHolder('Company', 'cannonier_company_name', job_holder_company_name));
    cannonierContentHolder.appendChild(createInputHolder('Job Title', 'cannonier_job_name', job_holder_job_name));
    cannonierContentHolder.appendChild(createInputHolder('Job Location', 'cannonier_job_location', job_holder_job_location));
    cannonierContentHolder.appendChild(createInputHolder('Job Link', 'cannonier_job_url', job_holder_job_url));
    
    const descriptionHolder = document.createElement('div');
    descriptionHolder.className = 'cannonier-input-holder';
    
    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = 'cannonier-input-holder-span';
    descriptionSpan.innerHTML = 'Description';
    descriptionHolder.appendChild(descriptionSpan);
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'cannonier-content-editable';
    descriptionDiv.contentEditable = 'true';
    descriptionDiv.innerHTML = job_holder_job_description;
    descriptionHolder.appendChild(descriptionDiv);
    
    cannonierContentHolder.appendChild(descriptionHolder);
    
    const cannonierButtonHolder = document.createElement('div');
    cannonierButtonHolder.className = 'cannonier-button-holder';

    // added
    const cannonierLoader = document.createElement('div');
    cannonierLoader.className = 'cannonier_tab-loader-band cannonier-non-display';
    
    // added
    cannonierButtonHolder.appendChild(cannonierLoader);

    const saveButton = document.createElement('button');
    saveButton.className = 'cannonier-button-holder-button';
    saveButton.innerHTML = 'Save to board';
    saveButton.id = 'cannonier-save-btn';
    cannonierButtonHolder.appendChild(saveButton);

    // cannonierContentHolder.appendChild(cannonierButtonHolder);
    cannonierTab.appendChild(cannonierButtonHolder);
    
    const cannonierTrigger = document.createElement('div');
    cannonierTrigger.className = 'connonier-trigger-btn cannonier-display';
    cannonierTrigger.id = 'cannonier-trigger';
    
    const cannonierTriggerImg = document.createElement('img');
    cannonierTriggerImg.src = 'https://earnest-medovik-6139b7.netlify.app/icon-128.png';
    cannonierTriggerImg.className = 'connonier-trigger-btn-img cannonier-display';
    cannonierTriggerImg.id = 'cannonier-trigger-img';
    cannonierTriggerImg.alt = '';
    cannonierTrigger.appendChild(cannonierTriggerImg);
    
    document.body.appendChild(cannonierTab);
    document.body.appendChild(cannonierTrigger);
    triggers();
}

function checkUserCookie() {
    chrome.runtime.sendMessage({message: "UserInfo"}, (response) => {
        if(response){
            let extension_user = response;    
            if(extension_user == null){
                window.open('https://app.conneer.com/login', '_blank');
            }else if(extension_user == undefined){
                window.open('https://app.conneer.com/signup', '_blank');
            }else{
                let extension_user_id = extension_user.id;
                InitiateSave(extension_user_id);
            }
        }
    });
};

function InitiateSave(userid){
        //Parse First Item Child
        const contenteditableDiv = document.querySelector('.cannonier-content-editable');
        const initialTextNode = contenteditableDiv.firstChild;
        // Check if the initial node is a text node
        if (initialTextNode.nodeType === Node.TEXT_NODE) {
            // If it's a text node, wrap it in a span
            const span = document.createElement('span');
            span.textContent = initialTextNode.textContent;
            contenteditableDiv.insertBefore(span, initialTextNode);
            contenteditableDiv.removeChild(initialTextNode);
        }

        let job_user_id = userid;
        let job_holder_company_name = document.querySelector('#cannonier_company_name').value;
        let job_holder_company_img = document.querySelector('.cannonier-tab-img-holder-img').src;
        let job_holder_job_name = document.querySelector('#cannonier_job_name').value;
        let job_holder_job_location = document.querySelector('#cannonier_job_location').value;
        let job_holder_job_url = document.querySelector('#cannonier_job_url').value;
        let job_holder_job_description = document.querySelector('.cannonier-content-editable').innerHTML;

        let loader_band = document.querySelector('.cannonier_tab-loader-band');
        let loader_company_name = document.querySelector('#cannonier_company_name');
        let loader_job_name = document.querySelector('#cannonier_job_name');
        let loader_job_location = document.querySelector('#cannonier_job_location');
        let loader_job_url = document.querySelector('#cannonier_job_url');
        let loader_job_description = document.querySelector('.cannonier-content-editable');

        let insp = {
            "user_id" : job_user_id,
            "args" : [{
                "created" : new Date().toISOString(),
                "type" : "Saved",
                "tag_color" : getRandomColor(),
                "company_name" : job_holder_company_name,
                "company_logo" : job_holder_company_img,
                "job_title" : job_holder_job_name,
                "job_location" : job_holder_job_location,
                "job_link" : job_holder_job_url,
                "job_description" : DOMPurify.sanitize(job_holder_job_description),
                "job_salary" : "",
                "notes" : [],
                "tasks" : [],
            }]
        };
        loader_band.classList.replace('cannonier-non-display','cannonier-display');
        loader_company_name.disabled = true;
        loader_job_name.disabled = true;
        loader_job_location.disabled = true;
        loader_job_url.disabled = true;
        loader_job_description.contentEditable = false;

        if(insp.args[0].company_name.length >0 && insp.args[0].company_logo.length >0 && insp.args[0].job_title.length >0 && insp.args[0].job_location.length >0 && insp.args[0].job_link.length >0){
            saveboard(insp);
        }else{

            loader_band.classList.replace('cannonier-display','cannonier-non-display');
            loader_company_name.disabled = false;
            loader_job_name.disabled = false;
            loader_job_location.disabled = false;
            loader_job_url.disabled = false;
            loader_job_description.contentEditable = true;
            alert('Some fields are missing');   
        }
};

function triggers(){
    let cannonier_trigger = document.querySelector('#cannonier-trigger');
    let cannonier_img = document.querySelector('#cannonier-trigger-img');
    let cannonier_tab = document.querySelector('#cannonier-tab');
    let cannonier_close = document.querySelector('#cannonier-close');
    let cannonier_save = document.querySelector('#cannonier-save-btn');

    cannonier_img.addEventListener('click', function(){
        let cookiestate = updateCookie();
        cannonier_trigger.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_img.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_tab.classList.replace('cannonier-non-display','cannonier-display');
        
    });
    cannonier_close.addEventListener('click', function(){
        cannonier_tab.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_trigger.classList.replace('cannonier-non-display','cannonier-display');
        cannonier_img.classList.replace('cannonier-non-display','cannonier-display');
    });
    cannonier_save.addEventListener('click', function(){
        checkUserCookie();
    });
};

function saveboard(params) {
    let url = 'https://x2qg-wetb-81br.n7c.xano.io/api:kx6TxxUG/add_job';

    convertImageToFormat(params.args[0].company_logo, 'image/png').then(convertedUrl => {

        params.args[0].company_logo = convertedUrl;

        // console.log(params);

        const xhttp = new XMLHttpRequest();
    
        xhttp.open('POST', url, true);
        
        xhttp.setRequestHeader('Content-Type', 'application/json');
        
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status < 300) {
    
                    const response = JSON.parse(xhttp.responseText);
                    if(response == "Limit Exceeded"){
                        pasteFailure();
                    }else{
                        pasteSuccess();
                    }
                    
                } else {
                    // console.log(('Request failed: ' + xhttp.statusText));
                    alert('Something went wrong');
    
                    let loader_band = document.querySelector('.cannonier_tab-loader-band');
                    let loader_company_name = document.querySelector('#cannonier_company_name');
                    let loader_job_name = document.querySelector('#cannonier_job_name');
                    let loader_job_location = document.querySelector('#cannonier_job_location');
                    let loader_job_url = document.querySelector('#cannonier_job_url');
                    let loader_job_description = document.querySelector('.cannonier-content-editable');
    
                    loader_band.classList.replace('cannonier-display','cannonier-non-display');
                    loader_company_name.disabled = false;
                    loader_job_name.disabled = false;
                    loader_job_location.disabled = false;
                    loader_job_url.disabled = false;
                    loader_job_description.contentEditable = true;
                }
            }
        };
        xhttp.send(JSON.stringify(params));
    });
};

function updateCookie(){
    chrome.runtime.sendMessage({ message: "UpdateCookie" }, (response) => {
        let data = response;
    });
};

function checkEmptyTrait(){
    let currentHref = window.location.href;

    let currentHrefSplit = currentHref.split('?')[0];

    if(link_lists.includes(currentHrefSplit) == true){

        if(isset == true){

            setFullPage();
            
        }else{

            setEmptyPage();
        }

    }
};

function setFullPage(){
    let cannonier_img = document.querySelector('#cannonier-trigger-img');
    cannonier_img.click();
};

function setEmptyPage(){
    const cannonierTab = document.createElement('div');
    cannonierTab.className = 'cannonier-tab-holder cannonier-non-display';
    cannonierTab.id = 'cannonier-tab';
    
    const cannonierTabCloser = document.createElement('div');
    cannonierTabCloser.className = 'cannonier-tab-closer';
    cannonierTab.appendChild(cannonierTabCloser);
    
    const cannonierCloseSpan = document.createElement('span');
    cannonierCloseSpan.className = 'cannonier-tab-closer-span';
    cannonierCloseSpan.id = 'cannonier-close';
    cannonierCloseSpan.innerHTML = '&times;';
    cannonierTabCloser.appendChild(cannonierCloseSpan);
    
    const cannonierContentHolder = document.createElement('div');
    cannonierContentHolder.className = 'cannonier-content-holder';
    cannonierTab.appendChild(cannonierContentHolder);
    
    const createInputHolder = (labelText, inputId, inputValue) => {
        const inputHolder = document.createElement('div');
        inputHolder.className = 'cannonier-input-holder';
        
        const inputHolderSpan = document.createElement('span');
        inputHolderSpan.className = 'cannonier-input-holder-span';
        inputHolderSpan.innerHTML = labelText;
        inputHolder.appendChild(inputHolderSpan);
        
        const input = document.createElement('input');
        input.className = 'cannonier-input-holder-input';
        input.type = 'text';
        input.id = inputId;
        input.value = inputValue;
        inputHolder.appendChild(input);
        
        return inputHolder;
    };
    
    cannonierContentHolder.appendChild(createInputHolder('Company', 'cannonier_company_name', ''));
    cannonierContentHolder.appendChild(createInputHolder('Job Title', 'cannonier_job_name', ''));
    cannonierContentHolder.appendChild(createInputHolder('Job Location', 'cannonier_job_location', ''));
    cannonierContentHolder.appendChild(createInputHolder('Job Link', 'cannonier_job_url', window.location.href));
    
    const descriptionHolder = document.createElement('div');
    descriptionHolder.className = 'cannonier-input-holder';
    
    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = 'cannonier-input-holder-span';
    descriptionSpan.innerHTML = 'Description';
    descriptionHolder.appendChild(descriptionSpan);
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'cannonier-content-editable';
    descriptionDiv.contentEditable = 'true';
    descriptionDiv.innerHTML = '';
    descriptionHolder.appendChild(descriptionDiv);
    
    cannonierContentHolder.appendChild(descriptionHolder);
    
    const cannonierButtonHolder = document.createElement('div');
    cannonierButtonHolder.className = 'cannonier-button-holder';

    const cannonierLoader = document.createElement('div');
    cannonierLoader.className = 'cannonier_tab-loader-band cannonier-non-display';
    
    cannonierButtonHolder.appendChild(cannonierLoader);

    const saveButton = document.createElement('button');
    saveButton.className = 'cannonier-button-holder-button';
    saveButton.innerHTML = 'Save to board';
    saveButton.id = 'cannonier-save-btn';
    cannonierButtonHolder.appendChild(saveButton);
    
    // cannonierContentHolder.appendChild(cannonierButtonHolder);
    cannonierTab.appendChild(cannonierButtonHolder);
    
    const cannonierTrigger = document.createElement('div');
    cannonierTrigger.className = 'connonier-trigger-btn cannonier-display';
    cannonierTrigger.id = 'cannonier-trigger';
    
    const cannonierTriggerImg = document.createElement('img');
    cannonierTriggerImg.src = 'https://earnest-medovik-6139b7.netlify.app/icon-128.png';
    cannonierTriggerImg.className = 'connonier-trigger-btn-img cannonier-display';
    cannonierTriggerImg.id = 'cannonier-trigger-img';
    cannonierTriggerImg.alt = '';
    cannonierTrigger.appendChild(cannonierTriggerImg);
    
    document.body.appendChild(cannonierTab);
    document.body.appendChild(cannonierTrigger);

    complextriggers();
};

function checkUserCookie_Action() {
    chrome.runtime.sendMessage({message: "UserInfo"}, (response) => {
        if(response){
            let extension_user = response;    
            if(extension_user == null){
                window.open('https://app.conneer.com/login', '_blank');
            }else if(extension_user == undefined){
                window.open('https://app.conneer.com/signup', '_blank');
            }else{
                let extension_user_id = extension_user.id;
                InitiateSave_Action(extension_user_id);
            }
        }
    });
};

function InitiateSave_Action(userid){
        let job_user_id = userid;
        let job_holder_company_name = document.querySelector('#cannonier_company_name').value;
        let job_holder_company_img = "https://earnest-medovik-6139b7.netlify.app/greyed.png";
        let job_holder_job_name = document.querySelector('#cannonier_job_name').value;
        let job_holder_job_location = document.querySelector('#cannonier_job_location').value;
        let job_holder_job_url = document.querySelector('#cannonier_job_url').value;
        let job_holder_job_description = document.querySelector('.cannonier-content-editable').innerHTML;

        let loader_band = document.querySelector('.cannonier_tab-loader-band');
        let loader_company_name = document.querySelector('#cannonier_company_name');
        let loader_job_name = document.querySelector('#cannonier_job_name');
        let loader_job_location = document.querySelector('#cannonier_job_location');
        let loader_job_url = document.querySelector('#cannonier_job_url');
        let loader_job_description = document.querySelector('.cannonier-content-editable');

        let insp = {
            "user_id" : job_user_id,
            "args" : [{
                "created" : new Date().toISOString(),
                "type" : "Saved",
                "tag_color" : getRandomColor(),
                "company_name" : job_holder_company_name,
                "company_logo" : job_holder_company_img,
                "job_title" : job_holder_job_name,
                "job_location" : job_holder_job_location,
                "job_link" : job_holder_job_url,
                "job_description" : DOMPurify.sanitize(job_holder_job_description),
                "job_salary" : "",
                "notes" : [],
                "tasks" : [],
            }]
        };

        loader_band.classList.replace('cannonier-non-display','cannonier-display');
        loader_company_name.disabled = true;
        loader_job_name.disabled = true;
        loader_job_location.disabled = true;
        loader_job_url.disabled = true;
        loader_job_description.contentEditable = false;

        if(insp.args[0].company_name.length >0 && insp.args[0].job_title.length >0 && insp.args[0].job_location.length >0 && insp.args[0].job_link.length >0){
            saveboard(insp);
        }else{
            loader_band.classList.replace('cannonier-display','cannonier-non-display');
            loader_company_name.disabled = false;
            loader_job_name.disabled = false;
            loader_job_location.disabled = false;
            loader_job_url.disabled = false;
            loader_job_description.contentEditable = true;
            alert('Some fields are missing');
        }
};

function complextriggers(){
    let cannonier_trigger = document.querySelector('#cannonier-trigger');
    let cannonier_img = document.querySelector('#cannonier-trigger-img');
    let cannonier_tab = document.querySelector('#cannonier-tab');
    let cannonier_close = document.querySelector('#cannonier-close');
    let cannonier_save = document.querySelector('#cannonier-save-btn');

    cannonier_img.addEventListener('click', function(){
        let cookiestate = updateCookie();
        cannonier_trigger.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_img.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_tab.classList.replace('cannonier-non-display','cannonier-display');
        
    });
    cannonier_close.addEventListener('click', function(){
        cannonier_tab.classList.replace('cannonier-display','cannonier-non-display');
        cannonier_trigger.classList.replace('cannonier-non-display','cannonier-display');
        cannonier_img.classList.replace('cannonier-non-display','cannonier-display');
        removeFullExtension();
    });
    cannonier_save.addEventListener('click', function(){
        checkUserCookie_Action();
    });

    cannonier_img.click();
};

function pasteSuccess(){
    removeFullExtension();
    
    // Create main container div
    const cannonierSuccessTab = document.createElement('div');
    cannonierSuccessTab.className = 'cannonier-success-tab cannonier-non-display';
    cannonierSuccessTab.id = 'cannonier-success-tab';

    // Create closer div
    const cannonierSuccessCloser = document.createElement('div');
    cannonierSuccessCloser.className = 'cannonier-success-closer';
    cannonierSuccessTab.appendChild(cannonierSuccessCloser);

    // Create closer span
    const cannonierCloseSpan = document.createElement('span');
    cannonierCloseSpan.className = 'cannonier-success-closer-span';
    cannonierCloseSpan.id = 'cannonier-success-close';
    cannonierCloseSpan.innerHTML = '&times;';
    cannonierSuccessCloser.appendChild(cannonierCloseSpan);

    // Create long tab row div
    const cannonierSuccessLongTabRow = document.createElement('div');
    cannonierSuccessLongTabRow.className = 'cannonier-success-long-tab-row';
    cannonierSuccessTab.appendChild(cannonierSuccessLongTabRow);

    // Create img element
    const cannonierSuccessImg = document.createElement('img');
    cannonierSuccessImg.src = 'https://earnest-medovik-6139b7.netlify.app/icon-128.png';
    cannonierSuccessImg.alt = '';
    cannonierSuccessImg.className = 'cannonier-success-tab-img';
    cannonierSuccessLongTabRow.appendChild(cannonierSuccessImg);

    // Create span for caption
    const cannonierSuccessTabCap = document.createElement('span');
    cannonierSuccessTabCap.className = 'cannonier-success-tab-cap';
    cannonierSuccessTabCap.innerHTML = 'Conneer';
    cannonierSuccessLongTabRow.appendChild(cannonierSuccessTabCap);

    // Create sup element
    const cannonierSuccessTabSup = document.createElement('sup');
    cannonierSuccessTabSup.className = 'cannonier-success-tab-sup';
    cannonierSuccessTabSup.innerHTML = 'TM';
    cannonierSuccessTabCap.appendChild(cannonierSuccessTabSup);

    // Create column long div
    const cannonierSuccessColLong = document.createElement('div');
    cannonierSuccessColLong.className = 'cannonier-success-col-long';
    cannonierSuccessTab.appendChild(cannonierSuccessColLong);

    // Create check text span
    const cannonierSuccessCheckText = document.createElement('span');
    cannonierSuccessCheckText.className = 'cannonier-success-check-text';
    cannonierSuccessCheckText.innerHTML = '&check;';
    cannonierSuccessColLong.appendChild(cannonierSuccessCheckText);

    // Create tab text span
    const cannonierSuccessTabText = document.createElement('span');
    cannonierSuccessTabText.className = 'cannonier-success-tab-text';
    cannonierSuccessTabText.innerHTML = 'Your Job has been saved successfully';
    cannonierSuccessColLong.appendChild(cannonierSuccessTabText);

    // Create button element
    const cannonierSuccessTabDbdBtn = document.createElement('button');
    cannonierSuccessTabDbdBtn.className = 'cannonier-success-tab-dbd-btn';
    cannonierSuccessColLong.appendChild(cannonierSuccessTabDbdBtn);

    // Create anchor element inside button
    const cannonierSuccessTabDbdBtnA = document.createElement('a');
    cannonierSuccessTabDbdBtnA.href = 'https://app.conneer.com/';
    cannonierSuccessTabDbdBtnA.target = '_blank';
    cannonierSuccessTabDbdBtnA.className = 'cannonier-success-tab-dbd-btn-a';
    cannonierSuccessTabDbdBtnA.innerHTML = 'View Dashboard';
    cannonierSuccessTabDbdBtn.appendChild(cannonierSuccessTabDbdBtnA);

    // Append the entire structure to the body or a specific container
    document.body.appendChild(cannonierSuccessTab);

    // let cannonier_success_img = document.querySelector('#cannonier-trigger-img');
    let cannonier_success_tab = document.querySelector('#cannonier-success-tab');
    let cannonier_success_close = document.querySelector('#cannonier-success-close');

    cannonier_success_close.addEventListener('click', function(){
        // cannonier_success_tab.classList.replace('cannonier-display','cannonier-non-display');
        // cannonier_success_img.classList.replace('cannonier-non-display','cannonier-display');
        // cannonier_success_tab.remove();
        removeFullExtension();
        replaceExtension();
    });

    cannonier_success_tab.classList.replace('cannonier-non-display','cannonier-display');
};


function pasteFailure(){
    removeFullExtension();
    
    // Create main container div
    const cannonierSuccessTab = document.createElement('div');
    cannonierSuccessTab.className = 'cannonier-success-tab cannonier-non-display';
    cannonierSuccessTab.id = 'cannonier-success-tab';

    // Create closer div
    const cannonierSuccessCloser = document.createElement('div');
    cannonierSuccessCloser.className = 'cannonier-success-closer';
    cannonierSuccessTab.appendChild(cannonierSuccessCloser);

    // Create closer span
    const cannonierCloseSpan = document.createElement('span');
    cannonierCloseSpan.className = 'cannonier-success-closer-span';
    cannonierCloseSpan.id = 'cannonier-success-close';
    cannonierCloseSpan.innerHTML = '&times;';
    cannonierSuccessCloser.appendChild(cannonierCloseSpan);

    // Create long tab row div
    const cannonierSuccessLongTabRow = document.createElement('div');
    cannonierSuccessLongTabRow.className = 'cannonier-success-long-tab-row';
    cannonierSuccessTab.appendChild(cannonierSuccessLongTabRow);

    // Create img element
    const cannonierSuccessImg = document.createElement('img');
    cannonierSuccessImg.src = 'https://earnest-medovik-6139b7.netlify.app/icon-128.png';
    cannonierSuccessImg.alt = '';
    cannonierSuccessImg.className = 'cannonier-success-tab-img';
    cannonierSuccessLongTabRow.appendChild(cannonierSuccessImg);

    // Create span for caption
    const cannonierSuccessTabCap = document.createElement('span');
    cannonierSuccessTabCap.className = 'cannonier-success-tab-cap';
    cannonierSuccessTabCap.innerHTML = 'Conneer';
    cannonierSuccessLongTabRow.appendChild(cannonierSuccessTabCap);

    // Create sup element
    const cannonierSuccessTabSup = document.createElement('sup');
    cannonierSuccessTabSup.className = 'cannonier-success-tab-sup';
    cannonierSuccessTabSup.innerHTML = 'TM';
    cannonierSuccessTabCap.appendChild(cannonierSuccessTabSup);

    // Create column long div
    const cannonierSuccessColLong = document.createElement('div');
    cannonierSuccessColLong.className = 'cannonier-success-col-long';
    cannonierSuccessTab.appendChild(cannonierSuccessColLong);

    // Create check text span
    const cannonierSuccessCheckText = document.createElement('span');
    cannonierSuccessCheckText.className = 'cannonier-failure-check-text';
    cannonierSuccessCheckText.innerHTML = '&times;';
    cannonierSuccessColLong.appendChild(cannonierSuccessCheckText);

    // Create tab text span
    const cannonierSuccessTabText = document.createElement('span');
    cannonierSuccessTabText.className = 'cannonier-success-tab-text';
    cannonierSuccessTabText.innerHTML = 'You have reached the limit for the free plan';
    cannonierSuccessColLong.appendChild(cannonierSuccessTabText);

    // Create button element
    const cannonierSuccessTabDbdBtn = document.createElement('button');
    cannonierSuccessTabDbdBtn.className = 'cannonier-success-tab-dbd-btn';
    cannonierSuccessColLong.appendChild(cannonierSuccessTabDbdBtn);

    // Create anchor element inside button
    const cannonierSuccessTabDbdBtnA = document.createElement('a');
    cannonierSuccessTabDbdBtnA.href = 'https://app.conneer.com/upgrades';
    cannonierSuccessTabDbdBtnA.target = '_blank';
    cannonierSuccessTabDbdBtnA.className = 'cannonier-success-tab-dbd-btn-a';
    cannonierSuccessTabDbdBtnA.innerHTML = 'Upgrade Account';
    cannonierSuccessTabDbdBtn.appendChild(cannonierSuccessTabDbdBtnA);

    // Append the entire structure to the body or a specific container
    document.body.appendChild(cannonierSuccessTab);

    // let cannonier_success_img = document.querySelector('#cannonier-trigger-img');
    let cannonier_success_tab = document.querySelector('#cannonier-success-tab');
    let cannonier_success_close = document.querySelector('#cannonier-success-close');

    cannonier_success_close.addEventListener('click', function(){
        // cannonier_success_tab.classList.replace('cannonier-display','cannonier-non-display');
        // cannonier_success_img.classList.replace('cannonier-non-display','cannonier-display');
        // cannonier_success_tab.remove();
        removeFullExtension();
        replaceExtension();
    });

    cannonier_success_tab.classList.replace('cannonier-non-display','cannonier-display');
};

const jobNameObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            if(thrice == false){            
                if(document.querySelector('.jobs-details__main-content') && document.querySelector('.jobs-description-content__text--stretch')){
                    // console.log('Added List');
                    isset = true;
                    removeFullExtension();
                    replaceExtension();
                }
            }
        }
    });
});

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            if (document.querySelector('.jobs-details__main-content')){
                if(once == false){
                    // console.log('Added');
                    isset = true;
                    once = true;
                    twice = false;
                    thrice = false;
                    checkDesc();
                }
            } else {
                if(twice == false){
                    removeFullExtension();
                    jobNameObserver.disconnect();
                    // console.log('Removed');
                    isset = false;
                    once = false;
                    twice = true;
                    thrice = true;
                }
            }
        }
    });
});

function checkDesc(){
    let jobTitle = document.querySelector('title');
    jobNameObserver.observe(jobTitle, { childList: true, subtree: true });
}

window.addEventListener('load', function(){
    if(document.querySelector('.jobs-description-content__text--stretch')){
        removeFullExtension();
        replaceExtension();
    }
    observer.observe(document.body, { childList: true, subtree: true });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'CannonerTrigger') {
        checkEmptyTrait();
    }
});