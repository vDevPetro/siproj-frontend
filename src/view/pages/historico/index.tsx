import styled from 'styled-components';

const Container = styled.div`
    .timeline {
        position: relative;
        max-width: 1200px;
        margin: 100px auto;
    }

    .timeline-container{
        padding: 0.75rem 3rem;
        position: relative;
        width: 50%;
        animation: movedown 1s linear forwards;
        opacity: 0;
        z-index: 1;
    }
    @keyframes movedown {
        0% {
            opacity: 1;
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .timeline-container:nth-child(1) {
        animation-delay: 0s;
    }

    .timeline-container:nth-child(2) {
        animation-delay: 1s;
    }

    .timeline-container:nth-child(3) {
        animation-delay: 2s;
    }

    .timeline-container:nth-child(4) {
        animation-delay: 3s;
    }

    .timeline-container:nth-child(5) {
        animation-delay: 4s;
    }

    .timeline-container:nth-child(6) {
        animation-delay: 5s;
    }

    .timeline-container:nth-child(7) {
        animation-delay: 6s;
    }

    .timeline-container:nth-child(8) {
        animation-delay: 7s;
    }

    .timeline-container:nth-child(9) {
        animation-delay: 8s;
    }

    .timeline-container:nth-child(10) {
        animation-delay: 9s;
    }

    .timeline-text-box {
        padding: 1.25rem 3.125rem;
        text-align: justify;
        position: relative;
        background: #ffffff;
        border-radius: 2rem;
    }

    .tl-left-container {
        left: 0;
        .timeline-text-box {
            box-shadow:  -8px 8px 24px #d4d4d4,
             8px -8px 24px #ffffff;
        }

    }

    .tl-right-container {
        left: 50%;
        .timeline-text-box {
            box-shadow:  8px 8px 24px #d4d4d4,
             -8px -8px 24px #ffffff;
        }

        img {
            left: -1.25rem;   
        }
    }

    small {
        color: #c7c7c7;
        margin-bottom: 15px;
        display: inline-block;
    }

    .timeline-container img {
        position: absolute;
        width: 2.5rem;
        border-radius: 50%;
        right: -1.25rem;
        top: 2rem;
        z-index: 10;
        background: linear-gradient(145deg, #ffffff, #e6e6e6);
        box-shadow:  8px 8px 24px #d4d4d4,
                    -8px -8px 24px #ffffff;
    }

    .timeline::after {
        content: ' ';
        position: absolute;
        width: 0.375rem;
        height: 100%;
        background: #fff;
        top: 0;
        left: 50%;
        margin-left: -3px;
        z-index: 0;
        box-shadow: inset 1px 1px 3px #d4d4d4,
                    inset -1px -1px 3px #ffffff;
        border-radius: 50px;
        animation: moveline 6s linear forwards;
    }
    @keyframes moveline {
        0% {
            height: 0;
        }

        100% {
            height: 100%;
        }
    }

    .left-container-arrow {
        height: 0;
        width: 0;
        position: absolute;
        box-sizing: border-box;
        top: 2.25rem;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid transparent;
        border-left: 1rem solid #e7e7e7;
        right: 2rem;
    }

    .right-container-arrow {
        height: 0;
        width: 0;
        position: absolute;
        box-sizing: border-box;
        top: 2.25rem;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid transparent;
        border-right: 1rem solid #e7e7e7;
        left: 2rem;
    }

    @media (max-width: 767.98px) {
        .timeline {
            margin: 3.125rem auto;
        }

        .timeline::after {
            left: 2rem;
        }

        .timeline-container {
            width: 100%;
            padding-left: 5rem;
            padding-right: 1.5rem;
        }

        .timeline-text-box small {
            margin-bottom: 0.625rem;
        }

        .tl-right-container {
            left: 0;
        }

        .tl-right-container img, .tl-left-container img {
            left: 0.625rem;
        }

        .left-container-arrow, .right-container-arrow {
            border-right: 15px solid #e7e7e7;
            border-left: 0;
            left: 4.05rem;
        }
    }

`;

const Historico = () => {
    return (
        <Container>
            <div className='timeline'>
                <div className='timeline-container tl-left-container'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Frina_logo.png?alt=media&token=deb6343d-374a-4f97-8194-9c9dd4788121"/>
                    <div className='timeline-text-box'>
                        <h4>Aplhabet Inc.</h4>
                        <small>2018 - 2019</small>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ab. Porro suscipit ut quasi dolorum. Nam, laudantium. Enim, velit,
                        </p>
                    </div>
                    <span className='left-container-arrow'></span>
                </div>

                <div className='timeline-container tl-right-container'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Fpetro_logo.png?alt=media&token=030edc6e-8a2a-491c-9a38-f8949b39dfc4"/>
                    <div className='timeline-text-box'>
                        <h4>Aplhabet Inc.</h4>
                        <small>2018 - 2019</small>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ab. Porro suscipit ut quasi dolorum. Nam, laudantium. Enim, velit,
                        </p>
                    </div>
                    <span className='right-container-arrow'></span>
                </div>

                <div className='timeline-container tl-left-container'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Frina_logo.png?alt=media&token=deb6343d-374a-4f97-8194-9c9dd4788121"/>
                    <div className='timeline-text-box'>
                        <h4>Aplhabet Inc.</h4>
                        <small>2018 - 2019</small>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ab. Porro suscipit ut quasi dolorum. Nam, laudantium. Enim, velit,
                        </p>
                    </div>
                    <span className='left-container-arrow'></span>
                </div>

                <div className='timeline-container tl-right-container'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Fpetro_logo.png?alt=media&token=030edc6e-8a2a-491c-9a38-f8949b39dfc4"/>
                    <div className='timeline-text-box'>
                        <h4>Aplhabet Inc.</h4>
                        <small>2018 - 2019</small>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ab. Porro suscipit ut quasi dolorum. Nam, laudantium. Enim, velit,
                        </p>
                    </div>
                    <span className='right-container-arrow'></span>
                </div>

                <div className='timeline-container tl-right-container'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Fpetro_logo.png?alt=media&token=030edc6e-8a2a-491c-9a38-f8949b39dfc4"/>
                    <div className='timeline-text-box'>
                        <h4>Aplhabet Inc.</h4>
                        <small>2018 - 2019</small>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ab. Porro suscipit ut quasi dolorum. Nam, laudantium. Enim, velit,
                        </p>
                    </div>
                    <span className='right-container-arrow'></span>
                </div>
            </div>
        </Container>
    )
}

export default Historico;