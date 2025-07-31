import React from "react";
import { useState, useEffect } from "react";
import Container from '../components/container/Container';
import PostCard from "../components/PostCard";
import appwriteService from '../appwrite/config';


function AllPosts() {
    const [posts, setPosts] = useState([])

        // getPosts return an array , see the config.file of appWrite
    // getPosts waise to query leta h as an argument , but if there is no query you to give , so empty array
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])




    //.$id is the syntax of appwrite , in other data bases, it will diffrent 
    return (<div className="py-8 w-full">
        <Container>
            <div className=" flex flex-wrap">
                {posts.map((post) => (

                    <div key={post.$id} className="p-2 w-1/4">

                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            featuredimage={post.featuredimage}
                        />
                    </div>
                ))}
            </div>
        </Container>
    </div>)
}

export default AllPosts