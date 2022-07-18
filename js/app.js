class Game{
    field = [];
    isUser = null;
    userWin = 0;
    computerWin = 0;
}

const game = new Game()

function start(){
    game.field.splice(0,9)
    game.isUser = true
    $(document).ready(function (){
        for(let i = 1; i<=9; i++){
            game.field.push(null)
        }
        $('.zero').remove()
        $('.cross').remove()
    })

}
function addSign(id){
    const isUser = game.isUser
    if(isUser !== null){
        if(game.field[id-1] === null){
            game.field[id-1] = isUser
            $("#"+id).append(
                isUser?$('<div class="cross">'):$('<div class="zero">'))
            if(checkState(isUser)){
                $(document).ready(function (){
                    alert((isUser?"Пользователь":"Компьютер") + " выйграл")
                    start()
                })
            }
            else{
                game.isUser = !isUser;

            }
        }
    }else{
        start()
    }
}
function checkState(isUser){
    for (let i = 1; i<=3; i++){
        if(checkHorizontalLine(isUser, i)){
            return true;
        }
    }//check all horizontal lines
    for (let i = 1; i<=7; i+=3){
        if(checkVerticalLine(isUser, i)){
            return true
        }
    }//check all vertical lines
    if (checkDiagonal(isUser, [1,5,9])){
        return true
    }// check upper diagonal
    else if(checkDiagonal(isUser, [3,5,7])){
        return true
    }// check lower diagonal
    return false
}
function checkHorizontalLine(isUser, lineNum){
    for (let i = lineNum; i <= 9; i += 3) {
        if(game.field[i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkVerticalLine(isUser, start){
    for (let i = 0; i < 3; i += 1) {
        if(game.field[start+i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkDiagonal(isUser, points){
    for (let i of points) {
        if(game.field[i-1]!==isUser){
            return  false
        }
    }
    return true
}