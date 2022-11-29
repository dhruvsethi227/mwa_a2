function check_and_refresh() {

  signupsDiv1Style = document.getElementById("signups-div").style.display;
  console.log("Signups Div style:" + signupsDiv1Style);
  if (signupsDiv1Style == "block") {

     setTimeout(() => {

          path = "/signups"; // url ==> http://localhost:5003/signups

          var xhr = new XMLHttpRequest();
          xhr.open('GET', path, true); // async=true -> asynchronous

          xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              fieldData = JSON.parse(this.responseText);
              console.log(fieldData);
              console.log("-------");
              students = fieldData['signups'];

              signupsDiv = document.getElementById("signups");

              for(i=0;i<students.length; i++) {
                student = students[i];
                name = student['entity'];
                if (document.getElementById("student-" + name) == null) {
                  studentItem = document.createElement("li");
                  studentItem.setAttribute("id","student-" + name);
                  signupsDiv.appendChild(studentItem);
                  studentItem.innerHTML = name;
                }
            }
          }
        }

          xhr.send();
        check_and_refresh();
    }, 5000); // 5 seconds
  }
}

function take_input() {
  document.getElementById("welcome").setAttribute("style","display:none");
  document.getElementById("take-input").setAttribute("style","display:block");
}

// function signup() {
  
//   url = "http://localhost:5003/signup;

//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', url, true); // async=true -> asynchronous

//   xhr.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       respText = this.responseText;
//       console.log(respText);
//     } else {

//     }

//   }
// }


// TODO: Add search music functionality; 
function search_music() {

  // Steps: Parse the input instrument; make AJAX call; show the results; create form to signup.")
  element = document.getElementById("contentcol");
  let text = element.querySelector("#instrument-to-search").value;
  //console.log(text);
  let instrument = text.toLowerCase();
  //console.log(instrument);

  url = "http://localhost:5003/searchlessons?instrument="+instrument;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true); // async=true -> asynchronous

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      fieldData = JSON.parse(this.responseText);
      console.log(fieldData);
      console.log("-------");
      lessons = fieldData['lessons'];

      // check response text
      if (lessons.length != 0) {
        
        document.getElementById("contentcol").innerHTML = "";
        for(i=0;i<lessons.length; i++) {
          lesson = lessons[i];
          const name = lesson['name'];
          const demo_url = lesson['demo_url'];
          const days = lesson['days'];
          const timings = lesson['timings'];
          
          lessonItem = document.createElement("li");
          lessonItem.setAttribute("id","lesson-" + name);    
          lessonItem.innerHTML = name + ", " + demo_url + ", " + days + ", " + timings;
          document.getElementById("contentcol").appendChild(lessonItem);
        }
  
        //form
        signupForm = document.createElement("form");
        signupForm.setAttribute("id", "signup_form");
        signupForm.setAttribute("method", "post");
        signupForm.setAttribute("action", "signup");
        
        //name
        nameLabel = document.createElement("label");
        nameLabel.setAttribute("class","label");
        nameLabel.innerHTML = "Your Name: ";
        nameBox = document.createElement("input");
        nameBox.setAttribute("type","text");
        nameBox.setAttribute("class","input");
        nameBox.setAttribute("id","learner-name");
        nameBox.setAttribute("name", "learner-name");
        signupForm.appendChild(nameLabel);
        signupForm.appendChild(nameBox);
        signupForm.appendChild(document.createElement("br"));
  
        //lesson
        lessonLabel = document.createElement("label");
        lessonLabel.setAttribute("class","label");
        lessonLabel.innerHTML = "Lesson name: ";    
        lessonBox = document.createElement("input");
        lessonBox.setAttribute("type","text");
        lessonBox.setAttribute("class","input");
        lessonBox.setAttribute("id","lesson-name");
        lessonBox.setAttribute("name", "lesson-name");
        signupForm.appendChild(lessonLabel);
        signupForm.appendChild(lessonBox);
        signupForm.appendChild(document.createElement("br"));
        
        //register button
        registerButton = document.createElement("button");
        registerButton.innerHTML = "Register"
        signupForm.appendChild(document.createElement("br"));
        signupForm.appendChild(registerButton);
        
        document.getElementById("contentcol").appendChild(signupForm);
      } else {
        //no results
        document.getElementById("contentcol").innerHTML = "";

        searchLabel = document.createElement("label");
        searchLabel.setAttribute("class","label");
        searchLabel.innerHTML = "No lesson found for instrument " + text;

        document.getElementById("contentcol").appendChild(searchLabel);
        document.getElementById("contentcol").appendChild(document.createElement("br"));
      }
    } else {
      
    }
  }
  xhr.send();

}

function test_cors() {

          url = "http://localhost:5004/cors";

          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true); // async=true -> asynchronous

          xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              respText = this.responseText;
              console.log(respText);
              alert("Response data:" + respText);

          } else {
            alert("Request denied.")
          }
        }
        xhr.send();
}

function learn_music() {

    document.getElementById("contentcol").innerHTML = "";

    searchLabel = document.createElement("label");
    searchLabel.setAttribute("class","label");
    searchLabel.innerHTML = "Instrument to search"

    searchBox = document.createElement("input");
    searchBox.setAttribute("type","text");
    searchBox.setAttribute("id","instrument-to-search");

    searchButton = document.createElement("button");
    searchButton.innerHTML = "Search"
    searchButton.setAttribute("onclick","search_music()");

    document.getElementById("contentcol").appendChild(searchLabel);
    document.getElementById("contentcol").appendChild(document.createElement("br"));
    document.getElementById("contentcol").appendChild(searchBox);
    document.getElementById("contentcol").appendChild(document.createElement("br"));
    document.getElementById("contentcol").appendChild(searchButton);

}
