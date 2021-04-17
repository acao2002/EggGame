// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        pickRadius: 0,
        speed: 0,
        maxx: 0,
        minx:0,
        maxy: 0,
        miny: 0,
    },

    getDistance: function (egg) {
        // Determine the distance according to the position of the Player node
        var playerPos = this.node.getPosition();

        // Calculate the distance between two nodes according to their positions
        var dist = egg.position.sub(playerPos).mag();

        return dist;
    },

    collectEgg: function(egglist, n) {
        var collected = false;
        for (var i = 0; i<n; i++){

            if (this.getDistance(egglist[i])< this.pickRadius) {
                egglist[i].destroy();
                egglist.splice(i,1);
                this.game.spawnegg();
                this.index = Math.floor(Math.random()*this.game.Eggnum);
                collected =true;
                this.game.leaderboard.string = this.game.updateleaderboardlabel(this.game.updateleaderboard());
            }
        }
        return collected;
        
    },

    findEgg: function(egg) {

        var eggx = egg.x;
        var eggy = egg.y;
        if (this.node.x < (eggx-5)){
            this.right();
        }
        if (this.node.x > (eggx+5)) {
            this.left();
        }

        
        if(this.node.y > (eggy+5)){
                this.down();
            }
        if(this.node.y < (eggy-5)){
                this.up();
            }
    },

    onLoad: function() {
        this.timer = 0;
        this.directionx = 0;
        this.directiony = 0;
        this.index = Math.floor(Math.random()*this.game.Eggnum);
       
    },


    start () {

    },

    right: function(){
        this.directionx = 1;
        this.directiony = 0;
    },
    left: function(){
        this.directionx = -1;
        this.directiony = 0;
    },
    up: function(){
        this.directionx = 0;
        this.directiony = 1;
    },
    down: function(){
        this.directionx = 0;
        this.directiony = -1;
    },
    stop: function(){
        this.directionx = 0;
        this.directiony = 0;
    },

    update: function(dt) {
        //this.game.eventchange = this.collectEgg(this.game.egglist, this.game.Eggnum) || this.game.mainplayer.getComponent('mainplayer').collectEgg(this.game.egglist,this.game.Eggnum);
        
        this.findEgg(this.game.egglist[this.index]);
        this.timer += dt;
        this.node.x += this.directionx*this.speed;
        this.node.y += this.directiony*this.speed;
        if (this.node.y > this.maxy){
            this.node.y = this.maxy
        }
        if (this.node.y < this.miny) {
            this.node.y = this.miny
        }
        if (this.node.x > this.maxx){
            this.node.x = this.maxx
        }
        if (this.node.x < this.minx) {
            this.node.x = this.minx
        }
    },
});
