const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";





app.use(cors());



app.use(bodyParser.json());
app.post('/userManagement/update', function (req, res) {
    return res.status(200).send("Row Updated");
})

app.listen(8888);