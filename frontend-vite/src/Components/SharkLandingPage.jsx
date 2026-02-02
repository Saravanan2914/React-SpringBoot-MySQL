import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SharkLandingPage.css';

const SharkLandingPage = () => {
    const [isBitten, setIsBitten] = useState(false);
    const [sharkAttacking, setSharkAttacking] = useState(false);
    const [splashStyle, setSplashStyle] = useState({});
    const containerRef = useRef(null);

    // Determines the bite shape polygon based on click position relative to the box
    // For simplicity in this demo, we apply a pre-defined "corner bite" class or generate one.
    // The user requested "bite a portion... only bitten section disappear".
    // We will simulate this by clipping the Login Box.

    const handleAttack = (e) => {
        if (sharkAttacking || isBitten) return;

        // 1. Trigger Shark Animation
        setSharkAttacking(true);

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set splash position
        setSplashStyle({
            left: e.clientX,
            top: e.clientY
        });

        // 2. Wait for shark to reach 'bite' point (approx 400-500ms in CSS)
        setTimeout(() => {
            // 3. Apply Bite Effect
            setIsBitten(true);

            // 4. Play crunch sound if we had one
        }, 500);

        // Reset shark animation state after it finishes
        setTimeout(() => {
            setSharkAttacking(false);
        }, 1000);
    };

    return (
        <div className="ocean-container" onClick={handleAttack} ref={containerRef}>
            {/* Ambient Water Effects */}
            <div className="water-surface"></div>

            {/* The Floating Raft (Login Form) */}
            <div className={`login-raft ${isBitten ? 'bitten' : ''}`}>
                <h1 className="title">Deep Blue Access</h1>
                <p style={{ marginBottom: '2rem', fontStyle: 'italic', opacity: 0.8 }}>
                    "Don't get bitten..."
                </p>

                <div className="btn-group">
                    <Link to="/admin-login" className="nav-btn">
                        Captain's Log (Admin)
                    </Link>
                    <Link to="/user-login" className="nav-btn">
                        Crew Check-In (User)
                    </Link>
                </div>
            </div>

            {/* The Shark */}
            <div className={`shark-container ${sharkAttacking ? 'shark-attack' : ''}`}>
                <svg viewBox="0 0 200 400" className="shark-svg" style={{ width: '100%', height: '100%' }}>
                    <path d="M100,50 Q130,150 150,250 Q100,230 50,250 Q70,150 100,50 Z" fill="#000" />
                    {/* Simple silhouette of a shark head/jaws lunging up */}
                    <path d="M50,250 L20,300 L60,280 Z" fill="#000" />
                    <path d="M150,250 L180,300 L140,280 Z" fill="#000" />
                </svg>
            </div>

            {/* Splash Effect Overlay */}
            <div className={`splash ${sharkAttacking ? 'splashing' : ''}`} style={splashStyle}></div>
        </div>
    );
};

export default SharkLandingPage;
