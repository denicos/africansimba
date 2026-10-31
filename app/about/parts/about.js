'use client';

import React from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, VStack, HStack, Container, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { FiMic, FiCamera, FiUsers, FiStar, FiMonitor, FiTarget } from "react-icons/fi";

const MotionBox = motion.create(Box);

const services = [
  { name: "Hosting", icon: FiMic, description: "Professional hosting for events of all scales" },
  { name: "Marketing", icon: FiTarget, description: "Strategic brand promotion and outreach" },
  { name: "Event Planning", icon: FiStar, description: "End-to-end event conceptualization and execution" },
  { name: "Talent Management", icon: FiUsers, description: "Artist booking and talent coordination" },
  { name: "Video Coverage", icon: FiCamera, description: "Cinematic event documentation" },
  { name: "Conceptualisation", icon: FiMonitor, description: "Creative ideation and event design" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const ServiceCard = React.memo(({ service, index }) => (
  <MotionBox
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeInUp}
  >
    <Box
      bg="rgba(255,255,255,0.03)"
      border="1px solid rgba(255,255,255,0.08)"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      h="100%"
      transition="all 0.3s ease"
      _hover={{
        bg: "rgba(255,255,255,0.06)",
        borderColor: "rgba(239,178,9,0.3)",
        transform: "translateY(-4px)",
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
      }}
      role="group"
    >
      <Box
        w="48px"
        h="48px"
        borderRadius="xl"
        bg="rgba(239,178,9,0.1)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        transition="all 0.3s ease"
        _groupHover={{ bg: "rgba(239,178,9,0.2)" }}
      >
        <Icon as={service.icon} color="var(--clr-primary-3)" boxSize={5} />
      </Box>
      <Text fontSize="md" fontWeight="bold" color="var(--clr-primary-3)" mb={2}>
        {service.name}
      </Text>
      <Text fontSize="sm" color="rgba(255,255,255,0.5)" lineHeight="1.6">
        {service.description}
      </Text>
    </Box>
  </MotionBox>
));

ServiceCard.displayName = 'ServiceCard';

const CEOSection = React.memo(() => (
  <MotionBox
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8 }}
    as="section"
    aria-labelledby="ceo-heading"
  >
    <Box
      bg="rgba(255,255,255,0.03)"
      border="1px solid rgba(255,255,255,0.08)"
      borderRadius="3xl"
      overflow="hidden"
      position="relative"
    >
      {/* Accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient="linear(to-r, transparent, var(--clr-primary-3), transparent)"
      />

      <Flex direction={{ base: "column", lg: "row" }}>
        {/* CEO Image */}
        <Box
          flexShrink={0}
          w={{ base: "100%", lg: "400px" }}
          h={{ base: "300px", md: "400px", lg: "auto" }}
          minH={{ lg: "500px" }}
          position="relative"
        >
          <Image
            src="/teams/ceo-simba.avif"
            alt="African Simba - CEO and Founder of African Simba Events"
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            quality={85}
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+hxuop9to16L4wfWnvjhvEfxK0WSn8Av/Z"
          />
          {/* Gradient overlay on image */}
          <Box
            position="absolute"
            inset={0}
            bg={{
              base: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)",
              lg: "linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.9) 100%)"
            }}
          />
        </Box>

        {/* CEO Content */}
        <VStack
          flex="1"
          align="start"
          spacing={5}
          p={{ base: 8, md: 12 }}
          justify="center"
        >
          <Box>
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="var(--clr-primary-3)"
              mb={2}
            >
              Founder & CEO
            </Text>
            <Heading
              as="h3"
              id="ceo-heading"
              fontSize={{ base: "3xl", md: "4xl" }}
              color="var(--clr-primary-3)"
              fontWeight="bold"
              lineHeight={1.1}
            >
              African Simba
            </Heading>
          </Box>

          <HStack spacing={3} flexWrap="wrap">
            {['CEO', 'Host', 'Bookwriter', 'Marketer', 'Speaker'].map((role) => (
              <Box
                key={role}
                px={3}
                py={1}
                borderRadius="full"
                border="1px solid rgba(239,178,9,0.3)"
                bg="rgba(239,178,9,0.08)"
              >
                <Text fontSize="xs" color="var(--clr-primary-3)" fontWeight="medium">
                  {role}
                </Text>
              </Box>
            ))}
          </HStack>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="rgba(255,255,255,0.7)"
            lineHeight="1.8"
            maxW="600px"
          >
            African Simba is a visionary leader committed to fostering innovation and excellence
            across all aspects of our company. With years of experience in event management,
            his leadership has been instrumental in achieving our mission and vision.
          </Text>

          <Box
            w="60px"
            h="3px"
            bg="var(--clr-primary-3)"
            borderRadius="full"
            mt={2}
          />
        </VStack>
      </Flex>
    </Box>
  </MotionBox>
));

CEOSection.displayName = 'CEOSection';

const About = () => {
  return (
    <>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        {/* About & Mission - Bento Grid */}
        <SimpleGrid
          columns={{ base: 1, lg: 5 }}
          spacing={6}
          mb={{ base: 12, md: 20 }}
          as="section"
          aria-labelledby="about-heading"
        >
          {/* About Us - spans 3 cols */}
          <MotionBox
            gridColumn={{ lg: "span 3" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              bg="rgba(255,255,255,0.03)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="3xl"
              p={{ base: 8, md: 12 }}
              h="100%"
              position="relative"
              overflow="hidden"
            >
              {/* Decorative corner gradient */}
              <Box
                position="absolute"
                top={0}
                right={0}
                w="200px"
                h="200px"
                bg="radial-gradient(circle at top right, rgba(239,178,9,0.08) 0%, transparent 70%)"
                pointerEvents="none"
              />

              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="var(--clr-primary-3)"
                mb={4}
              >
                About Us
              </Text>
              <Heading
                as="h1"
                id="about-heading"
                fontSize={{ base: "2xl", md: "4xl" }}
                color="var(--clr-primary-1)"
                mb={6}
                fontWeight="bold"
                lineHeight={1.2}
              >
                Passionate professionals creating{' '}
                <Text as="span" color="var(--clr-primary-3)">
                  unforgettable
                </Text>{' '}
                experiences
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="rgba(255,255,255,0.6)"
                maxW="600px"
                lineHeight="1.8"
              >
                We are a team of passionate professionals dedicated to delivering top-notch experiences in everything we do.
                From event planning to execution, we believe in creating memorable experiences that make a difference.
              </Text>
            </Box>
          </MotionBox>

          {/* Mission - spans 2 cols */}
          <MotionBox
            gridColumn={{ lg: "span 2" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Box
              bg="rgba(239,178,9,0.05)"
              border="1px solid rgba(239,178,9,0.15)"
              borderRadius="3xl"
              p={{ base: 8, md: 10 }}
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="var(--clr-primary-3)"
                mb={4}
              >
                Our Mission
              </Text>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="var(--clr-primary-1)"
                fontWeight="medium"
                lineHeight="1.6"
                fontStyle="italic"
              >
                &quot;To create and execute exceptional events that help people celebrate life through innovative and effective solutions.&quot;
              </Text>
              <Box
                w="40px"
                h="3px"
                bg="var(--clr-primary-3)"
                borderRadius="full"
                mt={6}
              />
            </Box>
          </MotionBox>
        </SimpleGrid>

        {/* Services Section */}
        <Box mb={{ base: 12, md: 20 }} as="section" aria-labelledby="services-heading">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            mb={10}
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="var(--clr-primary-3)"
              mb={3}
            >
              What We Do
            </Text>
            <Heading
              as="h2"
              id="services-heading"
              fontSize={{ base: "2xl", md: "3xl" }}
              color="var(--clr-primary-1)"
              fontWeight="bold"
            >
              Our{' '}
              <Text as="span" color="var(--clr-primary-3)">Services</Text>
            </Heading>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {services.map((service, index) => (
              <ServiceCard key={service.name} service={service} index={index} />
            ))}
          </SimpleGrid>
        </Box>

        {/* CEO Section */}
        <CEOSection />
      </Container>
    </>
  );
};

export default About;
