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
            isUser?$('<div class="cross">'):$('<div class="zero">'))
        checkState()
        isUser = !isUser;
    }
}
function checkState(){
    for (let i = 1; i<=3; i++){
        if(checkHorizontalLine(isUser, i)){
            alert((isUser?"Пользователь":"Компьютер") + " выйграл")
        }
    }//check all horizontal lines
    for (let i = 1; i<=7; i+=3){
        if(checkVerticalLine(isUser, i)){
            alert((isUser?"Пользователь":"Компьютер") + " выйграл")
        }
    }//check all vertical lines
    if (checkDiagonal(isUser, [1,5,9])){
        alert((isUser?"Пользователь":"Компьютер") + " выйграл")
    }// check upper diagonal
    else if(checkDiagonal(isUser, [3,5,7])){
        alert((isUser?"Пользователь":"Компьютер") + " выйграл")
    }// check lower diagonal
}
function checkHorizontalLine(isUser, lineNum){
    for (let i = lineNum; i <= 9; i += 3) {
        if(field[i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkVerticalLine(isUser, start){
    for (let i = 0; i < 3; i += 1) {
        if(field[start+i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkDiagonal(isUser, points){
    for (let i of points) {
        if(field[i-1]!==isUser){
            return  false
        }
    }
    return true
}