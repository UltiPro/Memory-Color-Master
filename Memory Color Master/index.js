$(function () {
    const template = $("#game-box-item-template").html();

    for (let i = 0; i < 30; i++) $(".game-box").append(template);

    const all = $(".game-box-item");

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