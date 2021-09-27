(function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',x='HackTimer.js by turuslan: ',v='Initialisation failed',p=0,r='hasOwnProperty',y=[].slice,b=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0}while(f[r](p));return p}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]))}catch(e){}}if(typeof(b)!=='undefined'){try{w=new b(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i})};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i})};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i]}if(typeof(c)=='string')try{c=new Function(c)}catch(k){l.log(x+'Error parsing callback code string: ',k)}if(typeof(c)=='function')c.apply(o,n.p)};w.onerror=function(e){l.log(e)};l.log(x+'Initialisation succeeded')}catch(e){l.log(x+v);l.error(e)}}else l.log(x+v+' - HTML5 Web Worker is not supported')})('HackTimerWorker.min.js');


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
function setChatPanel() {
    var hm = 62;
    if (board.isMobile) hm = 65;
    var h = $("#chatPanel").height() - hm; //document.getElementById('chatPanel').st;
   
    var chatContiner = document.getElementById('chatContiner');
    var h2 = h + "px";
    // console.log("h2 : " + h2); 
    chatContiner.style.height = h2;
    var userPanel = document.getElementById('userPanel'); 
    userPanel.style.height = (h+26)+"px";
}
document.getElementById('menu-toggle').addEventListener("click", function () { 
    chatService.unReadMessage = 0;
    chatService.updateUnReadmessage();
});
var chatService = {
    unReadMessage: 0,
    messageIDfordelete: 0,
    //chList=[],

    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "new":
                chatService.reciveMessage(data);
                break;
            case "delete":
                chatService.deleteMessage(data);
                break;
        }
    },
    sendTextMessage: function () {
        var obj = document.getElementById('chatInput');
        var continer = document.getElementById('chatContiner');
        var t = obj.value;
        if (t == "") return;
        var m = { "type": "textMessage", "action": "new", "nickName": board.nickName, "text": t };
        mainApp.sendToServer(m);
        // var s = '<div><span>' + board.userName + '</span> :  ' + t + '</div>';
        //// console.log(t);
        // continer.innerHTML += s
        obj.value = '';
        event.preventDefault(); // disable normal form submit behavior
        return false; // prevent further bubbling of event
    },
    reciveMessage: function (m) {
       
       // var obj = document.getElementById('wrapper');
        if (layout.id == 2 && !layout.menuStatus  ) {
            chatService.unReadMessage++;
        }
        chatService.updateUnReadmessage();
        var nickName = m.m.nickName;
        this.handelMessage(m.m.id,m.m.text, nickName, m.m.userName);



    },
    handelMessage: function (id,text, nickName, userName) {
        var continer = document.getElementById('chatContiner');
        //var s = '<div class="chatMassageItem" ><p  class="chatMassageItemLine" >' + nickName + ': </p> <p  class="chatMassageItemLine"> ' + text + '</p></div>';
        var s = '<div id=chatMassageItem_' + id + ' class="chatMassageItem" ><p  class="chatMassageItemLine" > <strong onclick="userManager.userClick(\'' + userName + '\')" class="chatMassageUserName">' + nickName + '  :  </strong><normal id=chatMassageItemText_' + id + '> ' + text + '</normal><strong onclick="chatService.editMessageView(\'' + id + '\')">   <i class="far fa-trash-alt chatMessageTextEdit"></i></strong></p></div>';

        continer.innerHTML += s;
        continer.scrollTop = continer.scrollHeight;
    },
    recivechatList: function (chatList) {
        document.getElementById('chatContiner').innerHTML = "";
        for (var i = 0; i < chatList.length; i++) {
            var r = chatList[i];

           // this.chList[r.id] = r;
            if(!r.isDelete)
            this.handelMessage(r.id,r.text, r.nickName, r.userName);
        }
      //  console.warn(chatList);
    },
    updateUnReadmessage: function () {
        var obj = document.getElementById('unReadMessage');
        if (!chatService.unReadMessage) obj.innerText = "";
        else obj.innerText = chatService.unReadMessage;
    },
    editMessageView: function (id) {
       // console.log(id);
        if (!board.publish) return;
        var obj = document.getElementById('chatMassageItemText_' + id);
        if (!obj) return;
        this.messageIDfordelete = id;
        document.getElementById('messageForDelete').innerText = obj.innerText;

        $('#messageModal').modal('toggle');
    },
    deleteMessageToServer: function () {
        if (!board.publish) return;
        var m = { "type": "textMessage", "action": "delete", id: this.messageIDfordelete };
        
        mainApp.sendToServer(m);
        return;
        var obj = document.getElementById('chatMassageItem_' + this.messageIDfordelete);
        if (!obj) return;
       
    },
    deleteMessage: function (m) {
        
        var obj = document.getElementById('chatMassageItem_' + m.id);
        if (!obj) return;
        obj.remove();
        
    }
}

var deviceUnpublisher = {
    save: function () {
        mainApp.start();
      //  webrtClient.startApp();
    },
}; 
var iconDevicePanel = document.getElementById("iconDevicelPanel");
var device = {
    videoDevice: undefined,
    audioDevice: undefined,
    isClose: 0,

    settings: function () {
        $('#deviceJanusModal').modal('toggle');
        device.start();
    },

    save: function () {
        iconDisablVidu(1000, iconViduPanel);
        device.isClose = 1;
        //appUnPublishing();
        console.log("device modal save");
        console.log(device.videoDevice);
        console.log(device.audioDevice);
      //  videoElement.srcObject = undefined;
        // audioElement.srcObject = undefined;
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        //if (!OV) {
        //  //  startSession(1);
        //    // appPublishByDevice();
        //}
        //else
        //    appPublishByDevice();
    },
    close: function () {

        device.isClose = 1;
      //  videoElement.srcObject = undefined;
        // audioElement.srcObject = undefined;
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        //leaveRoom();
        //if (!OV) {
        //    startSession(0);
        //    // appPublishByDevice();
        //}
        console.log("device modal close");
        // appPublishByDevice();
    },
    start: function () {
      

        device.isClose = 0;
        //if (board.user.permission.audio) document.getElementById('selectAudioInputText').style.display = "block";
        //else document.getElementById('selectAudioInputText').style.display = "none";
        //if (board.user.permission.video) document.getElementById('selectVideoInputText').style.display = "block";
        //else document.getElementById('selectVideoInputText').style.display = "none";
       // iconDisablVidu(2000, iconDevicePanel);
        if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack) webrtClient.stopStream();
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
       // videoElement.srcObject = undefined;
        //  audioElement.srcObject = undefined;
        selectors = [];
        if (board.user.permission.audio) {
            selectors.push(audioInputSelect);
            document.getElementById('audioSourceSelect').style.display = "block";
        }
        else document.getElementById('audioSourceSelect').style.display = "none";
        if (board.user.permission.video) {
            selectors.push(videoSelect);
            document.getElementById('videoSourceSelect').style.display = "block";
            //document.getElementById('videoSelectElement').style.display = "block";
        }
        else {
            document.getElementById('videoSourceSelect').style.display = "none";
            //document.getElementById('videoSelectElement').style.display = "none";
        }

        navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
        //  startdevice();
         return;
        //  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
        setTimeout(function () {
            if (device.isClose == 1) {
                console.log("device is close ....");
                return;
            }
            if (audioInputSelect.length > 0) {
                console.log("ffffffffffffffffffffffffffffffffffff 111111111");
                device.audioDevice = audioInputSelect.value;
            }

            if (videoSelect.length > 0) {
                device.videoDevice = videoSelect.value;
                console.log("ffffffffffffffffffffffffffffffffffff222222222222");
            }
            else {
                console.log("ffffffffffffffffffffffffffffffffffff 333333333333333333333333");
            }
            startdevice();
        }, 1200);


        //  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);

    },
};

'use strict';

//const videoElement = document.getElementById('videoSelectElement');
//  const audioElement = document.getElementById('audioSelectElement');
const audioInputSelect = document.querySelector('select#audioSource');

const videoSelect = document.querySelector('select#videoSource');
const selectorss = [audioInputSelect, videoSelect];
var selectors = [audioInputSelect];


function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map(select => select.value);
    selectors.forEach(select => {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput' && board.user.permission.audio) {
            if (!device.audioDevice) device.audioDevice = deviceInfo.deviceId;
            option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
            audioInputSelect.appendChild(option);

        } else if (deviceInfo.kind === 'videoinput' && board.user.permission.video) {
            if (!device.videoDevice) device.videoDevice = deviceInfo.deviceId;
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source/device: ', deviceInfo);
        }
    }
    //const option2 = document.createElement('option');
    //option2.value = "vedio devoice test id";
    //option2.text = "vedio devoice test";
    //videoSelect.appendChild(option2);
    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
            select.value = values[selectorIndex];
        }
    });
}

//   gotDevices();

function gotStream(stream) {
  //  window.stream = stream; // make stream available to console
   // videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
  //  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function startdevice() {
    //videoElement.srcObject = undefined;
    //audioElement.srcObject = undefined;
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    //return;
    //const constraints = {
    //    audio: device.audioDevice ? { deviceId: { exact: device.audioDevice } } : undefined,
    //    video: device.videoDevice ? { deviceId: { exact: device.videoDevice } } : undefined
    //};
    // const constraints;

    const constraints = {
        audio: { deviceId: device.audioDevice ? { exact: device.audioDevice } : undefined },
        video: { deviceId: device.videoDevice ? { exact: device.videoDevice } : undefined }
    };
    if (!board.user.permission.video)
        constraints.video = false;
    if (!board.user.permission.audio)
        constraints.audio = false;
    //const audioSource = audioInputSelect.value;
    //const videoSource = videoSelect.value;
    //const constraints = {
    //    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    //    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    //};

    console.log(constraints);
    //video: { deviceId: device.videoDevice ? { exact: device.videoDevice } : undefined }
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices);
    // navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

audioInputSelect.onchange = function () {
    //   const audioSource = audioInputSelect.value;
   // iconDisablVidu(2000, iconDevicePanel);
    device.audioDevice = audioInputSelect.value;
  //  startdevice();
    console.log("audio select : " + device.audioDevice);
}


videoSelect.onchange = function () {
    //  const videoSource = videoSelect.value;
   // iconDisablVidu(2000, iconDevicePanel);
    device.videoDevice = videoSelect.value;
    console.log("video select : " + device.videoDevice);
  //  startdevice();
}

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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          //  console.log(reader.result.toString());
            const base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "");

            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}
async function startFileUpload() {
    if (document.querySelector('#file-input').files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    var file = document.querySelector('#file-input').files[0];
    var mime_types = ['image/jpeg', 'image/png', "application/pdf", "application/x-pdf"];

    // validate MIME type
    if (mime_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }
    document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_startUpload;
    document.getElementById('loadFileXml').style.display = "none";
    //const result = await getBase64(file).catch(e => Error(e));
    //if (result instanceof Error) {
    //    console.log('Error: ', result.message);
    //    return;
    //}
    //console.log(result);
    //var m = { type: 'fileuploadMqtt', data: result };
    //mainApp.sendToServer(m);
    //return
     
    //fr = new FileReader();
    //fr.addEventListener("loadend", function () {       
    //    console.log("file upload send :" + fr.result.byteLength + " bytes");
    //    const int8Array = new Int8Array(fr.result);
    //    const data = [];
    //    for (var i = 0; i < int8Array.length; i++) { 
    //        data.push(int8Array[i]);
    //    } 
    //    var m = { type: 'fileuploadMqtt', data: data };
    //    mainApp.sendToServer(m);        
    //});
    //fr.readAsArrayBuffer(file);
    //return;


    var data = new FormData();
    data.append("from", mainApp.meetInfo.userName);
    data.append("meetID", mainApp.meetInfo.meetID);

    data.append('files', document.querySelector('#file-input').files[0]);
   
    var request = new XMLHttpRequest();
    request.open('post', "/" + board.Prefix +'/fileUp/uploadFile');


    request.upload.addEventListener('progress', function (e) {
        var percent_complete = (e.loaded / e.total) * 100;
        percent_complete += "  ";
        document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_startUpload + " : " + percent_complete.substring(0, 3)+ " %";
        console.log(percent_complete);
    });


    request.addEventListener('load', function (e) {
        document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_uploadComplate;
       // setTimeout(function () {
          //  document.getElementById('fileUploadMessage').innerHTML = "";
      //  }, 5000)
        console.log(request.status);
        console.log(request.response);
    });

    // send POST request to server side script
    request.send(data);
    document.querySelector('#file-input').value = '';
}
function startFileOfficUpload() {
    if (document.querySelector('#file-offic-input').files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    var file = document.querySelector('#file-offic-input').files[0];
    console.log(file);
    console.log(file.name);
    console.log(file.type);
    var ext = file.name.split('.').pop().toUpperCase();
    console.log(ext);
  //  var mime_types = ['image/jpeg', 'image/png', "application/pdf", "application/x-pdf"];

    // validate MIME type
    if (officControler.WordFile.indexOf(ext) == -1 && officControler.PowerPointFile.indexOf(ext) == -1 && officControler.ExcelFile.indexOf(ext) == -1 ) {
        document.getElementById('fileOfficUploadMessage').innerHTML = 'Error : Incorrect file type';
        console.log('Error : Incorrect file type');
        return;
    }
    document.getElementById('fileOfficUploadMessage').innerHTML = board.translate.fileManagement_startUpload;

    var data = new FormData();
    data.append("from", mainApp.meetInfo.userName);
    data.append("meetID", mainApp.meetInfo.meetID);

    data.append('files', document.querySelector('#file-offic-input').files[0]);

    var request = new XMLHttpRequest();
    request.open('post', "/" + board.Prefix + '/fileUp/uploadOfficFile');


    request.upload.addEventListener('progress', function (e) {
        var percent_complete = (e.loaded / e.total) * 100;
        console.log(percent_complete);
    });


    request.addEventListener('load', function (e) {
        if (request.response == "ok")
            document.getElementById('fileOfficUploadMessage').innerHTML = board.translate.fileManagement_uploadComplate;
        else
            document.getElementById('fileOfficUploadMessage').innerHTML = "error in upload";
        setTimeout(function () {
            document.getElementById('fileOfficUploadMessage').innerHTML = "";
        }, 5000)
        console.log(request.status);
        console.log(request.response);
    });

    // send POST request to server side script
    request.send(data);
    document.querySelector('#file-offic-input').value = '';
}

var fileService = {
    fileList: null,
    openFilePanelModal: function () {
        $('#filePanelModal').modal('toggle');
    },
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "file":
                fileService.handleReciveFile(data);
                break;
            case "setImage":
                fileService.setImageParse(data);
                break;
        }
    },

    handelFileList: function (fileList) {
        //  bboard.fileList = fileList;
        console.warn(fileList);
        fileService.fileList = fileList;
        //var obj = document.getElementById('filePanel');
        //obj.innerHTML = "";
        try {
            var table = document.getElementById('PdfFiletable');
            var rowCount = table.rows.length;

            for (var i = 0; i < rowCount; i++) {
                table.deleteRow(i);
            }
        } catch (e) {
            console.log(e);
        }
        for (var i = 0; i < fileList.length; i++) {
            var r = fileList[i];
            if (r.pageCount > 0)
                fileService.renderFileToHtmlElement(board.meetID, r.inRoomID, r.name, r.ext);
            else {
                console.warn("page count is 0 : "  );
                console.log(r)
            }
        }

    },

    handleReciveFile: function (data) {
        console.log('handleReciveFile');
        console.log(data);
        
       
        if (data.res != "ok") {
            setTimeout(function () {
                document.getElementById('fileUploadMessage').innerHTML = "error in convert your file";
                document.getElementById('loadFileXml').style.display = "block";
            }, 2000)
           
            return;
        }
        else {
            setTimeout(function () {
                document.getElementById('fileUploadMessage').innerHTML = "convert complate";
                document.getElementById('loadFileXml').style.display = "block";
            }, 2000)
           
        }

    
        var k = { id: 0, inRoomID: data.fileID, ext: data.ext, name: data.fileName, pageCount: data.pdfPageCount, width: data.width, height: data.height, d: null };
        console.log("fifle file fffffffffffffffff");
        console.log(k);
        bboard.addFileToDic(k);
        fileService.renderFileToHtmlElement(board.meetID, data.fileID, data.fileName, data.ext);
    },
    renderFileToHtmlElement: function (meetID, fileID, fileName, ext) {
        //var obj = document.getElementById('filePanel');
        //var s = "";
        //var selectSpan = '<span class="fileItem" onclick="fileService.activeFileServer(' + fileID + ',0)" style="padding: 0px 7px;color: green;cursor: pointer;">select</span>';

        var dl = "/" + board.Prefix + "/files/board/" + meetID + "/pdf/" + fileID + ext;
       // s += '<div>' + fileID + ' -   file ' + fileID + selectSpan + '    <a style="padding:0px 7px;"  href="' + dl + '" target="_blank"> download </a><a onclick="fileService.activeFileServer(' + fileID + ',0)" >' + fileName + '</a></div>';
       // obj.innerHTML += s;

        selectSpan = '<a class="fileItem" href="#" onclick="fileService.activeFileServer(' + fileID + ',0)"  ><i class="fa fa-edit"  ></i> </a>';
        var table = document.getElementById('PdfFiletable');

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var r = '<span>' + fileID + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(1);
        // r = '<span>select</span>';
        cell1.innerHTML = selectSpan;

        cell1 = row.insertCell(2);
        r = '<span>' + fileName + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(3);
        r = '<a href="' + dl + '"  target="_blank"><i class="fas fa-download"></i></a>';
        cell1.innerHTML = r;


    },
    activeFile: function (id) {
        //  var id = data.fileID;

        if (id == 0) {
            defultSlide();

            return;
        }
        for (var i = 0; i < fileService.fileList.length; i++) {
            var r = fileService.fileList[i];
            if (r.d.fileID == id) {
                fileService.FileToBoard(r.d);
                return;
            }
        }
    },
    FileToBoard: function (data) {

        console.log("file : " + data.pdfPageCount + " : " + data.pdfOrder + " w is " + data.width + " h is : " + data.height);
        prepareBoard(data.width, data.height);
        // board.meetID = data.meetID;
        newPdf(data.pdfPageCount, data.pdfOrder);

    },
    activeFileServer: function (fileID, pageID) {
       // panelControler.disconectScreenShare();
        boardClick();
        console.log(fileID);
        var p = { type: 'board', action: 'fileSelect', p: 0, f: fileID, m: '', };
       // var m = { "type": "board", "board": "draw", "d": { "t": "pageSelect", "drawId": 1, "at": "", "num": pageID, "fileID": fileID, "del": 0, "type": "board", "board": "draw" } }
        mainApp.sendToServer(p);
    },

    setImageParse: function (data) {
        var action = data.action;
        switch (action) {
            case "set":
                fileService.setImage(data);
                break;
            case "clearImage":
                fileService.clearImage(data);
                break;
        }

    },
    setImage: function (data) {

        console.warn("setImage");
        var p = "/" + board.Prefix +"/files/board/" + board.meetID + "/img/" + data.fileID + "/" + data.imgId + ".jpg";
        console.log(p);
        document.getElementById('whiteboardBG').style.backgroundImage = "url(" + p + ")";
        console.log(data);
    },
    clearImage: function (data) {
        console.warn("clearImage");
        document.getElementById("whiteboardBG").style.backgroundImage = "none";
        console.log(data);
    },
    clearImageRequstToServer: function () {
        var m = { "type": "board", "board": "draw", "d": { "t": "setImage", "action": "clearImage", "num": bboard.pageID, "fileID": bboard.fileID, "type": "board", "board": "draw" } }
        console.log(m);
        mainApp.sendToServer(m);
    },
};
function uploadFiles(inputId) {


    var input = document.getElementById(inputId);
    var files = input.files;
    if (files.length < 1) return;
    var formData = new FormData();
    formData.append("files", files[0]);
    //for (var i = 0; i != files.length; i++) {
    //    formData.append("files", files[i]);
    //}
    formData.append("from", mainApp.meetInfo.userName);
    formData.append("meetID", mainApp.meetInfo.meetID);

    console.log(formData);
    $.ajax(
        {
            url: "/" + board.Prefix + "/fileUp/uploadFile",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                var resData = JSON.parse(data);
                console.log(resData);
                document.getElementById('fileUploadMessage').innerHTML = "upload complate";
                setTimeout(function () {
                    document.getElementById('fileUploadMessage').innerHTML = "";
                }, 5000)
                //   document.getElementById("dldl").href = resData.data;

            }
        }
    );
    document.getElementById('fileUploadMessage').innerHTML = "file upload start .......";
}
function uploadimgs(inputId) {


    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    formData.append("from", mainApp.meetInfo.userName);
    formData.append("fileID", bboard.fileID);
    formData.append("meetID", mainApp.meetInfo.meetID);
    formData.append("pageID", bboard.pageID);

    console.log(formData);
    $.ajax(
        {
            url: "/" + board.Prefix +"/fileUp/uploadImg",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                var resData = JSON.parse(data);
                console.log(resData);
                //   document.getElementById("dldl").href = resData.data;

            }
        }
    );
}
function is_touch_device1() {
    return 'ontouchstart' in window;
}
if (is_touch_device1()) {
    $('.toolbarHide').hide();

    console.warn("bbbbbbbbbbbbbbb ontouchstart" + is_touch_device1());

}
console.warn("bbbbbbbbbbbbbbb ontouchstart" + is_touch_device1());

var iconViduPanel = document.getElementById('iconPanelVidu');
var publisher2;
var session2;
var OV2;

var session3 = 0;
var OV3;

var AsessionId = "a" + board.meetID;
var boardHtmlpanel;
var screenSharePanel;


function joinShRoom() {
    //  return;
    OV2 = new OpenVidu();
    OV2.setAdvancedConfiguration({
        iceServers: [
            { url: "stun:stun.freeswitch.org" },
            {
                urls: "turns:r2.salampnu.com:443?transport=tcp",
                username: "ali",
                credential: "ali"
            }
        ]
    });
    session2 = OV2.initSession();
    session2.on('connectionCreated', function (event) {
        //  console.warn("sh   connectionCreated");
        //   console.warn("sh   connectionCreated");
        //  console.warn(event);
    });
    session2.on('connectionDestroyed', function (event) {
        //  console.warn(" sh   connectionDestroyed event");
        //  console.warn(event);
    });
    session2.on('streamCreated', function (event) {
        // Subscribe to the Stream to receive it. HTML video will be appended to element with 'subscriber' id
        //  console.log("sh streamCreated : ");
        //   console.log(event);
        //  console.log(event.stream);
        var screenSubscriber2;
        if (event.stream.typeOfVideo == "SCREEN") {

            if (session3 != 0 && event.stream.connection.connectionId == session3.connection.connectionId)
                console.warn("this is local chreen ; ");

            else {

                screenSubscriber2 = session2.subscribe(event.stream, 'screenShareElemnt');
                screenSubscriber2.on('videoElementCreated', function (event) {
                    connectToScreenShare();
                    //  console.log("sh ggggggggggg : ");
                    //  console.log(event);
                    //   console.log(event.stream);


                    //  console.log("sh not camera ");

                });
                screenSubscriber2.on('videoElementDestroyed', function (event) {
                    screenControler.disconnectFromScreenShare();
                    panelControler.activeBoard();
                    // console.warn("sh videoElement Destroyed videoElement sss Destroyed event");
                    //  console.warn(event);
                });

            }
        }


        else {
            subscriber2 = session2.subscribe(event.stream, 'videos');

            // When the new video is added to DOM, update the page layout to fit one more participant
            subscriber2.on('videoElementCreated', function (event) {
                //  console.log("fffffffffffffff : ");
                // console.log(event);
                //  console.log(event.stream);

                numOfVideos++;
                updateLayout();
                //  console.log("camera ");

            });
            subscriber2.on('videoElementDestroyed', function (event) {
                //  console.warn("videoElementDestroyed videoElementDestroyed event");
                //  console.warn(event);
            });

        }



    });
    session2.on('streamDestroyed', function (event) {
        //console.log("dddddddddddddddd : ");
        //console.warn(event);
        //console.log("dddddddddddddddd : " + event.stream);
        //// Update the page layout
        //numOfVideos--;
        //updateLayout();
    });
    session2.on('signal', (event) => {
        //  console.log(event.data); // Message
        // console.log(event.from); // Connection object of the sender
        //  console.log(event.type); // The type of message
    });
    getToken(AsessionId).then(token => {

        session2.connect(token)
            .then(() => {


            })
            .catch(error => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    });


}

 function startScreenShare1000() {
     if (screenControler.screenShareRemoteStatus) {
        console.log("screenShareRemoteStatus = 1;");
        return;
    }
    iconDisablVidu(6000, MainNavBar);
     iconDisablVidu(6000, iconViduPanel);
     publishScreen();
     return;
    OV3 = new OpenVidu();
    //OV3.setAdvancedConfiguration({
    //    iceServers: [
    //        { url: "stun:stun.freeswitch.org" },
    //        {
    //            urls: "turns:r2.salampnu.com:443?transport=tcp",
    //            username: "ali",
    //            credential: "ali"
    //        }
    //    ]
    //});
    session3 = OV3.initSession();
    getToken(sessionId).then(token => {
        console.log("my token : " + sessionId);
        session3.connect(token)
            .then(() => {
                console.log("my token");
                publisher2 = OV3.initPublisher('screenShareElemnt', { videoSource: "screen", publishAudio: false, audioSource: false }, function (error) {

                    if (error.name == 'SCREEN_EXTENSION_NOT_INSTALLED') {
                        showWarning(error.message);
                    } else if (error.name == 'SCREEN_SHARING_NOT_SUPPORTED') {
                        alert('Your browser does not support screen sharing');
                    } else if (error.name == 'SCREEN_EXTENSION_DISABLED') {
                        alert('You need to enable screen sharing extension');
                    } else if (error.name == 'SCREEN_CAPTURE_DENIED') {
                        alert('You need to choose a window or application to share');
                    }
                });
                publisher2.on('videoElementDestroyed', function (event) {
                    
                    disconnectFromScreenShare();
                });
                publisher2.on('videoElementCreated', function (event) {
                   
                    connectToScreenShare();
                    screenShareStatus = 1;
                    iconEnableVidu(iconViduPanel);
                    iconEnableVidu(MainNavBar);
                    

                    publisher2.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                        
                        session3.unpublish(publisher2);
                        disconnectFromScreenShare(); 

                    })

                });
                session3.publish(publisher2);
                session3.on('streamDestroyed', event => {
                    //  console.warn(event);
                    if (event.stream.typeOfVideo == "SCREEN") {
                        disconnectFromScreenShare();
                    }
                    
                });
            });
    });
}

var intervalIDkkk = 0;

function kkk() {
    //  session2.publish(publisher2);
    intervalIDkkk = 2;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.....................................................................");
    return;
    publisher2.stream.getMediaStream().addEventListener('inactive', () => {
        //  alert("dddddddd");
        //  console.warn('User pressed the "Stop sharing" button');
        // You can send a signal with Session.signal method to warn other participants
    });
} 

function _viduModulStart() {
    boardHtmlpanel = document.getElementById("boardHtmlpanel");
    screenSharePanel = document.getElementById("screenSharePanel");
    // joinShRoom();
    console.warn("board.isMobile : " + board.isMobile);
    // if (board.isMobile == 1) return;
    //setInterval(function () {
    //    // var objlist = $("#session video");
    //   // resizingVideoBox();

    //}, 40000);
}
function resizingVideoBox() {
    return;
    var objlist = $('#session video[style*="display: block"]');
    // var objlist = $('#session video');
    var len = objlist.length;
    var bodyClasslist = document.getElementsByTagName('body')[0].classList;
    if (len > 0) {
        if (!bodyClasslist.contains('videos')) {
            document.getElementsByTagName('body')[0].classList.add("videos");
            layout.resizeBoard();
        }
       
    }
    else {
        if (bodyClasslist.contains('videos')) {
            document.getElementsByTagName('body')[0].classList.remove("videos");
            layout.resizeBoard();
        }
       
    }
    var iconPanelVidu = document.getElementById('iconPanelVidu');
    //var per = board.permission.user.permission;
    var hm = 35;
    if (iconPanelVidu.style.display=="none") hm = 0;
    var h = $("#videosBox").height() - hm;
    var w = $("#session").width();
  //  if (layout.sessionPanelPosetion == 1) w = layout.rightPanelwidth-4;
    //console.log("hhh : " + h);
    //console.log("www : " + w);


   
    var t3 = bestMatchCalculate(w, h, len, 0);
    //console.log("t33333333333333333 : " + t3);

    for (var i = 0; i < objlist.length; i++) {
        // console.log(i);

        objlist[i].parentNode.style.width = t3 + "px";
        objlist[i].parentNode.style.height = t3 + "px";
    }
    return;
    // console.log(len);
    if (len == 1) {
        var k = Math.min(h, w);
        // objlist[0].className = "video11";
        objlist[0].style.width = k + "px";
    }
    if (len > 1) {
        var k;
        var q = (w);
        if (h < 280 || len == 2) {
            var q2 = (q / len);
            k = Math.min(h, q2);

        }
        else {
            var h2 = (h) / 2;
            q = ((w * 2));
            //  q = q * 2;
            if (isOdd(len)) len++;
            var q2 = q / (len);
            k = Math.min(h2, q2);
        }
        for (var i = 0; i < objlist.length; i++) {
            // console.log(i);

            objlist[i].style.width = k + "px";
        }

    }
}
function bestMatchCalculate(w, h, n, xxx) {
    var max = Math.max(w, h);
    var min = Math.min(w, h);
    var r = Math.round(max / min);
    //console.log("r : " + r);
    var t = n * r;
    //console.log("t : " + t);
    var t2 = Math.ceil(Math.sqrt(t));
    // t2 = Math.min(t2, n);
    //console.log("t2 : " + t2);
    var t3 = max / t2;
    //console.log("t3 : " + t3);
    var k1 = (Math.ceil(n / t2));
    //console.log("k1 : " + k1);
    var newMin = min / k1;
    //console.log("newMin : " + newMin);
    if (n == 1) t3 = min;
    var t4 = Math.min(newMin, t3);
    //console.log("t4 : " + t4);
    return t4;
    if (newMin < t3) {
        //xxx = xxx+1
        //console.log("callbakk : " + xxx);
        //return bestMatchCalculate(w, h, n, xxx)  
    }
    else {
        return t3;
    }




}

function isOdd(num) { return num % 2; }
viduAppUi = {
    mute_video: document.getElementById('mute-video-span'),
    mute_audio: document.getElementById('mute-audio-span'),
    device_settings_span: document.getElementById('device-settings-span'),
    renserToolbox: function (per) {
        //viduAppUi.mute_video = document.getElementById('mute-video-span');
        //viduAppUi.mute_audio = document.getElementById('mute-audio-span');
        //viduAppUi.leave_room = document.getElementById('leave-room-span');
        //console.log('viduAppUi');
        //console.log(per);
       // viduAppUi.mute_audio.style.display = 'none';
       
        showToolbar(per);
        return;
        //console.log('viduAppUi2');
        //document.getElementById('mute-video').style.display = 'none';
        // viduAppUi.mute_audio.display = 'none';
        if (per.audio) viduAppUi.mute_audio.style.display = 'inline';
        else viduAppUi.mute_audio.style.display = 'none';
        if (per.video) viduAppUi.mute_video.style.display = 'inline';
        else viduAppUi.mute_video.style.display = 'none';
        if (per.audio || per.video) {
            viduAppUi.device_settings_span.style.display = 'inline';
            var iconPanelVidu = document.getElementById('iconPanelVidu');
            iconPanelVidu.style.display = "block";
        }
        else {
            var iconPanelVidu = document.getElementById('iconPanelVidu');
            iconPanelVidu.style.display = "none";
            viduAppUi.device_settings_span.style.display = 'none';
        }
        if (!per.screen) {
            if (screenControler.screenShareStatus)
                screenControler.stopOwnScreenShare();

        }
        resizingVideoBox();
       // if (publisher == undefined) return;
        if (!per.video && !per.audio) {
           
            //var sessionPanel = document.getElementById('session');
            //sessionPanel.style.height=
            //   appUnPublishing();
            if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack)
                webrtClient.stopStream();

            return;
        } 
        if (!per.video && webrtClient.LocalVideoTrack) {
            webrtClient.stopStream();
            return;
        }
        if (!per.audio && webrtClient.LocalAudioTrack) {
            webrtClient.stopStream();
            return;
        }
        //if (per.video) videoEnabled = true;
        //else videoEnabled = false;
    },

};

var boardControler = {
    intervalID: null,
    pageId: 0,
    sendMessage:1,
    click: function () {
        var r = { type: "board", action: "pageSelect", p: 2,   m: "" };
        mainApp.sendToServer(r);
        return;
        if (boardControler.intervalID == null) {

            boardControler.intervalID = setInterval(boardControler.setInterval, 2000);
        }
        else {
            clearInterval(boardControler.intervalID);
            boardControler.intervalID = null;
            console.log('board controler interval stop')
        }
    },
    setInterval: function () {
        console.log('board controler interval');
        boardControler.pageId++;
        if (boardControler.pageId > 6) boardControler.pageId = 0;
        toPage(boardControler.pageId);
    }
}
var panelControler = {
    activePanel: "board",
    nextPanel: null,
    selectNextPanel: function () {
        
        console.log("panelControler select next panel : " + panelControler.nextPanel);
        var n = panelControler.nextPanel;
        panelControler.prseAction(n);
        //if (n == "player") panelControler.activePlayer();
        //else panelControler.activeBoard();
        //setTimeout(()=>{ panelControler.nextPanel = null }, 12000);
    },
    parse: function (data) {
        
        panelControler.prseAction(data.action);
    },
    prseAction: function (action) {
        switch (action) {
            case "board":
                panelControler.activeBoard();
                break;
            case "offic":
                officControler.start();
                break;
            case "Diagram":
                diagramControler.start();
                break;
            case "MathEditor": 
                MathEditorControler.start();
                break;
            case "Develop":
                developControler.start(); 
                break;
            case "vPlayer":
                vPlayer.show();
                break;
            case "Conference":
                webRtcControler.start();
                break;
        }
    },
    activeBoard: function () {
        panelControler.nextPanel = "board";
        
        if (panelControler.activePanel == "board") return;
        panelControler.activePanel = "board";
      //  panelControler.disconectScreenShare();
      //  panelControler.stopPlayer();
        //vPlayer.isHide = 1;

        panelControler.disableAll();
        document.getElementById('boardHtmlpanel').style.visibility = "visible";
        $(".boardIcon").css("color", "red");

       
    },
    activePlayer: function () {
        panelControler.nextPanel = "vPlayer";
        
        if (panelControler.activePanel == "vPlayer") return;
        panelControler.activePanel = "vPlayer";
       // panelControler.disconectScreenShare();
        //vPlayer.isHide = 0;
        panelControler.disableAll();
       // document.getElementById('boardHtmlpanel').style.display = "none";
      //  document.getElementById('screenSharePanel').style.display = "block";       
        //  document.getElementById('screenShareElemnt').style.display = "none";
        document.getElementById('vidioPlayerElement').style.display = "block";
        document.getElementById('vidioPlayerElement').style.visibility = "visible";
      //  $(".farfar").css("color", "black");
        $("vPlayerIconPanel").css("color", "red");
        
    },
    activeScreen: function () {
      //  panelControler.nextPanel = "board";
       // console.log("panelControler : " + panelControler.activePanel);
        if (panelControler.activePanel == "screen") return;
        panelControler.activePanel = "screen";
       // panelControler.stopPlayer();
        //vPlayer.isHide = 1;
        panelControler.disableAll();
       // document.getElementById('screenSharePanel').style.display = "block";
        //   document.getElementById('boardHtmlpanel').style.display = "none";
        document.getElementById('screenShareElemnt').style.visibility = "visible";
      //  document.getElementById('vidioPlayerElement').style.display = "none";
      
        $(".screanShareIcon").css("color", "red");

       
    },
    activeDiagram: function () {
        panelControler.nextPanel = "Diagram";
        //console.log("panelControler ................................................................ : " + panelControler.activePanel);
        if (panelControler.activePanel == "Diagram") return;
        panelControler.activePanel = "Diagram";
        
        panelControler.disableAll();
      //  document.getElementById('screenSharePanel').style.display = "block";
        
        // document.getElementById('diagramPanel').style.display = "block";
        document.getElementById('diagramPanel').style.visibility = "visible";

        $(".diagramIcon").css("color", "red");


    },

    activeOffic: function () {
        panelControler.nextPanel = "offic";
        console.log("panelControler : " + panelControler.activePanel);
        if (panelControler.activePanel == "offic") return;
        panelControler.activePanel = "offic";

        panelControler.disableAll();
        //  document.getElementById('screenSharePanel').style.display = "block";

        // document.getElementById('diagramPanel').style.display = "block";
        document.getElementById('officPanel').style.visibility = "visible";

        $(".officIcon").css("color", "red");


    },

    activeMathEditor: function () {
        panelControler.nextPanel = "MathEditor";
        //console.log("panelControler** : " + panelControler.activePanel);
        if (panelControler.activePanel == "MathEditor") return;
        panelControler.activePanel = "MathEditor";

        panelControler.disableAll();
        //  document.getElementById('screenSharePanel').style.display = "block";

        document.getElementById('MathEditorPanel').style.visibility = "visible";


        $(".MathEditorIcon").css("color", "red");


    },
    activeDevelop: function () {
        panelControler.nextPanel = "Develop";
       
        if (panelControler.activePanel == "Develop") return;
        panelControler.activePanel = "Develop";
        panelControler.disableAll();         
        document.getElementById('developPanel').style.visibility = "visible";
        $(".developPanelIcon").css("color", "red");


    },
    activeConference: function () {
        

        if (panelControler.activePanel == "Conference") return;
        panelControler.activePanel = "Conference";
        panelControler.disableAll();
       // document.getElementById('developPanel').style.visibility = "visible";
        baseLayout.parse(layout.id+'4');
        $(".screanShareIcon").css("color", "red");


    },


    disableAll: function () {
        if (panelControler.activePanel != "Conference")
            panelControler.DisconnectConfrance();
        if (panelControler.activePanel != "player")
        panelControler.stopPlayer();

        //document.getElementById('screenShareElemnt').style.display = "none";
        //document.getElementById('vidioPlayerElement').style.display = "none";
        //document.getElementById('screenSharePanel').style.display = "none";
        //document.getElementById('boardHtmlpanel').style.display = "none";
        //document.getElementById('diagramPanel').style.display = "none";
        //document.getElementById('MathEditorPanel').style.display = "none";centerPanelItem 

        $(".centerPanelItem").css("visibility", "hidden");
        document.getElementById('vidioPlayerElement').style.display = "none";
       // $(".vjs-has-started").css("visibility", "hidden");

        diagramControler.isActive = 0;
        MathEditorControler.isActive = 0;
        officControler.isActive = 0;
        webRtcControler.isActive = 0;
        developControler.end();
        $(".farfar").css("color", "black");
    },
    disconectScreenShare: function () {
        if (screenControler.screenShareStatus) {
            screenControler.stopOwnScreenShare();
        }
        else {
            screenControler.disconnectFromScreenShare();
        }
    },
    stopPlayer: function () {
        vPlayer.stop();
        vPlayer.isActive = 0;
    },
    DisconnectConfrance: function () {
        webRtcControler.isActive = 0;
        layout.load();
       // webRtcControler.isActive = 0;
    }
}

var developControler = {
    isActive: 0,
    isLoad: 0,
    ifram: document.getElementById('developFrame'),
    Interval: null,
    lastFile: 'html',


    onClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    boardClick();
        //    return;
        //}
        if (developControler.isActive == 1)
            developControler.end();
        else {
            var m = { type: 'panelControler', action: 'Develop' };
            var res = mainApp.sendToServer(m);
        }
        // diagramControler.start();
    },
    start: function () {

        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeDevelop();
        if (developControler.isActive) return;
        developControler.isActive = 1;
        if (layout.id == 1 && layout.sessionPanelPosetion == 3 ) {

            baseLayout.parse('11');
        }
        //return;
        if (!developControler.isLoad) {
            load_script_promise("/" + board.Prefix +"/monaco/dist/monaco.bundle.js?v=1.01")
                .then(function (script) {
                    developControler.isLoad = 1;
                    window.loadComplate('meet_' + board.meetID);
                    //developControler.selectLanguageFile(developControler.lastFile);
                  
                    developControler.setConsole();
                  
                    developControler.selectLanguageFile();
                   // $('#nav-home-tab').tab('show');
                });
        }
        developControler.Interval = setInterval(developControler.frameRefresh, 3000);
    },
    end: function () {
        clearInterval(developControler.Interval);
        developControler.isActive = 0;
    },
    fileClick: function (lang) {
       // console.log(window.example);
       // console.log(window.example.ydoc.getText('monaco').toString());
        var m = { type: 'Develop', action: 'selectLanguage', lang: lang };
        var res = mainApp.sendToServer(m);
       
        // kkpppp(type);
    },
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "selectLanguage":
                developControler.selectLanguage(data);
                break;
        }
    },
    selectLanguage: function (data) {
        var lang = data.lang;
        developControler.lastFile = lang;
        developControler.selectLanguageFile();
    },
    selectLanguageFile: function () {
        document.getElementById('monaco-editor-tab-html').classList.remove("active");
        document.getElementById('monaco-editor-tab-java').classList.remove("active");
        document.getElementById('monaco-editor-tab-css').classList.remove("active");
        document.getElementById('nav-tab-html').classList.remove("active");
        document.getElementById('nav-tab-java').classList.remove("active");
        document.getElementById('nav-tab-css').classList.remove("active");

        document.getElementById('monaco-editor-tab-' + developControler.lastFile).classList.add("show");
        document.getElementById('monaco-editor-tab-' + developControler.lastFile).classList.add("active");
        document.getElementById('nav-tab-' + developControler.lastFile).classList.add("active");
       // document.getElementById('nav-tab-' + developControler.lastFile).click();
        return;
        //var theme = 'vs';
        //if (lang == 'javascript') theme = 'vs-dark';

        ////  if (lang == 'css') theme = 'hc-black'; 
        //selectLanguage(lang, theme);
    },
    frameRefresh: function () {
       // console.log('interval');
        document.getElementById("developFrameConsole").innerHTML = "";
        try {
            //var html = window.example.ydoc.getText('html').toString(); 
            var html =  window.example.htmlEditor.getValue(); 
           // var java = '<script>' + window.example.ydoc.getText('java').toString() + '</script>';
            var java = '<script>' + window.example.javaEditor.getValue() + '</script>';
            //console.warn(java);
           // var css = '<style>' + window.example.ydoc.getText('css').toString() + '</style>';
            var css = '<style>' + window.example.cssEditor.getValue() + '</style>';
            var h = css + html + java;
            // developControler.ifram.src = "data:text/html;charset=utf-8," + escape(css + html + java);
           // var s = "<html><head></head><body><div>Test_Div</div></body></html>";
            // $("#developFrame").contents().find('html').html(css + html + java);
            developControler.replaceIframeContent(  h);

        } catch { }

    },
    setConsole: function () {
        var developIframeWindow = developControler.ifram.contentWindow;
        developIframeWindow.console.log = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        
        developIframeWindow.console.warn = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developIframeWindow.console.error = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };

        developIframeWindow.console.trace = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developIframeWindow.console.info = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "green";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developControler.ifram.onerror = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            //span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
    },
    replaceIframeContent: function ( newHTML) {
        developControler.ifram.src = "about:blank";
        developControler.ifram.contentWindow.document.open();
        developControler.ifram.contentWindow.document.write(newHTML);
        developControler.ifram.contentWindow.document.close();
    },
    editorChange: function () {
        console.log('editor change');
    }
}
 
var diagramControler = {
    isActive: 0,
    diagramIframe: document.getElementById('diagramIframe'),
    lastMessage: null,
    getMessage: 0,
    sendMessage: 0,
    ui: 'min',//atlas

    diagramClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    boardClick();
        //    return;
        //}
        if (diagramControler.isActive == 1)
            diagramControler.end();
        else {
            var m = { type: 'panelControler', action: 'Diagram' };
            var res = mainApp.sendToServer(m);
        }
       // diagramControler.start();
    },
    start: function () {

        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeDiagram();
        if (diagramControler.isActive) return;
        diagramControler.isActive = 1;
        if (diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")
        {
            console.log('layout.id ' + layout.id + ' layout.sessionPanelPosetion ' + layout.sessionPanelPosetion);
            diagramControler.diagramIframe.src = "/" + board.Prefix + "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
            if (layout.id == 1 && layout.sessionPanelPosetion == 3) {

                baseLayout.parse('11');
            }
        }
        else {
            if (diagramControler.lastMessage != null)
                diagramControler.diagramIframe.contentWindow.parentMessage(diagramControler.lastMessage);
        }

         
    },
    setPermissen: function (per) {
        if (per == 1) {
            diagramControler.ui = 'atlas';
        }
        else {
            diagramControler.ui = 'min';
        }
     
        if (!(diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")) {
            diagramControler.diagramIframe.src = "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
        }
    },
    end: function () {
        
       // diagramControler.isActive = 0;
        boardClick();
    },
    iframeMessage: function (m) {
       
        if (!board.user.permission.diagram) {
            console.log(' diagram permissen eerroorr');
            diagramControler.sendLastMessage();
            return;
        }
        console.log('fff');
        console.log(m);
        var m = { type: 'diagram', m: m };
        if (diagramControler.getMessage == 1)
            mainApp.sendToServer(m);
        else {
            diagramControler.sendLastMessage();
        }
        // var iframe = document.getElementById("iframeId");
       // diagramControler.diagramIframe.contentWindow.parentMessage('kkkkkkkkk');
    },
    iframeMessageLoadComplate: function () {
        console.log("iframeMessageLoadComplate");
        diagramControler.sendMessage = 1;
        diagramControler.sendLastMessage();
        setTimeout(() => {
            diagramControler.getMessage = 1;
            diagramControler.sendLastMessage();
        }, 2000);
       
    },
    sendLastMessage: function () {
        if (diagramControler.lastMessage != null)
            diagramControler.diagramIframe.contentWindow.parentMessage(diagramControler.lastMessage);
    },
    parse: function (data) {
        diagramControler.lastMessage = data;
        var name = data.meetInfo.userName;
        if (name == board.userName) {
            console.log("this is my message");
            return;
        }
        if (diagramControler.isActive == 0)
        {
            diagramControler.start();
            return;
        }
        if (diagramControler.sendMessage == 0) return;
        console.warn('get diagram data from server .....');
        console.log(data);
        diagramControler.diagramIframe.contentWindow.parentMessage(data);
    },

}
 

var baseLayout = {
    parse: function (a) {
        switch (a) {
            case "1":
                layout.setLayoutID();
                break;
            case "11":
                baseLayout.layoutChange(1, 1);
                break;
            case "12":
                baseLayout.layoutChange(1, 2);
                break;
            case "13":
                baseLayout.layoutChange(1, 3);
                break;
            case "14":
                baseLayout.layoutChange(1, 4);
                break;
            case "21":
                baseLayout.layoutChange(2, 1);
                break;
            case "22":
                baseLayout.layoutChange(2, 2);
                break;
            case "23":
                baseLayout.layoutChange(2, 3);
                break;
            case "24":
                baseLayout.layoutChange(2, 4);
                break;
        }
        layout.startRender();
    },
    render: function () {
       layout.resizeBoard();
        layout.setRightPanel();
         //resizingVideoBox();  
    },
    layoutChange: function (id,posetion) {
        layout.id = id;
        layout.sessionPanelPosetion = posetion;

    },
    changLayouInputValue: function () {
        var obj = document.getElementById('layoutDropDownSelect');
        var value = layout.id + '' + layout.sessionPanelPosetion;
        console.log(value);
        obj.value = value;
    }
};
var layout = {
    id: 1,
    rightPanelwidth: 400,
    sessionPanelPosetion: 1,
    leftPanelWidth: 1,
    sessionPanelheight: 180,
    centerVideoPanelWidth: 400,
    menuStatus: 0,
    element: {
        screenAndBoard: document.getElementById('screenAndBoard'),
        newVideosBox: document.getElementById('newVideosBox'),
        page_content_wrapper: document.getElementById('page-content-wrapper'),
        sidebar_wrapper: document.getElementById('sidebar-wrapper'),
        centerVideoPanel: document.getElementById('centerVideoPanel'), 
        MainNavBar: document.getElementById('MainNavBar'),
        wrapper: document.getElementById('wrapper'),
        boardHtmlpanel: document.getElementById('boardHtmlpanel'),

    },
    load: function() {
        layout.setLayoutID();
        layout.startRender();
       
    },
    startRender: function(){
        layout.setRightPanel();

        layout.setSessionPanelPosetion(layout.sessionPanelPosetion);
        layout.setWraperCss();
        
        layout.resizeBoard();
        layout.setMenu();
        baseLayout.changLayouInputValue();
        webRtcControler.CHANGEMYPEER();
    },
    setMenu: function () {
        console.log('setMenu');
        var w = $("#MainBarMobile").width();
        console.log(w);
        var obj = document.getElementById('MainBarDesctop');
        if (w >= 600) {
            obj.style.display = "block";
        }
        else {
            obj.style.display = "none";
        }
    },
    reLoad: function () {
        layout.load();
       // layout.resizeBoard();
       
    },
    setLayoutID: function () {
        if (webRtcControler.isActive) {
            if (w > 1000) layout.id = 1;
            else layout.id = 2;
            return;
        }
        layout.sessionPanelPosetion = 1;
       // return;
        var w = $(window).width();
        var h = $(window).height();
        if (w > 1000) {
            layout.id = 1;
            layout.sessionPanelPosetion = 1;
            if (w > 1400) layout.sessionPanelPosetion = 1;
        }
        else {
            layout.id = 2;
            if (h < 700 && w>650) {
                layout.sessionPanelPosetion = 3;
            } else layout.sessionPanelPosetion = 2;
          
        }
       // if (w < 450) layout.rightPanelwidth = w - 100;

    },
    setAutoSessionPanelPosetion: function () {
        var w = $(window).width();
        if (w > 1000) layout.setsessionPanelPosetion = 1;
        else layout.sessionPanelPosetion = 2;
    },
    setSessionPanelPosetion: function (pos) {
        layout.sessionPanelPosetion = pos;
        layout.setWraperCss();
        //var newVideosBox = layout.element.newVideosBox;// document.getElementById('newVideosBox');
        //var centerVideoPanel = layout.element.centerVideoPanel;// document.getElementById('centerVideoPanel');
        if (pos == 3 ) {
           
            //if (layout.id == 1) layout.element.page_content_wrapper.style.paddingRight = layout.rightPanelwidth + "px";
            //else layout.element.page_content_wrapper.style.paddingRight = "0px";
            $("#videosBox").appendTo($("#centerVideoPanel"));
           
            //centerVideoPanel.style.display = "block";
            //newVideosBox.style.display = "none";
        }
        if (pos == 1) {
            $("#videosBox").appendTo($("#lpanelVideo")); 
            if (layout.id == 2) {
               // if (!layout.menuStatus)
                 //   layout.menuToggle();
            }
            //layout.element.page_content_wrapper.style.paddingRight =   "0px";
          
           
            //centerVideoPanel.style.display = "none";
            //newVideosBox.style.display = "none";
        }
        if (pos == 2 || pos == 4) {
            //newVideosBox.style.height = layout.sessionPanelheight + "px";
            //layout.element.page_content_wrapper.style.paddingRight = "0px";
            $("#videosBox").appendTo($("#newVideosBox"));
            
            //centerVideoPanel.style.display = "none";
            //newVideosBox.style.display = "block";
            //if (layout.id == 1) newVideosBox.style.paddingRight = layout.rightPanelwidth + "px";
        }
        layout.setRightPanel();
        //setTimeout(function () { resizingVideoBox(); }, 3000);
        //resizingVideoBox();
    },
    setLeftPanelWidth: function () {
        var w = $(window).width();
        if (layout.id == 2) layout.leftPanelWidth = w;
        else layout.leftPanelWidth = w - layout.rightPanelwidth;
    },
    setRightPanel: function () {
        


        //var h = $(window).height();
        //var list = document.getElementsByClassName("lPanel");
        if (layout.sessionPanelPosetion == 1) {
            // console.warn("wwwwwwwwwwwww");
            // document.getElementById('chatContiner').style.height = "100px";
           // document.getElementById('lpanelVideo').style.display = "block";
            //for (var i = 0; i < list.length; i++)
            //    list[i].style.height = h / 3 + "px";
            layout.element.sidebar_wrapper.classList = "element3";
        }
        else {
            layout.element.sidebar_wrapper.classList = "element2";
           // document.getElementById('lpanelVideo').style.display = "none";
            //for (var i = 0; i < list.length; i++)
            //    list[i].style.height = h / 2 + "px";
        }
        //setChatPanel();
        //setTimeout(function () {  },100);
        
       // layout.setLeftPanelWidth();
    },
    menuDisplayed: function () {
        //if (layout.id == 1) layout.element.sidebar_wrapper.style.width = layout.rightPanelwidth + "px";
        layout.setWraperCss();
        return;
        if (layout.id == 1) {
           // document.getElementById('newVideosBox').style.paddingRight = layout.rightPanelwidth + "px";
           
            //document.getElementById('sidebar-wrapper').style.width = layout.rightPanelwidth + "px";
            //document.getElementById('menu-toggle').style.display = "none";
            if (layout.sessionPanelPosetion == 3) {
             //  document.getElementById('page-content-wrapper').style.paddingRight = layout.rightPanelwidth + "px";
            }
            else {
              //  document.getElementById('page-content-wrapper').style.paddingRight =  "0px";
            }
            
        }
        else {
           // layout.menuToggle();
           
            //document.getElementById('newVideosBox').style.paddingRight = "0px";
            //document.getElementById('menu-toggle').style.display = "block";
           
            if (layout.sessionPanelPosetion == 3) {
             //   document.getElementById('page-content-wrapper').style.paddingRight = "0px";
            }
            else {
               
              //  document.getElementById('page-content-wrapper').style.paddingRight = "0px";
            }
            
           
        }
       
    },
    setWraperCss: function () {
        var cssClass = "id_" + layout.id + " pos_" + layout.sessionPanelPosetion;
        layout.element.wrapper.classList = cssClass;
    },
    resizeBoard: function () {
       // resizeNewBoard();
        bboard.changePage(bboard.pageID);
        return;
        var w = $(window).width();      
        var h = $(window).height() - 67;
       // var newVideosBox = document.getElementById('newVideosBox');
       // var centerVideoPanel = document.getElementById('centerVideoPanel');
        if (layout.id == 1) w = w - layout.rightPanelwidth;
        if (layout.sessionPanelPosetion == 2) {
            layout.element.newVideosBox.style.height = layout.sessionPanelheight + "px";          
            h = h - layout.sessionPanelheight;             
        }
        if (layout.sessionPanelPosetion == 3) {
            w = w - layout.centerVideoPanelWidth;          
        }
        if (layout.sessionPanelPosetion == 1) {
            
        }
        var w2 = $('#screenAndBoard').width();  
        layout.leftPanelWidth =w2 ;
       // layout.element.screenAndBoard.style.width = layout.leftPanelWidth + "px";
        //layout.element.MainNavBar.style.width = layout.leftPanelWidth + "px";
        var scTruew = layout.leftPanelWidth / board.width;
        var scTrueh = h / (board.height);
        var maxScTrue = scTruew;
        if (scTrueh < maxScTrue) maxScTrue = scTrueh;


        //console.log('scTrue' + maxScTrue);
        var obj2 = document.getElementById('boardContainer');
       // var obj2 = document.getElementById('canvas');
        setZoom(maxScTrue, obj2);
        //var toolbar = document.getElementById('toolbar');
        //var t1 = 1;
        //if (maxScTrue < 1) t1 = 0.9;
        //setZoom(t1/maxScTrue, toolbar);
        board.zoom = maxScTrue;

        var boardContainerWidth = $("#boardContainer").width();
        layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom) + 4 + "px";
        var boardContainerheight = obj2.clientHeight;// $("#boardContainer").height();
        //console.warn("boardContainerheight : " + boardContainerheight);
        layout.element.boardHtmlpanel.style.height = (boardContainerheight * (board.zoom)) + 30 + "px";

        setTimeout(function () {
            var boardContainerWidth = $("#boardContainer").width();
            layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom)+4 + "px";
            var boardContainerheight = obj2.clientHeight;// $("#boardContainer").height();
            //console.warn("boardContainerheight : " + boardContainerheight);
            layout.element.boardHtmlpanel.style.height = (boardContainerheight *( board.zoom))+30 + "px";
        }, 1000);
      
       // moveBoardPanel();
       // if (layout.sessionPanelPosetion!=3)  
       //layout.marginBoard();
    },
    resizeBoardW: function (w) {
       // return;
      //  var w = $(window).width();
        var h = $(window).height() - 67;
        // var newVideosBox = document.getElementById('newVideosBox');
        // var centerVideoPanel = document.getElementById('centerVideoPanel');
      //  if (layout.id == 1) w = w - layout.rightPanelwidth;
        if (layout.sessionPanelPosetion == 2) {
            layout.element.newVideosBox.style.height = layout.sessionPanelheight + "px";
            h = h - layout.sessionPanelheight;
        }
        //if (layout.sessionPanelPosetion == 3) {
        //    w = w - layout.centerVideoPanelWidth;
        //}
        if (layout.sessionPanelPosetion == 1) {

        }
        layout.leftPanelWidth = w;
        // layout.element.screenAndBoard.style.width = layout.leftPanelWidth + "px";
        //layout.element.MainNavBar.style.width = layout.leftPanelWidth + "px";
        var scTruew = layout.leftPanelWidth / board.width;
        var scTrueh = h / (board.height);
        var maxScTrue = scTruew;
        if (scTrueh < maxScTrue) maxScTrue = scTrueh;


        console.log('scTrue' + maxScTrue);
        //var obj2 = document.getElementById('boardContainer');
        var obj2 = document.getElementById('canvas');
        setZoom(maxScTrue, obj2);
        //var toolbar = document.getElementById('toolbar');
        //var t1 = 1;
        //if (maxScTrue < 1) t1 = 0.9;
        //setZoom(t1/maxScTrue, toolbar);
        board.zoom = maxScTrue;
        var boardContainerWidth = $("#boardContainer").width();
        layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom) + "px";
        //var boardContainerheight = $("#boardContainer").height();

        //layout.element.boardHtmlpanel.style.height = (boardContainerheight * board.zoom) + "px";
      //  moveBoardPanel();
        // if (layout.sessionPanelPosetion!=3)  
        //layout.marginBoard();
    },
    prepareBoard: function (ww, wh) {
        //if (layout.sessionPanelPosetion == 2) {
        //    document.getElementById('newVideosBox').style.height = layout.sessionPanelheight + "px";
        //    resizingVideoBox();
        //}
        if (screenControler.screenShareStatus) {
            screenControler.stopOwnScreenShare();
        }
        else {
            screenControler.disconnectFromScreenShare();
        }
        board.width = ww;
        board.height = wh;

        //var svgBoard = document.getElementById('svgBoard');
        //if (svgBoard != undefined) {
        //    svgBoard.setAttribute("height", wh);
        //    svgBoard.setAttribute("width", ww);
        //    console.warn(svgBoard);

        //}
        //var whiteboardCanvas1 = document.getElementById('whiteboardCanvas1');
        //if (whiteboardCanvas1 != undefined) {
        //    whiteboardCanvas1.setAttribute("height", wh);
        //    whiteboardCanvas1.setAttribute("width", ww);
        //    console.warn(whiteboardCanvas1);

        //}
        //whiteboard.settings.width = ww;
        //whiteboard.settings.height = wh;
       
        //var obj2 = document.getElementById('boardContainer');
        //obj2.style.width = board.width + 5 + "px";
        //obj = document.getElementById('whiteboardContainer');
       // obj.style.width = board.width + "px";//gggggggggg
       // obj.style.height = board.height + "px";

         layout.resizeBoard();             
    },
    marginBoard: function () {
        var boardContainerWidth = $("#boardContainer").width();
        //console.log("board contaner widht : " + boardContainerWidth);
        var boardContainerWidthScal = boardContainerWidth * board.zoom;
        //console.log("board contaner widht scale : " + boardContainerWidthScal);
        if (layout.leftPanelWidth > boardContainerWidthScal) {
            var dif = (layout.leftPanelWidth - boardContainerWidthScal) / 2;
            document.getElementById('boardHtmlpanel').style.marginLeft = dif + "px";
        }
        else {
            document.getElementById('boardHtmlpanel').style.marginLeft = "0px";
        }
    },
    menuToggle: function () {
        //e.preventDefault();
        chatService.unReadMessage = 0;
        chatService.updateUnReadmessage();
        layout.menuStatus = !layout.menuStatus;
        console.log(layout.menuStatus);
        if (layout.menuStatus) {
            layout.element.sidebar_wrapper.style.display = "block";
           // layout.element.sidebar_wrapper.style.width = layout.rightPanelwidth + "px";
            //  document.getElementById('page-content-wrapper').style.paddingRight = layout.rightPanelwidth + "px";
        }
        else {
            layout.element.sidebar_wrapper.style.display = "none";

            //layout.element.sidebar_wrapper.style.width = "0px";
        }
    },

    resizeBoardtest1: function () {
        if (layout.id == 1) layout.id = 2;
        else layout.id = 1;
        layout.menuDisplayed();
       layout.resizeBoard();
        return;
        console.warn(layout.sessionPanelPosetion);
          layout.sessionPanelPosetion = 1;
       // layout.sessionPanelPosetion = 3;
        console.warn(layout.sessionPanelPosetion);
       
        layout.resizeBoard();
        layout.setRightPanel();
        setTimeout(function () { resizingVideoBox(); },1000);
        
    },
    resizeBoardtest2: function () {
        layout.setSessionPanelPosetion(2);
        //layout.sessionPanelPosetion = 2;
        //console.warn(layout.sessionPanelPosetion);

        layout.resizeBoard();
        //layout.setRightPanel();
        //setTimeout(function () { resizingVideoBox(); }, 1000);
    },
    resizeBoardtest3: function () {
        var pos = 3;
        if (layout.sessionPanelPosetion == 1) pos = 3;
        else (pos = 1);
        console.warn(layout.sessionPanelPosetion);
        layout.setSessionPanelPosetion(pos);
        layout.resizeBoard();
      // 
       // layout.setRightPanel();
       // setTimeout(function () { resizingVideoBox(); }, 1000);
    },
}
document.getElementById('layoutDropDownSelect').onchange = function () {
    var p = document.getElementById('layoutDropDownSelect').value;
    //console.log(p);
    baseLayout.parse(p);
}


var MathEditorControler = {
    isActive: 0,
    MathEditorIframe: document.getElementById('MathEditorIframe'),
    lastMessage: 'JGpqalxzdW17a30gClxcIFxwcm9ke3B9ICQ=',
    getMessage: 0,
    sendMessage: 0,
    ui: 'min',//atlas
    iframSrc: "/" + board.Prefix + "/VisualMathEditor/VisualMathEditor.html?style=black&runLocal",
    iframSrcDefult : '',
    iframSrcLimit: "/" + board.Prefix + '/VisualMathEditor/jaxEditor/index.html',// "/VisualMathEditor/mylatex/index.html",
    isLimit: 1,
    permission: 1,
    onClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    console.log("math click and screen is active");
        //    boardClick();
        //    return;
        //}
        //console.log("math click");
        if (MathEditorControler.isActive == 1)
            MathEditorControler.end();
        else {
            var m = { type: 'panelControler', action: 'MathEditor' };
            var res = mainApp.sendToServer(m);
        }
       // MathEditorControler.start();
        // diagramControler.start();
    },
    start: function (force) {
        MathEditorControler.init();
        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeMathEditor();
        if (MathEditorControler.isActive) return;
        MathEditorControler.isActive = 1;
        // if (!board.user.permission.MathEditor) return;
        if (force || MathEditorControler.MathEditorIframe.src == null || MathEditorControler.MathEditorIframe.src == undefined || MathEditorControler.MathEditorIframe.src == "") {

            MathEditorControler.MathEditorIframe.src = MathEditorControler.iframSrcDefult;//runLocal
            if (layout.id == 1 && layout.sessionPanelPosetion == 3 && board.user.permission.MathEditor) {

                baseLayout.parse('11');
            }
            if (MathEditorControler.isLimit==0) {
                if (MathEditorControler.lastMessage != null && MathEditorControler.sendMessage )
                    setTimeout(() => {
                        MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);
                    },1000);
                  
            }
        }
        else {
           // return;
            if (MathEditorControler.lastMessage != null && MathEditorControler.sendMessage)
                MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);

        }
       


    },
    end: function () {

        // diagramControler.isActive = 0;
        boardClick();
    },
    iframeMessage: function (m) {

        if (!board.user.permission.MathEditor) {
            console.log(' MathEditor permissen eerroorr');
            MathEditorControler.sendLastMessage();
            return;
        }
       // var img = m.img;
        //decodedString = atob(img);
        //document.getElementById('videos').innerHTML = decodedString;
      //  console.log('fff');
       //  console.log(m);
        
        var m = { type: 'MathEditor', m: m };
        if (MathEditorControler.getMessage == 1)
            mainApp.sendToServer(m);
        // var iframe = document.getElementById("iframeId");
        // diagramControler.diagramIframe.contentWindow.parentMessage('kkkkkkkkk');
    },
    iframeMessageLoadComplate: function () {
        console.log("iframeMessageLoadComplate math");
      
       
      //  MathEditorControler.sendLastMessage();
        setTimeout(() => {
            MathEditorControler.sendMessage = 1;
           MathEditorControler.sendLastMessage();
            MathEditorControler.getMessage = 1;
          //  MathEditorControler.setPermissen(board.user.permission.MathEditor);
          
           
        }, 1000);

    },
    sendLastMessage: function () {
        if (MathEditorControler.lastMessage != null)
            MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);
    },
    parse: function (data) {
        MathEditorControler.lastMessage = data.m;
        var name = data.meetInfo.userName;
        if (name == board.userName) {
            console.log("this is my message");
            return;
        }
        if (MathEditorControler.isActive == 0) {
            MathEditorControler.start();
            return;
        }
        if (MathEditorControler.sendMessage == 0) return;
        console.warn('get diagram data from server .....');
        console.log(data);
        MathEditorControler.MathEditorIframe.contentWindow.parentMessage(data.m);
    },
    init: function () {
        var per = board.user.permission.MathEditor;
        var w = $("#screenAndBoard").width();
        if ( w>10) {
            MathEditorControler.iframSrcDefult = MathEditorControler.iframSrc;
            MathEditorControler.isLimit = 0;
        }
        else {
            MathEditorControler.iframSrcDefult = MathEditorControler.iframSrcLimit;
            MathEditorControler.sendMessage = 1;
            MathEditorControler.isLimit = 1;
        }
    },
    setPermissen: function (per) {
       // MathEditorControler.init();
        if (per != MathEditorControler.permission) {
            MathEditorControler.permission = per;
            //if (MathEditorControler.isActive) {
            //    MathEditorControler.isActive = 0;
            //    MathEditorControler.MathEditorIframe.src = null;
            //    MathEditorControler.start(true);

            //}
        }
       
    },
}
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
var officControler = {
    isActive: 0,
    officIframe: document.getElementById('office_form'),
    lastMessage: null,
    getMessage: 0,
    sendMessage: 0,
    file: '',
    fileList: [],
    ui: 'min',//atlas
    firstLoad: 1,
    wopiUri: board.officeServer,
    queryStr: board.user.permission.offic ? "" : "&permission=readonly",
    WordFile: ['DOCX', 'DOC', 'DOT', 'ODT', 'FODT', 'RTF', 'TXT', 'HTML', 'HTM'],
    PowerPointFile: ['PPTX', 'PPT', 'PPS', 'POT', 'ODP', 'FODP'],
    ExcelFile: ['XLSX', 'ODS' , 'FODS' ],

    Click: function () {

        $('#fileOfficPanelModal').modal('toggle');
        return;

        if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
            boardClick();
            return;
        }
        if (officControler.isActive == 1)
            officControler.end();
        else {
            var m = { type: 'panelControler', action: 'offic', file: officControler.file };
            var res = mainApp.sendToServer(m);
        }
        // diagramControler.start();
    },

    start: function (force) {
        if (officControler.file == "") return;
        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
       
        panelControler.activeOffic();
       // if (officControler.isActive) return;
        officControler.isActive = 1;
        if (force || officControler.firstLoad) {


            officControler.firstLoad = 0;
            var fn = board.meetID + "_" + officControler.file;
            var u ="WOPISrc="+ window.location.protocol + "//" + window.location.host +"/wopi/files/"
           // fn = btoa(fn);
           // fn = btoa(unescape(encodeURIComponent(fn)));
           // var url = encodeURI("https://p.learn100.ir/wopi/files/" + fn);
            // if (officControler.officIframe.src == null || officControler.officIframe.src == undefined || officControler.officIframe.src == "") {
            //  console.log('layout.id ' + layout.id + ' layout.sessionPanelPosetion ' + layout.sessionPanelPosetion);
            //  officControler.officIframe.src = board.officeServer + "/loleaflet/dist/loleaflet.html?file_path=file:///opt/collaboraoffice6.4/share/template/common/internal/board/" + board.meetID + "/offic/" + officControler.file + officControler.queryStr;
            officControler.officIframe.action = officControler.wopiUri + u + fn + officControler.queryStr;
            if (layout.id == 1 && layout.sessionPanelPosetion == 3) {

                baseLayout.parse('11');
            }
            officControler.submit();
        }
        //  }



    },

    setPermissen: function (per) {
        officControler.queryStr = per ? "" : "&permission=readonly";
        //if (!(diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")) {
        //    diagramControler.diagramIframe.src = "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
        //}
    },
    end: function () {

        // diagramControler.isActive = 0;
        boardClick();
    },

    renderFileList: function (offic) {
       
        officControler.fileList = offic.filelist;
        officControler.file = offic.activeFile;
        //var obj = document.getElementById('fileOfficPanel');
        //obj.innerHTML = "";
        try {
            var table = document.getElementById('officFiletable');
            var rowCount = table.rows.length;

            for (var i = 0; i < rowCount; i++) {                              
                    table.deleteRow(i);                   
            }
        } catch (e) {
            console.log(e);
        }


        for (var i = 0; i < officControler.fileList.length; i++) {
            var r = officControler.fileList[i];
            officControler.renderFileToHtmlElement(board.meetID, i+1, r.name, r.ext);
        }
    },
    renderFileToHtmlElement: function (meetID, i, fileName, ext) {
        //var obj = document.getElementById('fileOfficPanel');
        //var s = "";
        //var selectSpan = '<span class="officItem"   onclick="officControler.activeFileServer(\'' + fileName + '\')" style="padding: 0px 7px;color: #182aff;font-weight: bold;cursor: pointer;">SELECT</span>';

        var dl = "/" + board.Prefix + "/files/board/" + meetID + "/offic/" + fileName;
      //  s += '<div>' + i + ' -   file ' + i + selectSpan + '    <a style="padding:0px 7px;"  href="' + dl + '" target="_blank"> download </a><a onclick="officControler.activeFileServer("' + fileName + '")" >' + fileName + '</a></div>';
        selectSpan = '<a class="officItem" href="#" onclick="officControler.activeFileServer(\'' + fileName + '\')"  ><i class="fa fa-edit"  ></i> </a>';
        var table = document.getElementById('officFiletable');

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var r = '<span>' + i + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(1);
        // r = '<span>select</span>';
        cell1.innerHTML = selectSpan;

          cell1 = row.insertCell(2);
          r = '<span>' + fileName + '</span>';
        cell1.innerHTML = r;
         
        cell1 = row.insertCell(3);
        r = '<a href="' + dl +'" target="_blank"><i class="fas fa-download"></i></a>';
        cell1.innerHTML = r;
        
      //  obj.innerHTML += s;
    },
    activeFileServer: function (fileName) {
        // panelControler.disconectScreenShare();
        //var m = { type: 'panelControler', action: 'offic' };
        //var res = mainApp.sendToServer(m);

        var p = { type: 'offic', action: 'fileSelect', fileName: fileName };
        // var m = { "type": "board", "board": "draw", "d": { "t": "pageSelect", "drawId": 1, "at": "", "num": pageID, "fileID": fileID, "del": 0, "type": "board", "board": "draw" } }
        mainApp.sendToServer(p);
    },

    parse: function (data) {
        var action = data.action;
         
        if (action == "fileSelect") {
            var wopiUri = data.wopiUri;
          
            officControler.wopiUri = wopiUri;
            var fileName = data.fileName;

            if (officControler.file != fileName || officControler.firstLoad) {
                officControler.file = fileName;

                officControler.start(1);
            }
            else {
                officControler.isActive = 1;
                panelControler.activeOffic();
            }
            return;
        }
        if (action == "uploadFile") {
            var r = data.file;
            officControler.fileList.push(r);
            officControler.renderFileToHtmlElement(board.meetID, officControler.fileList.length, r.name, r.ext);
        }

    },

    submit: function () {
        var frameholder = document.getElementById('frameholder');
        var office_frame = document.createElement('iframe');
        office_frame.name = 'office_frame';
        office_frame.id = 'office_frame';
        office_frame.style.height = "100%";
        office_frame.style.width = "100%";
        // The title should be set for accessibility
        office_frame.title = 'Office Online Frame';
        // This attribute allows true fullscreen mode in slideshow view
        // when using PowerPoint Online's 'view' action.
        office_frame.setAttribute('allowfullscreen', 'true');
        frameholder.appendChild(office_frame);
        document.getElementById('office_form').submit();
    }
}


var quiz = {
    currentValue: 0,
    resultArray: null,
    quizData: null,
    isLoad: 0,
    quizStr: null,
    start: function () {
        //if (board.isRecorder) return;
       
        if (!quiz.isLoad) quiz.loadScript();



        console.log("quiz start ");
        if (board.publish)
            $('#quizModal').modal('show');
        else $('#quizviewModal').modal('show');
        document.getElementById('quizMessage').innerText = '';
        document.getElementById('quizViewMessage').innerText = '';
    },
    Preparation: function (quizModel) {
        
        console.log(quizModel);
        if (quizModel != null) {
          //  document.getElementById('quizIconPanel').style.display = "block";
            $(".quizIconPanel").css("display", "block");
            quiz.quizCreate(quizModel.m.d, false);
        }
        else {
            if (board.publish) $(".quizIconPanel").css("display", "block"); //document.getElementById('quizIconPanel').style.display = "block";
        }
    },
    save: function () {
        document.getElementById('quizMessage').innerText = "";
        var quizText = document.getElementById('quizText').value;
        console.log(quizText);
        if (quizText == null || quizText.trim() == '') {
            document.getElementById('quizMessage').innerText = board.translate.quiz_front_textEmpty;
            return;
        }
       
        var quizoption1 = document.getElementById('quizoption1').value;
        var quizoption2 = document.getElementById('quizoption2').value;
        var quizoption3 = document.getElementById('quizoption3').value;
        var quizoption4 = document.getElementById('quizoption4').value;
        if (quizoption1.trim() == '' || quizoption2.trim() == '') {
            document.getElementById('quizMessage').innerText = board.translate.quiz_front_optionEmpty;
            return;
        }
        var qdata = { quizText: quizText, quizoption1: quizoption1, quizoption2: quizoption2, quizoption3: quizoption3, quizoption4: quizoption4, };

        var m = { type: 'quiz', action: 'quizCreate', qdata: qdata };
        quiz.quizData = m;
        console.log(m);
        document.getElementById('quizFormSavaButton').value = board.translate.edit;
        var res = mainApp.sendToServer(m);
        if (res) document.getElementById('quizMessage').innerText = board.translate.quiz_front_SendCompleted;
        else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;


    },
    sendAnswer: function () {
        var m = { type: 'quiz', action: 'answer', answer: quiz.currentValue };
        var res = mainApp.sendToServer(m);
        if (res) {
            document.getElementById('quizViewMessage').innerText = board.translate.quiz_front_answerSend;
            setTimeout(() => {
                $('#quizviewModal').modal('hide');
            }, 2000);
        }
    
        else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;
         
       
        //if (document.getElementById('quizoption').checked) {
           
        //    var selected = document.getElementById("quizoption").value
        //    document.getElementById('quizViewMessage').innerText = selected;
        //}
        //else {
        //    document.getElementById('quizViewMessage').innerText = 'یکی از گزینه ها را انتخاب کنید';
        //}
    },
    quizOptionHandleClick: function (myRadio) {
        quiz.currentValue = parseInt( myRadio.value);
        document.getElementById('quizViewsendAnswer').style.display = "inline-block";
        console.log(quiz.currentValue);
    },
    parse: function (data) {
        //if (board.isRecorder) return;
        console.warn(data);
        var action = data.action;
        switch (data.action) {
            case "quizCreate":
                quiz.quizCreate(data, true);
                break;
            case "result":
                quiz.result(data);
                break;
            case "showResultForAll":
                quiz.showResult(data);
                break;
            case "Resultdetails":
                quiz.Resultdetails(data);
                break;
        }
    },
    quizCreate: function (data, showmodal) {
     
        if (!quiz.isLoad) quiz.loadScript();
       
       // document.getElementById('quizIconPanel').style.display = "block";
        $(".quizIconPanel").css("display", "block");
        quiz.quizData = data;
        var q = data.qdata;
        var quizText = q.quizText;
        document.getElementById('quizviewText').innerText = quizText;
        var quizoption1 = q.quizoption1;
        var quizoption2 = q.quizoption2;
        var quizoption3 = q.quizoption3;
        var quizoption4 = q.quizoption4;
        
        var s = " <div> " + quizText + " </div>";
        s += " <div> " + board.translate.option + " 1 : " + quizoption1 + " </div>";
        s += " <div> " + board.translate.option + " 2 :  " + quizoption2 + " </div>";


        document.getElementById('quizoptionlable1').innerText = quizoption1;
        document.getElementById('quizoptionlable2').innerText = quizoption2;
        document.getElementById('quizoptionlable3').innerText = quizoption3;
        document.getElementById('quizoptionlable4').innerText = quizoption4;

        if (quizoption3.trim() == '') {
            document.getElementById('quizoptioninput3').style.display = "none";
            document.getElementById('quizoptionlable3').style.display = "none";
        }
        else {
            document.getElementById('quizoptioninput3').style.display = "inline-block";
            document.getElementById('quizoptionlable3').style.display = "inline-block";
            s += " <div> " + board.translate.option + " 3 :  " + quizoption3 + " </div>";
        }

        if (quizoption4.trim() == '') {
            document.getElementById('quizoptioninput4').style.display = "none";
            document.getElementById('quizoptionlable4').style.display = "none";
        }
        else {
            document.getElementById('quizoptioninput4').style.display = "inline-block";
            document.getElementById('quizoptionlable4').style.display = "inline-block";
            s += " <div>  " + board.translate.option + " 4 : " + quizoption4 + " </div>";
        }
        document.getElementById('quizviewTextResult').innerHTML = s;
        if (board.isRecorder) return;
        if (showmodal) $('#quizviewModal').modal('show');
        if (board.publish) quiz.quizFormCreate(data);
    },
    quizFormCreate: function (data) {
        quiz.quizData = data;
        var q = data.qdata;
        var quizText = q.quizText;
        document.getElementById('quizText').innerText = quizText;
        var quizoption1 = q.quizoption1;
        var quizoption2 = q.quizoption2;
        var quizoption3 = q.quizoption3;
        var quizoption4 = q.quizoption4;

        document.getElementById('quizoption1').value = quizoption1;
        document.getElementById('quizoption2').value = quizoption2;
        document.getElementById('quizoption3').value = quizoption3;
        document.getElementById('quizoption4').value = quizoption4;
        document.getElementById('quizFormSavaButton').innerText =   board.translate.edit  ;
       
       
    },
    result: function (data) {
        if (!quiz.isLoad) quiz.loadScript();
        console.log(data);
        var rlist = data.rlist;
        quiz.resultArray = rlist;
        console.log(rlist);
        if (board.publish) {
            quiz.updateResult();
            document.getElementById('showResultForAllPanel').style.display = "block";
        }
           
    },
    showResult: function (data) {
      
        $('#quizResultModal').modal('show');
        var rlist = data.rlist;
        quiz.resultArray = rlist;
        var s = " <div> " +  board.translate.quiz_front_showResultTitle+" </div>";
        
        var labels = [];
        var series = [];
        for (var i = 0; i < rlist.length; i++) {
            var r = rlist[i];
            var value = r[0].Value;
            var count = r.length;
            labels[i] =   board.translate.option   +" "+ value;
            series[i] = count;
            s += " <div>";
            s += board.translate.option + " " + value + " : " + count + " " + board.translate.Person;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        } 
        document.getElementById('quizResult').innerHTML = s;
        document.getElementById('quizviewResult').innerHTML = s;
        quiz.drawChart(labels, series);
        if (board.isRecorder) {
            setTimeout(() => {
                $('#quizResultModal').modal('hide');
            },15000);
        }
        //google.charts.load('current', { 'packages': ['corechart'] });
        //google.charts.setOnLoadCallback(quiz.drawChart);
       // quiz.drawChart();
    },
    GetResultdetails: function () {
        var m = { type: 'quiz', action: 'Resultdetails' };
        var res = mainApp.sendToServer(m);
    },
    Resultdetails: function (data) {
        quiz.updateResult();
        var dlist = data.dlist;
        var s = " <div> " + board.translate.quiz_front_ResultdetailsTitle +" </div>";
        for (var i = 0; i < dlist.length; i++) {
            var r = dlist[i];
           
            s += " <div>";
            s += r;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        }
        document.getElementById('quizResult').innerHTML += s;
    },
    updateResult: function () {
       // $('#quizResultModal').modal('toggle');
        var rlist = quiz.resultArray;
        var s = " <div>" + board.translate.quiz_front_showResultTitle +"  </div>";
        for (var i = 0; i < rlist.length; i++) {
            var r = rlist[i];
            var value = r[0].Value;
            var count = r.length;
            s += " <div>";
            s += board.translate.option + " " + value + " : " + count +" "+ board.translate.Person ;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        }
        document.getElementById('quizResult').innerHTML = s;
        //document.getElementById('quizviewResult').innerHTML = s;
    },
    showResultForAll: function (data) {
        var m = { type: 'quiz', action: 'showResultForAll' };
        var res = mainApp.sendToServer(m);
        if (res) document.getElementById('quizMessage').innerText = board.translate.quiz_front_publishComplate;
        else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;

         


    },
    loadScript: function () {
        console.log("scrip load start ........");
        var script = document.createElement('script');
        script.onload = function () {
            quiz.isLoad = 1;
            console.log("script is load .........");
        };
        script.src = "/" + board.Prefix +"/js/chartist.min.js";

        document.head.appendChild(script); //or something of the likes
        var cssUrl = "/" + board.Prefix + "/css/chartist.min.css";
        document.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            "<link rel=\"stylesheet\" href='" + cssUrl + "' />");
    },
    
    drawChart: function (a,b) {
        new Chartist.Bar('.ct-chart', {
            labels: a,// ['گزینه 1', '2', '3', '4'],
            series: b,//[a, b, c, d]
        }, {
            distributeSeries: true
        });
        
    },
}
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

var bboard = {
    bboard: null,
    fboard: null,
    fileList: null,
    dic: {},
    fileID: 0,
    pageID: 0,
    page: null,
    activePage: function (fileID, pageID) {
        return;//gggggggggg
        //console.log("f1 : " + fileID + " p : " + pageID); 
        fileID = Number(fileID);
        pageID = Number(pageID);
        if (fileID != bboard.fileID) bboard.changFile(fileID);
        //console.log("ff : " + bboard.fileID + " pp : " + bboard.pageID);
        bboard.fileID = Number(fileID);
        bboard.pageID = Number(pageID);
        //console.log("f : " + fileID + " p : " + pageID);
        //console.warn(document.getElementById('inputGroupSelect04').value);
        document.getElementById('inputGroupSelect04').value = pageID;
        //console.warn(document.getElementById('inputGroupSelect04').value);
        bboard.clear();
        var p = bboard.dic[fileID][pageID];
        // console.log(p);
        for (var i = 0; i < p.length; i++) {
            var m = p[i];

            whiteboard.handleEventsAndData(m.str.d, true);
        }
        if (fileID != 0) {
            var pageIdbg = Number(pageID) + 1;
            var bgImage = '/files/board/' + board.meetID + '/pic/' + fileID + '/' + pageIdbg + '.jpg';

            document.getElementById("whiteboardBG").style.backgroundImage = "url(" + bgImage + ")";
           // console.log(bgImage);
        }
        else {
            //  document.getElementById("whiteboardBG").style.backgroundImage = "none";
        }


    },
    changePage: function (pageID) {
        if (bboard.fileList == null) return;
        if (bboard.dic[bboard.fileID]== undefined) return;
        bboard.pageID = pageID;
       // idroo.board.deleteAll();
        var p = bboard.dic[bboard.fileID][pageID];
        if (p == undefined) {
            console.error('page not found : ' + pageID);
            return;
        }
        //gggggg
        resizeNewBoard();
        //initNewBoard();

        //console.log(idroo.board.index);



        for (var i = 0; i < p.length; i++) {
            var m = p[i];
           // var m2 = JSON.parse(m);
            //console.log(i);
            //console.log(m.m);
            //var b = m.m.m;
            //if (b) {
            //    if (b[0] < 0 || b[1] < 0) {
            //        console.warn(b);
            //    }
            //}
            try {
                idroo.board.restoreChange(m.m);
            } catch {
                console.error("restoreChange");
                console.log(m.m);

            }
          
            
        }
        boardControler.sendMessage = 1
       // console.log('end page select 1');
        document.getElementById('inputGroupSelect04').value = pageID;
        if (bboard.fileID != 0) {
            var pageIdbg = Number(pageID) + 1;
            var bgImage = '/' + board.Prefix + '/files/board/' + board.meetID + '/pic/' + bboard.fileID + '/' + pageIdbg + '.jpg';

            document.getElementById("canvas").firstChild.style.backgroundImage = "url(" + bgImage + ")";
            //var c = document.getElementById("canvas");
            //var ctx = c.firstChild.getContext("2d");
            //var img = document.getElementById("scream");
            //ctx.drawImage(img, 10, 10);
            //console.log(bgImage);
        }
        else {
            document.getElementById("canvas").firstChild.style.backgroundImage = "none";
        }
    },
    clear: function () {
        return; //ggggggggg
        var obj = document.getElementById("whiteboardCanvas1");
        var obj2 = document.getElementById("mtc1");
        const context = obj.getContext('2d');
        context.clearRect(0, 0, obj.width, obj.height);
        obj2.innerHTML = "";
        document.getElementById("whiteboardBG").style.backgroundImage = "none";

    },
    addC: function (m) {
        var j = {};
        j.str = {};
        j.str.d = m.d;

        bboard.dic[m.d.fileID][m.d.num].push(j);
        // console.log(bboard.dic);
    },
    test: function () {
        //  bboard.activePage(0, 1);
        //  bboard.activePage(0, 3);
    },
    getBBoard: function (b) {
        //console.log("bbbbbbbb");
        //console.log(b);
        for (var i = 0; i < b.length; i++) {
            var t = b[i];
            for (var j = 0; j < t.length; j++) {
                var k = t[j];
                for (var r = 0; r < k.length; r++) {
                    var e = k[r];
                    //    console.log(e);
                    e.str = JSON.parse(e.str);
                    //   console.log(e);

                }
            }
        }
        //console.log(b);
        bboard.bboard = b;
    },
    setFileList: function (f) {
        return;
        bboard.fileList = f;
        bboard.fboard = {};
        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].fileID;
            var pagecount = f[i].pagecount;
            bboard.fboard[fileID] = {};
            for (var j = 0; j < pagecount; j++) {
                bboard.fboard[fileID][j] = [];
            }
        }


    },
    mlistToDic: function (mList) {
        bboard.createNewDic();
        for (var i = 0; i < mList.length; i++) {
            var m = JSON.parse( mList[i]);
           // console.log(m);
            var fileID = m.f;
            var pageID = m.p;
            //var j = {};
            //j.str = {};
            //j.str.d = m;
            try {
                bboard.dic[fileID][pageID].push(m);
            } catch {
                console.error("push to dic");
                console.log(m);

            }
          

        }
        if (mList.length == 0) {
            bboard.changePage(0);
            //bboard.changFile(bboard.fileID);
            //bboard.activePage(bboard.fileID, bboard.pageID);
        } else {
            var m = JSON.parse( mList[mList.length - 1]);
            var fileID = m.f;
            var pageID = m.p;
            bboard.changFile(fileID);
            try {
                bboard.changePage(pageID);
            } catch {
                console.error("pageselect");
                console.log(pageID);

            }
           
            //bboard.changFile(fileID);
            //bboard.activePage(fileID, pageID);
        }
       
    },
    createNewDic: function () {

        var f = bboard.fileList;

        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].inRoomID;
            bboard.dic[fileID] = {};
            var pagecount = f[i].pageCount;

            for (var j = 0; j <  pagecount; j++) {
                bboard.dic[fileID][j] = [];
            }
        }

        
    },
    dicTodic: function (b) {
        
        var f = bboard.fileList;

        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].inRoomID;
            var pagecount = f[i].pageCount;

            for (var j = 0; j < pagecount; j++) {
                var k = b[fileID][j];
                for (var r = 0; r < k.length; r++) {
                    var e = k[r];

                    b[fileID][j][r].str = JSON.parse(e.str);


                }
            }
        }


        bboard.dic = b;

    },

    addFileToDic: function (f) {
        console.warn(f);
        var fileID = f.inRoomID;
       // bboard.fileList[fileID] = f;
        bboard.fileList.push(f);
        //console.log("bboard.fileList");
        //console.log(bboard.fileList);
        var pagecount = f.pageCount;
        bboard.dic[fileID] = {};
        for (var j = 0; j < pagecount; j++) {
            bboard.dic[fileID][j] = [];
        }
        //console.log("nnnnnndiiiiiicccccccccccc");
        //console.log(bboard.dic);
        bboard.activePage(fileID, 0);
    },
    reciveMessage: function (data) {
       
       // console.log(data);
        var fileID = data.f;
        var pageID = data.p;   
       
        var name = data.meetInfo.userName;
        var action = data.action;
        
        if (action == "fileSelect") {
            boardControler.sendMessage = 0;
            bboard.changFile(fileID);
            try {
                bboard.changePage(0);
            } catch {
                console.error("pageselect reciveMessage 0");
                console.log(data);

            }
            boardControler.sendMessage=1
            return;
        }
        if (action == "pageSelect") {
            boardControler.sendMessage = 0;
          
            if (pageID != bboard.pageID) {
              
                try {
                    bboard.changePage(pageID);
                } catch {
                    console.error("pageselect reciveMessage 2");
                    console.log(data);

                }
            }
           
            boardControler.sendMessage = 1
            return;
        }
        if (fileID != bboard.fileID || pageID != bboard.pageID) {
            console.error("pageselect reciveMessage 3");
            console.log(data);
            return;
        }
        try {
            bboard.dic[fileID][pageID].push(data);
        } catch {
            console.error('reciveMessage 1');
            console.log(data);
            return;
        }

       
        if (name == board.userName) {
            return;
        }
      
        
        try {
            idroo.board.restoreChange(data.m);
        } catch {
            console.error('reciveMessage 2');
            
        }
      
         
        return;
       
        if (name != board.userName || action == "pageSelect" || action == "setImage") {

            bboard.addC(data);

            whiteboard.handleEventsAndData(data.d, true);
            if (action == "pageSelect" || action == "setImage") {
                if (screenControler.screenShareRemoteStatus) {
                    screenControler.disconnectFromScreenShare();
                }
                if (screenControler.screenShareStatus) {
                    screenControler.stopOwnScreenShare();
                }
            }
        }
    },
    changFile: function (fileID) {
       // console.log(bboard.fileList);
        board.zoomScale2 = 1;
       
        bboard.fileID = fileID;
        var i;
        for (i = 0; i < bboard.fileList.length; i++)
            if (bboard.fileList[i].inRoomID == fileID) {
                var f = bboard.fileList[i];
                board.width = f.width;
                board.height = f.height;
                resizeNewBoard();
                //console.log(bboard.fileList);
                // console.log(f);
              //  layout.prepareBoard(f.width, f.height);
                createBoardPaging(f.pageCount);
            }

    },
    serverMessDicMapping: function (b) {
       //  bboard.dic = messDic;
        //messDic.forEach((element, index) => {
        //    element.forEach((e, i) => {
        //        console.log(e)
        //    });
        //});
        
        console.log(bboard.dic)
        bboard.changePage(0);
    }

};
var playerBoard = {
    meet: null,
    data: null,
    p: 0,
    w: 0,

    play: function () {
        var d = playerBoard.data;
        //console.log(d);
        playerBoard.p = playerBoard.data[0].d.date;
        //console.log(playerBoard.p);
        //console.log(playerBoard.data[0].d.d);
        var intervalID = setInterval(playerBoard.interval, 100);
    },
    interval: function () {
        // console.log((playerBoard.p)++);

        playerBoard.int2(playerBoard.p)

    },
    int2: function (p) {
        var d = playerBoard.data[(playerBoard.w)++];
        // console.log(p);
        if (d.d.date < p) {
            //console.log("ok");
            playerBoard.handleData(d.d.d);
            playerBoard.int2(p);
        }
        else {
            (playerBoard.w)--;
            (playerBoard.p)++;
            console.warn(p);
            //console.log(d);
        }

    },
    handleData: function (d) {
        // console.log(w);
        whiteboard.handleEventsAndData(d, true);
        //console.log(d);
    }
};
//if (board.publish) showToolbar(1);
 
function pdfFileClick(t) {

    //  disconnectFromScreenShare();
}
function boardClick() {
   // panelControler.nextPanel = "board";
   // console.log("screenShareRemoteStatus : " + screenControler.screenShareRemoteStatus);
    //if (screenControler.screenShareRemoteStatus) {
    //    var m = { type: 'panelControler', action: 'board' };
    //    var res = mainApp.sendToServer(m);
    //  //  fileService.activeFileServer(bboard.fileID, bboard.pageID);
    //    return;
    //}
    //if (layout.sessionPanelPosetion == 2) {
    //    document.getElementById('newVideosBox').style.height = layout.sessionPanelheight + "px";
    //    resizingVideoBox();
    //}
   // panelControler.disconectScreenShare();
    var m = { type: 'panelControler', action: 'board' };
    var res = mainApp.sendToServer(m);
   // panelControler.activeBoard();
   

}
  

function moveCenterPanel() {
    if (layout.sessionPanelPosetion == 2) {
        var h6 = $("#screenSharePanel").height();
        //console.log("h6 : " + h6);
        var h7 = $(window).height();
        //console.log("borad h : " + h7);
        var h8 = (h7 - (h6 + 90));
        //console.log("borad h8 : " + h8);
        if (h8 > 180) {
            if (h8 > 500) h8 = 500;
            document.getElementById('newVideosBox').style.height = h8 + "px";
        }
        resizingVideoBox();
   }

}
function moveBoardPanel() {
    if (layout.sessionPanelPosetion == 2) {
        var h6 = $("#boardContainer").height() * board.zoom;

        //console.log("h6 : " + h6);
        var h7 = $(window).height();
        //console.log("borad h : " + h7);
        var h8 = (h7 - (h6 + 90));
        //console.log("borad h8 : " + h8);
        if (h8 > 180) {
            if (h8 > 500) h8 = 500;
            document.getElementById('newVideosBox').style.height = h8 + "px";
        }
        resizingVideoBox();
    }

}
function initNewBoard() {
    idroo.board.unlock();
    idroo.board.init();
    var editor = { "nr": 6, "id": 1218010, "pic": null, "name": "javad6", "mouse": [0, 0], "active": [] };
    idroo.board.editors[editor.nr] = editor;
    var accesslevel2 = "own";
    //setTimeout(() => {
    ui.toolbar.setLevel(accesslevel2);
    ui.aside.setLevel(accesslevel2);
    ui.clipboard.setLevel(accesslevel2);
    ui.keyboard.setLevel(accesslevel2);
    ui.phone.setLevel(accesslevel2);
}
function resizeNewBoard() {
   // console.log("resizeNewBoard");
    if (panelControler.activePanel != "board") return;
    //return;
   // console.log("bord withe : " + board.width);
    var newBoard2 = document.getElementById('newBoard2');
    var newBoard = document.getElementById('newBoard');
    var obj2 = document.getElementById('boardContainer');
    setZoom(1, obj2);
    board.zoomScale2 = 1;
   
    var w = $(window).width();
    var h = $(window).height() - 67;
    // var newVideosBox = document.getElementById('newVideosBox');
    // var centerVideoPanel = document.getElementById('centerVideoPanel');
    w = w - layout.rightPanelwidth;
    var w2 = $('#screenAndBoard').width()-0;
   
    setZoom(1, obj2);
    var uiToolbar = document.getElementById('uiToolbar');
    var canvas1 = document.getElementById('canvas');
     
    uiToolbar.style.width = (w2 + 0) + "px";
    canvas1.style.width = board.width + "px";// (w2 - 0) + "px";
    canvas1.style.height = board.height + "px";// "100%";//(h - 70) + "px";
    obj2.style.height = board.height + "px";// "100%";//(h - 70) + "px";
    obj2.style.width = board.width + "px";// (w2 - 0) + "px";

    //idroo.board.unlock();

    //idroo.board.init();
    initNewBoard();

    var h2 = $('#screenAndBoard').height() - 32;
    if (board.user.permission.toolBox) {
       // h2 = h2 - 75;
       // document.getElementById("uiToolbar").style.display = "block";
    }
    else {
       // document.getElementById("uiToolbar").style.display = "none";
    }
    newBoard2.style.height = h2 + "px";
    newBoard.style.height = h2 + "px";
    var scTruew = (w2-2) / board.width;
    var scTrueh = (h2-2) / (board.height);
    var maxScTrue = scTruew;
    if (scTrueh < maxScTrue) maxScTrue = scTrueh;

    //console.log('scTrue' + maxScTrue);
    
   
    if (board.user.permission.toolBox) {
       // obj2.classList.remove("disabledbutton");
        obj2.style.pointerEvents = "all";
    }
    else {
       // obj2.classList.add("disabledbutton");
        obj2.style.pointerEvents = "none";
    }

    setZoom(maxScTrue, obj2);
    board.zoomScale = maxScTrue;
  //  document.getElementById('boardHtmlpanel').style.display = "block";
    
    
}
$(document).ready(function () {
   
    $(".menu-toggle").click(function (e) {
        layout.menuToggle();

        // if (layout.id==1)
        // $("#wrapper").toggleClass("menuDisplayed");

    });
   // $('#loadingModal').modal('toggle');
    // document.getElementById('boardHtmlpanel').style.display = "none";
    
    layout.load();
    //if (layout.id == 2) layout.menuStatus = 1;
    resizeNewBoard();
    if (layout.id == 2) layout.element.sidebar_wrapper.style.display = "none";


    //var w3 = 400;
    //var w = $(window).width();
    //var h22 = $(window).height();
    //var list = document.getElementsByClassName("lPanel");
    //if (w > 1000) {
    //    board.isMobile = 0;
    //    document.getElementById('page-content-wrapper').style.paddingRight = w3 + "px";
    //    $("#wrapper").toggleClass("menuDisplayed");
    //    document.getElementById('menu-toggle').style.display = "none";
    //    for (var i = 0; i < list.length; i++)
    //        list[i].style.height = h22 / 3 + "px";
    //}
    //else {
    //    board.isMobile = 1;
    //    document.getElementById('lpanelVideo').style.display = "none";
    //    for (var i = 0; i < list.length; i++)
    //        list[i].style.height = h22 / 2 + "px";
    //}
   // setChatPanel();
    
    //console.log('w is : ' + w);
    //if (w < 450) {
    //    w3 = w - 100;
    //}
    //var style = document.createElement('style');
    //style.type = 'text/css';
    //style.innerHTML = '#wrapper.menuDisplayed #sidebar-wrapper { width: ' + w3 + 'px;  }  #wrapper.menuDisplayed #page-content-wrapper {  padding-right: 0px;  }';//' + w3 + '
    //document.getElementsByTagName('head')[0].appendChild(style);
    //$(".menu-toggle").click(function (e) {
    //    e.preventDefault();
    //    $("#wrapper").toggleClass("menuDisplayed");

    //});
     

    
    //whiteboard.loadWhiteboard("#whiteboardContainer", {
    //    whiteboardId: board.meetID,
    //    username: board.userName,
    //    sendFunction: function (content) {
    //        if (!whiteboard.permission) return;
    //       // if (content.t == "cursor") return;
    //        content["at"] = "";
    //        content["num"] = bboard.pageID;
    //        content["fileID"] = bboard.fileID;
    //        content["del"] = 0;
    //        if (board.isMobile) {
    //            if (content["t"] == "pen") {
    //                // console.log(content["d"]);
    //                var d = content["d"];
    //                var z = 1 / board.zoom;
    //                var j = [d[0] * z, d[1] * z, d[2] * z, d[3] * z];
    //                // console.log(j);
    //                //  content["d"] = j;
    //            }
    //        }
    //        // signaling_socket.emit('drawToWhiteboard', content);
    //        var m = { "type": "board", "board": "draw", "d": content };
    //        content["type"] = "board";
    //        content["board"] = "draw";
    //        mainApp.sendToServer(m);
    //        bboard.addC(m);

    //    }
    //});
    //whiteboard.PreparationBoard();
    //whiteboard.setTool("pen");

    board.isToch = is_touch_enabled();
    //console.log("is toch screen : " + board.isToch);

   // viduAppUi.renserToolbox(board.user.permission);
    if (!board.isRecorder) {


        $('#deviceUnpublisherModal').modal('toggle');
    }
    else {
        mainApp.start();
        $('#loadingModal').hide();
    }

   // mainApp.start();
    _viduModulStart(); 


    var screenAndBoard = document.getElementById('screenAndBoard');
    new ResizeSensor(screenAndBoard, function () {
        //console.log('Changed to ' + screenAndBoard.clientWidth);//screenAndBoard.clientWidth-20
        layout.resizeBoard();
        webRtcControler.CHANGEMYPEER();
    });
    var centerVideoPanel = document.getElementById('centerVideoPanel');
    new ResizeSensor(centerVideoPanel, function () {
      //  console.log('Changed to ' + element.clientWidth);
       // resizingVideoBox();
        webRtcControler.CHANGEMYPEER();
    });
    var sidebar_wrapper = layout.element.sidebar_wrapper;// document.getElementById('centerVideoPanel');
    new ResizeSensor(sidebar_wrapper, function () {
        //console.log('Changed to sidebar_wrapper' + sidebar_wrapper.clientWidth);
      //  resizingVideoBox();
        webRtcControler.CHANGEMYPEER();
    });
   
    var f1 = function () {
       // console.log("f1");
        return 0;
    }
  //  console.log(  fff(f1, 2000, 5));
   // console.log("f....................................................222222");
    //setTimeout(() => { document.title = "hhhh " }, 3000);
    
});
function fff(resolve, onSucsess, reject, time, tryCount) {
    console.log("fff");
    if (resolve()) {
        onSucsess();
        return "ok";
    }
    if (tryCount > 1)
        setTimeout(() => {


            fff(resolve, time, tryCount - 1);

        }, time);
    else {
        reject();
        return "no";
    }
   
}
function getWithboardeData() {
    // $.get(subdir + "/loadwhiteboard", { wid: whiteboardId, at: accessToken }).done(function (data) {
    //    //  whiteboard.loadData(data)
    //     playerBoard.data = data;
    //});

}
function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
} 
function mobileAndTabletcheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
function reportWindowSize() {
   // console.warn("reload by size");
    // window.location.reload(true);
    layout.reLoad();
}
window.addEventListener("orientationchange", function () {
    console.warn("orientationchange");
    layout.reLoad();
   // window.location.reload(true);
});
window.onresize = reportWindowSize;
var MainNavBar = document.getElementById('MainNavBar'); 
function ddd() {
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.2.0/fabric.min.js";

    console.log("start ..");
    var c = document.getElementById("id_viewer");
    var cArabic = c.getContext("2d");
    var canvas = new fabric.Canvas('id_viewer');
    var activeObject = canvas.getActiveObject();
    console.log(activeObject.type);
  
    cArabic.font = "20px Arial";

    //option 1 : adding right-to-left mark at the end to put the '.' between two strong right to left charachters, so it will treated as right to left.
    var str1 = "این یک آزمایش است." + "\u200F";

    //option 2 : adding right-to-left override at the begining of the text so every neutral charachter afterward becomes righ to left.
    var str2;
    str2 = "\u202E";
    str2 += "این یک آزمایش است.";
    //           you might want to finish the override by 'pop directional formatting' charachter
    str2 += "\u202C";

    cArabic.fillText(str1, 200, 30);
    cArabic.fillText(str2, 200, 70);
}

var vPlayer = {
    //isHide: 1,
    isActive: 0,
    player: null,
    interval: null,
    url: null,
    isLoad: 0,
    ytIsLoad:0,
    admin: null,

    firstLoad: async function (data) {
        //console.log(data); 
        if (board.publish) $(".vPlayerIconPanel").css("display", "block"); // document.getElementById('vPlayerIconPanel').style.display = "block";
        var m = data.m;
        if (m == null) return;
        vPlayer.url = m.url;
        document.getElementById('externalVideoInput').value = m.url;
        if (data.isActive) {
            var userName = m.meetInfo.userName;

            if (userName == board.userName)
            await vPlayer.startPlay();
        }
    },
    show: function () {
        vPlayer.isActive = 1;
       
        panelControler.activePlayer();
    },
    start: async function (force) {
        console.log("start ..");
        console.log(vPlayer.url);
       // if (vPlayer.isActive) return;
       // document.getElementById('vPlayerSource').src = vPlayer.url;
        if (!vPlayer.isLoad) {
            var videocssUrl = "/" + board.Prefix + "/css/video-js.css";
           

            await load_script_promise("/" + board.Prefix +"/js/video3.min.js")
                .then(function (script) {
                    

                    vPlayer.isLoad = 1;
                    document.getElementsByTagName("head")[0].insertAdjacentHTML(
                        "beforeend",
                        "<link rel=\"stylesheet\" href='" + videocssUrl + "' />");
                  
                })
            
        }
        if (vPlayer.url.includes("youtube.com") && vPlayer.ytIsLoad==0) {
            await load_script_promise("/" + board.Prefix + "/js/youtube.js")
                .then(function (script) {
                    vPlayer.ytIsLoad = 1;
                    console.log('youtube js load');
                });
        }
       // await sleep(5000);
        vPlayer.isActive = 1;
        if (force) vPlayer.show();
       // vPlayer.player = videojs.players.myVideo;
        vPlayer.player = videojs('myVideo');
        if (vPlayer.url.includes("youtube.com"))
            vPlayer.player.src({ src: vPlayer.url, type: 'video/youtube' });
        else
        vPlayer.player.src(vPlayer.url);
       
        //if (!vPlayer.isLoad) {
        //    vPlayer.loadScriptForce();
          
        //    await vPlayer.loadScript();
            
        //}
        //vPlayer.show(); 
       
        //vPlayer.player = videojs('my-video');
        //videojs('myVideo').ready(function () {
        //    vPlayer.player = this;
        //    vPlayer.player.src({ type: 'video/youtube', src: vPlayer.url});
        //});
       
        
    },
    stop: function () {
        if (vPlayer.interval != null) {
            clearInterval(vPlayer.interval);
            vPlayer.interval = null; 
        }
        if (vPlayer.player != null) vPlayer.player.pause();
        
    },
    Preparation: async function () {
        //if (!vPlayer.isLoad) {
        //    vPlayer.loadScriptForce();
        //    await vPlayer.loadScript();
        //}
        $('#externalVideoModal').modal('show');
        if (vPlayer.url != null) document.getElementById('videoPlayerButton').style.display = "block";
        else document.getElementById('videoPlayerButton').style.display = "none";
        document.getElementById('externalVideoMessage').innerText = '';
        if (vPlayer.url != null) document.getElementById('externalVideoInput').value = vPlayer.url;
    },
    startPlayToServer: async function () {

        var url = document.getElementById('externalVideoInput').value;
        if (url.trim() == "" || url == null) {
            document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
            return;
        }

        var m2 = { type: 'panelControler', action: 'vPlayer' };
        var res2 = mainApp.sendToServer(m2);
        var m = { type: 'vPlayer', action: 'setAdmin', mode: 'startPlay', time: 0, url: url };
        console.log(m);
        var res = mainApp.sendToServer(m); 

    },
    continuPlayToServer: async function () {
       
        var url = document.getElementById('externalVideoInput').value;
        if (url.trim() == "" || url == null) {
            document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
            return;
        }
        var m2 = { type: 'panelControler', action: 'vPlayer' };
        var res2 = mainApp.sendToServer(m2);
       // panelControler.nextPanel = "player";
        var m = { type: 'vPlayer', action: 'setAdmin', mode: 'continuPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
      
    },
    startPlay: async function () {
        console.log('startPlay');
        if (vPlayer.url.trim() == "error"  ) {
            document.getElementById('externalVideoMessage').innerText = "eroor in get file";
            return;
        }
        //var url = document.getElementById('externalVideoInput').value;
        //if (url.trim() == "" || url == null) {
        //    document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
        //    return;
        //}
        
        panelControler.nextPanel = "player";
        $('#externalVideoModal').modal('hide');
        console.log(vPlayer.url);
      //  vPlayer.url = url;
        var m = { type: 'vPlayer', action: 'startPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
        await vPlayer.start();
        vPlayer.setEvent();
        vPlayer.interval = setInterval(vPlayer.getStatus, 5000);
    },
    continuPlay: function () {
       
        //var url = document.getElementById('externalVideoInput').value;
        //if (url.trim() == "" || url == null) {
        //    document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
        //    return;
        //}
       // panelControler.nextPanel = "player";


        $('#externalVideoModal').modal('hide');
        vPlayer.show();
        var m = { type: 'vPlayer', action: 'continuPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
        vPlayer.interval = setInterval(vPlayer.getStatus, 5000);
    },
    setEvent: function () {
        
        vPlayer.player.on('play', function () {
           
            var m = { type: 'vPlayer', action: 'play', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            var res = mainApp.sendToServer(m);
        });
        vPlayer.player.on('pause', function () {
            
            var m = { type: 'vPlayer', action: 'pause', time: vPlayer.player.currentTime(), url: vPlayer.url };
            vPlayer.sendMessage(m);
        });
        vPlayer.player.on('seeking', function () {
           
            var m = { type: 'vPlayer', action: 'seeking', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            vPlayer.sendMessage(m);
        });
        vPlayer.player.on('seeked', function () {
            
            var m = { type: 'vPlayer', action: 'seeked', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            vPlayer.sendMessage(m);
        });
        
    },
    sendMessage: function (m) {
        if (vPlayer.interval == null) {
            console.log("player interval is null ");
            return;
        }
        var res = mainApp.sendToServer(m);
    },
    getStatus: function () {
        var m = { type: 'vPlayer', action: 'setTime', time: vPlayer.player.currentTime(), url: vPlayer.url };
        if (vPlayer.player.paused()) {
            //console.log("paus status");
            m.status = "paused";
        }
        else {
            //console.log("play status");
            m.status = "play";
        }
       // console.log(m);
        mainApp.sendToServer(m);
        //setTimeout(() => {
        //    vPlayer.getStatus();
        //},10000);
    },

    parse: async function (data) {
       // console.warn(data);
        var action = data.action;
        var userName = data.meetInfo.userName;
        if (action == 'setAdmin') {
            await vPlayer.setAdminParse(data);
            return;
        }
     //   panelControler.nextPanel = "player";
       
        if (board.userName == userName)  return;
        var url = data.url;
        if (vPlayer.url == null || vPlayer.url != url || !vPlayer.isActive) {
            vPlayer.url = url;
            await vPlayer.start();
        }
        //else panelControler.activePlayer();
      //  if (vPlayer.isActive && panelControler.activePanel) vPlayer.show();         
       
       
        
        switch (data.action) {
            case "play":
                vPlayer.play(data);
                break;
            case "pause":
                vPlayer.pause(data);
                break; 
            case "seeking":
                vPlayer.seeking(data);
                break;
            case "setTime":
                vPlayer.setStatus(data);
                break; 
            case "startPlay":
                panelControler.nextPanel = "player";
                break;
            case "continuPlay":
                panelControler.nextPanel = "player";
                break;
        }
    },
    setAdminParse: async function (data) {
        clearInterval(vPlayer.interval);
        vPlayer.interval = null;
        vPlayer.admin = data.meetInfo.userName;
        if (vPlayer.admin != board.userName) {
            console.warn("vPlayer.admin :"+vPlayer.admin);
            return;
        }
        vPlayer.url = data.url;
        var mode = data.mode;
        console.log(mode);
        if (mode == 'startPlay') {
            await vPlayer.startPlay();
        }
        else {
            vPlayer.continuPlay();
        }
    },


    play: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);
        vPlayer.player.play();
    },
    pause: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);
        vPlayer.player.pause();
    },
    seeking: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);

    },
    setStatus: function (data) {
        var time = data.time;
        var myTime = vPlayer.player.currentTime;
        var v = Math.abs(time - myTime);       
        if (v < 20) return;
        var status = data.status;        
        if (status == "play") vPlayer.play(data);
        else vPlayer.pause(data);
    },

    loadScript:async function () {
        console.log("load script call");
       // for (var i = 1; i < 10; i++) {
         await sleep(2000);
         if (!vPlayer.isLoad) await vPlayer.loadScript();
            //console.log("load script ..  " + i);
            //sleep(2000).then(() => {
            //    console.log("load script ..  " + i);
            //    //if (vPlayer.isLoad) return;
            //    //    else return;
            //});
       // }
            
         console.log("load script call 2222222222222222222222222222222222222222222");
         return;
       // this.loadScript();
        //setTimeout(() => {
        //    if (!vPlayer.isLoad) vPlayer.loadScript();
        //    else return;
        //}, 2000);
    },
    loadScriptForce: function () {
        console.log("scrip load start ........");
        var script = document.createElement('script');
        script.onload = function () {
            vPlayer.isLoad = 1;
            console.log("script is load .........");
        };
        script.src = "/js/video.min.js";

        document.head.appendChild(script); //or something of the likes
        document.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            "<link rel=\"stylesheet\" href=\"/css/video-js.css\" />");
    }
      
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function load_script_promise(url) {
    return new Promise(function (resolve, reject) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.addEventListener('load', function () {
            this.removeEventListener('load', arguments.callee)
            resolve(script)
        })
        script.src = url
        head.appendChild(script)
    })
}
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
var recordControler = {
    isActive: 0,
    element: {        
        recordStatus: document.getElementById('recordStatus'),
        recordButton: document.getElementById('recordButton'),
        recordFileList: document.getElementById('recordFileList'), 
        recordRequstMessage: document.getElementById('recordRequstMessage'),
        meetLiveDiv: document.getElementById('meetLiveDiv')
    },

    onClick: function () {
        $('#recordModal').modal('toggle');
      
    },
    request: function () {
        var host = window.location.protocol + "//" + window.location.host;
        var m = { type: 'click', meetID: board.meetID, host: host };
       
       
        var recordServerMessag = { type: 'record', 'meetID': board.meetID };
        console.log(m);
        try {
          //  mqttClient.client.publish("recordMeet", JSON.stringify(recordServerMessag), mqttClient.sendOption)
            mqttClient.client.publish('recorder_get_' + board.serverID, JSON.stringify(m), mqttClient.sendOption)
            recordControler.element.recordRequstMessage.innerHTML = "your request send . wait for it to be processed ...";
            setTimeout(() => {
                recordControler.element.recordRequstMessage.innerHTML = "";
            }, 5000);
        }
        catch {
            console.log('error in record request');
        }
    },
    getFileListRequest: function () {
       // if (board.user.permission.Record) {
            var userSub = 'user_' + board.meetID + '_' + board.userName;
            var m = { type: 'getFileListRequest', 'meetID': board.meetID, topic: userSub };
            mqttClient.client.publish("recordMeet_" + board.serverID, JSON.stringify(m), mqttClient.sendOption)
            console.log(m)
       // }
      
    },
    setRecordeStatus: function (b) {
       
       // if (b == recordControler.isActive) return;
        if (b ) {
            recordControler.isActive = 1;
           // $(".recordIcon").css("color", "red");
            var obj = document.getElementById('recordIcon');
            if (obj) {
                obj.style.color = "red";
                obj.title='click to stop recording'
            }
            recordControler.element.recordButton.textContent = "click to stop recording";
            recordControler.element.recordStatus.textContent = "recording";
            if (board.live)
            recordControler.element.meetLiveDiv.style.display = "block";
        }
        else {
            recordControler.isActive = 0;
            //$(".recordIcon").css("color", "black");
            var obj = document.getElementById('recordIcon');
            if (obj) {
                obj.style.color = "black";
                obj.title = 'click to start recording'
            }
            recordControler.element.recordButton.textContent = "click to start recording";
            recordControler.element.recordStatus.textContent = "stop";
            if (board.live)
                recordControler.element.meetLiveDiv.style.display = "none";
        }
    },
    getFileList: function (m) {
        var fileList = m.fileList;
        if (fileList) {
            console.log(fileList);
            var s = '<table style="width:100%">'
            s += '<tr>'
            s += '<td> id </td>';
            s += '<td> open </td>';
            s += '<td> name </td>';

            s += '</tr>'
            var i = 1;
            fileList.forEach(element => {
                var dl = board.recordServer + element
                s += '<tr>'
                s += '<td> ' + i + ' </td>';
                s += '<td> <a target="_blank" href="' + dl + '">open</a> </td>';
                s += '<td> ' + element + ' </td>';

                s += '</tr>'
                i++;
            });
            s += '</table>'
            recordControler.element.recordFileList.innerHTML = s;
            return;
           // var s='<ui>'
            //for (var i = 0; i < fileList.length; i++) {
            //    var link = board.recordServer + fileList[i];
            //    s += '<li><a target="_blank" href="'+link+'" >' + fileList[i]+'</a></li>'
            //}
            //s += '<ui>'
            //recordControler.element.recordFileList.innerHTML = s;
        }
    },

    parse: function (m) {
       
        var action = m.action;
        switch (action) {
            case "fileList":
                recordControler.getFileList(m)
                break;
        }
    }
}