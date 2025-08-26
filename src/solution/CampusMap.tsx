import { useState, useMemo } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Flex,
  VStack,
  HStack,
  Badge,
  useToast,
  Avatar,
  ButtonGroup,
  Button,
  Tooltip,
  Collapse,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaMapMarkerAlt,
  FaWalking,
} from "react-icons/fa";

interface Location {
  id: string;
  name: string;
  type: "academic" | "service" | "social";
  coordinates: { x: number; y: number };
  description: string;
  distance?: string;
  icon: string;
  hours?: string;
}

interface CampusMapProps {
  locations: Location[];
  userLocation?: { x: number; y: number };
}

const typeColors = {
  academic: "blue",
  service: "green",
  social: "orange",
};

export const CampusMap = ({ locations, userLocation }: CampusMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "academic" | "service" | "social"
  >("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const toast = useToast();

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch = location.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || location.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [locations, searchTerm, filter]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );

    const location = locations.find((loc) => loc.id === id);
    if (location && !favorites.includes(id)) {
      toast({
        title: "Added to favorites",
        description: `${location.name} was added to your favorites`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={6}>
      {/* Map Area */}
      <Box
        position="relative"
        bg="blue.50"
        borderRadius="xl"
        p={4}
        flex={1}
        minH="400px"
        borderWidth="1px"
        borderColor="gray.200"
      >
        {/* Background grid/layout would be replaced with actual map image */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          top={0}
          left={0}
          bgImage="url('/pattern-grid.svg')"
          opacity={0.1}
          pointerEvents="none"
        />

        {/* User location marker */}
        {userLocation && (
          <Tooltip label="Your location">
            <Box
              position="absolute"
              left={`${userLocation.x}%`}
              top={`${userLocation.y}%`}
              transform="translate(-50%, -50%)"
              color="red.500"
              fontSize="2xl"
              zIndex={2}
            >
              <FaMapMarkerAlt />
            </Box>
          </Tooltip>
        )}

        {/* Location pins */}
        {filteredLocations.map((location) => (
          <Tooltip key={location.id} label={location.name}>
            <Box
              position="absolute"
              left={`${location.coordinates.x}%`}
              top={`${location.coordinates.y}%`}
              transform="translate(-50%, -50%)"
              fontSize="2xl"
              cursor="pointer"
              onClick={() => setSelectedLocation(location)}
              zIndex={1}
              _hover={{
                transform: "translate(-50%, -50%) scale(1.2)",
                transition: "all 0.2s",
              }}
              animation={
                selectedLocation?.id === location.id
                  ? "pulse 1.5s infinite"
                  : undefined
              }
            >
              {location.icon}
              <Badge
                colorScheme={typeColors[location.type]}
                position="absolute"
                top="-8px"
                right="-8px"
                borderRadius="full"
                fontSize="xx-small"
                px={1}
              >
                {location.type.charAt(0).toUpperCase()}
              </Badge>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Controls Panel */}
      <VStack spacing={4} width={{ base: "100%", md: "300px" }}>
        {/* Search and Filter */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Find buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <ButtonGroup isAttached size="sm" w="100%">
          <Button
            flex={1}
            variant={filter === "all" ? "solid" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            flex={1}
            variant={filter === "academic" ? "solid" : "outline"}
            colorScheme="blue"
            onClick={() => setFilter("academic")}
          >
            Academic
          </Button>
          <Button
            flex={1}
            variant={filter === "service" ? "solid" : "outline"}
            colorScheme="green"
            onClick={() => setFilter("service")}
          >
            Services
          </Button>
          <Button
            flex={1}
            variant={filter === "social" ? "solid" : "outline"}
            colorScheme="orange"
            onClick={() => setFilter("social")}
          >
            Social
          </Button>
        </ButtonGroup>

        {/* Info Panel */}
        <Box borderWidth="1px" borderRadius="lg" p={4} w="100%" bg="white">
          {selectedLocation ? (
            <VStack align="stretch" spacing={3}>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Text fontSize="2xl">{selectedLocation.icon}</Text>
                  <Text fontWeight="bold">{selectedLocation.name}</Text>
                </HStack>
                <IconButton
                  icon={
                    favorites.includes(selectedLocation.id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )
                  }
                  aria-label={
                    favorites.includes(selectedLocation.id)
                      ? "Remove favorite"
                      : "Add favorite"
                  }
                  onClick={() => toggleFavorite(selectedLocation.id)}
                  colorScheme={
                    favorites.includes(selectedLocation.id) ? "red" : "gray"
                  }
                  variant="ghost"
                />
              </Flex>

              <Badge
                colorScheme={typeColors[selectedLocation.type]}
                alignSelf="flex-start"
              >
                {selectedLocation.type}
              </Badge>

              <Text>{selectedLocation.description}</Text>

              {selectedLocation.hours && (
                <Text fontSize="sm" color="gray.600">
                  ⏰ {selectedLocation.hours}
                </Text>
              )}

              {selectedLocation.distance && (
                <HStack>
                  <FaWalking />
                  <Text fontSize="sm">{selectedLocation.distance} walk</Text>
                </HStack>
              )}
            </VStack>
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Select a location to see details
            </Text>
          )}
        </Box>

        {/* Favorites Section */}
        <Collapse in={favorites.length > 0} animateOpacity>
          <Box w="100%">
            <Text fontWeight="bold" mb={2}>
              Favorites
            </Text>
            <VStack align="stretch" spacing={2}>
              {favorites.map((favId) => {
                const favLocation = locations.find((loc) => loc.id === favId);
                return favLocation ? (
                  <HStack
                    key={favId}
                    p={2}
                    borderRadius="md"
                    bg="gray.50"
                    cursor="pointer"
                    onClick={() => setSelectedLocation(favLocation)}
                    _hover={{ bg: "gray.100" }}
                  >
                    <Text>{favLocation.icon}</Text>
                    <Text fontSize="sm">{favLocation.name}</Text>
                  </HStack>
                ) : null;
              })}
            </VStack>
          </Box>
        </Collapse>
      </VStack>
    </Flex>
  );
};
