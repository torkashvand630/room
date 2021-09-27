var screenControler = {
    screenShareStatus: 0,
    screenShareRemoteStatus: 0,
    screanShareRecquestTime: null,

    screanShareClick: function (t) {

        if (screenControler.screenShareRemoteStatus) {

            return;
        }
        if (screenControler.screenShareStatus) {
            webrtClient.stopScreen();
           // panelControler.activeBoard();
            return;

        }
        else {

            screenControler.startScreenShare();
        }

        // connectToScreenShare();

        // startScreenShare();
    },
    startScreenShare: function () {
        if (screenControler.screenShareRemoteStatus) {
            console.log("screenShareRemoteStatus = 1;");
            return;
        }
        iconDisablVidu(4000, MainNavBar);
        iconDisablVidu(4000, iconViduPanel);
        //var obj2 = document.getElementById('boardContainer');
        //iconDisablVidu(6000, obj2);
        var d = new Date();
        screenControler.screanShareRecquestTime = d.getTime();
        webrtClient.startScreen();
        return;
    },
    stopOwnScreenShare: function () {
        webrtClient.stopScreen();
    },
    stopScsh1000: function () {
        webrtClient.stopScreen();
        return;

        


    },

    disconnectFromScreenShare: function () {
        //  console.warn("desconnect from screen share...");
        //document.getElementsByClassName('startScreenBtn')[0].style.display = "block";
        //document.getElementsByClassName('stopScreenBtn')[0].style.display = "none";
        //screenSharePanel.style.display = "none";
        //boardHtmlpanel.style.display = "block";
        //  $(".farfar").css("color", "red");
       // $(".screanShareIcon").css("color", "black");
        screenControler.screenShareStatus = 0;
      //  layout.resizeBoard();
        //setTimeout(function () {
        //    layout.startRender();
        //    // resizingVideoBox();
        //}, 1000);

        //moveBoardPanel();

    },
    connectToScreenShare: function () {
        //if (layout.sessionPanelPosetion == 2) {
        //    document.getElementById('newVideosBox').style.height = layout.sessionPanelheight + "px";

        //}
        panelControler.activeScreen();
        //screenSharePanel.style.display = "block";
        //boardHtmlpanel.style.display = "none";
        //$(".farfar").css("color", "black");
        //$(".screanShareIcon").css("color", "red");
       // layout.resizeBoard();
       // setTimeout(function () { resizingVideoBox(); }, 1000);
        // moveCenterPanel();  
    },
}
