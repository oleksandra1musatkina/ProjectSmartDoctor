const http = require('http');
const express = require('express');
const mongo = require('mongodb').MongoClient;
const cors = require('cors');
const TokenGenerator = require('uuid-token-generator');
const crypto = require('crypto');
const ObjectID = require('mongodb').ObjectID;
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
binary = require('binary');
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});
const IMAGE_PATH = '/var/www/html/1n/musatkinao/sd/assets/uploads/';


var app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


let tokems = [];
let url = "mongodb://localhost:27017/";


function getConnection() {


}

function poluteDatabase() {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("SmartDoctor");
        let patient = {
            firstname: "Saska",
            surname: "Musatkina",
            birdthdate: "21.04.1999",
            password: "heslo",
            email: "saska@musatkina.sk",
            address: "Jedlikova 13",
            city: "Kosice",
            state: "Slovakia",
            sex: "woman",
            insuranceNumber: "",
            alergies: [],
            drugs: [{name: "aspirin", times: ["7:30", "10:50"]}, {name: "acilpirin", times: null}],
            badHabits: [],
            doctors: [],
            rating: [],
            notes: []
        };
        let doctor = {
            firstname: "Jan",
            surname: "Novotny",
            birdthdate: "21.04.1889",
            password: "heslo",
            email: "jan.novotny@gmail.com",
            address: "Jedlikova 13",
            city: "Kosice",
            state: "Slovakia",
            patients: [],
            insurances: []
        };
        let doctor2 = {
            firstname: "Stefan",
            surname: "Hruby",
            birdthdate: "21.04.1945",
            password: "heslo",
            email: "stean.hruby@gmail.com",
            address: "Jedlikova 13",
            city: "Kosice",
            state: "Slovakia",
            patients: [],
            insurances: []
        };
        let examinations = {
            examintaions: [
                {
                    type: "prenentyvna prehliadka",
                    doctor: "5ce92dfe8a30617fcb6d4c46",
                    date: new Date()
                },
                {
                    type: "prenentyvna prehliadka u zubara",
                    doctor: "5ce92dfe8a30617fcb6d4c46",
                    date: new Date('2020-05-18T16:00:00Z')
                }
            ]
        };
        let insurances = [
            {
                name: 'Dovera',
                imageref: "dovera.png"
            },
            {
                name: 'Vseobecna zdravotna poistovna',
                imageref: "vseobecna.jpg"
            },
            {
                name: 'Union',
                imageref: "union.jpg"
            }
        ];
        let notifications =
            [
                {
                    type: 'request',
                    from: '5ce92e06c8b8bd7feb065590',
                    fromtype: 'doctor',
                    to: '5ce3c93f05ecce2fdebcaf89',
                    totype: 'patient',
                    heading: 'pozvanka na prehliadku',
                    message: 'prid na preventyvnu prehliadku',
                    dateadded: new Date(),
                    eventtype: 'preventyvna prehliatka',
                    eventdate: new Date(' x ')
                },
                {
                    type: 'info',
                    from: '5ce92dfe8a30617fcb6d4c46',
                    fromtype: 'doctor',
                    to: '5ce3c93f05ecce2fdebcaf89',
                    totype: 'patient',
                    heading: 'request accepted',
                    message: 'your request for preventyvna prehliadka has been accepted',
                    dateadded: new Date(),
                    eventtype: null,
                    eventdate: null
                }
            ];

        let doc = [
            {
                "_id": ObjectID("5ce92dfe8a30617fcb6d4c46"),
                "firstname": "Jan",
                "surname": "Novotny",
                "birdthdate": "21.04.1889",
                "password": "heslo",
                "email": "jan.novotny@gmail.com",
                "address": "Jedlikova 13",
                "city": "Kosice",
                "state": "Slovakia",
                "patients": [],
                "insurances": [],
                "doctors": [
                    [
                        "5ce92dfe8a30617fcb6d4c46"
                    ]
                ],
                "opening": {
                    "mon": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "tue": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "wed": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "thu": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "fri": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "sat": {
                        "open": "08:30",
                        "close": "11:30"
                    },
                    "sun": {
                        "open": "07:30",
                        "close": "15:30"
                    }
                },
                "maxpatients": 20,
                "estimatedpatienttime": 15
            },
            {
                "_id": ObjectID("5ce92e06c8b8bd7feb065590"),
                "firstname": "Stefan",
                "surname": "Novvy",
                "birdthdate": "21.04.1945",
                "password": "heslo",
                "email": "stean.hruby@gmail.com",
                "address": "Jedlikova 13",
                "city": "Kosice",
                "state": "Slovakia",
                "patients": [
                    "5ce3c93f05ecce2fdebcaf89"
                ],
                "insurances": [],
                "opening": {
                    "mon": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "tue": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "wed": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "thu": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "fri": {
                        "open": "07:30",
                        "close": "15:30"
                    },
                    "sat": {
                        "open": "08:30",
                        "close": "11:30"
                    },
                    "sun": {
                        "open": "07:30",
                        "close": "15:30"
                    }
                },
                "rating": [
                    {
                        "patient": "5ce3c93f05ecce2fdebcaf89",
                        "rate": "5"
                    }
                ],
                "maxpatients": 20,
                "estimatedpatienttime": 15
            }

        ];
        let pat = [
            {
                "_id": ObjectID("5ce3c93f05ecce2fdebcaf89"),
                "firstname": "Saska",
                "surname": "Musatkina",
                "birdthdate": "21.04.1999",
                "password": "heslo",
                "email": "saska@musatkina.sk",
                "address": "Jedlikova 13",
                "city": "Kosice",
                "state": "Slovakia",
                "sex": "woman",
                "insuranceNumber": "5cec7ba9b9f05f20b57383ad",
                "alergies": [],
                "drugs": [
                    {
                        "name": "aspirin",
                        "times": []
                    }
                ],
                "badHabits": [],
                "doctors": [
                    "5ce92dfe8a30617fcb6d4c46",
                    "5ce92e06c8b8bd7feb065590"
                ],
                "rating": [],
                "notes": [],
                "examintaions": [
                    {
                        "type": "prenentyvna prehliadka",
                        "doctor": "5ce92dfe8a30617fcb6d4c46",
                        "date": Date("2019-05-27T10:31:45.708Z")
                    },
                    {
                        "type": "prenentyvna prehliadka u zubara",
                        "doctor": "5ce92dfe8a30617fcb6d4c46",
                        "date": Date("2020-05-18T16:00:00Z")
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "pozvanka na prehliadku",
                        "date": "2020-05-17T16:00:00.000Z",
                        "note": "prid na preventyvnu prehliadku"
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "preventyvna prehliatka",
                        "date": "2019-05-30T07:50:00.000Z",
                        "note": "chcem sa objednat na prehliatku"
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "",
                        "date": null,
                        "note": ""
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "iii",
                        "date": "2019-05-30T12:30:00.000Z",
                        "note": "qqqqqq"
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "123",
                        "date": "2019-05-30T12:50:00.000Z",
                        "note": "asd"
                    },
                    {
                        "doctor": "5ce92e06c8b8bd7feb065590",
                        "type": "poi",
                        "date": "2019-06-20T12:30:00.000Z",
                        "note": "lkkhgffhj"
                    }
                ]
            }


        ];
        // dbo.collection("patients").insertOne(patient, function (err, res) {
        // dbo.collection("doctors").insertOne(doctor2, function (err, res) {
        // dbo.collection("doctors").insertOne(doctor2, function (err, res) {

        // dbo.collection("patients").update({_id: ObjectID('5ce3c93f05ecce2fdebcaf89')}, {$set: examinations}, function (err, result) {
        // dbo.collection("insurances").insertMany(insurances, function (err, res) {
        // dbo.collection("notifications").insertMany(notifications, function (err, res) {
        // dbo.collection("doctors").update({}, {$set: {"estimatedpatienttime": 15}}, function (err, res) {
        dbo.collection("insurances").insertMany(insurances, function (err, res) {

            if (err) throw err;
            console.log("insurances inserted");
            dbo.collection("doctors").insertMany(doc, function (err, res) {

                if (err) throw err;
                console.log("doctors inserted");
                dbo.collection("patients").insertMany(pat, function (err, res) {

                    if (err) throw err;
                    console.log("patients inserted");
                    db.close();
                });
            });

            // db.close();
        });
    });


}

// poluteDatabase();

app.post('/login', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").findOne({$and: [{"email": email}, {"password": password}]}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, {type: 'patient', userdata: result});
                } else {
                    dbo.collection("doctors").findOne({$and: [{"email": email}, {"password": password}]}, function (err, result) {
                        if (err) throw err;
                        if (result) {

                            console.log(result);
                            callbackFunction(200, {type: 'doctor', userdata: result});

                        } else {
                            callbackFunction(401, "wrong conditionals");

                        }

                    });
                }

                db.close();
            });
        });
    }

});

app.post('/logout', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };


    let name = req.body.name;
    let token = req.body.token;
    if (!name || !token) {
        callbackFunction(401, "wrong conditionals");
        return;
    }
    let indexViaName = getIndexViaName(tokems, name);
    console.log("indexViaName: " + indexViaName);
    if (indexViaName >= 0) {
        if (tokems[indexViaName].token != token) {
            callbackFunction(401, "wrong conditionals");
            return;
        }
    } else {
        callbackFunction(401, "wrong conditionals");
        return;
    }
    tokems.splice(indexViaName, 1);
    callbackFunction(200, "logged out");

});

app.post('/insurances', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    // let email = req.body.email;
    // let password = req.body.password;
    // if (!email || !password) {
    //     callbackFunction(401, "wrong conditionals");
    // } else {


    mongo.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("SmartDoctor");

        dbo.collection("insurances").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result) {

                console.log(result);
                callbackFunction(200, result);
            } else {
                callbackFunction(401, "wrong conditionals");

            }

            db.close();
        });
    });
    // }

});
app.post('/insurance', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    // let email = req.body.email;
    // let password = req.body.password;
    let insuranceid = req.body.insuranceid;
    if (!insuranceid) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("insurances").findOne({_id: ObjectID(insuranceid)}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");

                }

                db.close();
            });
        });
    }

});


app.post('/setpatientinsurance', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let patientid = req.body.patientid;
    let insuranceid = req.body.insuranceid;
    if (!patientid || !insuranceid) {
        callbackFunction(401, "wrong conditionals");
    }
    else {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").update({_id: ObjectID(patientid)}, {$set: {insuranceNumber: insuranceid}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "set insurance error");

                }

                db.close();
            });
        });
    }

});


app.post('/patients', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").find({}).toArray(function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");

                }

                db.close();
            });
        });
    }

});

app.post('/doctors', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").find({}).toArray(function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");

                }

                db.close();
            });
        });
    }

});


app.post('/doctor', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").findOne({_id: ObjectID("5ce92dfe8a30617fcb6d4c46")}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});

app.post('/doctor', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    if (!email || !password || !doctor) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").findOne({_id: ObjectID(doctor)}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});


app.post('/adddoctor', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let patient = req.body.patient;
    if (!email || !password || !doctor || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").update({_id: ObjectID(patient)}, {$addToSet: {doctors: doctor}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});


app.post('/addpatient', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let patient = req.body.patient;
    if (!email || !password || !doctor || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").update({_id: ObjectID(doctor)}, {$addToSet: {patients: patient}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});

app.post('/setopeninghours', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let hours = req.body.hours;
    if (!email || !password || !doctor || !hours) {
        callbackFunction(401, "wrong conditionals");
    } else {
        // hours = {
        //     opening: {
        //         mon: {open: "07:30", close: "15:30"},
        //         tue: {open: "07:30", close: "15:30"},
        //         wed: {open: "07:30", close: "15:30"},
        //         thu: {open: "07:30", close: "15:30"},
        //         fri: {open: "07:30", close: "15:30"},
        //         sat: {open: "08:30", close: "11:30"},
        //         sun: {open: "07:30", close: "15:30"}
        //     }
        // };


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").update({_id: ObjectID(doctor)}, {$set: hours}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});


app.post('/adddoctorrating', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let rating = req.body.rating;
    if (!email || !password || !doctor || !rating) {
        callbackFunction(401, "wrong conditionals");
    } else {
        // rating = {
        //     rating: [
        //         {patient: "5ce3c93f05ecce2fdebcaf89", rate: "5"}
        //     ]
        // };


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").update({_id: ObjectID(doctor)}, {$addToSet: {rating: rating}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});

app.post('/removedoctor', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let patient = req.body.patient;
    if (!email || !password || !doctor || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").update({_id: ObjectID(patient)}, {$pull: {doctors: doctor}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no doctor");

                }

                db.close();
            });
        });
    }

});
app.post('/removepatient', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let doctor = req.body.doctor;
    let patient = req.body.patient;
    if (!email || !password || !doctor || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("doctors").update({_id: ObjectID(doctor)}, {$pull: {patients: patient}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});

app.post('/refreshpatient', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    if (!email) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").findOne({"email": email}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");

                }

                db.close();
            });
        });
    }

});

// app.post('/pendingexaminations', (req, res, callbackFunction) => {
//     callbackFunction = function (status, value) {
//         res.status(status).send(value);
//     };
//
//     let email = req.body.email;
//     let patient = req.body.patient;
//     if (!email || !password || !doctor || !patient) {
//         callbackFunction(401, "wrong conditionals");
//     } else {
//
//
//         mongo.connect(url, function (err, db) {
//             if (err) throw err;
//             let dbo = db.db("SmartDoctor");
//
//             dbo.collection("patients").findOne({_id: ObjectID(patient)}, {$pull: {doctors: doctor}}, function (err, result) {
//                 if (err) throw err;
//                 if (result) {
//
//                     console.log(result);
//                     callbackFunction(200, result);
//                 } else {
//                     callbackFunction(401, "no doctor");
//
//                 }
//
//                 db.close();
//             });
//         });
//     }
//
// });


app.post('/savedata', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };
    let id = req.body.id;
    let type = req.body.type;
    let key = req.body.key;
    let value = req.body.value;
    if (!id || !type || !key || !value) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            let collection;
            if (type == 'patient') {
                collection = 'patients';
            } else {
                collection = 'doctors';

            }
            console.log("collection: " + collection);
            console.log("id: " + id);
            console.log("key: " + key);
            console.log("value: " + value);
            let updateObject = {};
            updateObject[key] = value
            dbo.collection(collection).update({_id: ObjectID(id)}, {$set: updateObject}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no key???");

                }

                db.close();
            });
        });
    }

});

app.post('/getuserdata', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };
    let id = req.body.id;
    let type = req.body.type;
    if (!id || !type) {
        callbackFunction(401, "wrong conditionals");
    } else {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            let collection;
            if (type == 'patient') {
                collection = 'patients';
            } else {
                collection = 'doctors';

            }
            dbo.collection(collection).findOne({_id: ObjectID(id)}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, {type: type, userdata: result});
                } else {
                    callbackFunction(401, "no data");

                }

                db.close();
            });
        });
    }

});

app.post('/getusernotifications', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let userid = req.body.userid;
    let usertype = req.body.usertype;
    if (!userid || !usertype) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("notifications").find({$and: [{"to": userid}, {"totype": usertype}]}).toArray(function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }

                db.close();
            });
        });
    }

});

app.post('/deletenotification', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let notificationid = req.body.notificationid;
    if (!notificationid) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("notifications").deleteOne({_id: ObjectID(notificationid)}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }

                db.close();
            });
        });
    }

});

app.post('/addnotification', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let notification = req.body.notification;
    if (!notification) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("notifications").insertOne(notification, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }

                db.close();
            });
        });
    }

});


app.post('/addexamination', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let examination = req.body.examination;
    let patient = req.body.patient;
    if (!examination || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("patients").update({_id: ObjectID(patient)}, {$addToSet: {examintaions: examination}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "problem adding examination");

                }

                db.close();
            });
        });
    }

});

app.post('/adddrugtime', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let patient = req.body.patient;
    let drugname = req.body.drugname;
    let time = req.body.time;
    if (!email || !password || !drugname || !patient || !time) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").update({
                _id: ObjectID(patient),
                "drugs.name": drugname
                // }, {$set: {"drugs.$.times": []}}, function (err, result) {
            }, {$addToSet: {"drugs.$.times": time}}, function (err, result) {
                // dbo.collection("patients").update({$and: [{_id: ObjectID(patient)}, {"drugs.name": drugname}]}, {$addToSet: {"drugs.times": time}}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});
app.post('/adddrug', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let patient = req.body.patient;
    let drugname = req.body.drugname;
    if (!email || !password || !drugname || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").update({
                _id: ObjectID(patient)
            }, {$addToSet: {"drugs": {name: drugname, times: []}}}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});

app.post('/removedrug', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let patient = req.body.patient;
    let drugname = req.body.drugname;
    if (!email || !password || !drugname || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").updateOne({
                _id: ObjectID(patient)
            }, {$pull: {"drugs": {name: drugname}}}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});

app.post('/ticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let email = req.body.email;
    let password = req.body.password;
    let patient = req.body.patient;
    let drugname = req.body.drugname;
    if (!email || !password || !drugname || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").updateOne({
                _id: ObjectID(patient)
            }, {$pull: {"drugs": {name: drugname}}}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "no patient");

                }

                db.close();
            });
        });
    }

});

app.post('/doctorticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    let estimatedpatienttime = req.body.estimatedpatienttime;
    let maxpatients = req.body.maxpatients;
    if (!doctor || !estimatedpatienttime || !maxpatients) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").findOne({doctor: doctor}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    ticket = {
                        doctor: doctor,
                        status: "closed",
                        estimatedpatienttime: estimatedpatienttime,
                        lastnumber: 0,
                        maxpatients: maxpatients,
                        patients: [],
                        lastentertime: Date

                    };
                    dbo.collection("tickets").insertOne(ticket, function (err, result) {
                        if (err) throw err;
                        if (result) {
                            console.log(result);
                            callbackFunction(200, ticket);
                        } else {
                            callbackFunction(401, "wrong conditionals");
                        }

                        db.close();
                    });
                }

                db.close();
            });
        });
    }

});

app.post('/opendoctorticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    let estimatedpatienttime = req.body.estimatedpatienttime;
    let maxpatients = req.body.maxpatients;
    if (!doctor || !estimatedpatienttime || !maxpatients) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").updateOne({doctor: doctor}, {
                $set: {
                    status: "open",
                    estimatedpatienttime: estimatedpatienttime,
                    lastnumber: 0,
                    maxpatients: maxpatients,
                    patients: [],
                    lastentertime: Date

                }
            }, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }


                db.close();
            });
        });
    }

});

app.post('/closedoctorticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    let estimatedpatienttime = req.body.estimatedpatienttime;
    let maxpatients = req.body.maxpatients;
    if (!doctor || !estimatedpatienttime || !maxpatients) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").updateOne({doctor: doctor}, {
                $set: {
                    status: "closed",
                    estimatedpatienttime: estimatedpatienttime,
                    lastnumber: 0,
                    maxpatients: maxpatients,
                    patients: [],
                    lastentertime: Date

                }
            }, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }


                db.close();
            });
        });
    }

});

app.post('/callnextdoctorticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    let lastnumber = req.body.lastnumber;
    if (!doctor || !lastnumber) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").updateOne({doctor: doctor}, {
                $set: {
                    lastnumber: lastnumber,
                    lastentertime: Date

                }
            }, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }


                db.close();
            });
        });
    }

});

app.post('/getmydoctorstickets', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctors = req.body.doctors;
    if (!doctors) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").find({doctor: {$in: doctors}}).toArray(function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }


                db.close();
            });
        });
    }

});


app.post('/requestticket', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    let patient = req.body.patient;
    if (!doctor || !patient) {
        callbackFunction(401, "wrong conditionals");
    } else {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").findOne({doctor: doctor}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    if (result.status == 'open') {
                        if (result.lastnumber < result.maxpatients) {
                            let hasThisPatient = false;
                            for (var i = 0; i < result.patients.length; i++) {
                                if (result.patients[i].patient == patient) {
                                    hasThisPatient = true;
                                }
                            }
                            if (!hasThisPatient) {
                                dbo.collection("tickets").update({doctor: doctor}, {
                                    $addToSet: {patients: {patient: patient, number: result.lastnumber + 1}},
                                    // $set: {lastnumber: result.lastnumber + 1}
                                }, function (err, result) {
                                    if (err) throw err;
                                    if (result) {
                                        console.log(result);
                                        callbackFunction(200, {
                                            message: "you have new ticket",
                                            number: result.lastnumber + 1
                                        });

                                    } else {
                                        callbackFunction(401, {"error": "doctor do not accepts tickets right now"});
                                    }

                                    db.close();
                                });
                            } else {
                                callbackFunction(401, {"error": "you already have a ticket from this doctor"});
                            }
                        } else {
                            callbackFunction(401, {"error": "all ticket has been taken"});
                        }

                    } else {
                        callbackFunction(401, {"error": "doctor do not accepts tickets right now"});
                    }
                    // ticket = {
                    //     doctor: doctor,
                    //     status: "closed",
                    //     estimatedpatienttime: estimatedpatienttime,
                    //     lastnumber: 0,
                    //     maxpatients: maxpatients,
                    //     patients: [],
                    //     lastentertime: Date
                    //
                    // };
                    // dbo.collection("tickets").insertOne(ticket, function (err, result) {
                    //     if (err) throw err;
                    //     if (result) {
                    //         console.log(result);
                    //         callbackFunction(200, ticket);
                    //     } else {
                    //         callbackFunction(401, {"error": "doctor do not accepts tickets right now"});
                    //     }
                    //
                    //     db.close();
                    // });
                } else {
                    callbackFunction(401, {"error": "doctor do not accepts tickets right now"});
                }

                db.close();
            });
        });


    }

});

app.post('/getpatienttickets', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let patient = req.body.patient;
    if (!patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("tickets").find({"patients.patient": patient}).toArray(function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "wrong conditionals");
                }


                db.close();
            });
        });
    }

});


app.post('/registerpatient', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let patient = req.body.patient;
    if (!patient) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").findOne({email: patient.email}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, {registerError: "Email already used!"});
                } else {
                    dbo.collection("patients").insertOne(patient, function (err, result) {
                        if (err) throw err;
                        if (result) {
                            console.log(result);
                            callbackFunction(200, {registerMessage: "Successfully registered"});
                        } else {
                            callbackFunction(200, {registerError: "Unknown error!"});

                        }

                        db.close();
                    });
                }

                db.close();
            });
        });
    }

});
app.post('/registerdoctor', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctor = req.body.doctor;
    if (!doctor) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("doctors").findOne({email: doctor.email}, function (err, result) {
                if (err) throw err;
                if (result) {

                    console.log(result);
                    callbackFunction(200, {registerError: "Email already used!"});
                } else {
                    dbo.collection("doctors").insertOne(doctor, function (err, result) {
                        if (err) throw err;
                        if (result) {
                            console.log(result);
                            callbackFunction(200, {registerMessage: "Successfully registered"});
                        } else {
                            callbackFunction(200, {registerError: "Unknown error!"});

                        }

                        db.close();
                    });
                }

                db.close();
            });
        });
    }

});

app.post('/editrecord', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let patient = req.body.patient;
    let examination = req.body.examination;
    let recordtext = req.body.recordtext;
    let recordid = req.body.recordid;
    if (!examination || !patient || !recordtext) {
        callbackFunction(401, "wrong conditionals");
    } else {


        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            if (!recordid) {
                let record = {text: recordtext};
                dbo.collection("records").insertOne(record, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        console.log("examination: " + JSON.stringify(examination));
                        console.log("patient id: " + patient);
                        console.log("record id: " + record._id);

                        // console.log(result);
                        console.log("new id: " + record._id);
                        dbo.collection("patients").update({
                                // dbo.collection("patients").findOne({
                                _id: ObjectID(patient),
                                "examintaions": examination
                            },
                            {$set: {"examintaions.$.record": record._id}},
                            function (err, result) {
                                if (err) throw err;
                                if (result) {

                                    console.log(result);
                                    callbackFunction(200, {recordId: record._id});
                                } else {
                                    callbackFunction(401, "unknown errorrrrrr");

                                }

                                db.close();
                            });
                    } else {
                        callbackFunction(401, "unknown error");
                    }

                });
            } else {
                console.log("robim update: ");
                dbo.collection("records").updateOne({
                    _id: ObjectID(recordid),
                }, {$set: {text: recordtext}}, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        console.log("examination: " + JSON.stringify(examination));
                        console.log("patient id: " + patient);
                        console.log("record id: " + recordid);
                        console.log(result);
                        callbackFunction(200, {recordId: recordid});
                        db.close();
                    } else {
                        callbackFunction(401, "unknown error");
                    }
                });
            }


        });
    }

});
app.post('/getrecord', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let recordid = req.body.recordid;
    if (!recordid) {
        callbackFunction(401, "wrong conditionals");
    } else {

        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");

            dbo.collection("records").findOne({_id: ObjectID(recordid)}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                    db.close();
                } else {
                    callbackFunction(401, "unknown error");
                }

            });

        });
    }

});

app.post('/uploadimage', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };
    var form = new IncomingForm();
    form.parse(req);
    let filename = null;
    form.on('fileBegin', function (name, file) {

        // file.path = __dirname + '/uploads/' + file.name;
        file.path = IMAGE_PATH + file.name;
    });

    form.on('file', function (name, file) {
        filename = file.name;
        console.log('Uploaded ' + file.path);
    });

    // res.sendFile(__dirname + '/index.html');
    // let readStream;
    // form.on('file', (field, file) => {
    //     Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    // console.log('file', file.name);
    // readStream = fs.createReadStream(file.path);
    // });
    form.on('end', () => {
        // res.json({message: "ok"});
        res.status(200).send({message: "ok"});
    });
    // form.parse(req);

    return;

    let image = req.body.image;
    console.log("toto  je body: " + JSON.stringify(res.body));
    if (!image) {
        callbackFunction(401, "wrong conditionals");
    } else {
        var buf = new Buffer(image.toString('binary'), 'binary');
        console.log('body', req.body);
        console.log('req body len', image.length);
        console.log('buf len', buf.length);

        // mongo.connect(url, function (err, db) {
        //     if (err) throw err;
        //     let dbo = db.db("SmartDoctor");
        //
        //     dbo.collection("records").findOne({_id: ObjectID(recordid)}, function (err, result) {
        //         if (err) throw err;
        //         if (result) {
        console.log(image);
        callbackFunction(200, {"name": "uploaded"});
        // db.close();
        // } else {
        //     callbackFunction(401, "unknown error");
        // }

        // });

        // });
    }

});

app.post('/setpatientimagename', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let patientid = req.body.patientid;
    let imagename = req.body.imagename;
    console.log("pid: " + patientid);
    console.log("iname: " + imagename);
    if (!imagename || !patientid) {
        callbackFunction(401, "wrong conditionals");
    } else {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("patients").updateOne({
                _id: ObjectID(patientid)
            }, {$set: {"image": imagename}}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "unknown error");

                }

                db.close();
            });
        });
    }
});

app.post('/setdoctorimagename', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let doctorid = req.body.doctorid;
    let imagename = req.body.imagename;
    console.log("pid: " + doctorid);
    console.log("iname: " + imagename);
    if (!imagename || !doctorid) {
        callbackFunction(401, "wrong conditionals");
    } else {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("SmartDoctor");
            dbo.collection("doctors").updateOne({
                _id: ObjectID(doctorid)
            }, {$set: {"image": imagename}}, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    callbackFunction(200, result);
                } else {
                    callbackFunction(401, "unknown error");

                }

                db.close();
            });
        });
    }
});

// app.post('/uploadimage', multipartMiddleware, (req, res) => {
//     res.json({
//         'message': 'File uploaded succesfully.'
//     });
// });


// app.post('/getimage', (req, res, callbackFunction) => {
//     callbackFunction = function (status, value) {
//         res.status(status).send(value);
//     };
//
//     let path = __dirname + '/uploads/glbank-logo.png';
//     res.status(200);
//     res.sendFile(path);
//     // let readStream;
//     // form.on('file', (field, file) => {
//     //     Do something with the file
//     // e.g. save it to the database
//     // you can access it using file.path
//     // console.log('file', file.name);
//     // readStream = fs.createReadStream(file.path);
//     // });
//     return;
// });

app.listen(3309, () => {
    console.log("Sever listening on port 3309");
});
