import conf from "../conf/conf.js";
import { Client, Databases, ID, Storage, Query } from "appwrite"

export class Service{
    client = new Client()
    databases
    bucket // bucket ~ storage
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // ~ document_id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId // all attributes in database
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }
    //slug - to uniquely identify document and update accordingly
    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false
        }
    }    

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false;    
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){   //("index in db", "its val")
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries // we can do more pagination in this. 
            ) // will return in an array
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
            return false; 
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )// it will return fileId
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false; 
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                fileId
            ) 
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
            return false; 
        }
    }

    getFilePreview(fileId){ // can do async also, but its generally fast
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }    
    
}

const service = new Service()

export default service