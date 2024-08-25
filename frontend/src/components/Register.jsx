import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { registerService, verifyAccountService } from '../Services/auth.service';

const Register = ({switchFn}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    const today = new Date().toISOString().slice(0, 10);
    tempErrors.firstName = formData.firstName ? '' : 'First name is required';
    tempErrors.lastName = formData.lastName ? '' : 'Last name is required';
    tempErrors.dateOfBirth = formData.dateOfBirth ? (formData.dateOfBirth > today ? 'Date of birth cannot be in the future' : '') : 'Date of birth is required';
    tempErrors.gender = formData.gender ? '' : 'Gender is required';
    tempErrors.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) ? '' : 'Email is not valid';
    if (showOtpInput) {
        // Check if OTP is exactly 6 digits long and contains only numbers
        tempErrors.otp = (/^\d{6}$/).test(formData.otp) ? '' : 'OTP must be exactly 6 digits and numeric';
    } 
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setErrors({
      ...errors,
      [event.target.name]: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Call API
      if (!showOtpInput) {
        setLoading(true);
        const {otp, ...register} = formData;
        registerService(register).then(resp=>{
            console.log(resp);
            toast.success(resp.message)
            setLoading(false)
            setShowOtpInput(true); // Proceed to OTP entry if initial form is valid
        }).catch(err=>{
            console.log(err);
            toast.error(err.response.data.message);
            setLoading(false)
        })
        
      } else {
        const {email, otp, ...rest} = formData;
        setLoading(true);
        verifyAccountService({email, otp}).then(resp=>{
            toast.success(resp.message);
            setLoading(false);
            switchFn(true);
        }).catch(err=>{
            toast.error(err.response.data.message);
            setLoading(false);
        })

        
        console.log('Submit OTP'); // Implement OTP submission logic
      }
    }
  };

  const handleBack = () => {
    setShowOtpInput(false);
    setErrors({});
  };

  return (
    <div className="flex flex-col items-center bg-white mt-8 justify-center p-4 border-2 rounded-lg shadow-lg">
      <h2 className="text-4xl text-blue-500 font-bold mb-8 underline">Register</h2>
      <form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
        {showOtpInput ? (
          <>
            <TextField
              name="otp"
              label="Enter OTP"
              variant="outlined"
              fullWidth
              error={!!errors.otp}
              helperText={errors.otp}
              onChange={handleChange}
              value={formData.otp}
            />
            <div className="flex justify-between">
              <Button variant="outlined" color="primary" onClick={handleBack} className="bg-white">
                Back
              </Button>
              <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" className="mt-4 bg-blue-500">
              {loading ? <CircularProgress size={'20px'} sx={{color:'white'}}/>:'Next'}
              </Button>
            </div>
          </>
        ) : (
          <div className=' w-72'>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              sx={{mb:2}}
              
              error={!!errors.firstName}
              helperText={errors.firstName}
              onChange={handleChange}
              value={formData.firstName}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{mb:2}}
              
              error={!!errors.lastName}
              helperText={errors.lastName}
              onChange={handleChange}
              value={formData.lastName}
            />
            <TextField
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{mb:2}}
              
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              onChange={handleChange}
              value={formData.dateOfBirth}
            />
            <FormControl sx={{mb:2}} component="fieldset" error={!!errors.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
              {errors.gender && <FormLabel error>{errors.gender}</FormLabel>}
            </FormControl>
            <TextField
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{mb:2}}
              
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              value={formData.email}
            />
            <Button type="submit" disabled={loading} fullWidth variant="contained" color="primary" className="mt-4 bg-blue-500">
              {loading ? <CircularProgress size={'20px'} sx={{color:'white'}}/>:'Register'}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
