$(function () {
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    function handleGame() {
        if (first.attr("number").substring(1) == second.attr("number").substring(1)) {
            first.prop("onclick", null).off("click");
            second.prop("onclick", null).off("click");

            first.children().css("cursor", "default");
            second.children().css("cursor", "default");

            first.animate({ opacity: "0" });
            second.animate({ opacity: "0" });

            squaresNum--;
            if (!squaresNum) return false;
        }
        else {
            first.children().css("transform", "rotateY(0deg)");
            second.children().css("transform", "rotateY(0deg)");
        }
        return true;
    }

    let squaresNum = 15;

    let randomColors = [];
    for (let i = 0; i < squaresNum; i++) randomColors[i] = getRandomColor();

    const template = $("#game-box-item-template").html();
    for (let i = 0; i < squaresNum * 2; i++) $(".game-box").append(template);

    let numbers = [...Array(squaresNum * 2).keys()];
    let first, second;

    for (let i = 0; i < squaresNum; i++) {
        first = numbers[Math.floor(Math.random() * numbers.length)];
        numbers.splice(numbers.indexOf(first), 1);

        second = numbers[Math.floor(Math.random() * numbers.length)];
        numbers.splice(numbers.indexOf(second), 1);

        $(".game-box-item").eq(first).attr("number", "f" + i);
        $(".game-box-item").eq(first).children().children().eq(1).css("background", randomColors[i]);
        $(".game-box-item").eq(second).attr("number", "s" + i);
        $(".game-box-item").eq(second).children().children().eq(1).css("background", randomColors[i]);
    }

    first = second = null;
    blockGame = false;
    isGameOn = true;

    $(".game-box-item").on("click", async function () {
        if (blockGame) return;

        if (first == null) {
            first = $(this);
            first.children().css("transform", "rotateY(180deg)");
        }
        else if (first.attr("number") != $(this).attr("number")) {
            blockGame = true;

            second = $(this);
            second.children().css("transform", "rotateY(180deg)");

            setTimeout(() => {
                isGameOn = handleGame();

                first = null;
                second = null;

                blockGame = false;
            }, 750);
        }
    });

    const startTime = new Date;
    let time;

    let timer = setInterval(() => {
        time = new Date(new Date - startTime);

        $("#score").text((time.getMinutes() < 10 ? "0" + time.getMinutes() : getMinutes()) +
            ":" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()));

        if (!isGameOn) {
            clearInterval(timer);
            $(".game-box").empty();
            $(".game-box").append("<div class='game-box-you-won'>YOU WON</div>")
        }
    }, 1000);

    $("#reset-button").on("click", function (e) {
        const circle = document.createElement('span');

        circle.classList.add('circle');

        circle.style.top = (e.clientY - e.delegateTarget.offsetParent.offsetTop) + 'px';
        circle.style.left = (e.clientX - e.delegateTarget.offsetParent.offsetLeft) + 'px';

        e.target.appendChild(circle);

        setTimeout(() => {
            location.reload();
        }, 300);
    });
});