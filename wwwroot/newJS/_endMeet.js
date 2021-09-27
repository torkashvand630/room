meetManager = {
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "end":
                meetManager.exit();
                break;
        }
    },
    exit: function () {
                
        //stopRecordier();finishRecorder();//
        //console.warn("exit555");
        //return;
        if (board.isRecorder)  parent.stopRecordier();
        
        mainApp.AppStatus.isExit = true;
       // mainApp.socket = undefined;
        //if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack) {
        //    try {
        //        webrtClient.stopStream();
        //    }
        //    catch(e){ console.warn("rror"); }

        //}


        //if (screenControler.screenShareStatus) {
        //    try {
        //        screenControler.stopOwnScreenShare();
                
        //    }
        //    catch(e){ console.warn("rror"); }

        //}

        setTimeout(function () {
           // window.location = board.exitUrl;
            //var u = window.location.protocol + "//" + window.location.host + "/room/start/" + board.meetID;
            var u = "/node/" + board.meetID
            //if (board.userName != '2')
                window.location = u;
            //else console.log("username is : 2");

        }, 1000);

    },
    end: function () {
        if (!board.publish || board.isLimit == 0) return;
        var m = { type: 'meetManager', action: "end" };
        mainApp.sendToServer(m);
    },
};