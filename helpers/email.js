import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendValidationEmail = async (email, verificationToken, protocol, host) => {
    const url = protocol + '://' + host + `/users/verify/${verificationToken}`;
     const registerEmailMsg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Please follow the link to finish registration',
      html: `<a target="_blank" href="${url}"><a>Confirm my Email</a>`,
    };
    try {
      await sgMail.send(registerEmailMsg);
    } catch (error) {
      throw HttpError(500, "Unable to send Email")
    }
  }
  