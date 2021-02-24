import { connect, styled } from "frontity";
import Img from "@frontity/components/image";
const Placeholder = ({ state }) => {
  return (
        <Image
          src="http://dfoundation.moneylife.in/media/uploads/video_thumbnails/default-image.png"
        />
  );
};

export default connect(Placeholder);

const Image = styled(Img)`
  margin: 0 auto;
  max-width: 100%;
  display: block;
  height: auto;
  max-height: 440px;
`;
