import React from 'react';
import Infobox from './Infobox';

const MainContent = () => {
  return (
    <main className="main-content">
      <h1 className="article-title">Example.com</h1>
      <div className="short-description">From Wikipedia, the free encyclopedia</div>
      
      <div className="article-body">
        <Infobox />
        <p>
          <strong>Example.com</strong> is a domain name that is reserved for documentation and illustrative purposes. 
          It is specified by the Internet Engineering Task Force (IETF) in RFC 2606 and RFC 6761.
        </p>
        
        <h2>History</h2>
        <p>
          The domain was established in 1999 to provide a standardized example for use in documentation, 
          avoiding the need for writers to use registered domain names that might belong to others.
        </p>
        
        <h2>Usage</h2>
        <p>
          Example.com is used in many technical manuals and software documentation to represent a generic 
          website address. It is not available for registration by the public.
        </p>
        
        <h2>External links</h2>
        <ul>
          <li><a href="https://example.com">Official Website</a></li>
          <li><a href="https://tools.ietf.org/html/rfc2606">RFC 2606</a></li>
        </ul>
      </div>
    </main>
  );
};

export default MainContent;
