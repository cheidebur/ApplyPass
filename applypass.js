console.log("Welcome to ApplyPass");

//this code generates the apply button and its styles,
//and then appends it to the top left of the page.
//ZipRecruiter is sassy with their z-indexes (1k) so we make them sassier (1k+)
//to stick on top.

const docBody = document.getElementsByTagName("html")[0];
const appendCtrl = document.createElement("div");
appendCtrl.style.width = "5em"
appendCtrl.style.height = "3em";
appendCtrl.style.backgroundColor = "red"
appendCtrl.style.position = "fixed";
appendCtrl.style.top = "0";
appendCtrl.style.left = "0";
appendCtrl.style.zIndex = "1001";

const goButton = document.createElement("button");
goButton.setAttribute("id", "applypass-ctrl");
goButton.innerText = "Apply to jobs on this page";

appendCtrl.appendChild(goButton);
docBody.appendChild(appendCtrl);

//the .quickApplyButton class is from the suggestion page - creating a classic
// JS array from the iteratable DOM object that querySelectorAll creates
const applyButtonsList = document.querySelectorAll(".quickApplyButton");
const applyButtonsListArraySug = Array.from(applyButtonsList);

//same here but with .one_click_apply which is for the job search page
const applyButtonsList2 = document.querySelectorAll(".one_click_apply");
const applyButtonsListArraySearch = Array.from(applyButtonsList2);

//attach interval function to button and check if the array has anything.
//if it does, we determine which page we're on and delegate to the correct functions

goButton.addEventListener("click", function() {

    if (applyButtonsListArraySug.length > 0) {
        console.log("Applying for jobs on the Suggestions page.");
        intervalButton(applyButtonsListArraySug, suggestionsIteratee, 1500);

    } else if (applyButtonsListArraySearch.length > 0){
        console.log("Applying for jobs on the Search page.");
        intervalButton(applyButtonsListArraySearch, searchIteratee, 1500);
    }
})

console.log("suggestions apply nodes are ", applyButtonsListArraySug);
console.log("job search apply nodes are ", applyButtonsListArraySearch);

//intervalButton takes nodes, a function to act upon those nodes,
//and a set delay. It calls the iterate function, which in this case
//is buttonAction, on each node in the collection after the delay, which
//we have set at 1500. 1.5 seconds is enough time for the request to go
//through before the redirect is cancelled with window.stop(), which is
//called at the beginning of buttonAction,
//the argument we pass to the iterateFunction parameter.

function intervalButton(nodes, iterateFunction, delay) {
    let current = 0;
    console.log("Starting the application interval. Close the tab to terminate.");

    let iterateInterval = setInterval(() => {
      if (current === nodes.length) {
        clearInterval(iterateInterval);
      } else {
        console.log("current at start of function is ", current);

        console.log("passing node to iterate function: ", nodes[current]);
        iterateFunction(nodes[current]);
        current++

        console.log("current at end of function is ", current);
      }
    }, delay)
}

function suggestionsIteratee(currentNode) {
    console.log("Stopping page redirect");
    window.stop();
    console.log("APPLYING TO JOB", currentNode);
    // currentNode.click();

    //suggestions page nodes have an ID so it's pretty easy to grab it and
    //target the node with it for the click();
    let thisNodeId = currentNode.id;
    let thisNode = document.getElementById(thisNodeId);
    thisNode.click();
    console.log(" 💋 application sent! 💋");
}

//the function below will not run all the way
//if null variables are passed, and the current variable
// will not get a chance to increment, breaking the program
//make sure the DOM element exists and is targeted correctly.
//we didn't spend 6k on a bootcamp for nothing, dumbass

function searchIteratee(currentNode) {
    //console.log("Stopping page redirect");
    //window.stop();
    //console.log("APPLYING TO JOB", currentNode);
    //currentNode.click();

    //no ID here, grab by data-href property
    console.log("current node is ", currentNode);
    //let thisNodeId = currentNode.querySelectorAll["data-href"][0];
    //console.log("selected node ID is ", thisNodeId);
    //let thisNode = document.getElementByI(thisNodeId);
    //thisNode.click();
    console.log(" 💋 application sent! 💋");
}
