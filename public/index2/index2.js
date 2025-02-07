      (async function(){
          await view();
      })();
      async function logout() {
        if (!localStorage.getItem("token")) {
          alert("You are not signed in");
          window.location.href = "index.html"; 
          return;
      }
        localStorage.removeItem('token');
        window.location.href = "index.html";
      }
      async function add() {
        if (!localStorage.getItem("token")) {
          alert("You are not signed in");
          window.location.href = "index.html"; 
          return;
        }
        await view();
            await axios.post('http://localhost:4000/todoadd',{
            todo: document.querySelector(".inp").value,  
          }, 
          { 
            headers: { 
              token: localStorage.getItem("token")
             } 
          })
           await view();
      }
      async function view(){
        if (!localStorage.getItem("token")) {
          alert("You are not signed in");
          window.location.href = "index.html"; 
          return;
        }
        const response=await axios.get('http://localhost:4000/todos',{
             headers:{
              token:localStorage.getItem("token")
             }
          })
          let todos= response.data.todo;
          let count=todos.length;
          let to=document.querySelector(".all");
          to.innerHTML="";
          for(let i=0;i<count;i++){
            const div=document.createElement("div");
            const divel=document.createElement("div")
            divel.innerText=`${todos[i].title}`;
            const del =document.createElement("button")
            del.innerText="delete";
            const edi =document.createElement("button")
            edi.innerText="edit";
            div.appendChild(divel);
            div.appendChild(del);
            div.appendChild(edi);
            divel.setAttribute("class","todo")
            const co=JSON.stringify(todos[i]);
            del.setAttribute("onclick",`del(${co})`)
            edi.setAttribute("onclick",`edi(${co})`)
            del.setAttribute("class",`b2`)
            edi.setAttribute("class",`b2`)
            div.setAttribute("class","toder")
            to.appendChild(div);
          }
          console.log("front end not stuck");
      }
       async function del(co){
          response=await axios.delete("http://localhost:4000/delete/"+co._id,{
            headers:{
              token:localStorage.getItem("token")
            } 
          });
         await view()
       }
       async function edi(co){
          let response=await axios.put("http://localhost:4000/update",{
              id:co,
              todo: document.querySelector(".inp").value,
            },
            {
            headers:{
              token:localStorage.getItem("token"),
            },
          })
          await view();
       }
