setTimeout(()=>{
    document.getElementById("msg").innerHTML=null;
},3000);

function validate(){
    const uname = document.getElementById("uname").value;
    const uemail = document.getElementById("uemail").value;
    const upass = document.getElementById("upass").value;
    if(uname=="" || upass=="" || uemail==""){
        alert("please enter all the credentials");
        return false;
    }
    return true;
}
