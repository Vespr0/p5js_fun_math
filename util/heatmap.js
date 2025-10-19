function drawHeatmap() {
  heatmap.loadPixels();
  // Iteriamo su ogni pixel dello schermo
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      
      // Mappiamo la posizione (i, j) del pixel alle coordinate (x, y) della funzione
      let x = map(i, 0, width, -range, range);
      // Nota: y del pixel 0 è in alto, y della funzione 0 è al centro
      let y = map(j, 0, height, range, -range); 

      // Calcoliamo il valore z = f(x, y)
      let z = f(x, y); // Il range di z va da -2 a 2

      // Mappiamo il valore z (da -2 a 2) a un colore (da 0 a 255)
      let brightness = map(z, -2, 2, 0, 255); 
      
      heatmap.set(i, j, color(brightness)); // Disegniamo il pixel sul buffer
    }
  }
  heatmap.updatePixels();
}
