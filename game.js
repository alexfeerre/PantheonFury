class InicioJuego extends Phaser.Scene {
    constructor() {
        super({ key: 'InicioJuego' });
    }

    preload() {
        // Cargar la imagen para el background
        this.load.spritesheet('background', 'assets/FONDO_INICIO.png', { frameWidth: 160, frameHeight: 90 });
        // Cargar la música de fondo
        this.load.audio('INICIOMUSIC', 'audios/INICIOMUSIC.mp3');
        this.load.audio('BUTTONEF1', 'audios/BUTTONEFFECT1.mp3');
        this.load.audio('BUTTONEF2', 'audios/BUTTONEFECT2.mp3');


    }

    create() {
        // Fondo negro para la pantalla de inicio
        this.cameras.main.setBackgroundColor('#000');

        // Calcular la escala para ajustar el fondo al tamaño del canvas
        const scaleX = this.sys.game.canvas.width / 160;
        const scaleY = this.sys.game.canvas.height / 90;
        const scale = Math.max(scaleX, scaleY);

        // Añadir el background y hacer que se reproduzca en bucle
        const background = this.add.sprite(0, 0, 'background').setOrigin(0, 0).setScale(scale);
        this.anims.create({
            key: 'fondo',
            frames: this.anims.generateFrameNumbers('background', { start: 0, end: 32 }),
            frameRate: 15,
            repeat: -1
        });
        background.anims.play('fondo', true);

        // Centrar el fondo en el canvas
        background.setPosition((this.sys.game.canvas.width - background.displayWidth) / 2, (this.sys.game.canvas.height - background.displayHeight) / 2);

        // Reproducir música de fondo en bucle
        this.backgroundMusic = this.sound.add('INICIOMUSIC', { loop: true, volume: 0.3 }); // Volumen reducido a la mitad
        this.backgroundMusic.play();

        // Crear un rectángulo invisible como botón en el centro del canvas
        let startButton = this.add.rectangle(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2) + 102, 240, 45, 0xffffff, 0).setInteractive().setOrigin(0.5);

        // Establecer cursor de puntero al pasar el ratón sobre el botón
        startButton.on('pointerover', () => {
            document.body.style.cursor = 'pointer';
        });
        // Restaurar cursor por defecto al salir del botón
        startButton.on('pointerout', () => {
            document.body.style.cursor = 'default';
        });

        // Hacer clic en el área del botón incluso si no es visible
        startButton.on('pointerdown', () => {
            this.sound.play('BUTTONEF2',{volume: 0.5});
            this.scene.start('Idioma'); // Cambiar a la escena de selección de personaje cuando se presiona el botón
        });
    }

    // Cambiar el cursor a su estado normal cuando se inicia la escena de selección de personaje
    update() {
        this.scene.get('Idioma').events.on('start', () => {
            document.body.style.cursor = 'default';
        });
    }
}


class Idioma extends Phaser.Scene {
    constructor() {
        super({ key: 'Idioma' });
    }

    preload() {
        // Preload del fondo de la escena
        this.load.image('background_idiom', 'assets/idioma.png');

        this.load.image('slideButton', 'assets/slidebutton.png');
        this.load.image('slideButtonHover', 'assets/slidebuttonhover.png');
        this.load.image('slideButtonNext', 'assets/slidebutton.png');
        this.load.image('slideButtonNextHover', 'assets/slidebuttonhover.png');


        
        // Preload de las slides
        this.load.image('slide1', 'assets/1slide.png');
        this.load.image('slide2', 'assets/2slide.png');
        this.load.image('slide3', 'assets/3slide.png');
        this.load.image('slide4', 'assets/4slide.png');
        this.load.image('slide5', 'assets/5slide.png');
        this.load.image('slide6', 'assets/5slide.png');


        // Preload del spritesheet para el fondo animado
        this.load.spritesheet('animatedBackground', 'assets/instrucciones_fondo.png', { frameWidth: 160, frameHeight: 90 });
    }

    create() {
        
        // Centro de la pantalla
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        // Mostrar el fondo de la escena al inicio
        this.add.image(centerX, centerY, 'background_idiom').setDisplaySize(640, 360).setOrigin(0.5);
    
        // Texto de selección de idioma
        const languageText = this.add.text(centerX, centerY - 80, 'Selecciona tu idioma:', { fontFamily: 'Arial', fontSize: 32, color: '#db7125' }).setOrigin(0.5);
    
        // Botón para seleccionar español
        const es = this.add.text(centerX, centerY - 5, 'Español', { fontFamily: 'Arial', fontSize: 24, color: '#db7125' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.selectLanguage('es');
                // Ocultar los botones de selección de idioma al iniciar la presentación de las diapositivas
                languageText.visible = false;
                es.visible = false;
                en.visible = false;
            });
    
        // Botón para seleccionar inglés
        const en = this.add.text(centerX, centerY + 75, 'English', { fontFamily: 'Arial', fontSize: 24, color: '#db7125' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.selectLanguage('en');
                // Ocultar los botones de selección de idioma al iniciar la presentación de las diapositivas
                languageText.visible = false;
                es.visible = false;
                en.visible = false;
            });
            
    
        // Botón para la diapositiva anterior
        this.prevButton = this.add.image(55, 296, 'slideButton').setInteractive().setOrigin(0,0).setDepth(999).setScale(4);
    
       // Botón para la siguiente diapositiva
        this.nextButton = this.add.image(585, 296, 'slideButtonNext').setInteractive().setOrigin(0, 0).setDepth(999).setScale(-4, 4); // Escala negativa en el eje X

        // Asociar eventos a los botones
        this.prevButton.on('pointerdown', () => {
            this.showPrevSlide();
        });
         // Cambiar la imagen del botón prevButton al hacer hover
    this.prevButton.on('pointerover', () => {
        this.prevButton.setTexture('slideButtonHover');
        document.body.style.cursor = 'pointer';
    });
    this.prevButton.on('pointerout', () => {
        this.prevButton.setTexture('slideButton');
        document.body.style.cursor = 'default';
    });

  
        this.nextButton.on('pointerdown', () => {
            this.showNextSlide();
        });
          // Cambiar la imagen del botón nextButton al hacer hover
    this.nextButton.on('pointerover', () => {
        this.nextButton.setTexture('slideButtonNextHover');
        document.body.style.cursor = 'pointer';
    });
    this.nextButton.on('pointerout', () => {
        this.nextButton.setTexture('slideButtonNext');
        document.body.style.cursor = 'default';
    });
    
        this.nextButton.setVisible(false);
        this.prevButton.setVisible(false);

         // Cambiar el cursor al hacer hover sobre los botones de selección de idioma
    es.on('pointerover', () => {
        document.body.style.cursor = 'pointer';
    });
    es.on('pointerout', () => {
        document.body.style.cursor = 'default';
    });

    en.on('pointerover', () => {
        document.body.style.cursor = 'pointer';
    });
    en.on('pointerout', () => {
        document.body.style.cursor = 'default';
    });

   

    }

    selectLanguage(language) {
        // Mostrar los botones "Anterior" y "Siguiente"
        // Mostrar las instrucciones con slides
      
        this.currentSlideIndex = 0;
        this.language = language;
        this.showInstructions(language);
    }

    showInstructions(language) {
        // Mostrar los botones "Anterior" y "Siguiente"
    
        // Mostrar las instrucciones con slides
        this.slides = [
            { image: 'slide1', text: 'Al inicio del juego y tras cada turno, aparecerá un mensaje con la indicación de quién iniciará el turno.' },
            { image: 'slide2', text: 'Cuando sea tu turno, tu botón se iluminará. Púlsalo para comenzar la pregunta.' },
            { image: 'slide3', text: 'Al pulsar el botón, se abrirá un mensaje con la pregunta a responder y cuatro opciones a responder.' },
            { image: 'slide4', text: 'Si pulsas la incorrecta se pasará el turno al otro jugador. Si aciertas tu botón brillará y comenzará el ataque. Al acabar el ataque la vida de tu oponente se reducirá.' },
            { image: 'slide5', text: 'Cada jugador comienza con 5 vidas y ganará aquel jugador que consiga quitar todas las vidas a su oponente.' },
            { image: 'slide6' },

        ];
        this.currentSlideIndex = 0;
        this.language = language;
        this.showSlide(this.slides[this.currentSlideIndex], language);
    }
    
    showSlide(slide, language) {
        this.nextButton.setVisible(true);
        this.prevButton.setVisible(true);
    
        // Calcular la escala para ajustar el fondo al tamaño del canvas
        const scaleX = this.sys.game.canvas.width / 160;
        const scaleY = this.sys.game.canvas.height / 90;
        const scale = Math.max(scaleX, scaleY);
    
        // Añadir el background y hacer que se reproduzca en bucle
        const background = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'animatedBackground').setOrigin(0.5).setScale(scale).setDepth(0);
        this.anims.create({
            key: 'animatedBackground',
            frames: this.anims.generateFrameNumbers('animatedBackground', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        background.anims.play('animatedBackground', true);
    
        // Mostrar la imagen de la diapositiva
        const image = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 40, slide.image).setOrigin(0.5).setScale(2.5); // Centrar la imagen en el canvas
    
        // Mostrar el texto de la diapositiva solo si no es la última slide
        if (this.currentSlideIndex !== this.slides.length - 1) {
            let textToShow = slide.text;
            if (language === 'en') {
                this.translateText(slide.text, language).then(translatedText => {
                    textToShow = translatedText;
                    this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 130, textToShow, { 
                        fontSize: '18px',
                        fill: '#db7125', 
                        fontFamily: 'BMmini',
                        resolution: 1,
                        wordWrap: { width: 422 }
                    }).setOrigin(0.5);
                });
            } else {
                this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 130, textToShow, { 
                    fontSize: '18px',
                    fill: '#db7125', 
                    fontFamily: 'BMmini',
                    resolution: 1,
                    wordWrap: { width: 422 }
                }).setOrigin(0.5);
            }
        }
    
        // Mostrar el botón "Comenzar" solo en la última diapositiva
        if (this.currentSlideIndex === this.slides.length - 1) {
            this.showStartButton();
        }
    }
    
    
    showStartButton() {
        let buttonText = 'Comenzar';
        if (this.language === 'en') {
            buttonText = 'Start';
        }
    
        const originalFontSize = 30;

        this.startButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 40, buttonText, { fontFamily: 'Arial', fontSize: originalFontSize, color: '#db7125' }).setOrigin(0.5).setInteractive();
                this.startButton.on('pointerdown', () => {
                    this.scene.start('SelectorPersonaje', { language: this.language , });
                   
        });
         // Cambiar el cursor al hacer hover sobre el botón "Comenzar"
         this.startButton.on('pointerover', () => {
            this.startButton.setFontSize(originalFontSize + 5); // Aumentar el tamaño de la fuente en 5
            document.body.style.cursor = 'pointer';
        });
    this.startButton.on('pointerout', () => {
        document.body.style.cursor = 'default';
        this.startButton.setFontSize(originalFontSize);

    });
    }
    
    
    showNextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.currentSlideIndex++;
            this.showSlide(this.slides[this.currentSlideIndex], this.language);
        }
    }
    
    showPrevSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.showSlide(this.slides[this.currentSlideIndex], this.language);
        }
    }

    translateText(textToTranslate, targetLanguage) {
        return fetch('https://api.mymemory.translated.net/get?q=' + textToTranslate + '&langpair=es|' + targetLanguage)
            .then(response => response.json())
            .then(data => {
                return data.responseData.translatedText;
            });
    }
}



class SelectorPersonaje extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectorPersonaje' });
          // Variable para rastrear si se ha iniciado la cuenta atrás
          this.countdownStarted = false;
          this.player1Character = null; // Variable para almacenar la elección del jugador 1
          this.player2Character = null; // Variable para almacenar la elección del jugador 2
    
    }
    init(data) {
        // Acceder al idioma seleccionado pasado desde la escena Idioma
        this.language = data.language;
    }

    preload(){
        this.load.audio('BUTTONEF2', 'audios/BUTTONEFECT2.mp3');
        this.load.audio('CHARACTERSELECTED', 'audios/CHARACTERSELECTED.mp3');
        this.load.audio('CHOOSE', 'audios/CHOOSE.mp3');
        this.load.spritesheet('fondoselect', 'assets/FONDOSELECT.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('zeusselect', 'assets/SELECTZEUS.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('hadesselect', 'assets/SELECTHADES.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('poseidonselect', 'assets/SELECTPOSEIDON.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Z_ICON', 'assets/Z_ICON.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('H_ICON', 'assets/H_ICON.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('P_ICON', 'assets/P_ICON.png', { frameWidth: 160, frameHeight: 90 });


    }

    create() {
        this.countdownStarted = false;

        // Ajustar el color del canvas
        this.cameras.main.setBackgroundColor('#0d0600');
    
        // Calcular la escala para ajustar el fondo al tamaño del canvas
        const scaleX = this.sys.game.canvas.width / 160;
        const scaleY = this.sys.game.canvas.height / 90;
        const scale = Math.max(scaleX, scaleY);
    
        // Añadir el background y hacer que se reproduzca en bucle
        const background = this.add.sprite(0, 0, 'fondoselect').setOrigin(0, 0).setScale(scale);
        this.anims.create({
            key: 'fondo2',
            frames: this.anims.generateFrameNumbers('fondoselect', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        background.anims.play('fondo2', true); 
    
        // Añadir la spritesheet Z_ICON al centro del canvas con escala 4 y centrada
        const zIcon = this.add.sprite(this.cameras.main.centerX-37, this.cameras.main.centerY-45, 'Z_ICON').setScale(2).setOrigin(0.5);
        const hIcon = this.add.sprite(this.cameras.main.centerX+ 5 , this.cameras.main.centerY+ 35, 'H_ICON').setScale(2).setOrigin(0.5);
        const pIcon = this.add.sprite(this.cameras.main.centerX +47, this.cameras.main.centerY-45, 'P_ICON').setScale(2).setOrigin(0.5);

        // Crear animaciones para la spritesheet Z_ICON
        this.anims.create({
            key: 'staticz',
            frames: this.anims.generateFrameNumbers('Z_ICON', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'hoverz',
            frames: this.anims.generateFrameNumbers('Z_ICON', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'selectedz',
            frames: this.anims.generateFrameNumbers('Z_ICON', { start: 3, end: 9 }),
            frameRate: 10,
            repeat: 1
        });
         // Crear animaciones para la spritesheet H_ICON
         this.anims.create({
            key: 'statich',
            frames: this.anims.generateFrameNumbers('H_ICON', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'hoverh',
            frames: this.anims.generateFrameNumbers('H_ICON', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'selectedh',
            frames: this.anims.generateFrameNumbers('H_ICON', { start: 3, end: 9 }),
            frameRate: 10,
            repeat: 1
        });
         // Crear animaciones para la spritesheet P_ICON
         this.anims.create({
            key: 'staticp',
            frames: this.anims.generateFrameNumbers('P_ICON', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'hoverp',
            frames: this.anims.generateFrameNumbers('P_ICON', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'selectedp',
            frames: this.anims.generateFrameNumbers('P_ICON', { start: 3, end: 9 }),
            frameRate: 10,
            repeat: 1
        });
    
        // Reproducir las animaciones en bucle
        zIcon.anims.play('staticz', true);
        hIcon.anims.play('statich', true);
        pIcon.anims.play('staticp', true);
     
        this.sound.play('CHOOSE',{volume: 0.5});
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
    
        // Fondo negro para la pantalla de selección de personajes
        // this.cameras.main.setBackgroundColor('#000'); // No es necesario ya que el color del canvas se establece al inicio
    
        // Texto de turno de elección para el jugador 1
        let turnTextKey = this.language === 'en' ? 'PLAYER 1 CHOOSE' : 'JUGADOR 1 ELIGE';
        this.turnText = this.add.text(screenWidth / 2, screenHeight * 0.1, turnTextKey, { 
            fontSize: '20px',
            fill: '#db7125', 
            fontFamily: 'BMmini',
            resolution: 1
        }).setOrigin(0.5);

    
    
        // Variable para almacenar la elección de cada jugador
        this.p1 = null;
        this.p2 = null;
    
// Crear botones cuadrados en las posiciones aleatorias con ancho y alto de 50 unidades
this.button1 = this.add.rectangle(this.cameras.main.centerX-43, this.cameras.main.centerY-45, 75, 75, 0xffffff, 0).setInteractive().setOrigin(0.5).setAlpha(0.6);
this.button2 = this.add.rectangle(this.cameras.main.centerX+40, this.cameras.main.centerY-45, 75, 75, 0xffffff, 0).setInteractive().setOrigin(0.5).setAlpha(0.6);
this.button3 = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY+34, 75, 75, 0xffffff, 0).setInteractive().setOrigin(0.5).setAlpha(0.6);

// Variables para rastrear el estado de los botones
let button1Pressed = false;
let button2Pressed = false;
let button3Pressed = false;

// Variable para contar el número de botones pulsados
let buttonsPressedCount = 0;

// Eventos de clic para los botones de selección de personajes
this.button1.on('pointerdown', () => {
    if (!button1Pressed && buttonsPressedCount < 2) {
        this.selectCharacter('Zeus');
        zIcon.anims.play('selectedz');
        button1Pressed = true;
        zIcon.on('animationcomplete', () => {
            zIcon.setAlpha(0.5); 
        });
        document.body.style.cursor = 'default';
        buttonsPressedCount++;
        if (buttonsPressedCount === 2) {
            this.button2.disableInteractive(); // Deshabilitar el segundo botón si ya se han pulsado dos
            this.button3.disableInteractive(); // Deshabilitar el tercer botón si ya se han pulsado dos
        }
    }
});
this.button2.on('pointerdown', () => {
    if (!button2Pressed && buttonsPressedCount < 2) {
        this.selectCharacter('Poseidon');
        pIcon.anims.play('selectedp');
        button2Pressed = true;
        pIcon.on('animationcomplete', () => {
            pIcon.setAlpha(0.5); 
        });
        document.body.style.cursor = 'default';
        buttonsPressedCount++;
        if (buttonsPressedCount === 2) {
            this.button1.disableInteractive(); // Deshabilitar el primer botón si ya se han pulsado dos
            this.button3.disableInteractive(); // Deshabilitar el tercer botón si ya se han pulsado dos
        }
    }
});
this.button3.on('pointerdown', () => {
    if (!button3Pressed && buttonsPressedCount < 2) {
        this.selectCharacter('Hades');
        hIcon.anims.play('selectedh');
        button3Pressed = true;
        hIcon.on('animationcomplete', () => {
            hIcon.setAlpha(0.5); 
        });
        document.body.style.cursor = 'default';
        buttonsPressedCount++;
        if (buttonsPressedCount === 2) {
            this.button1.disableInteractive(); // Deshabilitar el primer botón si ya se han pulsado dos
            this.button2.disableInteractive(); // Deshabilitar el segundo botón si ya se han pulsado dos
        }
    }
});

// Cambiar el cursor a pointer cuando se hace hover sobre los botones
this.button1.on('pointerover', () => {
    if (!button1Pressed && buttonsPressedCount < 2) {
        zIcon.anims.play('hoverz', true);
        document.body.style.cursor = 'pointer';
    }
});
this.button2.on('pointerover', () => {
    if (!button2Pressed && buttonsPressedCount < 2) {
        pIcon.anims.play('hoverp', true);
        document.body.style.cursor = 'pointer';
    }
});
this.button3.on('pointerover', () => {
    if (!button3Pressed && buttonsPressedCount < 2) {
        hIcon.anims.play('hoverh', true);
        document.body.style.cursor = 'pointer';
    }
});

// Volver a la animación estática al dejar de hacer hover sobre los botones
this.button1.on('pointerout', () => {
    if (!button1Pressed && buttonsPressedCount < 2) {
        zIcon.anims.play('staticz');
        document.body.style.cursor = 'default';
    }
});
this.button2.on('pointerout', () => {
    if (!button2Pressed && buttonsPressedCount < 2) {
        pIcon.anims.play('staticp');
        document.body.style.cursor = 'default';
    }
});
this.button3.on('pointerout', () => {
    if (!button3Pressed && buttonsPressedCount < 2) {
        hIcon.anims.play('statich');
        document.body.style.cursor = 'default';
    }
});

 

    }
    
    selectCharacter(character) {
        if (!this.p1) {
            this.p1 = character;
            this.player1Character = character; 
            this.sound.play('CHARACTERSELECTED');
            this.playCharacterAnimation(character, false);
            this.nextPlayerTurn();
        } else if (!this.p2) {
            if (this.p1 !== character) {
                this.p2 = character;
                this.player2Character = character;
                this.sound.play('CHARACTERSELECTED');
                this.playCharacterAnimation(character, true);
                this.nextPlayerTurn();
            } else {
                let errorMessageKey = this.language === 'en' ? 'THIS CHARACTER HAS ALREADY BEEN CHOSEN' : 'ESTE PERSONAJE YA SE HA ELEGIDO';
                this.turnText.setText(errorMessageKey);
            }
        }
    }
    
    
    playIdleAnimation(character, flipX) {
        
        let idleAnimationKey = '';
        let frameNumbers = [];
        switch (character) {
            case 'Zeus':
                idleAnimationKey = 'idleZeus';
                frameNumbers = this.anims.generateFrameNumbers('zeusselect', { start: 9, end: 19 });
                break;
            case 'Poseidon':
                idleAnimationKey = 'idlePoseidon';
                frameNumbers = this.anims.generateFrameNumbers('poseidonselect', { start: 9, end: 20 });
                break;
            case 'Hades':
                idleAnimationKey = 'idleHades';
                frameNumbers = this.anims.generateFrameNumbers('hadesselect', { start: 13, end: 20 });
                break;
        }
    
        const animationConfig = {
            key: idleAnimationKey,
            frames: frameNumbers,
            frameRate:10,
            repeat: -1
        };
    
        this.anims.create(animationConfig);
    
        const characterSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY+20, character).setScale(4).setOrigin(0.5);
    
        if (flipX) {
            characterSprite.flipX = true;
        }
    
        characterSprite.on('animationcomplete', () => {
            this.playIdleAnimation(character, flipX);
        });
    
        characterSprite.anims.play(idleAnimationKey, true);
    }
    
    nextPlayerTurn() {
        if (!this.p1) {
            let player1TextKey = this.language === 'en' ? 'PLAYER 1 CHOOSE' : 'JUGADOR 1 ELIGE';
            this.turnText.setText(player1TextKey);
        } else if (!this.p2) {
            let player2TextKey = this.language === 'en' ? 'PLAYER 2 CHOOSE' : 'JUGADOR 2 ELIGE';
            this.turnText.setText(player2TextKey);
        } else {
            console.log('Player 1 has chosen: ' + this.p1);
            console.log('Player 2 has chosen: ' + this.p2);
    
            // Habilitar botones de selección
            this.enableCharacterSelectionButtons();
    
            // Mostrar mensaje de ambos jugadores han elegido
            let fightTextKey = this.language === 'en' ? 'LET\'S FIGHT!' : '¡A PELEAR!';
            this.turnText.setText(fightTextKey);
    
            // Iniciar cuenta atrás solo una vez
            if (!this.countdownStarted) {
                // Marcar que se ha iniciado la cuenta atrás para evitar que se inicie nuevamente
                this.countdownStarted = true;
                // Iniciar cuenta atrás
                this.startCountdown();
            }
        }
    }
    
    
    playCharacterAnimation(character, flipX) {
        let spritesheetKey = '';
        let animationKey = '';
        let frameRate = 15;
        let repeat = 0;
        let frameNumbers = [];
        switch (character) {
            case 'Zeus':
                spritesheetKey = 'zeusselect';
                animationKey = 'selectzeus';
                frameRate = 10;
                frameNumbers = this.anims.generateFrameNumbers('zeusselect', { start: 0, end: 20 });
                break;
            case 'Poseidon':
                spritesheetKey = 'poseidonselect';
                animationKey = 'selectposeidon';
                frameRate = 10;
                frameNumbers = this.anims.generateFrameNumbers('poseidonselect', { start: 0, end: 20 });
                break;
            case 'Hades':
                spritesheetKey = 'hadesselect';
                animationKey = 'selecthades';
                frameRate = 10;
                frameNumbers = this.anims.generateFrameNumbers('hadesselect', { start: 0, end: 20 });
                break;
        }
    
        const characterSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 20, spritesheetKey).setScale(4).setOrigin(0.5);
    
        if (flipX) {
            characterSprite.flipX = true;
        }
    
        const animationConfig = {
            key: animationKey,
            frames: frameNumbers,
            frameRate: frameRate,
            repeat: repeat
        };
    
        this.anims.create(animationConfig);
    
        characterSprite.on('animationcomplete', () => {
            characterSprite.destroy(); // Destruir el sprite al completar la animación
            this.nextPlayerTurn(); // Cambiar de turno habilitando los botones
            this.playIdleAnimation(character, flipX);
        });
    
        characterSprite.anims.play(animationKey);
    }
    
    disableCharacterSelectionButtons() {
        // Desactivar botones de selección
        this.button1.disableInteractive();
        this.button2.disableInteractive();
        this.button3.disableInteractive();
    }
    
    enableCharacterSelectionButtons() {
        // Habilitar botones de selección
        this.button1.setInteractive();
        this.button2.setInteractive();
        this.button3.setInteractive();
    }
    
    

    startCountdown() {
        let counter = 5;
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

       // Añadir un ajuste vertical
        let countdownText = this.add.text(screenWidth / 2, screenHeight * 0.6 + 70, counter, { fontSize: '30px', fill: '#db7125' }).setOrigin(0.5);

        // Actualizar el contador cada segundo
        let countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                counter--;

                // Actualizar el texto del contador
                countdownText.setText(counter);

                // Verificar si el contador llega a cero
                if (counter === 0) {
                    countdownTimer.remove(); // Detener el contador
                    cancelButton.disableInteractive();
                    // Detener la música con un fadeout gradual
                    if (this.scene.get('InicioJuego').backgroundMusic) {
                        this.tweens.add({
                            targets: this.scene.get('InicioJuego').backgroundMusic,
                            volume: 0,
                            duration: 2000, // 2 segundos de fadeout
                            onComplete: () => {
                                this.scene.get('InicioJuego').backgroundMusic.stop();
                            }
                        });
                    }

                    // Iniciar animación de transición
                    this.cameras.main.fadeOut(2000); // Desvanece la pantalla durante 2 segundos

                    // Después del desvanecimiento, iniciar la siguiente escena
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                        this.scene.start('Pelea', { language: this.language, p1: this.p1, p2: this.p2 , player1Character: this.player1Character, player2Character: this.player2Character });
                    });
                }
            },
            callbackScope: this,
            loop: true // Hacer que el contador se repita
        });

      // Botón para cancelar la selección de personajes y volver al inicio
let cancelButtonText = this.language === 'en' ? 'Cancel Selection' : 'Cancelar Selección';
let cancelButton = this.add.text(screenWidth / 2, screenHeight * 0.7 + 70, cancelButtonText, { fontSize: '13px', fill: '#db7125' }).setInteractive().setOrigin(0.5);

// Guardar el tamaño de la fuente original y el tamaño aumentado
const originalFontSize = 13;

cancelButton.on('pointerdown', () => {
    this.sound.play('BUTTONEF1');
    this.p1 = null;
    this.p2 = null;
    
    this.scene.start('SelectorPersonaje'); // Volver a la pantalla de inicio
});

// Cambiar el cursor al hacer hover sobre el botón
cancelButton.on('pointerover', () => {
    document.body.style.cursor = 'pointer';
    cancelButton.setFontSize(originalFontSize + 1); // Aumentar el tamaño de la tipografía
});

// Restaurar el cursor y el tamaño de la tipografía al salir del hover
cancelButton.on('pointerout', () => {
    document.body.style.cursor = 'default';
    cancelButton.setFontSize(originalFontSize); // Restaurar el tamaño de la tipografía
});


    }
}



class Pelea extends Phaser.Scene {
    constructor() {
        super({ key: 'Pelea' });
        this.shownQuestions = [];
        this.questionHistory = [];

        this.player1Character = null;
        this.player2Character = null;
        // Variables para la vida de cada personaje
        this.characterHealth = 20;
        this.character2Health = 20;

        // Variables para los personajes
        this.character = null;
        this.character2 = null;

        // Botones para cada jugador
        this.player1Button = null;
        this.player2Button = null;

        // Variable para controlar los turnos
        this.currentPlayer = null;

        // Preguntas y respuestas
        this.questionsData = null;
        this.questionOverlay = null;
        this.questionText = null;
        this.answerButtons = [];
        this.currentQuestion = null;

        // Variable para controlar si se está mostrando una pregunta
        this.isShowingQuestion = false;

        // Bandera para controlar si hay una animación en curso
        this.attackInProgress = false;

        // Frame específico de la animación de ataque para cada personaje
        this.attackFrames = {
            Zeus: 20,
            Hades: 35,
            Poseidon: 25
        };
    }
    init(data) {
        // Acceder al idioma seleccionado pasado desde la escena Idioma
        this.language = data.language;
    }
    preload() {
        // Cargar los assets necesarios para la escena de pelea
        this.load.spritesheet('Zeus', 'assets/character1_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Hades', 'assets/character2_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Poseidon', 'assets/character3_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('button', 'assets/button1_spritesheet.png', { frameWidth: 100, frameHeight: 60 });
        this.load.spritesheet('background_hades', 'assets/fondo_hades.png', { frameWidth: 160, frameHeight: 90 });
    this.load.spritesheet('background_poseidon', 'assets/fondo_poseidon.png', { frameWidth: 160, frameHeight: 90 });
    this.load.image('overlay', 'assets/overlay.png');
    this.load.spritesheet('healthBar1', 'assets/healthbar1_spritesheet.png', { frameWidth: 60, frameHeight: 17 });
    this.load.spritesheet('healthBar2', 'assets/healthbar2_spritesheet.png', { frameWidth: 60, frameHeight: 17 });
    this.load.audio('music_hades', 'audios/HADESFONDO.mp3');
    this.load.audio('music_poseidon', 'audios/POSEIDONFONDO.mp3');
    this.load.audio('BUTTONEF1', 'audios/BUTTONEFFECT1.mp3');
    this.load.audio('WRONG', 'audios/WRONG.mp3');
    this.load.audio('RIGHT', 'audios/RIGHT.mp3');
    this.load.audio('VICTORY', 'audios/VICTORYSOUND.mp3');
    this.load.audio('zeusattack', 'audios/ZEUSATACK.mp3');
    this.load.audio('poseidonattack', 'audios/POSEIDONATACK.mp3');
    this.load.audio('hadesattack', 'audios/HADESATACK.mp3');
    this.load.audio('OPEN', 'audios/OVERLAYOPEN.mp3');
    this.load.audio('CLOSE', 'audios/OVERLAYCLOSE.mp3');



    this.load.audio('HEALTH', 'audios/HEALTH.mp3');

        this.load.json('questions', 'data/data.json'); 
    }

    create(data) {
        this.player1Character = data.player1Character;
        this.player2Character = data.player2Character;
        console.log(`Personaje: ${this.player1Character}`);
        console.log(`Personaje: ${this.player2Character}`);
    
        const p1 = data.p1;
        const p2 = data.p2;
       // Crear textos para mostrar los puntos de vida de cada jugador
this.player1HealthText = this.add.text(30, 180, `Player 1 Health: ${this.characterHealth}`, { fontFamily: 'BMmini', fontSize: 24, color: '#ffffff' }).setDepth(999).setAlpha(0);
this.player2HealthText = this.add.text(700, 180, `Player 2 Health: ${this.character2Health}`, { fontFamily: 'BMmini', fontSize: 24, color: '#ffffff' }).setDepth(999).setAlpha(0);

             // Calcular la escala para ajustar el fondo al tamaño del canvas
             const scaleX = this.sys.game.canvas.width / 160;
             const scaleY = this.sys.game.canvas.height / 90;
             const scale = Math.max(scaleX, scaleY);
        // Crear la escena de pelea
        const backgrounds = ['background_hades', 'background_poseidon'];
        const randomBackground = Phaser.Math.RND.pick(backgrounds);
        this.background = this.add.sprite(0, 0, randomBackground).setOrigin(0).setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);
       
         // Reproducir música de fondo según el fondo aleatorio seleccionado
         if (randomBackground === 'background_hades') {
            this.backgroundMusic = this.sound.add('music_hades', { loop: true, volume: 0.5 });
            
            this.backgroundMusic.play();
        } else if (randomBackground === 'background_poseidon') {
            this.backgroundMusic = this.sound.add('music_poseidon', { loop: true, volume: 0.3 });
            this.backgroundMusic.play();
        }


         // Crear las barras de vida para cada jugador
         this.healthBar1 = this.add.sprite(12, 5, 'healthBar1').setOrigin(0).setScale(4);
         this.healthBar2 = this.add.sprite(628, 5, 'healthBar2').setOrigin(0).setScale(-4, 4);
    
        this.character = this.add.sprite(214, 180, p1).setScale(-scale, scale);   
        this.character2 = this.add.sprite(428, 180, p2).setScale(scale, scale);    
       
        if (randomBackground === 'background_hades') {
            this.background.anims.create({
                key: 'background_anim',
                frames: this.anims.generateFrameNumbers(randomBackground, { start: 0, end: 26 }),
                frameRate: 8,
                repeat: -1
            });
            this.textures.remove('background_poseidon');
        } else if (randomBackground === 'background_poseidon') {
            this.background.anims.create({
                key: 'background_anim',
                frames: this.anims.generateFrameNumbers(randomBackground, { start: 0, end: 84 }),
                frameRate: 10,
                repeat: -1
            });
            this.textures.remove('background_hades');

        }
    
        this.background.anims.play(`background_anim`);
    
               
        // Asociar las animaciones según la selección de cada jugador
        this.setAnimationsForCharacter(p1, this.character);
        this.setAnimationsForCharacter(p2, this.character2);

        // Reproducir animaciones iniciales
        this.character.anims.play(`idle_${p1}`, true);
        this.character2.anims.play(`idle_${p2}`, true);

        // Inicializar el primer turno
        this.currentPlayer = Math.random() < 0.5 ? 'p1' : 'p2';

        // Cargar preguntas y respuestas
        this.questionsData = this.cache.json.get('questions');
        this.player1Button = this.createPlayerButton(57, 300, 'p1', p1).setScale(2.3).setDepth(999);
        this.player2Button = this.createPlayerButton(577, 300, 'p2', p2).setScale(2.3).setDepth(999);

             // Agregar evento de clic para los botones de jugador
             this.player1Button.on('pointerdown', () => {
                if (!this.isShowingQuestion && this.currentPlayer === 'p1') {
                    this.showQuestionOverlay(data.p1, this.language);
                    this.player1Button.disableInteractive(); // Deshabilitar el botón después de hacer clic
                }
            });
            

            this.player2Button.on('pointerdown', () => {
                if (!this.isShowingQuestion && this.currentPlayer === 'p2') {
                    this.showQuestionOverlay(data.p2, this.language);
                    this.player2Button.disableInteractive(); // Deshabilitar el botón después de hacer clic
                }
            });
            
      

     
        this.anims.create({
            key: 'BARRA1_100',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA1_80',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 0, end: 19 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA1_60',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 20, end: 39 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA1_40',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 42, end: 61 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA1_20',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 64, end: 83 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA1_0',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 86, end: 103 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'BARRA2_100',
            frames: this.anims.generateFrameNumbers('healthBar1', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA2_80',
            frames: this.anims.generateFrameNumbers('healthBar2', { start: 0, end: 19 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA2_60',
            frames: this.anims.generateFrameNumbers('healthBar2', { start: 20, end: 39 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA2_40',
            frames: this.anims.generateFrameNumbers('healthBar2', { start: 42, end: 61 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA2_20',
            frames: this.anims.generateFrameNumbers('healthBar2', { start: 64, end: 83 }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'BARRA2_0',
            frames: this.anims.generateFrameNumbers('healthBar2', { start: 86, end: 103 }),
            frameRate: 8,
            repeat: 0
        });

           // Escuchar el evento 'animationcomplete' de la barra de vida 1
    this.healthBar1.on('animationcomplete', () => {
        if (this.healthBar1.anims.currentAnim.key === 'BARRA1_0') {
            // Mostrar el mensaje de 'show overlay'
            this.checkWinner();
        }
    });

    // Escuchar el evento 'animationcomplete' de la barra de vida 2
    this.healthBar2.on('animationcomplete', () => {
        if (this.healthBar2.anims.currentAnim.key === 'BARRA2_0') {
            // Mostrar el mensaje de 'show overlay'
            this.checkWinner();
        }
    });
   

 // Configurar estado inicial de los botones según el turno
 if (this.currentPlayer === 'p1') {
    this.player1Button.setAlpha(1); // Activar el botón del jugador 1
    this.player2Button.setAlpha(0.5); // Desactivar el botón del jugador 2
    this.player1Button.anims.play(`button_idle_p1`, true); // Reproducir la animación idle del botón del jugador 1
    this.player2Button.anims.stop();



} else {
    this.player1Button.setAlpha(0.5); // Desactivar el botón del jugador 1
    this.player2Button.setAlpha(1); // Activar el botón del jugador 2
    this.player2Button.anims.play(`button_idle_p2`, true); // Reproducir la animación idle del botón del jugador 2
    this.player1Button.anims.stop();

}
    this.showTurnOverlay();


    
    }
    
    setAnimationsForCharacter(characterKey, sprite) {
        let posY = 180; // Posición y predeterminada
       
        if (characterKey === 'Zeus') {
            posY = 190; // Posición y específica para Zeus
        } else if (characterKey === 'Poseidon') {
            posY = 190; // Posición y específica para Poseidón
        } else if (characterKey === 'Hades') {
            posY = 190; // Posición y específica para Hades
        }
        // Comprueba el nombre del personaje y define las animaciones en consecuencia
        if (characterKey === 'Zeus') {
            this.anims.create({
                key: 'idle_Zeus',
                frames: this.anims.generateFrameNumbers('Zeus', { start: 0, end: 4 }),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'attack_Zeus',
                frames: this.anims.generateFrameNumbers('Zeus', { start: 4, end: 30 }),
                frameRate: 8,
                repeat: 0
            });
            this.anims.create({
                key: 'recibir_Zeus',
                frames: this.anims.generateFrameNumbers('Zeus', { start: 31, end: 35 }),
                frameRate: 8,
                repeat: 0
            });
        } else if (characterKey === 'Poseidon') {
            this.anims.create({
                key: 'idle_Poseidon',
                frames: this.anims.generateFrameNumbers('Poseidon', { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'attack_Poseidon',
                frames: this.anims.generateFrameNumbers('Poseidon', { start: 0, end: 50 }),
                frameRate: 8,
                repeat: 0
            });
            this.anims.create({
                key: 'recibir_Poseidon',
                frames: this.anims.generateFrameNumbers('Poseidon', { start: 51, end: 54 }),
                frameRate: 8,
                repeat: 0
            });
        } else if (characterKey === 'Hades') {
            this.anims.create({
                key: 'idle_Hades',
                frames: this.anims.generateFrameNumbers('Hades', { start: 44, end: 50 }),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'attack_Hades',
                frames: this.anims.generateFrameNumbers('Hades', { start: 0, end: 44 }),
                frameRate: 8,
                repeat: 0
            });
            this.anims.create({
                key: 'recibir_Hades',
                frames: this.anims.generateFrameNumbers('Hades', { start: 52, end: 55 }),
                frameRate: 8,
                repeat: 0
            });
        }
        sprite.setY(posY);
    }

    createPlayerButton(x, y, player, characterKey) {
        let button = this.add.sprite(x, y, 'button').setScale(0.5);
    
        // Crear animaciones para el botón del jugador
        this.anims.create({
            key: `button_idle_${player}`,
            frames: this.anims.generateFrameNumbers('button', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
    
        this.anims.create({
            key: `button_anim_${player}`,
            frames: this.anims.generateFrameNumbers('button', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });
    
        // Asignar la animación inicial
        button.anims.play(`button_idle_${player}`, true);
    
        // Habilitar interactividad
        button.setInteractive();
    
        // Al hacer clic en el botón, mostrar la pregunta
        button.on('pointerdown', () => {
            if (!this.isShowingQuestion && this.currentPlayer === player) {
                this.sound.play('BUTTONEF1');
                this.showQuestionOverlay(characterKey);
            }
        });
    
        return button;
    }

  
    
    translateText(textToTranslate, targetLanguage) {
        return fetch('https://api.mymemory.translated.net/get?q=' + textToTranslate + '&langpair=es|' + targetLanguage)
            .then(response => response.json())
            .then(data => {
                return data.responseData.translatedText;
            });
    }
    
   async showQuestionOverlay(characterKey) {
    const language = this.scene.get("Idioma").language;
    console.log(language)
    // Verificar si ya se está mostrando una pregunta
    if (this.isShowingQuestion) {
        return; // Salir si ya se está mostrando una pregunta
    }

    // Verificar si ya se han mostrado todas las preguntas
    if (this.shownQuestions.length === this.questionsData.length) {
        // Si todas las preguntas se han mostrado, reiniciar el registro
        this.shownQuestions = [];
    }

    // Obtener una pregunta aleatoria que aún no se ha mostrado
    let availableQuestions = this.questionsData.filter(question => !this.shownQuestions.includes(question));
    const randomQuestion = Phaser.Math.RND.pick(availableQuestions);

    // Agregar la pregunta actual al registro de preguntas mostradas
    this.shownQuestions.push(randomQuestion);

    // Determinar el texto de la pregunta y las opciones según el idioma seleccionado
    let questionText = randomQuestion.pregunta;
    let options = randomQuestion.opciones;

    // Traducir la pregunta y las opciones si el idioma seleccionado es inglés
    if (language === 'en') {
        questionText = randomQuestion.pregunta_english;
        options = randomQuestion.opciones_english;
    }

    // Mostrar overlay con la pregunta y opciones
    this.questionOverlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setOrigin(0.5).setScale(3.4).setDepth(1100);
    this.questionText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 48, questionText, { fontFamily: 'BMmini', fontSize: 16, color: '#b35410', wordWrap: { width: 340 } }).setOrigin(0.5).setDepth(1101);

    // Crear botones para las opciones de respuesta
    this.answerButtons = [];
    const startX = this.sys.game.canvas.width / 2 - 100; // Ajustar el inicio de la primera columna
    const startY = this.sys.game.canvas.height / 2 + 10;
    options.forEach((option, index) => {
        const columnIndex = index % 2; // Calcular la columna actual
        const rowIndex = Math.floor(index / 2); // Calcular la fila actual
        const buttonX = startX + columnIndex * 200; // Calcular la coordenada x del botón
        const buttonY = startY + rowIndex * 40; // Calcular la coordenada y del botón
        const button = this.add.text(buttonX, buttonY, option, { fontFamily: 'BMmini', fontSize: 14, color: '#b35410' }).setOrigin(0.5).setInteractive().setDepth(1101);
        button.on('pointerdown', () => {
            this.processAnswer(characterKey, option, randomQuestion.respuesta_correcta);
            this.removeQuestionOverlay(); // Eliminar el overlay después de responder
        });
        this.answerButtons.push(button);
    });

    // Guardar la pregunta en el historial de preguntas, incluyendo el resumen
    this.questionHistory.push({
        pregunta: questionText, // Usar la pregunta traducida si está en inglés
        respuesta_correcta: (language === 'en' ? randomQuestion.respuesta_correcta_english : randomQuestion.respuesta_correcta), // Usar la respuesta correcta en inglés si está disponible
        opciones: options, // Usar las opciones traducidas si están en inglés
        respuesta_jugador: null,
        resumen: (language === 'en' ? randomQuestion.resumen_english : randomQuestion.resumen), // Usar el resumen en inglés si está disponible
        currentPlayer: this.currentPlayer
    });

    // Actualizar la variable de control
    this.isShowingQuestion = true;
}

    
        
    

    



// Función para eliminar el overlay de la pregunta
removeQuestionOverlay() {
    this.questionOverlay.destroy();
    this.questionText.destroy();
    this.answerButtons.forEach(button => button.destroy());
    this.isShowingQuestion = false; // Actualizar la variable de control
}
// Función para procesar la respuesta del jugador
processAnswer(characterKey, selectedAnswer, correctAnswer) {
    // Desactivar interactividad de los botones de respuesta
    this.answerButtons.forEach(button => button.disableInteractive());

    // Encontrar la pregunta actual en el historial de preguntas
    const currentQuestion = this.questionHistory[this.questionHistory.length - 1];

    // Verificar si el idioma seleccionado es inglés
    const language = this.scene.get("Idioma").language;

    // Obtener la pregunta y opciones según el idioma seleccionado
    let pregunta = currentQuestion.pregunta;
    let opciones = currentQuestion.opciones;

    if (language === 'en') {
        pregunta = currentQuestion.pregunta_english;
        opciones = currentQuestion.opciones_english;
    }

    // Registrar la respuesta del jugador en el historial de preguntas
    currentQuestion.respuesta_jugador = selectedAnswer;

    // Al responder correctamente
    if (selectedAnswer === correctAnswer) {
        this.sound.play('RIGHT', { volume: 0.5 });

        // Ejecutar animación de ataque
        this.attackAnimation(characterKey, this.currentPlayer === 'p1' ? this.character : this.character2);
    } else {
        this.sound.play('WRONG', { volume: 0.5 });

        // Cambiar de turno directamente sin atacar
        this.currentPlayer = this.currentPlayer === 'p1' ? 'p2' : 'p1';
        this.showTurnOverlay();
        // Actualizar la interactividad de los botones según el nuevo turno
        if (this.currentPlayer === 'p1') {

            this.player1Button.setAlpha(1); // Activar el botón del jugador 1
            this.player2Button.setAlpha(0.5); // Desactivar el botón del jugador 2
            this.player2Button.anims.stop().setFrame(0); // Detener la animación del botón del jugador 2
            this.player1Button.anims.play(`button_idle_p1`, true); // Reproducir la animación idle del botón del jugador 1

        } else {

            this.player1Button.setAlpha(0.5); // Desactivar el botón del jugador 1
            this.player2Button.setAlpha(1); // Activar el botón del jugador 2
            this.player1Button.anims.stop().setFrame(0); // Detener la animación del botón del jugador 1
            this.player2Button.anims.play(`button_idle_p2`, true); // Reproducir la animación idle del botón del jugador 2

        }
    }
}


attackAnimation(characterKey, characterSprite) {
    // Activar la bandera de ataque en progreso
    this.attackInProgress = true;

    // Determinar el botón del jugador actual y reproducir la animación button_anim una sola vez
    const currentPlayerButton = this.currentPlayer === 'p1' ? this.player1Button : this.player2Button;
    currentPlayerButton.anims.play(`button_anim_${this.currentPlayer}`).once('animationcomplete', () => {
        currentPlayerButton.anims.play(`button_idle_${this.currentPlayer}`);
    });

    this.player1Button.disableInteractive();
    this.player2Button.disableInteractive();

    // Obtener el sprite del jugador que no está en su turno
    const inactiveCharacterSprite = characterSprite === this.character ? this.character2 : this.character;

    // Fotograma específico para cada personaje
    let frameToReceive = 0;
    switch (characterKey) {
        case 'Zeus':
            frameToReceive = 8;
            // Reproducir el sonido de ataque de Zeus
            this.sound.play('zeusattack',{ volume: 0.75 });
            break;
        case 'Poseidon':
            frameToReceive = 27;
            // Reproducir el sonido de ataque de Poseidón
            this.sound.play('poseidonattack',{ volume: 0.75 });
            break;
        case 'Hades':
            frameToReceive = 25;
            // Reproducir el sonido de ataque de Hades
            this.sound.play('hadesattack',{ volume: 1 });
            break;
        default:
            frameToReceive = 0;
    }

    // Reproducir la animación de ataque del personaje actual
    const attackAnimation = characterSprite.anims.play(`attack_${characterKey}`, true);
    characterSprite.setDepth(999);

    // Escuchar el evento 'animationcomplete' de la animación de ataque del personaje actual
    attackAnimation.once('animationcomplete', () => {
        // Cuando la animación de ataque termine, ajustar la profundidad del personaje
        characterSprite.setDepth(90);
        // Y volver a la animación idle del personaje
        characterSprite.anims.play(`idle_${characterKey}`, true);

        // Detener la animación del botón del jugador que no está en su turno
        const inactivePlayerButton = characterSprite === this.character ? this.player2Button : this.player1Button;
        inactivePlayerButton.anims.stop().setFrame(0);

        // Detener la animación de recibir del jugador inactivo y volver a la animación idle
        inactiveCharacterSprite.anims.play(`idle_${inactiveCharacterSprite.texture.key}`, true);

        // Reducir la barra de vida del personaje correspondiente en 20 puntos
        if (inactiveCharacterSprite === this.character) {
            this.reduceCharacterHealth(20);
        } else {
            this.reduceCharacter2Health(20);
        }

        // Escuchar el evento 'animationcomplete' de la actualización de la barra de salud
        const healthBar = inactiveCharacterSprite === this.character ? this.healthBar1 : this.healthBar2;
        healthBar.once('animationcomplete', () => {
            // Cambiar de turno
            this.currentPlayer = this.currentPlayer === 'p1' ? 'p2' : 'p1';
            this.showTurnOverlay();
            // Habilitar o deshabilitar los botones según el turno actual
            this.updateTurnButtons();
            // Desactivar la bandera de ataque en progreso
            this.attackInProgress = false;
            if (this.currentPlayer === 'p1') {
                this.player1Button.setAlpha(1); // Activar el botón del jugador 1
                this.player2Button.setAlpha(0.5); // Desactivar el botón del jugador 2
                this.player2Button.anims.stop().setFrame(0); // Detener la animación del botón del jugador 2
                this.player1Button.anims.play(`button_idle_p1`, true); // Reproducir la animación idle del botón del jugador 1
            } else {
                this.player1Button.setAlpha(0.5); // Desactivar el botón del jugador 1
                this.player2Button.setAlpha(1); // Activar el botón del jugador 2
                this.player1Button.anims.stop().setFrame(0); // Detener la animación del botón del jugador 1
                this.player2Button.anims.play(`button_idle_p2`, true); // Reproducir la animación idle del botón del jugador 2
            }
        });
    });

    // Escuchar el evento 'animationupdate' para detectar el fotograma específico en la animación de ataque
    attackAnimation.on('animationupdate', (animation, frame) => {
        // Cuando se alcanza el fotograma específico
        if (frame.index === frameToReceive) {
            // Reproducir la animación de recibir del jugador inactivo
            inactiveCharacterSprite.anims.play(`recibir_${inactiveCharacterSprite.texture.key}`, true).once('animationcomplete', () => {
                // Volver a reproducir la animación idle
                inactiveCharacterSprite.anims.play(`idle_${inactiveCharacterSprite.texture.key}`, true);
            });
        }
    });
}


reduceCharacterHealth(damage) {
    this.characterHealth -= damage;
    this.sound.play('HEALTH');

    this.updateHealthBar1(); // Actualizar la barra de vida del jugador 1
    this.player1HealthText.setText(`Player 1 Health: ${this.characterHealth}`); // Actualizar el texto de los puntos de vida del jugador 1
}

reduceCharacter2Health(damage) {
    this.character2Health -= damage;
    this.sound.play('HEALTH');

    this.updateHealthBar2(); // Actualizar la barra de vida del jugador 2
    this.player2HealthText.setText(`Player 2 Health: ${this.character2Health}`); // Actualizar el texto de los puntos de vida del jugador 2
}showTurnOverlay() {
    this.sound.play('OPEN',{volume:0.4});

    // Verificar si uno de los jugadores ha perdido toda su vida
    if (this.characterHealth <= 0 || this.character2Health <= 0) {
        return; // No mostrar el overlay si uno de los jugadores ha perdido
    }

    // Deshabilitar interactividad de los botones durante la visualización del overlay
    this.player1Button.disableInteractive();
    this.player2Button.disableInteractive();
    
    let overlayText = '';
    let overlayMessage = '';

    if (this.language === 'en') {
        overlayText = this.currentPlayer === 'p1' ? 'PLAYER 1' : 'PLAYER 2';
        overlayMessage = 'YOUR TURN';
    } else {
        overlayText = this.currentPlayer === 'p1' ? 'JUGADOR 1' : 'JUGADOR 2';
        overlayMessage = 'TU TURNO';
    }
   
    // Crear un contenedor para el overlay
    const overlayContainer = this.add.container(0, 0).setDepth(1000);

    // Agregar la imagen de fondo del overlay
    const overlayBackground = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setOrigin(0.5).setScale(3.4);
    overlayContainer.add(overlayBackground);

    // Mostrar overlay con el texto
    const overlayTextObject = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, overlayText + ', ' + overlayMessage, { fontFamily: 'BMmini', fontSize: 22, color: '#b35410' }).setOrigin(0.5);
    overlayContainer.add(overlayTextObject);

    // Configurar duración del overlay (3 segundos)
    this.time.delayedCall(1500, () => {
        this.sound.play('CLOSE',{volume:0.4});

        // Eliminar el contenedor del overlay
        overlayContainer.destroy();

        // Habilitar interactividad del botón del jugador actual
        if (this.currentPlayer === 'p1') {
            this.player1Button.setInteractive();
        } else {
            this.player2Button.setInteractive();
        }
    });

    // Si el overlay está mostrando, deshabilitar todos los botones
    if (overlayContainer.visible) {
        this.player1Button.disableInteractive();
        this.player2Button.disableInteractive();
    }
}




    
    updateHealthBar1() {
        const frame = this.calculateHealthBarFrame(this.characterHealth);
        this.healthBar1.anims.play(frame); // Debes pasar 'frame' directamente como argumento
    }
    
    updateHealthBar2() {
        const frame = this.calculateHealthBarFrame(this.character2Health);
        this.healthBar2.anims.play(frame); // Debes pasar 'frame' directamente como argumento
    }
    
    calculateHealthBarFrame(health) {
        // Determinar el rango de salud basado en el valor de 'health'
        if (health >= 80) {
            return 'BARRA1_80'; // Barra de vida al 80%
        } else if (health >= 60) {
            return 'BARRA1_60'; // Barra de vida al 60%
        } else if (health >= 40) {
            return 'BARRA1_40'; // Barra de vida al 40%
        } else if (health >= 20) {
            return 'BARRA1_20'; // Barra de vida al 20%
        } else if (health = 0) {
            return 'BARRA1_0';
        } else {
            return 'BARRA1_0';
        }
    }
    
   
    calculateHealthBarFrame2(health) {
        // Determinar el rango de salud basado en el valor de 'health'
        if (health >= 80) {
            return 'BARRA2_80'; // Barra de vida al 80%
        } else if (health >= 60) {
            return 'BARRA2_60'; // Barra de vida al 60%
        } else if (health >= 40) {
            return 'BARRA2_40'; // Barra de vida al 40%
        } else if (health >= 20) {
            return 'BARRA2_20'; // Barra de vida al 20%
        } else if (health = 0) {
            return 'BARRA2_0';
        } else {
            return 'BARRA2_0';
        }
    }
    

    updateTurnButtons() {
        // Deshabilitar todos los botones
        this.player1Button.disableInteractive();
        this.player2Button.disableInteractive();

        let winner = '';

        // Verificar si uno de los jugadores ha perdido toda su vida
        if (this.characterHealth <= 0) {
            winner = 'Jugador 2';
        } else if (this.character2Health <= 0) {
            winner = 'Jugador 1';
        }

        if (winner !== '') {
            // Mostrar el mensaje de ganador
            this.scene.start('OverlayMessage', { winner: winner,language: this.language, player1Character: this.player1Character, player2Character: this.player2Character  }); // Volver a la pantalla de inicio
            return;
        }
    }
    
    checkWinner() {
        // Escuchar el evento 'animationcomplete' de la barra de vida 1
        this.healthBar1.once('animationcomplete', () => {
            if (this.healthBar1.anims.currentAnim.key === 'BARRA1_0') {
                if (this.characterHealth <= 0) {
                    // Detener todo el juego
                    this.stopGame();
                    // Mostrar el mensaje de ganador para el jugador 2
                    
                    this.cameras.main.fadeOut(500); // Transición de desvanecimiento
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('OverlayMessage', { winner: 'Jugador 2',language: this.language, player1Character: this.player1Character, player2Character: this.player2Character  });
                    });
                }
            }
        });
    
        // Escuchar el evento 'animationcomplete' de la barra de vida 2
        this.healthBar2.once('animationcomplete', () => {
            if (this.healthBar2.anims.currentAnim.key === 'BARRA2_0') {
                if (this.character2Health <= 0) {
                    // Detener todo el juego
                    this.stopGame();
                    // Mostrar el mensaje de ganador para el jugador 1
                    this.cameras.main.fadeOut(500); // Transición de desvanecimiento
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('OverlayMessage', { winner: 'Jugador 1' ,language: this.language, player1Character: this.player1Character, player2Character: this.player2Character });
                    });
                }
            }
        });
    }
    
    stopGame() {
        // Detener todas las escenas
        this.scene.stop('Pelea');
      
    }
    

    update() {
        // Verificar si algún personaje ha perdido toda su vida
        this.checkWinner();
      

    }
    
}

class OverlayMessage extends Phaser.Scene {
    constructor() {
        super({ key: 'OverlayMessage' });

        // Definir las variables nextButton y prevButton como propiedades de la clase
        this.nextButton = null;
        this.prevButton = null;
        this.player1Character = null;
        this.player2Character = null;
        this.statisticsText = null; // Variable para almacenar el texto "Ver Estadísticas"

    }

    preload() {
        this.load.audio('VICTORY', 'audios/VICTORYSOUND.mp3');
        this.load.json('questions', 'data/data.json');
        this.load.spritesheet('Hades_spritesheet', 'assets/Hades_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Zeus_spritesheet', 'assets/Zeus_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Poseidon_spritesheet', 'assets/Poseidon_spritesheet.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Fondo_detalle', 'assets/DETALLEFONDO.png', { frameWidth: 160, frameHeight: 90 });
        this.load.spritesheet('Fondo_stats', 'assets/Fondo_stats.png', { frameWidth: 160, frameHeight: 90 });

    }
    init(data) {
        // Acceder al idioma seleccionado pasado desde la escena Idioma
        this.language = data.language;
    }
    create(data) {
         // Eliminar todo lo que hay en la pantalla
         this.children.removeAll();
        // Detener la música con un fadeout gradual
        if (this.scene.get('Pelea').backgroundMusic) {
            this.scene.get('Pelea').backgroundMusic.stop();
        }

        let winner = data.winner; // Obtener el ganador de los datos pasados desde la escena anterior
        this.player1Character = data.player1Character;
        this.player2Character = data.player2Character;
    
        // Dependiendo del ganador, mostrar el personaje correspondiente
        let winnerSpriteSheet = '';

        if (winner === 'Jugador 1') {
            console.log(`Personaje: ${this.player1Character}`);
            winnerSpriteSheet = `${this.player1Character}_spritesheet`;
        } else if (winner === 'Jugador 2') {
            console.log(`Personaje: ${this.player2Character}`);
            winnerSpriteSheet = `${this.player2Character}_spritesheet`;
        }

        // Crear el fondo con el spritesheet del ganador
        const background = this.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, winnerSpriteSheet).setDepth(1000);
            
        // Escalar el fondo para que ocupe todo el canvas manteniendo la proporción del formato 160x90
        const scaleX = this.sys.game.canvas.width / 160;
        const scaleY = this.sys.game.canvas.height / 90;
        const scale = Math.max(scaleX, scaleY); // Usar el máximo de los dos valores para mantener la proporción
        background.setScale(scale);

        // Establecer el número de fotogramas por segundo para la animación
        background.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers(winnerSpriteSheet, { start: 0, end: 41 }), // Suponiendo que la animación tiene 12 frames
            frameRate: 12,
            repeat: 0 // Repetir una vez y luego detenerse
        });

        // Establecer el número de fotogramas por segundo para la animación
        background.anims.create({
            key: 'backgroundIdle',
            frames: this.anims.generateFrameNumbers(winnerSpriteSheet, { start: 30, end: 41 }), // Suponiendo que la animación tiene 12 frames
            frameRate: 10,
            repeat: -1 // Repetir en bucle
        });

        // Reproducir la animación 'backgroundAnimation'
        background.anims.play('backgroundAnimation');

        // Escuchar el evento 'complete' de la animación 'backgroundAnimation'
        background.once('animationcomplete-backgroundAnimation', () => {
            // Al terminar la animación 'backgroundAnimation', reproducir en bucle la animación 'backgroundIdle'
            background.anims.play('backgroundIdle');
        });

        // Crear el texto "Ver Estadísticas"
        this.statisticsText = this.add.text(this.sys.game.canvas.width / 2 +120, this.sys.game.canvas.height - 34, this.language === 'en' ? 'View Statistics' : 'Ver Estadísticas', { fontFamily: 'BMmini', fontSize: 18, color: '#b35410' }).setOrigin(0.5).setInteractive().setDepth(999);
        this.statisticsText.setVisible(false); // Ocultar inicialmente el texto

        // Asociar evento al clic del texto "Ver Estadísticas"
        this.statisticsText.on('pointerdown', () => {
            this.showStatistics();
            // Cambiar la sprite sheet del fondo y su profundidad
            background.setTexture('Fondo_stats').setDepth(0);

            // Crear una nueva animación para el fondo_detalle
            background.anims.create({
                key: 'backgroundStats',
                frames: this.anims.generateFrameNumbers('Fondo_stats', { start: 0, end: 3 }), // Ajusta el rango de frames según tu spritesheet
                frameRate: 12,
                repeat: -1
            });
            // Reproducir la animación infinita
            background.anims.play('backgroundStats');
        });

        this.statisticsText.on('pointerout', () => {
            document.body.style.cursor = 'default';
        });
        
        this.statisticsText.on('pointerover', () => {
            document.body.style.cursor = 'pointer';
        });

        // Ajustar el fondo para que esté centrado en ambos ejes
        background.setOrigin(0.5);
        // Establecer el fondo en negro
        this.cameras.main.setBackgroundColor('#0d0600');
        // Mostrar el mensaje de ganador
        // Define un diccionario de traducción
        const translations = {
            'HA GANADO!': 'HAS WON!',
            'Ver Detalles': 'See Details',
            'de Partida': 'of Match',
            'JUGADOR 1': 'PLAYER 1',
            'JUGADOR 2': 'PLAYER 2',
            'ha ganado': 'HAS WON'
        };

        // Función para traducir texto al inglés
        function translateToEnglish(text) {
            return translations[text] || text; // Devuelve la traducción si existe, de lo contrario, devuelve el texto original
        }
const language = data.language

// Determina el texto del ganador en función de si es jugador 1 o jugador 2 y el idioma seleccionado
const winnerText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 -20, `${language === 'en' ? translateToEnglish(winner.toUpperCase()) : winner.toUpperCase()} ${language === 'en' ? translateToEnglish('ha ganado') : 'ha ganado'}!`, { fontFamily: 'BMmini', fontSize: 48, color: '#b35410' }).setOrigin(0.5);
winnerText.setDepth(900);

// Crear el botón de detalles
const detailsButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 108, [language === 'en' ? translateToEnglish('Ver Detalles') : 'Ver Detalles', language === 'en' ? translateToEnglish('de Partida') : 'de Partida'], {
    fontFamily: 'BMmini',
    fontSize: 20,
    color: '#b35410',
    wordWrap: { width: 160, useAdvancedWrap: true },
    align: 'center'
}).setOrigin(0.5);
detailsButton.setDepth(902);

        // Establecer el estilo del botón de detalles
        detailsButton.setStyle({ color: '#b35410', padding: { x: 10, y: 5 } }).setInteractive().setDepth(990).setAlpha(1);

        this.sound.play('VICTORY', { volume: 0.4 });

        // Al hacer clic en el botón de detalles
        detailsButton.on('pointerover', () => {
            document.body.style.cursor = 'pointer';

            });
        detailsButton.on('pointerout', () => {
            document.body.style.cursor = 'default';

            });
        detailsButton.on('pointerdown', () => {
        // Cambiar la sprite sheet del fondo y su profundidad
        background.setTexture('Fondo_detalle').setDepth(0);

        // Crear una nueva animación para el fondo_detalle
        background.anims.create({
            key: 'backgroundDetail',
            frames: this.anims.generateFrameNumbers('Fondo_detalle', { start: 0, end: 3 }), // Ajusta el rango de frames según tu spritesheet
            frameRate: 12,
            repeat: -1
        });

        // Reproducir la animación infinita
        background.anims.play('backgroundDetail');

        this.showQuestionSlides();
        // Ocultar el resto de la interfaz
        winnerText.setVisible(false);
        detailsButton.setVisible(false);
        });



      
    }
   
    
    showQuestionSlides() {
        // Create a list to store question and answer slides
        this.questionSlides = [];
    
        // Iterate through the question and answer history and create slides
        this.scene.get('Pelea').questionHistory.forEach((questionData, index) => {
            const slide = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
            const questionText = this.add.text(125, -105, questionData.pregunta, { fontFamily: 'BMmini', fontSize: 20, color: '#b35410', wordWrap: { width: 335 } }).setOrigin(0.5);
            const currentPlayerText = this.add.text(-190, -139, [
                'Respondió:',
                `${questionData.currentPlayer === 'p1' ? 'Player 1' : 'Player 2'}`
            ], { 
                fontFamily: 'BMmini', 
                fontSize: 18, 
                color: '#b35410',
                align: 'center', 
            }).setOrigin(0.5);
    
            // Getting the corresponding character sprite sheet for the player of this slide
            const player1CharacterSprite = `${this.player1Character.toLowerCase()}select`;
            const player2CharacterSprite = `${this.player2Character.toLowerCase()}select`;
    
            // Creating the sprite for the character
            const characterSprite = this.add.sprite(48, 40, questionData.currentPlayer === 'p1' ? player1CharacterSprite : player2CharacterSprite).setScale(4).setOrigin(0.5);
    
            // Defining the idle animation of the character based on the character type of both players
            let idleAnimationKey;
            let frameNumbers;
    
            switch (questionData.currentPlayer === 'p1' ? this.player1Character : this.player2Character) {
                case 'Zeus':
                    idleAnimationKey = 'idleZeus';
                    frameNumbers = this.anims.generateFrameNumbers('zeusselect', { start: 9, end: 19 });
                    break;
                case 'Poseidon':
                    idleAnimationKey = 'idlePoseidon';
                    frameNumbers = this.anims.generateFrameNumbers('poseidonselect', { start: 9, end: 20 });
                    break;
                case 'Hades':
                    idleAnimationKey = 'idleHades';
                    frameNumbers = this.anims.generateFrameNumbers('hadesselect', { start: 13, end: 20 });
                    break;
                default:
                    idleAnimationKey = 'idleDefault';
                    frameNumbers = this.anims.generateFrameNumbers(characterSpriteSheet, { start: 0, end: 9 });
                    break;
            }
    
            // Creating the idle animation for the character sprite
            characterSprite.anims.create({
                key: idleAnimationKey,
                frames: frameNumbers,
                frameRate: 10,
                repeat: -1
            });
    
            characterSprite.anims.play(idleAnimationKey); // Play the idle animation
    
            const answerComparisonText = this.add.text(120, -6, `${questionData.respuesta_jugador || 'Not answered'} - ${questionData.respuesta_jugador === questionData.respuesta_correcta ? 'Resp. Correcta' : 'Resp. Incorrecta'}`, { fontFamily: 'BMmini', fontSize: 16, color: '#b35410', wordWrap: { width: 600 } }).setOrigin(0.5);
        const summaryText = this.add.text(122, 70, `La respuesta correcta era: ${questionData.respuesta_correcta}. ${questionData.resumen}`, { 
            fontFamily: 'BMmini', 
            fontSize: 16, 
            color: '#b35410', 
            wordWrap: { width: 370 },
            align: 'left',
            padding: { top: 0, bottom: 0 } 
        }).setOrigin(0.5);

            // Translate if language is English
            if (this.language === 'en') {
                currentPlayerText.text = currentPlayerText.text.replace('Respondió:', 'Answered:');
                answerComparisonText.text = answerComparisonText.text.replace('Resp. Correcta', 'Correct answer').replace('Resp. Incorrecta', 'Incorrect answer');
                summaryText.text = summaryText.text.replace('La respuesta correcta era:', 'The correct answer was:').replace('resumen', 'summary');
            }
    
            slide.add([currentPlayerText, questionText, answerComparisonText, summaryText, characterSprite]);
            slide.setVisible(false);
    
            this.questionSlides.push(slide);
        });
    
        // Show the first slide
        this.currentSlideIndex = 0;
        this.questionSlides[this.currentSlideIndex].setVisible(true);
    
        // Set up the next button
        this.nextButton = this.add.rectangle(577, 303, 50, 50, 0xffffff, 0).setInteractive().setOrigin(0);
    
        // Set up the previous button
        this.prevButton = this.add.rectangle(250, 303, 50, 50, 0xffffff, 0).setInteractive().setOrigin(0);
    
        // Associate events with the buttons
        this.nextButton.on('pointerdown', () => {
            this.showNextSlide();
        });
        this.nextButton.on('pointerover', () => {
            document.body.style.cursor = 'pointer';
        });
        this.nextButton.on('pointerout', () => {
            document.body.style.cursor = 'default';
        });
        this.prevButton.on('pointerdown', () => {
            this.showPrevSlide();
        });
        this.prevButton.on('pointerover', () => {
            document.body.style.cursor = 'pointer';
        });
        this.prevButton.on('pointerout', () => {
            document.body.style.cursor = 'default';
        });
    }
    
    
    
    
    showNextSlide() {
        if (this.currentSlideIndex < this.questionSlides.length - 1) {
            this.questionSlides[this.currentSlideIndex].setVisible(false);
            this.currentSlideIndex++;
            this.questionSlides[this.currentSlideIndex].setVisible(true);
    
            // Verificar si estamos en la última diapositiva
            if (this.currentSlideIndex === this.questionSlides.length - 1) {
                this.statisticsText.setVisible(true); // Mostrar el texto "Ver Estadísticas"
            } else {
                this.statisticsText.setVisible(false); // Ocultar el texto en otras diapositivas
            }
        } else {
            // Estás en la última diapositiva
        }
    }
    
    showPrevSlide() {
        if (this.currentSlideIndex > 0) {
            this.questionSlides[this.currentSlideIndex].setVisible(false);
            this.currentSlideIndex--;
            this.questionSlides[this.currentSlideIndex].setVisible(true);
             // Verificar si estamos en la última diapositiva
             if (this.currentSlideIndex === this.questionSlides.length - 1) {
                this.statisticsText.setVisible(true); // Mostrar el texto "Ver Estadísticas"
            } else {
                this.statisticsText.setVisible(false); // Ocultar el texto en otras diapositivas
            }
        }
    }
    
    

    showStatistics() {
        const language = this.scene.get("Idioma").language;

        this.statisticsText.setVisible(false); 
        // Ocultar los botones de siguiente y anterior
        this.nextButton.setVisible(false);
        this.prevButton.setVisible(false);
    
        // Eliminar la última diapositiva
        this.questionSlides[this.currentSlideIndex].destroy();
        this.questionSlides.pop();
    
        // Calcular y mostrar las estadísticas
        const statsPlayer1 = this.generateStatsTable('Jugador 1', this.calculateStats('p1'));
        const statsPlayer2 = this.generateStatsTable('Jugador 2', this.calculateStats('p2'));
    
        // Posicionar las tablas de estadísticas
        statsPlayer1.setPosition(126, 173); 
        statsPlayer2.setPosition(510, 173); 
    
        // Crear el botón de volver a detalles
        const continueButtonText = language === 'en' ? 'Back to Details' : 'Volver a detalles';
        const continueButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height/2 - 20, continueButtonText, { fontFamily: 'BMmini', fontSize: 14, color: '#b35410' , align: 'center'}).setOrigin(0.5).setDepth(1000).setInteractive();
        continueButton.on('pointerdown', () => {
            this.scene.start('OverlayMessage');
        });

        // Crear el botón de reinicio
        const restartButtonText = language === 'en' ? 'Restart Game' : 'Reiniciar juego';
        const restartButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 28, restartButtonText, { fontFamily: 'BMmini', fontSize: 14, color: '#b35410' , align: 'center'}).setOrigin(0.5).setDepth(1000).setInteractive();

        // Cambiar el cursor al pasar el ratón sobre los botones
        continueButton.on('pointerover', () => {
            continueButton.setStyle({cursor: 'pointer'});
        });
        continueButton.on('pointerout', () => {
            continueButton.setStyle({cursor: 'default'});
        });
        restartButton.on('pointerover', () => {
            restartButton.setStyle({cursor: 'pointer'});
        });
        restartButton.on('pointerout', () => {
            restartButton.setStyle({cursor: 'default'});
        });
    
        
    
        // Al hacer clic en el botón de reinicio
        restartButton.on('pointerdown', () => {
            // Recargar la página web completa
            window.location.reload();
        });
    }
    
    

    
    calculateStats(playerKey) {
        const questionHistory = this.scene.get('Pelea').questionHistory;
        const answeredQuestions = questionHistory.filter(question => question.respuesta_jugador !== null && question.currentPlayer === playerKey);
        const correctAnswers = answeredQuestions.filter(question => question.respuesta_jugador === question.respuesta_correcta);
        const accuracy = (correctAnswers.length / answeredQuestions.length) * 100 || 0;
    
        return {
            answeredQuestions: answeredQuestions.length,
            correctAnswers: correctAnswers.length,
            accuracy: accuracy.toFixed(2) + '%'
        };
    }

    

    generateStatsTable(playerName, stats) {
        // Obtener el idioma desde la escena "Idioma"
        const language = this.scene.get("Idioma").language;
    
        let translatedPlayerName;
        if (playerName === 'Jugador 1') {
            translatedPlayerName = language === 'en' ? 'Player 1' : 'Jugador 1';
        } else {
            translatedPlayerName = language === 'en' ? 'Player 2' : 'Jugador 2';
        }
    
        const table = this.add.text(0, 0, `${translatedPlayerName}\n\n\n\n\n${language === 'en' ? 'Statistics' : 'Estadísticas'}\n${language === 'en' ? 'of the questions' : 'de las preguntas'}\n\n${language === 'en' ? 'Answered' : 'Contestó'}: ${stats.answeredQuestions}\n\n${language === 'en' ? 'Correct' : 'Acertó'}: ${stats.correctAnswers}\n\n${language === 'en' ? 'Success' : 'Porcentaje'}\n${language === 'en' ? 'percentage' : 'de acierto'}:\n ${stats.accuracy}`, { fontFamily: 'BMmini', fontSize: 16, color: '#b35410', align: 'center' , lineSpacing: -4});
        table.setOrigin(0.5);
        return table;
    }
    
    
}



const config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 360,
    parent: 'game',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [InicioJuego, Idioma, SelectorPersonaje, Pelea, OverlayMessage] // Añadir la escena SelectorPersonaje al array de escenas
};

let game = new Phaser.Game(config);
