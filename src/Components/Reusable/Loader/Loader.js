import React from 'react';

const Loader = ({ bg, mg }) => {
    return (
        <div className="pgLoader" style={{ margin: `${mg ? mg : "40vh 0"}`, backgroundColor: `${bg ? bg : "#ffffff"}` }}>
            <div className="text-center">
                <h6 className="">Loading...</h6>
            </div>
        </div>
    );
};

export default Loader;