import Header  from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {format} from 'date-fns';
import apiRequest from './apiReqest'

import { Route,Switch ,useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import set from 'date-fns/esm/set';

function App() {
  const API_URL='http://localhost:3500/posts';
  const history=useHistory();
  const[posts,setPosts]=useState([]);
  const [search,setSearch]=useState('');
  const [searchResults,setSearchResults]=useState('');
  const [posttitle,setPosttitle]=useState('');
  const[postBody,setPostBody]=useState('');
  const[editTitle,seteditposttitle]=useState('');
  const[editpostbody,seteditpostbody]=useState('');
 
  useEffect(()=>
  {
    const fetchItems=async ()=>
    {
      try{
      const response=await fetch(API_URL);
      const data=await response.json();
      if(!response.ok) throw Error('Did Not received expected data');
      console.log(data);
      setPosts(data);
      }
      catch(err){
         console.log(err.stack);
      }
    }
    (async()=>fetchItems())();
  },[])

 useEffect(()=>
 {
   const filteredResults=posts.filter((post)=>
   ((post.body).toLowerCase()).includes(search.toLowerCase())
   ||  ((post.title).toLowerCase()).includes(search.toLowerCase())
   ||((post.datetime).includes(search)));
   setSearchResults(filteredResults.reverse());
 },[posts,search])
 
  const handleSubmit= async(e)=>
  {  
   e.preventDefault();
     const id=posts.length ? posts[posts.length-1].id+1 : 1;
     const datetime =format(new Date(),'MMMM dd,yyyy pp');
     const newpost={id,title:posttitle,datetime ,body:postBody};
     const allPosts=[...posts ,newpost];
     setPosts(allPosts);
     setPosttitle('');
     setPostBody('');
     history.push('/');

     const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newpost)
    }
    const result =await apiRequest(API_URL, postOptions);
   // if(result) setFetchError(result);
  }
  const handleDelete=async(id)=>
   {
   const  NewPosts = posts.filter((post)=>(post.id)!==id);
    setPosts(NewPosts);
    history.push('/');
    const postOptions={
      method:'DELETE'}
     const url= `${API_URL}/${id}`
    const result =await apiRequest(url, postOptions);

   }
  return (
    <div className="App">
    <Header title="React Js Blog" />
    <Nav  search={search} setSearch={setSearch} />
    <Switch>
      <Route exact path="/">
        <Home posts={searchResults}  />
      </Route>
      <Route exact path="/post">
        <NewPost 
        handleSubmit={handleSubmit}
        posttitle={posttitle}
        setPosttitle={setPosttitle}
        postBody={postBody}
        setPostBody={setPostBody}
        />
      </Route>
      <Route path="/post/:id">
        <PostPage posts={posts} handleDelete={handleDelete}/>
      </Route>
      <Route path="/about" component={About} />
      <Route path="*" component={Missing} />
    </Switch>
    <Footer />
  </div>
  );
}

export default App;
/* [
  {
    id: 1,
    title: "My First Post",
    datetime: "July 01, 2021 11:17:36 AM",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  },
  {
    id: 2,
    title: "My 2nd Post",
    datetime: "July 01, 2021 11:17:36 AM",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  },
  {
    id: 3,
    title: "My 3rd Post",
    datetime: "July 01, 2021 11:17:36 AM",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  },
  {
    id: 4,
    title: "My Fourth Post",
    datetime: "July 01, 2021 11:17:36 AM",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  }
] */