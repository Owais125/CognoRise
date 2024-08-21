var firebaseConfig = {
    apiKey: "AIzaSyCWHxu-mJqcBa8FLrFxjG2KNooleZNZL0w",
    authDomain: "todoapdatabse.firebaseapp.com",
    databaseURL: "https://todoapdatabse-default-rtdb.firebaseio.com",
    projectId: "todoapdatabse",
    storageBucket: "todoapdatabse.appspot.com",
    messagingSenderId: "1061110668413",
    appId: "1:1061110668413:web:8b6cf8151e9ce9a8c12514"
};

// Initialize Firebase
var frb = firebase.initializeApp(firebaseConfig);






var input = document.getElementById("input")
var list = document.getElementById("list")

firebase.database().ref("Todos").on("child_added", (data) => {
    console.log(data.val().value)

    // var liElement = document.createElement("li")
    // var liText = document.createTextNode(data.val().value)
    // liElement.appendChild(liText)
    // list.appendChild(liElement)
    // liElement.style.paddingRight = "0px"
    // liElement.style.marginRight = "20px"


    // // ************LINE BREAK*******************
    // var lineBreak = document.createElement("br");
    // liElement.appendChild(lineBreak);


    // // ************DELETE BUTTON*******************


    // var deletbtn = document.createElement("button")
    // var deletbtnText = document.createTextNode("Delete")
    // deletbtn.appendChild(deletbtnText)
    // liElement.appendChild(deletbtn)
    // deletbtn.setAttribute("onclick", "deleteBtn(this)")
    // deletbtn.setAttribute("id", data.val().key)


    // // deletbtn.style.marginLeft = "20px"
    // // deletbtn.style.marginRight = "20px"


    // // ************EDIT BUTTON*******************


    // var editbtn = document.createElement("button")
    // var editbtnText = document.createTextNode("Edit")
    // editbtn.appendChild(editbtnText)
    // liElement.appendChild(editbtn)
    // editbtn.setAttribute("onclick", "editBtn(this)")
    // editbtn.setAttribute("id", data.val().key)

    // editbtn.style.marginLeft = "20px"
    // editbtn.style.marginRight = "-20px"


    // input.value = ""
    // Create a new list item
var liElement = document.createElement("li");

// Create a container for the text and set overflow styles
var textContainer = document.createElement("div");
var liText = document.createTextNode(data.val().value);
textContainer.appendChild(liText);

// Set styles for the text container
textContainer.style.overflow = "hidden";      // Hide overflow text
textContainer.style.whiteSpace = "nowrap";    // Prevent text from wrapping to a new line
textContainer.style.textOverflow = "ellipsis"; // Add ellipsis if text is truncated
textContainer.style.width = "400px";          // Set a fixed width for the text

// Append text container to the list item
liElement.appendChild(textContainer);
list.appendChild(liElement);

// Set styles for the list item (optional)
liElement.style.paddingRight = "20px";
liElement.style.marginRight = "20px";

// ************ DELETE BUTTON *******************

// Add a line break before the delete button
var lineBreak = document.createElement("br");
liElement.appendChild(lineBreak);

// Create the delete button
var deletbtn = document.createElement("button");
var deletbtnText = document.createTextNode("Delete");
deletbtn.appendChild(deletbtnText);
liElement.appendChild(deletbtn);
deletbtn.setAttribute("onclick", "deleteBtn(this)");
deletbtn.setAttribute("id", data.val().key);

// Set styles for the delete button
deletbtn.style.marginLeft = "20px";

// ************ EDIT BUTTON *******************

// Create the edit button
var editbtn = document.createElement("button");
var editbtnText = document.createTextNode("Edit");
editbtn.appendChild(editbtnText);
liElement.appendChild(editbtn);
editbtn.setAttribute("onclick", "editBtn(this)");
editbtn.setAttribute("id", data.val().key);

// Set styles for the edit button
editbtn.style.marginLeft = "20px";
editbtn.style.marginRight = "-20px";


});


function add() {
    var key = firebase.database().ref("Todos").push().key
    // console.log(key)
    var obj = {
        value: input.value,
        key: key
    }
    firebase.database().ref("Todos").child(key).set(obj)
    input.value = ""
 



}

function dell() {
    var list = document.getElementById("list")
    firebase.database().ref("Todos").remove()


    list.innerHTML = "";
}

function deleteBtn(x) {
    firebase.database().ref("Todos").child(x.id).remove()
    x.parentNode.remove()
}
function editBtn(f) {
    var input = prompt("Enter Updated Value....")
    var editTodo = {
        value: input,
        key: f.id
    }
    firebase.database().ref("Todos").child(f.id).set(editTodo)

    f.parentNode.firstChild.nodeValue = input;

}
