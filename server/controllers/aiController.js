
import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary"
const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(403).json({
                error: 'Free usage limit exceeded , please upgrade to premium',
                success: false
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [

                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${prompt}, 'article')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1

                }
            });
        }
        res.json({ success: true, content });

    } catch (error) {
        console.error("Error generating article:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            success: false
        });
    }
};

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(403).json({
                error: 'Free usage limit exceeded , please upgrade to premium',
                success: false
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [

                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${prompt}, 'blog-title')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1

                }
            });
        }
        res.json({ success: true, content });

    } catch (error) {
        console.error("Error generating article:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            success: false
        });
    }
};

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;


        if (plan !== 'premium') {
            return res.status(403).json({
                message: ' This feture is only available for premium subscriptions ',
                success: false
            });
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        
        const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
            headers:{'x-api-key':process.env.CLIPDROP_API_KEY,},
                responseType:"arraybuffer"
            
        })
       
        const base64Image=`data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

       const {secure_url}= await cloudinary.uploader.upload(base64Image)

        await sql`INSERT INTO creations (user_id, content, prompt, type,publish) VALUES (${userId}, ${secure_url}, ${prompt}, 'image',${publish ?? false} )`;

       
        res.json({ success: true, content:secure_url });

    } catch (error) {
        console.error("Error generating image:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            success: false
        });
    }
};