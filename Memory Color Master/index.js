$(function () {
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
});