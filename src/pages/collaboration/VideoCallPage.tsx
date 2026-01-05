import React, { useEffect, useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  MessageSquare,
  Users,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const VideoCallPage: React.FC = () => {
  const { user } = useAuth();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      toast.success(prev ? 'Microphone On' : 'Microphone Muted');
      return !prev;
    });
  };

  const toggleVideo = () => {
    setIsVideoOff(prev => {
      toast.success(prev ? 'Video Enabled' : 'Video Disabled');
      return !prev;
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(prev => {
      toast.success(prev ? 'Screen Sharing Stopped' : 'Screen Sharing Started');
      return !prev;
    });
  };

  const endCall = () => {
    toast.error('Call Ended');
    setCallDuration(0);
  };

  return (
    <div className="flex h-full flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-700 p-4">
        <h2 className="text-xl font-semibold">Video Call</h2>
        <span className="text-sm text-gray-300">
          Duration: {formatDuration(callDuration)}
        </span>
      </header>

      {/* Video Area */}
      <main className="flex flex-1 items-center justify-center">
        <div className="h-3/4 w-3/4 rounded-lg bg-black flex items-center justify-center">
          {isVideoOff ? (
            <span className="text-gray-500">Camera is turned off</span>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <span className="text-gray-300">User Video Stream</span>
            </div>
          )}
        </div>
      </main>

      {/* Controls */}
      <footer className="flex justify-center gap-6 border-t border-gray-700 p-4">
        <ControlButton onClick={toggleMute} active={isMuted} activeColor="red">
          {isMuted ? <MicOff /> : <Mic />}
        </ControlButton>

        <ControlButton onClick={toggleVideo} active={isVideoOff} activeColor="red">
          {isVideoOff ? <VideoOff /> : <Video />}
        </ControlButton>

        <ControlButton onClick={endCall} activeColor="red">
          <PhoneOff />
        </ControlButton>

        <ControlButton
          onClick={toggleScreenShare}
          active={isScreenSharing}
          activeColor="green"
        >
          <ScreenShare />
        </ControlButton>

        <ControlButton>
          <MessageSquare />
        </ControlButton>

        <ControlButton>
          <Users />
        </ControlButton>

        <ControlButton>
          <Settings />
        </ControlButton>
      </footer>
    </div>
  );
};

const ControlButton = ({
  children,
  onClick,
  active,
  activeColor = 'gray'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  activeColor?: 'red' | 'green' | 'gray';
}) => {
  const colors = {
    red: 'bg-red-600 hover:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700',
    gray: 'bg-gray-800 hover:bg-gray-700'
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-full p-3 transition ${
        active ? colors[activeColor] : colors.gray
      }`}
    >
      {children}
    </button>
  );
};

export default VideoCallPage;
