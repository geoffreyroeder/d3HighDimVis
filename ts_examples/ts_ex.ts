/**
 * Created by geoffreyroeder on 2016-11-09.
 */
interface IPerson{
    greet(): void;
}

// example of SRO
class Email {
    private email : string;

    constructor(email : string) {
        if (this.validateEmail(email)) {
            this.email = email;
        } else {
            throw new Error("Invalid email!")
        }
    }

    private validateEmail(email : string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    get() : string {
        return this.email;
    }
}

class Person implements IPerson {
    public name: string;
    public surname: string;
    public email: Email;

    constructor(name: string, surname: string, email: Email) {
        this.email = email;
        this.name = name;
        this.surname = surname;
    }

    greet() {
        alert("hi");
    }
}

interface IPersistanceService {
    save(entity : any) : number;
}

class CookiePersistanceService implements IPersistanceService{
    save(entity : any) : number {
        var id = Math.floor((Math.random() * 100) + 1);
        // Cookie persistance logic...
        return id;
    }
}

class FavouritesController {
    // depends on IPersistanceService
    // this is Dependency Inversion: declare attributes as interfaces, not classes
    private _persistanceService : IPersistanceService;

    constructor(persistanceService : IPersistanceService) {
        this._persistanceService = persistanceService;
    }

    public saveAsFavourite(articleID : number) {
        return this._persistanceService.save(articleID);
    }
}

var me : Person = new Person("this", "Jansen", new Email("remo.jansen@wolksoftware.com"))
var favController = new FavouritesController(new CookiePersistanceService());

class LocalPersistanceService implements IPersistanceService {
    save(entity : any) : number {
        var id = Math.floor((Math.random() * 100) + 1);
        // Local storage persistance logic...
        return id;
    }
}

// demonstrates Liskov substitution principle: we can drop in LocalPersistanceService
// everything works fine
var favController = new FavouritesController(new LocalPersistanceService());

