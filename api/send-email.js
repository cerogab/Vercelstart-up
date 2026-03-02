import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?.trim());

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, source } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // ── 1. Notification email TO you (Bram) ──
    await resend.emails.send({
      from: "Bram App <noreply@bramllc.app>",
      to: "bram0001@bramllc.app",
      subject:
        source === "get-started"
          ? "New Account Request – Bram App"
          : "New Interest – Bram App",
      html: `
        <h2>New ${source === "get-started" ? "Account Request" : "Interest"}</h2>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source ?? "unknown"}</p>
      `,
    });

    // ── 2. Confirmation email TO the visitor ──
    await resend.emails.send({
      from: "Bram App <noreply@bramllc.app>",
      to: email,
      subject: "Welcome to Bram App!",
      html: `
        <h2>Thanks for your interest${name ? `, ${name}` : ""}!</h2>
        <p>We received your request and will be in touch shortly.</p>
        <p>— The Bram App Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    return res.status(500).json({ error: message });
  }
}
