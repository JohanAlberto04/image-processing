
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { Particle } from "./particle.js";
import { ParticleText } from "./particle.js";
import { Stickman } from "./particle.js"; 
import { Explosion } from "./particle.js"; 
import { UFO} from "./particle.js"; 
import { CanvasLocal } from './canvasLocal.js';

let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let lienzo4: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;
let pantalla4: CanvasRenderingContext2D;

/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt:any) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

  /** Variables que controla el canvas de la imagen, el primero 
   * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
  */
lienzo1 = <HTMLCanvasElement>document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = <HTMLCanvasElement>document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;

function convertirAGris(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirANegativo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegative(imagenSal));
}
function convertirANegativoGrises(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegativeGrises(imagenSal));
}
function convertirARojo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function convertirAVerde(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGreen(imagenSal));
}
function convertirAAzul(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toBlue(imagenSal));
}
//este codigo se agreo el 4 de abril de 2022
function convertirTricolor(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolor(imagenSal));
}
////////////hasta aqui
function correccionGamma(evt: any): void{
  var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}
function umbralizado(evt: any): void{
  var args = prompt('Ingresa el valor del umbral');
  var umbral = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en X');
  var des = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en Y');
  var desy = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceY(imagenSal, desy));
}
function desfaseD(evt: any): void{
  var args = prompt('Ingresa el valor del desfase y angulo');
  var rangos = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceD(imagenSal, rangos[0], rangos[1]));
}
function umbral2limites(evt: any): void{
    var args = prompt('Ingresa el rango minimo y el maximo separado por comas');
    var rangos = args.split(',').map(elem => parseFloat(elem));
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral2limites(imagenSal, rangos));
}
function changeBrightness(evt: any): void {
    var factor = prompt ("Ingresa un valor en el rango de 0-2, como un porcentaje");
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeBrightness(imagenSal,  parseFloat(factor)));
}

function cambioFtransferencia(evt: any): void {
  var args = prompt('Ingresa los valores de la funcion de transferencia, separados por coma');
  var factores = args.split(',').map(elem => parseFloat(elem));
  //console.log(factores, factores.length)
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.cambioFTransferencia(imagenSal, factores));
}
function colorGradienteX(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradienteX(imagenSal, factores));
}
function colorGradienteY(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradientY(imagenSal, factores));
}
function opchangeContraste(evt: any): void{
    var argss = prompt('Ingresa un valor entre el rango de -100 a 100');
    var valor = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeContraste(imagenSal, valor));
}
function opgetPow(evt: any): void{
  var argss = prompt('Ingresa un numero ( potencia )');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.pow(imagenSal, valor));
}
function coseno(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toCos(imagenSal));
}
function multiplicacion(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toMultiplication(imagenSal, valor));
}
function subtract(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var restar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSubtract(imagenSal, restar));
} 
function funcionSine(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSine(imagenSal));
}
function add(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var sumar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toAdd(imagenSal, sumar));
}
function sqrt(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSqrt(imagenSal));
}  
function div(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var dividir = parseFloat(argss);
  if(dividir===0){
    var argss = prompt('Ingresa un valor diferente de 0');
    var dividir = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
  else{
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
}
function tan(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toTan(imagenSal));
} 

function sumaImg(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.addImg(imagenSal, imagen2));
} 

function marcaAguaCentro(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaCentro(imagenSal, imagen2, 1));
} 

function marcaAguaArray(evt: any): void{
  let argss = prompt('Ingresa porcentaje de ponderacion ');
  let porc = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaArray(imagenSal, imagen2, porc));
}

//variables adicionales para el efecto rain
let ctx = pantalla2;
let w:number;
let h:number;
const numberOfParticles = 1000;
let particlesArray: Particle[];
particlesArray = new Array(0);
var imagenSal: ImageType;
let stickman: Stickman;
let explosions: Explosion[] = [];
let ufo: UFO;



function init() {
  //init
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let tmp = MathImg.relativeBrightness(imagenSal);
  w = imagenSal.getWidth();
  h = imagenSal.getHeight();
  for (let i = 0; i < numberOfParticles; i++){
    particlesArray.push(new Particle(w, h, ctx, tmp));
  }
}

function animate() {
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

function animate2() {
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    ctx.globalAlpha = particlesArray[i].getSpeed()*0.5;
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate2);
}

function rain(evt: any): void { 
  init();
  animate();
}

function rain2(evt: any): void { 
  init();
  animate2();
}

//codigo para efecto de particulas
let particleArray: ParticleText[];
let mouse:any = {
  x: null,
  y: null,
  radius: 50
};

function handleMouse(e: any) {
  mouse.x = e.x;// - canvasPosition.left;
  mouse.y = e.y;// - canvasPosition.top;
  //console.log(mouse.x, mouse.y)
}

function textEfects(evt: any): void{
  var args = prompt("Ingresa texto, tamaño de texto y coord x y y, separados por coma:");
  
  var factores = args.split(',');//.map(elem => parseInt(elem));
  pantalla1.font = 'bold  ' + factores[1] + 'px Verdana';
  //let cadena = 
  pantalla1.fillText(factores[0], parseInt(factores[2]), parseInt(factores[3]));
  imagenSal = new ImageType(pantalla1, null, 300, 300, true);
  initParticles();
  animateParticles();
}

function initParticles() {
  particleArray = [];
  let arrImage = imagenSal.getArrayImg();
  for (let i = 0; i < 300; i++){
    for (let j = 0; j < 300; j++) { 
      if (arrImage[0][i][j] > 128) {
        particleArray.push(new ParticleText(j, i, pantalla1));
      }
    }
  } 
}

function animateParticles(){
  pantalla1.clearRect(0,0,300,300);
  for (let i = 0; i < particleArray.length; i++){
      particleArray[i].update(mouse);
      particleArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
///funcion de stickman 

let stickmanSpeedX = 2; // Velocidad horizontal del stickman
let stickmanSpeedY = 1; // Velocidad vertical del stickman


function initStickman() {
  
  imagenSal = new ImageType(pantalla1, imgLocal.getImage());
  w = imagenSal.getWidth();
  h = imagenSal.getHeight();

  stickman = new Stickman(pantalla2.canvas.width / 2, pantalla2.canvas.height / 2, ctx);
}


function animateStickman() {

  ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);
  stickman.x += stickmanSpeedX;
  stickman.y += stickmanSpeedY;

  // Verifica límites para que el stickman no salga fuera de la imagen
  if (stickman.x < 0 || stickman.x > pantalla2.canvas.width) {
    stickmanSpeedX *= -1; // Invierte la dirección al llegar a los bordes horizontales
  }

  if (stickman.y < 0 || stickman.y > pantalla2.canvas.height) {
    stickmanSpeedY *= -1; // Invierte la dirección al llegar a los bordes verticales
  }

  // Dibuja el stickman en su nueva posición
  stickman.draw();

  requestAnimationFrame(animateStickman);
}

function iniciarstickman(evt: any): void { 
  initStickman();
  animateStickman();
}

/// funcion de explosion 

function initExplosions() {
  //Define el numero de explosiones
  for (let i = 0; i < 8; i++) {
    const mouseX = Math.random() * pantalla2.canvas.width;
    const mouseY = Math.random() * pantalla2.canvas.height;
    const newExplosion = new Explosion(mouseX, mouseY, pantalla2);
    explosions.push(newExplosion);
  }
}

function animateExplosions() {

  ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);


  for (const explosion of explosions) {
    explosion.update();
    explosion.draw();
  }

  requestAnimationFrame(animateExplosions);
}

function iniciarexplosion(evt: any): void {
  initExplosions();
  animateExplosions();
}

/// funcion de platillo 


function initUFO() {
  // Crea el platillo volador en una posición inicial
  ufo = new UFO(50, 50, 40, 20, ctx);
}

// Función de animación para el platillo volador
function animateUFO() {
  // Dibuja un fondo o la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);

  // Actualiza y dibuja el platillo volador
  ufo.update();
  ufo.draw();

  // Llama a la animación de forma recursiva
  requestAnimationFrame(animateUFO);
}

// Llamada a las funciones de inicialización y animación del platillo volador
function iniciarEfectoUFO() {
  initUFO();
  animateUFO();
}
//seccion de histogramas  
function histogramas(evt: any): void{
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let canvas1: HTMLCanvasElement = lienzo2;
  let graphics1: CanvasRenderingContext2D = pantalla2;
  let canvas2: HTMLCanvasElement = lienzo4;
  let graphics2: CanvasRenderingContext2D = pantalla4;

  let hist = MathImg.hist(imagenSal);
  const miCanvas1:CanvasLocal = new CanvasLocal(graphics1, canvas1, hist);
  miCanvas1.paint();
  let histAc = MathImg.histAcum(hist);
  const miCanvas2:CanvasLocal = new CanvasLocal(graphics2, canvas2, histAc);
  miCanvas2.paint();
 
} 
function ecualizado(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.ecualizar(imagenSal));
} 


function erosionarImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.erosionar(imagenSal, true));
}

function dilatarImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.dilatar(imagenSal, true));
} 
function aperturaImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.apertura(imagenSal, true));
}
function cierreImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.cierre(imagenSal, true));
}

function opchangeFalsoColor(evt: any): void{
  var argss = prompt('Ingresa un valor de color Hue');
  var hue = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.fromHSItoRGB(MathImg.falseColorByHue( MathImg.fromRGBtoHSI(imagenSal), hue, 210)));
}

function generarPulso(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.pulso(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRuido(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.ruido(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRampaX(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaX(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRampaY(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaY(imgLocal.getImage().width, imgLocal.getImage().height));
}

function escalarImagen(evt: any): void{
  var argss = prompt('Ingresa un factor de escala');
  var factor = parseFloat(argss);
  //var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagenSal: ImageType = new ImageType(pantalla2, null, Math.floor(imgLocal.getImage().width*factor), Math.floor(imgLocal.getImage().height*factor));
  imagenSal.imageArray2DtoData(pantalla2, MathImg.escalar(imagenSal, factor));
}
function escalarImagen2(evt: any): void{
  var argss = prompt('Ingresa un factor de escala');
  var factor = parseFloat(argss);
  pantalla2.drawImage(imgLocal.getImage(), 0,0, Math.floor(imgLocal.getImage().width*factor), Math.floor(imgLocal.getImage().height*factor));
 }

function rotarImagen(evt: any): void{
  var argss = prompt('Ingresa un angulo de rotacion');
  var angulo = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.rotar(imagenSal, angulo));
}
function rotarImagen2(evt: any): void{
  var argss = prompt('Ingresa un angulo de rotacion');
  var angulo = parseFloat(argss);
  //pantalla2.drawImage(imgLocal.getImage(), 0,0)
  pantalla2.translate(Math.floor(imgLocal.getImage().width/2), Math.floor(imgLocal.getImage().height/2));
  pantalla2.rotate(angulo* Math.PI / 180);
  pantalla2.translate(-Math.floor(imgLocal.getImage().width/2), -Math.floor(imgLocal.getImage().height/2));
  pantalla2.drawImage(imgLocal.getImage(), 0,0);
 }
function shearingX(evt: any): void{
  var argss = prompt('Ingresa un factor de shearing');
  var factor = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingX(imagenSal, factor));
}

function shearingY(evt: any): void{
  var argss = prompt('Ingresa un factor de shearing');
  var factor = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingY(imagenSal, factor));
}
function tAfin(evt: any): void{
  var argss = prompt('Ingresa 6 valores para t Afin, con x3<x1<x2 y y1<y2, y1<y3');
  var factores = argss.split(',').map(elem => parseInt(elem));
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.tAfin(imagenSal, factores));
}

//operaciones nuevas/proyecto/

function BorrarRojo(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorRojo(imagenSal.getArrayImg()));
}

function BorrarVerde(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorVerde(imagenSal.getArrayImg()));
}

function BorrarAzul(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorAzul(imagenSal.getArrayImg()));
}

function Barrido(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Pregunta al usuario la dirección del barrido
  const direccion = prompt('Ingresa la dirección del barrido: (horizontal/vertical)').toLowerCase();

  // Verifica que la dirección ingresada sea válida
  if (direccion !== 'horizontal' && direccion !== 'vertical') {
      alert('Dirección no válida. Selecciona horizontal o vertical.');
      return;
  }

  // Aplica la función de efecto de barrido con la dirección proporcionada
  imagenSal.imageArray2DtoData(pantalla2, MathImg.Barrido(imagenSal.getArrayImg(), direccion));
}

function Prisma(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Aplica la función de efecto de prisma
  imagenSal.imageArray2DtoData(pantalla2, MathImg.efectoPrisma(imagenSal.getArrayImg()));
}

function Curvatura(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Aplica la función de efecto de curvatura
  imagenSal.imageArray2DtoData(pantalla2, MathImg.Curvatura(imagenSal.getArrayImg()));
}

function Puzzle(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Aplica la función de efecto de puzzle
  imagenSal.imageArray2DtoData(pantalla2, MathImg.efectoPuzzle(imagenSal.getArrayImg()));
}

lienzo1.addEventListener('mousemove', handleMouse);
 
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);


//operaciones nuevas
//operaciones de borrado de color

document.getElementById("borrarColorRojo").addEventListener('click', BorrarRojo);
document.getElementById("borrarColorVerde").addEventListener('click', BorrarVerde);
document.getElementById("borrarColorAzul").addEventListener('click', BorrarAzul);

document.getElementById("iniciarstickman").addEventListener('click', iniciarstickman);
document.getElementById("Barrido").addEventListener('click', Barrido);
document.getElementById("Prisma").addEventListener('click', Prisma);
document.getElementById("Puzzle").addEventListener('click', Puzzle);
document.getElementById("Curvatura").addEventListener('click', Curvatura);
document.getElementById("iniciarexplosion").addEventListener('click', iniciarexplosion);
document.getElementById("iniciarEfectoUFO").addEventListener('click', iniciarEfectoUFO);
