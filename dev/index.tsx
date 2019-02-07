import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactPanZoom from "../src/react-pan-zoom";
import styled, { injectGlobal, css } from "styled-components";
import IconSVG from "./components/IconSVG";
import GlobalStyles from "./global-styles";

/* tslint:disable:no-unused-expression */
injectGlobal`${GlobalStyles}`;
/* tslint:enable:no-unused-expression */

const HEADER_HEIGHT = 50;
const Container = css`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
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
  private onReset = (dx, dy, zoom) => {
    this.setState({dx, dy, zoom});
  }
  private reset = () => {
    this.panContainer.reset();
  };
  public createComponent = () => {
    return (
      <ReactPanZoom
        className="mycl"
        ref={ref => this.panContainer = ref}
        enablePan={this.state.enablePan}
        zoom={this.state.zoom}
        pandx={this.state.dx}
        pandy={this.state.dy}
        onPan={this.onPan}
        onReset={this.onReset}
      >
        <img src="https://i.imgur.com/WJ17gs5.jpg" />
      </ReactPanZoom>
    );
  };
  public styledComponent = () => {
    const StyledReactPanZoom = styled(ReactPanZoom)`${Container}`;
    return (
      <StyledReactPanZoom
        enablePan={this.state.enablePan}
        zoom={this.state.zoom}
        pandx={this.state.dx}
        pandy={this.state.dy}
        onPan={this.onPan}
      >
        <img src="https://i.imgur.com/WJ17gs5.jpg" />
      </StyledReactPanZoom>
    );
  };

  public renderPanZoomControls = () => {
    return (
      <ControlsContainer>
        <div data-cypress-id="zoom-in-btn" onClick={this.zoomIn}>
          <IconSVG name="icon-zoom-in" />
        </div>
        <div data-cypress-id="zoom-out-btn" onClick={this.zoomOut}>
          <IconSVG name="icon-zoom-out" />
        </div>
        <div data-cypress-id="zoom-out-btn" onClick={this.reset}>
          <IconSVG name="icon-zoom-out" />
        </div>
      </ControlsContainer>
    );
  };

  public render() {
    return [
      <Heading key="heading"> React Pan and Zoom </Heading>,
      this.renderPanZoomControls(),
      this.createComponent(),
      // this.styledComponent(),
    ];
  }
}

ReactDOM.render(
  <ReactPanZoomDemo />,
  document.getElementById("app-pan-and-zoom")
);
