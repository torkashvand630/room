var mqttClient = {
    client: null,// = mqtt.connect("ws://localhost:8083/mqtt")
    isConnect: false,
    meetStatus: false,
    sendOption: { qos: 2 },
    serverTopic: "allmeet_" + board.serverID,
    connect: function () {
        var o = { clientId: board.meetID+'_'+ board.userName, username: board.nickName };
        var mqttUrl = board.mqttServer + "/mqtt";//"ws://localhost:9001/mqtt";//board.mediaServer.replace("/ws", "/mqtt");//

        mqttClient.client = mqtt.connect(mqttUrl, o);
        mqttClient.client.on('connect', function () {
            if (mqttClient.isConnect) {
                window.location.reload(true);
                return false;
            }
            mqttClient.isConnect = true;
            var sendSub = 'meet_send_' + board.serverID+"_" + board.meetID;
            var userSub = 'user_'+board.meetID + '_'  + board.userName;
            var sub = '{"' + sendSub + '": { "qos": 2 },"' + userSub + '": { "qos": 2 } }';

            mqttClient.client.subscribe(JSON.parse(sub));
           // mqttClient.client.subscribe("meet_send_" + board.meetID, { qos:2});
           // mqttClient.client.subscribe("user_" + board.userName, { qos: 2 });
            console.warn("mqtt connect2 .. ");
            var m = {};
            m.type = "join";
            m.reConecting = false;
            m.role = board.publish;
            mainApp.sendToServer(m);
            var intervalID2 = setInterval(mqttClient.interval2, 5000);
            setTimeout(() => {
                var MeetStatus = board.MeetStatus;
                if (MeetStatus == undefined || MeetStatus == 0) {
                    window.location.reload(true);
                }
                
            }, 20000);
        });
     
        mqttClient.client.on("message", function (topic, payload) {
           // console.log("topic : " + topic + " m : " + payload);
            mqttClient.parse(payload);
            // alert([topic, payload].join(": "))
            // client.end()
        })
        mqttClient.client.on("error", function () {
           
        })
        mqttClient.client.on('offline', function () {
            console.log("[MQTT] Connection offline");
            $.notify({
                message: board.translate.connectionLost
            }, {
                placement: {
                    from: "top",
                    align: "left"
                },
                delay: 3000,
                type: 'danger'
            });
        });
        mqttClient.client.on("reconnect", () => {
            console.log("RECONNECT");
        });
        mqttClient.client.reconnecting = true;
        mqttClient.client.options.reconnectPeriod = 1000;
      
    },
    interval2: function () {

        mqttClient.sendPing();

    },
    sendPing: function () {

        var m = { "type": "ping" };
        //  //console.log("ping send 1");
        mainApp.sendToServer(m);
        // //console.log("ping send 2");
    },

    ping: function () {
        mqttClient.sendPing();
        setTimeout(() => {
            mqttClient.ping();
        },5000)
    },
    send: function (m) {
       
        try {
            //mqttClient.client.publish("meet_get_" + board.serverID + "_" + board.meetID, m, mqttClient.sendOption)
            mqttClient.client.publish(mqttClient.serverTopic, m, mqttClient.sendOption)
        }
        catch {
            $.notify({
                message: board.translate.connectionLost
            }, {
                placement: {
                    from: "top",
                    align: "left"
                },
                delay: 3000,
                type: 'danger'
            });
        }
    },
    parse: function (e) {
       // console.log(e);
        var data = JSON.parse(e);
        if (data.type == 'userManager') {
            if (data.action == 'reload') userManager.reload();
        }
        if (data.type != 'meetSatus' && !mqttClient.meetStatus) return;
            
        switch (data.type) {
            case "board":
                CBoard.parse(data);
                break;
            case "meetSatus":
                mainApp.handleMeetStatus(data);
                break;
            case "file":
                fileService.parse(data);
                break;
            case "activeFile":
                fileService.activeFile(data.fileID);
                break;
            case "fileList":
                //console.log(data);
                break;

            case "textMessage":
                chatService.parse(data);
                break;

            case "userManager": meetManager
                userManager.parse(data);
                break;
            case "meetManager":
                meetManager.parse(data);
                break;
            case "quiz":
                quiz.parse(data);
                break;
            case "vPlayer":
                vPlayer.parse(data);
                break;
            case "panelControler":
                panelControler.parse(data);
                break;
            case "diagram":
                diagramControler.parse(data);
                break;
            case "MathEditor":
                MathEditorControler.parse(data);
                break;
            case "offic":
                officControler.parse(data);
                break;
            case "Develop":
                developControler.parse(data);
                break;
            case "record":
                recordControler.parse(data);
                break;
        }
    }
}