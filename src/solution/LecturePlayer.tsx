import { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Flex,
  VStack,
  HStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Divider,
  useToast,
  Badge,
  Collapse,
} from "@chakra-ui/react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaBookmark,
  FaRegBookmark,
  FaClock,
  FaExpand,
} from "react-icons/fa";
// import { formatTime } from '../utils/time-utils';

interface VideoNote {
  id: string;
  timestamp: number;
  content: string;
  isBookmarked: boolean;
}

interface VideoLecture {
  id: string;
  title: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
}

interface VideoPlayerProps {
  lecture: VideoLecture;
  initialNotes?: VideoNote[];
}

export const LecturePlayer = ({
  lecture,
  initialNotes = [],
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(lecture.duration);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [notes, setNotes] = useState<VideoNote[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(true);
  const toast = useToast();

  // Format time display (MM:SS)
  const formatTimestamp = (seconds: number) => {
    return formatTime(seconds);
  };

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seeking
  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle playback rate change
  const handleSpeedChange = (speed: string) => {
    const rate = parseFloat(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // Add a new note at current timestamp
  const addNote = () => {
    if (!newNote.trim() || !videoRef.current) return;

    const newNoteObj: VideoNote = {
      id: Date.now().toString(),
      timestamp: videoRef.current.currentTime,
      content: newNote,
      isBookmarked: false,
    };

    setNotes([...notes, newNoteObj]);
    setNewNote("");
    toast({
      title: "Note added",
      description: `Note saved at ${formatTimestamp(
        videoRef.current.currentTime
      )}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Toggle bookmark for a note
  const toggleBookmark = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isBookmarked: !note.isBookmarked } : note
      )
    );
  };

  // Jump to note's timestamp
  const jumpToTimestamp = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle video ended
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Initialize video duration
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current?.duration || lecture.duration);
      });
    }
  }, [lecture.duration]);

  // Sort notes by timestamp
  const sortedNotes = [...notes].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={6}>
      {/* Video Player Section */}
      <Box flex={1}>
        {/* Video Container */}
        <Box
          position="relative"
          bg="black"
          borderRadius="lg"
          overflow="hidden"
          mb={4}
        >
          <video
            ref={videoRef}
            src={lecture.videoUrl}
            poster={lecture.thumbnailUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onClick={togglePlay}
            style={{ width: "100%", display: "block" }}
          />

          {/* Custom Controls */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="linear-gradient(transparent, rgba(0,0,0,0.7))"
            p={4}
            color="white"
          >
            {/* Progress Bar */}
            <Slider
              aria-label="video progress"
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeek}
              focusThumbOnChange={false}
              mb={3}
            >
              <SliderTrack bg="gray.700">
                <SliderFilledTrack bg="blue.400" />
              </SliderTrack>
              <SliderThumb boxSize={4} />
            </Slider>

            {/* Control Buttons */}
            <Flex justify="space-between" align="center">
              <HStack spacing={4}>
                <IconButton
                  aria-label={isPlaying ? "Pause" : "Play"}
                  icon={isPlaying ? <FaPause /> : <FaPlay />}
                  onClick={togglePlay}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "rgba(255,255,255,0.1)" }}
                />

                <HStack spacing={2}>
                  <IconButton
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    onClick={toggleMute}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "rgba(255,255,255,0.1)" }}
                  />
                  <Slider
                    aria-label="volume"
                    value={isMuted ? 0 : volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={handleVolumeChange}
                    width="80px"
                  >
                    <SliderTrack bg="gray.600">
                      <SliderFilledTrack bg="white" />
                    </SliderTrack>
                    <SliderThumb boxSize={3} />
                  </Slider>
                </HStack>

                <Text fontSize="sm">
                  {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
                </Text>
              </HStack>

              <HStack>
                <Select
                  value={playbackRate.toString()}
                  onChange={(e) => handleSpeedChange(e.target.value)}
                  size="sm"
                  width="100px"
                  bg="blackAlpha.600"
                  color="white"
                  borderColor="gray.600"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </Select>

                <IconButton
                  aria-label="Fullscreen"
                  icon={<FaExpand />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "rgba(255,255,255,0.1)" }}
                />
              </HStack>
            </Flex>
          </Box>
        </Box>

        {/* Video Title */}
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {lecture.title}
        </Text>
      </Box>

      {/* Notes Panel */}
      <Box width={{ base: "100%", lg: "350px" }}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Lecture Notes
          </Text>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowNotes(!showNotes)}
          >
            {showNotes ? "Hide" : "Show"}
          </Button>
        </Flex>

        <Collapse in={showNotes}>
          <VStack align="stretch" spacing={4}>
            {/* Add Note Form */}
            <Box
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg="white"
              boxShadow="sm"
            >
              <Textarea
                placeholder={`Add note at ${formatTimestamp(currentTime)}...`}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                mb={3}
                minH="100px"
              />
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.500">
                  {formatTimestamp(currentTime)}
                </Text>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={addNote}
                  isDisabled={!newNote.trim()}
                >
                  Add Note
                </Button>
              </Flex>
            </Box>

            {/* Notes List */}
            <VStack
              align="stretch"
              spacing={3}
              maxH="500px"
              overflowY="auto"
              pr={2}
            >
              {sortedNotes.length === 0 ? (
                <Text textAlign="center" color="gray.500" py={4}>
                  No notes yet. Add your first note!
                </Text>
              ) : (
                sortedNotes.map((note) => (
                  <Box
                    key={note.id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    bg={activeNoteId === note.id ? "blue.50" : "white"}
                    boxShadow="sm"
                    position="relative"
                  >
                    <Flex justify="space-between" mb={2}>
                      <HStack>
                        <FaClock color="gray" size={12} />
                        <Text fontSize="sm" fontWeight="medium">
                          {formatTimestamp(note.timestamp)}
                        </Text>
                        <Badge
                          colorScheme="blue"
                          variant="subtle"
                          cursor="pointer"
                          onClick={() => jumpToTimestamp(note.timestamp)}
                        >
                          Jump to
                        </Badge>
                      </HStack>
                      <IconButton
                        aria-label={
                          note.isBookmarked ? "Remove bookmark" : "Add bookmark"
                        }
                        icon={
                          note.isBookmarked ? <FaBookmark /> : <FaRegBookmark />
                        }
                        onClick={() => toggleBookmark(note.id)}
                        size="xs"
                        variant="ghost"
                        color={note.isBookmarked ? "yellow.500" : "gray.500"}
                      />
                    </Flex>
                    <Text>{note.content}</Text>
                  </Box>
                ))
              )}
            </VStack>
          </VStack>
        </Collapse>
      </Box>
    </Flex>
  );
};

// Helper function in time-utils.ts
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
