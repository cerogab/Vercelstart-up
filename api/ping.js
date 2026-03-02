export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    method: req.method,
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY?.length ?? 0,
    nodeVersion: process.version,
  });
}
