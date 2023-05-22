import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">About Us</h1>
          <p className="lead mb-4">iNotebook a MERN stack web application . Our platform allows users to create, update, and delete personal notes with ease. We also provide personalized login functionality to ensure the security of our users' notes.</p>
          <p className="mb-4">Our team is committed to providing a seamless user experience and constantly improving our platform to meet the needs of our users.</p>
          <p className="mb-4">Thank you for choosing our platform for all your note-taking needs!</p>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="https://tse3.mm.bing.net/th?id=OIP.RSowHQsH0oBWuVbrrRzo9QHaE3&pid=Api&P=0" alt="About Us" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default About;
