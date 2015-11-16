/// <reference path="phaser/typescript/phaser.d.ts"/>
window.onload = function () {
    var game = new QuedaLivre.Main();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var Basket = (function (_super) {
        __extends(Basket, _super);
        function Basket(game, x, y, group, text, can_close, closing_time) {
            var _this = this;
            _super.call(this, game, x, y, 'basket', 0);
            var styl = { font: "34px Conv_BradBunR", fill: "white", align: "center", wordWrap: true, wordWrapWidth: 650, lineSpacing: -10, stroke: "black", strokeThickness: 3 };
            var b, t;
            game.add.existing(this);
            this.scale.x = this.scale.y = 0.75;
            var a1, a2, fps = 8;
            a1 = this.animations.add("close");
            if (can_close) {
                a1.onComplete.add(function (obj) {
                    _this.game.time.events.add(closing_time, function (ob) { ob.play("open", fps, false); }, _this, obj);
                }, this);
                a2 = this.animations.add("open", [4, 3, 2, 1, 0]);
                a2.onComplete.add(function (obj) {
                    _this.game.time.events.add(closing_time, function (ob) { ob.play("close", fps, false); }, _this, obj);
                }, this);
                this.play("close", 8, false);
            }
            t = this.game.add.text(130, 115, text, styl);
            t.setShadow(2, 2, "black", 0);
            this.addChild(t);
            t.anchor.x = 0.5;
            group.add(this);
            this.body.setSize(92, 70, 62, 80);
            this.body.immovable = true;
            this.x_error = this.game.add.image(this.x + 95, this.y + 95, "x_error");
            this.x_error.anchor.setTo(0.5, 0.5);
            this.x_error.visible = false;
        }
        Basket.prototype.startXError = function () {
            this.x_error.visible = true;
            this.game.add.tween(this.x_error.scale).to({ x: 1.5, y: 1.5 }, 250, Phaser.Easing.Linear.None, true, 0, 2, true);
        };
        Basket.prototype.startParticles = function (game) {
            this.particleEmitter = game.add.emitter(0, 0, 100);
            this.particleEmitter.makeParticles('estrela');
            this.particleEmitter.gravity = 70;
            this.particleEmitter.x = this.x + 100;
            this.particleEmitter.y = this.y + 50;
            this.particleEmitter.start(true, 3000, null, 5);
        };
        Basket.prototype.dispose = function () {
            if (this.particleEmitter)
                this.particleEmitter.removeChildren();
            this.x_error.kill();
            this.kill();
        };
        return Basket;
    })(Phaser.Sprite);
    QuedaLivre.Basket = Basket;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'img/hud/loader.png');
            this.load.image('preloadBarBG', 'img/hud/loader_bg.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    QuedaLivre.Boot = Boot;
})(QuedaLivre || (QuedaLivre = {}));
var QuedaLivre;
(function (QuedaLivre) {
    var HUDSystem = (function (_super) {
        __extends(HUDSystem, _super);
        function HUDSystem(game, m, parent, name, addToStage, enableBody, physicsBodyType) {
            _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
            this.main = m;
            this.henrique = this.game.add.image(-512, 300, "henrique", 1, this);
            this.modal = this.game.add.image(this.game.world.centerX, 70, "modal_hud", 0, this);
            this.modal.anchor.x = this.modal.anchor.y = 0.5;
            this.timer = this.game.add.image(35, 60, "timer_hud", 0, this);
            this.vidas = this.game.add.image(870, 60, "vidas_hud", 0, this);
            this.pause = this.game.add.sprite(944, 5, "pause_btn", 0, this);
            this.pause.inputEnabled = true;
            this.pause.input.useHandCursor = true;
            this.pause.events.onInputUp.add(this.pauseGame, this);
            this.pause.input.priorityID = 1;
            this.question = this.game.add.text(this.game.world.centerX, 24, "Questão 5\nQuestão teste teste", null, this);
            this.question.anchor.x = 0.5;
            this.question.wordWrap = true;
            this.question.wordWrapWidth = 650;
            this.question.align = "center";
            this.question.fill = "white";
            this.question.font = "Conv_BradBunR";
            this.question.fontSize = 28;
            this.question.lineSpacing = -10;
            this.question.setShadow(2, 2, "black", 0);
            this.question.stroke = "black";
            this.question.strokeThickness = 2;
            this.timer_countdown = this.game.add.text(90, 75, "99:99", null, this);
            this.timer_countdown.anchor.x = 0.5;
            this.timer_countdown.fill = "white";
            this.timer_countdown.font = "Conv_BradBunR";
            this.timer_countdown.fontSize = 32;
            this.timer_countdown.setShadow(2, 2, "#295e0a", 0);
            this.timer_countdown.stroke = "#295e0a";
            this.timer_countdown.strokeThickness = 2;
            this.life = this.game.add.text(965, 75, "x 99", null, this);
            this.life.anchor.x = 0.5;
            this.life.fill = "white";
            this.life.font = "Conv_BradBunR";
            this.life.fontSize = 32;
            this.life.setShadow(2, 2, "#295e0a", 0);
            this.life.stroke = "#295e0a";
            this.life.strokeThickness = 2;
            this.graphics = this.game.add.graphics(0, 0, this);
            this.graphics.beginFill(0x000000, 0.98);
            this.graphics.drawRect(0, 0, this.game.width, this.game.height);
            this.graphics.endFill();
            this.graphics.visible = false;
            this.pauseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "PAUSE", null, this);
            this.pauseText.anchor.y = this.pauseText.anchor.x = 0.5;
            this.pauseText.fill = "white";
            this.pauseText.stroke = "#659446";
            this.pauseText.strokeThickness = 15;
            this.pauseText.font = "Conv_BradBunR";
            this.pauseText.fontSize = 130;
            this.pauseText.visible = false;
            this.play = this.game.add.sprite(this.game.world.centerX - 27.5, this.pauseText.y + (this.pauseText.height / 1.5) - 25, "play_btn", 0, this);
            this.play.visible = false;
            this.play.inputEnabled = true;
            this.play.input.useHandCursor = true;
            this.play.input.priorityID = 1;
            this.transition_time = 300;
            this.barPos = { hidey: -62, showy: 0 };
            this.fecharPos = { hidey: -62, showy: 5 };
            this.duvidaPos = { hidey: -62, showy: 5 };
            this.musicaPos = { hidey: -62, showy: 5 };
            this.titlePos = { hidey: -68, showy: -6 };
            this.bar = this.game.add.image(0, this.barPos.hidey, "bar_hud", 0, this);
            this.fechar = this.game.add.sprite(944, this.fecharPos.hidey, "fechar_btn", 0, this);
            this.fechar.inputEnabled = true;
            this.fechar.input.useHandCursor = true;
            this.fechar.input.priorityID = 1;
            this.duvida = this.game.add.sprite(880, this.duvidaPos.hidey, "duvida_btn", 0, this);
            this.duvida.inputEnabled = true;
            this.duvida.input.useHandCursor = true;
            this.duvida.input.priorityID = 1;
            this.musica = this.game.add.sprite(816, this.musicaPos.hidey, "musica_btn", 0, this);
            this.musica.inputEnabled = true;
            this.musica.input.useHandCursor = true;
            this.title = this.game.add.text(this.game.world.centerX, this.titlePos.hidey, "QUEDA LIVRE", null, this);
            this.title.anchor.x = 0.5;
            this.title.fill = "white";
            this.title.stroke = "#659446";
            this.title.strokeThickness = 12;
            this.title.font = "Conv_BradBunR";
            this.title.fontSize = 52;
            this.audio_button = this.game.add.audio('sfx_cliquebotao');
        }
        HUDSystem.prototype.pauseGame = function () {
            var _this = this;
            this.audio_button.play();
            this.pause.visible = false;
            this.game.time.events.add(this.transition_time + 50, function () { _this.game.paused = true; _this.game.world.addChild(_this); }, this);
            this.play.visible = true;
            this.graphics.visible = true;
            this.pauseText.visible = true;
            this.game.input.onUp.add(this.returnGame, this);
            this.game.world.addChild(this);
            this.game.add.tween(this.bar).to({ y: this.barPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.fechar).to({ y: this.fecharPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.duvida).to({ y: this.duvidaPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.musica).to({ y: this.musicaPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.title).to({ y: this.titlePos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.main.releaseButton.events.onInputDown.remove(this.main.onClickOnMonster, this.main);
        };
        HUDSystem.prototype.returnGame = function (event) {
            // during the pause, the update menu doens't work
            // so the verification is like Jorge, they want to be hardcore WoW
            if (this.onClickPausedMenu(event, this.play)) {
                this.audio_button.play();
                this.game.paused = false;
                this.pause.visible = true;
                this.play.visible = false;
                this.graphics.visible = false;
                this.pauseText.visible = false;
                this.game.add.tween(this.bar).to({ y: this.barPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.fechar).to({ y: this.fecharPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.duvida).to({ y: this.duvidaPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.musica).to({ y: this.musicaPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.title).to({ y: this.titlePos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.main.releaseButton.events.onInputDown.add(this.main.onClickOnMonster, this.main);
            }
            if (this.onClickPausedMenu(event, this.musica)) {
                console.log("musica");
                this.audio_button.play();
            }
            if (this.onClickPausedMenu(event, this.fechar)) {
                console.log("fechar");
                this.audio_button.play();
            }
            if (this.onClickPausedMenu(event, this.duvida)) {
                console.log("duvida");
                this.audio_button.play();
            }
        };
        HUDSystem.prototype.onClickPausedMenu = function (event, buttonToCheck) {
            /*console.log(event.x + " - " + event.y);
            console.log(buttonToCheck.x + " - " + buttonToCheck.y);
            console.log(buttonToCheck.width + " - " + buttonToCheck.height);
            console.log("-----------");*/
            if (event.x > buttonToCheck.x && event.x < (buttonToCheck.width + buttonToCheck.x) &&
                event.y > buttonToCheck.y && event.y < (buttonToCheck.height + buttonToCheck.y)) {
                return true;
            }
            return false;
        };
        HUDSystem.prototype.setTimer = function (t) {
            this.timer_seconds = t;
            var myDate = new Date(null, null, null, null, null, this.timer_seconds).toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, "$2");
            this.timer_countdown.text = myDate.toString();
            this.timer_controller = new Phaser.Timer(this.game, false);
            this.game.time.add(this.timer_controller);
            this.timer_controller.loop(1000, this.updateTimer, this);
            this.timer_controller.start();
        };
        HUDSystem.prototype.pauseTimer = function () { this.timer_controller.pause(); };
        HUDSystem.prototype.resumeTimer = function () { this.timer_controller.resume(); };
        HUDSystem.prototype.updateTimer = function (t) {
            if (this.timer_seconds <= 0) {
                this.main.setBasketMiss(true);
                this.main = null;
                return;
            }
            this.timer_seconds--;
            var myDate = new Date(null, null, null, null, null, this.timer_seconds).toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, "$2");
            this.timer_countdown.text = myDate.toString();
        };
        HUDSystem.prototype.destroyTimer = function () {
            this.timer_controller.stop();
            this.timer_controller.destroy();
        };
        HUDSystem.prototype.setLife = function (l) {
            this.life.text = "x " + l;
            this.life_count = parseInt(l);
        };
        HUDSystem.prototype.loseHeart = function () {
            this.life_count--;
            this.life.text = "x " + this.life_count.toString();
            if (this.life_count <= 0) {
                this.main.setBasketMiss(true);
                this.main = null;
            }
        };
        HUDSystem.prototype.showComemoration = function () {
            this.game.add.tween(this.henrique).to({ x: -200 }, 1500, Phaser.Easing.Elastic.Out, true, 0, 0, true);
        };
        HUDSystem.prototype.dispose = function () {
            this.life_count = 0;
            this.timer_seconds = 0;
            this.audio_button.destroy();
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.pause.events.onInputUp.remove(this.pauseGame, this);
            this.game.input.onUp.remove(this.returnGame, this);
            this.game.input.onUp.remove(this.onClickPausedMenu, this);
            this.destroyTimer();
            this.henrique.destroy();
            this.bar.destroy();
            this.modal.destroy();
            this.timer.destroy();
            this.vidas.destroy();
            this.pause.destroy();
            this.fechar.destroy();
            this.duvida.destroy();
            this.musica.destroy();
            this.play.destroy();
            this.title.destroy();
            this.question.destroy();
            this.life.destroy();
            this.timer_countdown.destroy();
            this.timer_controller.destroy();
            this.graphics.destroy();
            this.pauseText.destroy();
            this.main = null;
            this.destroy();
        };
        return HUDSystem;
    })(Phaser.Group);
    QuedaLivre.HUDSystem = HUDSystem;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this, 1024, 768, Phaser.AUTO, 'content', null);
            this.state.add('Boot', QuedaLivre.Boot, false);
            this.state.add('Preloader', QuedaLivre.Preloader, false);
            this.state.add('MainMenu', QuedaLivre.MainMenu, false);
            this.state.add('MainGame', QuedaLivre.MainGame, false);
            this.state.add('YouWin', QuedaLivre.YouWin, false);
            this.state.add('YouLose', QuedaLivre.YouLose, false);
            this.state.start('Boot');
        }
        return Main;
    })(Phaser.Game);
    QuedaLivre.Main = Main;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
        }
        MainGame.prototype.preload = function () {
            this.game.load.json('level', 'level/level1.json?v=' + Math.random());
        };
        MainGame.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.level_data = this.game.cache.getJSON('level');
            var level_design = this.level_data.level_design_sequence;
            var challenge = this.level_data.challenge;
            var aux_baskets;
            this.shuffle(challenge);
            if (challenge.length > level_design.length)
                challenge.splice(level_design.length);
            else if (challenge.length < level_design.length)
                alert("Erro: Número de questões menor que o design desenvolvido");
            for (var i = 0; i < level_design.length; i++) {
                challenge[i].monster_tween_time = level_design[i].monster_tween_time;
                challenge[i].adversities = level_design[i].adversities;
                aux_baskets = challenge[i].wrong_baskets;
                aux_baskets.unshift(challenge[i].right_basket);
                challenge[i].baskets = level_design[i].baskets;
                challenge[i].pipes = level_design[i].pipes;
                for (var j = 0; j < challenge[i].baskets.length; j++) {
                    challenge[i].baskets[j].text = aux_baskets[j];
                    challenge[i].baskets[j].is_correct = (j == 0);
                }
                this.shuffle(challenge[i].baskets);
            }
            this.level_data.challenge = challenge;
            this.level_count = -1;
            this.game.load.image("bg", this.level_data.background, false);
            for (var i = 0; i < this.level_data.challenge.length; i++) {
                this.game.load.spritesheet("objeto" + i, this.level_data.challenge[i].sprite_object, 256, 256, 1);
            }
            this.game.load.spritesheet("basket", this.level_data.sprite_baskets, 256, 256, 5);
            this.game.load.onLoadComplete.add(this.onFinishLoadAssets, this);
            this.game.load.start();
        };
        MainGame.prototype.onFinishLoadAssets = function () {
            this.game.load.onLoadComplete.remove(this.onFinishLoadAssets, this);
            this.bg = this.game.add.image(0, 0, "bg");
            this.bg.alpha = 1;
            this.monster = this.game.add.sprite(0, 120, "monster", 0);
            this.monster.animations.add("fly", Phaser.Animation.generateFrameNames('monstro_animado_novo', 1, 67, '.png', 4), 24, true);
            this.monster.animations.add("lose", Phaser.Animation.generateFrameNames('monstro_animado_novo', 68, 109, '.png', 4), 24, false);
            this.monster.animations.add("win", Phaser.Animation.generateFrameNames('monstro_animado_novo', 110, 127, '.png', 4), 24, false);
            this.monster.play("fly");
            this.baskets = this.game.add.group();
            this.hud = new QuedaLivre.HUDSystem(this.game, this, this.world);
            this.hud.title.text = this.level_data.title;
            this.hud.setTimer(this.level_data.timer);
            this.hud.setLife(this.level_data.life);
            this.generateNewLevel();
            var g = new Phaser.Graphics(this.game, 0, 0);
            g.beginFill(0xff0000, 0.0);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            this.releaseButton = this.game.add.sprite(0, 0);
            this.releaseButton.addChild(g);
            this.releaseButton.inputEnabled = true;
            this.releaseButton.input.useHandCursor = true;
            this.releaseButton.input.priorityID = 0;
            this.releaseButton.events.onInputDown.add(this.onClickOnMonster, this);
            this.audio_falling = this.game.add.audio('sfx_itemcaindo');
            this.audio_hit = this.game.add.audio('sfx_acerto');
            this.audio_miss = this.game.add.audio('sfx_erro');
            this.game_started = true;
            //this.add.tween(this.bg).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut, true);
        };
        MainGame.prototype.update = function () {
            if (!this.game_started)
                return;
            if (!this.is_hitted) {
                this.game.physics.arcade.collide(this.actual_item, this.baskets, this.basketCollideHandler, null, this);
                if (this.actual_item.y >= this.world.bounds.bottom - this.actual_item.height) {
                    this.is_hitted = true;
                    this.setBasketMiss();
                }
                if (this.pipes)
                    this.pipes.checkColision(this.actual_item);
            }
        };
        MainGame.prototype.render = function () {
            /*
            if (this.baskets && this.baskets.length > 0)
            {
                this.baskets.forEach((obj) => {
                    this.game.debug.body(obj);
                }, this);
            }
            
            if (this.actual_item && this.actual_item.body) {
                this.game.debug.body(this.actual_item);
            }
            
            if (this.pipes && this.pipes.entrance_pipes && this.pipes.entrance_pipes.length > 0) {
                this.pipes.entrance_pipes.forEach((obj) => {
                    this.game.debug.body(obj);
                }, this);
            }
            */
        };
        MainGame.prototype.onClickOnMonster = function () {
            if (this.falling)
                return;
            this.falling = true;
            this.audio_falling.play();
            this.monster_tween.stop(false);
            this.hud.pauseTimer();
            var wx = this.actual_item.world.x;
            var wy = this.actual_item.world.y;
            this.monster.removeChild(this.actual_item);
            this.game.world.addChild(this.actual_item);
            this.actual_item.x = wx;
            this.actual_item.y = wy;
            this.game.physics.enable(this.actual_item, Phaser.Physics.ARCADE);
            this.actual_item.body.collideWorldBounds = true;
            this.actual_item.body.gravity.set(0, 300);
        };
        MainGame.prototype.basketCollideHandler = function (obj1, obj2) {
            if (obj2.frame > 3) {
                this.setBasketMiss(false, obj2);
            }
            else {
                if (obj2 == this.correct_basket) {
                    this.setBasketHit();
                }
                else {
                    this.setBasketMiss(false, obj2);
                }
            }
            this.is_hitted = true;
        };
        MainGame.prototype.resetLevel = function (gameOver) {
            this.game.time.events.remove(this.reset_timer_event);
            this.reset_timer_event = null;
            this.actual_item.kill();
            this.actual_item = null;
            this.baskets.forEach(function (b) {
                b.dispose();
            }, this);
            if (this.pipes) {
                this.pipes.dispose();
                this.pipes = null;
            }
            if (this.level_count >= this.level_data.challenge.length - 1) {
                this.finishGameLevel(true);
            }
            else if (gameOver) {
                this.finishGameLevel(false);
            }
            else {
                this.generateNewLevel();
            }
        };
        MainGame.prototype.setBasketHit = function () {
            this.hud.showComemoration();
            this.correct_basket.startParticles(this.game);
            this.monster.play("win");
            this.actual_item.visible = false;
            this.audio_hit.play();
            this.reset_timer_event = this.game.time.events.add(2000, this.resetLevel, this);
        };
        MainGame.prototype.setBasketMiss = function (gameOver, other) {
            this.monster.play("lose");
            this.audio_miss.play();
            if (other || gameOver)
                this.actual_item.visible = false;
            if (other)
                other.startXError();
            if (!gameOver)
                this.hud.loseHeart();
            else {
                this.hud.pauseTimer();
                this.releaseButton.events.onInputDown.remove(this.onClickOnMonster, this);
            }
            this.reset_timer_event = this.game.time.events.add(2000, this.resetLevel, this, gameOver);
        };
        MainGame.prototype.generateNewLevel = function () {
            var pxs = [420, 625, 210, 830, 0];
            var py = 620;
            var b;
            this.is_hitted = false;
            this.monster.x = 0;
            this.monster.play("fly");
            this.level_count++;
            this.falling = false;
            this.baskets.enableBody = true;
            this.baskets.physicsBodyType = Phaser.Physics.ARCADE;
            var baskets_arr = this.level_data.challenge[this.level_count].baskets;
            this.shuffle(baskets_arr);
            for (var i = 0; i < baskets_arr.length; i++) {
                b = new QuedaLivre.Basket(this.game, pxs[i], py, this.baskets, baskets_arr[i].text, baskets_arr[i].can_close, baskets_arr[i].closing_time);
                if (baskets_arr[i].is_correct) {
                    this.correct_basket = b;
                }
            }
            this.actual_item = this.game.add.sprite(20, 100, "objeto" + this.level_count, Math.floor(Math.random() * 15));
            this.actual_item.scale.x = 0.35;
            this.actual_item.scale.y = 0.35;
            this.monster.addChild(this.actual_item);
            if (this.level_data.challenge[this.level_count].pipes)
                this.pipes = new QuedaLivre.Pipe(this.game, 0, 400, pxs, this.level_data.challenge[this.level_count].pipes.flip_horizontal, this.level_data.challenge[this.level_count].pipes.flip_vertical, this.level_data.challenge[this.level_count].pipes.time_on_pipe, this.level_data.challenge[this.level_count].pipes.exit_order);
            this.hud.question.text = "Questão " + (this.level_count + 1) + "\n" + this.level_data.challenge[this.level_count].question;
            this.hud.resumeTimer();
            this.world.addChild(this.hud);
            this.monster_tween = this.game.add.tween(this.monster).to({ x: this.game.width - this.monster.width - 5 }, this.level_data.challenge[this.level_count].monster_tween_time, Phaser.Easing.Linear.None, true, 0, -1, true).start();
        };
        MainGame.prototype.finishGameLevel = function (finish) {
            this.game.sound.remove(this.audio_falling);
            this.game.sound.remove(this.audio_hit);
            this.game.sound.remove(this.audio_miss);
            this.audio_falling.destroy();
            this.audio_hit.destroy();
            this.audio_miss.destroy();
            this.monster_tween.stop();
            this.monster_tween = null;
            this.game.tweens.removeAll();
            this.game.time.events.removeAll();
            this.releaseButton.events.onInputDown.removeAll();
            this.hud.destroyTimer();
            this.hud.dispose();
            this.game.time.events.removeAll();
            this.correct_basket.dispose();
            this.baskets.forEach(function (b) {
                b.dispose();
            }, this);
            this.baskets.destroy(true);
            this.bg.destroy();
            this.monster.destroy(true);
            this.releaseButton.destroy(true);
            this.level_data = null;
            this.is_hitted = false;
            this.level_count = 0;
            this.game_started = false;
            this.game.physics.destroy();
            if (this.pipes)
                this.pipes.dispose();
            if (finish)
                this.game.state.start('YouWin', true, false);
            else
                this.game.state.start('YouLose', true, false);
        };
        MainGame.prototype.shuffle = function (sourceArray) {
            for (var n = 0; n < sourceArray.length - 1; n++) {
                var k = n + Math.floor(Math.random() * (sourceArray.length - n));
                var temp = sourceArray[k];
                sourceArray[k] = sourceArray[n];
                sourceArray[n] = temp;
            }
        };
        return MainGame;
    })(Phaser.State);
    QuedaLivre.MainGame = MainGame;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.game.load.json('level', 'level/level1.json?v=' + Math.random());
        };
        MainMenu.prototype.create = function () {
            this.level_data = this.game.cache.getJSON('level');
            this.game_music = this.game.add.audio('musica_intro');
            this.game_music.loop = true;
            this.game_music.play();
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.title = this.game.add.text(this.game.world.centerX, 350, this.level_data.title, null);
            this.title.anchor.x = 0.5;
            this.title.fill = "white";
            this.title.stroke = "#659446";
            this.title.strokeThickness = 12;
            this.title.font = "Conv_BradBunR";
            this.title.fontSize = 80;
            this.title.align = "center";
            this.instructions = this.game.add.text(this.game.world.centerX, 450, this.level_data.tutorial, null);
            this.instructions.anchor.x = 0.5;
            this.instructions.wordWrap = true;
            this.instructions.wordWrapWidth = 850;
            this.instructions.fill = "white";
            this.instructions.font = "Conv_BradBunR";
            this.instructions.fontSize = 32;
            this.instructions.setShadow(2, 2, "#295e0a", 0);
            this.instructions.stroke = "#295e0a";
            this.instructions.strokeThickness = 2;
            this.instructions.align = "center";
            this.add.tween(this.background).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: this.world.centerY + 300 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.game.add.audio('sfx_cliquebotao').play();
            this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.addOnce(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.game_music = null;
            this.level_data = null;
            this.background.destroy();
            this.logo.destroy();
            this.title.destroy();
            this.instructions.destroy();
            this.input.onDown.removeAll();
            this.game.state.start('MainGame', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    QuedaLivre.MainMenu = MainMenu;
})(QuedaLivre || (QuedaLivre = {}));
var QuedaLivre;
(function (QuedaLivre) {
    var Pipe = (function (_super) {
        __extends(Pipe, _super);
        function Pipe(game, x, y, bb_positions, horizontal_flip, vertical_flip, sec_delay, exit_order, parent, addToStage, enableBody, physicsBodyType) {
            _super.call(this, game, parent, 'pipe', addToStage, enableBody, physicsBodyType);
            this.audio_pipe = this.game.add.audio('sfx_batidascanos');
            this.seconds_delay = sec_delay;
            this.entrance_image = this.game.add.image(0, 0, 'pipe_entrance', 0, this);
            this.exit_image = this.game.add.image(0, 0, 'pipe_exit', 0, this);
            this.base_image = this.game.add.image(this.game.world.centerX, 0, 'pipe_base', 0, this);
            this.base_image.anchor.setTo(0.5, 0);
            if (horizontal_flip) {
                this.base_image.scale.x *= -1;
                this.entrance_image.scale.x *= -1;
                this.entrance_image.x = this.game.width;
                this.exit_image.x = this.game.width;
                this.exit_image.scale.x *= -1;
            }
            if (vertical_flip) {
                this.base_image.scale.y *= -1;
                this.base_image.y -= this.base_image.height - 5;
            }
            this.x = x;
            this.y = y;
            bb_positions.sort();
            this.entrance_pipes = this.game.add.group();
            this.entrance_pipes.y = y;
            this.exit_pipes = [];
            this.exit_pipe_order = exit_order;
            var g;
            var bb;
            for (var i = 0; i < 5; i++) {
                bb = this.game.add.sprite(bb_positions[i] + 94, 45, "bb");
                bb.anchor.setTo(0.5, 0.5);
                bb.scale.x = 0.5;
                bb.alpha = 0;
                this.entrance_pipes.addChild(bb);
                this.game.physics.enable(bb, Phaser.Physics.ARCADE);
                bb.body.immovable = true;
                this.exit_pipes.push(bb_positions[i] + 50);
            }
        }
        Pipe.prototype.checkColision = function (item) {
            var _this = this;
            if (this.is_colliding)
                return;
            this.entrance_pipes.forEach(function (t) {
                if (_this.game.physics.arcade.collide(item, t, null, null, _this.game)) {
                    _this.is_colliding = true;
                    _this.enterOnPipe(item, t, _this.entrance_pipes.getChildIndex(t));
                }
            }, this);
        };
        Pipe.prototype.enterOnPipe = function (item, entrance, index) {
            item.visible = false;
            item.body.gravity.set(0, 0);
            this.audio_pipe.play();
            this.startParticles(entrance.x + 25, this.y, -10);
            this.entrance_pipes.destroy(true);
            this.pipeTimeEvent = this.game.time.events.add(this.seconds_delay, this.exitOfPipe, this, [item, index]);
        };
        Pipe.prototype.exitOfPipe = function (args) {
            args[0].body.gravity.set(0, 300);
            args[0].visible = true;
            args[0].x = this.exit_pipes[this.exit_pipe_order[args[1]]];
            args[0].y += 280;
            this.startParticles(args[0].x + 25, args[0].y, 10);
            this.game.time.events.remove(this.pipeTimeEvent);
        };
        Pipe.prototype.startParticles = function (px, py, gravi) {
            this.particleEmitter = this.game.add.emitter(px, py, 100);
            this.particleEmitter.makeParticles('poeira');
            this.particleEmitter.gravity = gravi;
            this.particleEmitter.start(true, 1000, null, 5);
        };
        Pipe.prototype.dispose = function () {
            this.is_colliding = false;
            this.entrance_image.destroy();
            this.base_image.destroy();
            this.exit_image.destroy();
            this.exit_pipe_order = null;
            this.entrance_pipes.destroy(true);
            this.exit_pipes = null;
            this.pipeTimeEvent = null;
            if (this.particleEmitter)
                this.particleEmitter.destroy();
            this.game.sound.remove(this.audio_pipe);
            this.audio_pipe.destroy();
            this.destroy(true);
        };
        return Pipe;
    })(Phaser.Group);
    QuedaLivre.Pipe = Pipe;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBarBG = this.add.image(this.world.centerX, this.world.centerY, 'preloadBarBG');
            this.preloadBarBG.anchor.x = this.preloadBarBG.anchor.y = 0.5;
            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
            this.preloadBar.anchor.x = this.preloadBar.anchor.y = 0.5;
            this.load.setPreloadSprite(this.preloadBar);
            this.preloadText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 30, "Carregando", null);
            this.preloadText.anchor.x = 0.5;
            this.preloadText.align = "center";
            this.preloadText.fill = "white";
            this.preloadText.font = "Conv_BradBunR";
            this.preloadText.fontSize = 42;
            this.load.image('titlepage', 'img/startmenu/titlepage.jpg');
            this.load.image('logo', 'img/startmenu/logo.png');
            this.load.audio('music', 'img/title.mp3', true);
            this.game.load.image("henrique", "img/hud/henrique.png");
            this.game.load.image("estrela", "img/hud/estrela.png");
            this.game.load.image("home_btn", "img/hud/home.png");
            this.game.load.image("menu_btn", "img/hud/menu.png");
            this.game.load.image("musica_btn", "img/hud/musica.png");
            this.game.load.image("pause_btn", "img/hud/pause.png");
            this.game.load.image("play_btn", "img/hud/play.png");
            this.game.load.image("duvida_btn", "img/hud/duvida.png");
            this.game.load.image("fechar_btn", "img/hud/fechar.png");
            this.game.load.image("modal_hud", "img/hud/modal.png");
            this.game.load.image("timer_hud", "img/hud/timer.png");
            this.game.load.image("bar_hud", "img/hud/bar.png");
            this.game.load.image("vidas_hud", "img/hud/hud_vidas.png");
            this.game.load.image("pipe_entrance", "img/pipes/pipe_entrance.png");
            this.game.load.image("pipe_exit", "img/pipes/pipe_exit.png");
            this.game.load.image("pipe_base", "img/pipes/pipe_base.png");
            this.game.load.image("poeira", "img/pipes/cloud.png");
            this.game.load.image("bb", "img/pipes/bb.png");
            this.game.load.atlasJSONHash("monster", "img/characters/monster_sprite.png", "img/characters/monster_sprite.json");
            this.game.load.image("x_error", "img/baskets/error.png");
            this.game.load.image("feedback_winner", "img/feedbacks/winner.png");
            this.game.load.image("feedback_loser", "img/feedbacks/loser.png");
            this.game.load.image("retry_btn", "img/hud/tentar.png");
            this.game.load.audio("musica_intro", ["sound/musica_intro.mp3", "sound/musica_intro.ogg", "sound/musica_intro.m4a"]);
            this.game.load.audio("musica_finalbom", ["sound/musica_finalbom.mp3", "sound/musica_finalbom.ogg", "sound/musica_finalbom.m4a"]);
            this.game.load.audio("musica_finalruim", ["sound/musica_finalruim.mp3", "sound/musica_finalruim.ogg", "sound/musica_finalruim.m4a"]);
            this.game.load.audio("sfx_acerto", ["sound/sfx_acerto.mp3", "sound/sfx_acerto.ogg", "sound/sfx_acerto.m4a"]);
            this.game.load.audio("sfx_batidascanos", ["sound/sfx_batidascanos.mp3", "sound/sfx_batidascanos.ogg", "sound/sfx_batidascanos.m4a"]);
            this.game.load.audio("sfx_cliquebotao", ["sound/sfx_cliquebotao.mp3", "sound/sfx_cliquebotao.ogg", "sound/sfx_cliquebotao.m4a"]);
            this.game.load.audio("sfx_erro", ["sound/sfx_erro.mp3", "sound/sfx_erro.ogg", "sound/sfx_erro.m4a"]);
            this.game.load.audio("sfx_itemcaindo", ["sound/sfx_itemcaindo.mp3", "sound/sfx_itemcaindo.ogg", "sound/sfx_itemcaindo.m4a"]);
        };
        Preloader.prototype.create = function () {
            this.add.tween(this.preloadText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.preloadBarBG).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    QuedaLivre.Preloader = Preloader;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var YouLose = (function (_super) {
        __extends(YouLose, _super);
        function YouLose() {
            _super.apply(this, arguments);
        }
        YouLose.prototype.create = function () {
            this.game.sound.stopAll();
            this.game.add.audio('musica_finalruim').play();
            this.background = this.add.sprite(0, 0, 'feedback_loser');
            this.restart = this.add.sprite(645, 600, 'menu_btn');
            this.menu = this.add.sprite(745, 600, 'retry_btn');
            var g = new Phaser.Graphics(this.game, 0, 0);
            g.beginFill(0x000000, 1);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            this.black_screen = this.game.add.sprite(0, 0);
            this.black_screen.addChild(g);
            var t = this.add.tween(this.black_screen).to({ alpha: 0 }, 1000, Phaser.Easing.Bounce.InOut);
            t.onComplete.add(this.startMenu, this);
            t.start();
        };
        YouLose.prototype.startMenu = function () {
            this.restart.inputEnabled = true;
            this.restart.input.useHandCursor = true;
            this.restart.events.onInputUp.add(this.fadeIn, this);
            this.menu.inputEnabled = true;
            this.menu.input.useHandCursor = true;
            this.menu.events.onInputUp.add(this.fadeIn, this);
        };
        YouLose.prototype.fadeIn = function (event) {
            var t = this.add.tween(this.black_screen).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut);
            this.game.add.audio('sfx_cliquebotao').play();
            if (event.key == "menu_btn")
                t.onComplete.add(this.gotoMenu, this);
            else
                t.onComplete.add(this.retryGame, this);
            t.start();
        };
        YouLose.prototype.gotoMenu = function () { this.dispose(); this.game.state.start('MainMenu', true, false); };
        YouLose.prototype.retryGame = function () { this.dispose(); this.game.state.start('MainGame', true, false); };
        YouLose.prototype.dispose = function () {
            this.game.sound.stopAll();
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.game.sound.removeByKey('musica_finalruim');
            this.game.tweens.removeAll();
            this.background.destroy();
            this.restart.destroy();
            this.menu.destroy();
            this.black_screen.destroy();
            this.game.add.audio('musica_intro', 1, true).play();
        };
        return YouLose;
    })(Phaser.State);
    QuedaLivre.YouLose = YouLose;
})(QuedaLivre || (QuedaLivre = {}));
/// <reference path="phaser/typescript/phaser.d.ts"/>
var QuedaLivre;
(function (QuedaLivre) {
    var YouWin = (function (_super) {
        __extends(YouWin, _super);
        function YouWin() {
            _super.apply(this, arguments);
        }
        YouWin.prototype.create = function () {
            this.game.sound.stopAll();
            this.game.add.audio('musica_finalbom').play();
            this.background = this.add.sprite(0, 0, 'feedback_winner');
            this.restart = this.add.sprite(645, 600, 'menu_btn');
            this.menu = this.add.sprite(745, 600, 'retry_btn');
            var g = new Phaser.Graphics(this.game, 0, 0);
            g.beginFill(0x000000, 1);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            this.black_screen = this.game.add.sprite(0, 0);
            this.black_screen.addChild(g);
            var t = this.add.tween(this.black_screen).to({ alpha: 0 }, 1000, Phaser.Easing.Bounce.InOut);
            t.onComplete.add(this.startMenu, this);
            t.start();
        };
        YouWin.prototype.startMenu = function () {
            this.restart.inputEnabled = true;
            this.restart.input.useHandCursor = true;
            this.restart.events.onInputUp.add(this.fadeIn, this);
            this.menu.inputEnabled = true;
            this.menu.input.useHandCursor = true;
            this.menu.events.onInputUp.add(this.fadeIn, this);
        };
        YouWin.prototype.fadeIn = function (event) {
            var t = this.add.tween(this.black_screen).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut);
            this.game.add.audio('sfx_cliquebotao').play();
            if (event.key == "menu_btn")
                t.onComplete.add(this.gotoMenu, this);
            else
                t.onComplete.add(this.retryGame, this);
            t.start();
        };
        YouWin.prototype.gotoMenu = function () { this.dispose(); this.game.state.start('MainMenu', true, false); };
        YouWin.prototype.retryGame = function () { this.dispose(); this.game.state.start('MainGame', true, false); };
        YouWin.prototype.dispose = function () {
            this.game.sound.stopAll();
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.game.sound.removeByKey('musica_finalbom');
            this.game.tweens.removeAll();
            this.background.destroy();
            this.restart.destroy();
            this.menu.destroy();
            this.black_screen.destroy();
            this.game.add.audio('musica_intro', 1, true).play();
        };
        return YouWin;
    })(Phaser.State);
    QuedaLivre.YouWin = YouWin;
})(QuedaLivre || (QuedaLivre = {}));
