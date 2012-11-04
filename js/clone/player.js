Clone.Player = function(gs) {

    // Blobs that the player is currently controlling
    var blobs = [];

    // Maximum number of blobs the player can control
    var maxBlobs = 2;

    var addBlob = function(blob) {
        blobs.push(blob);
        gs.addEntity(blob);
    };

    this.init = function(gs) {
        addBlob(new Clone.Blob(gs));
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
                gs.delEntity(blob);
            }
        });
    };

    this.draw = function(context, gs) {
        this.allBlobs(function(blob) {
            blob.draw(context, gs);
        });

        this.drawDebugInfo();
    };

    this.drawDebugInfo = function() {
        var debugInfo = [];

        this.allBlobs(function(blob, index) {
            debugInfo.push('Blob [' + index + ']');
            debugInfo.push('Coords: [' + blob.coords.x + ', ' + blob.coords.y + ']');
            debugInfo.push('Velocity: [' + blob.velocity.x + ', ' + blob.velocity.y + ']');
        });

        $('#playerDebug').html(debugInfo.join('<br>'));
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

            addBlob(clonedBlob);

            clonedBlob.coords.x += blob.width;
            clonedBlob.coords.y = blob.coords.y;
        });
    };

    // Space bar
    this.keyUp_32 = function() {
        this.allBlobs(function(blob) {
            blob.shoot();
        });
    };

    // Left / w
    this.keyHeld_37 = this.keyHeld_65 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.x = -blob.moveSpeed;
        });
    };

    // Right / d
    this.keyHeld_39 = this.keyHeld_68 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.x = blob.moveSpeed;
        });
    };

    // Up / w
    this.keyHeld_38 = this.keyHeld_87 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.y = -blob.moveSpeed;
        });
    };

    // Down / s
    this.keyHeld_40 = this.keyHeld_83 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.y = blob.moveSpeed;
        });
    };

    // keyUp event for horizontal movement
    this.keyUp_37 = this.keyUp_65 = this.keyUp_39 = this.keyUp_68 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.x = 0;
        });
    };

    // keyUp event for vertical movement
    this.keyUp_38 = this.keyUp_87 = this.keyUp_40 = this.keyUp_83 = function() {
        this.allBlobs(function(blob) {
            blob.velocity.y = 0;
        });
    };

};
