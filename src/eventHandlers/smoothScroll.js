var menuItems = require('../helpers/getDOMElements').menuItems;

menuItems.find('a').click(function(e) {
    e.preventDefault();
    $(window).scrollTo(this.hash, 1000);
});