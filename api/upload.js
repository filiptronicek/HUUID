// get the client
const mysql = require('mysql2');
const Catbox = require('catbox.moe');

require('dotenv').config();

async function getImg() {
    const url = "https://trnck.dev/person.jpg";
    const ctb = new Catbox.Catbox();
    const img = await ctb.upload(url);
    return img;
}

module.exports = (req, res) => {

    const digest = req.query.digest || "6311c740feb0d3cb8f714852f4810d444512c8f5cb1cc16b75b7a018333316b2";

    // create the connection to database
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    // simple query
    connection.query(`SELECT * FROM huuid WHERE digest = '${digest}'`, (_err, results) => {
        if (results.length > 0) {
            console.log(results[0].data); // results contains rows returned by server
            connection.close();
            res.send({status: "success", result: results[0].data});
        } else {
            (async () => {
                connection.query(`INSERT INTO \`huuid\` (\`id\`, \`digest\`, \`data\`) VALUES (NULL, '${digest}', '${
                    await getImg()
                }') `, (_err, _wResults) => {
                    if (_err) {
                        console.log(_err);
                    } else {
                        connection.query(`SELECT * FROM huuid WHERE digest = '${digest}'`, (_err, dbResult) => {
                            res.send({status: "success", result: dbResult[0].data});
                        });
                    } connection.close();
                });
            })();
        }
    });

}
