export const mainSettings = {
  subscribe(name, callback) {
    this[name] = callback;
  },

  redraw: null,

  _lineWidth: 10,
  set lineWidth(value) { 
    this._lineWidth = value;
    this.redraw();
  },
  get lineWidth() { return this._lineWidth },

  _colorBG: '#fff',
  set colorBG(value) { 
    this._colorBG = value;
    drawAreaBG.style.backgroundColor = this._colorBG;
  },
  get colorBG() { return this._colorBG },

  _lineColor: 'red',
  set lineColor(value) {
    this._lineColor = value;
    this.redraw()
  },
  get lineColor() { return this._lineColor },

  drawMode: {
      color: '#000',
      lineWidth: 1,
  },
}
