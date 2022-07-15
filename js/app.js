const field = []
let isUser = true
$(document).ready(function (){
    for(let i = 1; i<=9; i++){
        field.push(null)
    }
})

function addSign(id){
    if(field[id-1] === null){
        field[id-1] = isUser
        $("#"+id).append(
            isUser?$('<div class="cross">'):$('<div class="zero">')
        )
        isUser = !isUser;
    }
}