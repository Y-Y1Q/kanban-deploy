declare module "fast-average-color";
declare module "fast-average-color" {
  export default class FastAverageColor {
    getColorAsync(image: HTMLImageElement): Promise<{
      rgba: string;
      hex: string;
      rgb: string;
    }>;
  }
}
