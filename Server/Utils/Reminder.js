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
    const twentyNineDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const thirtyOneDaysAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);



  

    // Find records where issueDate is 14 days old and status is 'issued'
    const recordsToRemind = await Record.find({
      issueDate: { $lte: twentyNineDaysAgo },
      status: 'issue',
    });


    // Find all records where the due date has passed and the book is still not returned
    const overdueRecords = await Record.find({
      dueDate: { $lt: new Date() },
      status: 'issue',
    });

    for (const record of recordsToRemind) {
      const borrower = await Borrower.findById(record.borrowerId);
      if (borrower) {
        const email = borrower.email;
        const subject = 'Reminder: Return your borrowed book';
        const text = `Dear ${borrower.name},\n\nThis is a reminder to renew the book you borrowed (${record.bookId}). Please return it as soon as possible.\n\nThank you!`;

        await Reminder.sendReminderEmail(email, subject, text);
        console.log(`Reminder email sent to ${email}`);
      }
    }

    for (const record of overdueRecords) {
      const borrower = await Borrower.findById(record.borrowerId);
      if (borrower) {
        // Add a fine of 5rs for each overdue book, every day until returned
        borrower.fine = (borrower.fine || 0) + 5;
        await borrower.save();
        // Send a reminder email about the accumulating fine
        const email = borrower.email;
        const subject = 'Overdue Book Notice: Daily Fine Applied';
        const text = `Dear ${borrower.name},\n\nYou have exceeded the due date for the book you borrowed (${record.bookId}). A fine of 5rs has been added to your account for each day the book is overdue. Please return the book as soon as possible to stop further fines.\n\nThank you!`;

        await Reminder.sendReminderEmail(email, subject, text);
        console.log(`Overdue fine of 5rs added to ${email} for book ${record.bookId}.`);
      }
    }

  
    
    
  } catch (error) {
    console.error('Error sending reminder emails:', error.message);  //checking branch
  }
});

module.exports = { sendReminderEmail };
