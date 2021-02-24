import {styled, connect} from "frontity";
import React, {useEffect} from "react";

const SectionTitle = ({state, actions, libraries, title}) => {

    useEffect(() => {
        actions.source.fetch(state.router.link);
    }, []);

    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Get the data of the post.
    const page = state.source[data.type][data.id];

    const Html2React = libraries.html2react.Component;


    return data.isReady ? (
        <Title>{title}</Title>
    ) : null;
};

export default connect(SectionTitle);

const Title = styled('h2')` 
    text-decoration:none;
`;




