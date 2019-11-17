var serverURL = "http://restclass.azurewebsites.net";


function Item(code, title, price, description, category, rating, image){
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.rating = rating;
    this.image = image;
    this.user = "Martin";
}

function clearForm(){
    $("#txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtDescript").val("");
    $("#txtCat").val("");
    $("#txtRating").val("");
    $("#txtImage").val("");

}


function saveItem(){
   
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var description = $("#txtDescript").val();
    var category = $("#txtCat").val();
    var rating = $("#txtRating").val();
    var itemImg = $("#txtImage").val();

    
    var test = new Item(code, title, price, description, category, rating, itemImg);
    console.log(test);

  
$.ajax({
    url: serverURL + "/API/points",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(test),
    success : function(response){
           
            console.log("Data saved, server responded with", response);
            clearForm();
            $("#alert").removeClass("hide");

            setTimeout(
                function(){
                    $("#alert").addClass("hide");
                },
                4000 
            );
        },
        error: function(details){
            console.log("Error, something went wrong", details);
        }
    });

}


function solveHomework(){
    var data = [
        {
            age: 99,
            name: "Sergio",
            color: "Gray"
        },
        {
            age: 23,
            name: "John",
            color: "Blue"
        },
        {
            age: 27,
            name: "Alice",
            color: "Pink"
        },
        {
            age: 87,
            name: "Robert",
            color: "Gray"
        },
        {
            age: 23,
            name: "Sheldon",
            color: "Black"
        },
        {
            age: 45,
            name: "Will",
            color: "Green"
        },
        {
            age: 16,
            name: "Kevin",
            color: "Yellow"
        },
        {
            age: 37,
            name: "Liz",
            color: "Pink"
        },
        {
            age: 98,
            name: "Noah",
            color: "White"
        },
        {
            age: 31,
            name: "Alfredo",
            color: "White"
        },
        {
            age: 74,
            name: "Rhenard",
            color: "Green"
        },
        {
            age: 39,
            name: "Myk",
            color: "Blue"
        },
    ]


    var sumOfAges = 0;

    var oldestAge = 0;
    var oldestName = "";

    var youngAge = data[0].age;
    var youngName = data[0].name;


for(var i=0; i<data.length; i++){ 
     var dName = data[i];
     sumOfAges += dName.age;
     console.log(dName.name);

     if(dName.age > oldestAge){
         oldestAge = dName.age;
         oldestName = dName.name;
 }

    if(dName.age < youngAge){
         youngAge = dName.age;
         youngName = dName.name;
    }

    }

console.log("Oldest is " + oldestName + " and has " + oldestAge + " years");
console.log("Youngest is " + youngName + " and has " + youngAge + " years");
console.log("Answer 3: ", sumOfAges);

}

function init(){
    console.log("admin page");

    $("#btnSave").click(saveItem);

}

window.onload = init;