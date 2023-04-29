import { useState, useRef } from "react";
import { toggle } from '../../store/slices/AddAudioModalSlice';
import {useDispatch} from 'react-redux';
const mimeType = "audio/webm";

type RecordingStatus = "inactive" | "recording" | "paused";

//TODO style
const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>("inactive");
    const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
    const [audio, setAudio] = useState<string | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const dispatch = useDispatch()
    const discard = () => {
        setAudio(null)
        setAudioChunks([])
        setRecordingStatus("inactive")
        setStream(null)
        dispatch(toggle())
    }
    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    alert(err.message);
                } else {
                    alert("The MediaRecorder API is not supported in your browser.");
                }
            }
        }
    }

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream!, { mimeType: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        const localAudioChunks: BlobPart[] = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined" || event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        if(mediaRecorder.current) {
            setRecordingStatus("inactive");
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioChunks([]);
            };
        } else {
            alert("No MediaRecorder instance found")
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-80 h-52 rounded-lg border-2 border-slate-600'>

     <div>
                <div className="audio-controls">

                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button> ) : null}

                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                           Start Recording
                        </button>) : null}

                    {recordingStatus === "recording" ? (
                         <button onClick={stopRecording} type="button">
                             Stop Recording
                         </button>) : null}

                </div>
            </div>
         { audio ? <>
            <div className="audio-container">
                <audio src={audio} controls></audio>
                <a className='flex text-center justify-center' download href={audio}>
                    Download Recording
                </a>
            </div>
             <div className='flex justify-center mt-3'>

             <button className='flex justify-center w-16 mr-2 bg-blue-500 hover:bg-green-600 font-semibold text-white py-2 px-4 border border-blue-500 rounded'>Save</button>

             <button onClick={discard} className='flex justify-center w-16 ml-2 bg-red-500  font-semibold text-white py-2 px-4 border border-blue-500  rounded'>Discard</button>
             </div>
         </>
             : null}

        </div>
    );
}



export default AudioRecorder;