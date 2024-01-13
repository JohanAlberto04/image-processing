import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { Particle } from "./particle.js";
import { ParticleText } from "./particle.js";
import { Stickman } from "./particle.js";
import { Explosion } from "./particle.js";
import { UFO } from "./particle.js";
import { PokemonBall } from "./particle.js";
import { CanvasLocal } from './canvasLocal.js';
var lienzo1;
var lienzo2;
var lienzo4;
var pantalla1;
var pantalla2;
var pantalla4;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/** Variables que controla el canvas de la imagen, el primero
 * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
*/
lienzo1 = document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo4 = document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4 = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;
function convertirAGris(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirANegativo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegative(imagenSal));
}
function convertirANegativoGrises(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegativeGrises(imagenSal));
}
function convertirARojo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function convertirAVerde(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGreen(imagenSal));
}
function convertirAAzul(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toBlue(imagenSal));
}
//este codigo se agreo el 4 de abril de 2022
function convertirTricolor(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolor(imagenSal));
}
////////////hasta aqui
function correccionGamma(evt) {
    var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}
function umbralizado(evt) {
    var args = prompt('Ingresa el valor del umbral');
    var umbral = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt) {
    var args = prompt('Ingresa el valor del desfase en X');
    var des = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt) {
    var args = prompt('Ingresa el valor del desfase en Y');
    var desy = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceY(imagenSal, desy));
}
function desfaseD(evt) {
    var args = prompt('Ingresa el valor del desfase y angulo');
    var rangos = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceD(imagenSal, rangos[0], rangos[1]));
}
function umbral2limites(evt) {
    var args = prompt('Ingresa el rango minimo y el maximo separado por comas');
    var rangos = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral2limites(imagenSal, rangos));
}
function changeBrightness(evt) {
    var factor = prompt("Ingresa un valor en el rango de 0-2, como un porcentaje");
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeBrightness(imagenSal, parseFloat(factor)));
}
function cambioFtransferencia(evt) {
    var args = prompt('Ingresa los valores de la funcion de transferencia, separados por coma');
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    //console.log(factores, factores.length)
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.cambioFTransferencia(imagenSal, factores));
}
function colorGradienteX(evt) {
    var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradienteX(imagenSal, factores));
}
function colorGradienteY(evt) {
    var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradientY(imagenSal, factores));
}
function opchangeContraste(evt) {
    var argss = prompt('Ingresa un valor entre el rango de -100 a 100');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeContraste(imagenSal, valor));
}
function opgetPow(evt) {
    var argss = prompt('Ingresa un numero ( potencia )');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.pow(imagenSal, valor));
}
function coseno(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toCos(imagenSal));
}
function multiplicacion(evt) {
    var argss = prompt('Ingresa un numero real');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toMultiplication(imagenSal, valor));
}
function subtract(evt) {
    var argss = prompt('Ingresa un numero real');
    var restar = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSubtract(imagenSal, restar));
}
function funcionSine(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSine(imagenSal));
}
function add(evt) {
    var argss = prompt('Ingresa un numero real');
    var sumar = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toAdd(imagenSal, sumar));
}
function sqrt(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSqrt(imagenSal));
}
function div(evt) {
    var argss = prompt('Ingresa un numero real');
    var dividir = parseFloat(argss);
    if (dividir === 0) {
        var argss = prompt('Ingresa un valor diferente de 0');
        var dividir = parseFloat(argss);
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
    }
    else {
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
    }
}
function tan(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toTan(imagenSal));
}
function sumaImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.addImg(imagenSal, imagen2));
}
function marcaAguaCentro(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaCentro(imagenSal, imagen2, 1));
}
function marcaAguaArray(evt) {
    var argss = prompt('Ingresa porcentaje de ponderacion ');
    var porc = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaArray(imagenSal, imagen2, porc));
}
//variables adicionales para el efecto rain
var ctx = pantalla2;
var w;
var h;
var numberOfParticles = 1000;
var particlesArray;
particlesArray = new Array(0);
var imagenSal;
var stickman;
var explosions = [];
var ufo;
var pokemonBall;
function init() {
    //init
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var tmp = MathImg.relativeBrightness(imagenSal);
    w = imagenSal.getWidth();
    h = imagenSal.getHeight();
    for (var i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(w, h, ctx, tmp));
    }
}
function animate() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
function animate2() {
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        ctx.globalAlpha = particlesArray[i].getSpeed() * 0.5;
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate2);
}
function rain(evt) {
    init();
    animate();
}
function rain2(evt) {
    init();
    animate2();
}
//codigo para efecto de particulas
var particleArray;
var mouse = {
    x: null,
    y: null,
    radius: 50
};
function handleMouse(e) {
    mouse.x = e.x; // - canvasPosition.left;
    mouse.y = e.y; // - canvasPosition.top;
    //console.log(mouse.x, mouse.y)
}
function textEfects(evt) {
    var args = prompt("Ingresa texto, tamaño de texto y coord x y y, separados por coma:");
    var factores = args.split(','); //.map(elem => parseInt(elem));
    pantalla1.font = 'bold  ' + factores[1] + 'px Verdana';
    //let cadena = 
    pantalla1.fillText(factores[0], parseInt(factores[2]), parseInt(factores[3]));
    imagenSal = new ImageType(pantalla1, null, 300, 300, true);
    initParticles();
    animateParticles();
}
function initParticles() {
    particleArray = [];
    var arrImage = imagenSal.getArrayImg();
    for (var i = 0; i < 300; i++) {
        for (var j = 0; j < 300; j++) {
            if (arrImage[0][i][j] > 128) {
                particleArray.push(new ParticleText(j, i, pantalla1));
            }
        }
    }
}
function animateParticles() {
    pantalla1.clearRect(0, 0, 300, 300);
    for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].update(mouse);
        particleArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
///funcion de stickman 
var stickmanSpeedX = 2; // Velocidad horizontal del stickman
var stickmanSpeedY = 1; // Velocidad vertical del stickman
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
function iniciarstickman(evt) {
    initStickman();
    animateStickman();
}
/// funcion de explosion 
function initExplosions() {
    //Define el numero de explosiones
    for (var i = 0; i < 8; i++) {
        var mouseX = Math.random() * pantalla2.canvas.width;
        var mouseY = Math.random() * pantalla2.canvas.height;
        var newExplosion = new Explosion(mouseX, mouseY, pantalla2);
        explosions.push(newExplosion);
    }
}
function animateExplosions() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);
    for (var _i = 0, explosions_1 = explosions; _i < explosions_1.length; _i++) {
        var explosion = explosions_1[_i];
        explosion.update();
        explosion.draw();
    }
    requestAnimationFrame(animateExplosions);
}
function iniciarexplosion(evt) {
    initExplosions();
    animateExplosions();
}
/// funcion de platillo ovni
function initUFO() {
    ufo = new UFO(50, 50, 40, 20, ctx);
}
function animateUFO() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);
    ufo.update();
    ufo.draw();
    requestAnimationFrame(animateUFO);
}
function iniciarEfectoUFO() {
    initUFO();
    animateUFO();
}
//efecto pokemonball 
function initPokemonBall() {
    pokemonBall = new PokemonBall(50, 50, 20, ctx);
}
function animatePokemonBall() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, pantalla2.canvas.width, pantalla2.canvas.height);
    pokemonBall.update(mouse.x, mouse.y);
    pokemonBall.draw();
    requestAnimationFrame(animatePokemonBall);
}
function iniciarEfectoPokemonBall() {
    initPokemonBall();
    animatePokemonBall();
}
//seccion de histogramas  
function histogramas(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var canvas1 = lienzo2;
    var graphics1 = pantalla2;
    var canvas2 = lienzo4;
    var graphics2 = pantalla4;
    var hist = MathImg.hist(imagenSal);
    var miCanvas1 = new CanvasLocal(graphics1, canvas1, hist);
    miCanvas1.paint();
    var histAc = MathImg.histAcum(hist);
    var miCanvas2 = new CanvasLocal(graphics2, canvas2, histAc);
    miCanvas2.paint();
}
function ecualizado(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ecualizar(imagenSal));
}
function erosionarImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.erosionar(imagenSal, true));
}
function dilatarImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.dilatar(imagenSal, true));
}
function aperturaImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.apertura(imagenSal, true));
}
function cierreImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.cierre(imagenSal, true));
}
function opchangeFalsoColor(evt) {
    var argss = prompt('Ingresa un valor de color Hue');
    var hue = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.fromHSItoRGB(MathImg.falseColorByHue(MathImg.fromRGBtoHSI(imagenSal), hue, 210)));
}
function generarPulso(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.pulso(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRuido(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ruido(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRampaX(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaX(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRampaY(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaY(imgLocal.getImage().width, imgLocal.getImage().height));
}
function escalarImagen(evt) {
    var argss = prompt('Ingresa un factor de escala');
    var factor = parseFloat(argss);
    //var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    var imagenSal = new ImageType(pantalla2, null, Math.floor(imgLocal.getImage().width * factor), Math.floor(imgLocal.getImage().height * factor));
    imagenSal.imageArray2DtoData(pantalla2, MathImg.escalar(imagenSal, factor));
}
function escalarImagen2(evt) {
    var argss = prompt('Ingresa un factor de escala');
    var factor = parseFloat(argss);
    pantalla2.drawImage(imgLocal.getImage(), 0, 0, Math.floor(imgLocal.getImage().width * factor), Math.floor(imgLocal.getImage().height * factor));
}
function rotarImagen(evt) {
    var argss = prompt('Ingresa un angulo de rotacion');
    var angulo = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.rotar(imagenSal, angulo));
}
function rotarImagen2(evt) {
    var argss = prompt('Ingresa un angulo de rotacion');
    var angulo = parseFloat(argss);
    //pantalla2.drawImage(imgLocal.getImage(), 0,0)
    pantalla2.translate(Math.floor(imgLocal.getImage().width / 2), Math.floor(imgLocal.getImage().height / 2));
    pantalla2.rotate(angulo * Math.PI / 180);
    pantalla2.translate(-Math.floor(imgLocal.getImage().width / 2), -Math.floor(imgLocal.getImage().height / 2));
    pantalla2.drawImage(imgLocal.getImage(), 0, 0);
}
function shearingX(evt) {
    var argss = prompt('Ingresa un factor de shearing');
    var factor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingX(imagenSal, factor));
}
function shearingY(evt) {
    var argss = prompt('Ingresa un factor de shearing');
    var factor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingY(imagenSal, factor));
}
function tAfin(evt) {
    var argss = prompt('Ingresa 6 valores para t Afin, con x3<x1<x2 y y1<y2, y1<y3');
    var factores = argss.split(',').map(function (elem) { return parseInt(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.tAfin(imagenSal, factores));
}
//operaciones nuevas/proyecto/
function BorrarRojo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorRojo(imagenSal.getArrayImg()));
}
function BorrarVerde(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorVerde(imagenSal.getArrayImg()));
}
function BorrarAzul(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.borrarColorAzul(imagenSal.getArrayImg()));
}
function Barrido(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Pregunta al usuario la dirección del barrido
    var direccion = prompt('Ingresa la dirección del barrido: (horizontal/vertical)').toLowerCase();
    // Verifica que la dirección ingresada sea válida
    if (direccion !== 'horizontal' && direccion !== 'vertical') {
        alert('Dirección no válida. Selecciona horizontal o vertical.');
        return;
    }
    // Aplica la función de efecto de barrido con la dirección proporcionada
    imagenSal.imageArray2DtoData(pantalla2, MathImg.Barrido(imagenSal.getArrayImg(), direccion));
}
function Prisma(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Aplica la función de efecto de prisma
    imagenSal.imageArray2DtoData(pantalla2, MathImg.efectoPrisma(imagenSal.getArrayImg()));
}
function Curvatura(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Aplica la función de efecto de curvatura
    imagenSal.imageArray2DtoData(pantalla2, MathImg.Curvatura(imagenSal.getArrayImg()));
}
function Puzzle(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
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
document.getElementById("iniciarEfectoPokemonBall").addEventListener('click', iniciarEfectoPokemonBall);
