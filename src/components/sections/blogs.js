import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledBlogsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .blogs-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    a {
      position: relative;
      z-index: 1;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledBlog = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus-within {
    .blog-inner {
      transform: translateY(-7px);
    }
  }

  .blog-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .blog-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .blog-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.link {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .blog-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .blog-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .blog-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Blogs = () => {
  const data = useStaticQuery(graphql`
    query {
      blogs: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/blogs/" }
          frontmatter: { showInBlogs: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              link
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealBlogs = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealBlogs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const blogs = data.blogs.edges.filter(({ node }) => node);
  const firstSix = blogs.slice(0, GRID_LIMIT);
  const blogsToShow = showMore ? blogs : firstSix;

  return (
    <StyledBlogsSection>
      <h2 ref={revealTitle}>My blogs</h2>

      {/* <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link> */}

      <ul className="blogs-grid">
        <TransitionGroup component={null}>
          {blogsToShow &&
            blogsToShow.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { github, link, title, tech } = frontmatter;

              return (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledBlog
                    key={i}
                    ref={el => (revealBlogs.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    <div className="blog-inner">
                      <header>
                        <div className="blog-top">
                          <div className="folder">
                            <Icon name="Folder" />
                          </div>
                          <div className="blog-links">
                            {github && (
                              <a href={github} aria-label="GitHub Link">
                                <Icon name="GitHub" />
                              </a>
                            )}
                            {link && (
                              <a href={link} aria-label="External Link" className="link">
                                <Icon name="External" />
                              </a>
                            )}
                          </div>
                        </div>

                        <h3 className="blog-title">
                          <a href={link}>{title}</a>
                        </h3>

                        <div
                          className="blog-description"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </header>

                      <footer>
                        {tech && (
                          <ul className="blog-tech-list">
                            {tech.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </ul>
                        )}
                      </footer>
                    </div>
                  </StyledBlog>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledBlogsSection>
  );
};

export default Blogs;
