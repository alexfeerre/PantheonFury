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
            this.sound.play('BUTTONEF2');
            this.scene.start('SelectorPersonaje'); // Cambiar a la escena de selección de personaje cuando se presiona el botón
        });
    }

    // Cambiar el cursor a su estado normal cuando se inicia la escena de selección de personaje
    update() {
        this.scene.get('SelectorPersonaje').events.on('start', () => {
            document.body.style.cursor = 'default';
        });
    }
}


class SelectorPersonaje extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectorPersonaje' });
    }

    preload(){
         
        this.load.audio('BUTTONEF2', 'audios/BUTTONEFECT2.mp3');
        this.load.audio('CHARACTERSELECTED', 'audios/CHARACTERSELECTED.mp3');
        this.load.audio('CHOOSE', 'audios/CHOOSE.mp3');

        
    }
    create() {
        this.sound.play('CHOOSE',{volume: 0.5});
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
    
        // Fondo negro para la pantalla de selección de personajes
        this.cameras.main.setBackgroundColor('#000');
    
        // Texto de turno de elección para el jugador 1
        this.turnText = this.add.text(screenWidth / 2, screenHeight * 0.1, 'JUGADOR 1 ELIGE', { 
            fontSize: '22px',
            fill: '#fff', 
            fontFamily: 'BMmini',
            resolution: 1
        }).setOrigin(0.5);
    
        // Variable para almacenar la elección de cada jugador
        this.p1 = null;
        this.p2 = null;
    
        // Botones para seleccionar personajes
        const buttonWidth = 100;
        const buttonHeight = 30;
        const buttonSpacing = 20;
        const totalButtonWidth = buttonWidth * 3 + buttonSpacing * 2;
    
        const button1X = screenWidth / 2 - totalButtonWidth / 2 + buttonWidth / 2;
        const button2X = screenWidth / 2 - totalButtonWidth / 2 + buttonWidth + buttonSpacing + buttonWidth / 2;
        const button3X = screenWidth / 2 - totalButtonWidth / 2 + (buttonWidth + buttonSpacing) * 2 + buttonWidth / 2;
        const startY = screenHeight * 0.4;
    
        // Los botones también se establecen en 6px y se desactiva el antialiasing para mantener la coherencia visual
        this.button1 = this.add.text(button1X, startY, 'Zeus', { fontSize: '12px', fill: '#fff', resolution: 1 }).setInteractive().setOrigin(0.5);
        this.button2 = this.add.text(button2X, startY, 'Poseidón', { fontSize: '12px', fill: '#fff', resolution: 1 }).setInteractive().setOrigin(0.5);
        this.button3 = this.add.text(button3X, startY, 'Hades', { fontSize: '12px', fill: '#fff', resolution: 1 }).setInteractive().setOrigin(0.5);
          // Eventos de clic para los botones de selección de personajes
        this.button1.on('pointerdown', () => {
            if (!this.p1) {
                this.p1 = 'Zeus';
                this.sound.play('CHARACTERSELECTED');
                this.nextPlayerTurn();
            } else if (!this.p2) {
                if (this.p1 !== 'Zeus') {
                    this.p2 = 'Zeus';
                    this.sound.play('CHARACTERSELECTED');
                    this.nextPlayerTurn();
                } else {
                    this.turnText.setText('Jugador 1 ya eligió este personaje. Elige otro.');
                }
            }
        });

        this.button2.on('pointerdown', () => {
            if (!this.p1) {
                this.p1 = 'Poseidon';
                this.sound.play('CHARACTERSELECTED');
                this.nextPlayerTurn();
            } else if (!this.p2) {
                if (this.p1 !== 'Poseidon') {
                    this.p2 = 'Poseidon';
                    this.sound.play('CHARACTERSELECTED');
                    this.nextPlayerTurn();
                } else {
                    this.turnText.setText('Jugador 1 ya eligió este personaje. Elige otro.');
                }
            }
        });

        this.button3.on('pointerdown', () => {
            if (!this.p1) {
                this.p1 = 'Hades';
                this.sound.play('CHARACTERSELECTED');
                this.nextPlayerTurn();
            } else if (!this.p2) {
                if (this.p1 !== 'Hades') {
                    this.p2 = 'Hades';
                    this.sound.play('CHARACTERSELECTED');
                    this.nextPlayerTurn();
                } else {
                    this.turnText.setText('Jugador 1 ya eligió este personaje. Elige otro.');
                }
            }
        });
      
    }

    nextPlayerTurn() {
        if (!this.p1) {
            this.turnText.setText('Turno de elección del Jugador 1');
        } else if (!this.p2) {
            this.turnText.setText('Turno de elección del Jugador 2');
        } else {
            // Ambos jugadores han elegido personajes
            console.log('Jugador 1 ha elegido: ' + this.p1);
            console.log('Jugador 2 ha elegido: ' + this.p2);
            // Desactivar botones de selección
            this.disableCharacterSelectionButtons();
            // Mostrar mensaje de ambos jugadores han elegido
            this.turnText.setText('¡Ambos jugadores han elegido! ¡Comienza la cuenta atrás!');
            // Iniciar cuenta atrás
            this.startCountdown();
        }
    }

    disableCharacterSelectionButtons() {
        // Desactivar eventos de clic para los botones de selección de personaje
        this.button1.disableInteractive();
        this.button2.disableInteractive();
        this.button3.disableInteractive();
    }

    startCountdown() {
        let counter = 5; // Contador de 5 segundos
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
    
        // Crear texto para mostrar el contador
        let countdownText = this.add.text(screenWidth / 2, screenHeight * 0.6, 'Tiempo restante: ' + counter, { fontSize: '12px', fill: '#fff' }).setOrigin(0.5);
    
       
    
        // Actualizar el contador cada segundo
        let countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                counter--;
    
                // Actualizar el texto del contador
                countdownText.setText('Tiempo restante: ' + counter);
    
                // Verificar si el contador llega a cero
                if (counter === 0) {
                    countdownTimer.remove(); // Detener el contador
    
                                 
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
                        this.scene.start('Pelea', { p1: this.p1, p2: this.p2 });
                    });
                }
            },
            callbackScope: this,
            loop: true // Hacer que el contador se repita
        });
    
        // Botón para cancelar la selección de personajes y volver al inicio
        let cancelButton = this.add.text(screenWidth / 2, screenHeight * 0.7, 'Cancelar Selección', { fontSize: '12px', fill: '#fff' }).setInteractive().setOrigin(0.5);
        cancelButton.on('pointerdown', () => {
            this.sound.play('BUTTONEF1');
            this.p1 = null;
            this.p2 = null;
            this.scene.start('SelectorPersonaje'); // Volver a la pantalla de inicio
        });
    }
}



class Pelea extends Phaser.Scene {
    constructor() {
        super({ key: 'Pelea' });

        // Variables para la vida de cada personaje
        this.characterHealth = 100;
        this.character2Health = 100;

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

        this.load.json('questions', 'data/data.json'); 
    }

    create(data) {
      
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
            this.backgroundMusic = this.sound.add('music_hades', { loop: true, volume: 0.3 });
            
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
        this.player1Button = this.createPlayerButton(65, 297, 'p1', p1).setScale(2.3).setDepth(999);
        this.player2Button = this.createPlayerButton(575, 297, 'p2', p2).setScale(2.3).setDepth(999);

             // Agregar evento de clic para los botones de jugador
             this.player1Button.on('pointerdown', () => {
                if (!this.isShowingQuestion && this.currentPlayer === 'p1') {
                    this.showQuestionOverlay(data.p1);
                    this.player1Button.disableInteractive(); // Deshabilitar el botón después de hacer clic
                }
            });
            

            this.player2Button.on('pointerdown', () => {
                if (!this.isShowingQuestion && this.currentPlayer === 'p2') {
                    this.showQuestionOverlay(data.p2);
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

  

// Función para mostrar el overlay de la pregunta
showQuestionOverlay(characterKey) {
    // Verificar si ya se está mostrando una pregunta
    if (this.isShowingQuestion) {
        return;
    }
    
    // Obtener una pregunta aleatoria del JSON
    const randomQuestion = Phaser.Math.RND.pick(this.questionsData);
    
    // Mostrar overlay con la pregunta y opciones
    this.questionOverlay = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setOrigin(0.5).setScale(3.4).setDepth(1100);
    this.questionText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 48, randomQuestion.pregunta, { fontFamily: 'BMmini', fontSize: 16, color: '#b35410', wordWrap: { width: 340 } }).setOrigin(0.5).setDepth(1101);

   // Crear botones para las opciones de respuesta
this.answerButtons = [];
const startX = this.sys.game.canvas.width / 2 - 100; // Ajustar el inicio de la primera columna
const startY = this.sys.game.canvas.height / 2 + 10; 
randomQuestion.opciones.forEach((opcion, index) => {
    const columnIndex = index % 2; // Calcular la columna actual
    const rowIndex = Math.floor(index / 2); // Calcular la fila actual
    const buttonX = startX + columnIndex * 200; // Calcular la coordenada x del botón
    const buttonY = startY + rowIndex * 40; // Calcular la coordenada y del botón
    const button = this.add.text(buttonX, buttonY, opcion, { fontFamily: 'BMmini', fontSize: 14, color: '#b35410' }).setOrigin(0.5).setInteractive().setDepth(1101);
    button.on('pointerdown', () => {
        this.processAnswer(characterKey, opcion, randomQuestion.respuesta_correcta);
        this.removeQuestionOverlay(); // Eliminar el overlay después de responder
    });
    this.answerButtons.push(button);
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

    // Al responder correctamente
    if (selectedAnswer === correctAnswer) {
        this.sound.play('RIGHT',{ volume: 0.5 });

        // Ejecutar animación de ataque
        this.attackAnimation(characterKey, this.currentPlayer === 'p1' ? this.character : this.character2);
    } else {
        this.sound.play('WRONG',{ volume: 0.5 });

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
            break;
        case 'Poseidon':
            frameToReceive = 27;
            break;
        case 'Hades':
            frameToReceive = 25;
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
   
    this.updateHealthBar1(); // Actualizar la barra de vida del jugador 1
    this.player1HealthText.setText(`Player 1 Health: ${this.characterHealth}`); // Actualizar el texto de los puntos de vida del jugador 1
}

reduceCharacter2Health(damage) {
    this.character2Health -= damage;
    
    this.updateHealthBar2(); // Actualizar la barra de vida del jugador 2
    this.player2HealthText.setText(`Player 2 Health: ${this.character2Health}`); // Actualizar el texto de los puntos de vida del jugador 2
}
// Función para mostrar el overlay de turno
showTurnOverlay() {
  
    // Deshabilitar interactividad de los botones durante la visualización del overlay
    this.player1Button.disableInteractive();
    this.player2Button.disableInteractive();
    
    // Mostrar overlay de turno con el jugador actual
    const overlayText = this.currentPlayer === 'p1' ? 'JUGADOR 1' : 'JUGADOR 2';
    const overlayMessage = `${overlayText}, TU TURNO`;

    // Crear un contenedor para el overlay
    const overlayContainer = this.add.container(0, 0).setDepth(1000);

    // Agregar la imagen de fondo del overlay
    const overlayBackground = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'overlay').setOrigin(0.5).setScale(3.4);
    overlayContainer.add(overlayBackground);

    // Mostrar overlay con el texto
    const overlayTextObject = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, overlayMessage, { fontFamily: 'BMmini', fontSize: 22, color: '#b35410' }).setOrigin(0.5);
    overlayContainer.add(overlayTextObject);

    // Configurar duración del overlay (3 segundos)
    this.time.delayedCall(1500, () => {
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
            this.scene.start('OverlayMessage', { winner: winner }); // Volver a la pantalla de inicio
            return;
        }
    }
    
    checkWinner() {
        // Escuchar el evento 'animationcomplete' de la barra de vida 1
        this.healthBar1.once('animationcomplete', () => {
            if (this.healthBar1.anims.currentAnim.key === 'BARRA1_0') {
                if (this.characterHealth <= 0) {
                    this.showTurnOverlay.setAlpha(0)

    
                    this.scene.get('Pelea').backgroundMusic.stop();
                    this.scene.start('OverlayMessage', { winner: 'Jugador 2' });
                    this.scene.stop('Pelea');
                }
            }
        });
    
        // Escuchar el evento 'animationcomplete' de la barra de vida 2
        this.healthBar2.once('animationcomplete', () => {
            if (this.healthBar2.anims.currentAnim.key === 'BARRA2_0') {
                if (this.character2Health <= 0) {
                   this.showTurnOverlay.setAlpha(0)
    
                    this.scene.get('Pelea').backgroundMusic.stop();
                    this.scene.start('OverlayMessage', { winner: 'Jugador 1' });
                    this.scene.stop('Pelea');
                }
            }
        });
    }
    
    
    

    update() {
        // Verificar si algún personaje ha perdido toda su vida
        this.checkWinner();
      

    }
    
}

class OverlayMessage extends Phaser.Scene {
    constructor() {
        super({ key: 'OverlayMessage' });
    }

    preload() {
        this.load.audio('VICTORY', 'audios/VICTORYSOUND.mp3');
    }

    create(data) {

           // Detener la música con un fadeout gradual
           if (this.scene.get('Pelea').backgroundMusic) {
            
                    this.scene.get('Pelea').backgroundMusic.stop();
           }
        const winner = data.winner; // Obtener el ganador de los datos pasados desde la escena anterior


        // Eliminar todo lo que hay en la pantalla
        this.children.removeAll();

        // Establecer el fondo en negro
        this.cameras.main.setBackgroundColor('#000000');

        // Mostrar el mensaje de ganador
        const winnerText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, `${winner} ha ganado!`, { fontFamily: 'BMmini', fontSize: 48, color: '#ffffff' }).setOrigin(0.5);
        winnerText.setDepth(1001);

        // Crear el botón de reinicio
        const restartButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 100, 'Restart', { fontFamily: 'BMmini', fontSize: 32, color: '#ffffff' }).setOrigin(0.5);
        restartButton.setDepth(1002);

        // Establecer el estilo del botón de reinicio
        restartButton.setStyle({ color: '#ffffff', padding: { x: 10, y: 5 } }).setInteractive().setDepth(1090).setAlpha(1);

        // Cambiar el cursor al pasar el ratón sobre el botón de reinicio
        restartButton.on('pointerover', () => {
            restartButton.setStyle({ color: '#ffffff', cursor: 'pointer' }).setInteractive().setDepth(1090).setAlpha(1);
        });

        // Restaurar el estilo cuando el cursor deje el botón de reinicio
        restartButton.on('pointerout', () => {
            restartButton.setStyle({ color: '#ffffff', cursor: 'default' }).setInteractive().setDepth(1090).setAlpha(1);
        });

        this.sound.play('VICTORY', { volume: 0.5 });

        restartButton.on('pointerdown', () => {
            // Recargar la página web completa
            window.location.reload();
        });
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
    scene: [InicioJuego, SelectorPersonaje, Pelea, OverlayMessage] // Añadir la escena SelectorPersonaje al array de escenas
};

let game = new Phaser.Game(config);
