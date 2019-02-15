import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactPanZoom from "../src/react-pan-zoom";
import styled, { injectGlobal, css } from "styled-components";
import GlobalStyles from "./global-styles";

/* tslint:disable:no-unused-expression */
injectGlobal`${GlobalStyles}`;
/* tslint:enable:no-unused-expression */

const HEADER_HEIGHT = 50;
const ControlsContainer = styled.div`
  position: fixed;
  background: lightgray;
  height: 100%;
  right: 0;
  z-index: 2;
  cursor: pointer;
  user-select: none;

  > div {
    padding: 15px;
    &:hover {
      background: darkgray;
    }
    &:active {
      box-shadow: 1px 1px 1px inset;
    }
  }
`;

const Heading = styled.div`
  background: dimgrey;
  color: white;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export default class ReactPanZoomDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.which === 16) {
        // disable pan with shift
        this.setState({ ...this.state, enablePan: false });
      }
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.which === 16) {
        // disable pan with shift
        this.setState({ ...this.state, enablePan: true });
      }
    });
  }

  public state = {
    dx: 0,
    dy: 0,
    zoom: 1,
    enablePan: true
  };

  public panContainer: any;

  private zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.2
    });
  };

  private zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.2
    });
  };

  private onPan = (dx, dy) => {
    this.setState({
      dx,
      dy
    });
  };
  private reset = () => {
    if (this.panContainer) {
      this.panContainer.reset();
    }
  };

  public renderPanZoomControls = () => {
    return (
      <ControlsContainer>
        <div title="zoom in" data-cypress-id="zoom-in-btn" onClick={this.zoomIn}>
          ➕
        </div>
        <div title="zoom out" data-cypress-id="zoom-out-btn" onClick={this.zoomOut}>
          ➖
        </div>
        <div title="Reset" onClick={this.reset}>🔄</div>
      </ControlsContainer>
    );
  };

  public render() {
    return (
      <>
        <Heading key="heading"> React Pan and Zoom </Heading>
        {this.renderPanZoomControls()}
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ReactPanZoom
            ref={ref => (this.panContainer = ref)}
            enablePan={this.state.enablePan}
            zoom={this.state.zoom}
            pandx={this.state.dx}
            pandy={this.state.dy}
            onPan={this.onPan}
          >
            <img
            draggable={false}
            src="https://images.pexels.com/photos/1851471/pexels-photo-1851471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150" />
          </ReactPanZoom>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <ReactPanZoomDemo />,
  document.getElementById("app-pan-and-zoom")
);
