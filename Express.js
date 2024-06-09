//require depedency
const express=require('express');
const bodyparser=require('body-parser');
const servestatic=require('serve-static')
//initialize app(an express server)
const app=express();
app.use(servestatic('public'));
//body parseeer->json to use them for req 
app.use(bodyparser.json());
//todo->[](list)
let todos=[];


//GET -to get all todo 
app.get('/todos',(req,res)=>{
    res.json(todos);
})
//POST -to create a todo
app.post("/todos", (req, res) => {
    const todo = {
      id: todos.length + 1,
      title: req.body.title || 'untitled',
      completed: req.body.completed || false,
    };
    todos.push(todo);
    res.status(201).json(todo);
  });
  
//put -to alter or update a todo
app.put('/todos/:id', (req, res) => {
  console.log(`Received PUT request for ID: ${req.params.id}`);
  const id = parseInt(req.params.id);
  console.log(todos);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    console.log('Todo not found');
    return res.status(404).json({ error: 'Todo not found' });
  }

  console.log('Todo found, updating...');
  todo.title = req.body.title !== undefined ? req.body.title : todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});


//DELETE -to delete a todo
app.delete('/todos/:id',(req,res)=>{
  const id=parseInt(req.params.id);
  const index=todos.findIndex((t)=>t.id===id);
  if(index===-1){return res.status(404).send("todo not found")};
  todos.splice(index,1)
  res.status(204).send();
})
// LISTEN -to run a todo 

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("the server is running at localhost:3000");
})