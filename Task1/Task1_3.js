const t13 = (input, k) => {
  for (let i = 0; i < input.length; i++) {
    let targetIndex = input.indexOf(k - input[i]);
    if (targetIndex != -1 && targetIndex != i) {
      return true;
    }
  }
  return false;
};
console.log(t13([10, 15, 3, 7], 17));
console.log(t13([10, 15, 3, 7], 20));
console.log(t13([0, 15, 3, 7], 0));
console.log(t13([10, 0, 3, 7], 0));
