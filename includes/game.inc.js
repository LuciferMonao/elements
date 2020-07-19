const board = {
    o0: { element: document.getElementById("o0"), state: false },
    o1: { element: document.getElementById("o1"), state: false },
    o2: { element: document.getElementById("o2"), state: false },
    o3: { element: document.getElementById("o3"), state: false },
    o4: { element: document.getElementById("o4"), state: false },
    o5: { element: document.getElementById("o5"), state: false },
    o6: { element: document.getElementById("o6"), state: false },
    o7: { element: document.getElementById("o7"), state: false },
    o8: { element: document.getElementById("o8"), state: false },
    o9: { element: document.getElementById("o9"), state: false },
    p0: { element: document.getElementById("p0"), state: false },
    p1: { element: document.getElementById("p1"), state: false },
    p2: { element: document.getElementById("p2"), state: false },
    p3: { element: document.getElementById("p3"), state: false },
    p4: { element: document.getElementById("p4"), state: false },
    p5: { element: document.getElementById("p5"), state: false },
    p6: { element: document.getElementById("p6"), state: false },
    p7: { element: document.getElementById("p7"), state: false },
    p8: { element: document.getElementById("p8"), state: false },
    p9: { element: document.getElementById("p9"), state: false },
};
const elements = ["air", "ground", "fire", "water"];

var player = "player1";
var moved = false;

function objclone(obj) {
    let ret_obj = {};
    for (let element in obj) {
        ret_obj[element] = obj[element].state;
    }
    return ret_obj;
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
var next_element = elements.random();

function update() {
    for (let key in board) {
        let element = board[key];

        if (key.indexOf("p") != -1) {
            var opposite_side = "0";
        } else {
            var opposite_side = "p";
        }
        try {
            switch (board[opposite_side + key.replace(/^\D+/g, "")].state) {
                case "fire":
                    switch (element.state) {
                        case "water":
                            board[
                                opposite_side + key.replace(/^\D+/g, "")
                            ].state = false;
                            update();
                            break;
                        case "ground":
                            element.state = false;
                            element.element.classList.remove("already-full");
                            update();
                            break;
                    }
                    break;
                case "ground":
                    switch (element.state) {
                        case "fire":
                            board[
                                opposite_side + key.replace(/^\D+/g, "")
                            ].state = false;
                            update();
                            break;
                        case "air":
                            element.state = false;
                            update();
                            break;
                    }
                    break;
                case "air":
                    switch (element.state) {
                        case "ground":
                            board[
                                opposite_side + key.replace(/^\D+/g, "")
                            ].state = false;
                            update();
                            break;
                        case "water":
                            element.state = false;
                            element.element.classList.remove("already-full");
                            update();
                            break;
                    }
                    break;
                case "water":
                    switch (element.state) {
                        case "air":
                            board[
                                opposite_side + key.replace(/^\D+/g, "")
                            ].state = false;
                            break;
                        case "fire":
                            element.state = false;
                            element.element.classList.remove("already-full");
                            break;
                    }
                    break;
            }
        } catch {
            console.log("lol");
        }

        switch (element.state) {
            case "air":
                element.element.classList.remove("blue");
                element.element.classList.remove("green");
                element.element.classList.remove("red");
                element.element.classList.add("lightblue");
                element.element.classList.add("already-full");
                break;
            case "ground":
                element.element.classList.remove("lightblue");
                element.element.classList.remove("blue");
                element.element.classList.remove("red");
                element.element.classList.add("green");
                element.element.classList.add("already-full");
                break;
            case "fire":
                element.element.classList.remove("lightblue");
                element.element.classList.remove("green");
                element.element.classList.remove("blue");
                element.element.classList.add("red");
                element.element.classList.add("already-full");
                break;
            case "water":
                element.element.classList.remove("lightblue");
                element.element.classList.remove("green");
                element.element.classList.remove("red");
                element.element.classList.add("blue");
                element.element.classList.add("already-full");
                break;
            case false:
                element.element.classList.remove("lightblue");
                element.element.classList.remove("green");
                element.element.classList.remove("red");
                element.element.classList.remove("blue");
                if (key.indexOf("o") != -1 && player == "player1") {
                    element.element.classList.remove("already-full");
                } else if (key.indexOf("p") != -1 && player == "player2") {
                    element.element.classList.remove("already-full");
                }

                break;
        }
    }

    if (
        board.o0.state != false &&
        board.o1.state != false &&
        board.o2.state != false &&
        board.o3.state != false &&
        board.o4.state != false &&
        board.o5.state != false &&
        board.o6.state != false &&
        board.o7.state != false &&
        board.o8.state != false &&
        board.o9.state != false
    ) {
        alert("Player 1 won!");
        location.reload();
    } else if (
        board.p0.state != false &&
        board.p1.state != false &&
        board.p2.state != false &&
        board.p3.state != false &&
        board.p4.state != false &&
        board.p5.state != false &&
        board.p6.state != false &&
        board.p7.state != false &&
        board.p8.state != false &&
        board.p9.state != false
    ) {
        alert("Player 2 won!");
        location.reload();
    }
}

function click(element) {
    if (element.state == false) {
        element.state = next_element;
        update();
    }
}

function shift(player, dir) {
    let old_board = objclone(board);
    console.log(old_board);

    if (player == "player2") {
        if (dir == "r") {
            console.log("right");
            board.p0.state = old_board.p9;
            board.p1.state = old_board.p0;
            board.p2.state = old_board.p1;
            board.p3.state = old_board.p2;
            board.p4.state = old_board.p3;
            board.p5.state = old_board.p4;
            board.p6.state = old_board.p5;
            board.p7.state = old_board.p6;
            board.p8.state = old_board.p7;
            board.p9.state = old_board.p8;
        } else if (dir == "l") {
            board.p0.state = old_board.p1;
            board.p1.state = old_board.p2;
            board.p2.state = old_board.p3;
            board.p3.state = old_board.p4;
            board.p4.state = old_board.p5;
            board.p5.state = old_board.p6;
            board.p6.state = old_board.p7;
            board.p7.state = old_board.p8;
            board.p8.state = old_board.p9;
            board.p9.state = old_board.p0;
        }
    } else if (player == "player1") {
        if (dir == "r") {
            console.log("right");
            board.o0.state = old_board.o9;
            board.o1.state = old_board.o0;
            board.o2.state = old_board.o1;
            board.o3.state = old_board.o2;
            board.o4.state = old_board.o3;
            board.o5.state = old_board.o4;
            board.o6.state = old_board.o5;
            board.o7.state = old_board.o6;
            board.o8.state = old_board.o7;
            board.o9.state = old_board.o8;
        } else if (dir == "l") {
            board.o0.state = old_board.o1;
            board.o1.state = old_board.o2;
            board.o2.state = old_board.o3;
            board.o3.state = old_board.o4;
            board.o4.state = old_board.o5;
            board.o5.state = old_board.o6;
            board.o6.state = old_board.o7;
            board.o7.state = old_board.o8;
            board.o8.state = old_board.o9;
            board.o9.state = old_board.o0;
        }
    }

    update();
}

function setbackground() {
    next_element = elements.random();
    switch (next_element) {
        case "water":
            document.getElementById("body").classList.remove("red");
            document.getElementById("body").classList.remove("green");
            document.getElementById("body").classList.remove("lightblue");
            document.getElementById("body").classList.add("blue");
            break;
        case "fire":
            document.getElementById("body").classList.remove("blue");
            document.getElementById("body").classList.remove("green");
            document.getElementById("body").classList.remove("lightblue");
            document.getElementById("body").classList.add("red");
            break;
        case "air":
            document.getElementById("body").classList.remove("red");
            document.getElementById("body").classList.remove("green");
            document.getElementById("body").classList.remove("blue");
            document.getElementById("body").classList.add("lightblue");
            break;
        case "ground":
            document.getElementById("body").classList.remove("red");
            document.getElementById("body").classList.remove("blue");
            document.getElementById("body").classList.remove("lightblue");
            document.getElementById("body").classList.add("green");
            break;
    }
}

function turn() {
    if (player == "player1") {
        document.getElementById("player-field").innerHTML = "player2";
    } else {
        document.getElementById("player-field").innerHTML = "player1";
    }

    if (player == "player1") {
        player = "player2";
        board.p0.element.classList.remove("already-full");
        board.p1.element.classList.remove("already-full");
        board.p2.element.classList.remove("already-full");
        board.p3.element.classList.remove("already-full");
        board.p4.element.classList.remove("already-full");
        board.p5.element.classList.remove("already-full");
        board.p6.element.classList.remove("already-full");
        board.p7.element.classList.remove("already-full");
        board.p8.element.classList.remove("already-full");
        board.p9.element.classList.remove("already-full");
        board.o0.element.classList.add("already-full");
        board.o1.element.classList.add("already-full");
        board.o2.element.classList.add("already-full");
        board.o3.element.classList.add("already-full");
        board.o4.element.classList.add("already-full");
        board.o5.element.classList.add("already-full");
        board.o6.element.classList.add("already-full");
        board.o7.element.classList.add("already-full");
        board.o8.element.classList.add("already-full");
        board.o9.element.classList.add("already-full");
        update();
    } else if (player == "player2") {
        player = "player1";
        board.o0.element.classList.remove("already-full");
        board.o1.element.classList.remove("already-full");
        board.o2.element.classList.remove("already-full");
        board.o3.element.classList.remove("already-full");
        board.o4.element.classList.remove("already-full");
        board.o5.element.classList.remove("already-full");
        board.o6.element.classList.remove("already-full");
        board.o7.element.classList.remove("already-full");
        board.o8.element.classList.remove("already-full");
        board.o9.element.classList.remove("already-full");
        board.p0.element.classList.add("already-full");
        board.p1.element.classList.add("already-full");
        board.p2.element.classList.add("already-full");
        board.p3.element.classList.add("already-full");
        board.p4.element.classList.add("already-full");
        board.p5.element.classList.add("already-full");
        board.p6.element.classList.add("already-full");
        board.p7.element.classList.add("already-full");
        board.p8.element.classList.add("already-full");
        board.p9.element.classList.add("already-full");
        update();
    }

    setbackground();

    moved = false;
}

for (let key in board) {
    let element = board[key];

    element.element.addEventListener("click", function (e) {
        if (game) {
            if (player == "player1") {
                if (key.indexOf("o") != -1) {
                    let thing = key
                    if (board[thing].state == false) {
                        click(element);
                        turn();
                    }
                }
            } else if (player == "player2") {
                if (key.indexOf("p") != -1) {
                    let thing = key
                    if (board[thing].state == false) {
                        click(element);
                        turn();
                    }
                }
            }
        }
        if (!game) {
            game = true;
            for (let key_thing in board) {
                let key = key_thing;
                if (key.indexOf("o") != -1) {
                    board[key].element.classList.remove("already-full");
                }
            }
            document.getElementById("h5").classList.add("hidden");
            document.getElementById("player-field").innerHTML = "player1";
            setbackground();
        }
    });
}

document.getElementById("game-left").addEventListener("click", function () {
    if (game && moved == false) {
        shift(player, "l");
        moved = true;
    }
    if (!game) {
        game = true;
        for (let key_thing in board) {
            let key = key_thing;
            if (key.indexOf("o") != -1) {
                board[key].element.classList.remove("already-full");
            }
        }
        document.getElementById("h5").classList.add("hidden");
        document.getElementById("player-field").innerHTML = "player1";
        setbackground();
    }
});

document.getElementById("game-right").addEventListener("click", function () {
    if (game && moved == false) {
        shift(player, "r");
        moved = true;
    }
    if (!game) {
        game = true;
        for (let key_thing in board) {
            let key = key_thing;
            if (key.indexOf("o") != -1) {
                board[key].element.classList.remove("already-full");
            }
        }
        document.getElementById("h5").classList.add("hidden");
        document.getElementById("player-field").innerHTML = "player1";
        setbackground();
    }
});

var game = false;
for (let key_thing in board) {
    let key = key_thing;
    board[key].element.classList.remove("already-full");
    board[key].element.classList.add("already-full");
}

document.getElementById("h5").addEventListener("click", (e) => {
    if (!game) {
        game = true;
        for (let key_thing in board) {
            let key = key_thing;
            if (key.indexOf("o") != -1) {
                board[key].element.classList.remove("already-full");
            }
        }
        document.getElementById("h5").classList.add("hidden");
        setbackground();
        document.getElementById("player-field").innerHTML = "player1";
    }
});

//turn();
