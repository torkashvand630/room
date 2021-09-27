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