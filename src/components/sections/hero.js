import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 100px 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
  }

  .big-heading {
    margin-top: 20px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Namaste/Hello/Hola/Hallo/Ni Hao/Kon'nichiwa</h1>;
  const two = <h2 className="big-heading">I am DKP</h2>;
  const three = <h3 className="big-heading">I develop tech products, write tech content and mentor tech students. Happily.</h3>;
  const four = (
    <p>
      I'm a Full Stack Developer with over 2.5 years of experience in building sleek UIs and robust services across JavaScript, Java and Python stacks.
      <br />I love progra-memes, won't/can't fix your printer, and overdose on tea.
      <br/>
      I work at Deutsche Bank as a Software Engineer, and have worked previously at <a href="https://crio.do">Crio.Do</a>, <a href="https://oyerickshaw.com">Oye Rickshaw</a>, <a href="https://appbase.io">Appbase</a>, <a href="https://geeksforgeeks.org">GeeksforGeeks</a> and Helping Hands.
    </p>
  );
  const five = (
    <a href={`#contact`} className="email-link">
      Hit Me Up
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};

export default Hero;
