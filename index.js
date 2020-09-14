const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const sum = parseInt(req.query.a) + parseInt(req.query.b);
  if (!req.query.a || !req.query.b) {
    return res.status(400).send('Please provide two integers');
  }
  res.send(`The sum of ${req.query.a} and ${req.query.b} is ${sum}`);
});

app.get('/cipher', (req, res) => {
  if (!req.query.text || !req.query.shift) {
    return res.status(400).send('Please provide both a text and shift number');
  }

  const text = req.query.text.toUpperCase();
  const shift = parseInt(req.query.shift);
  let ans = '';
  for (let i = 0; i < text.length; i++) {
    let num = text[i].charCodeAt(0) + shift;
    if (num > 90) {
      num = 64 + (num - 90);
    }
    ans += String.fromCharCode(num);
  }

  res.send(ans);
});

app.get('/lotto', (req, res) => {
  const q = req.query.arr;
  const array = { arr: q };
  let randoms = [];
  let count = 0;
  for (let i = 0; i < array.arr.length; i++) {
    let num = Math.ceil(Math.random() * 20);

    randoms.push(num);
  }
  for (let i = 0; i < array.arr.length; i++) {
    for (let n = 0; n < randoms.length; n++) {
      if (parseInt(array.arr[i]) === randoms[n]) {
        count += 1;
      }
    }
  }
  if (count < 4) {
    res.send('Sorry, you lose.' + ' ' + count);
  } else if (count === 4) {
    res.send('Congratulations, you win a free ticket' + ' ' + count);
  } else if (count === 5) {
    res.send('Congratulations! You win $100!' + ' ' + count);
  } else if (count === 6) {
    res.send(
      'Wow! Unbelievable! You could have won the mega millions!' + ' ' + count
    );
  }
});

/* app.get('/grade', (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res.status(400).send('Please provide a mark');
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res.status(400).send('Mark must be a numeric value');
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res.status(400).send('Mark must be in range 0 to 100');
  }

  if (numericMark >= 90) {
    return res.send('A');
  }

  if (numericMark > 80) {
    return res.send('B');
  }

  if (numericMark >= 70) {
    return res.send('C');
  }

  res.send('F');
}); */

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
/* 
app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(`Yadingus: ${greeting}`);
});
 */
