import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
 import { Container } from "../components/indexx";
import Button from "../components/Button";
import parse from "html-react-parser";     // parser ka kaam ye ha ki jo bhi HTML,ayegi usee parse krke likh do, means BOLD ha to format krke likh do
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;     // for isAuthor

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // Load image after post is set
                    if (post.featuredimage) {
                        loadPostImage(post.featuredimage);
                    }
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const loadPostImage = async (featuredimage) => {
        try {
            // Reset states
            setImageError(false);
            setImageUrl(null);
            
            // First verify if the file exists
            const fileExists = await appwriteService.verifyFile(featuredimage);
            
            if (fileExists) {
                // Try multiple URL generation methods
                let url = null;
                
                // Method 1: Try direct URL first (matches your working format)
                try {
                    url = appwriteService.getDirectFileUrl(featuredimage);
                    console.log('Post page - Using direct URL:', url);
                } catch (directError) {
                    console.log('Post page - Direct URL failed, trying getFileView:', directError);
                    
                    // Method 2: Try getFileView
                    try {
                        url = appwriteService.getFileView(featuredimage);
                        console.log('Post page - Using getFileView URL:', url);
                    } catch (viewError) {
                        console.log('Post page - getFileView failed, trying getFilePreview:', viewError);
                        
                        // Method 3: Fallback to getFilePreview
                        url = appwriteService.getFilePreview(featuredimage);
                        console.log('Post page - Using getFilePreview URL:', url);
                    }
                }
                
                if (url) {
                    setImageUrl(url);
                } else {
                    console.error('Post page - Failed to generate any URL for:', featuredimage);
                    setImageError(true);
                }
            } else {
                console.error('Post page - File does not exist:', featuredimage);
                setImageError(true);
            }
        } catch (error) {
            console.error('Post page - Error in loadPostImage:', error);
            setImageError(true);
        }
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            <Container>
                <div className="w-full flex justify-center mb-8 relative">
                    <div className="relative max-w-4xl mx-auto">
                        {/* Main Image Container with Enhanced Effects */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
                            <div className="relative overflow-hidden rounded-xl bg-white">
                                {post && post.featuredimage && imageUrl && !imageError ? (
                                    <div className="relative">
                                        {/* Gradient Background Behind Image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 opacity-30"></div>
                                        
                                        {/* Main Image */}
                                        <img
                                            src={imageUrl}
                                            alt={post.title}
                                            className="relative z-10 w-full h-auto object-contain rounded-xl transition-all duration-700 ease-out transform group-hover:scale-105"
                                            style={{ maxHeight: '80vh', minHeight: '400px' }}
                                            onError={(e) => {
                                                console.log('Post page - Image failed to load:', post.featuredimage);
                                                console.log('Post page - Failed URL:', e.target.src);
                                                setImageError(true);
                                            }}
                                            onLoad={() => console.log('Post page - Image loaded successfully:', post.featuredimage)}
                                        />
                                        
                                        {/* Subtle Overlay Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none rounded-xl"></div>
                                        
                                        {/* Corner Decorations */}
                                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
                                    </div>
                                ) : imageError ? (
                                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-12 rounded-xl text-center border-2 border-red-200 min-h-[400px] flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 bg-red-200 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>
                                            <p className="text-red-600 font-semibold text-lg">Failed to load featured image</p>
                                            <p className="text-red-500 text-sm mt-2">Please try refreshing the page</p>
                                        </div>
                                    </div>
                                ) : post && post.featuredimage && !imageUrl ? (
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 rounded-xl text-center border-2 border-blue-200 min-h-[400px] flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 relative">
                                                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                                                <div className="relative w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-blue-700 font-semibold text-lg">Loading image...</p>
                                            <p className="text-blue-600 text-sm mt-2">Please wait while we fetch your image</p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        
                        {/* Floating Elements for Extra Visual Appeal */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute -top-1 -right-3 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
                        <div className="absolute -bottom-2 -left-3 w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse delay-500"></div>
                        <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse delay-700"></div>
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                
                {/* Enhanced Title Section */}
                <div className="w-full mb-8 text-center">
                    <div className="relative inline-block">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                            {post.title}
                        </h1>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="relative">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/20">
                        <div className="prose prose-lg max-w-none browser-css">
                            {parse(post.content)}
                        </div>
                        
                        {/* Content Background Decorations */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-pink-100 to-indigo-100 rounded-full opacity-50"></div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}