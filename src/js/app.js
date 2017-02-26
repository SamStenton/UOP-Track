import Storage from './components/storage';
import Pages from './components/pages';

var store = new Storage();
var pages = new Pages();

pages.collect();

var step1 = document.getElementById('step-1');
var currentForm = step1;

step1.style.display = "block";

Array.from(document.getElementsByClassName('next-page')).forEach(function(button) {
    button.addEventListener('click', storeValues)
});
window.addEventListener('popstate', function(event) {
  if (currentForm !== step1) {
    event.preventDefault();
  }
  changePage(true)
});

function changePage(back = false) {

    var currentFormID = parseInt(currentForm.id.split('-')[1]);
    var nextFormID = currentFormID + 1;
    if (back) {
        nextFormID = currentFormID - 1;
    }

    var nextForm = document.getElementById('step-' + nextFormID);

    currentForm.style.display = "none";
    nextForm.style.display = "block";

    currentForm = nextForm;
    history.pushState({}, null, '#!' + currentForm.id);
} 

function storeValues(event) {
    var inputs = Array.from(currentForm.getElementsByTagName('input'));
    inputs.forEach(function(input) {
        if (input.type == 'radio') {
            if (input.checked) {
                store.push(input.name, input.value)
                // store[input.name] = input.value
            }
        } else {
            // store[input.name] = input.value
            store.push(input.name, input.value)
        }
    });

    changePage()
    console.log(store.data)
}