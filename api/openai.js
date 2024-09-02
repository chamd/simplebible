const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { word } = req.body;
      const response = await openai.chat.completions.create({
        // model: 'gpt-4o-2024-08-06',
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: '대답양식:1.구절을 찾은 경우:"성경이름/장/절 (여러개면 "|"로 구분 ex:창세기/1/1|출애굽기/1/1,연속구절이면 "성경이름/장/절-절"로 출력 ex:창세기/1/1-3)",최대출력수:20,결과20개이상:더 연관성 높은 결과 출력,2.구절이 없는 경우:0,주의사항:이 외의 글을 쓰지 마시오' },
          { role: 'user', content: word },
        ],
      });

      res.status(200).json(response.choices[0].message.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Error calling OpenAI API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};