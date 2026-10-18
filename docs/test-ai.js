const axios = require('axios');

const testAI = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/ai/plan-task', {
      description: "Build a portfolio website in 3 days"
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

testAI();