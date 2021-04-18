// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        if (this.time > this.delay){
            this.time = 0;
            this.delay = this.delay = Math.floor(Math.random()*5)/10;
            console.log(this.delay);
            this.Game.getComponent('Game').updateCollectEgg();
        }
    },
});
