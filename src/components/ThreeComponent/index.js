import React from 'react';
import styles from './styles.module.css'
import ThreeCanvas from '../../webgl/ThreeCanvas';

class ThreeComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            initialized: false,
        };
    
        this.threeCanvasRef = React.createRef();
        this.threeCanvas = undefined;
    }
  
    componentDidMount() {
        if (!this.state.initialized) {
            this.init();
        }

        window.addEventListener("resize", this.handleWindowResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        this.threeCanvasRef.removeChild(this.threeCanvasRef.lastChild);
    }

    init = () => {  
        this.threeCanvas = new ThreeCanvas({
            mountPoint: this.threeCanvasRef.current,
            width: this.threeCanvasRef.current.clientWidth,
            height: this.threeCanvasRef.current.clientHeight,
        });
    
        this.startDrawing(this.threeCanvas);
        this.setState({initialized: true});
    }
  
    startDrawing = (threeCanvas) => {
      const renderLoop = () => {
        threeCanvas.render();
      };
  
      threeCanvas.setAnimationLoop(renderLoop);
    }

    handleWindowResize = () => {
        const { width, height } = this.threeCanvasRef.current.getBoundingClientRect();
        this.threeCanvas.resizeRendererToDisplaySize(Math.round(width), Math.round(height));
    }

    render() {
      return (
        <div className={styles.webgl} ref={this.threeCanvasRef}></div>
      );
    }
  }

export default ThreeComponent;