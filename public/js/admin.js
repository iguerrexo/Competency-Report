/*global variables*/
var serverURL="http://localhost:8080/API/";
var items=[];

function init(){
    console.log("Admin Page");
    $("#btn-register").on('click',function(){
        register();
    });
}

window.onload=init;

//oblect contructor 
class Item{
    constructor(code,title,price,description,category,image){
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category
        this.image=image;
        this.user="Nora";
    }
}
//register function
function register(){
//get the form the vaules 
var code=$("#code").val();
var title=$("#title").val();
var price=$("#price").val();
var description=$("#description").val();
var category=$("#category").val();
var image=$("#image").val();
if(code!="" && title!="" && price!=""){
//create the object 
var newItem = new Item(code,title,price,description,category,image);
//push the item to the items array
items.push(newItem);
var jsonString=JSON.stringify(newItem);
//display on the console the item
console.log(newItem);
console.log(jsonString);
}
else{
    alert("Add a code, title and price!");
}
$.ajax({
    url:serverURL+"items",
    type: "POST",
    contentType:"application/json",
    data:jsonString,
    success: function(response){
        console.log("It worked",response);
        //show notification
        $("#alert-box").removeClass("hidden");
        //hide the notification
        setTimeout(function(){
            $("#alert-box").removeClass("hidden");
        },3000);
        },

    error:function(errorDetails){
        console.log("Something went wrong...",errorDetails);
    }                         
});

clearForm();

}

function clearForm(){
    $("#code").val("");
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}