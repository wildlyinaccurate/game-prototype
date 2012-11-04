Clone.Bullet = function(gs, options) {

    var width = 5;
    var height = 5;
    var moveSpeed = 20;
    var coords = options.coords;

    this.update = function(gs) {
        coords.y -= moveSpeed;
    };

    this.draw = function(context, gs) {
        context.fillStyle = '#000';
        context.fillRect(coords.x - (width / 2), coords.y - (height / 2), width, height);
    };

};
