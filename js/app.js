class Game{
    field = new Array(9)
    isUser = null
    userWin = 0
    computerWin = 0
    canPlay = true
}

const game = new Game()

function start(){
    game.canPlay = true
    game.isUser = true
    const ticTable = $('.tic-table')
    if(ticTable.hasClass("glare")){
        ticTable.removeClass("glare")
    }
    $(document).ready(function (){
        for(let i = 0; i<9; i++){
            game.field[i]=null
        }
        $('.tic-table').addClass("glare")
        $('.zero').remove()
        $('.cross').remove()
    })
}
function addSign(id){
    const isUser = game.isUser
    if(isUser && game.canPlay){
        if(game.field[id-1] === null){
            game.field[id-1] = true
            $("#"+id).append($('<div class="cross">'))
            if(checkEnd(true,game.field)){
                game.isUser = null
                game.canPlay = false
            }
            else{
                game.isUser = false;
                makeComputerMove(game.field)
                if(checkEnd(false,game.field)){
                    game.isUser = null
                    game.canPlay = false
                }
                else{
                    game.isUser = true;
                }
            }
        }
    }else if (game.canPlay){
        start()
    }
}
function makeComputerMove(){
    index = getRndSteep(game.field)
    game.field[index] = false
    $(`#${index+1}`).append($('<div class="zero">'))
}
function getRndSteep(field){
    const index = Math.floor(Math.random() * 9);
    return field[index] === null ? index:getRndSteep(field)
}
function checkEnd(isUser, field){
    if(checkState(isUser, field)){
        $(document).ready(function (){
            updateScore(isUser)
            callMessage((isUser?"Пользователь":"Компьютер") + " выйграл", isUser)
        })
    }
    else if(!field.some((x) => x === null)){
        $(document).ready(function (){
            callMessage(("Ничья"),true)
        })
    }else{
        return false
    }
    return true
}

function checkState(isUser, field){
    for (let i = 1; i<=field.length/3; i++){
        if(checkHorizontalLine(isUser, i, field)){
            return true;
        }
    }//check all horizontal lines
    for (let i = 1; i<=7; i+=3){
        if(checkVerticalLine(isUser, i, field)){
            return true
        }
    }//check all vertical lines
    if (checkDiagonal(isUser, [1,5,9], field)){
        return true
    }// check upper diagonal
    else if(checkDiagonal(isUser, [3,5,7], field)){
        return true
    }// check lower diagonal
    return false
}
function checkHorizontalLine(isUser, lineNum, field){
    for (let i = lineNum; i <= field.length; i += 3) {
        if(field[i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkVerticalLine(isUser, start, field){
    for (let i = 0; i < field.length/3; i += 1) {
        if(field[start+i-1]!==isUser){
            return false
        }
    }
    return true
}

function checkDiagonal(isUser, points, field){
    for (let i of points) {
        if(field[i-1]!==isUser){
            return  false
        }
    }
    return true
}

function updateScore(isUser){
    if(isUser){
        game.userWin++
    }else{
        game.computerWin++
    }
    $('#score').text(`Счет ${game.userWin}:${game.computerWin}`)
}

function callMessage(message, isUser){
    const messageType = isUser?"alert-success":"alert-danger"
    const myAlert = $('#myAlert')
    if(myAlert.length){
        myAlert.removeClass("alert-success").removeClass("alert-danger").addClass(messageType)
        $('#myAlert span').text(message)
    }
    else{
        $(`<div class="alert ${messageType} alert-dismissible fade show message-box"  role="alert" id="myAlert">
        <span>${message}</span>
        <button type="button" class="btn-close" onclick="start()" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`).insertBefore($('.tic-table'))
    }
}