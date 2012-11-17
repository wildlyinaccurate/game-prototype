Clone.Bullet = function(gs, options) {

    var offScreenThreshold = 100;

    var width = 5;
    var height = 5;
    var moveSpeed = 20;
    var coords = options.coords;

    this.owner = options.owner;

    this.update = function(gs) {
        if (
            coords.y > Clone.canvas.height + offScreenThreshold || coords.y < -offScreenThreshold ||
            coords.x > Clone.canvas.width + offScreenThreshold || coords.x < -offScreenThreshold
        ) {
            gs.delEntity(this);
        }

        coords.y -= moveSpeed;
    };

    this.draw = function(context, gs) {
        context.fillStyle = '#000';
        context.fillRect(coords.x - (width / 2), coords.y - (height / 2), width, height);
    };

};
