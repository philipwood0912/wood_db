const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        //console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        res.render('home', { people: result }); //people is the object where data is stored
    })
})

router.get('/:id', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the user route');
    console.log(req.params.id); // 1, 2, 3

    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // convert social property into an array maps one value to another
        // map is a function that that allows you to map one value to another
        result[0].social = result[0].social.split(',').map(function(item) {
            item = item.trim();
            // trim removes white space
            return item;
        });

        console.log("after trim / conversion:", result[0]);

        // render the home view with dynamic data
        res.json(result[0]);
    })
})

module.exports = router;