function SendMail(){
    var params = {
        from_name : document.getElementById("fullName").value,
        email_id : document.getElementById("email_id").value,
        message : document.getElementById("message").value,
    }
    emailjs.send("service_b1xhd4q","template_0cis9bg",params).then(function(res){
        alert("Mail send Successfully" + res.status);
    })
}