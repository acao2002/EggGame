
cc.Class({
    extends: cc.Component,

    properties: {
        Game: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.time = 0;
        this.delay = Math.floor(Math.random()*5+1)/10;
    },

    start () {

    },

    update (dt) {
        this.time += dt;

        //update game state every random interval
        if (this.time > this.delay){
            this.time = 0;
            this.delay = this.delay = Math.floor(Math.random()*5)/10;
            this.Game.getComponent('Game').updateCollectEgg();
        }
        
    },
});
