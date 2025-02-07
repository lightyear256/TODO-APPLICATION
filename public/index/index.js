

function signup() {
    document.querySelector(".wrapper").innerHTML = `
            <h2>Sign_up</h2>
        <div class="user">
            <div>Email:</div>
            <div class="liner">
                <div><input type="text" placeholder="email" id ="email" class="slider"></div>
                <div class="line"></div>
            </div>
        </div>
        <div class="user">
            <div>name:</div>
            <div class="liner">
                <div><input type="text" placeholder="name" id ="name" class="slider"></div>
                <div class="line"></div>
            </div>
        </div>
        <div class="user">
            <div>Password:</div>
            <div class="liner">
                <div><input type="password" placeholder="password" id="password" class="slider"></div>
                <div class="line"></div>
            </div>
        </div>
        <button onclick="sign_up()">Sign up</button>
        <div>Already signed_up?<a onclick="signin()"> Signin</a></div>
            `;
  }
  function signin() {
    document.querySelector(".wrapper").innerHTML = `
            <h2>Login</h2>
        <div class="user">
            <div>Email:</div>
            <div class="liner">
                <div><input type="text" placeholder="email" id ="email" class="slider"></div>
                <div class="line"></div>
            </div>
        </div>
        <div class="user">
            <div>Password:</div>
            <div class="liner">
                <div><input type="password" placeholder="password" id="password" class="slider"></div>
                <div class="line"></div>
            </div>
        </div>
        <button onclick="sign_in()">Login</button>
        <div>Didnt signup?<a onclick="signup()"> Signup</a></div>
            `;
  }
  
let count;
async function sign_up() {
    const response = await axios.post("http://localhost:4000/signup", {
      email: document.querySelector("#email").value,
      name:document.querySelector("#name").value,
      password: document.querySelector("#password").value,
    });
    alert(response.data.msg);
    // console.log(response.data);
}
async function sign_in() {
    const response = await axios.post("http://localhost:4000/login", {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    });
    console.log(response.data);
    if (response.data.done == "y") {
      alert(response.data.msg);
       
      count=response.data.count;
      localStorage.setItem("token",response.data.token);
      window.location.href="/home"
    } else {
        alert(response.data.msg);
      return;
    }
}
