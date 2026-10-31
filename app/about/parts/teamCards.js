'use client'
import React, { useState, useCallback, useMemo } from 'react';
import {
    Box,
    Text,
    SimpleGrid,
    Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    VStack,
    HStack,
    Badge,
    Icon,
    Flex,
    Heading,
} from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiExternalLink, FiBriefcase, FiStar, FiAward } from "react-icons/fi";
import SiteButton from "../../../components/Button";

const MotionBox = motion.create(Box);

const teamMembers = [
    {
        id: 'bivince-mugisho',
        name: 'Bivince Mugisho',
        position: 'Management',
        imageUrl: '/teams/mugisho.webp',
        bio: 'Experienced manager specializing in logistics and ensuring seamless event operations.',
        experience: '3+ years',
        specialties: ['Logistics Management', 'Vendor Relations', 'Quality Control'],
        social: { instagram: '@bivince', twitter: '@bivince' }
    },
    {
        id: 'raoul-mak',
        name: 'Raoul Mak',
        position: 'Management',
        imageUrl: '/team/Raoul_Mak.webp',
        bio: 'Strategic leader focused on business development and team coordination for optimal event execution.',
        experience: '2+ years',
        specialties: ['Team Leadership', 'Business Strategy', 'Operations Management'],
        social: { instagram: '@raoul_mak', twitter: '@raoul' }
    },
    {
        id: 'delphin-jack',
        name: 'Delphin Jack',
        position: 'Floor Management',
        imageUrl: '/team/delphin_jack.webp',
        bio: 'On-site floor manager ensuring perfect event flow and guest experience management.',
        experience: '3+ years',
        specialties: ['Floor Operations', 'Crowd Control', 'Guest Services'],
        social: { instagram: '@delphin_jack', twitter: '@delphin' }
    },
    {
        id: 'isaac-kanye',
        name: 'Isaac Kanye',
        position: 'Official Videographer',
        imageUrl: '/teams/kanye.webp',
        bio: 'A skilled videographer who brings stories to life through motion, creating dynamic and engaging video content for every occasion.',
        experience: '1+ years',
        specialties: ['Event Videography', 'Cinematic Storytelling', 'Video Editing & Post-Production'],
        social: { instagram: '@isaac_kanye', twitter: '@isaac_kanye' }
    },
    {
        id: 'kimnana-lil-stunner',
        name: 'Kimnana Lil Stunner',
        position: 'Co-Host',
        imageUrl: '/teams/nana.webp',
        bio: 'Charismatic host bringing energy and entertainment to every event with exceptional stage presence.',
        experience: '2+ years',
        specialties: ['Live Hosting', 'Audience Engagement', 'Entertainment'],
        social: { instagram: '@kimnana_stunner', twitter: '@kimnana' }
    },
    {
        id: 'sheila',
        name: 'Sheila',
        position: 'Co-Host',
        imageUrl: '/teams/shillah.webp',
        bio: 'Professional hostess providing exceptional guest welcome and hospitality services.',
        experience: '2+ years',
        specialties: ['Guest Relations', 'Hospitality', 'Customer Service'],
        social: { instagram: '@sheilah', twitter: '@sheilah' }
    },
    {
        id: 'dj-ashley',
        name: 'Dj Ashley',
        position: 'Official Deejay',
        imageUrl: '/team/dj_ashley_copy.webp',
        bio: 'Talented DJ specializing in diverse music genres and creating unforgettable party experiences.',
        experience: '3+ years',
        specialties: ['Multi-Genre Mixing', 'Party Atmosphere', 'Sound Engineering'],
        social: { instagram: '@dj_ashley', twitter: '@djashley' }
    },
    {
        id: 'dj-wizzy',
        name: 'Dj Wizzy',
        position: 'Official Deejay',
        imageUrl: '/team/dj_wizzy.webp',
        bio: 'Creative DJ known for innovative mixes and keeping dance floors packed all night long.',
        experience: '3+ years',
        specialties: ['Creative Mixing', 'Dance Music', 'Technical Skills'],
        social: { instagram: '@dj_wizzy', twitter: '@djwizzy' }
    },
    {
        id: 'selecta-ryan',
        name: 'Selecta Ryan',
        position: 'Official Deejay',
        imageUrl: '/team/selecta_ryan.webp',
        bio: 'Versatile selector with deep music knowledge and ability to adapt to any event style.',
        experience: '3+ years',
        specialties: ['Music Selection', 'Reggae/Dancehall', 'Event Adaptation'],
        social: { instagram: '@selecta_ryan', twitter: '@selectaryan' }
    },
    {
        id: 'future-mc',
        name: 'Future MC',
        position: 'Official MC',
        imageUrl: '/team/future_mc.avif',
        bio: 'Professional MC with commanding stage presence and ability to energize any crowd.',
        experience: '3+ years',
        specialties: ['Stage Presence', 'Crowd Control', 'Live Performance'],
        social: { instagram: '@future_mc', twitter: '@futuremc' }
    },
    
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.06 },
    }),
};

const TeamCard = React.memo(({ member, onClick, index }) => {
    const handleClick = useCallback(() => {
        onClick(member);
    }, [member, onClick]);

    return (
        <MotionBox
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={cardVariants}
        >
            <Box
                w="100%"
                bg="rgba(255,255,255,0.03)"
                borderRadius="2xl"
                overflow="hidden"
                border="1px solid rgba(255,255,255,0.06)"
                position="relative"
                cursor="pointer"
                transition="all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                role="group"
                _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                    borderColor: "rgba(239,178,9,0.2)",
                    "& .image-container": {
                        transform: "scale(1.08)"
                    },
                    "& .overlay": {
                        opacity: 1,
                    },
                    "& .view-profile": {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                }}
                onClick={handleClick}
            >
                <Box
                    position="relative"
                    overflow="hidden"
                    w="100%"
                    h={{ base: "280px", md: "320px" }}
                >
                    <Box
                        className="image-container"
                        transition="transform 0.6s ease"
                        w="100%"
                        h="100%"
                    >
                        <Image
                            src={member.imageUrl}
                            alt={`${member.name}'s photo`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                            style={{ objectFit: 'cover' }}
                            quality={75}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+hxuop9to16L4wfWnvjhvEfxK0WSn8Av/Z"
                        />
                    </Box>

                    {/* Gradient Overlay */}
                    <Box
                        className="overlay"
                        position="absolute"
                        bottom={0}
                        left={0}
                        w="100%"
                        h="100%"
                        bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)"
                        opacity={0.7}
                        transition="all 0.4s ease"
                    />

                    {/* View profile icon */}
                    <Box
                        className="view-profile"
                        position="absolute"
                        top="16px"
                        right="16px"
                        bg="rgba(255,255,255,0.9)"
                        backdropFilter="blur(10px)"
                        borderRadius="full"
                        p={2.5}
                        opacity={0}
                        transform="translateY(-10px)"
                        transition="all 0.3s ease"
                    >
                        <Icon as={FiExternalLink} color="black" boxSize={4} />
                    </Box>

                    {/* Name & position overlay */}
                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        w="100%"
                        p={5}
                        zIndex={2}
                    >
                        <VStack align="start" spacing={1.5}>
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="var(--clr-primary-3)"
                                textShadow="0 2px 4px rgba(0,0,0,0.5)"
                                lineHeight={1.2}
                            >
                                {member.name}
                            </Text>
                            <Text
                                fontSize="xs"
                                color="rgba(255,255,255,0.85)"
                                textShadow="0 1px 2px rgba(0,0,0,0.5)"
                                fontWeight="medium"
                                textTransform="uppercase"
                                letterSpacing="0.05em"
                            >
                                {member.position}
                            </Text>
                            <Badge
                                variant="solid"
                                bg="rgba(239,178,9,0.2)"
                                color="var(--clr-primary-3)"
                                backdropFilter="blur(10px)"
                                borderRadius="full"
                                px={3}
                                py={0.5}
                                fontSize="2xs"
                                fontWeight="medium"
                            >
                                {member.experience}
                            </Badge>
                        </VStack>
                    </Box>
                </Box>
            </Box>
        </MotionBox>
    );
});

TeamCard.displayName = 'TeamCard';

const ProfileModal = React.memo(({ isOpen, onClose, selectedMember }) => {
    if (!selectedMember) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            <ModalOverlay
                bg='rgba(0, 0, 0, 0.85)'
                backdropFilter='blur(20px)'
            />
            <ModalContent
                bg="rgba(15, 15, 15, 0.98)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderRadius="3xl"
                overflow="hidden"
                maxH="90vh"
            >
                {/* Hero Header */}
                <Box
                    position="relative"
                    h="200px"
                    overflow="hidden"
                >
                    <Image
                        src={selectedMember.imageUrl}
                        alt=""
                        fill
                        style={{ objectFit: 'cover', filter: 'blur(20px) brightness(0.4)' }}
                        quality={30}
                    />
                    <Box position="absolute" inset={0} bg="rgba(0,0,0,0.4)" />

                    <ModalCloseButton
                        color="white"
                        size="lg"
                        bg="rgba(255,255,255,0.1)"
                        borderRadius="full"
                        m={4}
                        _hover={{ bg: "rgba(255,255,255,0.2)" }}
                    />

                    {/* Profile Image */}
                    <Box
                        position="absolute"
                        bottom="-40px"
                        left="40px"
                        w="100px"
                        h="100px"
                        borderRadius="2xl"
                        overflow="hidden"
                        border="3px solid rgba(239,178,9,0.5)"
                        boxShadow="0 10px 30px rgba(0,0,0,0.3)"
                    >
                        <Image
                            src={selectedMember.imageUrl}
                            alt={`${selectedMember.name}'s photo`}
                            width={100}
                            height={100}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            quality={90}
                        />
                    </Box>
                </Box>

                <ModalBody p={0} pt={14}>
                    <Box px={8} pb={8}>
                        {/* Name and Position */}
                        <VStack align="start" spacing={4} mb={8}>
                            <Box>
                                <HStack mb={2} align="center">
                                    <Text fontSize="2xl" fontWeight="bold" color="var(--clr-primary-3)">
                                        {selectedMember.name}
                                    </Text>
                                    <Icon as={FiStar} color="var(--clr-primary-3)" boxSize={5} />
                                </HStack>

                                <HStack spacing={3} mb={4}>
                                    <Icon as={FiBriefcase} color="rgba(255,255,255,0.5)" boxSize={4} />
                                    <Text fontSize="md" color="rgba(255,255,255,0.7)" fontWeight="medium">
                                        {selectedMember.position}
                                    </Text>
                                </HStack>

                                <Badge
                                    variant="solid"
                                    bg="rgba(239,178,9,0.15)"
                                    color="var(--clr-primary-3)"
                                    fontSize="xs"
                                    px={3}
                                    py={1.5}
                                    borderRadius="full"
                                    border="1px solid rgba(239,178,9,0.2)"
                                >
                                    <Icon as={FiAward} mr={2} />
                                    {selectedMember.experience} Experience
                                </Badge>
                            </Box>
                        </VStack>

                        {/* Bio */}
                        <Box mb={8}>
                            <Text fontSize="md" color="rgba(255,255,255,0.7)" lineHeight="1.8">
                                {selectedMember.bio}
                            </Text>
                        </Box>

                        {/* Skills */}
                        <Box mb={8}>
                            <Text fontSize="sm" fontWeight="bold" color="white" mb={3} textTransform="uppercase" letterSpacing="0.1em">
                                Core Expertise
                            </Text>
                            <Flex gap={3} flexWrap="wrap">
                                {selectedMember.specialties?.map((specialty, index) => (
                                    <Box
                                        key={`${selectedMember.id}-specialty-${index}`}
                                        bg="rgba(255,255,255,0.05)"
                                        border="1px solid rgba(255,255,255,0.08)"
                                        borderRadius="xl"
                                        px={4}
                                        py={2.5}
                                        transition="all 0.3s ease"
                                        _hover={{
                                            bg: "rgba(239,178,9,0.1)",
                                            borderColor: "rgba(239,178,9,0.2)",
                                        }}
                                    >
                                        <Text fontSize="xs" color="rgba(255,255,255,0.8)" fontWeight="medium">
                                            {specialty}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        {/* Social */}
                        <Box>
                            <Text fontSize="sm" fontWeight="bold" color="white" mb={3} textTransform="uppercase" letterSpacing="0.1em">
                                Connect
                            </Text>
                            <HStack spacing={3}>
                                <SiteButton variant="outline" size="small">{selectedMember.social?.instagram || '@username'}</SiteButton>
                                <SiteButton variant="outline" size="small">{selectedMember.social?.twitter || '@username'}</SiteButton>
                            </HStack>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});

ProfileModal.displayName = 'ProfileModal';

const TeamSection = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleMemberClick = useCallback((member) => {
        setSelectedMember(member);
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
        setSelectedMember(null);
    }, []);

    const teamCards = useMemo(
        () => teamMembers.map((member, index) => (
            <TeamCard
                key={member.id}
                member={member}
                onClick={handleMemberClick}
                index={index}
            />
        )),
        [handleMemberClick]
    );

    return (
        <>
            <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
                {/* Section header */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    mb={10}
                    px={{ base: 4, md: 0 }}
                >
                    <Text
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="0.2em"
                        color="var(--clr-primary-3)"
                        mb={3}
                    >
                        The Team
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        color="var(--clr-primary-1)"
                        fontWeight="bold"
                        mb={2}
                    >
                        Meet the people behind the{' '}
                        <Text as="span" color="var(--clr-primary-3)">magic</Text>
                    </Heading>
                    <Text fontSize="sm" color="rgba(255,255,255,0.5)" maxW="500px">
                        A talented collective of creatives, managers, and performers dedicated to making every event extraordinary.
                    </Text>
                </MotionBox>

                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 3, md: 6 }}>
                    {teamCards}
                </SimpleGrid>
            </Container>

            <ProfileModal
                isOpen={isOpen}
                onClose={onClose}
                selectedMember={selectedMember}
            />
        </>
    );
};

export default TeamSection;
