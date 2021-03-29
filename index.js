const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

const PORT = 8000;

app.use(cors());

app.get("/oauth/callback", (req, res) => {
    const { query } = req;
    const { code } = query;

    const data = {
        client_id: '606106b402d92b57ab55',
        client_secret: '5a8307210ecb6ef32f63411130040ed318995e6b',
        code: code
    }
    const authTokenUrl = "https://github.com/login/oauth/access_token"

    request.post({ url: authTokenUrl, formData: data, json: true }, (error, response, body) => {
        if (response["statusCode"] === 200) {
            if (!body['error']) {
                const { access_token } = body;

                res.redirect(`http://localhost:3000/oauth?access_token=${access_token}`);
            } else {
                res.send(body);
            }
        } else {
            res.send(response["statusCode"]);
        }
    });
});

app.listen(PORT, () => console.log(`Express server currently running on port http://127.0.0.1:${PORT}`));