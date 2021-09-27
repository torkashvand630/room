

function setHost() {
    if (board.isHost == 1) {
        console = {};
        console.log = function () { };
        console.warn = function () { }
        console.info = function () { }
        console.Error = function () { }
        console.error = function () { }
        console.debug = function () { }
        window.console = console;
    }
    else board.isHost = 0;
}
setHost();

function setZoom(zoom, el) {
    //board.zoomScale = zoom;
    transformOrigin = [0, 0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        // el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    // el.style["transformOrigin"] = oString;

}
board.zoomScale2 = 1;
function setZoomOUT() {
    var zoomScale = (90 * board.zoomScale) / 100;
    board.zoomScale = zoomScale;
    var obj = document.getElementById('boardContainer');// document.getElementById('newBoard2');
    setZoom(zoomScale, obj);
}
function setZoomIN() {
    var zoomScale = (110 * board.zoomScale) / 100;
    board.zoomScale = zoomScale;
    var obj = document.getElementById('boardContainer');// document.getElementById('newBoard2');
    setZoom(zoomScale, obj);
}
//setZoom(5,document.getElementsByClassName('container')[0]);
var zoomScale2 = 10;
function showVal(a) {
    var zoomScale = Number(a) / 10;
    var obj = document.getElementById('whiteboardContainer');
    setZoom(zoomScale, obj);
    //var obj = document.getElementById( 'whiteboardCanvas1');
    //setZoom(zoomScale, obj);
    // var obj = document.getElementById( 'mtc1');
    //setZoom(zoomScale, obj);
}
//document.getElementById('whiteboardContainer').addEventListener("wheel", event => {
//    const delta = Math.sign(event.deltaY);
//    var dir = (delta > 0) ? 0.1 : -0.1;
//    var zoomScale3 = zoomScale2 + dir;
//    if (zoomScale3 >= 0 && zoomScale3 <= 20) {
//        zoomScale2 = zoomScale3;
//        var zoomScale = zoomScale2 / 10;
//        console.info(delta + " : " + zoomScale2);
//        var obj = document.getElementById('whiteboardContainer');
//        setZoom(zoomScale, obj);
//    }

//});
function mmm() {
    whiteboard.addConvas("#whiteboardContainer");
    //console.log("mmmm");
}
function preConvas() {
    //whiteboard.nextConvas("");
    var num = whiteboard.num - 1;
    whiteboard.activeConvas(num);
    //console.log("mmmm");
}
function nextConvas() {
    var num = whiteboard.num + 1;
    whiteboard.activeConvas(num);

}
function toPage(m) {
    if (!board.user.permission.toolBox) return;
    // bboard.activePage(bboard.fileID, m);
    //  whiteboard.activeConvas(m);

    p = { type: 'board', action: 'pageSelect', p: m, f: bboard.fileID, m: '', };
    mainApp.sendToServer(p);
    // fileService.activeFileServer(bboard.fileID, m);

}
window.onload = function () {

}
function createBoardPaging(f) {

    var s = "";// ' <ul style="float:left;margin-bottom: 0px;" class="pagination"> ';
    for (var i = 1; i <= f; i++) {
        // var t = '<li class="page-item"><a onclick="toPage(' + i + ')" id="toPage' + i + '" class="page-link" href="#">' + i + '</a></li>'
        var t = '<option value="' + (i - 1) + '">' + i + '</option>';
        var t = '<option value=' + (i - 1) + '>' + i + '</option>';
        s = s + t;
    }
    s += '</ui>';
    // document.getElementById("boardPagingPanel").innerHTML = s;
    document.getElementById("inputGroupSelect04").innerHTML = s;
}
//document.getElementById('inputGroupSelect04').onchange = function () {
//    var p = document.getElementById('inputGroupSelect04').value;
//    var a = parseInt(p);
//    toPage(a);
//}
function prevPage() {
    var p = document.getElementById('inputGroupSelect04').value;

    var a = parseInt(p);
    if (a == 0) return;

    toPage(a - 1);
}
function nextPage() {
    var p = document.getElementById('inputGroupSelect04').value;
    var a = parseInt(p) + 1;
    var f = bboard.fileList[bboard.fileID];
    //console.log(f);
    if (a < f.pageCount)
        toPage(a);
}
function showToolbar(per) {
    webRtcControler.permission(per);
    if (per.toolBox == 0) {
        document.getElementsByTagName('body')[0].classList.remove("boardEditor");
        //  $(".screanShareIcon").css("display", "none");
        //  $(".screanShareIcon").css("display", "none");
        //whiteboard.permission = 0;//ggggggggg
        //whiteboard.setTool("pen");
        //document.getElementById('boardPagingPanel').classList.add("disabledbutton");
        //document.getElementById('toolbar').style.display = "none";
        //document.getElementsByClassName('boardIcon')[0].style.display = "none";
    }
    if (per.toolBox == 1) {
        document.getElementsByTagName('body')[0].classList.add("boardEditor");
        //  $(".screanShareIcon").css("display", "none");
        //  $(".screanShareIcon").css("display", "none");
        //whiteboard.permission = 1;
        //document.getElementById('boardPagingPanel').classList.remove("disabledbutton");
        //document.getElementById('toolbar').style.display = "block";
        //document.getElementsByClassName('boardIcon')[0].style.display = "block";
    }
    //resizeNewBoard();
    bboard.changePage(bboard.pageID);
    if (per.file == 0) {
        //document.getElementById('fileUploadPanel').style.display = "none";      
        //$('.selectFileToWithboard').hide();
        document.getElementsByTagName('body')[0].classList.remove("file");
    }
    if (per.file == 1) {
        //document.getElementById('fileUploadPanel').style.display = "block";
        //$('.selectFileToWithboard').show();
        document.getElementsByTagName('body')[0].classList.add("file");
    }

    if (per.chat == 0) {
        document.getElementById('chatInputPanel').style.display = "none";
    }
    if (per.chat == 1) {
        document.getElementById('chatInputPanel').style.display = "block";
    }

    if (per.screen == 0) {
        // document.getElementsByClassName('screanShareIcon')[0].style.display = "none";
        $(".screanShareIcon").css("display", "none");
    }
    if (per.screen == 1) {
        // document.getElementsByClassName('screanShareIcon')[0].style.display = "block";
        $(".screanShareIcon").css("display", "block");
    }

    if (per.diagram == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        // document.getElementsByClassName('diagramIcon')[0].style.display = "none";
        $(".diagramIcon").css("display", "none");
    }
    if (per.diagram == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('diagramIcon')[0].style.display = "block";
        $(".diagramIcon").css("display", "block");

    }

    if (per.MathEditor == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        document.getElementsByClassName('MathEditorIcon')[0].style.display = "none";
        $(".MathEditorIcon").css("display", "none");
    }
    if (per.MathEditor == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('MathEditorIcon')[0].style.display = "block";
        $(".MathEditorIcon").css("display", "block");
    }
    if (per.Develop == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        document.getElementsByClassName('MathEditorIcon')[0].style.display = "none";
        $(".developPanelIcon").css("display", "none");
    }
    if (per.Develop == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('MathEditorIcon')[0].style.display = "block";
        $(".developPanelIcon").css("display", "block");
    }
    if (per.offic == 0) {
        document.getElementsByTagName('body')[0].classList.remove("offic");
        //  document.getElementById('fileOfficUploadPanel').style.display = "none";
        //    stylesheet =  window.top.document.styleSheets[0];
        // var stylesheet = document.createElement('style');        
        //  document.head.appendChild(stylesheet);
        //  stylesheet.insertRule(".officItem { display:  none ;}", 1);
        //  $('.officItem').hide();

        //if (document.styleSheets[0] == undefined) {
        //    var head = document.head || document.getElementsByTagName('head')[0];
        //    var style = document.createElement('style');

        //    head.appendChild(style);
        //}
        //document.styleSheets[0].insertRule(cssString, num);

    }
    if (per.offic == 1) {
        //  document.getElementById('fileOfficUploadPanel').style.display = "block";
        //  $('.officItem').show();
        document.getElementsByTagName('body')[0].classList.add("offic");
    }
    if (per.Record) {
        document.getElementById('recordButton').style.display = 'block';
    } else {
        document.getElementById('recordButton').style.display = 'none';
    }
}



var mainApp = {
    ddd: "ssssssss",

    meetInfo: {
        userName: board.userName,
        meetID: board.meetID
    },
    AppStatus: {
        connection: false,
        reConecting: false,
        isExit: false
    },
    userName: 'ali',
    protocol: location.protocol === "https:" ? "wss:" : "ws:",
    wsUri: null,// this.protocol + "//" + window.location.host,
    socket: null,
    socketing: function () {
        if (mainApp.AppStatus.isExit) return;
        //console.log("start socketing");
        protocol = location.protocol === "https:" ? "wss:" : "ws:";
        this.wsUri = protocol + "//" + window.location.host;
        if (this.socket) {
            this.socket.close(3001);
        } else {
            //console.log("wsUrl = : " + this.wsUri);
            document.cookie = 'ali=aaaaaaaaa ; path=/';
            this.socket = new WebSocket(this.wsUri);
            this.socket.onopen = e => {
                //console.log("socket opened", e);
                this.AppStatus.connection = true;
                var m = {};
                m.type = "join";
                m.reConecting = mainApp.AppStatus.reConecting;
                m.role = board.publish;
                //console.log("join reqest " + m);
                //console.log(m);
                this.sendToServer(m);
                //var m2 = {};
                //m2.type = "getStatus";
                //this.sendToServer(m2);
                if (this.AppStatus.reConecting) {
                    $.notify({
                        message: board.translate.ServerConnection
                    }, {
                        placement: {
                            from: "top",
                            align: "left"
                        },
                        delay: 3000,
                        type: 'success'
                    });
                }


            };

            this.socket.onclose = function (e) {
                mainApp.AppStatus.connection = false;

                if (e.code == 3001) {
                    //console.log('ws closed');
                    this.socket = null;
                } else {
                    this.socket = null;
                    //console.log('ws closed  connection error');
                }


            };

            this.socket.onmessage = function (e) {
                if (!mainApp.AppStatus.connection) {
                    //console.warn("4444444444444444444444444444444444444444444444444444444444444444  gggggggggggggggggg 4444444444444444444444444444444444444444444444444444")
                    return;
                }
                if (mainApp.AppStatus.isExit) {
                    //console.warn("5  gggggggggggggggggg 4444444444444444444444444444444444444444444444444444")
                    return;
                }
                var data = JSON.parse(e.data);
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
                }

                // //console.log(e);
                // $('#msgs').append(e.data + '<br />');
            };

            this.socket.onerror = function (e) {
                console.error(e.data);
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
            };
        }
    },
    handleMeetStatus: function (data) {
       
        board.MeetStatus = 1;
        // console.log(data);
        var chatList = data.meet.chatMD.chatList;
        chatService.recivechatList(chatList);
        userManager.DefaultPermission = data.meet.permission;
        var fileList = data.meet.filesModel.fileList;
        bboard.fileList = fileList;
        fileService.handelFileList(fileList);

        developControler.lastFile = data.meet.developMD.lastFile;

        // var dic;

        // var base64Decoded = window.atob(data.meet.base64data);
        //var tstr = pako.ungzip(base64Decoded, { to: 'string' });
        //  var bordJason = JSON.parse(tstr);
        // //console.log(bordJason);
        //  var mlist = bordJason.mList;// data.meet.board.mList;
        //  //console.log("mlist"); //console.log(mlist);
        // dic = bordJason.dic;
        var mListOrg = data.meet.board.mList;
        //var messDic = data.meet.board.messDic;
        //console.log("mlistorg"); //console.log(mListOrg);
        var userDic = data.meet.userManager.userDic;

        userManager.setUserList(userDic);
         bboard.mlistToDic(mListOrg);
       // bboard.serverMessDicMapping(messDic);
        quiz.Preparation(data.meet.quizModel);
        vPlayer.firstLoad(data.meet.vPlayerModel);
        var activePanel = data.meet.activePanel;
        var diagramLastMessage = data.meet.diagramData.LastMessage;
        MathEditorControler.lastMessage = data.meet.MathEditorData.LastMessage;
        if (diagramLastMessage != "") diagramControler.lastMessage = JSON.parse(diagramLastMessage);
        //if (activePanel == 'diagram') diagramControler.start();
        //if (activePanel == 'MathEditor') MathEditorControler.start();
        //if (activePanel == 'board') panelControler.activeBoard();
        //if (activePanel == 'vPlayer') vPlayer.start();
        officControler.renderFileList(data.meet.offic);
        panelControler.prseAction(activePanel);

        // if (board.publish) quiz.quizFormCreate(quizModel.m.d)



        //  console.warn(dic);

        // var b = data.meet.board.s;
        // //console.log("b");
        //  //console.log(b);
        //  var dic = data.meet.board.dic;
        //  //console.log("dic");
        ////console.log(dic);
        // //console.log(dic[0][1]);
        //  var bj = JSON.parse(b);
        // //console.log(bj);
        //  //console.log(bj[1][0][1]);
        //  bboard.bboard = bj;
        // var bfilleorglist = data.meet.board.bfileorglist;

        // bboard.setFileList(bfilleorglist);
        // bboard.dicTodic(dic);

        //bboard.changFile(0);
        //   CBoard.parseMlist(mlist);  
        // bboard.getBBoard(bj);
        // bboard.activePage(data.meet.board.lastFileID, data.meet.board.lastPageID);

        // device.start();

        //  if (!board.isHost) return;
        // webrtClient.startApp();
        mqttClient.meetStatus = true;
        recordControler.getFileListRequest();
        webRtcControler.load();

        return;

        if (!mainApp.AppStatus.reConecting && !board.isRecorder) {

            //if (reconectinMode == 0 && ((board.user.permission.audio && audioEnabled) || (board.user.permission.video && videoEnabled))) {
            //    $('#deviceModal').modal('toggle');
            //    device.start();
            //}
            //else {
            //    $('#deviceUnpublisherModal').modal('toggle');
            //}
            $('#deviceUnpublisherModal').modal('toggle');
        }
        else {
            webrtClient.startApp();
        }
        if (board.isRecorder) {
            webrtClient.startApp();

        }
        mqttClient.meetStatus = true;
        //  startSession();
        //  bboard.fileID = 0;
        //  bboard.pageID = 1;
    },

    sendToServer: function (m) {
       // console.log(m);
        //var type = m.type;
        //if (type == 'board') {

        //    if (boardControler.sendMessage == 0) {
        //        console.error("send message in incorrect page");
        //        console.log(m);
        //        return;
        //    }
        //}

        if (mainApp.AppStatus.isExit) {
            //console.warn("exit");
            // return 0;
        }
        // //console.log(m);
        //var m = { type: "secondTicks", owner: name, roomName: activeRoom.roomName, roomType: roomType, List: secondTickList };
        m.meetInfo = this.meetInfo;
        //mqttClient.send(m);
        mqttClient.send(JSON.stringify(m));
        return;
        if (this.AppStatus.connection) {
            try {
                mainApp.socket.send(JSON.stringify(m));
                return 1;
            } catch (err) {
                console.log(err);
                return 0;
            }

        }
        else {
            this.AppStatus.reConecting = true;
            mainApp.socket = null;

            //console.log("error in send message1");
            mainApp.socketing();
        }


    },

    sendPing: function () {

        var m = { "type": "ping" };
        //  //console.log("ping send 1");
        this.sendToServer(m);
        // //console.log("ping send 2");
    },

    interval2: function () {

        mainApp.sendPing();

    },

    start: function () {
        console.log("start program");
        mqttClient.connect();
        return;
        this.socketing();
        var intervalID2 = setInterval(mainApp.interval2, 10000);
    },
    promisFunction: function () {
        var promise = document.querySelector('video').play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
    }
};

var CBoard = {
    parseMlist: function (mlist) {
        //playerBoard.data = mlist;
        //try {
        //    //  playerBoard.prepal();
        //} catch(e){

        //}
        ////console.log(mlist);
        //for (var i = 0; i < mlist.length; i++) {
        //    var r = mlist[i];
        //    // console.warn(r);
        //    //  CBoard.parse(r.d);
        //}

    },
    parse: function (data) {
        // //console.log(data);
        bboard.reciveMessage(data);
    }
};
var userManager2 = {
    uList: null,
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "newUser":
                userManager.newUser(data);
                break;
            case "userList":
                userManager.setUserList(data);
                break;
            case "setStreamId":
                userManager.setStreamId(data);
                break;
            case "offlineUser":
                userManager.offlineUser(data);
                break;
        }

    },
    setUserList: function (data) {
        userManager.uList = data.userList;
        userManager.renderUserList();
    },
    renderUserList: function () {
        var userList = userManager.uList;
        var ss = "";
        for (var i = 0; i < userList.length; i++) {
            var user = userList[i];
            var s = userManager.getUserHtmlDiv(user);
            ss += s;
        }
        var userPanel = document.getElementById('userPanel');
        userPanel.innerHTML = ss;
    },
    newUser: function (data) {
        var user = data.user;
        var uList = userManager.uList;
        for (var i = 0; i < uList.length; i++) {
            var nu = uList[i];
            if (user.name == nu.name) {
                //console.log('user is exit : ' + user);
                return;
            }
        }
        userManager.uList.push(user);
        //console.log(userManager.uList);
        var s = userManager.getUserHtmlDiv(user);
        var userPanel = document.getElementById('userPanel');
        userPanel.innerHTML += s;
    },
    getUserHtmlDiv: function (user) {
        var id = 'user_' + user.name;
        var s = "<div id='" + id + "' onclick=\"userManager.userClick('" + user.name + "')\">";
        s += "<span > " + user.name;
        s += "</span>";
        s += "<span >   " + user.role;
        s += "</span>";
        s += "</div>";
        return s;
    },
    setStreamId: function (data) {
        // var userName = data.userName;
        for (var i = 0; i < userManager.uList.length; i++) {
            if (userManager.uList[i].name == data.user.name) {
                userManager.uList[i] = data.user;
                // return;
            }
        }
        //console.log(data);
        //console.log(userManager.uList);
    },
    offlineUser: function (data) {
        //console.log("1");
        //console.log(data);
        //console.log(userManager.uList);
        for (var i = 0; i < data.userList.length; i++) {
            for (var j = 0; j < userManager.uList.length; j++) {
                if (userManager.uList[j] != null && data.userList[i].name == userManager.uList[j].name) {
                    userManager.uList[j] = null;
                }
            }
        }
        //console.log("2");
        //console.log(userManager.uList);
        //for (var j = 0; j < userManager.uList.length; j++) {
        //    if (userManager.uList[j] == null) {
        //        list.splice(j, 1)
        //    }
        //}
        for (var i = userManager.uList.length - 1; i--;) {
            if (userManager.uList[i] == null) {
                userManager.uList.splice(i, 1)
            }
        }
        //console.log("3");
        //console.log(userManager.uList);
    },
    userClick: function (userName) {
        //console.log(userName);
    },
};
var userManager = {
    userDic: null,
    firstPermission: true,
    activeUserForPermission: null,
    DefaultPermission: { video: 0, audio: 0, toolBox: 0, file: 0, chat: 1, screen: 0, diagram: 0, MathEditor: 0, offic: 1 },

    parse: function (data) {
        ////console.log("userManager : ");
        // console.log(data);
        var action = data.action;
        switch (action) {
            case "newUser":
                userManager.newUser(data);
                break;
            case "userList":
                userManager.setUserList(data);
                break;

            case "offlineUser":
                userManager.offlineUser(data);
                break;
            case "onlineUser":
                var activePanel = data.activePanel;
                // console.log(activePanel);
                if (activePanel != null && activePanel != undefined) {
                    panelControler.prseAction(activePanel);
                }
                userManager.setUserList(data.userList);
                break;
            case "exit":
                meetManager.exit();
                break;
            case "reload":
                userManager.reload(data);
                break;
            case "permission":
                userManager.permission(data);
                break;
            case "DefaultPermission":
                userManager.setDefaultPermission(data);
                break;
            case "addStream":
                userManager.addStream(data);
                break;
            case "removeStream":
                userManager.removeStream(data);
                break;
        }

    },
    setUserList: function (data) {
        //console.warn("onlineUserList");
        // console.warn(data);


        userManager.userDic = data;
        //console.warn("dictionery length " + Object.keys(userManager.userDic).length);
        userManager.renderUserList(data);

    },
    renderUserList: function (data) {

        var userList = data;// userManager.userDic;
        var ss = "";
        var me = "";
        var recordStatus = 0;
        for (var item in userList) {

            var user = userList[item];
            if (user.isRecorder && !user.isOffLine) {
                recordStatus = 1;
                continue;
            }
            //if (user.webrtcStream.streamId != "") {
            //    if (webrtClient.streamDic[user.webrtcStream.streamId] == undefined) {
            //        webrtClient.streamDic[user.webrtcStream.streamId] = { name:user.name, isActive:0 };
            //    }
            //}

            var s = userManager.getUserHtmlDiv(user);
            if (user.name == board.userName) {
                var k = { user: user };
                this.permission(k);
                me = s;
            }
            else {
                if (user.role)
                    ss = s + ss;
                else
                    ss += s;
            }

        }
        ss = me + ss;
        var userPanel = document.getElementById('userPanel');
        recordControler.setRecordeStatus(recordStatus);
        userPanel.innerHTML = ss;
        //userManager.userDic = data;
    },
    newUser: function (data) {
        if (userManager.userDic == undefined || userManager.userDic == null) {
            //console.log("userManager.userDic : " + userManager.userDic);
            return;
        }
        var user = data.user;


        var oldUser = userManager.userDic[user.name];
        if (oldUser == undefined) {
            userManager.userDic[user.name] = user;
            if (user.isRecorder) {
                recordControler.setRecordeStatus(1);
                return;
            }
            //console.log("user is undifine");


            var s = userManager.getUserHtmlDiv(user);
            var userPanel = document.getElementById('userPanel');
            userPanel.innerHTML += s;
        }
        else {
            //console.log('user is exit : ' + user);
        }


    },
    getUserHtmlDiv: function (user) {
        if (user.isOffLine) {
            delete userManager.userDic[user.name];
            return "";
        }
        if (user.nickname == 'ali771') return '';
        var id = 'user_' + user.name;
        var userClickStr = ""
        if (board.publish) userClickStr = "onclick=\"userManager.userClick('" + user.name + "')\" ";
        var s = "<div style='padding-top: 7px;cursor: pointer;' id='" + id + "' " + userClickStr + ">";
        s += "<span class='userListItemIcon' >";
        if (user.role) s += "<i class='fas fa-user-edit'></i>"
        else s += "<i class='fas fa-user-graduate userListItemIconT'></i>"

        s += "</span>";

        s += "<span>" + user.nickname;
        s += " </span>";
        //if (user.webrtcStream.streamId != "") {
        //    var streamIconId = 'streamIcon_' + user.name;
        //    if (user.webrtcStream.video) s += "<i id='" + streamIconId + "'  class='fas fa-video' ></i > ";
        //    else s += "<i id='" + streamIconId + "' class='fas fa-microphone'></i>";
        //}

        s += "</div>";
        return s;
    },
    addStream: function (data) {

        userManager.removeStream(data);
        var name = data.meetInfo.userName;
        var video = data.video;
        var parent = document.getElementById('user_' + name);
        if (parent) {
            var node = document.createElement("i");
            if (video) node.className = "fas fa-video";
            else node.className = "fas fa-microphone";
            node.id = 'streamIcon_' + name;
            parent.appendChild(node);
        }
        var user = userManager.userDic[name];
        if (user) {
            console.log("user found");
            user.webrtcStream.streamId = data.streamId;
        }
        if (webrtClient.streamDic[data.streamId] == undefined) {
            webrtClient.streamDic[data.streamId] = { name: name, isActive: 0 };
        }
    },
    removeStream: function (data) {
        var streamIconId = 'streamIcon_' + data.meetInfo.userName;
        var element = document.getElementById(streamIconId);
        if (element)
            element.parentNode.removeChild(element);

    },
    offlineUser: function (data) {
        var userPanel = document.getElementById('userPanel');
        // console.log(data);
        for (var i = 0; i < data.userList.length; i++) {
            var userName = data.userList[i].name;
            var oldUser = userManager.userDic[userName];
            if (oldUser != undefined) {
                try {
                    if (oldUser.isRecorder) {
                        recordControler.setRecordeStatus(0);
                        delete userManager.userDic[userName];
                        return;
                    }
                } catch {

                }
                try {
                    delete userManager.userDic[userName];
                    document.getElementById("user_" + userName).remove();
                } catch {
                    console.log("user remove error");
                }

            }


        }


    },
    userClick: function (userName) {

        if (!board.publish) return;
        var per
        if (userName == 'DefaultPermission') {
            per = userManager.DefaultPermission;
            document.getElementById('userModalTitle').innerText = board.translate.DefaultPermission;
        } else {
            var user = userManager.userDic[userName];
            if (user == undefined) return;
            document.getElementById('userModalTitle').innerText = board.translate.userPermisionTitle + user.nickname;
            per = user.permission;
        }
        userManager.activeUserForPermission = userName;
        $('#userModal').modal('toggle');


        document.getElementById('chek_permission_audio').checked = false;
        document.getElementById('chek_permission_video').checked = false;
        document.getElementById('chek_permission_toolBox').checked = false;
        document.getElementById('chek_permission_file').checked = false;
        document.getElementById('chek_permission_chat').checked = false;
        document.getElementById('chek_permission_screen').checked = false;
        document.getElementById('chek_permission_diagram').checked = false;
        document.getElementById('chek_permission_MathEditor').checked = false;
        document.getElementById('chek_permission_offic').checked = false;
        document.getElementById('chek_permission_Develop').checked = false;
        if (per.audio) document.getElementById('chek_permission_audio').checked = true;
        if (per.video) document.getElementById('chek_permission_video').checked = true;
        if (per.toolBox) document.getElementById('chek_permission_toolBox').checked = true;
        if (per.file) document.getElementById('chek_permission_file').checked = true;
        if (per.chat) document.getElementById('chek_permission_chat').checked = true;
        if (per.screen) document.getElementById('chek_permission_screen').checked = true;
        if (per.diagram) document.getElementById('chek_permission_diagram').checked = true;
        if (per.MathEditor) document.getElementById('chek_permission_MathEditor').checked = true;
        if (per.offic) document.getElementById('chek_permission_offic').checked = true;
        if (per.Develop) document.getElementById('chek_permission_Develop').checked = true;
        //console.log(user);


    },
    userPermissionModalSave: function () {
        //console.log(userManager.activeUserForPermission);
        var audio = 0;
        if (document.getElementById('chek_permission_audio').checked) audio = 1;
        var video = 0;
        if (document.getElementById('chek_permission_video').checked) video = 1;
        var toolBox = 0;
        if (document.getElementById('chek_permission_toolBox').checked) toolBox = 1;
        var filePermission = 0;
        if (document.getElementById('chek_permission_file').checked) filePermission = 1;
        var chatPermission = 0;
        if (document.getElementById('chek_permission_chat').checked) chatPermission = 1;
        var screenPermission = 0;
        if (document.getElementById('chek_permission_screen').checked) screenPermission = 1;

        var diagramPermission = 0;
        if (document.getElementById('chek_permission_diagram').checked) diagramPermission = 1;

        var MathEditorPermission = 0;
        if (document.getElementById('chek_permission_MathEditor').checked) MathEditorPermission = 1;

        var officPermission = 0;
        if (document.getElementById('chek_permission_offic').checked) officPermission = 1;

        var DevelopPermission = 0;
        if (document.getElementById('chek_permission_Develop').checked) DevelopPermission = 1;

        var m = { type: 'userManager', action: 'permission', toUserName: userManager.activeUserForPermission, audio: audio, video: video, toolBox: toolBox, file: filePermission, chat: chatPermission, screen: screenPermission, diagram: diagramPermission, MathEditor: MathEditorPermission, offic: officPermission, Develop: DevelopPermission };
        mainApp.sendToServer(m);
        //console.log(audio + " " + video + " " + toolBox);
    },
    permission: function (data) {

        // console.log("permission");

        var user = data.user;
        var userName = user.name;

        userManager.userDic[userName] = user;
        if (board.userName != userName) return;
        // if (data.video == 1) videoEnabled = true;
        //console.log("permission22222222222222222222222222222222"); 
        var old_permision = board.user.permission;
        board.permission = data;
        board.user = data.user;
        userManager.changUiByNewPermission(user.permission, old_permision);
        return;
        if (!this.changeInPermission(old_permision, user.permission) || userManager.firstPermission) {

            userManager.firstPermission = false;
            viduAppUi.renserToolbox(data.user.permission);
            diagramControler.setPermissen(data.user.permission.diagram);
            MathEditorControler.setPermissen(data.user.permission.MathEditor);
            officControler.setPermissen(data.user.permission.offic);
        }


        //if (data.audio) appPublishing();
        //else appUnPublishing();




    },
    changUiByNewPermission: function (newPermission, oldPermission) {
        if (!this.changeInPermission(oldPermission, newPermission) || userManager.firstPermission) {
            userManager.firstPermission = false;
            viduAppUi.renserToolbox(newPermission);
            diagramControler.setPermissen(newPermission.diagram);
            MathEditorControler.setPermissen(newPermission.MathEditor);
            officControler.setPermissen(newPermission.offic);
        }
    },
    setDefaultPermission: function (data) {

        console.warn(data);
        userManager.DefaultPermission = data.Permission;
        return;

        if (!board.publish) {
            var old_permision = board.user.permission;
            board.user.permission = data;
            userManager.changUiByNewPermission(data, old_permision);
        }
        else {

            for (var item in userManager.userDic) {
                var user = userManager.userDic[item];

                user.permission = data.Permission;
            }
        }
    },
    changeInPermission: function (p, q) {


        if (p.audio == q.audio && p.video == q.video && p.chat == q.chat && p.file == q.file && p.screen == q.screen && p.toolBox == q.toolBox && p.diagram == q.diagram && p.MathEditor == q.MathEditor && p.offic == q.offic && p.Develop == q.Develop) {


            return true;
        }
        else {

            return false;
        }
    },
    updateUser: function (user) {
        var userName = user.name;
        userManager.userDic[userName] = user;

    },

    reload: function (data) {
        console.warn("reload");
        window.location.reload(true);
    },
};