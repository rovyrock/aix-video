import React, { useState, useRef } from 'react';
import "./App.css"
import PlayIcon from "./video-btn.svg";

export const mediaProperties = [
	'error',
	'src',
	// 'srcObject',
	'currentSrc',
	'crossOrigin',
	// 'networkState',
	// 'preload',
	// 'buffered',
	'readyState',
	// 'seeking',
	'currentTime',
	'duration',
	'paused',
	// 'defaultPlaybackRate',
	// 'playbackRate',
	'played',
	'seekable',
	'ended',
	'autoplay',
	'loop',
	// 'mediaGroup',
	// 'controller',
	'controls',
	'volume',
	'muted',
	// 'defaultMuted',
	// 'audioTracks',
	// 'videoTracks',
	// 'textTracks',
	'width',
	'height',
	'videoWidth',
	'videoHeight',
	'poster'
];

export default function App(props) {
	const [playStatus, setPlayStatus] = useState(false)
	const [videoDuration, setVideoDuration] = useState('00:00')
	const defaultSrc = 'video/video.mp4';
	const defaultPoster = 'video/poster.jpeg';

	const { className, src = defaultSrc, poster = defaultPoster, loop = false, crossOrigin = "anonymous", videoId, muted = true, autoPlay = false, controls = true, startTime, duration, width = 640, height = 320, onPause, onCanPlay, onEnded, onPlay, onSeeked } = props
	const videoRef = useRef(null)

	const aspectRatio = width && height ? `${width}:${height}` : '16:9';
	const ratioParts = aspectRatio.split(':');
	const ratioMultiplier = ratioParts[1] / ratioParts[0];

	// get all video properties
	const getProperties = () => {
		if (!videoRef.current) {
			return null;
		}
		return mediaProperties.reduce((properties, key) => {
			properties[key] = videoRef.current[key];
			return properties;
		}, {});
	}

	// 视频时间处理，seconds => 'H:m:s' or 'm:s'
	const formateDuration = (duration, formateType = "m:s") => {
		if (formateType === 'm:s') {
			if (duration > 3600) return "59:59"

			var sec_num = parseInt(duration, 10); // don't forget the second param
			var hours = 0;
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);

			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			return minutes + ':' + seconds;

		} else if (formateType === 'H:m:s') {
			var sec_num = parseInt(duration, 10); // don't forget the second param
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);

			if (hours < 10) { hours = "0" + hours; }
			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			return hours + ':' + minutes + ':' + seconds;
		}
	}



	const togglePlay = () => {

		if (videoRef.current.paused) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	}
	const handlePause = () => {
		videoRef.current.pause();
		if (onPause) onPause(getProperties())
	}
	const handlePlay = (event) => {
		event.stopPropagation();
		setPlayStatus(true)
		videoRef.current.play();
		if (onPlay) onPlay(getProperties())
	}
	const handleSeeking = () => {

	}
	const handleSeeked = () => {
		if (onSeeked) onSeeked(getProperties())
		
	}
	const handleLoadedMetaData = (e) => {
		if (startTime && startTime > 0) {
			videoRef.current.currentTime = startTime;
		}

	}
	const handleCanPlay = () => {
		const formateTime = formateDuration(videoRef.current.duration)

		setVideoDuration(formateTime);

		if (onCanPlay) onCanPlay(getProperties())
	}
	const handleEnded = () => {
		if (onEnded) onEnded(getProperties())
	}


	return (
		<div className="video__viewer" style={{ width: width, height: height }}>
			<div className={`video__container${width / height === 16 / 9 ? ' aspect-16-9' : width / height === 4 / 3 ? ' aspect-4-3' : ' fluid'}`} style={{ paddingTop: `${ratioMultiplier * 100}%` }}>
				<video
					className={`video__source${className ? ` ${className}` : ''}`}
					id={videoId}
					crossOrigin={crossOrigin}
					ref={videoRef}
					muted={muted}
					// preload={preload}
					loop={loop}
					// playsInline={playsInline}
					autoPlay={autoPlay}
					poster={poster}
					src={src}
					controls={playStatus ? controls : false}
					// onLoadStart={this.handleLoadStart}
					// onWaiting={this.handleWaiting}
					onCanPlay={handleCanPlay}
					// onCanPlayThrough={this.handleCanPlayThrough}
					// onPlaying={this.handlePlaying}
					onEnded={handleEnded}
					onSeeking={handleSeeking}
					onSeeked={handleSeeked}
					onPlay={handlePlay}
					onPause={handlePause}
					// onProgress={this.handleProgress}
					// onDurationChange={this.handleDurationChange}
					// onError={this.handleError}
					// onSuspend={this.handleSuspend}
					// onAbort={this.handleAbort}
					// onEmptied={this.handleEmptied}
					// onStalled={this.handleStalled}
					onLoadedMetadata={handleLoadedMetaData}
					// onLoadedData={this.handleLoadedData}
					// onTimeUpdate={this.handleTimeUpdate}
					// onRateChange={this.handleRateChange}
					// onVolumeChange={this.handleVolumeChange}
					width={width}
				// height={height}
				>
				</video>
				<span className="video__duration" style={{ display: playStatus ? 'none' : 'block' }}>{videoDuration}</span>
				<span className="video__playicon" onClick={handlePlay} style={{ display: playStatus ? 'none' : 'block' }}>
					<img src={PlayIcon} alt="playicon" />
				</span>
			</div>
		</div>
	);
}