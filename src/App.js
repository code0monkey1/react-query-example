
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


import './App.css';
function App() {
   const client = useQueryClient();
   
   const demo=[{id:1,content:"this"},{id:2,content:"is"},{id:3,content:"a"},{id:4,content:"test"}]

   const {data:posts,isLoading,isError,error} = useQuery({
    queryKey:["posts"],
    queryFn:()=> wait(1000).then(res => demo),
    // this will load as placeholder , before the query
    placeholderData:[{id:1,content:"awesome stuff"},{id:2,content:"coming your way"}]
  })

 const {mutate,isLoading:mutationIsLoading}=useMutation({
    mutationFn:(content)=> demo.push({content,id:Math.floor(10000*Math.random())}),
   
   onSuccess:()=>{
     client.invalidateQueries(["posts"])
   },
    onError:()=>{
        console.error("Error mutating!")
    }
  },
  )

  const wait = (ms) => {
     
      return new Promise((resolve, reject) =>{
            setTimeout(() =>resolve(), ms)
        })
  }

  if(isError){
    return <div>{error}</div>
  }

  return (
    <div className="App">
      <ul>
       {posts.map(post =><div key={post.id}>{post.content}</div>)}
       <button disabled={mutationIsLoading}  onClick={()=> mutate("new content")}>Add Post</button>
      </ul>
    </div>
  );
}

export default App;
