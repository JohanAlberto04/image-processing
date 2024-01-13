var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 2.5;
        this.size = Math.random() * 1.5 + 1;
        this._2PI = Math.PI * 2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var Stickman = /** @class */ (function () {
    function Stickman(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }
    Stickman.prototype.draw = function () {
        // Cabeza
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - 30, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.closePath();
        // Cuerpo
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - 20);
        this.ctx.lineTo(this.x, this.y + 10);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
        // Brazos
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - 10);
        this.ctx.lineTo(this.x + 10, this.y);
        this.ctx.moveTo(this.x, this.y - 10);
        this.ctx.lineTo(this.x - 10, this.y);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
        // Piernas
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + 10);
        this.ctx.lineTo(this.x + 10, this.y + 20);
        this.ctx.moveTo(this.x, this.y + 10);
        this.ctx.lineTo(this.x - 10, this.y + 20);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
    };
    return Stickman;
}());
export { Stickman };
var ExplosionParticle = /** @class */ (function () {
    function ExplosionParticle(x, y, size, ctx, speed, angle, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        var speedMultiplier = Math.random() + 0.5;
        this.speedX = Math.cos(angle) * speed * speedMultiplier * 0.2;
        this.speedY = Math.sin(angle) * speed * speedMultiplier * 0.2;
        this.color = color;
        this.life = Math.random() * 30 + 90; // Vida aleatoria entre 30 y 60 cuadros
    }
    ExplosionParticle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    };
    ExplosionParticle.prototype.draw = function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ExplosionParticle;
}());
var Explosion = /** @class */ (function () {
    function Explosion(x, y, ctx) {
        this.particles = [];
        for (var i = 0; i < 30; i++) {
            var angle = (Math.PI * 2 * i) / 30;
            var particle = new ExplosionParticle(x, y, 2, ctx, 2, angle, 'orange');
            this.particles.push(particle);
        }
    }
    Explosion.prototype.update = function () {
        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    };
    Explosion.prototype.draw = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.draw();
        }
    };
    return Explosion;
}());
export { Explosion };
var UFO = /** @class */ (function () {
    function UFO(x, y, width, height, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    UFO.prototype.update = function () {
        this.x += 2;
    };
    UFO.prototype.draw = function () {
        // Dibuja el platillo volador
        this.ctx.fillStyle = 'silver';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Añade la cúpula del platillo volador
        this.ctx.fillStyle = 'gray';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - this.height / 2, this.width / 4, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Añade el cuerpo del platillo volador
        this.ctx.fillStyle = 'silver';
        this.ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        // Dibuja el haz de luz de abducción
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
        this.ctx.lineWidth = 40;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y + 230); // Ajusta la longitud del haz de luz según sea necesario
        this.ctx.stroke();
    };
    return UFO;
}());
export { UFO };
var PokemonBall = /** @class */ (function () {
    function PokemonBall(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
    }
    PokemonBall.prototype.update = function (mouseX, mouseY) {
        // Actualiza la posición de la bola según la posición del ratón
        this.x = mouseX;
        this.y = mouseY;
    };
    PokemonBall.prototype.draw = function () {
        var enlargedRadius = this.radius * 1.5;
        // Dibuja la mitad izquierda (blanca)
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, enlargedRadius / 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Dibuja la mitad derecha (roja)
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, enlargedRadius / 2, Math.PI, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Dibuja el punto negro en el centro
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return PokemonBall;
}());
export { PokemonBall };
