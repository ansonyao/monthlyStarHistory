import React, { Component } from 'react';

import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    RedditShareButton,
  } from 'react-share';
  
  import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    RedditShareCount,
  } from 'react-share';


  import {
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    RedditIcon,
  } from 'react-share';

  export default class ShareView extends Component {
      render() {
        const shareUrl = "http://popularframeworks.net"
        const title = "Non-opinionated Frameworks Comparison Based on Data"
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 300, ...this.props.style}}>
                <FacebookShareButton url={shareUrl} style={{width: 50, height: 60, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <FacebookIcon size={44} title="" round={true}/>
                    {/* <FacebookShareCount url={shareUrl}></FacebookShareCount> */}
                </FacebookShareButton>

                <GooglePlusShareButton url={shareUrl} style={{width: 50, height: 60, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <GooglePlusIcon size={44} title="" round={true}/>
                    {/* <GooglePlusShareCount url={shareUrl}></GooglePlusShareCount> */}
                </GooglePlusShareButton>

                <LinkedinShareButton url={shareUrl} style={{width: 50, height: 60, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <LinkedinIcon size={44} title="" round={true}/>
                    {/* <LinkedinShareCount url={shareUrl}></LinkedinShareCount> */}
                </LinkedinShareButton>

                <TwitterShareButton url={shareUrl} style={{width: 50, height: 60, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <TwitterIcon size={44} title="" round={true}/>
                </TwitterShareButton>

                <RedditShareButton url={shareUrl} style={{width: 50, height: 60, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <RedditIcon size={44} title="" round={true}/>
                    {/* <RedditShareCount url={shareUrl}></RedditShareCount> */}
                </RedditShareButton>
            </div>
        )
      }
  }