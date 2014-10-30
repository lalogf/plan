var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    models = require('./models/index'),
    session = require ('cookie-session'),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt'),
    pg = require('pg'),
    engine = require('ejs-locals');


var app = express();

//To store local js and css files
app.use(express.static(__dirname + '/public'));


app.set("view engine", "ejs");

// this is different from setting the view engine
// it enables the layout functionality
app.engine('ejs', engine);


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

app.use(session({
  keys: ['key']
}));


app.use(flash());


//Setting up |^|


app.get('/', function (req, res){
    var templateData={
        messages: req.flash('info')
    };
    models.Carrier.findAll()
    .then(function (carriers){
        templateData.carriers = carriers;
    })
    .finally(function(){
        res.render('home', templateData)
    })
});

app.get('/options/:id', function (req, res){
    models.Plan.findAll({where: { price_range: req.params.id }})
    .then(function (options){
        res.render('table', {
            options: options
        })

    })
	
});

app.get('/admin', function (req, res){
    var templateData = {
        messages: req.flash('info')
    };

    models.Carrier.findAll()
    .then(function (carriers){
        templateData.carriers = carriers;
        return models.Plan.findAll();
    })
    .then(function (plans) {
        templateData.plans = plans;
    })
    .finally(function() {
        res.render('admin', templateData);
    });
});

app.post('/carrier', function (req, res){
    models.Carrier.create({
        carrier_name: req.body.carrier,
        country_code: req.body.country
    }).then(function (carrier){
        res.redirect('/admin')
    },function (error){
        req.flash('info', error);
        res.redirect('/admin');
    });
});

app.post('/plan', function (req, res){
    models.Plan.create({
        plan_name:req.body.planname,
        data: req.body.data,
        talk_min:req.body.talk,
        sms:req.body.sms,
        private_net_min: req.body.privatenet,
        monthly_price: req.body.monthly,
        price_range: req.body.range,
        LTE_support: req.body.LTE,
        other_costs: req.body.other,
    }).then(function (plan){
        models.Plan.find({where: { plan_name: plan.plan_name }}).done(function (er, newplan){
            models.Carrier.find({where:{carrier_name: req.body.carrierplan}}).done(function (err, carrier){
                carrier.addPlan(newplan);
            });
        });
        res.redirect('/admin')
    }, function(error){
        req.flash('info', error);
        res.redirect('/admin')
    });
});

app.post('/device', function (req, res){
    models.Device.create({
        device_name: req.body.devicename,
        brand: req.body.brandname,
        price: req.body.deviceprice,
        contract_type: req.body.contracttype,
    }).then(function (device){
        models.Device.find({where: { device_name: device.device_name }}).done(function (er, newdevice){
            models.Plan.find({where: { plan_name: req.body.plandevice }}).done(function (err, plan){
                plan.addDevice(newdevice);
            });
        });
        res.redirect('/admin')
    }, function (error){
        req.flash('info', error);
        res.redirect('/admin')
    });
});





















app.listen(process.env.PORT || 3000);