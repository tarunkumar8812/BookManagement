import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div class="links-container">

          <div class="links-container-items">
            <h4>Company</h4>
            <ul>
              <li><a href="/pagenotfound" rel="noreferrer">About Us</a></li>
              <li><a href="/pagenotfound" rel="noreferrer">Career</a></li>
              <li><a href="/pagenotfound" rel="noreferrer">Blog</a></li>
              <li><a href="/pagenotfound" rel="noreferrer">Contact Us</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Policies</h4>
            <ul>
              <li><a rel="noreferrer" href="/pagenotfound">Privacy Policies</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Terms of Use</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Secure Shopping</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Copyright Policy</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Help</h4>
            <ul>
              <li><a rel="noreferrer" href="/pagenotfound">Payment</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Shipping</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Return</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">FAQ</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Misc</h4>
            <ul>
              <li><a rel="noreferrer" href="/pagenotfound">Affiliate</a></li>
              <li><a rel="noreferrer" href="/pagenotfound">Sitemap</a></li>
            </ul>
          </div>
        </div>



        {/* -------------------------- */}

        <div className='social-media'>
          <ul >
            <li class="list-item">
              <a href="/pagenotfound" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/facebook.png" alt="Facebook" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="/pagenotfound" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/twitter.png" alt="Twitter" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="/pagenotfound" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/linkedin.png" alt="Linkedin" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="/pagenotfound" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/pinterest.png" alt="Pinterest" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a rel="noreferrer" href="/pagenotfound"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/youtube.png" alt="Youtube" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="/pagenotfound" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/instagram.png" alt="Instagram" width="32px" height="32px" /></a>
            </li>

          </ul>

        </div>

        {/* ------------------------------- */}
        <div class="copyright">
          Copyright © 2023 . ReadersClub.com <span class="allrightreserve">All Rights Reserved</span>
        </div>
      </div>
    </>

  )
}

export default Footer