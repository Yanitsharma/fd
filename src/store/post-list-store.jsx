import { createContext, useReducer } from "react";
import axios from "axios";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  reactionIncr:()=>{},
});


let data={};
const delete1 = async (pd)=>{
    try{
let response=await axios.delete(`http://localhost:2000/api/${pd}`);  
   console.log(response.data);
    }
    catch(error){
   console.log(error);
    }
}

const like= async (data,id)=>{
 try{
    let response=await axios.put(`http://localhost:2000/api/${id}`,data);
    console.log(response.data);
 }
 catch(error){
console.log(error);
 }
}
const postListReducer =  (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    currPostList.forEach(post => {
      if(post._id===action.payload.postId){
        delete1(post._id);
      }
    });
    newPostList = currPostList.filter(
      (post) =>(post._id !== action.payload.postId
      )
      
         
    )
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
 else if(action.type==="React-Post"){
     currPostList.map((post)=>{
    if(post._id===action.payload.postId){
      post.reactions=eval(post.reactions)+(1)
       data={reactions:post.reactions};
        
      like(data,post._id);
    }
  
    
  })
  newPostList=currPostList;
  action.type="";
 }
  
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = ( id,postTitle, postBody,reactions, tags,img) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id:id,
        title: postTitle,
        body: postBody,
        reactions:reactions,
        tags: tags,
        img:img,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
    
  };
  const reactionIncr=(postId)=>{
    dispatchPostList({
      type: "React-Post",
      payload: {
        postId,
      },
    });
  }

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, reactionIncr }}>
      {children}
    </PostList.Provider>
  );
};
let DEFAULT_POST_LIST=[];


  
  let response= await axios.get('http://localhost:2000/api/post');
  DEFAULT_POST_LIST=response.data
  // console.log(DEFAULT_POST_LIST);
  
  





export default PostListProvider;