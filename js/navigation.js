var toggle = false;

function changeIframeSource() {
    if (toggle == false) {
        var iframe = document.querySelector('.mainFrame');
        var newSource = 'html/testOne.html';
        iframe.src = newSource;
    }
    else {
        var iframe = document.querySelector('.mainFrame');
        var newSource = 'html/testTwo.html';
        iframe.src = newSource;
    }
    toggle = !toggle;
}

setInterval(changeIframeSource, 1000);