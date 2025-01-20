const pdfParse = require('pdf-parse');
const generateQuiz = require("../middleware/LLMintegration")

const quizController = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ error: 'Exactly one PDFs are required' });
        }

        const file1 = req.files.file1[0];

        if (file1.size > 10000000) { // 10MB limit
            return res.status(400).json({ error: 'File size too large' });
        }

        const pdf1Text = await pdfParse(file1.buffer);

        if (!pdf1Text.text) {
            return res.status(400).json({ error: 'Could not extract text from PDFs' });
        }

        console.log(`PDF 1 length: ${pdf1Text.text.length}`);

        const maxLength = 4000;
        const truncatedText1 = pdf1Text.text.substring(0, maxLength);

        const result = await generateQuiz(truncatedText1);

        if (!result) {
            throw new Error('No response received from LLM');
        }

        console.log('Generated Quiz data:', result);
        res.status(201).json({ 
            quiz: result
        });

    } catch (err) {
        console.error('Error in questController:', err);
        res.status(500).json({ 
            error: 'Question paper generation failed',
            details: err.message,
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = quizController;