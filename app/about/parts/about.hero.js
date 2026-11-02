'use client';
import { Box, Container, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

const AboutHero = () => {
  return (
    <Box position="relative" h={{ base: '70vh', md: '80vh' }} display="flex" alignItems="center" justifyContent="center">
      {/* Gradient overlay for depth */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%)"
        zIndex={1}
      />

      {/* Accent glow */}
      <Box
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={{ base: '300px', md: '600px' }}
        h={{ base: '300px', md: '600px' }}
        bg="radial-gradient(circle, rgba(239,178,9,0.15) 0%, transparent 70%)"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Content */}
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <VStack spacing={{ base: 4, md: 6 }} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.3em"
              color="var(--clr-primary-3)"
              mb={4}
            >
              Who We Are
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text
              lineHeight={0.95}
              fontWeight="900"
              fontSize={{ base: '4xl', sm: '5xl', md: '7xl', lg: '8xl' }}
              color="var(--clr-primary-1)"
              letterSpacing="-0.02em"
            >
              AFRICAN SIMBA
            </Text>
            <Text
              lineHeight={0.95}
              fontWeight="900"
              fontSize={{ base: '4xl', sm: '5xl', md: '7xl', lg: '8xl' }}
              bgGradient="linear(to-r, var(--clr-primary-3), var(--clr-primary-5))"
              bgClip="text"
              letterSpacing="-0.02em"
            >
              EVENTS
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Text
              fontSize={{ base: 'md', md: 'xl' }}
              color="rgba(255,255,255,0.7)"
              maxW="500px"
              fontWeight="light"
            >
              Creating unforgettable experiences that bring people together and celebrate life.
            </Text>
          </MotionBox>

          {/* Stats row */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            pt={6}
          >
            <HStack
              spacing={{ base: 6, md: 12 }}
              divider={
                <Box h="40px" w="1px" bg="rgba(255,255,255,0.15)" />
              }
            >
              {[
                { value: '50+', label: 'Events' },
                { value: '13', label: 'Team Members' },
                { value: '3+', label: 'Years' },
              ].map((stat) => (
                <VStack key={stat.label} spacing={0}>
                  <Text
                    fontSize={{ base: 'xl', md: '3xl' }}
                    fontWeight="bold"
                    color="var(--clr-primary-3)"
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontSize={{ base: '2xs', md: 'xs' }}
                    color="rgba(255,255,255,0.5)"
                    textTransform="uppercase"
                    letterSpacing="0.15em"
                  >
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* Scroll indicator */}
      <MotionBox
        position="absolute"
        bottom="30px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Box
          w="24px"
          h="40px"
          borderRadius="full"
          border="2px solid rgba(255,255,255,0.3)"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          pt="8px"
        >
          <Box w="3px" h="8px" borderRadius="full" bg="rgba(255,255,255,0.5)" />
        </Box>
      </MotionBox>
    </Box>
  );
};

export default AboutHero;
