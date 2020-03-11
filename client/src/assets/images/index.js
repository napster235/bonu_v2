function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./', true, /\.(png|jpe?g|svg)$/));
export default images;
