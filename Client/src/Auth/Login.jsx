
import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/images/background.jpg';  

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [resetStep, setResetStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:3000/api/users/login', formData)
        .then(response => {
            alert('Login successful!');
            window.location.href = '/'; // Redirect to home page after successful login
            console.log(response.data);
        })
        .catch(error => {
            setMessage('Login failed: ' + error.response.data.message);
            console.error('There was an error!', error);
        });
    
        console.log('Form submitted:', formData);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        
        if (!forgotPasswordEmail) {
            setMessage('Please enter your email address');
            return;
        }

        axios.post('http://localhost:3000/api/users/forgotPassword', { email: forgotPasswordEmail })
        .then(response => {
            setMessage('OTP sent to your email!');
            setResetStep(2); // Move to OTP verification step
        })
        .catch(error => {
            setMessage('Error sending OTP: ' + (error.response?.data?.message || error.message));
            console.error('Forgot password error:', error);
        });
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        
        if (!otp) {
            setMessage('Please enter the OTP');
            return;
        }

        axios.post('http://localhost:3000/api/users/verify-otp', { 
            email: forgotPasswordEmail, 
            otp: otp 
        })
        .then(response => {
            setMessage('OTP verified! Please set your new password.');
            setResetStep(3); // Move to new password step
        })
        .catch(error => {
            setMessage('Invalid OTP: ' + (error.response?.data?.message || error.message));
            console.error('OTP verification error:', error);
        });
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        
        if (!newPassword || !confirmPassword) {
            setMessage('Please fill in both password fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setMessage('Password must be at least 6 characters long');
            return;
        }

        axios.post('http://localhost:3000/api/users/resetPassword', { 
    
            newPassword: newPassword, 
            confirmPassword: confirmPassword
        })
        .then(response => {
            setMessage('Password reset successful! You can now login with your new password.');
            // Reset all states and go back to login
            setTimeout(() => {
                setShowForgotPassword(false);
                setResetStep(1);
                setForgotPasswordEmail('');
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
                setMessage('');
            }, 2000);
        })
        .catch(error => {
            setMessage('Error resetting password: ' + (error.response?.data?.message || error.message));
            console.error('Password reset error:', error);
        });
    };

    const resetForgotPasswordState = () => {
        setShowForgotPassword(false);
        setResetStep(1);
        setForgotPasswordEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
    };
    
    return (
        <div 
        className="min-h-screen w-full fixed inset-0" 
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}
        >
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-5">
            <div className="bg-white/10 backdrop-blur-l rounded-3xl shadow-2xl w-full overflow-hidden border border-white/20 max-w-md">
            <div className="py-10 px-5 md:px-10">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {!showForgotPassword ? 'Login' : 
                     resetStep === 1 ? 'Reset Password' :
                     resetStep === 2 ? 'Verify OTP' : 'Set New Password'}
                </h2>
                
                {!showForgotPassword ? (
                    // Login Form
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input 
                                type='password' 
                                name='password' 
                                id='password' 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
                        >
                            Login
                        </button>
                        
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-blue-300 hover:text-blue-100 text-sm underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                ) : resetStep === 1 ? (
                    // Step 1: Email Input for Password Reset
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-6">
                            <label htmlFor="forgotEmail" className="block text-sm font-medium mb-2">Email Address</label>
                            <input 
                                type="email" 
                                name="forgotEmail" 
                                id="forgotEmail" 
                                value={forgotPasswordEmail} 
                                onChange={(e) => setForgotPasswordEmail(e.target.value)} 
                                required 
                                placeholder="Enter your email to reset password"
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 mb-4"
                        >
                            Send OTP
                        </button>
                        
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={resetForgotPasswordState}
                                className="text-blue-300 hover:text-blue-100 text-sm underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : resetStep === 2 ? (
                    // Step 2: OTP Verification
                    <form onSubmit={handleOtpVerification}>
                        <div className="mb-4">
                            <p className="text-sm text-gray-300 mb-4 text-center">
                                We've sent a verification code to <strong>{forgotPasswordEmail}</strong>
                            </p>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="otp" className="block text-sm font-medium mb-2">Enter OTP</label>
                            <input 
                                type="text" 
                                name="otp" 
                                id="otp" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                required 
                                placeholder="Enter 6-digit OTP"
                                maxLength="6"
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-wider"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
                        >
                            Verify OTP
                        </button>
                        
                        <div className="text-center space-y-2">
                            <button
                                type="button"
                                onClick={() => setResetStep(1)}
                                className="text-blue-300 hover:text-blue-100 text-sm underline block mx-auto"
                            >
                                Change Email
                            </button>
                            <button
                                type="button"
                                onClick={resetForgotPasswordState}
                                className="text-blue-300 hover:text-blue-100 text-sm underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    // Step 3: Set New Password
                    <form onSubmit={handlePasswordReset}>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium mb-2">New Password</label>
                            <input 
                                type="password" 
                                name="newPassword" 
                                id="newPassword" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                                placeholder="Enter new password"
                                minLength="6"
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                placeholder="Confirm new password"
                                minLength="6"
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 mb-4"
                        >
                            Reset Password
                        </button>
                        
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={resetForgotPasswordState}
                                className="text-blue-300 hover:text-blue-100 text-sm underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                )}
                
                {message && (
                    <p className={`mt-4 text-center ${
                        message.includes('sent') || message.includes('verified') || message.includes('successful') 
                        ? 'text-green-400' 
                        : 'text-red-500'
                    }`}>
                        {message}
                    </p>
                )}
            </div>
            </div>
        </div>
        </div>)
        

}

export default Login;