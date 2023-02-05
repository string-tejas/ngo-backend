const asyncHandler = require("express-async-handler");
const Admin = require("../model/Admin");
const { hashPassword } = require("../utils/hash");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const PdfDoc = require("pdfkit");
const Volunteer = require("../model/Volunteer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "demoforhack233@gmail.com",
        pass: "wudywwtbuobayfpz",
    },
});

// * create admin
const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //   check if admin exists
    const exists = await Admin.findOne({ email }).lean().exec();

    if (exists) {
        return res
            .status(409)
            .json({ message: `Admin with email ${email} already exists` });
    }

    //   create
    const userObj = {
        name,
        email,
        password: await hashPassword(password),
        age,
    };

    const result = await Admin.create(userObj);

    if (!result)
        return res.status(400).json({
            message: "Admin not created",
        });

    return res.json({
        message: "Admin created",
        // todo for testing only remove later,
        // result,
    });
});

// * read admin
const getAllAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.find().select("-password").lean().exec();

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    return res.json(admin);
});

// send cert
const sendCertificate = asyncHandler(async (req, res) => {
    const { _id, accountOf } = req.body;

    console.log({ _id, accountOf });

    const vol = await Volunteer.findById(_id).lean().exec();

    if (!vol)
        return res.status(404).json({
            message: "User not found",
        });

    const doc = new PdfDoc({
        layout: "landscape",
        size: "A4",
    });

    const writePath = path.join(
        __dirname,
        "..",
        "public",
        `${vol.name}-Certificate.pdf`
    );
    const writeStream = fs.createWriteStream(writePath);
    doc.pipe(writeStream);

    const img_path = path.join(__dirname, "..", "public", "cert.jpg");

    doc.image(img_path, 20, -8, { width: 800 });

    doc.fontSize(60).text(vol.name, 40, 225, {
        align: "center",
    });

    doc.end();

    writeStream.on("finish", function () {
        const stream = doc;

        const mailOptions = {
            from: "demoforhack233@gmail.com",
            to: vol.email,
            subject: "Certification of Appreciation",
            text: `This is to certify that your incredible contribution in ${accountOf} has achieved an milestone in making society a better place. Please take our token of appreciation`,
            attachments: [
                {
                    filename: `${vol.name}-Certificate.pdf`,
                    path: writePath,
                    contentType: "application/pdf",
                    // contentLength: fs.statSync(writePath).size,
                    contentDisposition: `attachment; filename=${vol.name}-Certificate.pdf`,
                },
            ],
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                fs.unlinkSync(writePath, function (err) {
                    if (err) throw err;
                    console.log("File deleted");
                });
            }
        });
        return res.json({
            message: "Received request atleast",
        });
    });
});

module.exports = {
    createAdmin,
    getAllAdmin,
    sendCertificate,
};
