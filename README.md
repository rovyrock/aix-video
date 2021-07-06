# Useage

## install

```bash
npm i aix-video
or
yarn add aix-video
```

## example

```js
import React, { useState, useEffect, useRef } from "react";
import Video from "aix-video";

export default function App(props) {
  const handlePause = (e) => {
    console.log("component handlePause", e);
  };
  const handleCanPlay = (e) => {
    console.log("component handleCanPlay", e);
  };
  const handleOnEnded = (e) => {
    console.log("component handleOnEnded", e);
  };
  const handleOnPlay = (e) => {
    console.log("component handleOnPlay", e);
  };
  const handleOnSeeked = (e) => {
    console.log("component handleOnSeeked", e);
  };

  return (
    <>
      <div className="" style={{ padding: 20 }}>
        <h2>Default</h2>
        <Video />
      </div>
      <div className="" style={{ padding: 20 }}>
        <h2>Setting Width / Height, Default 16:9</h2>
        <Video width={800} height={450} />
      </div>
      <div className="" style={{ padding: 20 }}>
        <h2>Fluid</h2>
        <Video width={620} height={310} />
      </div>

      <div className="" style={{ padding: 20 }}>
        <h2>onPlay / onPause / onEnded / onCanPlay / onSeeked / startTime</h2>
        <Video
          width={480}
          height={270}
          onPlay={handleOnPlay}
          onPause={handlePause}
          //   onSeeked={handleOnSeeked}
          //   onCanPlay={handleCanPlay}
          startTime={500}
          onEnded={handleOnEnded}
        />
      </div>
    </>
  );
}
```
