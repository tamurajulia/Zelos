'use client'

import React from 'react';
import styled from 'styled-components';
import './Loader.css'

const Loader = () => {
    return (
        <>
            <div className="loding-content">
                <svg viewBox="25 25 50 50">
                    <circle r={20} cy={50} cx={50} />
                </svg>
            </div>
        </>
    );
}

export default Loader;
