// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({

    extends: cc.Component,
    properties: {
        timer: 0,
        Eggnum: 0,
        remoteNum: 0,
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
        },
        timelabel: {
            default: null,
            type: cc.Label
        },

        leaderboard: {
            default: null,
            type: cc.Label
        }
    },

    spawnegg: function (n){

        var newEgg = cc.instantiate(this.egg);
        this.node.addChild(newEgg);
        newEgg.string = n;
        newEgg.setPosition((Math.random()-0.5)*1500, (Math.random()-0.5)*1200);
        newEgg.color = new cc.Color(Math.random()*255,Math.random()*255, Math.random()*255);
        newEgg.getComponent('egg').game = this;
        this.egglist.push(newEgg);
    },

    initiateEgg: function(){
        for (var x = 0; x< this.Eggnum; x++){
            this.spawnegg(x)
        }
    },

    spawnPlayer: function (){
        var newplayer = cc.instantiate(this.remoteplayer);
        newplayer.getComponent('remoteplayer').game = this;
        newplayer.setPosition(0,-0);
        newplayer.name = this.makeid(6);
        this.node.addChild(newplayer);
        this.remotelist.push(newplayer);
        newplayer.point = 0;
    },

    initiatePlayer: function () {
        for (var x = 0; x< this.remoteNum; x++){
            this.spawnPlayer();
        }
    },

    makeid(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * 
     charactersLength)));
       }
       return result.join('');
    },

    updateleaderboardlabel(list){
        var result ="LEADERBOARD:\n";
        for(var i = 0; i< (Math.min(this.remoteNum+1, 6)); i++){
            var thisplayer = list[i][0];  
            var point = list[i][1];   
            var place = "\n"+ thisplayer+": " + point +" eggs";
            result+= place;  
        }

        return result;
    },

    initializeleaderboard(){
        var result ="LEADERBOARD:\n";
        for(var i = 0; i< Math.min(this.remoteNum+1, 6); i++){
            var thisplayer = this.remotelist[i].name;  
            var point = 0;   
            var place = "\n"+ thisplayer+": " + point +" eggs";
            result+= place;  
        }

        return result;
    },

    onLoad: function() {
        
        this.egglist = [];
        this.remotelist =[];
        this.initiateEgg();
        this.initiatePlayer();
        this.mainplayer.getComponent('mainplayer').game = this;
        this.remotelist.push(this.mainplayer);
        this.mainplayer.name = "you";
        this.mainplayer.point =0;
        this.leaderboard.string = this.initializeleaderboard();
        
    },

    start () {

    },

    updatepoint(player) {
        player.point+=1;
    },

    updateleaderboard(){
        var sortlist = [];
        for (var i = 0; i<this.remoteNum+1; i++){
            sortlist.push([this.remotelist[i].name, this.remotelist[i].point]);
        }
        sortlist.sort(function(a, b) {
            return b[1] - a[1];
        });

        return sortlist
    },


    update: function(dt) {
        this.timer -= dt;
        this.timelabel.string = "Time: "+ this.timer.toFixed(0);
        if (this.timer < 0){
            cc.director.pause();
        }
 
    },
});
