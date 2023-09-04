import React from 'react'

const NewPost = ({
  handleSubmit,posttitle, setPosttitle,postBody,setPostBody
}) => {
  return (
   <main className="NewPost">
    <h2>New Post</h2>
    <form className="newPostForm" onSubmit={handleSubmit}>
      <label htmlFor='postTitle'>Title:</label>
      <input
      id="postTitle"
      type="text"
      required
      value={posttitle}
      onChange={(e)=>setPosttitle(e.target.value)}
      ></input>
       <label htmlFor='postBody'>Post:</label>
      <textarea
      id="postBody"
      required
      value={postBody}
      onChange={(e)=>setPostBody(e.target.value)}
      ></textarea>
      <button type='submit'>
       Submit
      </button>
    </form>
   </main>
  )
}

export default NewPost