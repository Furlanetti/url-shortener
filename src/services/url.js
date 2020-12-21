const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
  ""
);
const base = alphabet.length;

const encode = (number) => {
  if (number === 0) return alphabet[0];
  let s = "";
  while (number > 0) {
    s += alphabet[number % base];
    number = parseInt(number / base, 10);
  }
  return s.split("").reverse().join("");
};

const decode = (short) => {
  let i = 0;

  short.split("").forEach((c) => {
    i = i * base + alphabet.indexOf(c);
  });
  return i;
};

const isValid = (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
};

module.exports = { decode, encode, isValid };
