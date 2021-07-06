"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
exports.mediaProperties = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.reduce.js");

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _videoBtn = _interopRequireDefault(require("./video-btn.svg"));

var _video = _interopRequireDefault(require("./video.mp4"));

var _poster = _interopRequireDefault(require("./poster.jpeg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const mediaProperties = ['error', 'src', // 'srcObject',
'currentSrc', 'crossOrigin', // 'networkState',
// 'preload',
// 'buffered',
'readyState', // 'seeking',
'currentTime', 'duration', 'paused', // 'defaultPlaybackRate',
// 'playbackRate',
'played', 'seekable', 'ended', 'autoplay', 'loop', // 'mediaGroup',
// 'controller',
'controls', 'volume', 'muted', // 'defaultMuted',
// 'audioTracks',
// 'videoTracks',
// 'textTracks',
'width', 'height', 'videoWidth', 'videoHeight', 'poster'];
exports.mediaProperties = mediaProperties;

function App(props) {
  const [playStatus, setPlayStatus] = (0, _react.useState)(false);
  const [videoDuration, setVideoDuration] = (0, _react.useState)('00:00'); // const defaultSrc = './video.mp4';
  // const defaultPoster = './poster.jpeg';

  const {
    className,
    src = _video.default,
    poster = _poster.default,
    loop = false,
    crossOrigin = "anonymous",
    videoId,
    muted = true,
    autoPlay = false,
    controls = true,
    startTime,
    duration,
    width = 640,
    height = 320,
    onPause,
    onCanPlay,
    onEnded,
    onPlay,
    onSeeked
  } = props;
  const videoRef = (0, _react.useRef)(null);
  const aspectRatio = width && height ? "".concat(width, ":").concat(height) : '16:9';
  const ratioParts = aspectRatio.split(':');
  const ratioMultiplier = ratioParts[1] / ratioParts[0]; // get all video properties

  const getProperties = () => {
    if (!videoRef.current) {
      return null;
    }

    return mediaProperties.reduce((properties, key) => {
      properties[key] = videoRef.current[key];
      return properties;
    }, {});
  }; // 视频时间处理，seconds => 'H:m:s' or 'm:s'


  const formateDuration = function formateDuration(duration) {
    let formateType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "m:s";

    if (formateType === 'm:s') {
      if (duration > 3600) return "59:59";
      var sec_num = parseInt(duration, 10); // don't forget the second param

      var hours = 0;
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return minutes + ':' + seconds;
    } else if (formateType === 'H:m:s') {
      var sec_num = parseInt(duration, 10); // don't forget the second param

      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return hours + ':' + minutes + ':' + seconds;
    }
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handlePause = () => {
    videoRef.current.pause();
    if (onPause) onPause(getProperties());
  };

  const handlePlay = event => {
    event.stopPropagation();
    setPlayStatus(true);
    videoRef.current.play();
    if (onPlay) onPlay(getProperties());
  };

  const handleSeeking = () => {};

  const handleSeeked = () => {
    if (onSeeked) onSeeked(getProperties());
  };

  const handleLoadedMetaData = e => {
    if (startTime && startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  };

  const handleCanPlay = () => {
    const formateTime = formateDuration(videoRef.current.duration);
    setVideoDuration(formateTime);
    if (onCanPlay) onCanPlay(getProperties());
  };

  const handleEnded = () => {
    if (onEnded) onEnded(getProperties());
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "video__viewer",
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "video__container".concat(width / height === 16 / 9 ? ' aspect-16-9' : width / height === 4 / 3 ? ' aspect-4-3' : ' fluid'),
    style: {
      paddingTop: "".concat(ratioMultiplier * 100, "%")
    }
  }, /*#__PURE__*/_react.default.createElement("video", {
    className: "video__source".concat(className ? " ".concat(className) : ''),
    id: videoId,
    crossOrigin: crossOrigin,
    ref: videoRef,
    muted: muted // preload={preload}
    ,
    loop: loop // playsInline={playsInline}
    ,
    autoPlay: autoPlay,
    poster: poster,
    src: src,
    controls: playStatus ? controls : false // onLoadStart={this.handleLoadStart}
    // onWaiting={this.handleWaiting}
    ,
    onCanPlay: handleCanPlay // onCanPlayThrough={this.handleCanPlayThrough}
    // onPlaying={this.handlePlaying}
    ,
    onEnded: handleEnded,
    onSeeking: handleSeeking,
    onSeeked: handleSeeked,
    onPlay: handlePlay,
    onPause: handlePause // onProgress={this.handleProgress}
    // onDurationChange={this.handleDurationChange}
    // onError={this.handleError}
    // onSuspend={this.handleSuspend}
    // onAbort={this.handleAbort}
    // onEmptied={this.handleEmptied}
    // onStalled={this.handleStalled}
    ,
    onLoadedMetadata: handleLoadedMetaData // onLoadedData={this.handleLoadedData}
    // onTimeUpdate={this.handleTimeUpdate}
    // onRateChange={this.handleRateChange}
    // onVolumeChange={this.handleVolumeChange}
    ,
    width: width // height={height}

  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "video__duration",
    style: {
      display: playStatus ? 'none' : 'block'
    }
  }, videoDuration), /*#__PURE__*/_react.default.createElement("span", {
    className: "video__playicon",
    onClick: handlePlay,
    style: {
      display: playStatus ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _videoBtn.default,
    alt: "playicon"
  }))));
}