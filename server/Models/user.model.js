import mongoose from "mongoose";

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: 3, maxLength: 20 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 20 },
    dateOfBirth: { type: Date, required: true, validate: {
        validator: function(v) {
            // Check if date of birth is not in the future
            return v && v < new Date();
        },
        message: props => `${props.value} is not a valid date of birth!`
    }},
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    email: { type: String, required: true, minLength: 3, maxLength: 200, unique: true, validate: validateEmail },
    userName: { type: String, required: true, minLength: 3, maxLength: 200, unique: true },
    lastOtp: { type: String, required: true, minLength: 6, maxLength: 6 },
    isVerified: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
