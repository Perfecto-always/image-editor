import { formats } from "../utils/fomats";
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
    this._imgData.data.set(imgData.data);
  }

  desaturater(mode: "max" | "min" | "luma") {
    for (let i = 0; i < this._originalImgData.data.length; i += 4) {
      const r = this._imgData.data[i];
      const g = this._imgData.data[i + 1];
      const b = this._imgData.data[i + 2];
      const a = this._imgData.data[i + 3];

      const gray =
        mode === "max"
          ? Math.max(r, g, b)
          : mode === "min"
          ? Math.min(r, g, b)
          : 0.2126 * r + 0.7152 * g + 0.0722 * b;

      this._imgData.data[i] = gray;
      this._imgData.data[i + 1] = gray;
      this._imgData.data[i + 2] = gray;
      this._imgData.data[i + 3] = a;
    }
    this.showImage();
  }

  invert() {
    for (let i = 0; i < this._originalImgData.data.length; i += 4) {
      const r = this._imgData.data[i];
      const g = this._imgData.data[i + 1];
      const b = this._imgData.data[i + 2];
      const a = this._imgData.data[i + 3];

      this._imgData.data[i] = 255 - r;
      this._imgData.data[i + 1] = 255 - g;
      this._imgData.data[i + 2] = 255 - b;
      this._imgData.data[i + 3] = a;
    }
    this.showImage();
  }

  saturate(value = 0.75) {
    for (let i = 0; i < this._originalImgData.data.length; i += 4) {
      const r = this._imgData.data[i];
      const g = this._imgData.data[i + 1];
      const b = this._imgData.data[i + 2];
      const a = this._imgData.data[i + 3];

      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      this._imgData.data[i] = -gray * 0.9 + r * (1 + value);
      this._imgData.data[i + 1] = -gray * 0.9 + g * (1 + value);
      this._imgData.data[i + 2] = -gray * 0.9 + b * (1 + value);
      this._imgData.data[i + 3] = a;
    }
    this.showImage();
  }

  grain(value = 50) {
    for (let i = 0; i < this._originalImgData.data.length; i += 4) {
      const r = this._imgData.data[i];
      const g = this._imgData.data[i + 1];
      const b = this._imgData.data[i + 2];
      const a = this._imgData.data[i + 3];

      this._imgData.data[i] = r - value / 2;
      this._imgData.data[i + 1] = g - value * (1 - Math.random());
      this._imgData.data[i + 2] = b - value * (1 - Math.random());
      this._imgData.data[i + 3] = a;
    }
    this.showImage();
  }

  private showImage() {
    this._ctx?.putImageData(this._imgData, 0, 0);
  }

  private showOriginalImage() {
    this._ctx.putImageData(this._originalImgData, 0, 0);
  }

  restore() {
    this._imgData.data.set(this._originalImgData.data);
    this.showOriginalImage();
  }

  download(format: typeof formats[number]) {
    const anchor = document.createElement("a");
    const img = this._canvas.toDataURL(`image/${format}`);
    anchor.setAttribute("download", `download.${format}`);
    anchor.setAttribute("href", img);
    const bool = window.confirm("Do you want to download image?");
    if (bool) {
      anchor.click();
    } else {
      return;
    }
  }
}

export const imageProcessing = new Image();
