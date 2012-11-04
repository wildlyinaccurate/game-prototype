Clone.Blob = function(gs) {

    this.isClone = false;
    this.width = 50;
    this.height = 50;
    this.moveSpeed = 12;

    this.velocity = {
        x: 0,
        y: 0
    };

    this.coords = {
        x: gs.width * 0.5,
        y: gs.height * 0.5
    };

    var expiryTime;

    // Set or get this blob's expiry time in seconds
    this.expiresIn = function(expire) {
        if (arguments.length === 0) {
            return -(Math.round((+new Date - expiryTime) / 1000));
        } else {
            expiryTime = new Date(+new Date + expire * 1000);
        }
    };

    this.shoot = function() {
        var bullet = new Clone.Bullet(gs, {
            coords: { x: this.coords.x, y: this.coords.y }
        });

        gs.addEntity(bullet);
    };

    this.update = function(gs) {
        newXCoord = this.coords.x + this.velocity.x;
        newYCoord = this.coords.y + this.velocity.y;

        minXCoord = this.width / 2;
        maxXCoord = Clone.canvas.width - minXCoord;
        minYCoord = this.height / 2;
        maxYCoord = Clone.canvas.height - minYCoord;

        // Keep the co-ordinates within the canvas
        if (newXCoord < minXCoord) {
            newXCoord = minXCoord;
        } else if (newXCoord > maxXCoord) {
            newXCoord = maxXCoord;
        }

        if (newYCoord < minYCoord) {
            newYCoord = minYCoord;
        } else if (newYCoord > maxYCoord) {
            newYCoord = maxYCoord;
        }

        this.coords.y = newYCoord;
        this.coords.x = newXCoord;
    };

    this.draw = function(context, gs) {
        context.fillStyle = (this.isClone) ? '#27C' : '#444';
        context.fillRect(this.coords.x - (this.width / 2), this.coords.y - (this.height / 2), this.width, this.height);

        if (expiryTime) {
            context.font = 'bold 20px sans-serif';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle = '#FFF';
            context.fillText(this.expiresIn(), this.coords.x, this.coords.y);
        }
    };

};
