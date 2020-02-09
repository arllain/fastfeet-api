export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '52a8e301336477',
    pass: '18a2badcd6a319',
  },
  default: {
    from: 'FastFeet Team <noreply@gobarber.com>',
  },
};

/**
 *****  Production *********
 *         Amazon SES
 *         Mailgun
 *         Sparkpost
 *         Mandril (Mailchimp)
 *         Gmail
 *
 ****** Development *********
 *           Mailtrap
 */
