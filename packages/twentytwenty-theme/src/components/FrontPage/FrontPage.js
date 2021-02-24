import {styled, connect, fetch} from "frontity";
import React, {useEffect, useState} from "react";
import FeaturedPostSection from "./featured-posts";
import { formatPostData, splitPosts } from "../helpers";

const FrontPage = ({state, actions, libraries}) => {

    const data = state.source.get("getFeaturedPosts");

    const [firstThreePosts, othersPosts] = splitPosts(state, data.items);

    return data.isReady ?  (
        <>
            <FrontPageContainer>
                <FeaturedPostSection data={firstThreePosts.map(post => formatPostData(state, post))} />
           </FrontPageContainer>
        </>

    ) : null;
};

export default connect(FrontPage);



const FrontPageContainer = styled('div')` 
    display:block;
`;