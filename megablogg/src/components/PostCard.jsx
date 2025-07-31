import React, { useState, useEffect } from "react";

import service from "../appwrite/config";
import { Link } from "react-router-dom";
                                                                  /// PostCard has id=($id), and image has id=(featuredimage)
function PostCard({$id, title, featuredimage}) {                   /// to is same as href in html, and link is similar as <a>
    const [imageError, setImageError] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        console.log('PostCard props:', { $id, title, featuredimage });
        
        const loadImage = async () => {
            if (featuredimage) {
                try {
                    // First verify if the file exists
                    const fileExists = await service.verifyFile(featuredimage);
                    
                    if (fileExists) {
                        // Try multiple URL generation methods
                        let url = null;
                        
                        // Method 1: Try direct URL first (matches your working format)
                        try {
                            url = service.getDirectFileUrl(featuredimage);
                            console.log('Using direct URL:', url);
                        } catch (directError) {
                            console.log('Direct URL failed, trying getFileView:', directError);
                            
                            // Method 2: Try getFileView
                            try {
                                url = service.getFileView(featuredimage);
                                console.log('Using getFileView URL:', url);
                            } catch (viewError) {
                                console.log('getFileView failed, trying getFilePreview:', viewError);
                                
                                // Method 3: Fallback to getFilePreview
                                url = service.getFilePreview(featuredimage);
                                console.log('Using getFilePreview URL:', url);
                            }
                        }
                        
                        if (url) {
                            setImageUrl(url);
                        } else {
                            console.error('Failed to generate any URL for:', featuredimage);
                            setImageError(true);
                        }
                    } else {
                        console.error('File does not exist:', featuredimage);
                        setImageError(true);
                    }
                } catch (error) {
                    console.error('Error in loadImage:', error);
                    setImageError(true);
                }
            }
        };
        
        loadImage();
    }, [featuredimage, $id, title]);

    const handleImageError = (e) => {
        console.log('Image failed to load for:', featuredimage);
        console.log('Image URL that failed:', e.target.src);
        console.log('Error event:', e);
        setImageError(true);
    };

    /// to ke undr, puura URL paas krne ki zrurat nahi pdti, sirf '/' ke baad ja pr jaana hota ha put kr dia jata h.
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-50 cursor-pointer group">
                <div className='w-full justify-center mb-4 relative overflow-hidden rounded-xl'>
                    {featuredimage && imageUrl && !imageError
                        ? <div className="relative">
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                className="rounded-xl w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-110" 
                                onError={handleImageError}
                                onLoad={() => console.log('Image loaded successfully for:', featuredimage)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 ease-in-out rounded-xl"></div>
                          </div>
                        : <div className="bg-gray-200 p-8 rounded-xl text-center text-gray-500 transition-colors duration-300 group-hover:bg-gray-300">
                            {imageError ? 'Failed to load image' : (!imageUrl ? 'Loading image...' : 'No image')}
                          </div>
                    }
                </div>
                <h2 className="text-xl font-bold transition-colors duration-300 ease-in-out group-hover:text-blue-600">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;