import React from "react";

import { useState, useEffect } from "react";
import Container from '../components/container/Container';
import PostForm from '../components/Post-form/PostForm';
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appwrite/config';


function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()                // to extract the value from URL, we use useParams
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)

                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (<div className="py-8">

        <Container>
            <PostForm post={post} />
        </Container>
    </div>) : null

}

export default EditPost