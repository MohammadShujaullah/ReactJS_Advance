const conf = {
    // accessing all env file ,it is more better way  of accesssing in production/company
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDataBaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID)

}

export default conf


// when we are direcltly accessing any Id's,
//  from App file, then it may not work , 
// because all the ids must be return in string form , 
// but sometimes,id behaves as number , so we make a configure 
// file to convert all ids in string ,then export all