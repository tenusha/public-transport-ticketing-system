import React, {Component} from 'react'

class Footer extends Component {

    render() {
        return (
            <div>
                <br/>
                <footer className="page-footer font-small" style={{
                    backgroundColor: '#4B4A4A',
                    color: 'rgba(255, 255, 255, 0.6)',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}>
                    <div className="footer-copyright text-center py-3">© 2019 Copyright
                        <p>Tenusha, Ranmal, Vimukthi, Aravinda</p>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer