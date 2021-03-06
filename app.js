var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    models = require('./models/index'),
    session = require ('cookie-session'),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt'),
    pg = require('pg'),
    passport = require('passport'),
    util = require('util'),
    engine = require('ejs-locals');



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var app = express();



//To store local js and css files


app.set("view engine", "ejs");

// this is different from setting the view engine
// it enables the layout functionality
app.engine('ejs', engine);


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

//To store local js and css files
app.use(express.static(__dirname + '/public'));



app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  maxage: 3600000
  })
);

app.use(flash());

app.use(session({
  keys: ['key']
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.post('/login', passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login"
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


app.post('/signup', function (req, res){
    models.User.createNewUser({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    });
    res.redirect('/admin');
});


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
    var templateData={
        messages: req.flash('info')
    };
    models.Plan.findAll(
        {where: { price_range: req.params.id },
        include: [models.Carrier, models.Device],
        order: [['monthly_price']]
    })
    .then(function (plans){
        plans = plans.map(function(plan) {
            return plan.values;
        });
        templateData.options = plans;
        res.render('table', templateData)
    })
});


app.get('/admin', function (req, res){
    if(req.isAuthenticated() && req.user.username ==="lalogf"){
    var templateData = {
        messages: req.flash('info'),
        user: req.user
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
} else {
    res.redirect('/')
}});

app.post('/carrier', function (req, res){
    models.Carrier.create({
        carrier_name: req.body.carrier,
        country_code: req.body.country,
        carrier_logo: req.body.carrierlogo
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
        device_image: req.body.deviceimage,
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