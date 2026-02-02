import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookLayout.css';
import Login from './Login';
import AddStudent from './AddStudent';
import StudentTable from './StudentTable';

const BookLayout = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [location.pathname]);

    // Content Switching
    const isListView = location.pathname === "/view";

    return (
        <div className="scene">
            <div className={`book ${isOpen ? 'state-open' : 'state-closed'}`}>

                {/* 1. FRONT COVER (Login) */}
                <div className="page cover-front">
                    {/* Outer Face: Login */}
                    <div className="login-face">
                        <div className="login-title">Student<br />Directory</div>
                        <div style={{ width: '80%', maxWidth: '300px' }}>
                            {/* Passing prop to style simple label login if needed, or CSS handles it */}
                            <Login />
                        </div>
                    </div>

                    {/* Inner Face: Navigation / Dashboard (Visible when Open) */}
                    <div className="cover-front-inner">
                        <div className="content-layer" style={{ padding: '40px', textAlign: 'center' }}>
                            <h2 style={{ color: '#555' }}>Dashboard</h2>
                            <hr style={{ borderTop: '2px solid #bbb', width: '50%' }} />
                            <div style={{ marginTop: '40px', fontSize: '1.2rem', color: '#777', fontFamily: 'Courier Prime' }}>
                                <p><strong>Status:</strong> {isOpen ? 'Access Granted' : 'Locked'}</p>
                                <p><strong>User:</strong> Admin</p>
                                <p><strong>Page:</strong> {isListView ? '2 of 2' : '1 of 2'}</p>
                            </div>
                            <div style={{ marginTop: 'auto', marginBottom: '20px', fontSize: '0.8rem', color: '#aaa' }}>
                                Department of Computer Science
                            </div>
                            <div className="paper-texture"></div>
                        </div>
                    </div>
                </div>

                {/* 2. DECORATIVE PAGES (Flutter Effect) */}
                {/* These pages serve to create the "fan" effect when opening */}
                <div className="page page-sheet decor"></div>
                <div className="page page-sheet decor"></div>

                {/* 3. CONTENT PAGE (Right Side) */}
                <div className="page page-sheet">
                    <div className="content-layer">
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                            <h2 style={{ margin: 0, color: '#333' }}>
                                {isListView ? 'Records' : 'Registration'}
                            </h2>
                            <span style={{ fontFamily: 'Courier Prime', color: '#999' }}>
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>

                        {/* Main Content Area */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {!isListView && location.pathname !== '/' && <AddStudent />}
                            {isListView && <StudentTable />}
                        </div>

                        {/* Footer */}
                        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#ccc' }}>
                            - Page {isListView ? '02' : '01'} -
                        </div>
                        <div className="paper-texture"></div>
                    </div>
                </div>

                {/* 4. BACK COVER */}
                <div className="page cover-back"></div>

            </div>
        </div>
    );
};

export default BookLayout;
