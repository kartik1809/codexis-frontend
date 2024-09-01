import React from 'react';

const Preloader = () => {
    return (
        <div className="flex absolute top-0 left-0 items-center justify-center h-full w-screen z-50 bg-gray-900">
            <video 
                src="https://cdn.dribbble.com/userupload/6392732/file/original-8ca764fca683a4291138609fc27fca0f.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                preload="auto"
            />
        </div>
    );
};

export default Preloader;
