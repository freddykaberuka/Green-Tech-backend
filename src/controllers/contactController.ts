import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const submitContactQuery = async (req: Request, res: Response) => {
  const { names, email, phone, question } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  if (!receiverEmail) {
    return res.status(500).send({ error: 'Receiver email is not defined in environment variables' });
  }

  const mailOptions = {
    from: email,
    to: receiverEmail,
    subject: `New Contact Query from ${names}`,
    text: `Name: ${names}\nEmail: ${email}\nPhone: ${phone}\n\nQuestion:\n${question}`,
    html: `<p><strong>Name:</strong> ${names}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Question:</strong></p><p>${question}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Your query has been submitted successfully!' });
  } catch (error) {
    if (isError(error)) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unknown error occurred' });
    }
  }
};
