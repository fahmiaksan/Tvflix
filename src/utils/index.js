import { FastAverageColor } from 'fast-average-color';

export const getImageGenerator = async (image) => {
  const fac = new FastAverageColor();
  try {
    return await fac.getColorAsync(image);
  } catch (error) {
    throw new Error(error);
  }
}

export const calcTime = (time) => {
  return Math.floor(time / 60) + 'h ' + time % 60 + 'm';
}