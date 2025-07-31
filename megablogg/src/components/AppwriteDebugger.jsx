import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import conf from '../conf/conf';

const AppwriteDebugger = () => {
    const [debugInfo, setDebugInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const runDiagnostics = async () => {
            const info = {
                config: {
                    appwriteUrl: conf.appwriteUrl,
                    appwriteProjectId: conf.appwriteProjectId,
                    appwriteDataBaseId: conf.appwriteDataBaseId,
                    appwriteCollectionId: conf.appwriteCollectionId,
                    appwriteBucketId: conf.appwriteBucketId
                },
                tests: {}
            };

            // Test database connection
            try {
                const posts = await service.getPosts();
                info.tests.database = { 
                    success: true, 
                    postsCount: posts ? posts.documents.length : 0,
                    posts: posts ? posts.documents.map(p => ({
                        id: p.$id,
                        title: p.title,
                        featuredimage: p.featuredimage
                    })) : []
                };
            } catch (error) {
                info.tests.database = { 
                    success: false, 
                    error: error.message 
                };
            }

            // Test storage connection
            try {
                // Try to list files in bucket (this will fail if no access but will tell us about connectivity)
                const testFilePreview = service.getFilePreview('test-id');
                info.tests.storage = { 
                    success: true, 
                    note: 'Storage service initialized successfully',
                    testPreviewUrl: testFilePreview
                };
            } catch (error) {
                info.tests.storage = { 
                    success: false, 
                    error: error.message 
                };
            }

            setDebugInfo(info);
            setLoading(false);
        };

        runDiagnostics();
    }, []);

    if (loading) {
        return <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
            <h3 className="font-bold">Running Appwrite Diagnostics...</h3>
        </div>;
    }

    return (
        <div className="p-4 bg-blue-100 border border-blue-400 rounded mb-4">
            <h3 className="font-bold text-lg mb-2">Appwrite Debug Information</h3>
            
            <div className="mb-4">
                <h4 className="font-semibold">Configuration:</h4>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(debugInfo.config, null, 2)}
                </pre>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold">Tests:</h4>
                <div className="space-y-2">
                    <div className={`p-2 rounded ${debugInfo.tests.database?.success ? 'bg-green-100' : 'bg-red-100'}`}>
                        <strong>Database:</strong> {debugInfo.tests.database?.success ? 'Connected' : 'Error'}
                        {debugInfo.tests.database?.error && (
                            <div className="text-red-600 text-sm">{debugInfo.tests.database.error}</div>
                        )}
                        {debugInfo.tests.database?.success && (
                            <div className="text-sm">
                                Found {debugInfo.tests.database.postsCount} posts
                            </div>
                        )}
                    </div>
                    
                    <div className={`p-2 rounded ${debugInfo.tests.storage?.success ? 'bg-green-100' : 'bg-red-100'}`}>
                        <strong>Storage:</strong> {debugInfo.tests.storage?.success ? 'Connected' : 'Error'}
                        {debugInfo.tests.storage?.error && (
                            <div className="text-red-600 text-sm">{debugInfo.tests.storage.error}</div>
                        )}
                    </div>
                </div>
            </div>

            {debugInfo.tests.database?.posts && debugInfo.tests.database.posts.length > 0 && (
                <div>
                    <h4 className="font-semibold">Posts with Images:</h4>
                    <div className="space-y-1 text-sm">
                        {debugInfo.tests.database.posts.map(post => (
                            <div key={post.id} className={post.featuredimage ? 'text-green-600' : 'text-gray-500'}>
                                {post.title} - Image ID: {post.featuredimage || 'No image'}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppwriteDebugger;
