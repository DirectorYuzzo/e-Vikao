import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Text,
  Button,
  Flex,
  Box,
  Icon,
  Progress,
  Tooltip,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
// import { formatDistanceToNow } from "date-fns";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileImage,
  FaFileVideo,
  FaFileCode,
  FaDownload,
} from "react-icons/fa";

interface ResourceCardProps {
  fileType: "pdf" | "doc" | "ppt" | "zip" | "image" | "video" | "code";
  fileName: string;
  description: string;
  uploader: {
    name: string;
    avatarUrl: string;
  };
  fileSize: string;
  uploadDate: Date;
  downloadCount: number;
  onDownload?: () => void;
}

const fileIcons = {
  pdf: { icon: FaFilePdf, color: "#E53E3E" },
  doc: { icon: FaFileWord, color: "#2B6CB0" },
  ppt: { icon: FaFilePowerpoint, color: "#DD6B20" },
  zip: { icon: FaFileArchive, color: "#805AD5" },
  image: { icon: FaFileImage, color: "#38A169" },
  video: { icon: FaFileVideo, color: "#D53F8C" },
  code: { icon: FaFileCode, color: "#3182CE" },
};

export const ResourceCard = ({
  fileType,
  fileName,
  description,
  uploader,
  fileSize,
  uploadDate,
  downloadCount,
  onDownload,
}: ResourceCardProps) => {
  const [downloads, setDownloads] = useState(downloadCount);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const toast = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    setProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Update download count
    setDownloads(downloads + 1);

    // Optional callback
    onDownload?.();

    // Show success notification
    setTimeout(() => {
      toast({
        title: "Download started",
        description: `${fileName} is being downloaded`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 500);
  };

  return (
    <Card
      variant="outline"
      _hover={{
        transform: "scale(1.02)",
        transition: "all 0.2s ease",
        shadow: "md",
      }}
    >
      <CardBody>
        <Flex gap={4} align="center">
          <Box fontSize="3xl" color={fileIcons[fileType].color}>
            <Icon as={fileIcons[fileType].icon} />
          </Box>
          <Box flex={1}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
              {fileName}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={2} mt={1}>
              {description}
            </Text>
          </Box>
        </Flex>

        {isDownloading && (
          <Progress
            value={progress}
            size="xs"
            colorScheme="blue"
            mt={4}
            borderRadius="full"
          />
        )}
      </CardBody>

      <CardFooter>
        <Flex
          width="full"
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 2, sm: 0 }}
        >
          <Flex align="center" gap={2}>
            <Avatar
              size="sm"
              src={uploader.avatarUrl}
              name={uploader.name}
              border="1px solid"
              borderColor="gray.200"
            />
            <Text fontSize="sm">Uploaded by {uploader.name}</Text>
          </Flex>

          <Flex gap={4} align="center">
            <Tooltip label="File size">
              <Badge colorScheme="gray" px={2}>
                📦 {fileSize}
              </Badge>
            </Tooltip>
            <Tooltip label="Upload date">
              <Text fontSize="sm" color="gray.500">
                {/* 📅 {formatDistanceToNow(uploadDate)} ago */}2 hour
              </Text>
            </Tooltip>
            <Button
              size="sm"
              leftIcon={<FaDownload />}
              onClick={handleDownload}
              isLoading={isDownloading}
              loadingText="Downloading"
              variant="outline"
              colorScheme="blue"
            >
              ⬇️ {downloads}
            </Button>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};
