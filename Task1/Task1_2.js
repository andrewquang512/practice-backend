const t12 = (input) => {
  let ResArray = [];
  let previous = input[0];
  let count = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== previous) {
      ResArray.push(count === 1 ? '' : count, previous);

      count = 1;
      previous = input[i];
    } else {
      count++;
    }
  }
  ResArray.push(count === 1 ? '' : count, previous);
  return ResArray.join('');
};
console.log(t12('AABBBCCCCCAADDDD'));
console.log(t12('PPPQRRRSTTQQS'));
console.log(t12('XYZ'));
