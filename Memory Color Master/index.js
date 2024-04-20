$(() => {
    const letters = "0123456789ABCDEF";

    function getRandomColor() {
        let color = "#";
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    function handleGame(secondSquare) {
        if (square.attr("number").substring(1) == secondSquare.attr("number").substring(1)) {
            square.off("click");
            square.children().css("cursor", "default");
            square.animate({ opacity: "0" });

            secondSquare.off("click");
            secondSquare.children().css("cursor", "default");
            secondSquare.animate({ opacity: "0" });

            squaresNum--;
            if (!squaresNum) return true;
        }
        else {
            square.children().css("transform", "rotateY(0)");
            secondSquare.children().css("transform", "rotateY(0)");
        }
        return false;
    }

    const template = $("#game-box-item-template").html();
    const randomColors = [];
    let squaresNum = 15;

    for (let i = 0; i < squaresNum; i++) {
        randomColors[i] = getRandomColor();
        $(".game-box").append(template);
        $(".game-box").append(template);
    }

    const numbers = [...Array(squaresNum * 2).keys()];
    let square;

    for (let i = 0; i < squaresNum; i++) {
        for (let j = 0; j < 2; j++) {
            square = numbers[Math.floor(Math.random() * numbers.length)];
            numbers.splice(numbers.indexOf(square), 1);
            $(".game-box-item").eq(square).attr("number", (j == 0 ? "f" : "s") + i);
            $(".game-box-item").eq(square).children().children().eq(1).css("background", randomColors[i]);
        }
    }

    square = null;
    blockGame = isGameOver = false;

    $(".game-box-item").on("click", function () {
        if (blockGame) return;
        if (square == null) {
            square = $(this);
            square.children().css("transform", "rotateY(180deg)");
        }
        else if (square.attr("number") != $(this).attr("number")) {
            blockGame = true;
            $(this).children().css("transform", "rotateY(180deg)");

            setTimeout(() => {
                isGameOver = handleGame($(this));
                square = null;
                blockGame = false;
            }, 750);
        }
    });

    const startTime = new Date;
    let time;

    const timer = setInterval(() => {
        time = new Date(new Date - startTime);

        $("#score").text((time.getMinutes() < 10 ? "0" + time.getMinutes() : getMinutes()) +
            ":" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()));

        if (isGameOver) {
            clearInterval(timer);
            $(".game-box").empty();
            $(".game-box").append("<div class='game-box-you-won'>YOU WON</div>");
        }
    }, 1000);

    $("#restart").on("click", function (e) {
        const circle = document.createElement("span");
        circle.classList.add("circle");
        circle.style.top = (e.clientY - e.delegateTarget.offsetParent.offsetTop) + "px";
        circle.style.left = (e.clientX - e.delegateTarget.offsetParent.offsetLeft) + "px";

        e.target.appendChild(circle);

        setTimeout(() => {
            location.reload();
        }, 300);
    });
});