import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

export interface Post {
  //exporting it to include in post.tsx
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
  userImg: string;
}

export const Main = () => {
  const [postsList, setPostList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const [user] = useAuthState(auth);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[] //casting the data as Post[] type
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {!user ? (
        <div className="nonLoggedHeader">
          <h2>
            Please <Link to="/login">login</Link> to hit Likes!!! and Create
            your own posts!!!
          </h2>
          {postsList?.map((singlePost) => (
            <Post post={singlePost} />
          ))}
        </div>
      ) : (
        postsList?.map((singlePost) => <Post post={singlePost} />)
      )}
    </div>
  );
};
