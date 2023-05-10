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

        function colorvaluegen(x = 0, y = 0){
            let rgb = [3];
            rgb[0] = 255;
            rgb[1] = Math.abs((255/((w/x)))-(127.5/(h/y)));
            rgb[2] = Math.abs((255/((h/y)))-(127.5/(w/x)));
            return rgb;
        }

        function displaymessage(obj, x = 0, y = 0, messagetext = ""){
            let xoffset = 20;
            let yoffset = 20;
            let rgb = colorvaluegen(x, y);
            let message = obj.add.text(x, y, messagetext);
            console.log(Phaser.Display.Color.GetColor(rgb[0], rgb[1], rgb[2]));
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

        tap.on('pointerdown', (pointer) =>{
            displaymessage(this, pointer.downX, pointer.downY, "Thanks! \nTap some more! \nYou can also drag!");
            tap.destroy();
        })
        lt.on('pointerdown', (pointer) =>{
            displaymessage(this, pointer.downX, pointer.downY, messagelist[Math.floor(Math.random()*messagelist.length)]);
        })
        let counter = 0;
        lt.on('pointermove', (pointer) =>{
            if(counter >=10){
                displaymessage(this, pointer.x, pointer.y, messagelist[Math.floor(Math.random()*messagelist.length)]);
                counter = 0;
            }
            else{
                counter ++;
            }
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