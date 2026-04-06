const PDFDocument = require("pdfkit");
const { Booking } = require("../Model/Booking");
const { transporter } = require("../Transporter");

async function generateInvoice(req, res) {
  try {
    const booking = await Booking.findById(req.params._id)
      .populate("hotel","title address city state subcategory price discount finalprice")
      .populate("userid",'username email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_SENDER,
          to: booking.userid?.email,
          subject: "Your Booking Invoice - Velmora",
          text: "Thank you for your booking. Your invoice is attached.",
          attachments: [
            {
              filename: `Invoice-${booking._id}.pdf`,
              content: pdfData,
            },
          ],
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=Invoice-${booking._id}.pdf`
        );

        return res.send(pdfData);
      } catch (err) {
        console.log("Email Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Invoice generated but email failed",
        });
      }
    });

    // SAFE VALUE FUNCTION
    const safe = (val) => (val ? val : "N/A");
    const safeNum = (val) => (val && !isNaN(val) ? val : 0);

    // =========================
    // FULL BORDER
    // =========================
    doc.rect(20, 20, 555, 802).lineWidth(2).stroke("#000");

    // =========================
    // HEADER
    // =========================
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("VELMORA HOTELS", 50, 50);

    // =========================
    // INVOICE INFO
    // =========================
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("BOOKING INVOICE", 370, 50);

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Invoice No: ${booking._id}`, 370, 105)
      .text(
        `Date: ${new Date(booking.createdAt).toLocaleDateString("en-IN")}`,
        370,
        95
      );

    doc.moveTo(50, 130).lineTo(545, 130).stroke();

    // =========================
    // BILL TO
    // =========================
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Bill To:", 50, 150);

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(safe(booking.userid?.username), 50, 170)
      .text(safe(booking.userid?.email), 50, 185)
      .text(safe(booking.userid?.phone), 50, 200);

    // =========================
    // STAY DETAILS
    // =========================
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Stay Details:", 300, 150);

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(
        `Check-in: ${new Date(booking.checkindate).toLocaleDateString("en-IN")}`,
        300,
        170
      )
      .text(
        `Check-out: ${new Date(booking.checkoutdate).toLocaleDateString("en-IN")}`,
        300,
        185
      )
      .text(`Rooms: ${safeNum(booking.rooms)}`, 300, 200);

    // =========================
    // TABLE HEADER
    // =========================
    const tableTop = 240;

    doc.rect(50, tableTop, 495, 25).stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Description", 60, tableTop + 8)
      .text("Qty", 300, tableTop + 8)
      .text("Rate", 360, tableTop + 8)
      .text("Amount", 450, tableTop + 8);

    // =========================
    // TABLE ROW
    // =========================
    const subtotal = safeNum(booking.subtotal);
    const service = safeNum(booking.servicefees);
    const total = safeNum(booking.total);

    doc.rect(50, tableTop + 25, 495, 30).stroke();

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(safe(booking.hotel?.title), 60, tableTop + 35)
      .text(safeNum(booking.rooms).toString(), 305, tableTop + 35)
      .text(`₹ ${subtotal}`, 360, tableTop + 35)
      .text(`₹ ${subtotal}`, 450, tableTop + 35);

    // =========================
    // TOTAL SECTION
    // =========================
    const totalTop = tableTop + 100;

    doc
      .fontSize(10)
      .text(`Subtotal: ₹ ${subtotal}`, 400, totalTop, {
        align: "right",
        width: 140,
      })
      .text(`Service Charge: ₹ ${service}`, 400, totalTop + 20, {
        align: "right",
        width: 140,
      });

    doc.rect(350, totalTop + 50, 195, 35).stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(`Grand Total: ₹ ${total}`, 360, totalTop + 65);

    // =========================
    // FOOTER
    // =========================
    doc
      .fontSize(9)
      .font("Helvetica")
      .text(
        "This is a system generated invoice and does not require signature.",
        50,
        760,
        { align: "center", width: 495 }
      );

    doc.end();
  } catch (error) {
    console.log("Main Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = { generateInvoice };