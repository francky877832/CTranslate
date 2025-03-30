const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../shared/.env') });




exports.googleSpeechTotext = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "No file received" });
        }
        const client = new speech.SpeechClient();

        const filePath = req.file.path;
        const outputPath = filePath.replace('.m4a', '.flac');

        //console.log("Received file:", filePath);
        //console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

        ffmpeg(filePath)
            .audioCodec('flac')
            .audioFrequency(44100)
            .audioChannels(1)
            .on('end', async () => {
                //console.log("Conversion completed:", outputPath);

                const audio = {
                    content: fs.readFileSync(outputPath).toString('base64')
                };

                //console.log("Encoded file size:", audio.content.length);

                const request = {
                    audio,
                    config: {
                        encoding: 'FLAC',
                        sampleRateHertz: 44100,
                        languageCode: req.body.language || 'en-US'
                    }
                };

                try {
                    const [response] = await client.recognize(request);

                    if (!response.results || response.results.length === 0) {
                        console.log("No transcription")
                        return res.status(400).json({ error: "No transcription found. Please check the audio." });
                    }

                    const transcript = response.results.map(result => result.alternatives[0].transcript).join('\n');

                    fs.unlinkSync(filePath);
                    fs.unlinkSync(outputPath);

                    res.status(200).json({ message: "success", data: transcript });
                } catch (err) {
                    console.error("Error during transcription:", err);
                    return res.status(500).json({ error: 'Error during audio transcription' });
                }
            })
            .on('error', (err) => {
                console.error('FFmpeg conversion error:', err);
                return res.status(500).json({ error: 'Audio conversion error' });
            })
            .save(outputPath);
    } catch (error) {
        console.error("Error during transcription:", error);
        res.status(500).json({ error: "Server error" });
    }
};







exports.googleTextToSpeech = async (req, res) => {
    try {
        const client = new textToSpeech.TextToSpeechClient();
console.log("Here")
console.log(req.body)
        const { text, languageCode = 'fr-FR', voiceName = 'fr-FR-Wavenet-A' } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const request = {
            input: { text: text },
            voice: { languageCode: languageCode, name: voiceName },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);

        const outputPath = path.join('./assets/audio/output', `audio_${Date.now()}.mp3`);

        fs.writeFileSync(outputPath, response.audioContent, 'binary');

        console.log("Audio content written to file:", outputPath);

        res.status(200).json({ message: "success", data: {text:text, audio:outputPath} });
    } catch (error) {
        console.error("Error during text-to-speech:", error);
        res.status(500).json({ error: "Error during text-to-speech conversion" });
    }
};

