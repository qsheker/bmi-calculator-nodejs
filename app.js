const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const muscle = parseFloat(req.body.muscle) || 0;
  const fat = parseFloat(req.body.fat) || 0;

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.send(`
      <h2>Please enter positive numbers for weight and height.</h2>
      <a href="/">Go back</a>
    `);
  }

  const bmi = weight / (height * height);

  let category = '';
  let color = '';
  
  let recommendations = {
    underweight: 'Eat more',
    normal: 'Keep it!',
    overweight: 'Eat less food',
    obese: 'Consult a doctor. Eat less food!'
  };

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'blue';
  } else if (bmi < 24.9) {
    category = 'Normal';
    color = 'green';
  } else if (bmi < 29.9) {
    category = 'Overweight';
    color = 'yellow';
  } else {
    category = 'Obese';
    color = 'red';
  }

const style_for_response = `max-width:400px;margin:40px auto;padding:20px;border-radius:12px;
                             background-color:${color};color:white;text-align:center;
                             box-shadow:0 5px 15px rgba(0,0,0,0.2);font-family:Arial,sans-serif;`;

res.send(`
  <div style="${style_for_response}">
    <h2>Your BMI: ${bmi.toFixed(2)}</h2>
    <h3>Category: ${category}</h3>
    <p>Muscle Index: ${muscle}</p>
    <p>Fat Density: ${fat}</p>
    <p>Recommendation: ${recommendations[category.toLowerCase()]}</p>
    <a href="/" style="color:white; text-decoration:underline;">Go back</a>
  </div>
`);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
