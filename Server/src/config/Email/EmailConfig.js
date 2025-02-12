import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: "your-email@gmail.com", 
        pass: "your-app-password", 
    },
});

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: "your-email@gmail.com", // Email gửi
            to, // Email người nhận
            subject, // Tiêu đề email
            text, // Nội dung dạng text
            html, // Nội dung dạng HTML
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

export { sendMail };