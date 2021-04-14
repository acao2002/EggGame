// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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


    onLoad: function() {
        this.directionx = 0;
        this.directiony = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyD, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyU, this);
    },

    start () {

    },

    update: function(dt) {
        this.node.x += this.directionx*this.speed
        this.node.y += this.directiony*this.speed
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
