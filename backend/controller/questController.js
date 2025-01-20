const pdfParse = require('pdf-parse');
const generateQuestPaper = require("../middleware/LLMintegration")

const questController = async (req, res) => {
    try {
        if (!req.files || !req.files.file1 || !req.files.file2) {
            return res.status(400).json({ error: 'Exactly two PDFs are required' });
        }

        const file1 = req.files.file1[0];
        const file2 = req.files.file2[0];

        if (file1.size > 10000000 || file2.size > 10000000) { // 10MB limit
            return res.status(400).json({ error: 'File size too large' });
        }

        const pdf1Text = await pdfParse(file1.buffer);
        const pdf2Text = await pdfParse(file2.buffer);

        if (!pdf1Text.text || !pdf2Text.text) {
            return res.status(400).json({ error: 'Could not extract text from PDFs' });
        }

        console.log(`PDF 1 length: ${pdf1Text.text.length}`);
        console.log(`PDF 2 length: ${pdf2Text.text.length}`);

        const maxLength = 4000;
        const truncatedText1 = pdf1Text.text.substring(0, maxLength);
        const truncatedText2 = pdf2Text.text.substring(0, maxLength);

        const result = await generateQuestPaper(truncatedText1, truncatedText2);

        if (!result) {
            throw new Error('No response received from LLM');
        }

        console.log('Generated Question Paper:', result);
        res.status(201).json({ 
            questionPaper: result,
            metadata: {
                pdf1Length: pdf1Text.text.length,
                pdf2Length: pdf2Text.text.length,
                truncated: (pdf1Text.text.length > maxLength || pdf2Text.text.length > maxLength)
            }
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

module.exports = questController;