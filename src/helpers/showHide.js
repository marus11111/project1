function show(element) {
    element.removeClass('hide').width();
    element.addClass('show');
}

function hide(element) {
    element.removeClass('show').width();
    element.addClass('hide');
}

exports.show = show;
exports.hide = hide;