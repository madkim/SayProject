import React, { ReactElement, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioFile: string;
  wavesurferContainer: string;
  setPlaying: (value: boolean) => void;
}

export default function Wavesurfer(props: Props): ReactElement {
  useEffect(() => {
    createWaveSurfer();
  }, [props.audioFile]);

  const createWaveSurfer = () => {
    const container = document.getElementById(props.wavesurferContainer);
    if (container) {
      const wavesurfer = WaveSurfer.create({
        container: props.wavesurferContainer,
      });

      wavesurfer.load(props.audioFile);

      wavesurfer.on("finish", function () {
        props.setPlaying(false);
      });
    }
  };

  return <div id={props.wavesurferContainer}></div>;
}
