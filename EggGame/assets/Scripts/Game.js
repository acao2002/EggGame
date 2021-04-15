// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        Eggnum: 0,
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

    spawnegg: function (n){

        var newEgg = cc.instantiate(this.egg);
        this.node.addChild(newEgg);
        newEgg.string = n;
        newEgg.setPosition((Math.random()-0.5)*1200, (Math.random()-0.5)*1000);
        newEgg.getComponent('egg').game = this;
        this.egglist.push(newEgg);
    },

    initiateEgg: function(){
        for (var x = 0; x< this.Eggnum; x++){
            this.spawnegg(x)
        }
    },

    initiatePlayer: function (){
        var newplayer = cc.instantiate(this.remoteplayer);
        newplayer.getComponent('remoteplayer').game = this;
        newplayer.setPosition(0,0);
        this.node.addChild(newplayer);
    },

    onLoad: function() {
        this.egglist = [];
        this.initiateEgg();
        this.initiatePlayer();
        this.mainplayer.getComponent('mainplayer').game = this;
        
    },

    start () {

    },

    update: function(dt) {
 
    },
});
