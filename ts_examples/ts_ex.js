// example of SRO
var Email = (function () {
    function Email(email) {
        if (this.validateEmail(email)) {
            this.email = email;
        }
        else {
            throw new Error("Invalid email!");
        }
    }
    Email.prototype.validateEmail = function (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    Email.prototype.get = function () {
        return this.email;
    };
    return Email;
}());
var Person = (function () {
    function Person(name, surname, email) {
        this.email = email;
        this.name = name;
        this.surname = surname;
    }
    Person.prototype.greet = function () {
        alert("hi");
    };
    return Person;
}());
var CookiePersistanceService = (function () {
    function CookiePersistanceService() {
    }
    CookiePersistanceService.prototype.save = function (entity) {
        var id = Math.floor((Math.random() * 100) + 1);
        // Cookie persistance logic...
        return id;
    };
    return CookiePersistanceService;
}());
var FavouritesController = (function () {
    function FavouritesController(persistanceService) {
        this._persistanceService = persistanceService;
    }
    FavouritesController.prototype.saveAsFavourite = function (articleID) {
        return this._persistanceService.save(articleID);
    };
    return FavouritesController;
}());
var me = new Person("this", "Jansen", new Email("remo.jansen@wolksoftware.com"));
var favController = new FavouritesController(new CookiePersistanceService());
var LocalPersistanceService = (function () {
    function LocalPersistanceService() {
    }
    LocalPersistanceService.prototype.save = function (entity) {
        var id = Math.floor((Math.random() * 100) + 1);
        // Local storage persistance logic...
        return id;
    };
    return LocalPersistanceService;
}());
// demonstrates Liskov substitution principle: we can drop in LocalPersistanceService
// everything works fine
var favController = new FavouritesController(new LocalPersistanceService());
//# sourceMappingURL=ts_ex.js.map