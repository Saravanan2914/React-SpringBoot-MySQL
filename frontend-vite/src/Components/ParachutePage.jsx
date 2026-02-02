import React from 'react';
import { Link } from 'react-router-dom';
import './ParachutePage.css';

const ParachutePage = () => {
    return (
        <div className="sky-wrapper">
            {/* Background Sky & Clouds */}
            <div className="sky-container">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
            </div>

            {/* The Dropping Element */}
            <div className="drop-container">
                <div className="swing-wrapper">
                    {/* Parachutes & Ropes Group */}
                    <div className="parachute-group">
                        <div className="parachute left"></div>
                        <div className="rope l1"></div>
                        <div className="rope l2"></div>

                        <div className="parachute right"></div>
                        <div className="rope r1"></div>
                        <div className="rope r2"></div>
                    </div>

                    {/* The Main Login Box */}
                    <div className="landing-card">
                        <h1 className="title-text">Airborne Access</h1>
                        <p style={{ color: '#636e72', marginBottom: '20px' }}>Secure connection established.</p>

                        <Link to="/admin-login" className="action-btn btn-admin">
                            Admin Jump
                        </Link>
                        <Link to="/user-login" className="action-btn btn-user">
                            User Dive
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParachutePage;
