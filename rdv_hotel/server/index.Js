const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

let app = express();
app.use(express.json());
app.use(cors());

let db = mysql.createConnection({
    user: "root",
    password: "",
    database: "reserverestau",
    host: "localhost",
});

db.connect((err) => {
    if (err) throw err;

    app.post("/reserv", (req, res) => {
        let response = req.body;
        db.query(
            `INSERT INTO infos(id, prenom, nom, date_arrive, date_depart, personnes) VALUES (NULL, "${response.nickname}","${response.name}", "${response.dateArrived}","${response.dateLeave}",${response.person})`,
            (err, valid) => {
                if (err || valid.length < 1)
                    res.json({ message: "erreur lors de la requête" });

                res.json({ message: "Votre réservation a bien été pris en compte" })
            }
        );
    });
});

app.listen(7000, () => {
    console.log("connecté");
});
