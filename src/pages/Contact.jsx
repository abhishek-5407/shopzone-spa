import { useState } from 'react';
import { Mail, PhoneCall, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Sprint Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message content is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="page-contact">
      <div className="contact-header">
        <div className="contact-header-container">
          <h1>Engineering Support & Contact</h1>
          <p>Have questions regarding your sprint deliverables or residency sync?</p>
        </div>
      </div>

      <div className="contact-main-container">
        {/* Contact Info Sidebar */}
        <aside className="contact-info-sidebar">
          <div className="info-card highlight-card">
            <div className="info-card-header">
              <PhoneCall size={24} className="info-icon" />
              <div>
                <h3>Mandatory 1-on-1 Sync</h3>
                <span className="info-tag">Technical Communication KPI</span>
              </div>
            </div>
            <p className="info-card-body">
              Engineers must complete a 3-minute sync with <strong>Mr. Nakul</strong> during Week 1/3 of residency.
            </p>
            <div className="sync-detail-list">
              <div><strong>Phone:</strong> <a href="tel:8851407750">8851407750</a></div>
              <div><strong>Window:</strong> Mon – Fri | 9:00 AM – 6:00 PM IST</div>
            </div>
            <a href="tel:8851407750" className="btn btn-light btn-block">
              Call Mr. Nakul Now
            </a>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <MapPin size={20} />
              <h4>Headquarters</h4>
            </div>
            <p>ShopZone SPA Engineering Residency Lab, Tech Hub</p>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <Mail size={20} />
              <h4>Email Engineering</h4>
            </div>
            <p>engineering@shopzone.io</p>
          </div>
        </aside>

        {/* Contact Form */}
        <main className="contact-form-area">
          {submitted ? (
            <div className="contact-success-card">
              <CheckCircle2 size={56} className="success-icon" />
              <h2>Message Sent Successfully!</h2>
              <p>
                Thank you <strong>{formData.name}</strong>. Our engineering lead has received your inquiry regarding "<strong>{formData.subject}</strong>".
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Sprint Inquiry', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-card" noValidate>
              <h2>Send an Inquiry</h2>
              <p className="form-subtitle">Fill out the form below and our team will get back to you.</p>

              <div className="form-group">
                <label htmlFor="nameInput">Full Name *</label>
                <input
                  id="nameInput"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Johnson"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="emailInput">Email Address *</label>
                <input
                  id="emailInput"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subjectSelect">Subject</label>
                <select
                  id="subjectSelect"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="Sprint Inquiry">Sprint Inquiry</option>
                  <option value="Architectural Blocker">Architectural Blocker</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Technical Feedback">Technical Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="messageInput">Message Content *</label>
                <textarea
                  id="messageInput"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your inquiry or sprint question..."
                  className={errors.message ? 'input-error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-block">
                <Send size={18} />
                <span>Submit Inquiry Form</span>
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
