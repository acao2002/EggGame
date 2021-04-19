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

    //get distance between an egg and the player

    getDistance: function (egg) {
        var playerPos = this.node.getPosition();

        // Calculate the distance between two nodes according to their positions
        var dist = egg.position.sub(playerPos).mag();

        return dist;
    },

     //check if player is touching an egg among the list of existing eggs. If yes then remove the egg and create a new egg in the list and spawn it in a game.
    //this function is called and updated randomly(0.1 to 0.5s) by the server simulator to update whether a player object touches an egg object at the moment and the egg list. 
    /*To handle the random update(0.1s to 0.5s), I included a method to handle the latency: if distance is between pickRadius and pickRaduius +30, then we assume the player is going to hit the egg, calling the updating egg commands after a small delay.
        If the system manage to update quickly enough, then we just check whether its in the pickRadius. If not, we update based on the assumption above.
    */

    collectEgg: function(egglist, n) {
        var collected = false;

        for (var i = 0; i<n; i++){
            
            if (this.getDistance(egglist[i])< (this.pickRadius+30) && this.getDistance(egglist[i])> (this.pickRadius)){
                
                this.scheduleOnce(function(){ 

                },0.4);
                egglist[i].destroy();
                egglist.splice(i,1);
                this.game.spawnegg();
                collected = true;
                this.game.leaderboard.string = this.game.updateleaderboardlabel(this.game.updateleaderboard());
                this.game.updatepoint(this.node);
               
               
            }
            

            if (this.getDistance(egglist[i])< this.pickRadius) {
                egglist[i].destroy();
                egglist.splice(i,1);
                this.game.spawnegg();
                this.index = Math.floor(Math.random()*this.game.Eggnum);
                collected =true;
                this.game.leaderboard.string = this.game.updateleaderboardlabel(this.game.updateleaderboard());
                this.game.updatepoint(this.node);
            }
        }
        return collected;
        
    },

    //AI for remote players to find and collect eggs
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

         //player movement and boundaries
        
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
