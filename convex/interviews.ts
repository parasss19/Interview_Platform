import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

//[Mutation]

//create interivew
export const createInterview = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        interviewerIds: v.array(v.string()),
    },

    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized")

        return await ctx.db.insert("interviews",{
            ...args,
        });
    }
})

//update interview status(failed, successful)
export const updateInterviewStatus = mutation({
    args: {
        id: v.id("interviews"),
        status: v.string(),
    },

    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
       
        return await ctx.db.patch(args.id, {
            status: args.status,
            ...(args.status === "completed" ? {endTime: Date.now()} : {})
        });
    }
})
 

//[Query]

//get all interviews
export const getAllInterviews = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized")

        const interviews = await ctx.db.query("interviews").collect();
        return interviews;
    }
})

//get my interviews
export const getMyInterviews = query({
    handler: async(ctx) => {
        //current authenticated user dont have interviews
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) return [];    //no interviews

        //if current authenticated user have interviews
        const interviews = await ctx.db.query("interviews").withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject)).collect();
        return interviews;
    }
})

//get interview by streamcallId
export const getInterviewByStreamCallId = query({
    args: {
        streamCallId: v.string(),
    },
    handler: async(ctx, args) => {
        const interview = await ctx.db.query("interviews").withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId)).first();
        return interview;
    }
})