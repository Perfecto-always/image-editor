export class Image {
  private _canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private _ctx = this._canvas.getContext("2d")!;
  private _imgData!: ImageData;
  private _originalImageData!: ImageData;
  public width!: number;
  public height!: number;

  constructor() {
    this._imgData = this._ctx.getImageData(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
    this._originalImageData = this._ctx.getImageData(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
  }

  public set newImgData(imgData: ImageData) {
    this.width = imgData.width;
    this.height = imgData.height;
    this._originalImageData = imgData;
  }

  desaturater(mode: "max" | "min") {
    for (let i = 0; i < this._originalImageData.data.length; i += 4) {
      const r = this._originalImageData.data[i];
      const g = this._originalImageData.data[i + 1];
      const b = this._originalImageData.data[i + 2];
      const a = this._originalImageData.data[i + 3];

      const gray = mode === "max" ? Math.max(r, g, b) : Math.min(r, g, b);

      this._imgData.data[i] = gray;
      this._imgData.data[i + 1] = gray;
      this._imgData.data[i + 2] = gray;
      this._imgData.data[i + 3] = a;
    }

    this._ctx?.putImageData(this._imgData, 0, 0);
  }

  restore() {
    this._ctx.putImageData(this._originalImageData, 0, 0);
  }

  download() {
    const anchor = document.createElement("a");
    const img = this._canvas.toDataURL("image/webp");
    anchor.setAttribute("download", "download.webp");
    anchor.setAttribute("href", img);
    anchor.click();
  }
}

export let imageProcessing = new Image();
