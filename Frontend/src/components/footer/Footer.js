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
              <li class="list-inline-item"><a href="https://www.bookswagon.com/aboutus" target="_blank" rel="noreferrer">About Us</a></li>
              <li><a href="https://www.bookswagon.com/career" target="_blank" rel="noreferrer">Career</a></li>
              <li><a href="https://blog.bookswagon.com" target="_blank" rel="noreferrer">Blog</a></li>
              <li><a href="https://www.bookswagon.com/contactus" target="_blank" rel="noreferrer">Contact Us</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Policies</h4>
            <ul>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/privacypolicy">Privacy Policies</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/termsofuse">Terms of Use</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/safesecurehelp">Secure Shopping</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/copyright">Copyright Policy</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Help</h4>
            <ul>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/paymenthelp">Payment</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/termsofuse?#shipping">Shipping</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/returnhelp">Return</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/faq">FAQ</a></li>
            </ul>
          </div>

          <div class="links-container-items">
            <h4>Misc</h4>
            <ul>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/affiliate/login">Affiliate</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.bookswagon.com/sitemap">Sitemap</a></li>
            </ul>
          </div>
        </div>



        {/* -------------------------- */}

        <div className='social-media'>
          <ul >
            <li class="list-item">
              <a href="https://www.facebook.com/bookswagoneducationalfacts/" target="_blank" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/facebook.png" alt="Facebook" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="https://twitter.com/bookswagon_in" target="_blank" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/twitter.png" alt="Twitter" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="https://www.linkedin.com/company/bookswagon/" target="_blank" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/linkedin.png" alt="Linkedin" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="https://www.pinterest.co.uk/bookswagon/" target="_blank" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/pinterest.png" alt="Pinterest" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCrJ4T5_wqMb_eZWtC-staVQ"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/youtube.png" alt="Youtube" width="32px" height="32px" /></a>
            </li>


            <li class="list-item">
              <a href="https://www.instagram.com/bookswagon_official/" target="_blank" rel="noreferrer"><img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/instagram.png" alt="Instagram" width="32px" height="32px" /></a>
            </li>

          </ul>

        </div>

        {/* ------------------------------- */}
        <div class="copyright">
          Copyright © 2023 . Bookswagon.com. <span class="allrightreserve">All Rights Reserved</span>
        </div>
      </div>
    </>

  )
}

export default Footer