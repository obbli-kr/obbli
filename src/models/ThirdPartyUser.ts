import mongoose, { Schema, Document, Model } from 'mongoose';

interface IThirdPartyUser extends Document {
  username: string;
  email: string;
  provider: string;
}

const ThirdPartyUserSchema: Schema<IThirdPartyUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
});

const ThirdPartyUser: Model<IThirdPartyUser> = mongoose.models.ThirdPartyUser || mongoose.model<IThirdPartyUser>('ThirdPartyUser', ThirdPartyUserSchema);

export default ThirdPartyUser;
