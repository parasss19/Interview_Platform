import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

//[Mutation]

//add a new comment 
export const addComment = mutation({
    args: {
        interviewId: v.id("interviews"),
        content: v.string(),
        rating: v.number(),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();  //check if user is authenticated 
        if(!identity) throw new Error("Unauthorized")

        return await ctx.db.insert("comments", {
            interviewId: args.interviewId,
            content: args.content,
            rating: args.rating,
            interviewerId: identity.subject,   //identity.subject gives the id of the currently authenticated user(i.e interviewer)
        })
    }
})


//[Query]

//get all comments for an interview
export const getComments = query({
   args: {
    interviewId: v.id("interviews"),
   },
   handler: async(ctx , args) => {
    const allComments = await ctx.db.query("comments").withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId)).collect ();
    return allComments;
   }
})