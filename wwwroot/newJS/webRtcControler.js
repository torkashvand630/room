let webRtcControler = {
    isActive: 0,
    load: function () {
        var obj = document.getElementById('loadingModalHeder');
        setTimeout(() => {
            obj.innerText = 'loading conference script ...';
            console.log(window.CLIENT)
        }, 10000)
        load_script_promise("/" + board.Prefix +"/js/mediasoup-demo-app-min.js?v=1.04")//"http://localhost:3000/mediasoup-demo-app.js?v=1.03")//
            .then(function (script) {
               $('#loadingModal').hide();
            });
      
    },
    click: function () {
        
        var m = { type: 'panelControler', action: 'Conference' };
            var res = mainApp.sendToServer(m);         
    },
    start: function () {
        panelControler.activeConference();
        webRtcControler.isActive = 1;
    },
    parse: function (data) {
    },
    permission: function (per) {
       
        var mic = document.getElementById('soapMic');
        var webcam = document.getElementById('soapWebcam');
        var changwebcam = document.getElementById('soapChangWebcam');
        var share = document.getElementById('soapShare');
        if (mic) {
            if (per.audio) mic.style.display = 'block';
            else mic.style.display = 'none';
        }
        if (webcam) {
            if (per.video) webcam.style.display = 'block';
            else webcam.style.display = 'none';
        }
        if (changwebcam) {
            if (per.video) changwebcam.style.display = 'block';
            else changwebcam.style.display = 'none';
        }
        if (share) {
            if (per.screen) share.style.display = 'block';
            else share.style.display = 'none';
        }

        if (!per.audio && window.CLIENT) {
            window.CLIENT.disableMic();
        }
        if (!per.video && window.CLIENT) window.CLIENT.disableWebcam();
        if (!per.screen && window.CLIENT) window.CLIENT.disableShare();
    },
    firstPermisson: function () {
        var per = board.user.permission;
        webRtcControler.permission(per);
    },

    CHANGEMYPEER: function () {
        if (window.CLIENT) {
            window.CLIENT.CHANGEMYPEER();
        }
        else {
            console.warn('window.CLIENT is null');
        }
    }

}