const cron = require('node-cron');
const User = require('../Models/User');
const Mailer = require('./Mailer')
const Borrower = require('../Models/Borrower');
const Record = require('../Models/Records');

const sendReminderEmail = async (user) => {
  Mailer.sendReminderEmail(
    user.email,
    'Reminder: Library Book Due',
    'This is a reminder that your library book is due soon. Please return it on time.'
  );
  console.log(`Sending reminder email to ${user.email}`);
}

// Schedule a cron job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    // Find records where issueDate is 14 days old and status is 'issued'
    const recordsToRemind = await Record.find({
      issueDate: { $lte: fourteenDaysAgo },
      status: 'issued',
    });

    for (const record of recordsToRemind) {
      const borrower = await Borrower.findById(record.borrowerId);
      if (borrower) {
        const email = borrower.email;
        const subject = 'Reminder: Return your borrowed book';
        const text = `Dear ${borrower.name},\n\nThis is a reminder to return the book you borrowed (${record.bookId}). Please return it as soon as possible.\n\nThank you!`;

        await Reminder.sendReminderEmail(email, subject, text);
        console.log(`Reminder email sent to ${email}`);
      }
    }
  } catch (error) {
    console.error('Error sending reminder emails:', error.message);
  }
});

module.exports = { sendReminderEmail };
