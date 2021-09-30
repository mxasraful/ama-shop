import React from 'react';

const FPass = () => {
    return (
        <form className="signInForm">
            <h4 className="text-center">Log In</h4>
            <hr />
            <br />
            <div className="signInInputControl mb-2">
                <label htmlFor="fPassEmail"><strong>Email <span className="text-danger"> *</span></strong> </label>
                <input id="fPassEmail" type="email" name="email" className="signInInput" required/>
            </div>
            <input className="btn btn-primary button w-100 mt-3" type="submit" value="Sent Link In Email" />
        </form>
    );
};

export default FPass;