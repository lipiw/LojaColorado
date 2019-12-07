app = require('./config/custom-express.js');

app.listen(process.env.PORT || 3000, () => {
    console.log(`Aplicação iniciada na porta ${process.env.PORT || 3000}`);
});