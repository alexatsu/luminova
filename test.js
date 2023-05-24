function rgb(r, g, b) {
  const roundInputs = () =>
    [r, g, b].map((value) => {
      if (value < 0) return 0;
      if (value > 255) return 255;
      return value;
    });

  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  const rgbToHex = (array, toHex) => {
    return array.map((value) => toHex(value).toUpperCase()).join("");
  };

  return rgbToHex(roundInputs([r, g, b]), toHex);
}
