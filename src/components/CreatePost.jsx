import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate=useNavigate();
  
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();
  const imgElement=useRef()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    
    const tags = tagsElement.current.value;
    const img=   imgElement.current.value;
      
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    
    tagsElement.current.value = "";
    imgElement.current.value="";
    let data={
      title: postTitle,
      body:postBody,
      tags:tags,
      img:img,
    }
    try{
    let response=await axios.post('https://social-media-app-4-bm12.onrender.com/api',data);
    console.log(response.data);
    addPost( response.data._id,response.data.title, response.data.body,response.data.reactions, response.data.tags,response.data.img);
     navigate("/app");
    }
    catch(error){
      console.log(error);
    }
    
   
    
    
  };

  return (
    <form className="create-post form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          type="text"
          
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
        Post image
        </label>
        <input
          type= "text"
          ref={imgElement}
          className="form-control"
          id="img"
          placeholder="./src/images/"
        > 
        </input>
        <input type="text" value="./src/images/" readOnly></input>
       
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>


      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
         
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          ref={tagsElement}
          placeholder="Please enter tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;