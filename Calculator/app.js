var display = document.getElementById("display")


function getvalue(e){
    display.value += e

}

function equal(){
    var ans = eval(display.value)
    display.value = ans  
}

function clearAll(){
    display.value = ""  ;
}


function clearchr(){
    var clearchr = display.value.slice(0,-1)
    display.value = clearchr

}
try{
    display.value += e

}
catch{
      "SyntaxError"
}