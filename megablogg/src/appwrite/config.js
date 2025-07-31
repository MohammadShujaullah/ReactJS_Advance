import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client);

    }
    async createPost({ title, slug, content, featuredimage, status, userid }) {  // these syntax is of appwrite , like how to create document,which argument must pass
        try {
            console.log('=== CREATE POST DEBUG ===');
            console.log('Title:', title);
            console.log('Slug:', slug);
            console.log('Content:', content);
            console.log('Content length:', content ? content.length : 'undefined/null');
            console.log('Featured image:', featuredimage);
            console.log('Status:', status);
            console.log('User ID:', userid);
            console.log('Database ID:', conf.appwriteDataBaseId);
            console.log('Collection ID:', conf.appwriteCollectionId);
            console.log('=== END CREATE POST DEBUG ===');

            const result = await this.databases.createDocument(conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,                         // slug is document ID
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,

                }
            );

            console.log('=== POST CREATED SUCCESSFULLY ===');
            console.log('Created post:', result);
            console.log('=== END SUCCESS ===');

            return result;

        }
        catch (error) {
            console.log('appwrite service::creatPost::error', error)

            // Show alert with specific reason from Appwrite
            if (error?.message) {
                alert(`Failed to create post: ${error.message}`);
            } else {
                alert('Failed to create post due to an unknown error.');
            }
        }

    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,                                         // slug is document ID
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )

        }
        catch (error) {
            console.log('appwrite service::updatePost::error', error)
        }

    }


    async deletePost(slug) {       ///just using slug(documentID) ,we delete the post
        try {
            await this.databases.deleteDocument(conf.appwriteDataBaseId,     //yha return kraane ki zrurat nahi ha, just delete it 
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.log('appwrite service::deletePost::error', error)
            return false;
        }
    }

    // now ,if we want to consider a post, one post or multiple post so how do we know ,to select the post 
    // below 2 functions is used for this, 1st oner is for 1 doc, 2nd function is for list of id


    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch (error) {
            console.log('appwrite service::getPost::error', error)
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {    // i want to get only those post ,whose status are active
        try {
            return await this.databases.listDocuments(conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries,
            )                                     // it returns an array 
        }
        catch (error) {
            console.log('appwrite service::getPosts::error', error)
            return false;
        }
    }



    // now file upload service ,below


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file, [
                Permission.read(Role.any())  // For public images
            ]

            )
        }
        catch (error) {
            console.log('appwrite service::uploadfile::error', error)
            return false;
        }
    }


    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log('appwrite service::uploadfile::error', error)
            return false;
        }

    }

    async verifyFile(fileId) {
        try {
            if (!fileId) return false;

            const file = await this.bucket.getFile(conf.appwriteBucketId, fileId);
            console.log('File verification successful:', file);
            return true;
        } catch (error) {
            console.error('File verification failed:', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            if (!fileId) {
                console.log('getFilePreview: No fileId provided');
                return null;
            }

            console.log('Getting file preview for fileId:', fileId);
            console.log('Using bucket ID:', conf.appwriteBucketId);

            // Try the preview method first
            const preview = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
                2000, // width
                2000, // height
                'center', // gravity
                100, // quality
                'jpg' // format
            );

            console.log('Generated preview URL:', preview);
            return preview;
        } catch (error) {
            console.error('appwrite service::getFilePreview::error', error);
            console.error('FileId that caused error:', fileId);
            console.error('Bucket ID:', conf.appwriteBucketId);

            // Fallback: try to generate the view URL manually
            try {
                const fallbackUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
                console.log('Using fallback URL:', fallbackUrl);
                return fallbackUrl;
            } catch (fallbackError) {
                console.error('Fallback URL generation failed:', fallbackError);
                return null;
            }
        }
    }

    // Alternative method to get file view URL directly
    getFileView(fileId) {
        try {
            if (!fileId) {
                console.log('getFileView: No fileId provided');
                return null;
            }

            const viewUrl = this.bucket.getFileView(conf.appwriteBucketId, fileId);
            console.log('Generated view URL:', viewUrl);
            return viewUrl;
        } catch (error) {
            console.error('appwrite service::getFileView::error', error);
            return null;
        }
    }

    // Method to generate URL matching your working format
    getDirectFileUrl(fileId) {
        try {
            if (!fileId) {
                console.log('getDirectFileUrl: No fileId provided');
                return null;
            }

            // Generate URL matching the format that works: 
            // https://fra.cloud.appwrite.io/v1/storage/buckets/6862f485000988b599bd/files/6882b376003bdca81311/view?project=6862e9470001ccf042f4&mode=admin
            const directUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
            console.log('Generated direct URL:', directUrl);
            return directUrl;
        } catch (error) {
            console.error('appwrite service::getDirectFileUrl::error', error);
            return null;
        }
    }

}

const service = new Service()

export default service


