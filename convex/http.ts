import { httpRouter } from "convex/server";
import {httpAction} from "./_generated/server"
import {WebhookEvent} from "@clerk/nextjs/server"; 
import {Webhook} from "svix";
import {api} from "./_generated/api";

const http = httpRouter();

http.route({
    path:"/clerk-webhook",
    method:"POST",
    handler: httpAction(async(ctx, request) => {
       const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
       if(!webHookSecret){
        throw new Error("Missing CLERK_WEBHOOK_SECRET env variable");
       }

       //headers we get from the request
       const svix_id = request.headers.get("svix-id");
       const svix_signature = request.headers.get("svix-signature");
       const svix_timestamp = request.headers.get("svix-timestamp");

       //if any header is not provided
       if(!svix_id || !svix_signature || !svix_timestamp){
        return new Response("No svix headers found", {
            status: 400, 
        })
       }

       //if we get the header extract the payload from req
       const payload = await request.json();
       const body = JSON.stringify(payload);

       //create webhook instance
       const wh = new Webhook(webHookSecret);
       let event: WebhookEvent;

       //now we verify the payload
       try {
        event = wh.verify(body, {
            "svix-id" : svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
       } 
       catch (error) {
         console.log("Error verifying webhook", error);
         return new Response("Error Occurred", {status: 400});
       }

       //if verification successful add the user in db
       const eventType = event.type;
       if(eventType === "user.created") {
        const {id, email_addresses, first_name, last_name, image_url} = event.data;  //extract value from event.data

        const email = email_addresses[0].email_address;  //extract only first email(if many emails)
        const name = `${first_name || ""} ${last_name || ""}`.trim();

        //now put in db
        try {
            await ctx.runMutation(api.users.syncUser,{
                clerkId: id,
                email: email,
                name: name,
                image: image_url,
            })
        } catch (error) {
            console.log("Error creating user: ", error);
            return new Response("Error creating user", {status: 500});
        }
       }

       return new Response("Webhook processed successfully", {status: 200});
    })
})

export default http;