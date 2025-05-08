import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

//Mutation

export const syncUser = mutation({
   //Validators for arguments.
    args:{
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        image: v.optional(v.string()),
    },

    //Function implementation.
    handler: async(ctx, args) => {
        //check if user already existing 
        const existingUser = await ctx.db.query("users").filter((q)=> q.eq(q.field("clerkId"), args.clerkId)).first();
        
        if(existingUser) return;

        //if user not present than insert it in our db
        return await ctx.db.insert("users", {
            ...args,
            role: "candidate"
        })
    }
});


//QUERIES

//get all users
export const getUsers = query({
  handler: async(ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("User is not authenticated")

    const users = await ctx.db.query("users").collect();
    return users;
  }
})


//get specific query using clerkId
export const getUserByClerkId = query({
    //Validators for arguments.
    args: {
      clerkId: v.string(),
    },

    //Function implementation.
    handler: async(ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if(!identity || identity.subject !== args.clerkId) {
        throw new Error("Unauthorized");
      }
    
      const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)).first();
      
      if(!user){
       throw new Error("User is not present")
      }
  
      return user;
    }
})
  