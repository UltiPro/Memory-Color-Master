$(function () {
    let randomColors = [];
    for (let i = 0; i < 15; i++) randomColors[i] = getRandomColor();

    const template = $("#game-box-item-template").html();
    for (let i = 0; i < 30; i++) $(".game-box").append(template);

    const all = $(".game-box-item");
    let numbers = [...Array(30).keys()];
    let firstNum, secondNum;
    
    for (let i = 0; i < (all.length / 2); i++) {
        firstNum = numbers[Math.floor(Math.random() * numbers.length)];
        numbers.splice(numbers.indexOf(firstNum), 1);
        secondNum = numbers[Math.floor(Math.random() * numbers.length)];
        numbers.splice(numbers.indexOf(secondNum), 1);

        $(".game-box-item").eq(firstNum).children().children().eq(1).css("background", randomColors[i]);
        $(".game-box-item").eq(secondNum).children().children().eq(1).css("background", randomColors[i]);
    }

    $("#reset-button").on("click", function (e) {
        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = (e.clientY - e.delegateTarget.offsetParent.offsetTop) + 'px';
        circle.style.left = (e.clientX - e.delegateTarget.offsetParent.offsetLeft) + 'px';

        e.target.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 300);
    });

    all.on("click", function () {

    });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
}