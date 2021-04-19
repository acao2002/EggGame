// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        pickRadius: 0, // distance to pickup collect egg signal
        speed: 0,
        maxx: 0,
        minx:0,
        maxy: 0,
        miny: 0,
    },

    onKeyD (event) {
        // Set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.d:
                this.directionx = 1;
                break;
            case cc.macro.KEY.a:
                this.directionx = -1;

                break;
            case cc.macro.KEY.w:
                    this.directiony = 1;
                    break;
            case cc.macro.KEY.s:
                    this.directiony = -1;
                    break;
        }
    },

    onKeyU (event) {
        // Unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.directionx = 0;

                break;
            case cc.macro.KEY.d:
                this.directionx = 0;
                break;
            case cc.macro.KEY.w:
                this.directiony = 0;
                break;
            case cc.macro.KEY.s:
                this.directiony = 0;
                break;
        }
    },

    onDestroy () {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyD, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyU, this);
    },
    
    //get distance between an egg and the player
    getDistance: function (egg) {
        // Determine the distance according to the position of the Player node
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

                },0.3);
                egglist[i].destroy();
                egglist.splice(i,1);
                this.game.spawnegg();
                collected = true;
                this.game.leaderboard.string = this.game.updateleaderboardlabel(this.game.updateleaderboard());
                this.game.updatepoint(this.node);
               
               
            }
            
            else 
            if (this.getDistance(egglist[i])< this.pickRadius) {
                egglist[i].destroy();
                egglist.splice(i,1);
                this.game.spawnegg();
                collected = true;
                this.game.leaderboard.string = this.game.updateleaderboardlabel(this.game.updateleaderboard());
                this.game.updatepoint(this.node);
            }
        }
    
    

        return collected;
    },


    onLoad: function() {

        this.name ='you';
        this.directionx = 0;
        this.directiony = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyD, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyU, this);
    },

    start () {

    },

    update: function(dt) {
        //player movement and boundaries

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
