import { DefaultSession } from "next-auth"

declare module 'next-auth'{
    interface Session{
        user:{
            // id:string,
            // name:string | null |  undefined
            // email:string | null |  undefined
            // image:string,
            id:string 
        } & DefaultSession ['user']
    }
}

export {}