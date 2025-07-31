import React from "react";

function Logo({ width = '100px', className = '' }) {
    return (
        <div className={`flex items-center ${className}`} style={{ width }}>
            <svg 
                viewBox="0 0 200 60" 
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background gradient rectangle */}
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1E40AF" />
                        <stop offset="50%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#BE185D" />
                    </linearGradient>
                </defs>
                
                {/* Logo Icon - Stylized 'M' with blog elements <>*/}
                <g transform="translate(10, 5)">
                    {/* Main 'M' shape */}
                    <path 
                        d="M5 45 L5 15 L15 30 L25 15 L25 45 M5 15 L15 5 L25 15" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                    
                    {/* Blog post lines */}
                    <rect x="32" y="15" width="8" height="2" fill="url(#logoGradient)" rx="1" />
                    <rect x="32" y="20" width="12" height="2" fill="url(#logoGradient)" rx="1" />
                    <rect x="32" y="25" width="10" height="2" fill="url(#logoGradient)" rx="1" />
                    <rect x="32" y="30" width="14" height="2" fill="url(#logoGradient)" rx="1" />
                    <rect x="32" y="35" width="9" height="2" fill="url(#logoGradient)" rx="1" />
                    <rect x="32" y="40" width="11" height="2" fill="url(#logoGradient)" rx="1" />
                </g>
                
                {/* MegaBlog Text */}
                <text 
                    x="60" 
                    y="35" 
                    fontFamily="Arial, sans-serif" 
                    fontSize="20" 
                    fontWeight="bold" 
                    fill="url(#textGradient)"
                >
                    MegaBlog
                </text>
                
                {/* Decorative dots */}
                <circle cx="180" cy="20" r="2" fill="#3B82F6" opacity="0.6" />
                <circle cx="185" cy="30" r="1.5" fill="#8B5CF6" opacity="0.6" />
                <circle cx="190" cy="40" r="1" fill="#EC4899" opacity="0.6" />
            </svg>
        </div>
    );
}

export default Logo;
