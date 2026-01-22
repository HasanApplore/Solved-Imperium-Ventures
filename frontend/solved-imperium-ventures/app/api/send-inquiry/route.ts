import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // TLS (safe)
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, companyName, email, country, service, requirements } = body;

        if (!name || !companyName || !email || !country || !service || !requirements) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        await transporter.sendMail({
            from: `"Solved Imperium Ventures" <${process.env.GMAIL_USER}>`,
            to: "syed.hasan.121415@gmail.com",
            replyTo: email,
            subject: `New Inquiry from ${name} - ${companyName}`,
            text: `
Name: ${name}
Company: ${companyName}
Email: ${email}
Country: ${country}
Service: ${service}

Requirements:
${requirements}
      `,
        });

        return Response.json({ message: "Inquiry sent successfully" });
    } catch (error) {
        console.error("Email sending error:", error);
        return Response.json({ error: "Failed to send inquiry" }, { status: 500 });
    }
}
