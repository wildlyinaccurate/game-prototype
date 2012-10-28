Clone.Player = function(gs) {

    var blobs = [];

    var maxBlobs = 2;

    this.init = function(gs) {
        blobs.push(new Clone.Blob(gs));
    };

    this.allBlobs = function(callback) {
        var i = blobs.length;

        while (i--) {
            callback(blobs[i], i);
        }
    };

    this.update = function(gs) {
        this.allBlobs(function(blob, index) {
            if (blob.expiresIn() <= 0) {
                blobs.splice(index, 1);
            }

            blob.update(gs);
        });
    };

    this.draw = function(context, gs) {
        this.allBlobs(function(blob) {
            blob.draw(context, gs);
        });
    };

    // Clone all of the blobs
    // Left Control
    this.keyUp_17 = function() {
        if (blobs.length >= maxBlobs) {
            return;
        }

        this.allBlobs(function(blob) {
            var clonedBlob = new Clone.Blob(gs);

            blob.coords.x -= blob.width;

            clonedBlob.isClone = true;
            clonedBlob.expiresIn(10);
            clonedBlob.coords.x += blob.width;

            blobs.push(clonedBlob);

            clonedBlob.coords.y = blob.coords.y;
        });
    };

    // Space bar
    this.keyUp_32 = function() {
        this.allBlobs(function(blob) {
            blob.shoot();
        });
    };

    this.keyUp_13 = function() {
        console.log(blobs);
    };

    // Left / w
    this.keyHeld_37 = this.keyHeld_65 = function() {
        this.allBlobs(function(blob) {
            blob.coords.x -= blob.moveSpeed;
        });
    };

    // Right / d
    this.keyHeld_39 = this.keyHeld_68 = function() {
        this.allBlobs(function(blob) {
            blob.coords.x += blob.moveSpeed;
        });
    };

    // Up / w
    this.keyHeld_38 = this.keyHeld_87 = function() {
        this.allBlobs(function(blob) {
            blob.coords.y -= blob.moveSpeed;
        });
    };

    // Down / s
    this.keyHeld_40 = this.keyHeld_83 = function() {
        this.allBlobs(function(blob) {
            blob.coords.y += blob.moveSpeed;
        });
    };

};
