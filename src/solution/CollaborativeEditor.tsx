import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Textarea,
  Button,
  Avatar,
  AvatarGroup,
  VStack,
  HStack,
  Divider,
  Select,
  Input,
  useToast,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiSend,
  FiCode,
  FiUsers,
  FiMessageSquare,
  FiPlay,
  FiShare2,
  FiSave,
} from "react-icons/fi";
import { Highlight, themes } from "prism-react-renderer";
import { FaRegCircle } from "react-icons/fa";

interface Collaborator {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
  position?: { line: number; column: number };
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface CodeEditorProps {
  initialCode: string;
  language?: "javascript" | "python" | "java" | "html";
  collaborators?: Collaborator[];
  onCodeChange?: (newCode: string) => void;
  onChatSend?: (message: string) => void;
}

export const CollaborativeEditor = ({
  initialCode,
  language = "javascript",
  collaborators = [],
  onCodeChange,
  onChatSend,
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activePanel, setActivePanel] = useState<"collaborators" | "chat">(
    "collaborators"
  );
  const [showGutter, setShowGutter] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  // Handle sending chat messages
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "You", // In real app, use actual user name
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    onChatSend?.(newMessage);
    setNewMessage("");
  };

  // Calculate line height for cursor positioning
  const lineHeight = 20; // px
  const characterWidth = 8; // px

  // Run code (simulated)
  const handleRunCode = () => {
    toast({
      title: "Code executed",
      description: "Running code in secure sandbox...",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Share project
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Project link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Save code
  const handleSave = () => {
    toast({
      title: "Code saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Format code
  const handleFormat = () => {
    toast({
      title: "Code formatted",
      description: "Using Prettier standards",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" height="100vh" bg="gray.900" color="gray.100">
      {/* Top Bar */}
      <Flex
        p={3}
        bg="gray.800"
        justify="space-between"
        align="center"
        borderBottomWidth="1px"
        borderColor="gray.700"
      >
        <HStack spacing={4}>
          <Select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value as any)}
            width="150px"
            size="sm"
            bg="gray.700"
            borderColor="gray.600"
            color="white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
          </Select>

          <Badge colorScheme="blue" px={2}>
            {collaborators.length} collaborators
          </Badge>
        </HStack>

        <HStack spacing={2}>
          <Tooltip label="Format code">
            <IconButton
              aria-label="Format code"
              icon={<FiCode />}
              onClick={handleFormat}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Run code">
            <IconButton
              aria-label="Run code"
              icon={<FiPlay />}
              onClick={handleRunCode}
              variant="ghost"
              size="sm"
              colorScheme="green"
            />
          </Tooltip>
          <Tooltip label="Share project">
            <IconButton
              aria-label="Share project"
              icon={<FiShare2 />}
              onClick={handleShare}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Save code">
            <IconButton
              aria-label="Save code"
              icon={<FiSave />}
              onClick={handleSave}
              variant="ghost"
              size="sm"
              colorScheme="blue"
            />
          </Tooltip>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex flex={1} overflow="hidden">
        {/* Code Editor */}
        <Box flex={1} overflow="auto" position="relative" ref={editorRef} p={4}>
          <Box
            as="pre"
            fontFamily="monospace"
            fontSize="sm"
            lineHeight={`${lineHeight}px`}
            position="relative"
          >
            <Highlight
              theme={themes.vsDark}
              code={code}
              language={currentLanguage}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Box as="code" className={className} style={style}>
                  {tokens.map((line, i) => (
                    <Box
                      key={i}
                      {...getLineProps({ line })}
                      position="relative"
                      pl={showGutter ? "40px" : 0}
                    >
                      {showGutter && (
                        <Box
                          position="absolute"
                          left={0}
                          width="40px"
                          textAlign="right"
                          pr={2}
                          color="gray.500"
                          userSelect="none"
                        >
                          {i + 1}
                        </Box>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}

                      {/* Render collaborator cursors */}
                      {collaborators.map((user) => {
                        if (user.position?.line === i + 1) {
                          return (
                            <Box
                              key={user.id}
                              position="absolute"
                              left={`${
                                40 +
                                (user.position?.column || 0) * characterWidth
                              }px`}
                              top="0"
                              height={`${lineHeight}px`}
                              width="2px"
                              bg={user.color}
                            >
                              <Tooltip label={`${user.name} (line ${i + 1})`}>
                                <Box
                                  position="absolute"
                                  top="-16px"
                                  left="-8px"
                                  color={user.color}
                                >
                                  <FaRegCircle size={12} />
                                </Box>
                              </Tooltip>
                            </Box>
                          );
                        }
                        return null;
                      })}
                    </Box>
                  ))}
                </Box>
              )}
            </Highlight>
          </Box>

          {/* Editable textarea overlay */}
          <Textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            position="absolute"
            top={4}
            left={4}
            width={`calc(100% - ${showGutter ? "72px" : "32px"})`}
            height="100%"
            fontFamily="monospace"
            fontSize="sm"
            lineHeight={`${lineHeight}px`}
            color="transparent"
            bg="transparent"
            caretColor="white"
            p={0}
            border="none"
            resize="none"
            _focus={{ outline: "none" }}
            spellCheck="false"
            overflow="hidden"
            whiteSpace="pre"
            style={{ tabSize: 2 }}
          />
        </Box>

        {/* Right Sidebar */}
        <Box
          width="300px"
          borderLeftWidth="1px"
          borderColor="gray.700"
          bg="gray.800"
          display="flex"
          flexDirection="column"
        >
          {/* Sidebar Tabs */}
          <Flex borderBottomWidth="1px" borderColor="gray.700">
            <Button
              flex={1}
              variant="ghost"
              leftIcon={<FiUsers />}
              borderRadius="0"
              bg={activePanel === "collaborators" ? "gray.700" : "transparent"}
              onClick={() => setActivePanel("collaborators")}
              size="sm"
            >
              Collaborators
            </Button>
            <Button
              flex={1}
              variant="ghost"
              leftIcon={<FiMessageSquare />}
              borderRadius="0"
              bg={activePanel === "chat" ? "gray.700" : "transparent"}
              onClick={() => setActivePanel("chat")}
              size="sm"
            >
              Chat
            </Button>
          </Flex>

          {/* Collaborators Panel */}
          <Collapse in={activePanel === "collaborators"} animateOpacity>
            <VStack spacing={4} p={4} align="stretch" overflowY="auto" flex={1}>
              {collaborators.map((user) => (
                <Flex key={user.id} align="center">
                  <Avatar
                    name={user.name}
                    src={user.avatarUrl}
                    size="sm"
                    mr={3}
                    border={`2px solid ${user.color}`}
                  />
                  <Box flex={1}>
                    <Text fontWeight="medium">{user.name}</Text>
                    <Text fontSize="sm" color="gray.400">
                      {user.position
                        ? `Line ${user.position.line}, Col ${user.position.column}`
                        : "Not editing"}
                    </Text>
                  </Box>
                  <Box
                    width="10px"
                    height="10px"
                    borderRadius="full"
                    bg="green.500"
                  />
                </Flex>
              ))}
            </VStack>
          </Collapse>

          {/* Chat Panel */}
          <Collapse in={activePanel === "chat"} animateOpacity>
            <VStack spacing={4} p={4} align="stretch" overflowY="auto" flex={1}>
              {messages.length === 0 ? (
                <Text textAlign="center" color="gray.500" py={10}>
                  No messages yet
                </Text>
              ) : (
                messages.map((message) => (
                  <Box
                    key={message.id}
                    alignSelf={
                      message.sender === "You" ? "flex-end" : "flex-start"
                    }
                    maxWidth="80%"
                  >
                    <Text
                      fontSize="xs"
                      color="gray.400"
                      textAlign={message.sender === "You" ? "right" : "left"}
                    >
                      {message.sender === "You" ? "You" : message.sender}
                    </Text>
                    <Box
                      bg={message.sender === "You" ? "blue.600" : "gray.700"}
                      p={3}
                      borderRadius="md"
                    >
                      <Text>{message.content}</Text>
                    </Box>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      textAlign={message.sender === "You" ? "right" : "left"}
                    >
                      {formatTime(message.timestamp)}
                    </Text>
                  </Box>
                ))
              )}
            </VStack>

            {/* Chat Input */}
            <Box p={3} borderTopWidth="1px" borderColor="gray.700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <HStack>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    size="sm"
                    bg="gray.700"
                    borderColor="gray.600"
                  />
                  <IconButton
                    aria-label="Send message"
                    icon={<FiSend />}
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    isDisabled={!newMessage.trim()}
                  />
                </HStack>
              </form>
            </Box>
          </Collapse>
        </Box>
      </Flex>
    </Flex>
  );
};

// Helper function to format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
