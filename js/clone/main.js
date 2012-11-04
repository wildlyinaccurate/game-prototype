window.Clone = function() {

    return {

        FPS: 30,

        canvas: {
            width: $('#clone').width(),
            height: $('#clone').height(),
        },

        start: function() {
            var gs = new JSGameSoup('clone', this.FPS);

            gs.addEntity(new Clone.Player(gs));
            gs.launch();
        }

    };

}();
