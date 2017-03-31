# UOP Track

`This project requires node v`
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

