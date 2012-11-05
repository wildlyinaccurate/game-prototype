Clone.Blob = function(gs) {

    this.isClone = false;
    this.width = 50;
    this.height = 50;
    this.moveSpeed = 10;

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

    var preRenderCanvas = document.createElement('canvas');
    preRenderCanvas.width = Clone.canvas.width;
    preRenderCanvas.height = Clone.canvas.height;

    this.draw = function(context, gs) {
        var preRenderContext = preRenderCanvas.getContext('2d');
        preRenderContext.clearRect(0, 0, Clone.canvas.width, Clone.canvas.height);

        preRenderContext.fillStyle = (this.isClone) ? '#27C' : '#444';
        preRenderContext.fillRect(this.coords.x - (this.width / 2), this.coords.y - (this.height / 2), this.width, this.height);

        if (expiryTime) {
            preRenderContext.font = 'bold 20px sans-serif';
            preRenderContext.textBaseline = 'middle';
            preRenderContext.textAlign = 'center';
            preRenderContext.fillStyle = '#FFF';
            preRenderContext.fillText(this.expiresIn(), this.coords.x, this.coords.y);
        }

        context.drawImage(preRenderCanvas, 0, 0);
    };

};
