import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Services, Projects, Blogs, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DB26GTPT8H"></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
               window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-0HKXFHY9NF');
              `,
            }}
          />
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Services />
      <Projects />
      <Blogs />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
