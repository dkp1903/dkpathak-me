import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I am open to Full Stack Engineer roles, freelance web development projects and mentoring and talking on open source.
        Please do reach out.
        <br />
        I am available across all social handles - or by mail. If you want a more detailed discussion, please set up a call with me as well.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Ping me here
      </a>
      <br />
      <a className="email-link" href={`https://calendly.com/dkp1903`}>
        Schedule a meet with me
      </a>

    </StyledContactSection>
  );
};

export default Contact;
