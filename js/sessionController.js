window.onload = (event) => {
    let tileList = document.getElementById('tileList');

    for (i = 1; i < 13; i++) {
        let num = i.toString();

        let tile = document.createElement('li');
        tile.id = "tile"+num;
        tile.className = "tile";

        let tileImage = document.createElement('div');
        tileImage.className = "tileImage";
        tileImage.id = "tileImage"+num;
        tileImage.style.backgroundImage = "url('./images/people/"+i+".jpg')"; 
        tileImage.onclick = function() {
            expand("tile"+num);
        }
        tile.appendChild(tileImage);
        
        let name = document.createElement('div');
        name.className = "name";
        name.id = "name"+num;
        name.textContent = "Student "+num;
        
        let videoToggle = document.createElement('div');
        videoToggle.className = "videoToggle"
        videoToggle.id = "video"+num;
        videoToggle.onclick = function() {
            toggleVideo(videoToggle.id, tileImage.id, name.id);
        }
        let audioToggle = document.createElement('div');
        audioToggle.className = "audioToggle"
        audioToggle.id = "audio"+num.toString();;
        audioToggle.onclick = function() {
            toggleAudio('audio'+num)
        }
        name.appendChild(videoToggle);
        name.appendChild(audioToggle);
        tile.appendChild(name);
        tileList.appendChild(tile);
    }
};

function toggleVideo(tile, tileImage, name) {
    if (document.getElementById(tile).className === 'videoToggle') {
        document.getElementById(tile).className = 'videoToggle off';

        //Remove bg image
        document.getElementById(tileImage).style.display = "none";
        
        //Move name up and center
        document.getElementById(name).className = "name noVideo";
    }
    else {
        document.getElementById(tile).className = 'videoToggle';
        
        //Add bg image
        document.getElementById(tileImage).style.display = "block";
        
        //Move name down
        document.getElementById(name).className = "name";
    }
}

function toggleAudio(tile) {
    if (document.getElementById(tile).className === 'audioToggle') {
        document.getElementById(tile).className = 'audioToggle off';
    }
    else {
        document.getElementById(tile).className = 'audioToggle';
    }
}

function expand(tile) {
    if (document.getElementById(tile).className === 'tile') {
        //Reset any other tiles
        let ul = document.getElementById("tileList");
        let items = ul.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].className = 'tile';
        }
        document.getElementById(tile).className = 'tile expanded';

        //Activate tile specific menu
        document.getElementById('tileToolbar').className = "active";
    }
    else if (document.getElementById(tile).className === 'tile expanded') {
        document.getElementById(tile).className = 'tile';

        //Remove tile specific menu
        document.getElementById('tileToolbar').className = "";
    }
}

function toggleInformation(tool) {
    if (document.getElementById(tool).className === 'active') {
        document.getElementById(tool).className = '';
    }
    else {
        document.getElementById(tool).className = 'active';
    }
}

function togglePanel(panel) {
    if (document.getElementById('panel').className === 'active') {
        document.getElementById('panel').className = '';
        document.getElementById('panel-'+panel).style.display = 'none';
        document.getElementById(panel).className = '';
        //Chat specific
        if (panel === 'chat') {
        document.getElementById('chatThread').className = '';
        }
    }
    else {
        document.getElementById('panel').className = 'active';
        document.getElementById('panel-'+panel).style.display = 'block';
        document.getElementById(panel).className = 'active';
    }
}

function toggleChalkboard() {
    if (document.getElementById('chalkboardContainer').className === 'active') {
    document.getElementById('chalkboardContainer').className = '';
    document.getElementById('chalk').className = '';
    }
    else {
    document.getElementById('chalkboardContainer').className = 'active';
    document.getElementById('chalk').className = 'active';
    if (!chalkActivated) {
        setTimeout( function() {
        initializePaper();
        }, 1000);      
    }
    }
}

function toggleThread(thread) {
    if (thread === 'exit') {
        document.getElementById('chatThread').className = '';
    }
    else {
        document.getElementById('chatThread').className = 'active';
        document.getElementById('threadName').textContent = thread;
    }
}    