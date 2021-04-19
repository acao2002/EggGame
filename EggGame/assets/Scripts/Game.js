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
        },
        camera: {
            default: null,
            type: cc.Node
        },
        button: {
            default: null,
            type: cc.Node
        },
        finalscore: {
            default: null,
            type: cc.Label
        }
    },

    // spawn a new egg object on the screen
    spawnegg: function (n){

        var newEgg = cc.instantiate(this.egg);
        this.node.addChild(newEgg);
        newEgg.string = n;
        newEgg.setPosition((Math.random()-0.5)*1500, (Math.random()-0.5)*1200);
        newEgg.color = new cc.Color(Math.random()*255,Math.random()*255, Math.random()*255);
        newEgg.getComponent('egg').game = this;
        this.egglist.push(newEgg);
    },

    //spawn N number of eggs as specified by the constant 

    initiateEgg: function(){
        for (var x = 0; x< this.Eggnum; x++){
            this.spawnegg(x)
        }
    },

    
    //spawn a remote player

    spawnPlayer: function (){
        var newplayer = cc.instantiate(this.remoteplayer);
        newplayer.getComponent('remoteplayer').game = this;
        newplayer.setPosition(0,-0);
        newplayer.name = this.makeid(6);
        this.node.addChild(newplayer);
        this.remotelist.push(newplayer);
        newplayer.point = 0;
    },

    // spawn N numbers of remote player as specified by the constant
    initiatePlayer: function () {
        for (var x = 0; x< this.remoteNum; x++){
            this.spawnPlayer();
        }
    },

    // assign a random name to the remote player

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

    // update the leaderboard based on the number of eggs each player collected. This method is called within the server method CollectEgg(check mainplayer.js and remoteplayer.js)

    updateleaderboardlabel(list){
        var result ="LEADERBOARD:\n";
        for(var i = 0; i< (Math.min(this.remoteNum+1, 6)); i++){
            var thisplayer = list[i][0];  
            var point = list[i][1];   
            var place = "\n"+ (i+1).toString() +". " + thisplayer+": " + point +" eggs";
            result+= place;  
        }

        return result;
    },

    initializeleaderboard(){
        var result ="LEADERBOARD:\n";
        for(var i = 0; i< Math.min(this.remoteNum+1, 6); i++){
            var thisplayer = this.remotelist[i].name;  
            var point = 0;   
            var place = "\n"+ (i+1).toString() +". "+ thisplayer+": " + point +" eggs";
            result+= place;  
        }

        return result;
    },

    onLoad: function() {

        this.button.active =false;
        this.egglist = [];
        this.remotelist =[];
        this.initiateEgg();
        this.initiatePlayer();
        this.mainplayer.getComponent('mainplayer').game = this;
        this.remotelist.push(this.mainplayer);
        this.mainplayer.name = "you";
        this.mainplayer.point =0;
        this.leaderboard.string = this.initializeleaderboard();
        this.finalscore.enabled = false;

        
    },

    start () {

    },
    //update point whenever collect egg. Called within the server method(check mainplayer.js and remoteplayer.js)
    updatepoint(player) {
        player.point+=1;
    },

    //update the order of players based on there eggs collected. 
    //return a sorted list of players 
    //called in updateleaderboardlabel method

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

    /* This method put together the server update function(CollectEgg) of each player into a method that checks the eggs all player collected and regulate eggs 
    spawning at the same time. 
    This method is called within the server Node(check server.js) to update the state of the game on a random interval */


    updateCollectEgg(){
        for (var i = 0; i<this.remoteNum+1; i++){
            if (this.remotelist[i].name == "you") {
                this.mainplayer.getComponent('mainplayer').collectEgg(this.egglist, this.Eggnum);
            }
            else {
                this.remotelist[i].getComponent('remoteplayer').collectEgg(this.egglist, this.Eggnum);
            }
        }
    },


    //show the result when game is over 
    
    gameOver(){
        for (var i = 0; i<this.remoteNum+1; i++){
            this.remotelist[i].active = false; 
        }
        for (var k = 0; k<this.Eggnum; k++){
            this.egglist[k].active = false; 
        }
        this.timelabel.string = "";
        this.camera.setPosition(0,0);
     
        this.button.active = true;
        this.finalscore.enabled = true;
        this.leaderboard.enabled = false;
    },

    update: function(dt) {
        this.finalscore.string = this.leaderboard.string;
        if (this.timer > 0){
            this.timer -= dt;
            this.timelabel.string = "Time: "+ this.timer.toFixed(0);
        }
        if (this.timer < 0){
            this.gameOver();
        }
       
 
    },
});
