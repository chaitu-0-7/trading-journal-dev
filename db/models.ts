import { models } from "mongoose";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  instruments: {
    type: [String],
  },
});

const instrumentsSchema = new mongoose.Schema({
  instruments: {
    type: [String],
  },
});

const setupsSchema = new mongoose.Schema({
  setups: {
    type: [String],
  },
});

const tradeSchema = new mongoose.Schema({
  longShort: {
    type: String,
    required: true,
    enum: ['long', 'short'], // Enforce "long" or "short" values
  },
  profitLoss: {
    type: String,
  },
  net: {
    type: Number,
  },
  user: {
    type: String,
  },
  tradeDate: {
    type: Date,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  setup: {
    type: String,
  },
  stopLoss: {
    type: Number,
  },
  target: {
    type: Number,
  },
  entryAvg: {
    type: Number,
  },
  exitAvg: {
    type: Number,
  },
  lots: {
    type: Number,
  },
  lotSize: {
    type: Number,
  },
  status: {
    type: String,
  },
  exitReason: {
    type: String,
  },
  goodBad: {
    type: String,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Instruments = mongoose.models.Instruments || mongoose.model('Instruments', instrumentsSchema);
export const Setups = mongoose.models.Setups || mongoose.model('Setups', setupsSchema);
export const Trade = mongoose.models.Trade || mongoose.model('Trade', tradeSchema);