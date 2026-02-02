import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RealisticParachute.css';

const RealisticParachute = () => {
    // We can use state to track mouse position for simulated parallax/wind connection
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        setRotation({ x: y, y: -x }); // Invert for "look" feel
    };

    return (
        <div className="scene-container" onMouseMove={handleMouseMove}>

            {/* Background Atmosphere */}
            <div className="cloud-particles"></div>
            <div className="cloud-particles" style={{ animationDelay: '1.5s', left: '20%' }}></div>

            {/* The Main Rig Dropping */}
            <div className="drop-rig">
                <div className="swing-rig" style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>

                    {/* 3D Parachute Canopy */}
                    <div className="parachute-assembly">
                        <div className="canopy">
                            <div className="canopy-panel p1"></div>
                            <div className="canopy-panel p2"></div>
                            <div className="canopy-panel p3"></div>
                            <div className="canopy-panel p4"></div>
                            <div className="canopy-panel p5"></div>
                            <div className="canopy-panel p6"></div>
                            <div className="canopy-panel p7"></div>
                            <div className="canopy-panel p8"></div>
                        </div>

                        {/* Ropes connecting canopy to crate */}
                        <div className="rope-cluster">
                            <div className="rope-line r1"></div>
                            <div className="rope-line r2"></div>
                            <div className="rope-line r3"></div>
                            <div className="rope-line r4"></div>
                        </div>
                    </div>

                    {/* The Cargo Crate (Login Login) */}
                    <div className="cargo-crate">
                        <div className="face front">
                            <div className="crate-header">
                                <span style={{ fontSize: '3rem', display: 'block' }}>🪂</span>
                                <div className="crate-title">AirDrop Login</div>
                                <div className="crate-subtitle">Secure Supply Line Established</div>
                            </div>

                            <Link to="/admin-login" className="btn-3d btn-admin">
                                Admin Access
                            </Link>

                            <Link to="/user-login" className="btn-3d btn-user">
                                User Access
                            </Link>
                        </div>
                        {/* Optional Side Faces for thickness feel */}
                        {/* <div className="face side"></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealisticParachute;
