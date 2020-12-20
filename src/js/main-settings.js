export const mainSettings = {
  subscribe(name, callback) {
    this[name] = callback;
  },
  redraw: null,

  _lineWidth: 10,
  set lineWidth(value) { 
    this._lineWidth = value;
    this.redraw();
    // drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate, mainSettings);
  },
  get lineWidth() { return this._lineWidth },

  _colorBG: '#fff',
  set colorBG(value) { 
    this._colorBG = value;
    drawAreaBG.style.backgroundColor = this._colorBG;
  },
  get colorBG() { return this._colorBG },

  _color: 'red',
  set color(value) {
    this._color = value;
    this.redraw()
    // drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate, mainSettings);
  },
  get color() { return this._color },
  
},
