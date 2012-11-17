window.Clone = function() {

    return {

        gs: {},

        FPS: 30,

        canvas: {
            width: $('#clone').width(),
            height: $('#clone').height()
        },

        start: function() {
            this.gs = new JSGameSoup('clone', this.FPS);

            this.gs.addEntity(new Clone.Player(this.gs));
            this.gs.launch();
        }

    };

}();
