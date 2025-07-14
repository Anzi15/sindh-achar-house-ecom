import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("📩 API Route Hit: /api/sendAdminEmail");

    const body = await req.json();
    console.log("📦 Order Data Received:", body);

    const { orderId, customer, grandTotal } = body;


    console.log("🔍 Connecting to SMTP server...");
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mehrandadbeh.anziandco@gmail.com",
        pass: "lasm twxy icpq bduy",
      },
    });

    // Test SMTP Connection
    const testConnection = await transporter.verify();
    console.log("✅ SMTP Connection Successful:", testConnection);

    const mailOptions = {
      from: `"Your Store" <mehrandadbeh.anziandco@gmail.com>`,
      to: ["anziandco@gmail.com", "djam4343@gmail.com"],
      subject: `New Order Received`,
      text: `A new order has been placed. on your website`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", emailResponse);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error sending email:", error);

    return new Response(JSON.stringify({ 
      message: "Email sending failed", 
      error: error.message 
    }), { 
      status: 500 
    });
  }
}
