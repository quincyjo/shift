import nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "user",
    pass: "pass"
  }
});

export class EmailManager {

  constructor() { }

  public send(to, subject, html): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let options = {
        to: to,
        subject: subject,
        html: html
      }
      smtpTransport.sendMail(options, (error, response) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Sent message");
          resolve(response);
        }
      });
    });
    return promise;
  }
}
