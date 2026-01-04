import React from "react";
import "./contact-form.css";

const ContactForm = () => {
    return (
        <div className="contact-form-container">
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="YOUR NAME" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="YOUR EMAIL" />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="INQUIRY SUBJECT"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="TELL US ABOUT YOUR PROJECT"
                        rows="4"
                    ></textarea>
                </div>
                <div className="form-submit">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
