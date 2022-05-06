export class Image {
  private _canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private _ctx = this._canvas.getContext("2d")!;
  private _imgData!: ImageData;
  private _originalImgData!: ImageData;
  public width!: number;
  public height!: number;

  constructor() {
    this._imgData = this._ctx.getImageData(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
    this._originalImgData = this._ctx.getImageData(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
  }

  public set newImgData(imgData: ImageData) {
    this.width = imgData.width;
    this.height = imgData.height;
    this._originalImgData = imgData;
  }

  desaturater(mode: "max" | "min") {
    for (let i = 0; i < this._originalImgData.data.length; i += 4) {
      const r = this._originalImgData.data[i];
      const g = this._originalImgData.data[i + 1];
      const b = this._originalImgData.data[i + 2];
      const a = this._originalImgData.data[i + 3];

      const gray = mode === "max" ? Math.max(r, g, b) : Math.min(r, g, b);

      this._imgData.data[i] = gray;
      this._imgData.data[i + 1] = gray;
      this._imgData.data[i + 2] = gray;
      this._imgData.data[i + 3] = a;
    }

    this._ctx?.putImageData(this._imgData, 0, 0);
  }

  restore() {
    this._ctx.putImageData(this._originalImgData, 0, 0);
  }

  download() {
    const anchor = document.createElement("a");
    const img = this._canvas.toDataURL("image/webp");
    anchor.setAttribute("download", "download.webp");
    anchor.setAttribute("href", img);
    const bool = window.confirm("Do you want to download image?");
    if (bool) {
      anchor.click();
    } else {
      return;
    }
  }
}

export let imageProcessing = new Image();
