
var items=[];
var serverURL="http://localhost:8080/API/";

function fetchCatalog(){
    //get items from the server
    $.ajax({
        url:serverURL+"items",
        type:"GET",
        success:function(res){
            console.log("It works",res);
            for(var i=0;i<res.length;i++){
                if(res[i].user=="Nora"){
                items.push(res[i]);
            }
            }
            displayCatalog();
        },
        error:function(details){
            console.log("Error",details);
        }
    });
}
function displayCatalog(){
//travel the array
for(var i=0;i<items.length;i++){
//get the element from the array
var product=items[i];
drawItem(product);
} 
}
function drawItem(product){
var layout=`
<div class="item" id="${product.code}">
    <img src="${product.image}"></img>
    <h4>${product.title}</h4>
    <h6 class="itemPrice">$ ${product.price}</h6>
    <p>${product.description}</p>
    <button class="btn btn-primary"> Add to Cart </button>
</div>
`;

//display the element on the DOM (HTML)
$('#catalog').append(layout);
}

function search(){
    $("#catalog").html("");
    var searchText=$("#txt-search").val();

    for(var i=0;i<items.length;i++){
        var item=items[i];
        if(item.title.toLowerCase().includes(searchText.toLowerCase())){
                drawItem(item);
        }
    }
}

//initialization 
function init(){
    console.log('catalog page');
    fetchCatalog();
    //displayCatalog();

    $("#btn-search").click(search);

}

window.onload=init;
