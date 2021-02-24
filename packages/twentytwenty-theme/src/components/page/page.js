import {styled, connect, decode} from "frontity";
import React, {useEffect} from "react";
import FeaturedMedia from "../post/featured-media";


const Page = ({state, actions, libraries}) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Get the data of the post.
    const page = state.source[data.type][data.id];

    // Get the html2react component.
    const Html2React = libraries.html2react.Component;

    useEffect(() => {
        actions.source.fetch("/");
    }, []);

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <div>
            {page.featured_media !== 0 && (
                <FeaturedImage id={page.featured_media}/>
            )}
            <SectionContainer>
               
                {
                    page.content && (
                        <PostInner size="medium">
                            <EntryContent>
                                <Html2React html={page.content.rendered}/>
                            </EntryContent>
                        </PostInner>
                    )
                }

            </SectionContainer>
        </div>
    ) : null;
};

export default connect(Page);

const maxWidths = {
    thin: "58rem",
    small: "80rem",
    medium: "100rem",
    large: "120rem",
};

const getMaxWidth = (props) => maxWidths[props.size] || maxWidths["large"];

const FeaturedImage = styled(FeaturedMedia)`
margin-top: 0 !important;
position: relative;

> div {
position: relative;
}

&:before {
background: #fff;
content: "";
display: block;
position: absolute;
bottom: 50%;
left: 0;
right: 0;
top: 0;
}
`;

const SectionContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 4rem);
  max-width: ${getMaxWidth};

  @media (min-width: 700px) {
    width: calc(100% - 8rem);
  }
`;

const PostInner = styled(SectionContainer)`
  padding-top: 5rem;
  @media (min-width: 700px) {
    padding-top: 8rem;
  }
`;

const EntryContent = styled.div`
  line-height: 1.5;
  letter-spacing: normal;
  @media (min-width: 700px) {
    font-size: 2.1rem;
  }

  > *:first-of-type {
    margin-top: 0;
  }

  figure {
    margin: 2em 0;
    max-width: 100%;
  }
`;
