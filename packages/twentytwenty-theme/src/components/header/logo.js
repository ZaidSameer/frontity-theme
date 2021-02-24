import React from "react";
import { connect, styled } from "frontity";
import Img from "@frontity/components/image";

const Logo = ({
  title,
  src
}) => {
  return (
    <Container>
      <Image
          alt={title}
          src={src}
        />
      </Container>
  );
};

export default connect(Logo);

const Container = styled.div`
  max-height: 100px;
`;

const Image = styled(Img)`
  margin: 0 auto;
  max-width: 100%;
  display: block;
  height: auto;
  max-height: 50px;
`;