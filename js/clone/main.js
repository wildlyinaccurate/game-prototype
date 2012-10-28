window.Clone = function() {

    return {

        start: function() {
            var gs = new JSGameSoup('clone', 30);

            gs.addEntity(new Clone.Player(gs));

            gs.launch();
        }

    };

}();
