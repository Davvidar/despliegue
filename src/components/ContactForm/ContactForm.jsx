import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email: formData.email, suggestions: formData.name + ', ' + formData.message };
      const response = await fetch('https://app.trainfit.net/api/users/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setStatus('Mensaje enviado con éxito!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setStatus('Error al enviar el mensaje.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error al enviar el mensaje.');
    }
  };

  return (
    <div className="contact-form-container mt-5">
      <h2>Contacto</h2>
      <p>¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti. Por favor, completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ContactForm;
