class gamescene extends Phaser.Scene{
    constructor(){
        super("gamescene");
    }
    preload(){
        this.load.path ="./assets/";
        this.load.image("letter", "tempbackground.png");
        this.load.image("tap", "tapimg.png");
    }
    create(){
        //this.scale.startFullscreen();
        let messagelist = ["Love You!", "You are my best mom!", "#1 MOM"]
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
        tap.on('pointerdown', () =>{
            tap.destroy();
        })
        lt.on('pointerdown', (pointer) =>{
            let xoffset = 20;
            let yoffset = 20;
            let x = pointer.downX;
            let y = pointer.downY;
            let message = this.add.text(x, y, messagelist[Math.floor(Math.random()*messagelist.length)]);
            console.log(Phaser.Display.Color.GetColor(255/(w/(x+xoffset)), 255/(h/y), 255/((w*h)/(x*y))));
            message.setTint(Phaser.Display.Color.GetColor(255/(w/(x+xoffset)), 255/(h/(y+yoffset)), 255/((w+h)/(x+y))));
            message.setOrigin(0.5, 0.5);
            this.tweens.add({
                targets: message,
                y: `-=${2 * h*0.1}`,
                alpha: { from: 1, to: 0 },
                duration: 2000,
                onComplete: () => message.destroy()
            });

        })
    }
    update(){

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