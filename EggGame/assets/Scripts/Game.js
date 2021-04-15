// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        mainplayer: {
            default: null,
            type: cc.Node,
        },
        remoteplayer: {
            default: null,
            type: cc.Prefab
        },
        egg: {
            default: null,
            type: cc.Prefab
        }
    },

    spawnegg: function (x,y){

        var newEgg = cc.instantiate(this.egg);
        this.node.addChild(newEgg);
        newEgg.setPosition(x,y);
        newEgg.getComponent('egg').game = this;
        this.egg1 = newEgg;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {

        this.spawnegg(0,0);
        this.mainplayer.getComponent('mainplayer').game = this;
    },

    start () {

    },

    update (dt) {},
});
