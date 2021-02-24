import { connect, decode, styled } from "frontity";
import {Box, Flex, Heading} from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import Link from "../link";

export const PrimaryPostPreview = ({ data, ...props }) => {
  const { title, categories, featured_media, link } = data;

  return (
    <Link link={link}>
      <PrimaryPostArticle bgImage={generateGradient()} role="group" {...props}>
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent>
          <PostTitle>{title}</PostTitle>
          <PostCategories categories={categories} justifyContent="center" />
        </PostContent>
      </PrimaryPostArticle>
    </Link>
  );
};

export const SecondaryPostPreview = ({ data, ...props }) => {
  const { title, categories, link, featured_media } = data;

  return (
    <Link link={link} display="block" flex="1" {...props}>
      <SecondaryPostArticle bgImage={generateGradient()} role="group">
        <PostOverlay />
        <PostImage {...featured_media} />
        <PostContent padding="40px" textAlign="left" mt="0">
          <PostCategories justifyContent="flex-start" categories={categories} />
          <PostTitle as="h2" mt="auto" pt="40px" fontSize="1.65rem">
            {title}
          </PostTitle>
        </PostContent>
      </SecondaryPostArticle>
    </Link>
  );
};

export const FeaturedPostSection = ({ data, ...props }) => (
  <Flex as="section" direction={{ base: "column", lg: "row" }} {...props}>
    <Box width={{ base: "100%", lg: "65%" }} flexGrow="1">
      <PrimaryPostPreview data={data[0]} />
    </Box>
    <Flex
      direction={{ base: "column", md: "row", lg: "column" }}
      width={{ base: "100%", lg: "35%" }}
      flexGrow="1"
    >
      <SecondaryPostPreview data={data[1]} />
      <SecondaryPostPreview data={data[2]} />
    </Flex>
  </Flex>
);

export default connect(FeaturedPostSection);
export const PostLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const PostContent = props => (
  <Box
    p="40px"
    width="100%"
    display="flex"
    flexDirection="column"
    textTransform="uppercase"
    mt="auto"
    textAlign="center"
    color="white"
    zIndex="2"
    {...props}
  />
);

export const PostTitle = props => (
  <Heading
    as="h1"
    size="2xl"
    pointerEvents="none"
    fontWeight="medium"
    position="relative"
    {...props}
  />
);

export const PostOverlay = props => (
  <Box
    pointerEvents="none"
    zIndex={1}
    size="100%"
    position="absolute"
    top="0"
    left="0"
    background="rgba(0,0,0,0.4)"
    transition="background-color ease 0.25s"
    _groupHover={{
      background: "rgba(0,0,0,0.6)"
    }}
    {...props}
  />
);

export const PostImageWithOverlay = ({ src, alt, srcSet, ...props }) => (
  <Box
    role="group"
    cursor="pointer"
    height="260px"
    width="100%"
    pos="relative"
    {...props}
  >
    <PostOverlay />
    <PostImage src={src} alt={alt} srcSet={srcSet} />
  </Box>
);

export const PrimaryPostArticle = props => (
  <Box
    as="article"
    position="relative"
    display="flex"
    direction="column"
    alignItems="flex-end"
    minHeight={{ base: "unset", md: "400px" }}
    height={{ base: "auto", md: "100%" }}
    paddingTop={{ base: "80px", md: "0" }}
    cursor="pointer"
    {...props}
  />
);

export const SecondaryPostArticle = props => (
  <Box
    as="article"
    position="relative"
    display="flex"
    direction="column"
    flexGrow="1"
    cursor="pointer"
    height="100%"
    minHeight={{ base: "unset", lg: "240px" }}
    {...props}
  />
);

export const PostImage = props => (
  <Box
    as={Image}
    width="900"
    height="550"
    position="absolute"
    size="100%"
    objectFit="cover"
    top="0"
    left="0"
    maxWidth="100%"
    {...props}
  />
);