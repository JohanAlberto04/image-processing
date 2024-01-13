export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  
  constructor(width: number, height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]) {
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

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    
    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}

export class Stickman {
  public x: number;
  public y: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  public draw() {
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
  }
}

class ExplosionParticle {
  public x: number;
  public y: number;
  public size: number;
  public ctx: CanvasRenderingContext2D;
  public speedX: number;
  public speedY: number;
  public color: string;
  public life: number;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, speed: number, angle: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    const speedMultiplier = Math.random() + 0.5;
    this.speedX = Math.cos(angle) * speed * speedMultiplier  * 0.2;
    this.speedY = Math.sin(angle) * speed * speedMultiplier  * 0.2;
    this.color = color;
    this.life = Math.random() * 30 + 90; // Vida aleatoria entre 30 y 60 cuadros
  }

  public update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  public draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

export class Explosion {
  protected particles: ExplosionParticle[] = [];

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const particle = new ExplosionParticle(x, y, 2, ctx, 2, angle, 'orange');
      this.particles.push(particle);
    }
  }

  public update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  public draw() {
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}

export class UFO {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  public update() {
    
    this.x += 2; 
  }

  public draw() {
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
  }
}


export class PokemonBall {
  protected x: number;
  protected y: number;
  protected radius: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }

  public update(mouseX: number, mouseY: number) {
    // Actualiza la posición de la bola según la posición del ratón
    this.x = mouseX;
    this.y = mouseY;
  }

  public draw() {
   
    const enlargedRadius = this.radius * 1.5; 

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
  }
}