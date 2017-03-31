# UOP Track

`This project ideally requires node v6.7.0`

Track coursework and exam marks through a easy to use dashboard.

You can view the demo [here](https://uoptrack.samuelstenton.com)

## Installation 

Clone the repo
```
git clone https://github.com/SamStenton/UOP-Track uoptrack
```

Install npm dependancies. Use `--production` if you are not intending to edit the project
```
npm install
```

Edit environment config
```
mv example.env
nano/youreditor .env
```
.env file: 
```
DATABASE_USER=yourDbUser
DATABASE_PASSWORD=yourDbPass
DATABASE=uoptrack
```

Run the database migrations. This will create the required tables for the dashboard.
```
npm run migrations
```

Now run the dashboard with `npm run dashboard`. By defualt the server boots on port 8080. Use your browser to navigate that localhost:8080. You should be greeted with an empty dashboard. 

## Dashboard Use

When you first run your dashboard you'll not see any modules. To create a new module click the (+) on the menu to the left. 

Add the details for the module. Dont worry, you can always come back and add more submissions.

You will now see your newly created module. To edit the module click the 'Edit' button to the right of the module name. You can change the module name and or add/remove items from the page that is loaded.

Submissions can be edited individually from the main dashboard. Hover over an item and the edit button will appear. 

## Project documentation
The code base is built upon express.js. express gives the developer freedom to structure their project in whatever way they please. 

### Backend
The project follows the *Model View Controller* pattern. 
* Models are stored in `/models` and should extend the base `model.js` class
* Controllers are stored in `/controllers`. Controllers that respond to API requests are with the `/controllers/API` directory.
* Views are stores within the `/views` directory and use the handlebars.js tempalting engine. Some html is also generated within some frontend javascript modules. This will be detailed further

Entry into the system goes through the routes files. Currently there are only two `web.js` and `api.js` stored within the `/routes` directory. 

To register a route and link it to a controller you structure as following.
```
web.get('/', (req, res) => router.route(req, res, 'AppController@index'));
```

The above responds to requests to the index `/` and uses the `index()` method on the `AppController.js` controller. 

*Database Interaction*

There is an included database wrapper stored in `database/db.js` but most of the time data manipulation should be achieved through using the `Model` class. This provides an interface to help create/edit/delete objects without worrying about writing SQL.

For example a User class that has extended the defaul 'Model'
```
class User() extends Model{
    construct() {
        super('the_user_table')
        this.singular = 'user'
    }
}
```

Which can then be used:
```
var user = new User();
user.fill({name: 'John Doe', email: john.doe@gmial.com});
user.save();
```

This will create a user object with the above attributes and save it to the database. 

Models can define relations with other models. An exmaple of this being used is within the `/models/module.js` class. 

```
/**
 * Returns the related module items
 *
 * @return     {Relation}  The current object with the
 * connected relation
 */
items() {
    return this.oneToMany(new ModuleItem).then(items => {
        this.module_items = items
        return this
    });
}
```

This adds a relation param `module_items` onto the Module model. The relation is a oneToMany and so uses the `oneToMany()` method and simply defining the related model. 

All methods available to models can be seen in the well documented `/moodels/model.js` file

### Frontend
Frontend javascript is stored in `resources/src/js`
Sass css files are stored in `resources/src/sass`

Each are compiled using gulp and webpack+babel and output in `resources/dist`

The front end is mainly made up of javascript files. Each page usually has a related javascript class page.

To add a new page create a new `yourPage.hbs` file and include the header and footer partials. To enable the use of a javascript page insert a `data-page` attribute onto the main page contianer. In the following example the attribute is `data-page="dashboard"`

```
{{> header title="UOP Track" }}
  {{> sidebar }}
  <div class="container" data-page="dashboard">
    <main>
      <div data-item="modules" class="content">
          <div class="no-modules">
              <h1>No Modules detected</h1>
              <p>You dont appear to have created any modules yet. Go <a href="module/create">here</a> to create one</p>
          </div>
      </div>
    </main>
  </div>
{{> footer }}
```

When the page is loaded by the browser the `Pages/PageDispatcher.js` is run to check if a corrisponding js page class can be run.

A javascript page is stored within the `Pages` directory and extends the `Page.js` class. 

A new page module should look like the following:

```
class dashboard extends Page{
    constructor() {
        super()
        this.selector = "dashboard"
    }

    /**
     * Checks for a unique element on a page to 
     *
     * @return     {boolean}  True if able to fulfill, False otherwise.
     */
    canFulfill() {
        return document.querySelectorAll(`[data-page="${this.selector}"]`).length > 0;
    }

    /**
     * Entry Method for the current page. Envoked via PageDispatcher.js
     * 
     */
    execute() {
        //Method run when the object can fulfill the current page request
        console.log('Do stuff on the dashboard page')
    }
```

Each page should have a `selector` attribute with the value of the `data-page` attribute we added to the html.

The `canFulfill()` method checks for that selector on the current page. If it finds it the `PageDispatcher` runs the `execute` method. 

Javascript relating the current page should be stored within this method.

*Helpers*

There are a couple helper files within the project. The first are stored within the `elements/` directory. These are what generate and output to the browser re-usable html components. 

The two currently created are `Module` and `ModuleItem` which generate modules and submiussions respectivly. 

Another useful Helper class is the `Form` class stored within `classes/Form.js` this creates an easy way to create get/post requests to the server. 

## Marking

### Functionality

The first page loaded when opened is the overview. This shows the user all their current modules and submissions/exams within. The dashboard calculates a running average and and module average on the fly. This allows the user to quickly see what grade they are currently working at. 

Modules and module items can be created, updated and removed. The dashboard responds to these changes, giving the user instant feedback to their actions. 

#### Issues
The dashboard oporates at a basic level. Initially the plan was to have more interactions available to the user. 

* The ability to login/register
* A 'share' feature that creates an openly shareable link to give to others. This could be useful when applying for jobs roles - or in my case, a placement. 
* Target grade - Let the user give a grade they would like to achieve. The dashboard would calculate the grade required in each remaining submission/exam to hit that target. 

The reasoning behind not being able to implement these features was too much time was spent scaffolding the code base. 

### Maintainability

