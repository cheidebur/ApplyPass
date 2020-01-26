console.log("Welcome to ApplyPass");


//this code generates the apply button and its styles,
//and then appends it to the top left of the page.
//ZipRecruiter is sassy with their z-indexes so we make them sassier
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
        intervalButton(applyButtonsListArraySug, buttonAction, 1500);

    } else if (applyButtonsListArraySearch.length > 0){
        console.log("Applying for jobs on the Search page.");
        intervalButton(applyButtonsListArraySearch, buttonAction, 1100);
    }
})

console.log("suggestions apply nodes are ", applyButtonsListArraySug);
console.log("job search apply nodes are ", applyButtonsListArraySearch);

if (applyButtonsListArraySug.length > 0) {
    console.log("You're on the suggestions page");
} else {
    console.log("You're on the search page.");
}

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

    setInterval(() => {
      if (current === nodes.length) {
        clearInterval()
      } else {
        iterateFunction(nodes[current])
        current++
      }
    }, delay)
}

function buttonAction(currentNode) {

    console.log("Stopping page redirect");
    window.stop();

    console.log("APPLYING TO JOB", currentNode);
    //click is for search page, thisNode is for suggestions page
    currentNode.click();

    let thisNodeId = currentNode.id;
    let thisNode = document.getElementById(thisNodeId);
    thisNode.click();
    console.log(" 💋 application sent! 💋");
}
