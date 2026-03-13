import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Place Order', path: '/place-order' },
        { name: 'Order Status', path: '/order-status' },
    ];

    return (
        <nav>
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <ShoppingBag size={24} className="text-primary" />
                    <span>OrderFlow <span className="text-primary">System</span></span>
                </Link>

                <div className="nav-links">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Icon Placeholder */}
                <div className="md:hidden">
                    <button className="text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
