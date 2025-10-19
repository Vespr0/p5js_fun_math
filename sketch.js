// Scala per i vettori (per renderli più visibili)
let scale = 50; 
// Range dei valori di input (da -range a +range)
let range = 5; 

let heatmap; // Buffer grafico per la mappa di calore

import {drawHeatmap} from "util/heatmap";

// --- SETUP INIZIALE ---

// Definiamo la nostra funzione a 2 variabili
function f(x, y) {
  return sin(x) + cos(y);
}

// Derivata parziale rispetto a x (calcolata analiticamente)
// d/dx (sin(x) + cos(y)) = cos(x)
function dfdx(x, y) {
  return cos(x);
}

// Derivata parziale rispetto a y (calcolata analiticamente)
// d/dy (sin(x) + cos(y)) = -sin(y)
function dfdy(x, y) {
  return -sin(y);
}

function setup() {
  createCanvas(600, 600);
  colorMode(RGB, 255); // Usiamo RGB
  
  // Creiamo un buffer grafico per disegnare la heatmap solo una volta
  // Questo è molto più efficiente che ricalcolarla ad ogni frame
  heatmap = createGraphics(width, height);
  heatmap.colorMode(RGB, 255);
  
  // Disegniamo la heatmap sul buffer
  drawHeatmap();
}

// --- LOOP PRINCIPALE ---

function draw() {
  // 1. Disegniamo la nostra heatmap statica (veloce)
  image(heatmap, 0, 0);

  // 2. Mappiamo la posizione del mouse (pixel) alle coordinate (x, y)
  let x = map(mouseX, 0, width, -range, range);
  let y = map(mouseY, 0, height, range, -range);

  // 3. Calcoliamo le derivate parziali in quel punto (x, y)
  let partial_x = dfdx(x, y);
  let partial_y = dfdy(x, y);

  // 4. Disegniamo i vettori!
  push(); // Iniziamo un nuovo stato di disegno
  translate(mouseX, mouseY); // Spostiamo l'origine sul mouse
  
  strokeWeight(3);
  
  // Vettore df/dx (Rosso) - si muove solo lungo l'asse x
  stroke(255,0,0); // Rosso
  line(0, 0, partial_x * scale, 0);

  // Vettore df/dy (Blu) - si muove solo lungo l'asse y
  stroke(0,0,255); // Blu
  // Nota: -partial_y perché l'asse y di p5js è invertito rispetto alla matematica
  line(0, 0, 0, -partial_y * scale); 

  // Vettore Gradiente ∇f (Bianco) - la somma dei due vettori
  stroke(255,255,255); // Bianco
  line(0, 0, partial_x * scale, -partial_y * scale);
  
  pop(); // Ripristiniamo lo stato di disegno

  // 5. Mostriamo i valori
  fill(255);
  noStroke();
  textSize(14);
  text(`f(x, y) = ${f(x,y).toFixed(2)}`, 10, 20);
  text(`df/dx (rosso) = ${partial_x.toFixed(2)}`, 10, 40);
  text(`df/dy (blu)   = ${partial_y.toFixed(2)}`, 10, 60);
}
