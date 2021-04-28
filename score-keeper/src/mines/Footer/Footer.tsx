import React from 'react';
import './Footer.scss';
import './../Sweeper.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

interface State {

}

interface Props {

}

class Footer extends React.Component<Props, State> {

    render() {
        return (
            <footer className='above-all'>
                <h6>Created by Atul Anand 2021 <span className='email'>atulanand206@gmail.com</span></h6>
                <br className='footer-break' />
                <div className='icons'>
                    <div 
                        className='icon'
                        onClick={() => window.open('https://www.instagram.com/aliveanddoinggreat')}>
                        <FontAwesomeIcon icon={faInstagram} color={'white'} />
                        <p>Instagram</p>
                    </div>
                    <div 
                        className='icon'
                        onClick={() => window.open('https://twitter.com/atulanand206')}>
                        <FontAwesomeIcon icon={faTwitter} color={'white'} />
                        <p>Twitter</p>
                    </div>
                    <div 
                        className='icon'
                        onClick={() => window.open('https://github.com/atulanand206')}>
                        <FontAwesomeIcon icon={faGithub} color={'white'} />
                        <p>Github</p>
                    </div>
                    <div
                        className='icon'>
                        <FontAwesomeIcon icon={faCodeBranch} color={'white'} />
                        <p>v0.1.0</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;