import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./main"; //imported Post interface from main.tsx
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost; //setting post type as IPost
}

interface Like {
  likeId: string;
  userId: string;
  userName: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        userName: doc.data().userName,
        likeId: doc.id,
      }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        userName: user?.displayName!,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [
                ...prev,
                {
                  userId: user?.uid,
                  userName: user?.displayName!,
                  likeId: newDoc.id,
                },
              ]
            : [
                {
                  userId: user?.uid,
                  userName: user?.displayName!,
                  likeId: newDoc.id,
                },
              ]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="post">
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="body">
          <p>{post.description}</p>
        </div>
        <div className="footer">
          <div className="author">
            <p></p>
            <img
              src={post?.userImg || ""}
              referrerPolicy="no-referrer"
              width="30"
              height="30"
            />
            <p>
              <span>@{post.username}</span>
            </p>
          </div>

          <div className="like-counters">
            <button onClick={hasUserLiked ? removeLike : addLike}>
              {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
            {likes && <p>Likes: {likes?.length}</p>}
          </div>

          <div className="likers">
            {likes && likes.length > 0 ? (
              <p>
                Liked by:{" "}
                {likes
                  .slice(0, 3)
                  .reverse() // Reverse the order of the displayed likes
                  .map((like, index) => {
                    if (index === 2 && likes.length > 2) {
                      return " and others";
                    } else {
                      if (like.userName === user?.displayName) {
                        return "You";
                      } else {
                        return like.userName;
                      }
                    }
                  })
                  .join(", ")}
              </p>
            ) : (
              <p>Hey, be the first liker!!!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
