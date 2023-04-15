import React from 'react';
import { Card, Row } from 'react-bootstrap';

const Quiz = (props) => {
    const { quest, ans } = props;
    return (
        <Card className='card-quiz'>
            <Row className='row-quiz'>
                {quest}
            </Row>
            <Row className='answer row-quiz'>
                {ans}
            </Row>
        </Card>
    );
}

export default Quiz;
