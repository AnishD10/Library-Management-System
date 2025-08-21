// FineOperations Utility: Calculates fines. Because overdue books aren't free (and neither is pizza).
const borrower = require('../Models/Borrower');
const record = require('../Models/Records');
const book = require('../Models/Book');

const payFine = async (req ,res) => {
    try {
      const   {fine , borrowerId} = req.body
        if (!fine || !borrowerId) {
            return res.status(400).json({ message: 'Fine and borrower ID are required' });
        }
        // Find the borrower by ID
        const borrowerData = await borrower.findByIdAndUpdate(borrowerId).select('fine');
        if (!borrowerData) {
            return res.status(404).json({ message: 'Borrower not found' });
        }
        // Check if the borrower has enough fine to pay
        
        // Deduct the fine from the borrower's account
        borrowerData.fine -= fine;
        if (borrowerData.fine < 0) {
            borrowerData.fine = 0; // Reset fine to 0 if it's negative
           
        }
        await borrowerData.save();
        return res.status(200).json({ message: 'Fine paid successfully', remainingFine: borrowerData.fine });


    } catch (error) {
        console.error('Error paying fine:', error);
    }
}

const renewBook = async (req, res) => {
    try {
        const { recordId} = req.body;
        if (!recordId) {
            return res.status(400).json({ message: 'Record ID is required' });
        }

        // Find the record by ID
        const recordData = await record.findByIdAndUpdate(recordId).select('dueDate');
        if (!recordData) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Update the due date to 30 days from now
        recordData.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await recordData.save();

        return res.status(200).json({ message: 'Book renewed successfully', newDueDate: recordData.dueDate });

    } catch (error) {
        console.error('Error renewing book:', error);
        return res.status(500).json({ message: 'Error renewing book', error: error.message });
    }
}


module.exports = { payFine , renewBook };
    
