setTimeout(()=>{
    document.getElementById("msg").innerHTML=null;
},3000);

function validate(){
    const uemail = document.getElementById("uemail").value;
    const upass = document.getElementById("upass").value;
    if(uemail=="" || upass==""){
        alert("please enter all the credentials");
        return false;
    }
    return true;
}
