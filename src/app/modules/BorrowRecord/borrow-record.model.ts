import { model, now, Schema } from 'mongoose';
import { EBorrowRecordStatus, IBorrowRecord } from './borrow-record.interface';

const BorrowModel = new Schema<IBorrowRecord>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    copy: {
      type: Schema.Types.ObjectId,
      ref: 'BookCopy',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    returnCondition: {
      type: String,
      enum: Object.values(EBorrowRecordStatus),
      default: EBorrowRecordStatus.ONGOING,
    },
    isOverDue: {
      type: Boolean,
      default: false,
    },
    overDueDays: {
      type: Number,
      default: null,
      min: 1,
    },
    fine: {
      type: Schema.Types.ObjectId,
      ref: 'Fine',
      default: null,
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'BookReview',
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(EBorrowRecordStatus),
      default: EBorrowRecordStatus.ONGOING,
    },
    processedBy: {
      type: new Schema({
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        at: {
          type: Date,
          required: true,
        },
      }),
      default: null,
    },
    index: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const BorrowRecord = model<IBorrowRecord>('BorrowRecord', BorrowModel);

export default BorrowRecord;
