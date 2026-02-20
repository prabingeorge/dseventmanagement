import express from "express";
import nodemailer from 'nodemailer'; // ES6 import syntax
import emailExistence from 'email-existence';
import auth from "../middleware/auth.js";
import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User, Categories, CategoriesLists, CategoriesListItems, DecorationBookingDetails } = model;

const router = express.Router();

// Send Email
router.post("/send-mail", async (req, res) => {
    const { to, subject, message, attachments } = req.body;
    console.log(req?.body);
    const transporter = nodemailer.createTransport({
        // port: 465, // 587, // 465,
        host: "smtp.gmail.com",
        // host: "smtp.one.com",
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        // secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, //'ilogwgyksuybyruc',
        },
        // secure: true, // upgrades later with STARTTLS -- change this based on the PORT
    });

    const mailData = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: message,
        html: message,
        attachments: attachments
    };

    // 3. Send the email
    try {
        const info = await transporter.sendMail(mailData);
        console.log('Message sent: %s', info.messageId);
        return res.status(200).json(info);
        // emailExistence.check(to, async (error, response) => {
        //     if (error) {
        //         console.error(error);
        //     } else {
        //         if (response) {
        //             console.log('Email exists. Proceed with Nodemailer.');
        //             // Call your Nodemailer sending function here
        //             const info = await transporter.sendMail(mailData);
        //             console.log('Message sent: %s', info.messageId);
        //             return res.status(200).json(info);
        //         } else {
        //             console.log('Email does not exist. Kindly do provide valid Email!');
        //             return res.status(400)
        //                 .send({ message: 'Email does not exist. Kindly do provide valid Email!' });
        //             // Handle invalid email, e.g., prompt user for correction
        //         }
        //     }
        // });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

export default router;
