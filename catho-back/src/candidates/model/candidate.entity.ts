import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const CandidatesSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, unique: true },
    email: { type: String },
    avatar: { type: String },
    skills: { type: Array, default: [], required: true },
  },
  {
    timestamps: true,
  },
);

CandidatesSchema.index({ name: 1 });

CandidatesSchema.pre('save', function (next) {
  if (this.email === undefined) {
    const nameParts = this.name.split(' ');

    const firstName = nameParts[0].toLocaleLowerCase();
    const lastName = nameParts[nameParts.length - 1].toLocaleLowerCase();

    this.skills = this.skills.map((skill) => skill.toLocaleLowerCase());

    this.email = faker.internet.email({ firstName, lastName });
  }

  if (this.avatar === undefined) {
    this.avatar = faker.image.avatar();
  }

  next();
});

CandidatesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

export interface Candidates extends mongoose.Document {
  id: string;
  user_id: string;
  tokens: number;
}
