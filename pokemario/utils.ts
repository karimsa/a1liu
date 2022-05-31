import { Size } from "./sprite";

export function assertType<T>(value: T) {}

export function projectSize(initialSize: Size, screen: Size): Size {
  if (screen.width > screen.height) {
    return projectSizeByHeight(initialSize, screen.height);
  }
  return projectSizeByWidth(initialSize, screen.width);
}

export function projectSizeByWidth(size: Size, targetWidth: number): Size {
  return {
    width: targetWidth,
    height: targetWidth / (size.width / size.height),
  };
}

export function projectSizeByHeight(size: Size, targetHeight: number): Size {
  return {
    width: targetHeight * (size.width / size.height),
    height: targetHeight,
  };
}

export function pickOne<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]!;
}

export function randInt(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}

export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function filterSet<T>(set: Set<T>, keepElm: (elm: T) => boolean) {
  set.forEach((elm) => {
    if (!keepElm(elm)) {
      set.delete(elm);
    }
  });
}
