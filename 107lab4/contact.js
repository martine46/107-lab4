function saveMessage(){

    var name = $("#txtName").val();
    var mail = $("#txtMail").val();
    var message = $("#txtMessage").val();

    var msg = {
        name: name,
        mail: mail,
        message: MessageChannel,
        name: "William"
    };

console.log(msg);
  
    $.ajax({
        url: '/api/message',
        type: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
        success: function(res){
            console.log("Server says", res);
        },
        error: function(error){
            console.log("**Error saving message",error);
        }
    });
}

function init(){
    console.log("contact page!");

    $("#btnSend").click(saveMessage);
    $("#btnSave").click(saveItem);
}



window.onload = init;