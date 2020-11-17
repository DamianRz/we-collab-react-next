import React from 'react';
import './google-maps.scss';

export const Maps = (props: {
  className: string;
  subtitle: string
}) => {
  return (
    <div className={`map-box ${props.className}`}>
      <iframe
        className="frame-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.4746052670516!2d-55.96159518423412!3d-34.71842947108484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a027c52f4ce27f%3A0xb629ac8b2693f26a!2sArt%20Experience!5e0!3m2!1sen!2suy!4v1601491948311!5m2!1sen!2suy"
        aria-hidden="false"
      />
    </div>
  );
}
