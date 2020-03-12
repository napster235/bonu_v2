import { mergeRight } from 'ramda';

export function getBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    }, false);


    if (file.type === 'image/svg+xml') {
      mergeRight(file, { type: 'image/svg' });
    }

    if (is(File, file)) {
      reader.readAsDataURL(file);
    } else {
      resolve(file);
    }
  });
}