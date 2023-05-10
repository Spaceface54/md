class gamescene extends Phaser.Scene{
    constructor(){
        super("gamescene");
        this.mousehold = false;
        this.mouseholdcounter = 0;
        this.messagelist = ["Love You!", "You are my best mom!", "#1 MOM"]
        for( let i  = 0; i<this.messagelist.length; i++){
            this.messagelist[i] = this.messagelist[i]+"\n❤️";
        }
        this.holdx = 0;
        this.holdy = 0;
        this.holdmessage;
        this.timerevent;
    }
    preload(){
        this.load.path ="./assets/";
        this.load.image("letter", "tempbackground.png");
        this.load.image("tap", "tapimg.png");
    }
    create(){
        //this.scale.startFullscreen();
        let w = this.game.config.width;
        let h = this.game.config.height;
        let lt = this.add.image(w*0.5, h*0.5, "letter");
        lt.setScale(1/2.8, 1/3.4);
        let tap = this.add.image(w*0.5, h*0.5, "tap");
        tap.setScale(1/2.8, 1/3.4);
        tap.setInteractive();
        lt.setInteractive();
        this.tweens.add({
            targets: tap,
            angle: {from: -15, to: 15},
            duration: 1000,
            repeat: -1,
            yoyo: true
        });

        tap.on('pointerdown', (pointer) =>{
            this.displaymessage(this, pointer.downX, pointer.downY, "Thanks! \nTap some more! \nYou can also drag!");
            tap.destroy();
        })
        lt.on('pointerdown', (pointer) =>{
            this.displaymessage(this, pointer.downX, pointer.downY, this.messagelist[Math.floor(Math.random()*this.messagelist.length)]);
            this.mousehold = true;
            if(this.timerevent != undefined){
                this.time.removeEvent(this.timerevent);
            }
            this.holdsignal = true;
            this.timerevent = this.time.addEvent({
                delay: 500,
                loop: false,
                callback: () =>{
                    console.log("callback!");
                    if(this.mousehold){
                        this.mouseholdcounter = 1;
                        this.holdx = pointer.downX;
                        this.holdy = pointer.downY;
                        this.holdsignal = false;
                    }
                }
            });
        })
        let counter = 0;
        lt.on('pointermove', (pointer) =>{
            if(counter >=10){
                this.mousehold = false;
                this.displaymessage(this, pointer.x, pointer.y, this.messagelist[Math.floor(Math.random()*this.messagelist.length)]);
                counter = 0;
            }
            else{
                counter ++;
            }
        })
        lt.on("pointerup", (pointer) =>{
            this.mousehold = false;
        })
    }
    update(){
        if(this.mouseholdcounter != 0 && this.mousehold == false){
            console.log("making!!!");
            this.mouseholdcounter = 0;
            let message = this.holdmessage;
            this.tweens.add({
                targets: message,
                y: `-=${2 * this.game.config.height*0.1}`,
                alpha: { from: 1, to: 0 },
                duration: 3000,
                onComplete: () => message.destroy()
            });
        }
        if(this.mouseholdcounter != 0 && this.mousehold){
            if(this.mouseholdcounter == 1){
                this.holdmessage = this.add.text(this.holdx, this.holdy, this.messagelist[Math.floor(Math.random()*this.messagelist.length)], {align: "center"});
                this.holdmessage.setOrigin(0.5, 0.5);
                let rgb = this.colorvaluegen(this.holdx, this.holdy);
                this.holdmessage.setTint(Phaser.Display.Color.GetColor(rgb[0], rgb[1], rgb[2]))
            }
            this.mouseholdcounter++;
            this.holdmessage.setScale((4/(500/this.mouseholdcounter))+1);
        }
    }
    colorvaluegen(x = 0, y = 0){
        let w = this.game.config.width;
        let h = this.game.config.height;
        let rgb = [3];
        rgb[0] = 255;
        rgb[1] = Math.abs((255/((w/x)))-(127.5/(h/y)));
        rgb[2] = Math.abs((255/((h/y)))-(127.5/(w/x)));
        return rgb;
    }

    displaymessage(obj, x = 0, y = 0, messagetext = ""){
        let h = this.game.config.height;
        let xoffset = 20;
        let yoffset = 20;
        let rgb = this.colorvaluegen(x, y);
        let message = obj.add.text(x, y, messagetext, {align: "center"});
        //console.log(Phaser.Display.Color.GetColor(rgb[0], rgb[1], rgb[2]));
        message.setTint(Phaser.Display.Color.GetColor(rgb[0], rgb[1], rgb[2]));
        message.setOrigin(0.5, 0.5);
        obj.tweens.add({
            targets: message,
            y: `-=${2 * h*0.1}`,
            alpha: { from: 1, to: 0 },
            duration: 3000,
            onComplete: () => message.destroy()
        });
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1170/2.8,
    height: 2532/3.4,
    backgroundColor: 0x000000,
    scene: [gamescene],
}

let game = new Phaser.Game(config);