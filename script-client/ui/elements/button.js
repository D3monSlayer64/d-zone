'use strict';
var PIXI = require('pixi.js');
var Styles = require('./../styles').button;
var Text = require('./../text');

module.exports = Button;

Button.prototype = Object.create(PIXI.Container.prototype);

function Button(x, y, width, height, text, onClick) {
    PIXI.Container.call(this);
    this.buttonWidth = width;
    this.buttonHeight = height;
    this.x = x;
    this.y = y;
    this.text = text;
    this.graphics = this.addChild(new PIXI.Graphics());
    this.textSprite = this.addChild(new PIXI.Sprite(PIXI.Texture.fromCanvas(Text.blotText({ 
        text: this.text, maxWidth: this.buttonWidth
    }))));
    this.textSprite.x = Math.floor(this.buttonWidth / 2 - this.textSprite.width / 2);
    this.textSprite.y = Math.floor(this.buttonHeight / 2 - this.textSprite.height / 2 + 1);
    this.interactive = true;
    this.onClick = onClick;
    console.log(width,height);
    console.log(this.width,this.height);
    this.on('click', this.onClick);
    this.on('mouseover', this.onHover);
    this.on('mouseout', this.offHover);
    this.on('mousedown', this.onMouseDown);
    this.on('mouseup', this.onMouseUp);
    this.draw();
}

Button.prototype.draw = function() {
    this.graphics.clear();
    var style = this.clicking ? Styles.click : this.hover ? Styles.hover : Styles.normal;
    this.alpha = style.alpha;
    this.graphics.beginFill(style.border);
    this.graphics.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
    this.graphics.beginFill(style.fill);
    this.graphics.drawRect(1, 1, this.buttonWidth - 2, this.buttonHeight - 2);
};

Button.prototype.onHover = function(e) {
    this.clicking = this.wasClicking && e.data.originalEvent.buttons;
    this.wasClicking = false;
    this.hover = true;
    this.draw();
};

Button.prototype.offHover = function(e) {
    this.wasClicking = this.clicking;
    this.clicking = false;
    this.hover = false;
    this.draw();
};

Button.prototype.onMouseDown = function(e) {
    this.clicking = true;
    this.draw();
};

Button.prototype.onMouseUp = function(e) {
    this.clicking = false;
    this.draw();
};

Button.prototype.drawSelf = function() {
    this.elementCanvas.clear();
    var style = this.clicking ? Styles.click : this.hover ? Styles.hover : Styles.normal;
    this.elementCanvas.context.globalAlpha = style.alpha;
    this.elementCanvas.context.fillStyle = style.border;
    this.elementCanvas.context.fillRect(0, 0, this.width, this.height);
    this.elementCanvas.context.fillStyle = style.fill;
    this.elementCanvas.context.fillRect(1, 1, this.width - 2, this.height - 2);
    Text.blotText({ text: this.text, maxWidth: this.width, y: Math.floor(this.height / 2) - 4, canvas: this.elementCanvas, align: 'center' });
    this.elementCanvas.context.globalAlpha = 1;
};