import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as actions from 'app/redux/comments/actions';

import Button from 'app/components/Button';

import './style.css';

function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function Layout({
    children,
    comments,
    actionCommentAdd
}) {
    return (
        <div className="l-wrapper">
            <Link to="/test-page">Test page</Link>
            {
                comments.map((c, i) => (
                    <section key={i}>
                        <p>{ c.content }</p>
                        <a href="#">{ c.name }</a>
                        <Button onClick={() => {actionCommentAdd(`Text ${i}`);}}>
                            <FormattedMessage
                                id="Click me"
                                defaultMessage="Click me"
                            />
                        </Button>
                    </section>
                ))
            }
            { children }
        </div>
    );
}

export default connect(mapStateToProps, mapDispachToProps)(Layout);
