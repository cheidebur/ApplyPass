console.log("Welcome to ApplyPass");

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
        questionCheck(applyButtonsListArraySearch, 0);
    }
})

function questionCheck(nodes, i) {
    console.log("questionCheck index is at ", i, " at beginning of func.");

    let nodeToCheck = nodes[i];
    console.log("checking this job node for interview questions...", nodeToCheck);
    nodeToCheck.click();

    setTimeout(() => {
        let thisNodeClassList = nodeToCheck.classList;
        console.log("classList for this node is ", thisNodeClassList);

        //the if blocks here speak to the original goal, which was to
        //detect whether there were questions and stop the redirect if so.
        //that didn't seem to work for whatever reason, and window.stop()ing
        //the query either way seems to work, so I'm leaving it here for now
        if (nodeToCheck.classList.contains("interview")) {
            console.log("This job requires extra quesions. Stopping redirect");
            window.stop();
            i++
            console.log("recursion check - running again with nodes ", nodes);
            questionCheck(nodes, i);
        } else {
            console.log("this job does not require extra questions, applied and moving on");
            window.stop();
            i++
            console.log("questionCheck index is at ", i, " at end of func.");
            questionCheck(nodes, i);
        }
    }, 1100)
}
//
//interview button classes are job_tool job_apply interview
//check if button has this text, if so, stop the window before it redirects
//and move on to the next 

console.log("suggestions apply nodes are ", applyButtonsListArraySug);
console.log("job search apply nodes are ", applyButtonsListArraySearch);

//intervalButton takes nodes, a function to act upon those nodes,
//and a set delay. It calls the iterate function, which in this case
//is intervalButton, on each node in the collection after the delay, which
//we have set at 1500. 1.5 seconds is enough time for the request to go
//through before the redirect is cancelled with window.stop(), which is
//called at the beginning of intervalButton,
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

    let thisNode = document.getElementById(thisNodeId);
    thisNode.click();
    console.log(" 💋 application sent! 💋");
}


