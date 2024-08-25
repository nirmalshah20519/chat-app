import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { toast } from 'react-toastify';
import { authService, loginService, saveToken } from '../Services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function Login({changeAuth, switchFn}) {
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
      });
      const [errors, setErrors] = useState({});
      const [showOtpInput, setShowOtpInput] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

    
      const validateForm = () => {
        let tempErrors = {};
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
              const {email} = formData;
              loginService({email}).then(resp=>{
                  toast.success(resp.message)
                  setLoading(false)
                  setShowOtpInput(true); // Proceed to OTP entry if initial form is valid
              }).catch(err=>{
                  console.log(err);
                  toast.error(err.response.data.message);
                  setLoading(false)
              })
              
            } else {
              const {email, otp} = formData;
              setLoading(true);
              authService({email, otp}).then(resp=>{
                  toast.success(resp.message);
                  saveToken(resp.token)
                  setLoading(false);
                  switchFn(true);
                  changeAuth(true);
                  navigate('/home');
              }).catch(err=>{
                  toast.error(err.response.data.message);
                  setLoading(false);
              })
            }
          }
      };
    
      const handleBack = () => {
        setShowOtpInput(false);
        setErrors({});
      };
    
      return (
        <div className="flex flex-col items-center bg-white mt-8 justify-center p-4 border-2 rounded-lg shadow-lg">
          <h2 className="text-4xl text-blue-500 font-bold mb-8 underline">Login</h2>
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
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <>                
                <TextField
                  name="email"
                  type="text"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  value={formData.email}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4 bg-blue-500">
                  Login
                </Button>
              </>
            )}
          </form>
        </div>
      );
}
