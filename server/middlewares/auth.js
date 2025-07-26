import { clerkClient } from "@clerk/express";


export const auth =async (req, res, next) => {
    try {
       const { userId,has } = await req.auth();
       const hasPremium =await has({plan:'premium'});

       const user =await clerkClient.users.getUser(userId);

       if(!hasPremium && user.privateMetadata.free_usage){
        req.free_usage= user.privateMetadata.free_usage;
       } else{
        await clerkClient.users.updateUser(userId, {
            privateMetadata: {
                free_usage: 0
            }
        });
        req.free_usage = 0;
       }
       req.plan = hasPremium ? 'premium' : 'free';
       next();
    } catch (error) {
        res.json({
            error: 'Authentication failed',
            success: false
        });
    }
}