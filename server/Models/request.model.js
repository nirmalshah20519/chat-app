import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isAccepted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model("Request", requestSchema);