import React from 'react'
import { GiGlobe } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { PiPhoneCall } from 'react-icons/pi'

export default function Footer() {
  return (
    <footer className='mx-5 md:container md:mx-auto'>
        <div>
            <div>
                <PiPhoneCall/>
                <div>
                    <p>Call Us</p>
                    <p>12345678</p>
                </div>
            </div>
            <div>
                <MdEmail/>
                <div>
                    <p>Need Support</p>
                    <p>support@example.com</p>
                </div>
            </div>
            <div>
                <GiGlobe/>
                <div>
                    <p>Office</p>
                    <p>2972 Westheimer Rd., Illinois 85486</p>
                </div>
            </div>
        </div>
    </footer>
  )
}
