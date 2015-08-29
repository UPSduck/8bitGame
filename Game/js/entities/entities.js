
/************************************************************************************/
/*                                                                                  */
/*        a player entity                                                           */
/*                                                                                  */
/************************************************************************************/
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // disable gravity
        this.body.gravity = 0;

        // walking speed
        this.body.setVelocity(2, 2);

        // set the display around our position
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
        
        this.alwaysUpdate = true;
        
        
        //define animation
        this.renderable.addAnimation('stand',[0,1]);
        this.renderable.addAnimation('walkf',[4,5]);
        this.renderable.addAnimation('walkb',[6,7]);
        this.renderable.addAnimation('walkl',[14,15]);
        this.renderable.addAnimation('walkr',[12,13]);
        
        //set default animation
        this.renderable.setCurrentAnimation('stand');


    },

    /* -----

        update the player pos

    ------            */
    update : function (dt) {

        if (me.input.isKeyPressed('left')) {
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walkl')) {
            	this.renderable.setCurrentAnimation('walkl');}
            	         	
        } else if (me.input.isKeyPressed('right')) {
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walkr')) {
            	this.renderable.setCurrentAnimation('walkr');}
            	
        } else if (me.input.isKeyPressed('up')) {
            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walkb')) {
            	this.renderable.setCurrentAnimation('walkb');}
            	
        } else if (me.input.isKeyPressed('down')) {
            // update the entity velocity
            this.body.vel.y += this.body.accel.y * me.timer.tick;
                if (!this.renderable.isCurrentAnimation('walkf')) {
            	this.renderable.setCurrentAnimation('walkf');}
            	
        } else {
            this.body.vel.y = 0;
            this.body.vel.x = 0;
            this.renderable.setCurrentAnimation('stand');
        }

        // check for collision with environment
        this.body.update(dt);
        me.collision.check(this);

    	return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  	},

    onCollision : function () {
        return true;
    }
});
